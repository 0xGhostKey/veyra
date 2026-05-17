import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

function Leaf({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  const w = Math.round(size * 0.58)
  const h = size
  return (
    <svg width={w} height={h} viewBox="0 0 16 28" style={{ display: 'block' }}>
      {/* Main leaf body — elongated, pointed tip & base */}
      <path
        d="M8 1 C11 3 14 9 14 15 C14 21 12 25 8 27 C4 25 2 21 2 15 C2 9 5 3 8 1Z"
        fill={color}
        fillOpacity={opacity}
      />
      {/* Central vein */}
      <line x1="8" y1="1" x2="8" y2="27" stroke={color} strokeOpacity={Math.min(opacity * 2.2, 1)} strokeWidth="0.9" />
      {/* Upper side veins */}
      <line x1="8" y1="9"  x2="3"  y2="14" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="9"  x2="13" y2="14" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      {/* Lower side veins */}
      <line x1="8" y1="16" x2="3"  y2="21" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="16" x2="13" y2="21" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
    </svg>
  )
}

const LEAVES = [
  { left: '4%',  size: 26, dur: 9.0,  delay: 0,   opacity: 0.80 },
  { left: '11%', size: 20, dur: 8.0,  delay: 1.8,  opacity: 0.70 },
  { left: '18%', size: 30, dur: 11.5, delay: 0.4,  opacity: 0.75 },
  { left: '25%', size: 22, dur: 8.5,  delay: 3.2,  opacity: 0.65 },
  { left: '32%', size: 28, dur: 12.0, delay: 1.0,  opacity: 0.82 },
  { left: '40%', size: 18, dur: 7.5,  delay: 5.5,  opacity: 0.72 },
  { left: '48%', size: 24, dur: 10.0, delay: 0.7,  opacity: 0.78 },
  { left: '56%', size: 32, dur: 9.0,  delay: 4.1,  opacity: 0.68 },
  { left: '64%', size: 20, dur: 13.0, delay: 2.3,  opacity: 0.75 },
  { left: '72%', size: 26, dur: 8.2,  delay: 0.5,  opacity: 0.80 },
  { left: '80%', size: 22, dur: 10.5, delay: 6.8,  opacity: 0.70 },
  { left: '88%', size: 18, dur: 11.5, delay: 3.6,  opacity: 0.76 },
]

export default function BotanicalMossTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #080c05 !important; }
        @keyframes leafFall {
          0%   { transform: translateY(-30px) translateX(0) rotate(-15deg); opacity: 0; }
          8%   { opacity: 1; }
          25%  { transform: translateY(24vh) translateX(22px) rotate(12deg); }
          50%  { transform: translateY(52vh) translateX(-12px) rotate(-6deg); }
          75%  { transform: translateY(78vh) translateX(18px) rotate(26deg); opacity: 0.65; }
          100% { transform: translateY(110vh) translateX(5px) rotate(50deg); opacity: 0; }
        }
        @keyframes mossGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(126,200,80,0.42); }
          50%       { box-shadow: 0 0 40px rgba(160,232,112,0.75), 0 0 66px rgba(126,200,80,0.28); }
        }
      `}</style>

      {/* Leaf particle overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {LEAVES.map((l, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-30px',
              left: l.left,
              animation: `leafFall ${l.dur}s ease-in ${l.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          >
            <Leaf size={l.size} color="#7ec850" opacity={l.opacity} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#080c05', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>

          {/* Botanical branch decoration */}
          <div className="flex justify-center mb-6">
            <svg width="240" height="44" viewBox="0 0 240 44">
              <line x1="12" y1="22" x2="228" y2="22" stroke="#7ec850" strokeWidth="0.8" strokeOpacity="0.35" />
              <ellipse cx="48"  cy="14" rx="10" ry="5" fill="#7ec850" fillOpacity="0.28" transform="rotate(-35 48 14)" />
              <ellipse cx="80"  cy="30" rx="8"  ry="4" fill="#7ec850" fillOpacity="0.22" transform="rotate(28 80 30)" />
              <ellipse cx="120" cy="10" rx="9"  ry="4.5" fill="#7ec850" fillOpacity="0.30" transform="rotate(-10 120 10)" />
              <ellipse cx="160" cy="30" rx="8"  ry="4" fill="#7ec850" fillOpacity="0.22" transform="rotate(-28 160 30)" />
              <ellipse cx="194" cy="14" rx="10" ry="5" fill="#7ec850" fillOpacity="0.28" transform="rotate(35 194 14)" />
              <circle cx="120" cy="22" r="2.5" fill="#7ec850" fillOpacity="0.40" />
            </svg>
          </div>

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #a0e870, #3a8020)', animation: 'mossGlow 2.8s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#0d1408', border: '1px solid rgba(126,200,80,0.4)', animation: 'mossGlow 2.8s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#a0e870' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#c0f090' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, #7ec850, transparent)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#4a7030' }}>
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
                  background: 'linear-gradient(135deg, #0d1408, #111a0c)',
                  border: '1px solid rgba(126,200,80,0.22)',
                  color: '#a0e870',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(160,232,112,0.13), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          {/* Botanical footer decoration */}
          <div className="flex justify-center mt-10 mb-6">
            <svg width="240" height="44" viewBox="0 0 240 44">
              <line x1="12" y1="22" x2="228" y2="22" stroke="#7ec850" strokeWidth="0.8" strokeOpacity="0.35" />
              <ellipse cx="48"  cy="30" rx="10" ry="5" fill="#7ec850" fillOpacity="0.28" transform="rotate(35 48 30)" />
              <ellipse cx="80"  cy="14" rx="8"  ry="4" fill="#7ec850" fillOpacity="0.22" transform="rotate(-28 80 14)" />
              <ellipse cx="120" cy="34" rx="9"  ry="4.5" fill="#7ec850" fillOpacity="0.30" transform="rotate(10 120 34)" />
              <ellipse cx="160" cy="14" rx="8"  ry="4" fill="#7ec850" fillOpacity="0.22" transform="rotate(28 160 14)" />
              <ellipse cx="194" cy="30" rx="10" ry="5" fill="#7ec850" fillOpacity="0.28" transform="rotate(-35 194 30)" />
              <circle cx="120" cy="22" r="2.5" fill="#7ec850" fillOpacity="0.40" />
            </svg>
          </div>

          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
