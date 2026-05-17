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
  { left: '5%',  size: 16, dur: 12.0, delay: 0,   opacity: 0.45 },
  { left: '12%', size: 20, dur: 10.0, delay: 2.2,  opacity: 0.38 },
  { left: '19%', size: 13, dur: 14.5, delay: 0.6,  opacity: 0.52 },
  { left: '27%', size: 22, dur: 11.0, delay: 3.8,  opacity: 0.35 },
  { left: '35%', size: 15, dur: 15.0, delay: 1.2,  opacity: 0.48 },
  { left: '43%', size: 18, dur:  9.5, delay: 6.2,  opacity: 0.42 },
  { left: '51%', size: 12, dur: 13.0, delay: 0.9,  opacity: 0.55 },
  { left: '59%', size: 21, dur: 11.5, delay: 4.7,  opacity: 0.36 },
  { left: '67%', size: 14, dur: 16.0, delay: 2.6,  opacity: 0.46 },
  { left: '75%', size: 19, dur: 10.5, delay: 0.4,  opacity: 0.40 },
  { left: '83%', size: 16, dur: 12.5, delay: 7.4,  opacity: 0.44 },
  { left: '90%', size: 13, dur: 14.0, delay: 3.9,  opacity: 0.50 },
]

export default function BotanicalIvoryTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #f5f0e8 !important; }
        @keyframes leafFall {
          0%   { transform: translateY(-30px) translateX(0) rotate(-10deg); opacity: 0; }
          10%  { opacity: 1; }
          30%  { transform: translateY(26vh) translateX(16px) rotate(8deg); }
          58%  { transform: translateY(56vh) translateX(-8px) rotate(-4deg); }
          82%  { transform: translateY(82vh) translateX(12px) rotate(18deg); opacity: 0.70; }
          100% { transform: translateY(112vh) translateX(3px) rotate(36deg); opacity: 0; }
        }
        @keyframes ivoryGlow {
          0%, 100% { box-shadow: 0 0 14px rgba(90,128,64,0.22); }
          50%       { box-shadow: 0 0 26px rgba(122,184,96,0.42), 0 0 48px rgba(90,128,64,0.14); }
        }
      `}</style>

      {/* Subtle dot pattern overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(90,128,64,0.10) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Leaf particle overlay */}
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
            <Leaf size={l.size} color="#5a8040" opacity={l.opacity} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#f5f0e8', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(90,128,64,0.45), transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #7ab860, #3a6020)', animation: 'ivoryGlow 3.2s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#eaede2', border: '1px solid rgba(90,128,64,0.38)', animation: 'ivoryGlow 3.2s ease-in-out infinite' }}
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
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, rgba(90,128,64,0.5), transparent)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#6a7858' }}>
                {profile.bio}
              </p>
            )}
          </div>

          <MixedLinks
            links={activeLinks}
            gap="gap-2"
            renderTextLink={(link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full px-6 py-4 text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  borderLeft: '3px solid #5a8040',
                  borderTop: '1px solid rgba(90,128,64,0.18)',
                  borderRight: '1px solid rgba(90,128,64,0.18)',
                  borderBottom: '1px solid rgba(90,128,64,0.18)',
                  borderRadius: '0 10px 10px 0',
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
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(90,128,64,0.45), transparent)' }} />
          <div className="flex justify-center">
            <Logo />
          </div>
        </div>
      </div>
    </>
  )
}
