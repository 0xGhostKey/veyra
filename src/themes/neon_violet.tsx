import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

const DROPS = [
  { left: '2%',  dur: 2.2, delay: 0,    h: 50, c: '#bf00ff' },
  { left: '6%',  dur: 3.1, delay: 0.8,  h: 30, c: '#39ff14' },
  { left: '10%', dur: 2.5, delay: 1.5,  h: 65, c: '#bf00ff' },
  { left: '14%', dur: 1.8, delay: 0.3,  h: 40, c: '#39ff14' },
  { left: '18%', dur: 3.4, delay: 2.1,  h: 55, c: '#bf00ff' },
  { left: '22%', dur: 2.0, delay: 0.6,  h: 35, c: '#39ff14' },
  { left: '27%', dur: 2.8, delay: 1.2,  h: 70, c: '#bf00ff' },
  { left: '31%', dur: 1.6, delay: 0.9,  h: 45, c: '#39ff14' },
  { left: '35%', dur: 3.0, delay: 2.4,  h: 60, c: '#bf00ff' },
  { left: '40%', dur: 2.3, delay: 0.4,  h: 38, c: '#39ff14' },
  { left: '44%', dur: 1.9, delay: 1.7,  h: 52, c: '#bf00ff' },
  { left: '48%', dur: 2.7, delay: 0.1,  h: 42, c: '#39ff14' },
  { left: '53%', dur: 2.1, delay: 2.8,  h: 68, c: '#bf00ff' },
  { left: '57%', dur: 3.3, delay: 1.0,  h: 33, c: '#39ff14' },
  { left: '62%', dur: 1.7, delay: 0.7,  h: 58, c: '#bf00ff' },
  { left: '66%', dur: 2.9, delay: 2.0,  h: 46, c: '#39ff14' },
  { left: '70%', dur: 2.4, delay: 0.5,  h: 62, c: '#bf00ff' },
  { left: '75%', dur: 1.5, delay: 1.3,  h: 36, c: '#39ff14' },
  { left: '79%', dur: 3.2, delay: 0.2,  h: 54, c: '#bf00ff' },
  { left: '83%', dur: 2.6, delay: 2.6,  h: 44, c: '#39ff14' },
  { left: '87%', dur: 2.0, delay: 1.1,  h: 66, c: '#bf00ff' },
  { left: '91%', dur: 1.8, delay: 0.8,  h: 40, c: '#39ff14' },
  { left: '95%', dur: 2.4, delay: 1.9,  h: 50, c: '#bf00ff' },
  { left: '98%', dur: 3.0, delay: 0.3,  h: 30, c: '#39ff14' },
]

export default function NeonVioletTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #050510 !important; }
        @keyframes rainFall {
          0%   { transform: translateY(-80px); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes neonVioletPulse {
          0%, 100% { box-shadow: 0 0 18px rgba(191,0,255,0.55), 0 0 40px rgba(57,255,20,0.3); }
          50%       { box-shadow: 0 0 32px rgba(191,0,255,0.85), 0 0 70px rgba(57,255,20,0.55), 0 0 110px rgba(191,0,255,0.2); }
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
              animation: `rainFall ${d.dur}s linear ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="min-h-screen bg-[#050510] flex flex-col items-center py-12 px-4" style={{ overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-0.5 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #bf00ff, #39ff14)',
                  animation: 'neonVioletPulse 2.5s ease-in-out infinite',
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
                  background: '#0a0518',
                  border: '2px solid #bf00ff',
                  animation: 'neonVioletPulse 2.5s ease-in-out infinite',
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: '#bf00ff', textShadow: '0 0 10px #bf00ff, 0 0 20px #bf00ff' }}
                >
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1
              className="text-2xl font-bold tracking-widest mb-1"
              style={{ color: '#ffffff', textShadow: '0 0 10px rgba(57,255,20,0.8), 0 0 20px rgba(57,255,20,0.4)' }}
            >
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-16 h-px my-3"
              style={{ background: 'linear-gradient(90deg, #bf00ff, #39ff14)', boxShadow: '0 0 8px rgba(191,0,255,0.8)' }}
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
                  background: '#0a0518',
                  border: idx % 2 === 0 ? '1px solid rgba(191,0,255,0.4)' : '1px solid rgba(57,255,20,0.4)',
                  color: idx % 2 === 0 ? '#bf00ff' : '#39ff14',
                  textShadow: idx % 2 === 0 ? '0 0 8px rgba(191,0,255,0.8)' : '0 0 8px rgba(57,255,20,0.8)',
                  boxShadow: idx % 2 === 0
                    ? '0 0 15px rgba(191,0,255,0.15), inset 0 0 15px rgba(191,0,255,0.05)'
                    : '0 0 15px rgba(57,255,20,0.15), inset 0 0 15px rgba(57,255,20,0.05)',
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
