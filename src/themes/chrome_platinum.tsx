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
  { left: '4%',  dur: 16, delay: 0,    op: 0.65, drift: 16,  rot: 130, skew: 1 },
  { left: '9%',  dur: 21, delay: 2.8,  op: 0.5,  drift: -22, rot: 200, skew: 2 },
  { left: '15%', dur: 13, delay: 1.4,  op: 0.75, drift: 24,  rot: 95,  skew: 1 },
  { left: '20%', dur: 19, delay: 6.2,  op: 0.55, drift: -14, rot: 155, skew: 2 },
  { left: '26%', dur: 11, delay: 3.6,  op: 0.7,  drift: 20,  rot: 180, skew: 1 },
  { left: '31%', dur: 22, delay: 8,    op: 0.4,  drift: -26, rot: 115, skew: 2 },
  { left: '37%', dur: 17, delay: 0.4,  op: 0.6,  drift: 28,  rot: 245, skew: 1 },
  { left: '42%', dur: 15, delay: 9.8,  op: 0.8,  drift: -18, rot: 75,  skew: 2 },
  { left: '48%', dur: 20, delay: 4.6,  op: 0.55, drift: 22,  rot: 165, skew: 1 },
  { left: '53%', dur: 12, delay: 2,    op: 0.7,  drift: -24, rot: 125, skew: 2 },
  { left: '59%', dur: 18, delay: 7,    op: 0.6,  drift: 18,  rot: 195, skew: 1 },
  { left: '64%', dur: 16, delay: 3.4,  op: 0.75, drift: -20, rot: 105, skew: 2 },
  { left: '70%', dur: 13, delay: 9,    op: 0.5,  drift: 26,  rot: 175, skew: 1 },
  { left: '75%', dur: 21, delay: 0.8,  op: 0.65, drift: -16, rot: 140, skew: 2 },
  { left: '81%', dur: 15, delay: 5.2,  op: 0.8,  drift: 20,  rot: 220, skew: 1 },
  { left: '86%', dur: 19, delay: 12,   op: 0.5,  drift: -28, rot: 90,  skew: 2 },
  { left: '91%', dur: 17, delay: 7.4,  op: 0.7,  drift: 24,  rot: 180, skew: 1 },
  { left: '96%', dur: 13, delay: 4,    op: 0.85, drift: -22, rot: 115, skew: 2 },
]

export default function ChromePlatinumTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #08090c !important; }
        @keyframes shardDriftPlatinum {
          0%   { transform: translateY(-30px) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes platinumShimmer {
          0%, 100% { box-shadow: 0 0 12px rgba(220,228,236,0.25), 0 0 35px rgba(220,228,236,0.08); }
          50%       { box-shadow: 0 0 24px rgba(220,228,236,0.5), 0 0 60px rgba(220,228,236,0.2), 0 0 90px rgba(220,228,236,0.08); }
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
              animation: `shardDriftPlatinum ${s.dur}s ease-in-out ${s.delay}s infinite`,
            } as React.CSSProperties}
          >
            <PrismShard color="#dce4ec" opacity={s.op} skew={s.skew} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#08090c', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="h-px mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #b0bac4, transparent)' }}
          />

          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-px rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #dce4ec, #808090, #dce4ec)',
                  animation: 'platinumShimmer 3s ease-in-out infinite',
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
                  background: 'linear-gradient(135deg, #0f1014, #141620)',
                  border: '1px solid #404860',
                  animation: 'platinumShimmer 3s ease-in-out infinite',
                }}
              >
                <span className="text-3xl font-bold" style={{ color: '#dce4ec' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#eef2f6' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-12 h-px mb-3"
              style={{ background: 'linear-gradient(90deg, #505870, #c0c8d8, #505870)' }}
            />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#607080' }}>
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
                  background: 'linear-gradient(135deg, #0f1014, #141620)',
                  border: '1px solid rgba(220,228,236,0.15)',
                  color: '#dce4ec',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(220,228,236,0.08), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          <div
            className="h-px mt-10 mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #b0bac4, transparent)' }}
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
