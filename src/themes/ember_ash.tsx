import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const SPARKS = [
  { left: '3%',  size: 5, dur: 4.2, delay: 0,    color: '#c0bdb8' },
  { left: '7%',  size: 7, dur: 5.0, delay: 0.6,  color: '#d8d4ce' },
  { left: '11%', size: 4, dur: 3.8, delay: 1.4,  color: '#a89e96' },
  { left: '15%', size: 8, dur: 5.6, delay: 0.3,  color: '#e0dcd6' },
  { left: '19%', size: 5, dur: 4.8, delay: 2.2,  color: '#c0bdb8' },
  { left: '23%', size: 6, dur: 4.1, delay: 0.9,  color: '#b44422' },
  { left: '27%', size: 9, dur: 5.2, delay: 3.6,  color: '#a89e96' },
  { left: '31%', size: 4, dur: 3.6, delay: 1.7,  color: '#d8d4ce' },
  { left: '35%', size: 7, dur: 5.5, delay: 0.5,  color: '#c0bdb8' },
  { left: '39%', size: 5, dur: 4.4, delay: 4.2,  color: '#cc5533' },
  { left: '43%', size: 8, dur: 4.0, delay: 2.6,  color: '#a89e96' },
  { left: '47%', size: 6, dur: 5.2, delay: 1.0,  color: '#e0dcd6' },
  { left: '51%', size: 4, dur: 3.7, delay: 4.0,  color: '#c0bdb8' },
  { left: '55%', size: 9, dur: 5.4, delay: 1.2,  color: '#d8d4ce' },
  { left: '59%', size: 5, dur: 4.6, delay: 0.4,  color: '#a89e96' },
  { left: '63%', size: 7, dur: 3.9, delay: 5.4,  color: '#b44422' },
  { left: '67%', size: 4, dur: 5.0, delay: 2.1,  color: '#c0bdb8' },
  { left: '71%', size: 8, dur: 5.7, delay: 0.7,  color: '#d8d4ce' },
  { left: '75%', size: 6, dur: 4.0, delay: 3.3,  color: '#a89e96' },
  { left: '79%', size: 9, dur: 4.8, delay: 1.5,  color: '#cc5533' },
  { left: '83%', size: 5, dur: 3.5, delay: 4.9,  color: '#c0bdb8' },
  { left: '87%', size: 7, dur: 5.3, delay: 0.8,  color: '#d8d4ce' },
  { left: '91%', size: 4, dur: 4.5, delay: 2.9,  color: '#a89e96' },
  { left: '95%', size: 6, dur: 3.8, delay: 6.2,  color: '#e0dcd6' },
]

const COALS = [
  { x: '7%',  bottom: 8,  size: 5, dur: 1.8, delay: 0   },
  { x: '16%', bottom: 14, size: 4, dur: 2.3, delay: 0.5 },
  { x: '26%', bottom: 6,  size: 6, dur: 1.5, delay: 1.1 },
  { x: '36%', bottom: 19, size: 3, dur: 2.0, delay: 0.3 },
  { x: '46%', bottom: 10, size: 5, dur: 1.7, delay: 1.6 },
  { x: '56%', bottom: 4,  size: 4, dur: 2.4, delay: 0.8 },
  { x: '66%', bottom: 16, size: 6, dur: 1.9, delay: 0.2 },
  { x: '76%', bottom: 8,  size: 3, dur: 2.1, delay: 1.3 },
  { x: '87%', bottom: 12, size: 5, dur: 1.6, delay: 0.6 },
]

export default function EmberAshTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #111010 !important; }
        @keyframes sparkRise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          8%   { opacity: 0.85; }
          35%  { transform: translateY(-35vh) translateX(8px) scale(0.85); opacity: 0.60; }
          65%  { transform: translateY(-68vh) translateX(-6px) scale(0.6); opacity: 0.28; }
          100% { transform: translateY(-108vh) translateX(4px) scale(0.3); opacity: 0; }
        }
        @keyframes ashShimmer {
          0%, 100% { box-shadow: 0 0 18px rgba(208,200,188,0.3); }
          50%       { box-shadow: 0 0 34px rgba(224,218,210,0.55), 0 0 58px rgba(176,160,144,0.2); }
        }
        @keyframes coalGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.3); }
        }
        @keyframes smolderPulse {
          0%, 100% { opacity: 0.62; }
          50%       { opacity: 0.88; }
        }
      `}</style>

      {/* Spark overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {SPARKS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '80px',
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${s.color} 0%, ${s.color}99 35%, transparent 70%)`,
              animation: `sparkRise ${s.dur}s ease-out ${s.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      {/* Bottom smoldering glow */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '120px', pointerEvents: 'none', zIndex: 1 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(70,30,15,0.80) 0%, rgba(50,20,10,0.48) 45%, transparent 100%)',
          animation: 'smolderPulse 3.2s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35px',
          background: 'linear-gradient(0deg, rgba(40,18,8,0.9) 0%, rgba(60,25,12,0.5) 100%)',
        }} />
        {/* Gray ash layer */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
          background: 'linear-gradient(0deg, rgba(80,76,72,0.45) 0%, transparent 100%)',
        }} />
        {/* Coal ember dots */}
        {COALS.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: c.bottom,
              left: c.x,
              width: c.size,
              height: c.size,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,80,20,0.95) 0%, rgba(200,40,0,0.5) 50%, transparent 80%)',
              animation: `coalGlow ${c.dur}s ease-in-out ${c.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#111010', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #b0a090, transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #d0c8bc, #707060)', animation: 'ashShimmer 3s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#1a1918', border: '1px solid rgba(176,160,144,0.3)', animation: 'ashShimmer 3s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#d0c8bc' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#e0d8d0' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, #b0a090, transparent)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#706858' }}>
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
                  background: 'linear-gradient(135deg, #1a1918, #202018)',
                  border: '1px solid rgba(176,160,144,0.2)',
                  color: '#d0c8bc',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(208,200,188,0.1), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #b0a090, transparent)' }} />
          <div className="flex justify-center pb-8">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
