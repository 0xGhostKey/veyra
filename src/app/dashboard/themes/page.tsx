'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ThemeCard from '@/components/ThemeCard'
import { THEMES } from '@/themes'

type Tab = 'free' | 'neon' | 'luxury' | 'sakura' | 'chrome' | 'ocean' | 'snow' | 'ember' | 'botanical' | 'glitch'

function tabForTheme(themeId: string): Tab {
  const theme = THEMES.find((t) => t.id === themeId)
  if (!theme || theme.series === 'free') return 'free'
  if (theme.series === 'neon') return 'neon'
  if (theme.series === 'luxury') return 'luxury'
  if (theme.series === 'sakura') return 'sakura'
  if (theme.series === 'chrome') return 'chrome'
  if (theme.series === 'ocean') return 'ocean'
  if (theme.series === 'snow') return 'snow'
  if (theme.series === 'ember') return 'ember'
  if (theme.series === 'botanical') return 'botanical'
  if (theme.series === 'glitch') return 'glitch'
  return 'free'
}

export default function ThemesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<Tab>('free')
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
      setActiveTab(tabForTheme(profileData.selected_theme))
    }

    if (profileData?.role === 'admin' || profileData?.role === 'complete') {
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
    if (!error) setSelectedTheme(themeId)
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

  const freeThemes     = THEMES.filter((t) => t.series === 'free')
  const neonThemes     = THEMES.filter((t) => t.series === 'neon')
  const luxuryThemes   = THEMES.filter((t) => t.series === 'luxury')
  const sakuraThemes   = THEMES.filter((t) => t.series === 'sakura')
  const chromeThemes   = THEMES.filter((t) => t.series === 'chrome')
  const oceanThemes    = THEMES.filter((t) => t.series === 'ocean')
  const snowThemes     = THEMES.filter((t) => t.series === 'snow')
  const emberThemes    = THEMES.filter((t) => t.series === 'ember')
  const botanicalThemes= THEMES.filter((t) => t.series === 'botanical')
  const glitchThemes   = THEMES.filter((t) => t.series === 'glitch')
  const currentThemeName = THEMES.find((t) => t.id === selectedTheme)?.name ?? selectedTheme

  const tabs: { key: Tab; label: string }[] = [
    { key: 'free',   label: '無料'   },
    { key: 'neon',   label: 'Neon'   },
    { key: 'luxury', label: 'Luxury' },
    { key: 'sakura', label: 'Sakura' },
    { key: 'chrome', label: 'Chrome' },
    { key: 'ocean',    label: 'Ocean'    },
    { key: 'snow',     label: 'Snow'     },
    { key: 'ember',    label: 'Ember'    },
    { key: 'botanical',label: 'Botanical'},
    { key: 'glitch',   label: 'Glitch'   },
  ]

  const makeSeriesProgress = (themes: typeof THEMES) =>
    themes.map((theme) => ({
      theme,
      isOwned: theme.isFree || purchasedThemeIds.includes(theme.id),
      isPrerequisiteLocked:
        theme.prerequisiteId !== null &&
        !purchasedThemeIds.includes(theme.prerequisiteId),
    }))

  const neonProgress = makeSeriesProgress(neonThemes)
  const luxuryProgress = makeSeriesProgress(luxuryThemes)

  const getPrerequisiteName = (prerequisiteId: string | null) => {
    if (!prerequisiteId) return undefined
    return THEMES.find((t) => t.id === prerequisiteId)?.name
  }

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
        <div className="mb-5">
          <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase mb-1">Themes</p>
          <h1 className="text-[22px] font-bold mb-0.5">テーマを選択</h1>
          <p className="text-[13px] text-gray-500">
            現在:{' '}
            <span className="text-gray-300 font-medium">{currentThemeName}</span>
            {saving && <span className="text-[#d4af37] ml-2">保存中...</span>}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-none px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FREE tab */}
        {activeTab === 'free' && (
          <div className="flex flex-col gap-3">
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
        )}

        {/* NEON tab */}
        {activeTab === 'neon' && (
          <div>
            {/* Series progress stepper */}
            <div className="flex items-start mb-6 px-1">
              {neonProgress.map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#ff00ff]' : 'text-gray-600'}`}>
                      STEP {idx + 1}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.isOwned
                          ? 'bg-[#ff00ff] border-[#ff00ff]'
                          : selectedTheme === item.theme.id
                          ? 'bg-white/10 border-white/40'
                          : 'bg-transparent border-white/20'
                      }`}
                    >
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>
                      {item.theme.name}
                    </span>
                  </div>
                  {idx < neonProgress.length - 1 && (
                    <div
                      className={`flex-1 h-px mt-[30px] mx-1 ${
                        item.isOwned ? 'bg-[#ff00ff]/40' : 'bg-white/10'
                      }`}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            {/* Series description */}
            <p className="text-[12px] text-gray-600 mb-4 text-center">
              各ステップ ¥300 — 順番に解除していくシリーズ
            </p>

            {/* Neon theme cards */}
            <div className="flex flex-col gap-3">
              {neonProgress.map((item, idx) => (
                <ThemeCard
                  key={item.theme.id}
                  theme={item.theme}
                  isSelected={selectedTheme === item.theme.id}
                  isPurchased={item.isOwned}
                  isPrerequisiteLocked={item.isPrerequisiteLocked}
                  prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)}
                  stepNumber={idx + 1}
                  onSelect={handleSelectTheme}
                  onPurchase={handlePurchaseTheme}
                />
              ))}
            </div>
          </div>
        )}

        {/* LUXURY tab */}
        {activeTab === 'luxury' && (
          <div>
            {/* Series progress stepper */}
            <div className="flex items-start mb-6 px-1">
              {luxuryProgress.map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#d4af37]' : 'text-gray-600'}`}>
                      STEP {idx + 1}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.isOwned
                          ? 'bg-[#d4af37] border-[#d4af37]'
                          : selectedTheme === item.theme.id
                          ? 'bg-white/10 border-white/40'
                          : 'bg-transparent border-white/20'
                      }`}
                    >
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>
                      {item.theme.name}
                    </span>
                  </div>
                  {idx < luxuryProgress.length - 1 && (
                    <div
                      className={`flex-1 h-px mt-[30px] mx-1 ${
                        item.isOwned ? 'bg-[#d4af37]/40' : 'bg-white/10'
                      }`}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            <p className="text-[12px] text-gray-600 mb-4 text-center">
              各ステップ ¥300 — 順番に解除していくシリーズ
            </p>

            <div className="flex flex-col gap-3">
              {luxuryProgress.map((item, idx) => (
                <ThemeCard
                  key={item.theme.id}
                  theme={item.theme}
                  isSelected={selectedTheme === item.theme.id}
                  isPurchased={item.isOwned}
                  isPrerequisiteLocked={item.isPrerequisiteLocked}
                  prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)}
                  stepNumber={idx + 1}
                  onSelect={handleSelectTheme}
                  onPurchase={handlePurchaseTheme}
                />
              ))}
            </div>
          </div>
        )}

        {/* SAKURA tab */}
        {activeTab === 'sakura' && (
          <div>
            <div className="flex items-start mb-6 px-1">
              {makeSeriesProgress(sakuraThemes).map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#e87ca8]' : 'text-gray-600'}`}>
                      STEP {idx + 1}
                    </span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${item.isOwned ? 'bg-[#e87ca8] border-[#e87ca8]' : 'bg-transparent border-white/20'}`}>
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>
                      {item.theme.name}
                    </span>
                  </div>
                  {idx < sakuraThemes.length - 1 && (
                    <div className={`flex-1 h-px mt-[30px] mx-1 ${item.isOwned ? 'bg-[#e87ca8]/40' : 'bg-white/10'}`} />
                  )}
                </Fragment>
              ))}
            </div>
            <p className="text-[12px] text-gray-600 mb-4 text-center">各ステップ ¥300 — 順番に解除していくシリーズ</p>
            <div className="flex flex-col gap-3">
              {makeSeriesProgress(sakuraThemes).map((item, idx) => (
                <ThemeCard
                  key={item.theme.id}
                  theme={item.theme}
                  isSelected={selectedTheme === item.theme.id}
                  isPurchased={item.isOwned}
                  isPrerequisiteLocked={item.isPrerequisiteLocked}
                  prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)}
                  stepNumber={idx + 1}
                  onSelect={handleSelectTheme}
                  onPurchase={handlePurchaseTheme}
                />
              ))}
            </div>
          </div>
        )}

        {/* CHROME tab */}
        {activeTab === 'chrome' && (
          <div>
            <div className="flex items-start mb-6 px-1">
              {makeSeriesProgress(chromeThemes).map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#b8bec8]' : 'text-gray-600'}`}>
                      STEP {idx + 1}
                    </span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${item.isOwned ? 'bg-[#b8bec8] border-[#b8bec8]' : 'bg-transparent border-white/20'}`}>
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>
                      {item.theme.name}
                    </span>
                  </div>
                  {idx < chromeThemes.length - 1 && (
                    <div className={`flex-1 h-px mt-[30px] mx-1 ${item.isOwned ? 'bg-[#b8bec8]/40' : 'bg-white/10'}`} />
                  )}
                </Fragment>
              ))}
            </div>
            <p className="text-[12px] text-gray-600 mb-4 text-center">各ステップ ¥300 — 順番に解除していくシリーズ</p>
            <div className="flex flex-col gap-3">
              {makeSeriesProgress(chromeThemes).map((item, idx) => (
                <ThemeCard
                  key={item.theme.id}
                  theme={item.theme}
                  isSelected={selectedTheme === item.theme.id}
                  isPurchased={item.isOwned}
                  isPrerequisiteLocked={item.isPrerequisiteLocked}
                  prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)}
                  stepNumber={idx + 1}
                  onSelect={handleSelectTheme}
                  onPurchase={handlePurchaseTheme}
                />
              ))}
            </div>
          </div>
        )}
        {/* SNOW tab */}
        {activeTab === 'snow' && (
          <div>
            <div className="flex items-start mb-6 px-1">
              {makeSeriesProgress(snowThemes).map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#a8d4ff]' : 'text-gray-600'}`}>
                      STEP {idx + 1}
                    </span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${item.isOwned ? 'bg-[#a8d4ff] border-[#a8d4ff]' : 'bg-transparent border-white/20'}`}>
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>
                      {item.theme.name}
                    </span>
                  </div>
                  {idx < snowThemes.length - 1 && (
                    <div className={`flex-1 h-px mt-[30px] mx-1 ${item.isOwned ? 'bg-[#a8d4ff]/40' : 'bg-white/10'}`} />
                  )}
                </Fragment>
              ))}
            </div>
            <p className="text-[12px] text-gray-600 mb-4 text-center">各ステップ ¥300 — 順番に解除していくシリーズ</p>
            <div className="flex flex-col gap-3">
              {makeSeriesProgress(snowThemes).map((item, idx) => (
                <ThemeCard
                  key={item.theme.id}
                  theme={item.theme}
                  isSelected={selectedTheme === item.theme.id}
                  isPurchased={item.isOwned}
                  isPrerequisiteLocked={item.isPrerequisiteLocked}
                  prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)}
                  stepNumber={idx + 1}
                  onSelect={handleSelectTheme}
                  onPurchase={handlePurchaseTheme}
                />
              ))}
            </div>
          </div>
        )}

        {/* OCEAN tab */}
        {activeTab === 'ocean' && (
          <div>
            <div className="flex items-start mb-6 px-1">
              {makeSeriesProgress(oceanThemes).map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#00d4ff]' : 'text-gray-600'}`}>
                      STEP {idx + 1}
                    </span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${item.isOwned ? 'bg-[#00d4ff] border-[#00d4ff]' : 'bg-transparent border-white/20'}`}>
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>
                      {item.theme.name}
                    </span>
                  </div>
                  {idx < oceanThemes.length - 1 && (
                    <div className={`flex-1 h-px mt-[30px] mx-1 ${item.isOwned ? 'bg-[#00d4ff]/40' : 'bg-white/10'}`} />
                  )}
                </Fragment>
              ))}
            </div>
            <p className="text-[12px] text-gray-600 mb-4 text-center">各ステップ ¥300 — 順番に解除していくシリーズ</p>
            <div className="flex flex-col gap-3">
              {makeSeriesProgress(oceanThemes).map((item, idx) => (
                <ThemeCard
                  key={item.theme.id}
                  theme={item.theme}
                  isSelected={selectedTheme === item.theme.id}
                  isPurchased={item.isOwned}
                  isPrerequisiteLocked={item.isPrerequisiteLocked}
                  prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)}
                  stepNumber={idx + 1}
                  onSelect={handleSelectTheme}
                  onPurchase={handlePurchaseTheme}
                />
              ))}
            </div>
          </div>
        )}

        {/* EMBER tab */}
        {activeTab === 'ember' && (
          <div>
            <div className="flex items-start mb-6 px-1">
              {makeSeriesProgress(emberThemes).map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#ff7700]' : 'text-gray-600'}`}>STEP {idx + 1}</span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${item.isOwned ? 'bg-[#ff7700] border-[#ff7700]' : 'bg-transparent border-white/20'}`}>
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>{item.theme.name}</span>
                  </div>
                  {idx < emberThemes.length - 1 && (
                    <div className={`flex-1 h-px mt-[30px] mx-1 ${item.isOwned ? 'bg-[#ff7700]/40' : 'bg-white/10'}`} />
                  )}
                </Fragment>
              ))}
            </div>
            <p className="text-[12px] text-gray-600 mb-4 text-center">各ステップ ¥300 — 順番に解除していくシリーズ</p>
            <div className="flex flex-col gap-3">
              {makeSeriesProgress(emberThemes).map((item, idx) => (
                <ThemeCard key={item.theme.id} theme={item.theme} isSelected={selectedTheme === item.theme.id} isPurchased={item.isOwned} isPrerequisiteLocked={item.isPrerequisiteLocked} prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)} stepNumber={idx + 1} onSelect={handleSelectTheme} onPurchase={handlePurchaseTheme} />
              ))}
            </div>
          </div>
        )}

        {/* BOTANICAL tab */}
        {activeTab === 'botanical' && (
          <div>
            <div className="flex items-start mb-6 px-1">
              {makeSeriesProgress(botanicalThemes).map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#7ec850]' : 'text-gray-600'}`}>STEP {idx + 1}</span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${item.isOwned ? 'bg-[#7ec850] border-[#7ec850]' : 'bg-transparent border-white/20'}`}>
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>{item.theme.name}</span>
                  </div>
                  {idx < botanicalThemes.length - 1 && (
                    <div className={`flex-1 h-px mt-[30px] mx-1 ${item.isOwned ? 'bg-[#7ec850]/40' : 'bg-white/10'}`} />
                  )}
                </Fragment>
              ))}
            </div>
            <p className="text-[12px] text-gray-600 mb-4 text-center">各ステップ ¥300 — 順番に解除していくシリーズ</p>
            <div className="flex flex-col gap-3">
              {makeSeriesProgress(botanicalThemes).map((item, idx) => (
                <ThemeCard key={item.theme.id} theme={item.theme} isSelected={selectedTheme === item.theme.id} isPurchased={item.isOwned} isPrerequisiteLocked={item.isPrerequisiteLocked} prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)} stepNumber={idx + 1} onSelect={handleSelectTheme} onPurchase={handlePurchaseTheme} />
              ))}
            </div>
          </div>
        )}

        {/* GLITCH tab */}
        {activeTab === 'glitch' && (
          <div>
            <div className="flex items-start mb-6 px-1">
              {makeSeriesProgress(glitchThemes).map((item, idx) => (
                <Fragment key={item.theme.id}>
                  <div className="flex flex-col items-center gap-1.5 flex-none">
                    <span className={`text-[9px] font-bold tracking-widest ${item.isOwned ? 'text-[#00ff41]' : 'text-gray-600'}`}>STEP {idx + 1}</span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${item.isOwned ? 'bg-[#00ff41] border-[#00ff41]' : 'bg-transparent border-white/20'}`}>
                      {item.isOwned ? (
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center w-[64px] leading-tight ${item.isOwned ? 'text-white' : 'text-gray-600'}`}>{item.theme.name}</span>
                  </div>
                  {idx < glitchThemes.length - 1 && (
                    <div className={`flex-1 h-px mt-[30px] mx-1 ${item.isOwned ? 'bg-[#00ff41]/40' : 'bg-white/10'}`} />
                  )}
                </Fragment>
              ))}
            </div>
            <p className="text-[12px] text-gray-600 mb-4 text-center">各ステップ ¥300 — 順番に解除していくシリーズ</p>
            <div className="flex flex-col gap-3">
              {makeSeriesProgress(glitchThemes).map((item, idx) => (
                <ThemeCard key={item.theme.id} theme={item.theme} isSelected={selectedTheme === item.theme.id} isPurchased={item.isOwned} isPrerequisiteLocked={item.isPrerequisiteLocked} prerequisiteName={getPrerequisiteName(item.theme.prerequisiteId)} stepNumber={idx + 1} onSelect={handleSelectTheme} onPurchase={handlePurchaseTheme} />
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
