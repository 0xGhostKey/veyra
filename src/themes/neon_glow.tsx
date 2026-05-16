import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

const DROPS = [
  { left: '3%',  dur: 2.4, delay: 0,    h: 55, c: '#ff00ff' },
  { left: '7%',  dur: 1.8, delay: 1.2,  h: 35, c: '#00ffff' },
  { left: '12%', dur: 3.0, delay: 0.4,  h: 70, c: '#ff00ff' },
  { left: '16%', dur: 2.1, delay: 2.0,  h: 42, c: '#00ffff' },
  { left: '20%', dur: 1.6, delay: 0.7,  h: 60, c: '#ff00ff' },
  { left: '25%', dur: 2.9, delay: 1.5,  h: 38, c: '#00ffff' },
  { left: '29%', dur: 2.2, delay: 0.2,  h: 52, c: '#ff00ff' },
  { left: '33%', dur: 3.5, delay: 2.6,  h: 45, c: '#00ffff' },
  { left: '38%', dur: 1.9, delay: 0.9,  h: 65, c: '#ff00ff' },
  { left: '42%', dur: 2.6, delay: 1.8,  h: 33, c: '#00ffff' },
  { left: '46%', dur: 2.0, delay: 0.5,  h: 58, c: '#ff00ff' },
  { left: '51%', dur: 3.2, delay: 2.3,  h: 40, c: '#00ffff' },
  { left: '55%', dur: 1.7, delay: 0.1,  h: 72, c: '#ff00ff' },
  { left: '59%', dur: 2.8, delay: 1.0,  h: 48, c: '#00ffff' },
  { left: '64%', dur: 2.3, delay: 2.8,  h: 56, c: '#ff00ff' },
  { left: '68%', dur: 1.5, delay: 0.6,  h: 36, c: '#00ffff' },
  { left: '72%', dur: 3.1, delay: 1.4,  h: 64, c: '#ff00ff' },
  { left: '77%', dur: 2.5, delay: 0.3,  h: 44, c: '#00ffff' },
  { left: '81%', dur: 1.8, delay: 2.1,  h: 68, c: '#ff00ff' },
  { left: '85%', dur: 2.7, delay: 0.8,  h: 50, c: '#00ffff' },
  { left: '89%', dur: 2.0, delay: 1.6,  h: 62, c: '#ff00ff' },
  { left: '93%', dur: 3.4, delay: 0.4,  h: 40, c: '#00ffff' },
  { left: '96%', dur: 1.6, delay: 2.4,  h: 54, c: '#ff00ff' },
  { left: '99%', dur: 2.3, delay: 1.1,  h: 32, c: '#00ffff' },
]

export default function NeonGlowTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0d0d0d !important; }
        @keyframes rainFallGlow {
          0%   { transform: translateY(-80px); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes neonGlowPulse {
          0%, 100% { box-shadow: 0 0 18px rgba(255,0,255,0.55), 0 0 40px rgba(0,255,255,0.3); }
          50%       { box-shadow: 0 0 32px rgba(255,0,255,0.85), 0 0 70px rgba(0,255,255,0.55), 0 0 110px rgba(255,0,255,0.2); }
        }
      `}</style>

      {/* Digital rain overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {DROPS.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-80px',
              left: d.left,
              width: 2,
              height: d.h,
              background: `linear-gradient(to bottom, transparent, ${d.c} 50%, transparent)`,
              boxShadow: `0 0 6px ${d.c}, 0 0 14px ${d.c}`,
              borderRadius: 2,
              animation: `rainFallGlow ${d.dur}s linear ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center py-12 px-4" style={{ overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-0.5 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                  animation: 'neonGlowPulse 2.5s ease-in-out infinite',
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
                  background: '#111',
                  border: '2px solid #ff00ff',
                  animation: 'neonGlowPulse 2.5s ease-in-out infinite',
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: '#ff00ff', textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff' }}
                >
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1
              className="text-2xl font-bold tracking-widest mb-1"
              style={{ color: '#ffffff', textShadow: '0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.4)' }}
            >
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-16 h-px my-3"
              style={{ background: 'linear-gradient(90deg, #ff00ff, #00ffff)', boxShadow: '0 0 8px rgba(255,0,255,0.8)' }}
            />
            {profile.bio && (
              <p className="text-gray-400 text-sm text-center leading-relaxed max-w-xs">
                {profile.bio}
              </p>
            )}
          </div>

          <MixedLinks
            links={activeLinks}
            gap="gap-4"
            renderTextLink={(link, idx) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300"
                style={{
                  background: '#111111',
                  border: idx % 2 === 0 ? '1px solid rgba(255,0,255,0.4)' : '1px solid rgba(0,255,255,0.4)',
                  color: idx % 2 === 0 ? '#ff00ff' : '#00ffff',
                  textShadow: idx % 2 === 0 ? '0 0 8px rgba(255,0,255,0.8)' : '0 0 8px rgba(0,255,255,0.8)',
                  boxShadow: idx % 2 === 0
                    ? '0 0 15px rgba(255,0,255,0.15), inset 0 0 15px rgba(255,0,255,0.05)'
                    : '0 0 15px rgba(0,255,255,0.15), inset 0 0 15px rgba(0,255,255,0.05)',
                }}
              >
                {link.title}
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

                      <div className="mt-10 flex justify-center">
              <Logo dark />
            </div>
        </div>
      </div>
    </>
  )
}
