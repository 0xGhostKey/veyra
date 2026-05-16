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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', filter: `drop-shadow(0 0 4px ${color})` }}>
      <polygon points={pts} fill={color} fillOpacity={0.14} stroke={color} strokeWidth="1.2" strokeOpacity={1} />
    </svg>
  )
}

const HEXES = [
  { left: '2%',  top: '6%',  size: 28, dur: 5.5, delay: 0   },
  { left: '12%', top: '22%', size: 20, dur: 6.8, delay: 1.6 },
  { left: '5%',  top: '56%', size: 24, dur: 4.8, delay: 3.3 },
  { left: '18%', top: '74%', size: 18, dur: 7.5, delay: 0.8 },
  { left: '29%', top: '11%', size: 32, dur: 5.3, delay: 2.4 },
  { left: '37%', top: '42%', size: 22, dur: 4.3, delay: 5.0 },
  { left: '45%', top: '80%', size: 26, dur: 6.8, delay: 1.8 },
  { left: '53%', top: '7%',  size: 20, dur: 5.2, delay: 3.6 },
  { left: '61%', top: '35%', size: 34, dur: 8.0, delay: 0.9 },
  { left: '67%', top: '62%', size: 22, dur: 4.7, delay: 2.7 },
  { left: '75%', top: '19%', size: 26, dur: 6.3, delay: 1.5 },
  { left: '82%', top: '49%', size: 18, dur: 5.8, delay: 4.3 },
  { left: '87%', top: '77%', size: 30, dur: 5.0, delay: 0.4 },
  { left: '93%', top: '29%', size: 20, dur: 7.2, delay: 2.9 },
  { left: '23%', top: '91%', size: 24, dur: 5.4, delay: 5.7 },
  { left: '71%', top: '91%', size: 22, dur: 6.7, delay: 3.9 },
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
        @keyframes hexPulseVoid {
          0%, 100% { opacity: 0; }
          35%, 65%  { opacity: 0.7; }
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
          50%       { box-shadow: 0 0 30px rgba(64,144,224,0.7), 0 0 80px rgba(64,144,224,0.3); }
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
              animation: `hexPulseVoid ${h.dur}s ease-in-out ${h.delay}s infinite`,
            }}
          >
            <HexCell size={h.size} color={accentBright} />
          </div>
        ))}
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
                <div className="absolute inset-0 p-px rounded-full" style={{ background: `linear-gradient(135deg, ${accentBright}, #2060b0, ${accentBright})`, animation: 'voidShimmer 3s ease-in-out infinite' }}>
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #060810, #0c1020)', border: `1px solid rgba(64,144,224,0.3)`, animation: 'voidShimmer 3s ease-in-out infinite' }}>
                  <span className="text-3xl font-bold" style={{ color: accentBright }}>{(profile.display_name ?? 'U')[0].toUpperCase()}</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#c0d8f0' }}>{profile.display_name ?? 'No Name'}</h1>
            <div className="w-12 h-px mb-3" style={{ background: `linear-gradient(90deg, #2060b0, ${accentBright}, #2060b0)` }} />
            {profile.bio && <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#4870a0' }}>{profile.bio}</p>}
          </div>

          <MixedLinks
            links={activeLinks}
            gap="gap-3"
            renderTextLink={(link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="group block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #060810, #0c1020)', border: `1px solid rgba(64,144,224,0.25)`, color: accentBright }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: `linear-gradient(90deg, transparent, rgba(64,144,224,0.08), transparent)` }} />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
          <div className="flex justify-center"><Logo dark /></div>
        </div>
      </div>
    </>
  )
}
