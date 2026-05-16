import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const SPARKS = [
  { left: '5%',  size: 3, dur: 4.2, delay: 0,   color: '#ff4400' },
  { left: '11%', size: 2, dur: 3.6, delay: 1.3,  color: '#ff8800' },
  { left: '17%', size: 4, dur: 5.1, delay: 0.5,  color: '#ff4400' },
  { left: '23%', size: 2, dur: 3.8, delay: 2.4,  color: '#ff8800' },
  { left: '29%', size: 5, dur: 4.7, delay: 0.9,  color: '#ff4400' },
  { left: '35%', size: 3, dur: 3.3, delay: 3.1,  color: '#ff8800' },
  { left: '41%', size: 2, dur: 5.5, delay: 1.7,  color: '#ff4400' },
  { left: '47%', size: 4, dur: 4.0, delay: 0.2,  color: '#ff8800' },
  { left: '53%', size: 3, dur: 3.5, delay: 4.2,  color: '#ff4400' },
  { left: '59%', size: 2, dur: 5.8, delay: 0.6,  color: '#ff8800' },
  { left: '65%', size: 4, dur: 4.4, delay: 2.9,  color: '#ff4400' },
  { left: '71%', size: 3, dur: 3.9, delay: 1.1,  color: '#ff8800' },
  { left: '79%', size: 5, dur: 4.6, delay: 5.5,  color: '#ff4400' },
  { left: '87%', size: 2, dur: 3.2, delay: 3.7,  color: '#ff8800' },
]

export default function EmberRedTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0f0300 !important; }
        @keyframes sparkRise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          8%   { opacity: 0.8; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-105vh) scale(0.5); opacity: 0; }
        }
        @keyframes emberGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,68,0,0.5); }
          50%       { box-shadow: 0 0 35px rgba(255,119,0,0.8), 0 0 60px rgba(255,68,0,0.3); }
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
              background: `radial-gradient(circle, ${s.color} 0%, transparent 70%)`,
              animation: `sparkRise ${s.dur}s ease-out ${s.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0f0300', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #ff4400, transparent)' }} />

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #ff7700, #cc2200)',
                    animation: 'emberGlow 2.5s ease-in-out infinite',
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
                    background: '#1a0800',
                    border: '1px solid rgba(255,68,0,0.4)',
                    animation: 'emberGlow 2.5s ease-in-out infinite',
                  }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#ff7700' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#ffaa77' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, #cc2200, #ff7700, #cc2200)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#994422' }}>
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
                  background: 'linear-gradient(135deg, #1a0800, #260d00)',
                  border: '1px solid rgba(255,68,0,0.2)',
                  color: '#ff7700',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,119,0,0.15), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #ff4400, transparent)' }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
