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
      <path
        d="M8 1 C11 3 14 9 14 15 C14 21 12 25 8 27 C4 25 2 21 2 15 C2 9 5 3 8 1Z"
        fill={color}
        fillOpacity={opacity}
      />
      <line x1="8" y1="1" x2="8" y2="27" stroke={color} strokeOpacity={Math.min(opacity * 2.2, 1)} strokeWidth="0.9" />
      <line x1="8" y1="9"  x2="3"  y2="14" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="9"  x2="13" y2="14" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="16" x2="3"  y2="21" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="16" x2="13" y2="21" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
    </svg>
  )
}

function BranchLeaf({ color, opacity }: { color: string; opacity: number }) {
  return (
    <>
      <path
        d="M0,-6 C2.5,-4 3,0 3,3 C3,6 1.5,7 0,7 C-1.5,7 -3,6 -3,3 C-3,0 -2.5,-4 0,-6Z"
        fill={color}
        fillOpacity={opacity}
      />
      <line x1="0" y1="-6" x2="0" y2="7" stroke={color} strokeOpacity={Math.min(opacity * 1.8, 1)} strokeWidth="0.55" />
    </>
  )
}

const LEAVES = [
  { left: '4%',  size: 26, dur: 9.0,  delay: 0,    opacity: 0.38 },
  { left: '11%', size: 20, dur: 8.0,  delay: 1.8,  opacity: 0.32 },
  { left: '18%', size: 30, dur: 11.5, delay: 0.4,  opacity: 0.40 },
  { left: '25%', size: 22, dur: 8.5,  delay: 3.2,  opacity: 0.28 },
  { left: '32%', size: 28, dur: 12.0, delay: 1.0,  opacity: 0.42 },
  { left: '40%', size: 18, dur: 7.5,  delay: 5.5,  opacity: 0.34 },
  { left: '48%', size: 24, dur: 10.0, delay: 0.7,  opacity: 0.38 },
  { left: '56%', size: 32, dur: 9.0,  delay: 4.1,  opacity: 0.30 },
  { left: '64%', size: 20, dur: 13.0, delay: 2.3,  opacity: 0.36 },
  { left: '72%', size: 26, dur: 8.2,  delay: 0.5,  opacity: 0.40 },
  { left: '80%', size: 22, dur: 10.5, delay: 6.8,  opacity: 0.32 },
  { left: '88%', size: 18, dur: 11.5, delay: 3.6,  opacity: 0.36 },
]

const C = '#5a8040'

export default function BotanicalIvoryTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #f5f0e8 !important; }
        @keyframes leafFall {
          0%   { transform: translateY(-30px) translateX(0) rotate(-15deg); opacity: 0; }
          8%   { opacity: 1; }
          25%  { transform: translateY(24vh) translateX(22px) rotate(12deg); }
          50%  { transform: translateY(52vh) translateX(-12px) rotate(-6deg); }
          75%  { transform: translateY(78vh) translateX(18px) rotate(26deg); opacity: 0.65; }
          100% { transform: translateY(110vh) translateX(5px) rotate(50deg); opacity: 0; }
        }
        @keyframes ivoryGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(90,128,64,0.22); }
          50%       { box-shadow: 0 0 40px rgba(122,184,96,0.42), 0 0 66px rgba(90,128,64,0.14); }
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
            <Leaf size={l.size} color={C} opacity={l.opacity} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#f5f0e8', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>

          {/* Branch decoration — header */}
          <div className="flex justify-center mb-6">
            <svg width="240" height="48" viewBox="0 0 240 48">
              <line x1="12" y1="24" x2="228" y2="24" stroke={C} strokeWidth="0.9" strokeOpacity="0.30" />
              <g transform="translate(48,24)">
                <line x1="0" y1="0" x2="-4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(-4,-15) rotate(18)"><BranchLeaf color={C} opacity={0.32} /></g>
                <line x1="0" y1="0" x2="4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(4,-15) rotate(-18)"><BranchLeaf color={C} opacity={0.26} /></g>
              </g>
              <g transform="translate(92,24)">
                <line x1="0" y1="0" x2="-4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(-4,15) rotate(162)"><BranchLeaf color={C} opacity={0.22} /></g>
                <line x1="0" y1="0" x2="4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(4,15) rotate(-162)"><BranchLeaf color={C} opacity={0.18} /></g>
              </g>
              <circle cx="120" cy="24" r="2.2" fill={C} fillOpacity="0.35" />
              <g transform="translate(148,24)">
                <line x1="0" y1="0" x2="-4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(-4,15) rotate(162)"><BranchLeaf color={C} opacity={0.18} /></g>
                <line x1="0" y1="0" x2="4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(4,15) rotate(-162)"><BranchLeaf color={C} opacity={0.22} /></g>
              </g>
              <g transform="translate(192,24)">
                <line x1="0" y1="0" x2="-4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(-4,-15) rotate(18)"><BranchLeaf color={C} opacity={0.26} /></g>
                <line x1="0" y1="0" x2="4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(4,-15) rotate(-18)"><BranchLeaf color={C} opacity={0.32} /></g>
              </g>
            </svg>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #7ab860, #3a6020)', animation: 'ivoryGlow 2.8s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#eaede2', border: '1px solid rgba(90,128,64,0.38)', animation: 'ivoryGlow 2.8s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#4a6830' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#2a3c20' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, rgba(90,128,64,0.45), transparent)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#6a7858' }}>
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
                  background: '#ffffff',
                  border: '1px solid rgba(90,128,64,0.22)',
                  color: '#3a5828',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(90,128,64,0.08), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          {/* Branch decoration — footer (inverted) */}
          <div className="flex justify-center mt-10 mb-6">
            <svg width="240" height="48" viewBox="0 0 240 48">
              <line x1="12" y1="24" x2="228" y2="24" stroke={C} strokeWidth="0.9" strokeOpacity="0.30" />
              <g transform="translate(48,24)">
                <line x1="0" y1="0" x2="-4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(-4,15) rotate(162)"><BranchLeaf color={C} opacity={0.32} /></g>
                <line x1="0" y1="0" x2="4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(4,15) rotate(-162)"><BranchLeaf color={C} opacity={0.26} /></g>
              </g>
              <g transform="translate(92,24)">
                <line x1="0" y1="0" x2="-4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(-4,-15) rotate(18)"><BranchLeaf color={C} opacity={0.22} /></g>
                <line x1="0" y1="0" x2="4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(4,-15) rotate(-18)"><BranchLeaf color={C} opacity={0.18} /></g>
              </g>
              <circle cx="120" cy="24" r="2.2" fill={C} fillOpacity="0.35" />
              <g transform="translate(148,24)">
                <line x1="0" y1="0" x2="-4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(-4,-15) rotate(18)"><BranchLeaf color={C} opacity={0.18} /></g>
                <line x1="0" y1="0" x2="4" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.22" />
                <g transform="translate(4,-15) rotate(-18)"><BranchLeaf color={C} opacity={0.22} /></g>
              </g>
              <g transform="translate(192,24)">
                <line x1="0" y1="0" x2="-4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(-4,15) rotate(162)"><BranchLeaf color={C} opacity={0.26} /></g>
                <line x1="0" y1="0" x2="4" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.25" />
                <g transform="translate(4,15) rotate(-162)"><BranchLeaf color={C} opacity={0.32} /></g>
              </g>
            </svg>
          </div>

          <div className="flex justify-center">
            <Logo />
          </div>
        </div>
      </div>
    </>
  )
}
