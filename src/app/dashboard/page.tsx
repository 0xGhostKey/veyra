'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import ProfileSection from '@/components/dashboard/ProfileSection'
import LinksSection from '@/components/dashboard/LinksSection'
import GallerySection from '@/components/dashboard/GallerySection'
import BillingSection from '@/components/dashboard/BillingSection'
import AccountSection from '@/components/dashboard/AccountSection'
import type { Profile, Link as LinkType } from '@/types'

type EditingLink = { id: string | null; title: string; url: string }
type EditingGalleryPhoto = { id: string | null; image_url: string | null; previewSrc: string | null; file: File | null }

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
  const [saved, setSaved] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)
  const [editingGalleryPhoto, setEditingGalleryPhoto] = useState<EditingGalleryPhoto | null>(null)
  const [showGalleryForm, setShowGalleryForm] = useState(false)
  const [uploadingGalleryPhoto, setUploadingGalleryPhoto] = useState(false)
  const [currentEmail, setCurrentEmail] = useState<string | null>(null)
  const [newEmail, setNewEmail] = useState('')
  const [emailChanging, setEmailChanging] = useState(false)
  const [emailChangeMessage, setEmailChangeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [cancelingSubscription, setCancelingSubscription] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [customSlug, setCustomSlug] = useState('')
  const [slugInput, setSlugInput] = useState('')
  const [showSlugEdit, setShowSlugEdit] = useState(false)
  const [slugSaving, setSlugSaving] = useState(false)
  const [slugError, setSlugError] = useState<string | null>(null)
  const [slugSaved, setSlugSaved] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  )

  const galleryPreviewUrlRef = useRef<string | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setCurrentEmail(user.email ?? null)

      let { data: profileData } = await supabase.from('profiles').select('*').eq('user_id', user.id).single()
      if (!profileData) {
        const { data: newProfile } = await supabase.from('profiles').insert({ user_id: user.id }).select().single()
        profileData = newProfile
      }
      if (profileData) {
        setProfile(profileData)
        setDisplayName(profileData.display_name ?? '')
        setBio(profileData.bio ?? '')
        setAvatarUrl(profileData.avatar_url ?? null)
        setCustomSlug(profileData.custom_slug ?? '')
        setSlugInput(profileData.custom_slug ?? '')
        // 初回ログイン判定
        if (!localStorage.getItem('veyra_onboarding_done')) {
          setShowOnboarding(true)
        }
      }
      if (profileData) {
        const { data: linksData } = await supabase.from('links').select('*').eq('profile_id', profileData.id).order('sort_order', { ascending: true })
        setLinks(linksData ?? [])
      }
    } catch (e) { console.error('fetchData error:', e) }
    finally { setLoading(false) }
  }

  // ── Profile ──

  const handleSaveProfile = async () => {
    if (!profile) return
    setSaving(true)
    const { error } = await supabase.from('profiles').update({ display_name: displayName, bio, updated_at: new Date().toISOString() }).eq('id', profile.id)
    if (!error) { setProfile({ ...profile, display_name: displayName, bio }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    setSaving(false)
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return
    if (file.size > 5 * 1024 * 1024 || !file.type.startsWith('image/')) return
    setUploadingAvatar(true)
    const ext = /\.([^.]+)$/.exec(file.name)?.[1] ?? 'jpg'
    const path = `${profile.user_id}/avatar.${ext}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (!uploadError) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const url = `${data.publicUrl}?t=${Date.now()}`
      await supabase.from('profiles').update({ avatar_url: url }).eq('id', profile.id)
      setAvatarUrl(url); setProfile({ ...profile, avatar_url: url })
    }
    setUploadingAvatar(false)
  }

  // ── Text links ──

  const handleAddLink = async () => {
    if (!profile || !editingLink) return
    const currentTextLinks = links.filter(l => l.link_type === 'text')
    const limit = (profile.role === 'admin' || profile.logo_removed) ? 30 : 5
    if (currentTextLinks.length >= limit) return
    setSaving(true)
    const { data, error } = await supabase.from('links').insert({
      profile_id: profile.id, title: editingLink.title, url: editingLink.url,
      link_type: 'text', link_size: 'small', sort_order: currentTextLinks.length, is_active: true,
    }).select().single()
    if (!error && data) { setLinks([...links, data]); setEditingLink(null); setShowLinkForm(false) }
    setSaving(false)
  }

  const handleUpdateLink = async () => {
    if (!editingLink?.id) return
    setSaving(true)
    const { error } = await supabase.from('links').update({ title: editingLink.title, url: editingLink.url, updated_at: new Date().toISOString() }).eq('id', editingLink.id)
    if (!error) { setLinks(links.map(l => l.id === editingLink.id ? { ...l, title: editingLink.title, url: editingLink.url } : l)); setEditingLink(null); setShowLinkForm(false) }
    setSaving(false)
  }

  const handleDeleteLink = async (linkId: string) => {
    const { error } = await supabase.from('links').delete().eq('id', linkId)
    if (!error) setLinks(links.filter(l => l.id !== linkId))
  }

  const handleToggleActive = async (linkId: string, isActive: boolean) => {
    const { error } = await supabase.from('links').update({ is_active: isActive }).eq('id', linkId)
    if (!error) setLinks(links.map(l => l.id === linkId ? { ...l, is_active: isActive } : l))
  }

  const handleLinkDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const textLinks = links.filter(l => l.link_type === 'text')
    const oldIdx = textLinks.findIndex(l => l.id === active.id)
    const newIdx = textLinks.findIndex(l => l.id === over.id)
    const reordered = arrayMove(textLinks, oldIdx, newIdx)
    const otherLinks = links.filter(l => l.link_type !== 'text')
    setLinks([...reordered.map((l, idx) => ({ ...l, sort_order: idx })), ...otherLinks])
    await Promise.all(reordered.map((l, idx) => supabase.from('links').update({ sort_order: idx }).eq('id', l.id)))
  }

  // ── Gallery ──

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingGalleryPhoto) return
    if (file.size > 5 * 1024 * 1024) { alert('5MB以下の画像を選択してください。'); return }
    if (!file.type.startsWith('image/')) { alert('画像ファイルを選択してください。'); return }
    if (galleryPreviewUrlRef.current) URL.revokeObjectURL(galleryPreviewUrlRef.current)
    const previewSrc = URL.createObjectURL(file)
    galleryPreviewUrlRef.current = previewSrc
    setEditingGalleryPhoto({ ...editingGalleryPhoto, file, previewSrc })
  }

  const closeGalleryForm = () => {
    if (galleryPreviewUrlRef.current) {
      URL.revokeObjectURL(galleryPreviewUrlRef.current)
      galleryPreviewUrlRef.current = null
    }
    setEditingGalleryPhoto(null)
    setShowGalleryForm(false)
  }

  const handleSaveGalleryPhoto = async () => {
    if (!profile || !editingGalleryPhoto) return
    setUploadingGalleryPhoto(true)
    let imageUrl = editingGalleryPhoto.image_url
    if (editingGalleryPhoto.file) {
      const ext = /\.([^.]+)$/.exec(editingGalleryPhoto.file.name)?.[1] ?? 'jpg'
      const path = `${profile.user_id}/gallery/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('avatars').upload(path, editingGalleryPhoto.file, { upsert: false })
      if (uploadError) { setUploadingGalleryPhoto(false); return }
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      imageUrl = data.publicUrl
    }
    if (!imageUrl) { setUploadingGalleryPhoto(false); return }
    const galleryPhotos = links.filter(l => l.link_type === 'gallery')
    if (editingGalleryPhoto.id) {
      const { error } = await supabase.from('links').update({ image_url: imageUrl, updated_at: new Date().toISOString() }).eq('id', editingGalleryPhoto.id)
      if (!error) setLinks(links.map(l => l.id === editingGalleryPhoto.id ? { ...l, image_url: imageUrl! } : l))
    } else {
      const { data, error } = await supabase.from('links').insert({
        profile_id: profile.id, title: '', url: '', link_type: 'gallery', image_url: imageUrl, link_size: 'small',
        sort_order: galleryPhotos.length, is_active: true,
      }).select().single()
      if (!error && data) setLinks([...links, data])
    }
    closeGalleryForm(); setUploadingGalleryPhoto(false)
  }

  const handleDeleteGalleryPhoto = async (linkId: string) => {
    const { error } = await supabase.from('links').delete().eq('id', linkId)
    if (!error) setLinks(links.filter(l => l.id !== linkId))
  }

  const handleGalleryDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const galleryPhotos = links.filter(l => l.link_type === 'gallery')
    const oldIdx = galleryPhotos.findIndex(l => l.id === active.id)
    const newIdx = galleryPhotos.findIndex(l => l.id === over.id)
    const reordered = arrayMove(galleryPhotos, oldIdx, newIdx)
    const otherLinks = links.filter(l => l.link_type !== 'gallery')
    setLinks([...otherLinks, ...reordered.map((l, i) => ({ ...l, sort_order: i }))])
    await Promise.all(reordered.map((l, i) => supabase.from('links').update({ sort_order: i }).eq('id', l.id)))
  }

  // ── Billing ──

  const handleLogoRemoveSubscribe = async () => {
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_LOGO_REMOVE_MONTHLY
    if (!priceId) { alert('現在ご利用いただけません。'); return }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_type: 'logo_remove', item_id: 'logo_remove', price_id: priceId }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  const handleCancelSubscription = async () => {
    if (!confirm('サブスクリプションをキャンセルしますか？\n次の更新日まではロゴ非表示が継続されます。')) return
    setCancelingSubscription(true)
    const res = await fetch('/api/subscription/cancel', { method: 'POST' })
    if (res.ok) {
      setProfile(prev => prev ? { ...prev, subscription_status: 'canceling' } : prev)
    } else {
      alert('キャンセル処理に失敗しました。')
    }
    setCancelingSubscription(false)
  }

  // ── Account ──

  const handleEmailChange = async () => {
    if (!newEmail) return
    setEmailChanging(true)
    setEmailChangeMessage(null)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) {
      setEmailChangeMessage({ type: 'error', text: 'メールアドレスの変更に失敗しました。' })
    } else {
      setEmailChangeMessage({ type: 'success', text: '確認メールを新しいアドレスに送信しました。' })
      setNewEmail('')
    }
    setEmailChanging(false)
  }

  // ── Custom slug ──

  const RESERVED_SLUGS = new Set(['admin', 'api', 'dashboard', 'login', 'signup', 'themes', 'preview', 'terms', 'privacy', 'u', 'auth', 'checkout', 'reset-password', 'forgot-password'])

  const handleSaveSlug = async () => {
    if (!profile) return
    const slug = slugInput.trim().toLowerCase()
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(slug)) {
      setSlugError('3〜20文字の英数字・ハイフン・アンダースコアのみ使えます')
      return
    }
    if (RESERVED_SLUGS.has(slug)) {
      setSlugError('このURLは使用できません')
      return
    }
    setSlugSaving(true)
    setSlugError(null)
    // 重複チェック
    const { data: existing } = await supabase.from('profiles').select('user_id').eq('custom_slug', slug).maybeSingle()
    if (existing && existing.user_id !== profile.user_id) {
      setSlugError('このURLはすでに使われています')
      setSlugSaving(false)
      return
    }
    const { error } = await supabase.from('profiles').update({ custom_slug: slug }).eq('user_id', profile.user_id)
    if (!error) {
      setCustomSlug(slug)
      setProfile({ ...profile, custom_slug: slug })
      setShowSlugEdit(false)
      setSlugSaved(true)
      setTimeout(() => setSlugSaved(false), 2000)
    }
    setSlugSaving(false)
  }

  const handleCopyUrl = () => {
    if (!profile) return
    navigator.clipboard.writeText(publicUrl)
    setUrlCopied(true); setTimeout(() => setUrlCopied(false), 2000)
  }

  const handleLogout = async () => { await supabase.auth.signOut(); router.push('/') }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 py-4">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
              <span className="text-[16px] font-bold tracking-wider">Veyra</span>
            </div>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-5 py-8 space-y-5">
          {/* Skeleton cards */}
          {[180, 220, 160].map((h, i) => (
            <div key={i} className="bg-[#111] rounded-3xl border border-white/8 p-5 animate-pulse">
              <div className="h-3 w-20 bg-white/8 rounded-full mb-5" />
              <div style={{ height: h }} className="bg-white/5 rounded-2xl" />
            </div>
          ))}
        </main>
      </div>
    )
  }

  const textLinks = links.filter(l => l.link_type === 'text')
  const imageLinks = links.filter(l => l.link_type === 'image')
  const galleryPhotos = links.filter(l => l.link_type === 'gallery')
  const isPremium = profile?.role === 'admin' || !!profile?.logo_removed
  const linkLimit = isPremium ? 30 : 5
  const publicUrl = `${window.location.origin}/u/${customSlug || profile?.user_id}`

  const dismissOnboarding = () => {
    localStorage.setItem('veyra_onboarding_done', '1')
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Onboarding overlay */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pb-safe bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#141414] border border-white/10 rounded-3xl p-6">
            <p className="text-[11px] font-bold text-[#d4af37] tracking-[0.12em] uppercase mb-4">はじめに</p>
            <h2 className="text-[20px] font-bold text-white mb-5">3ステップで公開しよう</h2>
            <div className="space-y-3 mb-6">
              {[
                { step: '1', title: 'テーマを選ぶ', desc: '好みのデザインをプロフィールに設定' },
                { step: '2', title: 'リンクを追加', desc: 'SNS・URLを自由に登録' },
                { step: '3', title: '公開ページを共有', desc: 'URLをコピーしてプロフィールに貼る' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center flex-none">
                    <span className="text-[11px] font-bold text-[#d4af37]">{step}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">{title}</p>
                    <p className="text-[12px] text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={dismissOnboarding}
              className="w-full py-3.5 bg-[#d4af37] text-black text-[14px] font-bold rounded-xl hover:bg-[#e8cc6a] active:scale-[0.98] transition-all"
            >
              さっそく始める
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            <span className="text-[16px] font-bold tracking-wider">Veyra</span>
          </Link>
          <div className="flex items-center gap-4">
            {profile?.role === 'admin' && (
              <Link href="/admin" className="text-[13px] text-[#d4af37] hover:text-[#e8cc6a] transition-colors font-semibold">Admin</Link>
            )}
            {profile && (
              <Link href={`/u/${profile.user_id}`} target="_blank" className="text-[13px] text-gray-500 hover:text-white transition-colors">公開ページ ↗</Link>
            )}
            <button onClick={handleLogout} className="text-[13px] text-gray-600 hover:text-gray-300 transition-colors">ログアウト</button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-8 space-y-5 pb-safe">

        {/* Public URL */}
        {profile && (
          <section className="rounded-3xl border border-[#d4af37]/15 p-5" style={{ background: 'linear-gradient(160deg, #131008, #0d0d0d)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <p className="text-[11px] font-bold text-[#d4af37] tracking-[0.12em] uppercase">あなたの公開ページ</p>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 min-w-0 px-4 py-3 bg-black/40 border border-white/8 rounded-xl">
                <p className="text-[13px] text-gray-300 truncate">
                  <span className="text-gray-600">veyra.jp/u/</span>
                  <span className="text-white font-medium">{customSlug || `${profile.user_id.slice(0, 8)}...`}</span>
                </p>
              </div>
              <button onClick={handleCopyUrl}
                className={`flex-none px-4 py-3 rounded-xl text-[12px] font-bold transition-all active:scale-[0.97] ${urlCopied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#d4af37] text-black hover:bg-[#e8cc6a]'}`}>
                {urlCopied ? '済み ✓' : 'コピー'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <a href={`/u/${customSlug || profile.user_id}`} target="_blank" rel="noopener noreferrer" className="text-[12px] text-gray-500 hover:text-gray-300 transition-colors">公開ページを開く ↗</a>
              <button onClick={() => { setShowSlugEdit(v => !v); setSlugError(null) }}
                className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors">
                {customSlug ? 'URLを変更 ✏' : 'カスタムURLを設定 +'}
              </button>
            </div>

            {/* Slug edit form */}
            {showSlugEdit && (
              <div className="mt-4 pt-4 border-t border-white/8 space-y-2.5">
                <div className="flex items-center gap-2 bg-black/40 border border-white/8 rounded-xl px-4 py-2.5">
                  <span className="text-[12px] text-gray-600 flex-none">veyra.jp/u/</span>
                  <input
                    type="text"
                    value={slugInput}
                    onChange={e => { setSlugInput(e.target.value.toLowerCase()); setSlugError(null) }}
                    onKeyDown={e => { if (e.key === 'Enter') handleSaveSlug() }}
                    placeholder="yourname"
                    maxLength={20}
                    className="flex-1 bg-transparent text-white text-[13px] focus:outline-none placeholder-gray-700"
                  />
                  <span className="text-[10px] text-gray-700 flex-none">{slugInput.length}/20</span>
                </div>
                {slugError && <p className="text-[12px] text-red-400">{slugError}</p>}
                {slugSaved && <p className="text-[12px] text-green-400">URLを更新しました ✓</p>}
                <p className="text-[11px] text-gray-700">3〜20文字 · 英数字 / ハイフン / アンダースコアのみ</p>
                <div className="flex gap-2">
                  <button onClick={handleSaveSlug} disabled={slugSaving || slugInput.length < 3}
                    className="flex-1 py-2.5 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40">
                    {slugSaving ? '保存中...' : '保存'}
                  </button>
                  <button onClick={() => { setShowSlugEdit(false); setSlugInput(customSlug); setSlugError(null) }}
                    className="flex-1 py-2.5 bg-white/5 border border-white/8 text-gray-400 text-[13px] rounded-xl hover:bg-white/10 transition-colors">
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {profile && (
          <ProfileSection
            profile={profile}
            displayName={displayName}
            bio={bio}
            avatarUrl={avatarUrl}
            saving={saving}
            saved={saved}
            uploadingAvatar={uploadingAvatar}
            onDisplayNameChange={setDisplayName}
            onBioChange={setBio}
            onSave={handleSaveProfile}
            onAvatarChange={handleAvatarChange}
          />
        )}

        <LinksSection
          textLinks={textLinks}
          imageLinks={imageLinks}
          linkLimit={linkLimit}
          showLinkForm={showLinkForm}
          editingLink={editingLink}
          saving={saving}
          sensors={sensors}
          onShowForm={() => { setEditingLink({ id: null, title: '', url: '' }); setShowLinkForm(true) }}
          onEditingLinkChange={setEditingLink}
          onAdd={handleAddLink}
          onUpdate={handleUpdateLink}
          onCancel={() => { setEditingLink(null); setShowLinkForm(false) }}
          onEdit={l => { setEditingLink({ id: l.id, title: l.title, url: l.url }); setShowLinkForm(true) }}
          onDelete={handleDeleteLink}
          onToggleActive={handleToggleActive}
          onDragEnd={handleLinkDragEnd}
        />

        <GallerySection
          galleryPhotos={galleryPhotos}
          showGalleryForm={showGalleryForm}
          editingGalleryPhoto={editingGalleryPhoto}
          uploadingGalleryPhoto={uploadingGalleryPhoto}
          sensors={sensors}
          onOpenForm={() => { setEditingGalleryPhoto({ id: null, image_url: null, previewSrc: null, file: null }); setShowGalleryForm(true) }}
          onFileChange={handleGalleryFileChange}
          onSave={handleSaveGalleryPhoto}
          onClose={closeGalleryForm}
          onDelete={handleDeleteGalleryPhoto}
          onToggleActive={handleToggleActive}
          onDragEnd={handleGalleryDragEnd}
        />

        {profile && (
          <BillingSection
            profile={profile}
            cancelingSubscription={cancelingSubscription}
            onSubscribe={handleLogoRemoveSubscribe}
            onCancel={handleCancelSubscription}
          />
        )}

        <AccountSection
          currentEmail={currentEmail}
          newEmail={newEmail}
          emailChanging={emailChanging}
          emailChangeMessage={emailChangeMessage}
          onNewEmailChange={setNewEmail}
          onEmailChange={handleEmailChange}
        />

      </main>
    </div>
  )
}
