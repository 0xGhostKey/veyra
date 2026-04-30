'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import LinkCard from '@/components/LinkCard'
import type { Profile, Link as LinkType } from '@/types'

type EditingLink = {
  id: string | null
  title: string
  url: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [editingLink, setEditingLink] = useState<EditingLink | null>(null)
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [hasPurchasedLogoRemove, setHasPurchasedLogoRemove] = useState(false)
  const [saved, setSaved] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      let { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      // 新規ユーザー: プロフィールが存在しなければ自動作成
      if (!profileData) {
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({ user_id: user.id })
          .select()
          .single()
        profileData = newProfile
      }

      if (profileData) {
        setProfile(profileData)
        setDisplayName(profileData.display_name ?? '')
        setBio(profileData.bio ?? '')
        setAvatarUrl(profileData.avatar_url ?? null)
      }

      if (profileData) {
        const { data: linksData } = await supabase
          .from('links')
          .select('*')
          .eq('profile_id', profileData.id)
          .order('sort_order', { ascending: true })

        setLinks(linksData ?? [])
      }

      // admin は全コンテンツ無料
      if (profileData?.role === 'admin') {
        setHasPurchasedLogoRemove(true)
      } else {
        const { data: purchaseData } = await supabase
          .from('purchases')
          .select('id')
          .eq('user_id', user.id)
          .eq('item_type', 'logo_remove')
          .eq('status', 'paid')
          .single()
        setHasPurchasedLogoRemove(!!purchaseData)
      }
    } catch (e) {
      console.error('fetchData error:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!profile) return
    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: displayName,
        bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id)

    if (!error) {
      setProfile({ ...profile, display_name: displayName, bio })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  const handleAddLink = async () => {
    if (!profile || !editingLink) return
    setSaving(true)

    const { data, error } = await supabase
      .from('links')
      .insert({
        profile_id: profile.id,
        title: editingLink.title,
        url: editingLink.url,
        sort_order: links.length,
        is_active: true,
      })
      .select()
      .single()

    if (!error && data) {
      setLinks([...links, data])
      setEditingLink(null)
      setShowLinkForm(false)
    }
    setSaving(false)
  }

  const handleUpdateLink = async () => {
    if (!editingLink?.id) return
    setSaving(true)

    const { error } = await supabase
      .from('links')
      .update({
        title: editingLink.title,
        url: editingLink.url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', editingLink.id)

    if (!error) {
      setLinks(links.map((l) => (l.id === editingLink.id ? { ...l, title: editingLink.title, url: editingLink.url } : l)))
      setEditingLink(null)
      setShowLinkForm(false)
    }
    setSaving(false)
  }

  const handleDeleteLink = async (linkId: string) => {
    const { error } = await supabase.from('links').delete().eq('id', linkId)
    if (!error) {
      setLinks(links.filter((l) => l.id !== linkId))
    }
  }

  const handleCopyUrl = () => {
    if (!profile) return
    const url = `${window.location.origin}/u/${profile.user_id}`
    navigator.clipboard.writeText(url)
    setUrlCopied(true)
    setTimeout(() => setUrlCopied(false), 2000)
  }

  const handleToggleActive = async (linkId: string, isActive: boolean) => {
    const { error } = await supabase
      .from('links')
      .update({ is_active: isActive })
      .eq('id', linkId)

    if (!error) {
      setLinks(links.map((l) => (l.id === linkId ? { ...l, is_active: isActive } : l)))
    }
  }

  const handlePurchaseLogoRemove = async () => {
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_LOGO_REMOVE
    if (!priceId) {
      alert('この購入機能は現在設定中です。')
      return
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_type: 'logo_remove',
        item_id: 'logo_remove',
        price_id: priceId,
      }),
    })
    const json = await res.json()
    if (json.url) {
      window.location.href = json.url
    } else {
      alert(json.error ?? '決済ページへの遷移に失敗しました。')
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return
    setUploadingAvatar(true)

    const ext = file.name.split('.').pop()
    const path = `${profile.user_id}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })

    if (!uploadError) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const url = `${data.publicUrl}?t=${Date.now()}`
      await supabase.from('profiles').update({ avatar_url: url }).eq('id', profile.id)
      setAvatarUrl(url)
      setProfile({ ...profile, avatar_url: url })
    }
    setUploadingAvatar(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-white/10 border-t-[#d4af37] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 py-3.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            <span className="text-[16px] font-bold tracking-wider">Veyra</span>
          </Link>
          <div className="flex items-center gap-4">
            {profile?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-[13px] text-[#d4af37] hover:text-[#e8cc6a] transition-colors font-semibold"
              >
                Admin
              </Link>
            )}
            {profile && (
              <Link
                href={`/u/${profile.user_id}`}
                target="_blank"
                className="text-[13px] text-gray-500 hover:text-white transition-colors"
              >
                公開ページ ↗
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-[13px] text-gray-600 hover:text-gray-300 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 space-y-4 pb-safe">

        {/* Public URL card */}
        {profile && (
          <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
            <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase mb-3">
              あなたの公開URL
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0 px-4 py-3 bg-white/5 border border-white/8 rounded-xl">
                <p className="text-[13px] text-gray-300 truncate">
                  <span className="text-gray-600">veyra.jp/u/</span>
                  <span className="text-white font-medium">{profile.user_id.slice(0, 8)}...</span>
                </p>
              </div>
              <button
                onClick={handleCopyUrl}
                className={`flex-none px-4 py-3 rounded-xl text-[12px] font-bold transition-all active:scale-[0.97] ${
                  urlCopied
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {urlCopied ? 'コピー済み ✓' : 'コピー'}
              </button>
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              <a
                href={`/u/${profile.user_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#d4af37] hover:text-[#e8cc6a] transition-colors"
              >
                公開ページを開く ↗
              </a>
            </div>
          </section>
        )}

        {/* Profile section */}
        <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
          <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase mb-4">
            プロフィール
          </p>
          <div className="space-y-3">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <label className="relative cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-white/8 border border-white/10 overflow-hidden flex items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploadingAvatar ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={uploadingAvatar} />
              </label>
              <p className="text-[11px] text-gray-600">タップして画像を変更</p>
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1.5">表示名</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="あなたの名前"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1.5">自己紹介</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="あなたについて一言..."
                rows={3}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors resize-none text-[15px] leading-relaxed"
              />
            </div>
            <div className="flex gap-2.5 pt-1">
              <Link
                href="/dashboard/themes"
                className="flex-1 py-3 text-center text-[13px] font-semibold bg-white/5 border border-white/8 rounded-xl hover:bg-white/10 transition-colors"
              >
                テーマ変更
              </Link>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className={`flex-1 py-3 text-[13px] font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 ${
                  saved
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {saving ? '保存中...' : saved ? '保存済み ✓' : '保存'}
              </button>
            </div>
          </div>
        </section>

        {/* Links section */}
        <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase">
              リンク
            </p>
            <button
              onClick={() => {
                setEditingLink({ id: null, title: '', url: '' })
                setShowLinkForm(true)
              }}
              className="w-8 h-8 bg-white/8 hover:bg-white/15 rounded-xl flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Link form */}
          {showLinkForm && editingLink && (
            <div className="mb-3 p-4 bg-white/5 border border-white/8 rounded-2xl space-y-2.5">
              <input
                type="text"
                value={editingLink.title}
                onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                placeholder="タイトル（例: Instagram）"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]"
                autoFocus
              />
              <input
                type="url"
                value={editingLink.url}
                onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                placeholder="URL（https://...）"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]"
              />
              <div className="flex gap-2">
                <button
                  onClick={editingLink.id ? handleUpdateLink : handleAddLink}
                  disabled={saving || !editingLink.title || !editingLink.url}
                  className="flex-1 py-3 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40"
                >
                  {saving ? '...' : editingLink.id ? '更新' : '追加'}
                </button>
                <button
                  onClick={() => {
                    setEditingLink(null)
                    setShowLinkForm(false)
                  }}
                  className="flex-1 py-3 bg-white/5 border border-white/8 text-gray-400 text-[13px] font-medium rounded-xl hover:bg-white/10 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {/* Links list */}
          {links.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-600 text-[13px] mb-3">リンクがありません</p>
              <button
                onClick={() => {
                  setEditingLink({ id: null, title: '', url: '' })
                  setShowLinkForm(true)
                }}
                className="text-[13px] text-[#d4af37] hover:text-[#e8cc6a] transition-colors"
              >
                + 最初のリンクを追加する
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onEdit={(l) => {
                    setEditingLink({ id: l.id, title: l.title, url: l.url })
                    setShowLinkForm(true)
                  }}
                  onDelete={handleDeleteLink}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          )}
        </section>

        {/* Logo removal */}
        {!hasPurchasedLogoRemove && !profile?.logo_removed && (
          <section
            className="rounded-3xl border border-[#d4af37]/20 p-5"
            style={{ background: 'linear-gradient(160deg, #131008, #0a0a0a)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold text-[#d4af37] tracking-[0.15em] uppercase mb-1">
                  Premium
                </p>
                <h3 className="font-bold text-[14px] mb-0.5">Veyra ロゴを非表示に</h3>
                <p className="text-[12px] text-gray-500">買い切り ¥300</p>
              </div>
              <button
                onClick={handlePurchaseLogoRemove}
                className="flex-none px-4 py-2.5 bg-[#d4af37] text-black text-[12px] font-bold rounded-xl hover:bg-[#e8cc6a] active:scale-[0.97] transition-all"
              >
                購入する
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
