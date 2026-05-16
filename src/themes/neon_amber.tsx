import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

const DROPS = [
  { left: '1%',  dur: 2.3, delay: 0,    h: 58, c: '#ff8c00' },
  { left: '5%',  dur: 3.0, delay: 1.4,  h: 38, c: '#ffd700' },
  { left: '9%',  dur: 1.7, delay: 0.6,  h: 64, c: '#ff8c00' },
  { left: '13%', dur: 2.8, delay: 2.2,  h: 44, c: '#ffd700' },
  { left: '17%', dur: 2.1, delay: 0.3,  h: 72, c: '#ff8c00' },
  { left: '21%', dur: 3.3, delay: 1.8,  h: 36, c: '#ffd700' },
  { left: '26%', dur: 1.9, delay: 0.9,  h: 56, c: '#ff8c00' },
  { left: '30%', dur: 2.5, delay: 2.5,  h: 48, c: '#ffd700' },
  { left: '34%', dur: 2.0, delay: 0.1,  h: 66, c: '#ff8c00' },
  { left: '39%', dur: 3.1, delay: 1.1,  h: 42, c: '#ffd700' },
  { left: '43%', dur: 1.6, delay: 0.7,  h: 60, c: '#ff8c00' },
  { left: '47%', dur: 2.7, delay: 2.0,  h: 34, c: '#ffd700' },
  { left: '52%', dur: 2.4, delay: 0.4,  h: 70, c: '#ff8c00' },
  { left: '56%', dur: 1.8, delay: 1.7,  h: 50, c: '#ffd700' },
  { left: '60%', dur: 3.2, delay: 2.8,  h: 62, c: '#ff8c00' },
  { left: '65%', dur: 2.2, delay: 0.8,  h: 40, c: '#ffd700' },
  { left: '69%', dur: 1.5, delay: 1.3,  h: 54, c: '#ff8c00' },
  { left: '73%', dur: 2.9, delay: 0.2,  h: 46, c: '#ffd700' },
  { left: '78%', dur: 2.1, delay: 2.4,  h: 68, c: '#ff8c00' },
  { left: '82%', dur: 3.4, delay: 1.0,  h: 38, c: '#ffd700' },
  { left: '86%', dur: 1.7, delay: 0.5,  h: 60, c: '#ff8c00' },
  { left: '90%', dur: 2.6, delay: 1.9,  h: 44, c: '#ffd700' },
  { left: '94%', dur: 2.0, delay: 2.7,  h: 56, c: '#ff8c00' },
  { left: '97%', dur: 3.0, delay: 0.6,  h: 32, c: '#ffd700' },
]

export default function NeonAmberTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0a0800 !important; }
        @keyframes rainFallAmber {
          0%   { transform: translateY(-80px); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes neonAmberPulse {
          0%, 100% { box-shadow: 0 0 18px rgba(255,140,0,0.55), 0 0 40px rgba(255,215,0,0.3); }
          50%       { box-shadow: 0 0 32px rgba(255,140,0,0.85), 0 0 70px rgba(255,215,0,0.55), 0 0 110px rgba(255,140,0,0.2); }
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
              animation: `rainFallAmber ${d.dur}s linear ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="min-h-screen bg-[#0a0800] flex flex-col items-center py-12 px-4" style={{ overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-0.5 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #ff8c00, #ffd700)',
                  animation: 'neonAmberPulse 2.5s ease-in-out infinite',
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
                  background: '#110900',
                  border: '2px solid #ff8c00',
                  animation: 'neonAmberPulse 2.5s ease-in-out infinite',
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: '#ff8c00', textShadow: '0 0 10px #ff8c00, 0 0 20px #ff8c00' }}
                >
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1
              className="text-2xl font-bold tracking-widest mb-1"
              style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.4)' }}
            >
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-16 h-px my-3"
              style={{ background: 'linear-gradient(90deg, #ff8c00, #ffd700)', boxShadow: '0 0 8px rgba(255,140,0,0.8)' }}
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
                  background: '#110900',
                  border: idx % 2 === 0 ? '1px solid rgba(255,140,0,0.4)' : '1px solid rgba(255,215,0,0.4)',
                  color: idx % 2 === 0 ? '#ff8c00' : '#ffd700',
                  textShadow: idx % 2 === 0 ? '0 0 8px rgba(255,140,0,0.8)' : '0 0 8px rgba(255,215,0,0.8)',
                  boxShadow: idx % 2 === 0
                    ? '0 0 15px rgba(255,140,0,0.15), inset 0 0 15px rgba(255,140,0,0.05)'
                    : '0 0 15px rgba(255,215,0,0.15), inset 0 0 15px rgba(255,215,0,0.05)',
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
