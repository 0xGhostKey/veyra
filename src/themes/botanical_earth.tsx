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

const LEAVES = [
  { left: '4%',  size: 34, dur: 7.0,  delay: 0,    color: '#c87040', opacity: 0.78 },
  { left: '11%', size: 26, dur: 6.2,  delay: 1.6,  color: '#e09060', opacity: 0.68 },
  { left: '18%', size: 38, dur: 8.5,  delay: 0.4,  color: '#c87040', opacity: 0.82 },
  { left: '26%', size: 28, dur: 6.8,  delay: 2.9,  color: '#d47848', opacity: 0.72 },
  { left: '34%', size: 32, dur: 9.0,  delay: 0.8,  color: '#c87040', opacity: 0.76 },
  { left: '42%', size: 24, dur: 6.0,  delay: 4.8,  color: '#e09060', opacity: 0.65 },
  { left: '50%', size: 36, dur: 7.8,  delay: 0.6,  color: '#c87040', opacity: 0.80 },
  { left: '58%', size: 30, dur: 7.2,  delay: 3.5,  color: '#d47848', opacity: 0.70 },
  { left: '66%', size: 22, dur: 10.0, delay: 1.8,  color: '#c87040', opacity: 0.74 },
  { left: '74%', size: 34, dur: 6.5,  delay: 0.3,  color: '#e09060', opacity: 0.78 },
  { left: '82%', size: 28, dur: 8.0,  delay: 5.9,  color: '#c87040', opacity: 0.68 },
  { left: '90%', size: 24, dur: 9.5,  delay: 3.1,  color: '#d47848', opacity: 0.72 },
]

export default function BotanicalEarthTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #1a1008 !important; }
        @keyframes leafFall {
          0%   { transform: translateY(-30px) translateX(0) rotate(-20deg); opacity: 0; }
          6%   { opacity: 1; }
          22%  { transform: translateY(20vh) translateX(28px) rotate(18deg); }
          46%  { transform: translateY(48vh) translateX(-16px) rotate(-10deg); }
          72%  { transform: translateY(74vh) translateX(22px) rotate(35deg); opacity: 0.62; }
          100% { transform: translateY(112vh) translateX(-8px) rotate(70deg); opacity: 0; }
        }
        @keyframes earthGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(200,112,64,0.44); }
          50%       { box-shadow: 0 0 40px rgba(224,144,96,0.78), 0 0 66px rgba(200,112,64,0.28); }
        }
      `}</style>

      {/* Subtle diagonal stripe texture */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(200,112,64,0.04) 18px, rgba(200,112,64,0.04) 19px)',
      }} />

      {/* Leaf/petal overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
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
            <Leaf size={l.size} color={l.color} opacity={l.opacity} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#1a1008', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #c87040, transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #e09060, #803020)', animation: 'earthGlow 2.8s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#231508', border: '1px solid rgba(200,112,64,0.38)', animation: 'earthGlow 2.8s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#e09060' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#f0c090' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, #803020, #c87040, #803020)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#806040' }}>
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
                className="group block w-full px-6 py-4 text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #231508, #2e1c0a)',
                  border: '1px solid rgba(200,112,64,0.22)',
                  borderBottom: '3px solid rgba(200,112,64,0.40)',
                  borderRadius: '8px',
                  color: '#e09060',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(224,144,96,0.13), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #c87040, transparent)' }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
