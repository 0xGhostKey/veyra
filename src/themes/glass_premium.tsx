'use client'

import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import ImageLinkGrid from '@/components/ImageLinkGrid'

type Props = {
  profile: Profile
  links: Link[]
}

export default function GlassPremiumTheme({ profile, links }: Props) {
  const textLinks = links.filter((l) => l.link_type !== 'image')
  const imageLinks = links.filter((l) => l.link_type === 'image')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 relative">
      {/* overscroll含め全域をカバーする固定背景レイヤー */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)',
        }}
      />
      <div className="w-full max-w-md">
        {/* メインカード（ガラスモーフィズム） */}
        <div
          className="rounded-3xl p-8 mb-6"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* アバター・プロフィール */}
          <div className="flex flex-col items-center mb-8">
            {profile.avatar_url ? (
              <div
                className="p-0.5 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.8), rgba(255,255,255,0.3))',
                }}
              >
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name ?? 'avatar'}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: 'rgba(0, 212, 255, 0.15)',
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                }}
              >
                <span className="text-3xl text-cyan-300">
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1 className="text-2xl font-bold text-white mb-2">
              {profile.display_name ?? 'No Name'}
            </h1>
            {profile.bio && (
              <p className="text-white/60 text-sm text-center leading-relaxed max-w-xs">
                {profile.bio}
              </p>
            )}
          </div>

          {/* リンク一覧 */}
          <div className="flex flex-col gap-3">
            {textLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 rounded-2xl text-center text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                }}
              >
                {link.title}
              </a>
            ))}
          </div>
          <ImageLinkGrid links={imageLinks} />
        </div>

        {/* ロゴ */}
        {!profile.logo_removed && (
          <div className="flex justify-center">
            <Logo dark />
          </div>
        )}
      </div>
    </div>
  )
}
