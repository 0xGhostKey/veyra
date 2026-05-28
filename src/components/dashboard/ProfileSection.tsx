'use client'

import Link from 'next/link'
import type { Profile } from '@/types'

type Props = {
  profile: Profile
  displayName: string
  bio: string
  avatarUrl: string | null
  saving: boolean
  saved: boolean
  uploadingAvatar: boolean
  onDisplayNameChange: (v: string) => void
  onBioChange: (v: string) => void
  onSave: () => void
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileSection({
  displayName, bio, avatarUrl, saving, saved, uploadingAvatar,
  onDisplayNameChange, onBioChange, onSave, onAvatarChange,
}: Props) {
  return (
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
            <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} disabled={uploadingAvatar} />
          </label>
          <p className="text-[11px] text-gray-600">タップして画像を変更</p>
        </div>
        <div>
          <label className="block text-[11px] text-gray-500 mb-1.5">表示名</label>
          <input type="text" value={displayName} onChange={e => onDisplayNameChange(e.target.value)} placeholder="あなたの名前"
            className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]" />
        </div>
        <div>
          <label className="block text-[11px] text-gray-500 mb-1.5">自己紹介</label>
          <textarea value={bio} onChange={e => onBioChange(e.target.value)} placeholder="あなたについて一言..." rows={3}
            className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors resize-none text-[15px] leading-relaxed" />
        </div>
        <div className="flex gap-2.5 pt-1">
          <Link href="/dashboard/themes" className="flex-1 py-3 text-center text-[13px] font-semibold bg-white/5 border border-white/8 rounded-xl hover:bg-white/10 transition-colors">テーマ変更</Link>
          <button onClick={onSave} disabled={saving}
            className={`flex-1 py-3 text-[13px] font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white text-black hover:bg-gray-100'}`}>
            {saving ? '保存中...' : saved ? '保存済み ✓' : '保存'}
          </button>
        </div>
      </div>
    </section>
  )
}
