import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

function Leaf({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'block' }}>
      <path
        d="M10 1 C4 1 1 6 1 10 C1 16 5 19 10 19 C15 19 19 15 19 10 C19 6 16 1 10 1Z"
        fill={color}
        fillOpacity={opacity}
      />
      <line
        x1="10" y1="3" x2="10" y2="17"
        stroke={color}
        strokeOpacity={opacity * 0.5}
        strokeWidth="0.7"
      />
    </svg>
  )
}

const LEAVES = [
  { left: '5%',  size: 14, dur: 10.0, delay: 0,   color: '#c87040', opacity: 0.55 },
  { left: '12%', size: 18, dur:  8.5, delay: 1.8,  color: '#e09060', opacity: 0.45 },
  { left: '19%', size: 11, dur: 12.5, delay: 0.4,  color: '#c87040', opacity: 0.60 },
  { left: '26%', size: 20, dur:  9.0, delay: 3.2,  color: '#e09060', opacity: 0.50 },
  { left: '33%', size: 13, dur: 13.5, delay: 1.0,  color: '#c87040', opacity: 0.65 },
  { left: '41%', size: 16, dur:  8.0, delay: 5.5,  color: '#e09060', opacity: 0.40 },
  { left: '49%', size: 10, dur: 11.0, delay: 0.7,  color: '#c87040', opacity: 0.70 },
  { left: '57%', size: 19, dur:  9.5, delay: 4.1,  color: '#e09060', opacity: 0.48 },
  { left: '64%', size: 12, dur: 14.0, delay: 2.3,  color: '#c87040', opacity: 0.55 },
  { left: '72%', size: 17, dur:  8.8, delay: 0.5,  color: '#e09060', opacity: 0.62 },
  { left: '80%', size: 15, dur: 10.5, delay: 6.8,  color: '#c87040', opacity: 0.43 },
  { left: '88%', size: 11, dur: 12.0, delay: 3.6,  color: '#e09060', opacity: 0.58 },
]

export default function BotanicalEarthTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #1a1008 !important; }
        @keyframes leafFallEarth {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(105vh) rotate(270deg); opacity: 0; }
        }
        @keyframes earthGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(200,112,64,0.4); }
          50%       { box-shadow: 0 0 35px rgba(224,144,96,0.7), 0 0 60px rgba(200,112,64,0.25); }
        }
      `}</style>

      {/* Leaf/petal overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {LEAVES.map((l, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-20px',
              left: l.left,
              animation: `leafFallEarth ${l.dur}s ease-in ${l.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          >
            <Leaf size={l.size} color={l.color} opacity={l.opacity} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#1a1008', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #c87040, transparent)' }} />

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #e09060, #803020)',
                    animation: 'earthGlow 2.8s ease-in-out infinite',
                  }}
                >
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name ?? 'avatar'}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{
                    background: '#231508',
                    border: '1px solid rgba(200,112,64,0.35)',
                    animation: 'earthGlow 2.8s ease-in-out infinite',
                  }}
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
                className="group block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #231508, #2e1c0a)',
                  border: '1px solid rgba(200,112,64,0.2)',
                  color: '#e09060',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(224,144,96,0.12), transparent)' }}
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
