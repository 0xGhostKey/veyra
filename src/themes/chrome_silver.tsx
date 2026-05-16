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
  { left: '3%',  dur: 18, delay: 0,    size: 14, op: 0.5,  drift: 10  },
  { left: '9%',  dur: 24, delay: 4,    size: 10, op: 0.35, drift: -8  },
  { left: '16%', dur: 15, delay: 1.5,  size: 18, op: 0.6,  drift: 14  },
  { left: '23%', dur: 22, delay: 7,    size: 12, op: 0.4,  drift: -12 },
  { left: '30%', dur: 17, delay: 2.8,  size: 16, op: 0.55, drift: 8   },
  { left: '38%', dur: 26, delay: 10,   size: 10, op: 0.3,  drift: -16 },
  { left: '45%', dur: 14, delay: 0.5,  size: 20, op: 0.65, drift: 12  },
  { left: '53%', dur: 20, delay: 5.5,  size: 12, op: 0.45, drift: -10 },
  { left: '61%', dur: 16, delay: 3.2,  size: 16, op: 0.55, drift: 16  },
  { left: '68%', dur: 23, delay: 8.5,  size: 10, op: 0.35, drift: -6  },
  { left: '75%', dur: 18, delay: 1.2,  size: 14, op: 0.5,  drift: 10  },
  { left: '82%', dur: 25, delay: 6,    size: 18, op: 0.4,  drift: -14 },
  { left: '89%', dur: 15, delay: 11,   size: 12, op: 0.6,  drift: 8   },
  { left: '95%', dur: 21, delay: 4.5,  size: 10, op: 0.45, drift: -10 },
]

export default function ChromeSilverTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')
  const accent = '#b8bec8'

  return (
    <>
      <style>{`
        html, body { background-color: #0e0f11 !important; }
        @keyframes hexRise {
          0%   { transform: translateY(105vh) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-60px) translateX(var(--drift)) rotate(60deg); opacity: 0; }
        }
        @keyframes scanSilver {
          0%   { top: -2px; opacity: 0; }
          3%   { opacity: 1; }
          97%  { opacity: 0.7; }
          100% { top: 100vh; opacity: 0; }
        }
        @keyframes orbitSilver {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitRevSilver {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes silverShimmer {
          0%, 100% { box-shadow: 0 0 10px rgba(184,190,200,0.3), 0 0 30px rgba(184,190,200,0.1); }
          50%       { box-shadow: 0 0 22px rgba(184,190,200,0.6), 0 0 55px rgba(184,190,200,0.22); }
        }
      `}</style>

      {/* Floating hex cells (rise upward) */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {HEXES.map((h, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '-60px',
              left: h.left,
              '--drift': `${h.drift}px`,
              animation: `hexRise ${h.dur}s linear ${h.delay}s infinite`,
            } as React.CSSProperties}
          >
            <HexCell size={h.size} color={accent} opacity={h.op} />
          </div>
        ))}

        {/* Scan line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(to right, transparent, ${accent}90, ${accent}, ${accent}90, transparent)`,
            boxShadow: `0 0 12px ${accent}, 0 0 30px ${accent}60`,
            animation: 'scanSilver 6s linear 1s infinite',
          }}
        />
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0e0f11', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

          <div className="flex flex-col items-center mb-10">
            {/* Avatar with orbit rings */}
            <div className="relative mb-4" style={{ width: 112, height: 112 }}>
              {/* Outer orbit ring */}
              <div style={{ position: 'absolute', inset: -10, animation: 'orbitSilver 8s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 132 132">
                  <circle cx="66" cy="66" r="60" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.45" />
                </svg>
              </div>
              {/* Inner orbit ring */}
              <div style={{ position: 'absolute', inset: -4, animation: 'orbitRevSilver 5s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="56" fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 8" strokeOpacity="0.3" />
                </svg>
              </div>

              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #dce4ec, #606872, #dce4ec)`,
                    animation: 'silverShimmer 3s ease-in-out infinite',
                  }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #1a1c20, #242830)',
                    border: `1px solid #505860`,
                    animation: 'silverShimmer 3s ease-in-out infinite',
                  }}
                >
                  <span className="text-3xl font-bold" style={{ color: accent }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#dce4ec' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: `linear-gradient(90deg, #606872, ${accent}, #606872)` }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#808890' }}>
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
                  background: 'linear-gradient(135deg, #16181c, #1e2028)',
                  border: `1px solid rgba(184,190,200,0.2)`,
                  color: '#c8d0da',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(184,190,200,0.08), transparent)` }}
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
