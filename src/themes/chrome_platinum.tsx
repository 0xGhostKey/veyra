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
    return `${size / 2 + (size / 2 - 1.5) * Math.cos(r)},${size / 2 + (size / 2 - 1.5) * Math.sin(r)}`
  }).join(' ')
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', filter: `drop-shadow(0 0 4px ${color})` }}>
      <polygon points={pts} fill={color} fillOpacity={opacity * 0.15} stroke={color} strokeWidth="1.2" strokeOpacity={opacity} />
    </svg>
  )
}

const HEXES = [
  { left: '4%',  dur: 22, delay: 0,    size: 22, op: 0.75, drift: 14  },
  { left: '10%', dur: 28, delay: 6,    size: 16, op: 0.55, drift: -12 },
  { left: '17%', dur: 17, delay: 2.5,  size: 26, op: 0.85, drift: 18  },
  { left: '24%', dur: 25, delay: 9,    size: 18, op: 0.65, drift: -16 },
  { left: '32%', dur: 19, delay: 4,    size: 24, op: 0.8,  drift: 12  },
  { left: '40%', dur: 30, delay: 12,   size: 14, op: 0.5,  drift: -20 },
  { left: '47%', dur: 16, delay: 1.5,  size: 28, op: 0.9,  drift: 16  },
  { left: '55%', dur: 23, delay: 7.5,  size: 16, op: 0.7,  drift: -10 },
  { left: '63%', dur: 18, delay: 5,    size: 22, op: 0.8,  drift: 20  },
  { left: '70%', dur: 26, delay: 10,   size: 14, op: 0.6,  drift: -14 },
  { left: '77%', dur: 20, delay: 3,    size: 20, op: 0.75, drift: 12  },
  { left: '84%', dur: 29, delay: 8,    size: 24, op: 0.65, drift: -18 },
  { left: '90%', dur: 17, delay: 13,   size: 18, op: 0.85, drift: 14  },
  { left: '96%', dur: 24, delay: 6.5,  size: 14, op: 0.7,  drift: -12 },
]

export default function ChromePlatinumTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')
  const accent = '#dce4ec'

  return (
    <>
      <style>{`
        html, body { background-color: #08090c !important; }
        @keyframes hexRisePlatinum {
          0%   { transform: translateY(105vh) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-60px) translateX(var(--drift)) rotate(60deg); opacity: 0; }
        }
        @keyframes orbitPlatinum {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitRevPlatinum {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes platinumShimmer {
          0%, 100% { box-shadow: 0 0 14px rgba(220,228,236,0.3), 0 0 40px rgba(220,228,236,0.1); }
          50%       { box-shadow: 0 0 28px rgba(220,228,236,0.6), 0 0 70px rgba(220,228,236,0.22); }
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
              animation: `hexRisePlatinum ${h.dur}s linear ${h.delay}s infinite`,
            } as React.CSSProperties}
          >
            <HexCell size={h.size} color={accent} opacity={h.op} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#08090c', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, #b0bac4, transparent)` }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 112, height: 112 }}>
              <div style={{ position: 'absolute', inset: -10, animation: 'orbitPlatinum 8s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 132 132">
                  <circle cx="66" cy="66" r="60" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.4" />
                </svg>
              </div>
              <div style={{ position: 'absolute', inset: -4, animation: 'orbitRevPlatinum 5s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="56" fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 8" strokeOpacity="0.25" />
                </svg>
              </div>
              {profile.avatar_url ? (
                <div className="absolute inset-0 p-px rounded-full" style={{ background: `linear-gradient(135deg, #dce4ec, #808090, #dce4ec)`, animation: 'platinumShimmer 3s ease-in-out infinite' }}>
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f1014, #141620)', border: `1px solid #404860`, animation: 'platinumShimmer 3s ease-in-out infinite' }}>
                  <span className="text-3xl font-bold" style={{ color: accent }}>{(profile.display_name ?? 'U')[0].toUpperCase()}</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#eef2f6' }}>{profile.display_name ?? 'No Name'}</h1>
            <div className="w-12 h-px mb-3" style={{ background: `linear-gradient(90deg, #505870, #c0c8d8, #505870)` }} />
            {profile.bio && <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#607080' }}>{profile.bio}</p>}
          </div>

          <MixedLinks
            links={activeLinks}
            gap="gap-3"
            renderTextLink={(link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="group block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f1014, #141620)', border: `1px solid rgba(220,228,236,0.15)`, color: accent }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: `linear-gradient(90deg, transparent, rgba(220,228,236,0.08), transparent)` }} />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: `linear-gradient(90deg, transparent, #b0bac4, transparent)` }} />
          {!profile.logo_removed && <div className="flex justify-center"><Logo dark /></div>}
        </div>
      </div>
    </>
  )
}
