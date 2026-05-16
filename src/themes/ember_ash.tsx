import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const ASH = [
  { left: '6%',  size: 2, dur: 12.0, delay: 0   },
  { left: '13%', size: 3, dur:  9.5, delay: 2.1  },
  { left: '20%', size: 1, dur: 14.5, delay: 0.7  },
  { left: '27%', size: 4, dur:  8.5, delay: 3.8  },
  { left: '34%', size: 2, dur: 15.0, delay: 1.4  },
  { left: '41%', size: 3, dur: 10.5, delay: 5.2  },
  { left: '49%', size: 1, dur: 13.0, delay: 0.3  },
  { left: '56%', size: 4, dur:  8.8, delay: 6.5  },
  { left: '63%', size: 2, dur: 11.5, delay: 2.9  },
  { left: '70%', size: 3, dur: 16.0, delay: 0.9  },
  { left: '78%', size: 1, dur:  9.2, delay: 4.4  },
  { left: '86%', size: 4, dur: 12.8, delay: 7.1  },
]

export default function EmberAshTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #111010 !important; }
        @keyframes ashDrift {
          0%   { transform: translateY(-10px) translateX(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.55; }
          85%  { opacity: 0.4; }
          100% { transform: translateY(105vh) translateX(30px) rotate(180deg); opacity: 0; }
        }
        @keyframes ashShimmer {
          0%, 100% { box-shadow: 0 0 12px rgba(208,200,188,0.3); }
          50%       { box-shadow: 0 0 24px rgba(208,200,188,0.55), 0 0 48px rgba(176,160,144,0.2); }
        }
      `}</style>

      {/* Ash particle overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {ASH.map((a, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-10px',
              left: a.left,
              width: a.size,
              height: a.size * 1.5,
              background: '#b0a090',
              borderRadius: '50%',
              animation: `ashDrift ${a.dur}s linear ${a.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#111010', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #b0a090, transparent)' }} />

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #d0c8bc, #707060)',
                    animation: 'ashShimmer 3s ease-in-out infinite',
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
                    background: '#1a1918',
                    border: '1px solid rgba(176,160,144,0.3)',
                    animation: 'ashShimmer 3s ease-in-out infinite',
                  }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#d0c8bc' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#e0d8d0' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, #b0a090, transparent)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#706858' }}>
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
                  background: 'linear-gradient(135deg, #1a1918, #202018)',
                  border: '1px solid rgba(176,160,144,0.2)',
                  color: '#d0c8bc',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(208,200,188,0.1), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #b0a090, transparent)' }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
