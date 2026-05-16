import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

function HexCell({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  const pts = [0, 60, 120, 180, 240, 300].map((deg) => {
    const r = (deg - 30) * Math.PI / 180
    return `${size / 2 + (size / 2 - 1) * Math.cos(r)},${size / 2 + (size / 2 - 1) * Math.sin(r)}`
  }).join(' ')
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <polygon points={pts} fill="none" stroke={color} strokeWidth="0.8" strokeOpacity={opacity} />
    </svg>
  )
}

const HEXES = [
  { left: '1%',  dur: 21, delay: 0,    size: 20, op: 0.65, drift: 16  },
  { left: '7%',  dur: 27, delay: 5.5,  size: 12, op: 0.45, drift: -14 },
  { left: '14%', dur: 18, delay: 2,    size: 24, op: 0.75, drift: 20  },
  { left: '21%', dur: 25, delay: 9.5,  size: 14, op: 0.55, drift: -18 },
  { left: '28%', dur: 20, delay: 4.5,  size: 22, op: 0.7,  drift: 14  },
  { left: '36%', dur: 30, delay: 13,   size: 10, op: 0.4,  drift: -22 },
  { left: '43%', dur: 17, delay: 1,    size: 26, op: 0.8,  drift: 18  },
  { left: '51%', dur: 23, delay: 8,    size: 14, op: 0.6,  drift: -12 },
  { left: '59%', dur: 19, delay: 5,    size: 20, op: 0.7,  drift: 22  },
  { left: '66%', dur: 26, delay: 11,   size: 12, op: 0.5,  drift: -16 },
  { left: '73%', dur: 21, delay: 3.5,  size: 18, op: 0.65, drift: 14  },
  { left: '80%', dur: 28, delay: 8.5,  size: 22, op: 0.55, drift: -20 },
  { left: '87%', dur: 18, delay: 14,   size: 14, op: 0.75, drift: 16  },
  { left: '94%', dur: 24, delay: 7,    size: 10, op: 0.6,  drift: -14 },
]

export default function ChromeVoidTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')
  const accent = '#4090e0'
  const accentBright = '#80b8f0'

  return (
    <>
      <style>{`
        html, body { background-color: #03040a !important; }
        @keyframes hexRiseVoid {
          0%   { transform: translateY(105vh) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-60px) translateX(var(--drift)) rotate(60deg); opacity: 0; }
        }
        @keyframes scanVoid {
          0%   { top: -2px; opacity: 0; }
          3%   { opacity: 1; }
          97%  { opacity: 0.8; }
          100% { top: 100vh; opacity: 0; }
        }
        @keyframes orbitVoid {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitRevVoid {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes voidShimmer {
          0%, 100% { box-shadow: 0 0 16px rgba(64,144,224,0.4), 0 0 45px rgba(64,144,224,0.15); }
          50%       { box-shadow: 0 0 30px rgba(64,144,224,0.7), 0 0 80px rgba(64,144,224,0.3), 0 0 120px rgba(64,144,224,0.1); }
        }
      `}</style>

      {/* Floating hex cells */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {HEXES.map((h, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '-60px',
              left: h.left,
              '--drift': `${h.drift}px`,
              animation: `hexRiseVoid ${h.dur}s linear ${h.delay}s infinite`,
            } as React.CSSProperties}
          >
            <HexCell size={h.size} color={accentBright} opacity={h.op} />
          </div>
        ))}

        {/* Scan line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(to right, transparent, ${accent}90, ${accentBright}, ${accent}90, transparent)`,
            boxShadow: `0 0 16px ${accentBright}, 0 0 40px ${accent}80`,
            animation: 'scanVoid 5.5s linear 0.5s infinite',
          }}
        />
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#03040a', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 112, height: 112 }}>
              <div style={{ position: 'absolute', inset: -10, animation: 'orbitVoid 7s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 132 132">
                  <circle cx="66" cy="66" r="60" fill="none" stroke={accentBright} strokeWidth="0.9" strokeDasharray="6 5" strokeOpacity="0.5" />
                </svg>
              </div>
              <div style={{ position: 'absolute', inset: -4, animation: 'orbitRevVoid 4.5s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="56" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 8" strokeOpacity="0.35" />
                </svg>
              </div>

              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${accentBright}, #2060b0, ${accentBright})`,
                    animation: 'voidShimmer 3s ease-in-out infinite',
                  }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #060810, #0c1020)',
                    border: `1px solid rgba(64,144,224,0.3)`,
                    animation: 'voidShimmer 3s ease-in-out infinite',
                  }}
                >
                  <span className="text-3xl font-bold" style={{ color: accentBright }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#c0d8f0' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: `linear-gradient(90deg, #2060b0, ${accentBright}, #2060b0)` }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#4870a0' }}>
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
                  background: 'linear-gradient(135deg, #060810, #0c1020)',
                  border: `1px solid rgba(64,144,224,0.25)`,
                  color: accentBright,
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(64,144,224,0.08), transparent)` }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          <div className="h-px mt-10 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

          {!profile.logo_removed && (
            <div className="flex justify-center">
              <Logo dark />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
