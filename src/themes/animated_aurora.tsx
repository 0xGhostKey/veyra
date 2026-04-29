'use client'

import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'

type Props = {
  profile: Profile
  links: Link[]
}

export default function AnimatedAuroraTheme({ profile, links }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center py-12 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(270deg, #7c3aed, #2563eb, #ec4899, #7c3aed)',
        backgroundSize: '300% 300%',
        animation: 'aurora 8s ease infinite',
      }}
    >
      {/* オーロラのアニメーションCSS */}
      <style jsx>{`
        @keyframes aurora {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .float-anim {
          animation: float 3s ease-in-out infinite;
        }
        .link-hover:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* 背景の光の球 */}
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#ec4899', animation: 'aurora 6s ease infinite' }}
      />
      <div
        className="absolute bottom-20 right-10 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#2563eb', animation: 'aurora 8s ease infinite reverse' }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* アバター・プロフィール */}
        <div className="flex flex-col items-center mb-10 float-anim">
          {profile.avatar_url ? (
            <div
              className="p-1 rounded-full mb-4"
              style={{
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
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
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-3xl font-bold text-white drop-shadow-lg">
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1
            className="text-2xl font-bold text-white mb-2 drop-shadow-lg"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            {profile.display_name ?? 'No Name'}
          </h1>
          {profile.bio && (
            <p className="text-white/80 text-sm text-center leading-relaxed max-w-xs drop-shadow">
              {profile.bio}
            </p>
          )}
        </div>

        {/* リンク一覧 */}
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover block w-full px-6 py-4 rounded-2xl text-center text-white font-medium transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* ロゴ */}
        {!profile.logo_removed && (
          <div className="mt-10 flex justify-center">
            <Logo dark />
          </div>
        )}
      </div>
    </div>
  )
}
