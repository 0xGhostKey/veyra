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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', filter: `drop-shadow(0 0 2px ${color})` }}>
      <polygon points={pts} fill={color} fillOpacity={0.06} stroke={color} strokeWidth="1.1" strokeOpacity={1} />
    </svg>
  )
}

const HEXES = [
  { left: '3%',  top: '7%',  size: 24, dur: 5.5, delay: 0   },
  { left: '13%', top: '24%', size: 16, dur: 6.0, delay: 1.5 },
  { left: '7%',  top: '58%', size: 20, dur: 4.8, delay: 3.2 },
  { left: '19%', top: '75%', size: 14, dur: 7.2, delay: 0.7 },
  { left: '31%', top: '12%', size: 28, dur: 5.2, delay: 2.5 },
  { left: '39%', top: '43%', size: 18, dur: 4.2, delay: 4.8 },
  { left: '46%', top: '82%', size: 22, dur: 6.5, delay: 1.9 },
  { left: '54%', top: '8%',  size: 16, dur: 5.0, delay: 3.8 },
  { left: '63%', top: '36%', size: 30, dur: 7.8, delay: 0.9 },
  { left: '69%', top: '63%', size: 18, dur: 4.6, delay: 2.8 },
  { left: '77%', top: '18%', size: 22, dur: 6.2, delay: 1.6 },
  { left: '84%', top: '48%', size: 14, dur: 5.8, delay: 4.2 },
  { left: '89%', top: '76%', size: 26, dur: 4.9, delay: 0.4 },
  { left: '94%', top: '28%', size: 16, dur: 7.3, delay: 3.0 },
  { left: '25%', top: '90%', size: 20, dur: 5.3, delay: 5.8 },
  { left: '73%', top: '90%', size: 18, dur: 6.8, delay: 4.0 },
]

export default function ChromeGoldTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')
  const accent = '#c8a830'

  return (
    <>
      <style>{`
        html, body { background-color: #0c0a00 !important; }
        @keyframes hexPulseGold {
          0%, 100% { opacity: 0; }
          35%, 65%  { opacity: 0.38; }
        }
        @keyframes orbitGold {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitRevGold {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes goldShimmer {
          0%, 100% { box-shadow: 0 0 12px rgba(200,168,48,0.35), 0 0 35px rgba(200,168,48,0.12); }
          50%       { box-shadow: 0 0 26px rgba(200,168,48,0.65), 0 0 60px rgba(200,168,48,0.28); }
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
              animation: `hexPulseGold ${h.dur}s ease-in-out ${h.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          >
            <HexCell size={h.size} color={accent} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0c0a00', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 112, height: 112 }}>
              <div style={{ position: 'absolute', inset: -10, animation: 'orbitGold 8s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 132 132">
                  <circle cx="66" cy="66" r="60" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.45" />
                </svg>
              </div>
              <div style={{ position: 'absolute', inset: -4, animation: 'orbitRevGold 5s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="56" fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 8" strokeOpacity="0.3" />
                </svg>
              </div>
              {profile.avatar_url ? (
                <div className="absolute inset-0 p-px rounded-full" style={{ background: `linear-gradient(135deg, #e8d060, #907820, #e8d060)`, animation: 'goldShimmer 3s ease-in-out infinite' }}>
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #140e00, #1e1600)', border: `1px solid #706020`, animation: 'goldShimmer 3s ease-in-out infinite' }}>
                  <span className="text-3xl font-bold" style={{ color: accent }}>{(profile.display_name ?? 'U')[0].toUpperCase()}</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#e8d880' }}>{profile.display_name ?? 'No Name'}</h1>
            <div className="w-12 h-px mb-3" style={{ background: `linear-gradient(90deg, #604810, ${accent}, #604810)` }} />
            {profile.bio && <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#806830' }}>{profile.bio}</p>}
          </div>

          <MixedLinks
            links={activeLinks}
            gap="gap-3"
            renderTextLink={(link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="group block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #140e00, #1e1600)', border: `1px solid rgba(200,168,48,0.2)`, color: accent }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: `linear-gradient(90deg, transparent, rgba(200,168,48,0.08), transparent)` }} />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
          <div className="flex justify-center"><Logo dark gold /></div>
        </div>
      </div>
    </>
  )
}
