import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const SPARKS = [
  { left: '3%',  size: 5, dur: 3.8, delay: 0,    color: '#ffaa00' },
  { left: '7%',  size: 7, dur: 4.5, delay: 0.5,  color: '#ffd060' },
  { left: '11%', size: 4, dur: 3.5, delay: 1.3,  color: '#ffaa00' },
  { left: '15%', size: 8, dur: 5.0, delay: 0.2,  color: '#ffd060' },
  { left: '19%', size: 5, dur: 4.6, delay: 2.1,  color: '#ffaa00' },
  { left: '23%', size: 6, dur: 3.9, delay: 0.8,  color: '#ffd060' },
  { left: '27%', size: 9, dur: 4.8, delay: 3.4,  color: '#ffaa00' },
  { left: '31%', size: 4, dur: 3.3, delay: 1.6,  color: '#ffd060' },
  { left: '35%', size: 7, dur: 5.2, delay: 0.4,  color: '#ffaa00' },
  { left: '39%', size: 5, dur: 4.1, delay: 4.0,  color: '#ffd060' },
  { left: '43%', size: 8, dur: 3.7, delay: 2.5,  color: '#ffaa00' },
  { left: '47%', size: 6, dur: 4.9, delay: 0.9,  color: '#ffd060' },
  { left: '51%', size: 4, dur: 3.4, delay: 3.8,  color: '#ffaa00' },
  { left: '55%', size: 9, dur: 5.1, delay: 1.1,  color: '#ffd060' },
  { left: '59%', size: 5, dur: 4.3, delay: 0.3,  color: '#ffaa00' },
  { left: '63%', size: 7, dur: 3.6, delay: 5.2,  color: '#ffd060' },
  { left: '67%', size: 4, dur: 4.7, delay: 2.0,  color: '#ffaa00' },
  { left: '71%', size: 8, dur: 5.4, delay: 0.6,  color: '#ffd060' },
  { left: '75%', size: 6, dur: 3.8, delay: 3.1,  color: '#ffaa00' },
  { left: '79%', size: 9, dur: 4.5, delay: 1.4,  color: '#ffd060' },
  { left: '83%', size: 5, dur: 3.2, delay: 4.7,  color: '#ffaa00' },
  { left: '87%', size: 7, dur: 5.0, delay: 0.7,  color: '#ffd060' },
  { left: '91%', size: 4, dur: 4.2, delay: 2.8,  color: '#ffaa00' },
  { left: '95%', size: 6, dur: 3.6, delay: 6.0,  color: '#ffd060' },
]

export default function EmberGoldTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0c0700 !important; }
        @keyframes sparkRise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          8%   { opacity: 0.95; }
          35%  { transform: translateY(-35vh) translateX(9px) scale(0.85); opacity: 0.72; }
          65%  { transform: translateY(-68vh) translateX(-7px) scale(0.6); opacity: 0.36; }
          100% { transform: translateY(-108vh) translateX(5px) scale(0.3); opacity: 0; }
        }
        @keyframes goldEmberGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(255,170,0,0.55); }
          50%       { box-shadow: 0 0 44px rgba(255,210,80,0.95), 0 0 75px rgba(255,170,0,0.4); }
        }
      `}</style>

      {/* Spark overlay */}
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
              background: `radial-gradient(circle, ${s.color} 0%, ${s.color}aa 35%, transparent 70%)`,
              animation: `sparkRise ${s.dur}s ease-out ${s.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0c0700', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #ffaa00, transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #ffd060, #aa7000)', animation: 'goldEmberGlow 2.5s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#1a1000', border: '1px solid rgba(255,170,0,0.4)', animation: 'goldEmberGlow 2.5s ease-in-out infinite' }}
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
                  border: '1px solid rgba(255,170,0,0.22)',
                  color: '#ffd060',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,210,80,0.16), transparent)' }}
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
