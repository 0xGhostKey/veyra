import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

function HexCell({ size, color }: { size: number; color: string }) {
  const pts = [0, 60, 120, 180, 240, 300].map((deg) => {
    const r = (deg - 30) * Math.PI / 180
    return `${size / 2 + (size / 2 - 1.5) * Math.cos(r)},${size / 2 + (size / 2 - 1.5) * Math.sin(r)}`
  }).join(' ')
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', filter: `drop-shadow(0 0 3px ${color})` }}>
      <polygon points={pts} fill={color} fillOpacity={0.1} stroke={color} strokeWidth="1.1" strokeOpacity={1} />
    </svg>
  )
}

const HEXES = [
  { left: '5%',  top: '9%',  size: 26, dur: 6.0, delay: 0   },
  { left: '15%', top: '26%', size: 18, dur: 7.0, delay: 1.8 },
  { left: '8%',  top: '60%', size: 22, dur: 5.0, delay: 3.5 },
  { left: '21%', top: '78%', size: 16, dur: 7.8, delay: 0.9 },
  { left: '32%', top: '14%', size: 30, dur: 5.8, delay: 2.7 },
  { left: '40%', top: '46%', size: 20, dur: 4.5, delay: 5.2 },
  { left: '48%', top: '84%', size: 24, dur: 7.0, delay: 2.0 },
  { left: '56%', top: '11%', size: 18, dur: 5.5, delay: 4.0 },
  { left: '64%', top: '40%', size: 32, dur: 8.2, delay: 1.0 },
  { left: '70%', top: '67%', size: 20, dur: 5.0, delay: 3.0 },
  { left: '78%', top: '22%', size: 24, dur: 6.5, delay: 1.7 },
  { left: '85%', top: '52%', size: 16, dur: 6.0, delay: 4.5 },
  { left: '90%', top: '80%', size: 28, dur: 5.2, delay: 0.5 },
  { left: '95%', top: '32%', size: 18, dur: 7.5, delay: 3.2 },
  { left: '27%', top: '92%', size: 22, dur: 5.5, delay: 6.0 },
  { left: '74%', top: '92%', size: 20, dur: 7.0, delay: 4.2 },
]

export default function ChromePlatinumTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')
  const accent = '#dce4ec'

  return (
    <>
      <style>{`
        html, body { background-color: #08090c !important; }
        @keyframes hexPulsePlatinum {
          0%, 100% { opacity: 0; }
          35%, 65%  { opacity: 0.55; }
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

      {/* Pulsing hex grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {HEXES.map((h, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: h.left,
              top: h.top,
              animation: `hexPulsePlatinum ${h.dur}s ease-in-out ${h.delay}s infinite`,
            }}
          >
            <HexCell size={h.size} color={accent} />
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
          <div className="flex justify-center"><Logo dark /></div>
        </div>
      </div>
    </>
  )
}
