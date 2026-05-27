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

// Fixed-position hex cells that fade in and out
const HEXES = [
  { left: '4%',  top: '8%',  size: 22, dur: 5.0, delay: 0   },
  { left: '14%', top: '22%', size: 16, dur: 6.5, delay: 1.2 },
  { left: '6%',  top: '55%', size: 18, dur: 4.5, delay: 3.0 },
  { left: '20%', top: '72%', size: 14, dur: 7.0, delay: 0.5 },
  { left: '30%', top: '15%', size: 26, dur: 5.5, delay: 2.2 },
  { left: '38%', top: '45%', size: 18, dur: 4.0, delay: 4.5 },
  { left: '47%', top: '80%', size: 22, dur: 6.0, delay: 1.8 },
  { left: '55%', top: '10%', size: 16, dur: 5.0, delay: 3.5 },
  { left: '62%', top: '38%', size: 28, dur: 7.5, delay: 0.8 },
  { left: '68%', top: '65%', size: 18, dur: 4.5, delay: 2.6 },
  { left: '76%', top: '20%', size: 20, dur: 6.0, delay: 1.5 },
  { left: '83%', top: '50%', size: 14, dur: 5.5, delay: 4.0 },
  { left: '88%', top: '78%', size: 24, dur: 4.8, delay: 0.3 },
  { left: '93%', top: '30%', size: 16, dur: 7.0, delay: 2.8 },
  { left: '24%', top: '88%', size: 20, dur: 5.2, delay: 5.5 },
  { left: '72%', top: '88%', size: 18, dur: 6.5, delay: 3.8 },
]

export default function ChromeSilverTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')
  const accent = '#b8bec8'

  return (
    <>
      <style>{`
        html, body { background-color: #0e0f11 !important; }
        @keyframes hexPulseSilver {
          0%, 100% { opacity: 0; }
          35%, 65%  { opacity: 0.38; }
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

      {/* Pulsing hex grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {HEXES.map((h, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: h.left,
              top: h.top,
              animation: `hexPulseSilver ${h.dur}s ease-in-out ${h.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          >
            <HexCell size={h.size} color={accent} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0e0f11', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 112, height: 112 }}>
              <div style={{ position: 'absolute', inset: -10, animation: 'orbitSilver 8s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 132 132">
                  <circle cx="66" cy="66" r="60" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.45" />
                </svg>
              </div>
              <div style={{ position: 'absolute', inset: -4, animation: 'orbitRevSilver 5s linear infinite' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="56" fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 8" strokeOpacity="0.3" />
                </svg>
              </div>
              {profile.avatar_url ? (
                <div className="absolute inset-0 p-px rounded-full" style={{ background: `linear-gradient(135deg, #dce4ec, #606872, #dce4ec)`, animation: 'silverShimmer 3s ease-in-out infinite' }}>
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1c20, #242830)', border: `1px solid #505860`, animation: 'silverShimmer 3s ease-in-out infinite' }}>
                  <span className="text-3xl font-bold" style={{ color: accent }}>{(profile.display_name ?? 'U')[0].toUpperCase()}</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#dce4ec' }}>{profile.display_name ?? 'No Name'}</h1>
            <div className="w-12 h-px mb-3" style={{ background: `linear-gradient(90deg, #606872, ${accent}, #606872)` }} />
            {profile.bio && <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#808890' }}>{profile.bio}</p>}
          </div>

          <MixedLinks
            links={activeLinks}
            gap="gap-3"
            renderTextLink={(link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="group block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #16181c, #1e2028)', border: `1px solid rgba(184,190,200,0.2)`, color: '#c8d0da' }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: `linear-gradient(90deg, transparent, rgba(184,190,200,0.08), transparent)` }} />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
          <div className="flex justify-center">{!profile.logo_removed && <Logo dark />}</div>
        </div>
      </div>
    </>
  )
}
