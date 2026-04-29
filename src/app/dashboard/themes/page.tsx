'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ThemeCard from '@/components/ThemeCard'
import { THEMES } from '@/themes'

export default function ThemesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [selectedTheme, setSelectedTheme] = useState('free_basic')
  const [purchasedThemeIds, setPurchasedThemeIds] = useState<string[]>([])
  const [profileId, setProfileId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, selected_theme, role')
      .eq('user_id', user.id)
      .single()

    if (profileData) {
      setProfileId(profileData.id)
      setSelectedTheme(profileData.selected_theme)
    }

    // admin は全有料テーマを使用可能
    if (profileData?.role === 'admin') {
      const { THEMES } = await import('@/themes')
      setPurchasedThemeIds(THEMES.filter((t) => !t.isFree).map((t) => t.id))
    } else {
      const { data: purchases } = await supabase
        .from('purchases')
        .select('item_id')
        .eq('user_id', user.id)
        .eq('item_type', 'theme')
        .eq('status', 'paid')

      if (purchases) {
        setPurchasedThemeIds(purchases.map((p) => p.item_id))
      }
    }

    setLoading(false)
  }

  const handleSelectTheme = async (themeId: string) => {
    if (!profileId) return
    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .update({ selected_theme: themeId, updated_at: new Date().toISOString() })
      .eq('id', profileId)

    if (!error) {
      setSelectedTheme(themeId)
    }
    setSaving(false)
  }

  const handlePurchaseTheme = async (themeId: string) => {
    const theme = THEMES.find((t) => t.id === themeId)
    if (!theme?.stripePriceId) {
      alert('この購入機能は現在設定中です。')
      return
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_type: 'theme',
        item_id: themeId,
        price_id: theme.stripePriceId,
      }),
    })
    const json = await res.json()
    if (json.url) {
      window.location.href = json.url
    } else {
      alert(json.error ?? '決済ページへの遷移に失敗しました。')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-white/10 border-t-[#d4af37] rounded-full animate-spin" />
      </div>
    )
  }

  const freeThemes = THEMES.filter((t) => t.isFree)
  const paidThemes = THEMES.filter((t) => !t.isFree)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 py-3.5">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            <span className="text-[16px] font-bold tracking-wider">Veyra</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 pb-safe">
        {/* Title */}
        <div className="mb-6">
          <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase mb-1">
            Themes
          </p>
          <h1 className="text-[22px] font-bold mb-0.5">テーマを選択</h1>
          <p className="text-[13px] text-gray-500">
            現在:{' '}
            <span className="text-gray-300 font-medium">
              {THEMES.find((t) => t.id === selectedTheme)?.name ?? selectedTheme}
            </span>
            {saving && <span className="text-[#d4af37] ml-2">保存中...</span>}
          </p>
        </div>

        {/* Free themes */}
        <section className="mb-5">
          <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase mb-3">
            無料テーマ
          </p>
          <div className="grid grid-cols-1 gap-3">
            {freeThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={selectedTheme === theme.id}
                isPurchased={true}
                onSelect={handleSelectTheme}
                onPurchase={handlePurchaseTheme}
              />
            ))}
          </div>
        </section>

        {/* Paid themes */}
        <section>
          <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase mb-3">
            プレミアムテーマ
          </p>
          <div className="grid grid-cols-1 gap-3">
            {paidThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={selectedTheme === theme.id}
                isPurchased={purchasedThemeIds.includes(theme.id)}
                onSelect={handleSelectTheme}
                onPurchase={handlePurchaseTheme}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
