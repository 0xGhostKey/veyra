'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SortableLinkCard from '@/components/SortableLinkCard'
import type { Profile, Link as LinkType } from '@/types'

type EditingLink = { id: string | null; title: string; url: string }
type EditingImageLink = { id: string | null; title: string; url: string; image_url: string | null; previewSrc: string | null; file: File | null }
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
  const [hasPurchasedLogoRemove, setHasPurchasedLogoRemove] = useState(false)
  const [saved, setSaved] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)
  const [editingImageLink, setEditingImageLink] = useState<EditingImageLink | null>(null)
  const [showImageForm, setShowImageForm] = useState(false)
  const [uploadingImageLink, setUploadingImageLink] = useState(false)
  const [editingGalleryPhoto, setEditingGalleryPhoto] = useState<EditingGalleryPhoto | null>(null)
  const [showGalleryForm, setShowGalleryForm] = useState(false)
  const [uploadingGalleryPhoto, setUploadingGalleryPhoto] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  )

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

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
      }
      if (profileData) {
        const { data: linksData } = await supabase.from('links').select('*').eq('profile_id', profileData.id).order('sort_order', { ascending: true })
        setLinks(linksData ?? [])
      }
      if (profileData?.role === 'admin') {
        setHasPurchasedLogoRemove(true)
      } else {
        const { data: purchaseData } = await supabase.from('purchases').select('id').eq('user_id', user.id).eq('item_type', 'logo_remove').eq('status', 'paid').single()
        setHasPurchasedLogoRemove(!!purchaseData)
      }
    } catch (e) { console.error('fetchData error:', e) }
    finally { setLoading(false) }
  }

  const handleSaveProfile = async () => {
    if (!profile) return
    setSaving(true)
    const { error } = await supabase.from('profiles').update({ display_name: displayName, bio, updated_at: new Date().toISOString() }).eq('id', profile.id)
    if (!error) { setProfile({ ...profile, display_name: displayName, bio }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    setSaving(false)
  }

  // ── Text link ──

  const handleAddLink = async () => {
    if (!profile || !editingLink) return
    setSaving(true)
    const editableLinks = links.filter(l => l.link_type !== 'gallery')
    const { data, error } = await supabase.from('links').insert({
      profile_id: profile.id, title: editingLink.title, url: editingLink.url,
      link_type: 'text', link_size: 'small', sort_order: editableLinks.length, is_active: true,
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

  // ── Unified drag-and-drop (text + image) ──

  const handleLinkDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const editableLinks = links.filter(l => l.link_type !== 'gallery')
    const oldIdx = editableLinks.findIndex(l => l.id === active.id)
    const newIdx = editableLinks.findIndex(l => l.id === over.id)
    const reordered = arrayMove(editableLinks, oldIdx, newIdx)

    const galleryLinks = links.filter(l => l.link_type === 'gallery')
    setLinks([...reordered.map((l, idx) => ({ ...l, sort_order: idx })), ...galleryLinks])

    await Promise.all(reordered.map((l, idx) => supabase.from('links').update({ sort_order: idx }).eq('id', l.id)))
  }

  // ── Image link ──

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingImageLink) return
    setEditingImageLink({ ...editingImageLink, file, previewSrc: URL.createObjectURL(file) })
  }

  const handleSaveImageLink = async () => {
    if (!profile || !editingImageLink || !editingImageLink.url) return
    setUploadingImageLink(true)
    let imageUrl = editingImageLink.image_url
    if (editingImageLink.file) {
      const ext = editingImageLink.file.name.split('.').pop()
      const path = `${profile.user_id}/link-images/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('avatars').upload(path, editingImageLink.file, { upsert: false })
      if (uploadError) { setUploadingImageLink(false); return }
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      imageUrl = data.publicUrl
    }
    if (!imageUrl) { setUploadingImageLink(false); return }

    if (editingImageLink.id) {
      const { error } = await supabase.from('links').update({ title: editingImageLink.title, url: editingImageLink.url, image_url: imageUrl, updated_at: new Date().toISOString() }).eq('id', editingImageLink.id)
      if (!error) setLinks(links.map(l => l.id === editingImageLink.id ? { ...l, title: editingImageLink.title, url: editingImageLink.url, image_url: imageUrl! } : l))
    } else {
      const editableLinks = links.filter(l => l.link_type !== 'gallery')
      const { data, error } = await supabase.from('links').insert({
        profile_id: profile.id, title: editingImageLink.title, url: editingImageLink.url,
        link_type: 'image', image_url: imageUrl, link_size: 'small',
        sort_order: editableLinks.length, is_active: true,
      }).select().single()
      if (!error && data) setLinks([...links, data])
    }
    setEditingImageLink(null); setShowImageForm(false); setUploadingImageLink(false)
  }

  const handleDeleteImageLink = async (linkId: string) => {
    const { error } = await supabase.from('links').delete().eq('id', linkId)
    if (!error) setLinks(links.filter(l => l.id !== linkId))
  }

  // ── Gallery ──

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingGalleryPhoto) return
    setEditingGalleryPhoto({ ...editingGalleryPhoto, file, previewSrc: URL.createObjectURL(file) })
  }

  const handleSaveGalleryPhoto = async () => {
    if (!profile || !editingGalleryPhoto) return
    setUploadingGalleryPhoto(true)
    let imageUrl = editingGalleryPhoto.image_url
    if (editingGalleryPhoto.file) {
      const ext = editingGalleryPhoto.file.name.split('.').pop()
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
    setEditingGalleryPhoto(null); setShowGalleryForm(false); setUploadingGalleryPhoto(false)
  }

  const handleDeleteGalleryPhoto = async (linkId: string) => {
    const { error } = await supabase.from('links').delete().eq('id', linkId)
    if (!error) setLinks(links.filter(l => l.id !== linkId))
  }

  const handleGalleryMove = async (linkId: string, direction: 'up' | 'down') => {
    const galleryPhotos = links.filter(l => l.link_type === 'gallery')
    const idx = galleryPhotos.findIndex(l => l.id === linkId)
    const newIdx = direction === 'up' ? idx - 1 : idx + 1
    if (newIdx < 0 || newIdx >= galleryPhotos.length) return
    const reordered = [...galleryPhotos];
    [reordered[idx], reordered[newIdx]] = [reordered[newIdx], reordered[idx]]
    setLinks(links.map(l => { if (l.link_type !== 'gallery') return l; return { ...l, sort_order: reordered.findIndex(r => r.id === l.id) } }))
    await Promise.all(reordered.map((l, i) => supabase.from('links').update({ sort_order: i }).eq('id', l.id)))
  }

  const handleCopyUrl = () => {
    if (!profile) return
    navigator.clipboard.writeText(`${window.location.origin}/u/${profile.user_id}`)
    setUrlCopied(true); setTimeout(() => setUrlCopied(false), 2000)
  }

  const handlePurchaseLogoRemove = async () => {
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_LOGO_REMOVE
    if (!priceId) { alert('この購入機能は現在設定中です。'); return }
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ item_type: 'logo_remove', item_id: 'logo_remove', price_id: priceId }) })
    const json = await res.json()
    if (json.url) window.location.href = json.url
    else alert(json.error ?? '決済ページへの遷移に失敗しました。')
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return
    setUploadingAvatar(true)
    const ext = file.name.split('.').pop()
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

  const handleLogout = async () => { await supabase.auth.signOut(); router.push('/') }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-white/10 border-t-[#d4af37] rounded-full animate-spin" />
      </div>
    )
  }

  const editableLinks = links.filter(l => l.link_type !== 'gallery')
  const galleryPhotos = links.filter(l => l.link_type === 'gallery')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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
                  <span className="text-white font-medium">{profile.user_id.slice(0, 8)}...</span>
                </p>
              </div>
              <button onClick={handleCopyUrl}
                className={`flex-none px-4 py-3 rounded-xl text-[12px] font-bold transition-all active:scale-[0.97] ${urlCopied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#d4af37] text-black hover:bg-[#e8cc6a]'}`}>
                {urlCopied ? '済み ✓' : 'コピー'}
              </button>
            </div>
            <a href={`/u/${profile.user_id}`} target="_blank" rel="noopener noreferrer" className="text-[12px] text-gray-500 hover:text-gray-300 transition-colors">公開ページを開く ↗</a>
          </section>
        )}

        {/* Profile */}
        <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
          <p className="text-[11px] font-bold text-gray-500 tracking-[0.12em] uppercase mb-5">プロフィール</p>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="relative cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-white/8 border border-white/10 overflow-hidden flex items-center justify-center [transform:translateZ(0)]">
                  {avatarUrl ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" /> : (
                    <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploadingAvatar ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
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
              <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="あなたの名前"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]" />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1.5">自己紹介</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="あなたについて一言..." rows={3}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors resize-none text-[15px] leading-relaxed" />
            </div>
            <div className="flex gap-2.5 pt-1">
              <Link href="/dashboard/themes" className="flex-1 py-3 text-center text-[13px] font-semibold bg-white/5 border border-white/8 rounded-xl hover:bg-white/10 transition-colors">テーマ変更</Link>
              <button onClick={handleSaveProfile} disabled={saving}
                className={`flex-1 py-3 text-[13px] font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white text-black hover:bg-gray-100'}`}>
                {saving ? '保存中...' : saved ? '保存済み ✓' : '保存'}
              </button>
            </div>
          </div>
        </section>

        {/* ── Unified Links (text + image) ── */}
        <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[11px] font-bold text-gray-500 tracking-[0.12em] uppercase">リンク</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setEditingLink({ id: null, title: '', url: '' }); setShowLinkForm(true); setShowImageForm(false) }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-white/8 hover:bg-white/15 rounded-lg text-[11px] font-medium text-gray-400 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                テキスト
              </button>
              <button
                onClick={() => { setEditingImageLink({ id: null, title: '', url: '', image_url: null, previewSrc: null, file: null }); setShowImageForm(true); setShowLinkForm(false) }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-white/8 hover:bg-white/15 rounded-lg text-[11px] font-medium text-gray-400 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                画像
              </button>
            </div>
          </div>

          {/* Text link form */}
          {showLinkForm && editingLink && (
            <div className="mb-3 p-4 bg-white/5 border border-white/8 rounded-2xl space-y-2.5">
              <input type="text" value={editingLink.title} onChange={e => setEditingLink({ ...editingLink, title: e.target.value })}
                placeholder="タイトル（例: Instagram）" autoFocus
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]" />
              <input type="url" value={editingLink.url} onChange={e => setEditingLink({ ...editingLink, url: e.target.value })}
                placeholder="URL（https://...）"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]" />
              <div className="flex gap-2">
                <button onClick={editingLink.id ? handleUpdateLink : handleAddLink} disabled={saving || !editingLink.title || !editingLink.url}
                  className="flex-1 py-3 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40">
                  {saving ? '...' : editingLink.id ? '更新' : '追加'}
                </button>
                <button onClick={() => { setEditingLink(null); setShowLinkForm(false) }}
                  className="flex-1 py-3 bg-white/5 border border-white/8 text-gray-400 text-[13px] font-medium rounded-xl hover:bg-white/10 transition-colors">
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {/* Image link form */}
          {showImageForm && editingImageLink && (
            <div className="mb-4 p-4 bg-white/5 border border-white/8 rounded-2xl space-y-3">
              <label className="block cursor-pointer">
                <div className="w-2/5 rounded-xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center overflow-hidden transition-colors hover:border-white/30"
                  style={{ aspectRatio: '5/7' }}>
                  {editingImageLink.previewSrc || editingImageLink.image_url ? (
                    <img src={editingImageLink.previewSrc ?? editingImageLink.image_url!} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center py-6 px-3">
                      <svg className="w-7 h-7 text-gray-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[11px] text-gray-600">画像を選択</p>
                      <p className="text-[10px] text-gray-700 mt-0.5">5:7</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
              </label>
              <input type="text" value={editingImageLink.title} onChange={e => setEditingImageLink({ ...editingImageLink, title: e.target.value })}
                placeholder="ラベル（任意・画像の下に表示）"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]" />
              <input type="url" value={editingImageLink.url} onChange={e => setEditingImageLink({ ...editingImageLink, url: e.target.value })}
                placeholder="リンク先URL（https://...）"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]" />
              <div className="flex gap-2">
                <button onClick={handleSaveImageLink} disabled={uploadingImageLink || !editingImageLink.url || (!editingImageLink.file && !editingImageLink.image_url)}
                  className="flex-1 py-3 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40">
                  {uploadingImageLink ? 'アップロード中...' : editingImageLink.id ? '更新' : '追加'}
                </button>
                <button onClick={() => { setEditingImageLink(null); setShowImageForm(false) }}
                  className="flex-1 py-3 bg-white/5 border border-white/8 text-gray-400 text-[13px] font-medium rounded-xl hover:bg-white/10 transition-colors">
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {/* Unified sortable list */}
          {editableLinks.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-600 text-[13px]">リンクがありません</p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleLinkDragEnd}>
              <SortableContext items={editableLinks.map(l => l.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {editableLinks.map(link => (
                    link.link_type === 'text' ? (
                      <SortableLinkCard
                        key={link.id}
                        link={link}
                        onEdit={l => { setEditingLink({ id: l.id, title: l.title, url: l.url }); setShowLinkForm(true); setShowImageForm(false) }}
                        onDelete={handleDeleteLink}
                        onToggleActive={handleToggleActive}
                      />
                    ) : (
                      <SortableImageRow
                        key={link.id}
                        link={link}
                        onEdit={() => { setEditingImageLink({ id: link.id, title: link.title, url: link.url, image_url: link.image_url, previewSrc: null, file: null }); setShowImageForm(true); setShowLinkForm(false) }}
                        onDelete={handleDeleteImageLink}
                      />
                    )
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </section>

        {/* Gallery */}
        <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] font-bold text-gray-500 tracking-[0.12em] uppercase">フォトギャラリー</p>
              <p className="text-[11px] text-gray-700 mt-0.5">最大3枚 · タップで拡大表示</p>
            </div>
            {galleryPhotos.length < 3 && (
              <button onClick={() => { setEditingGalleryPhoto({ id: null, image_url: null, previewSrc: null, file: null }); setShowGalleryForm(true) }}
                className="w-8 h-8 bg-white/8 hover:bg-white/15 rounded-xl flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </button>
            )}
          </div>

          {showGalleryForm && editingGalleryPhoto && (
            <div className="mb-4 p-4 bg-white/5 border border-white/8 rounded-2xl space-y-3">
              <label className="block cursor-pointer">
                <div className="w-1/2 mx-auto rounded-xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center overflow-hidden" style={{ aspectRatio: '5/7' }}>
                  {editingGalleryPhoto.previewSrc || editingGalleryPhoto.image_url ? (
                    <img src={editingGalleryPhoto.previewSrc ?? editingGalleryPhoto.image_url!} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center py-6 px-3">
                      <svg className="w-7 h-7 text-gray-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[11px] text-gray-600">写真を選択</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleGalleryFileChange} />
              </label>
              <div className="flex gap-2">
                <button onClick={handleSaveGalleryPhoto} disabled={uploadingGalleryPhoto || (!editingGalleryPhoto.file && !editingGalleryPhoto.image_url)}
                  className="flex-1 py-3 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40">
                  {uploadingGalleryPhoto ? 'アップロード中...' : '追加'}
                </button>
                <button onClick={() => { setEditingGalleryPhoto(null); setShowGalleryForm(false) }}
                  className="flex-1 py-3 bg-white/5 border border-white/8 text-gray-400 text-[13px] font-medium rounded-xl hover:bg-white/10 transition-colors">
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {galleryPhotos.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-600 text-[13px] mb-3">写真がありません</p>
              <button onClick={() => { setEditingGalleryPhoto({ id: null, image_url: null, previewSrc: null, file: null }); setShowGalleryForm(true) }}
                className="text-[13px] text-[#d4af37] hover:text-[#e8cc6a] transition-colors">+ 写真を追加する</button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {galleryPhotos.map((photo, idx) => (
                <div key={photo.id} className="relative group">
                  <div className="rounded-xl overflow-hidden [transform:translateZ(0)]" style={{ aspectRatio: '5/7' }}>
                    <img src={photo.image_url!} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                    <div className="flex gap-1">
                      <button onClick={() => handleGalleryMove(photo.id, 'up')} disabled={idx === 0}
                        className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 disabled:opacity-30 transition-colors">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={() => handleGalleryMove(photo.id, 'down')} disabled={idx === galleryPhotos.length - 1}
                        className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 disabled:opacity-30 transition-colors">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                    <button onClick={() => handleDeleteGalleryPhoto(photo.id)}
                      className="w-7 h-7 bg-red-500/50 rounded-lg flex items-center justify-center hover:bg-red-500/80 transition-colors">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Logo removal */}
        {!hasPurchasedLogoRemove && !profile?.logo_removed && (
          <section className="rounded-3xl border border-[#d4af37]/20 p-5" style={{ background: 'linear-gradient(160deg, #131008, #0a0a0a)' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold text-[#d4af37] tracking-[0.15em] uppercase mb-1">Premium</p>
                <h3 className="font-bold text-[14px] mb-0.5">Veyra ロゴを非表示に</h3>
                <p className="text-[12px] text-gray-500">買い切り ¥300</p>
              </div>
              <button onClick={handlePurchaseLogoRemove}
                className="flex-none px-4 py-2.5 bg-[#d4af37] text-black text-[12px] font-bold rounded-xl hover:bg-[#e8cc6a] active:scale-[0.97] transition-all">
                購入する
              </button>
            </div>
          </section>
        )}

      </main>
    </div>
  )
}

// ── Sortable image row for dashboard ──

function SortableImageRow({ link, onEdit, onDelete }: { link: LinkType; onEdit: () => void; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 px-3 py-3 rounded-2xl border border-white/8 bg-white/5">
      <div className="text-gray-600 cursor-grab active:cursor-grabbing flex-shrink-0 touch-none" {...attributes} {...listeners}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </div>
      <div className="flex-none rounded-lg overflow-hidden bg-white/8" style={{ width: 32, aspectRatio: '5/7' }}>
        {link.image_url && <img src={link.image_url} alt="" className="w-full h-full object-cover" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-gray-300 truncate">{link.url || '—'}</p>
        <p className="text-[10px] text-gray-600 mt-0.5">画像リンク</p>
      </div>
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button onClick={onEdit} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 transition-colors">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
        </button>
        <button onClick={() => onDelete(link.id)} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
        </button>
      </div>
    </div>
  )
}
