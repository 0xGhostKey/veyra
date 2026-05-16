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
  { left: '1%',  dur: 17, delay: 0,    op: 0.7,  drift: 18,  rot: 140, skew: 1 },
  { left: '6%',  dur: 22, delay: 3.5,  op: 0.5,  drift: -24, rot: 210, skew: 2 },
  { left: '11%', dur: 14, delay: 1.6,  op: 0.8,  drift: 26,  rot: 100, skew: 1 },
  { left: '16%', dur: 20, delay: 7,    op: 0.55, drift: -16, rot: 165, skew: 2 },
  { left: '22%', dur: 12, delay: 4,    op: 0.75, drift: 22,  rot: 185, skew: 1 },
  { left: '27%', dur: 23, delay: 9,    op: 0.45, drift: -28, rot: 120, skew: 2 },
  { left: '33%', dur: 18, delay: 0.6,  op: 0.65, drift: 30,  rot: 255, skew: 1 },
  { left: '38%', dur: 16, delay: 11,   op: 0.85, drift: -20, rot: 80,  skew: 2 },
  { left: '44%', dur: 21, delay: 5.4,  op: 0.6,  drift: 24,  rot: 170, skew: 1 },
  { left: '49%', dur: 13, delay: 2.2,  op: 0.75, drift: -26, rot: 130, skew: 2 },
  { left: '55%', dur: 19, delay: 8,    op: 0.65, drift: 20,  rot: 200, skew: 1 },
  { left: '60%', dur: 17, delay: 3.8,  op: 0.8,  drift: -22, rot: 110, skew: 2 },
  { left: '66%', dur: 14, delay: 10,   op: 0.55, drift: 28,  rot: 180, skew: 1 },
  { left: '71%', dur: 22, delay: 1,    op: 0.7,  drift: -18, rot: 145, skew: 2 },
  { left: '77%', dur: 16, delay: 6,    op: 0.85, drift: 22,  rot: 225, skew: 1 },
  { left: '82%', dur: 20, delay: 13,   op: 0.55, drift: -30, rot: 95,  skew: 2 },
  { left: '88%', dur: 18, delay: 8,    op: 0.75, drift: 26,  rot: 185, skew: 1 },
  { left: '94%', dur: 14, delay: 4.5,  op: 0.9,  drift: -24, rot: 120, skew: 2 },
]

export default function ChromeVoidTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #03040a !important; }
        @keyframes shardDriftVoid {
          0%   { transform: translateY(-30px) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes voidShimmer {
          0%, 100% { box-shadow: 0 0 14px rgba(64,144,224,0.35), 0 0 40px rgba(64,144,224,0.12); }
          50%       { box-shadow: 0 0 28px rgba(64,144,224,0.65), 0 0 70px rgba(64,144,224,0.28), 0 0 100px rgba(64,144,224,0.12); }
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
              animation: `shardDriftVoid ${s.dur}s ease-in-out ${s.delay}s infinite`,
            } as React.CSSProperties}
          >
            <PrismShard color="#4090e0" opacity={s.op} skew={s.skew} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#03040a', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="h-px mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #4090e0, transparent)' }}
          />

          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-px rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #80b8f0, #2060b0, #80b8f0)',
                  animation: 'voidShimmer 3s ease-in-out infinite',
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
                  background: 'linear-gradient(135deg, #060810, #0c1020)',
                  border: '1px solid rgba(64,144,224,0.3)',
                  animation: 'voidShimmer 3s ease-in-out infinite',
                }}
              >
                <span className="text-3xl font-bold" style={{ color: '#80b8f0' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#c0d8f0' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-12 h-px mb-3"
              style={{ background: 'linear-gradient(90deg, #2060b0, #80b8f0, #2060b0)' }}
            />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#4870a0' }}>
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
                  background: 'linear-gradient(135deg, #060810, #0c1020)',
                  border: '1px solid rgba(64,144,224,0.25)',
                  color: '#80b8f0',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(64,144,224,0.08), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          <div
            className="h-px mt-10 mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #4090e0, transparent)' }}
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
