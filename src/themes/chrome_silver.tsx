import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

function PrismShard({ color, opacity, skew }: { color: string; opacity: number; skew: number }) {
  return (
    <svg width="6" height="18" viewBox="0 0 6 18" style={{ display: 'block' }}>
      <polygon points={`${skew},0 6,0 ${6 - skew},18 0,18`} fill={color} fillOpacity={opacity} />
    </svg>
  )
}

const SHARDS = [
  { left: '3%',  dur: 14, delay: 0,    op: 0.55, drift: 12,  rot: 120, skew: 1 },
  { left: '8%',  dur: 19, delay: 2.5,  op: 0.4,  drift: -18, rot: 200, skew: 2 },
  { left: '13%', dur: 12, delay: 1,    op: 0.65, drift: 20,  rot: 90,  skew: 1 },
  { left: '18%', dur: 17, delay: 5,    op: 0.45, drift: -10, rot: 150, skew: 2 },
  { left: '23%', dur: 11, delay: 3.2,  op: 0.6,  drift: 16,  rot: 180, skew: 1 },
  { left: '28%', dur: 20, delay: 7,    op: 0.35, drift: -22, rot: 110, skew: 2 },
  { left: '34%', dur: 15, delay: 0.8,  op: 0.5,  drift: 24,  rot: 240, skew: 1 },
  { left: '39%', dur: 13, delay: 9,    op: 0.7,  drift: -14, rot: 80,  skew: 2 },
  { left: '45%', dur: 18, delay: 4,    op: 0.45, drift: 18,  rot: 160, skew: 1 },
  { left: '50%', dur: 11, delay: 1.5,  op: 0.6,  drift: -20, rot: 130, skew: 2 },
  { left: '56%', dur: 16, delay: 6,    op: 0.5,  drift: 14,  rot: 200, skew: 1 },
  { left: '61%', dur: 14, delay: 2.8,  op: 0.65, drift: -16, rot: 100, skew: 2 },
  { left: '67%', dur: 12, delay: 8,    op: 0.4,  drift: 22,  rot: 170, skew: 1 },
  { left: '72%', dur: 19, delay: 0.3,  op: 0.55, drift: -12, rot: 140, skew: 2 },
  { left: '77%', dur: 13, delay: 4.5,  op: 0.7,  drift: 16,  rot: 220, skew: 1 },
  { left: '82%', dur: 17, delay: 11,   op: 0.4,  drift: -24, rot: 90,  skew: 2 },
  { left: '88%', dur: 15, delay: 6.5,  op: 0.6,  drift: 20,  rot: 180, skew: 1 },
  { left: '93%', dur: 11, delay: 3,    op: 0.75, drift: -18, rot: 120, skew: 2 },
]

export default function ChromeSilverTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0e0f11 !important; }
        @keyframes shardDriftSilver {
          0%   { transform: translateY(-30px) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes silverShimmer {
          0%, 100% { box-shadow: 0 0 10px rgba(184,190,200,0.3), 0 0 30px rgba(184,190,200,0.1); }
          50%       { box-shadow: 0 0 20px rgba(184,190,200,0.6), 0 0 50px rgba(184,190,200,0.25), 0 0 80px rgba(184,190,200,0.1); }
        }
      `}</style>

      {/* Prism shards overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {SHARDS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-30px',
              left: s.left,
              '--drift': `${s.drift}px`,
              '--rot': `${s.rot}deg`,
              animation: `shardDriftSilver ${s.dur}s ease-in-out ${s.delay}s infinite`,
            } as React.CSSProperties}
          >
            <PrismShard color="#b8bec8" opacity={s.op} skew={s.skew} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0e0f11', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="h-px mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #b8bec8, transparent)' }}
          />

          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-px rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #dce4ec, #606872, #dce4ec)',
                  animation: 'silverShimmer 3s ease-in-out infinite',
                }}
              >
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name ?? 'avatar'}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, #1a1c20, #242830)',
                  border: '1px solid #505860',
                  animation: 'silverShimmer 3s ease-in-out infinite',
                }}
              >
                <span className="text-3xl font-bold" style={{ color: '#b8bec8' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#dce4ec' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-12 h-px mb-3"
              style={{ background: 'linear-gradient(90deg, #606872, #b8bec8, #606872)' }}
            />
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
                  border: '1px solid rgba(184,190,200,0.2)',
                  color: '#c8d0da',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(184,190,200,0.08), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          <div
            className="h-px mt-10 mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #b8bec8, transparent)' }}
          />

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
