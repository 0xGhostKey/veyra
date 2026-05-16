import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const SPARKS = [
  { left: '4%',  size: 3, dur: 4.4, delay: 0,   color: '#ffaa00' },
  { left: '10%', size: 2, dur: 3.7, delay: 1.5,  color: '#ffd060' },
  { left: '16%', size: 4, dur: 5.2, delay: 0.4,  color: '#ffaa00' },
  { left: '22%', size: 2, dur: 3.9, delay: 2.6,  color: '#ffd060' },
  { left: '28%', size: 5, dur: 4.8, delay: 0.8,  color: '#ffaa00' },
  { left: '34%', size: 3, dur: 3.4, delay: 3.3,  color: '#ffd060' },
  { left: '40%', size: 2, dur: 5.6, delay: 1.8,  color: '#ffaa00' },
  { left: '46%', size: 4, dur: 4.1, delay: 0.1,  color: '#ffd060' },
  { left: '52%', size: 3, dur: 3.6, delay: 4.5,  color: '#ffaa00' },
  { left: '58%', size: 2, dur: 5.9, delay: 0.7,  color: '#ffd060' },
  { left: '64%', size: 4, dur: 4.5, delay: 3.0,  color: '#ffaa00' },
  { left: '72%', size: 3, dur: 4.0, delay: 1.2,  color: '#ffd060' },
  { left: '80%', size: 5, dur: 4.7, delay: 5.7,  color: '#ffaa00' },
  { left: '88%', size: 2, dur: 3.3, delay: 3.9,  color: '#ffd060' },
]

export default function EmberGoldTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0c0700 !important; }
        @keyframes sparkRiseGold {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          8%   { opacity: 0.8; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-105vh) scale(0.5); opacity: 0; }
        }
        @keyframes goldEmberGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,170,0,0.5); }
          50%       { box-shadow: 0 0 35px rgba(255,208,96,0.8), 0 0 60px rgba(255,170,0,0.3); }
        }
      `}</style>

      {/* Gold spark overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {SPARKS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${s.color} 0%, transparent 70%)`,
              animation: `sparkRiseGold ${s.dur}s ease-out ${s.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0c0700', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #ffaa00, transparent)' }} />

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #ffd060, #aa7000)',
                    animation: 'goldEmberGlow 2.5s ease-in-out infinite',
                  }}
                >
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name ?? 'avatar'}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{
                    background: '#1a1000',
                    border: '1px solid rgba(255,170,0,0.4)',
                    animation: 'goldEmberGlow 2.5s ease-in-out infinite',
                  }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#ffd060' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#ffe090' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, #aa7000, #ffaa00, #aa7000)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#806020' }}>
                {profile.bio}
              </p>
            )}
          </div>

          <MixedLinks
            links={activeLinks}
            gap="gap-3"
            renderTextLink={(link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1a1000, #241600)',
                  border: '1px solid rgba(255,170,0,0.2)',
                  color: '#ffd060',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,208,96,0.15), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #ffaa00, transparent)' }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
