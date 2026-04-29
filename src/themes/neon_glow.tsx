import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'

type Props = {
  profile: Profile
  links: Link[]
}

export default function NeonGlowTheme({ profile, links }: Props) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* アバター・プロフィール */}
        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-0.5 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
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
                background: '#111',
                border: '2px solid #ff00ff',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.5), inset 0 0 20px rgba(255, 0, 255, 0.1)',
              }}
            >
              <span
                className="text-3xl font-bold"
                style={{
                  color: '#ff00ff',
                  textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff',
                }}
              >
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1
            className="text-2xl font-bold tracking-widest uppercase mb-1"
            style={{
              color: '#ffffff',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)',
            }}
          >
            {profile.display_name ?? 'No Name'}
          </h1>
          {/* ネオンライン */}
          <div
            className="w-16 h-px my-3"
            style={{
              background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
              boxShadow: '0 0 8px rgba(255, 0, 255, 0.8)',
            }}
          />
          {profile.bio && (
            <p className="text-gray-400 text-sm text-center leading-relaxed max-w-xs">
              {profile.bio}
            </p>
          )}
        </div>

        {/* リンク一覧 */}
        <div className="flex flex-col gap-4">
          {links.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300"
              style={{
                background: '#111111',
                border: index % 2 === 0 ? '1px solid rgba(255, 0, 255, 0.4)' : '1px solid rgba(0, 255, 255, 0.4)',
                color: index % 2 === 0 ? '#ff00ff' : '#00ffff',
                textShadow: index % 2 === 0
                  ? '0 0 8px rgba(255, 0, 255, 0.8)'
                  : '0 0 8px rgba(0, 255, 255, 0.8)',
                boxShadow: index % 2 === 0
                  ? '0 0 15px rgba(255, 0, 255, 0.15), inset 0 0 15px rgba(255, 0, 255, 0.05)'
                  : '0 0 15px rgba(0, 255, 255, 0.15), inset 0 0 15px rgba(0, 255, 255, 0.05)',
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
