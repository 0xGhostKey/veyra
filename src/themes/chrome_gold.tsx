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
  { left: '2%',  dur: 15, delay: 0,    op: 0.6,  drift: 14,  rot: 110, skew: 2 },
  { left: '7%',  dur: 20, delay: 3.2,  op: 0.45, drift: -20, rot: 190, skew: 1 },
  { left: '12%', dur: 13, delay: 1.2,  op: 0.7,  drift: 22,  rot: 80,  skew: 2 },
  { left: '17%', dur: 18, delay: 5.8,  op: 0.5,  drift: -12, rot: 140, skew: 1 },
  { left: '22%', dur: 12, delay: 2.4,  op: 0.65, drift: 18,  rot: 170, skew: 2 },
  { left: '28%', dur: 21, delay: 7.5,  op: 0.4,  drift: -24, rot: 100, skew: 1 },
  { left: '33%', dur: 16, delay: 0.6,  op: 0.55, drift: 26,  rot: 230, skew: 2 },
  { left: '38%', dur: 14, delay: 9.2,  op: 0.75, drift: -16, rot: 70,  skew: 1 },
  { left: '44%', dur: 19, delay: 4.2,  op: 0.5,  drift: 20,  rot: 150, skew: 2 },
  { left: '49%', dur: 12, delay: 1.8,  op: 0.65, drift: -22, rot: 120, skew: 1 },
  { left: '55%', dur: 17, delay: 6.4,  op: 0.55, drift: 16,  rot: 190, skew: 2 },
  { left: '60%', dur: 15, delay: 3,    op: 0.7,  drift: -18, rot: 90,  skew: 1 },
  { left: '66%', dur: 13, delay: 8.4,  op: 0.45, drift: 24,  rot: 160, skew: 2 },
  { left: '71%', dur: 20, delay: 0.4,  op: 0.6,  drift: -14, rot: 130, skew: 1 },
  { left: '77%', dur: 14, delay: 4.8,  op: 0.75, drift: 18,  rot: 210, skew: 2 },
  { left: '82%', dur: 18, delay: 11,   op: 0.45, drift: -26, rot: 85,  skew: 1 },
  { left: '88%', dur: 16, delay: 7,    op: 0.65, drift: 22,  rot: 170, skew: 2 },
  { left: '93%', dur: 12, delay: 2.6,  op: 0.8,  drift: -20, rot: 110, skew: 1 },
]

export default function ChromeGoldTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0c0a00 !important; }
        @keyframes shardDriftGold {
          0%   { transform: translateY(-30px) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes goldShimmer {
          0%, 100% { box-shadow: 0 0 12px rgba(200,168,48,0.35), 0 0 35px rgba(200,168,48,0.12); }
          50%       { box-shadow: 0 0 24px rgba(200,168,48,0.65), 0 0 60px rgba(200,168,48,0.28), 0 0 90px rgba(200,168,48,0.12); }
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
              animation: `shardDriftGold ${s.dur}s ease-in-out ${s.delay}s infinite`,
            } as React.CSSProperties}
          >
            <PrismShard color="#c8a830" opacity={s.op} skew={s.skew} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0c0a00', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="h-px mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #c8a830, transparent)' }}
          />

          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-px rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #e8d060, #907820, #e8d060)',
                  animation: 'goldShimmer 3s ease-in-out infinite',
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
                  background: 'linear-gradient(135deg, #140e00, #1e1600)',
                  border: '1px solid #706020',
                  animation: 'goldShimmer 3s ease-in-out infinite',
                }}
              >
                <span className="text-3xl font-bold" style={{ color: '#c8a830' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#e8d880' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-12 h-px mb-3"
              style={{ background: 'linear-gradient(90deg, #604810, #c09828, #604810)' }}
            />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#806830' }}>
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
                  background: 'linear-gradient(135deg, #140e00, #1e1600)',
                  border: '1px solid rgba(200,168,48,0.2)',
                  color: '#c8a830',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,48,0.08), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          <div
            className="h-px mt-10 mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #c8a830, transparent)' }}
          />

          {!profile.logo_removed && (
            <div className="flex justify-center">
              <Logo dark gold />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
