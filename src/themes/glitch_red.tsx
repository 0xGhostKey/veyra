import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const BARS = [
  { top: '9%',   height: 2, dur: 5.3, delay: 0,   opacity: 0.50 },
  { top: '18%',  height: 1, dur: 3.9, delay: 1.5,  opacity: 0.38 },
  { top: '28%',  height: 3, dur: 6.6, delay: 0.6,  opacity: 0.55 },
  { top: '40%',  height: 1, dur: 4.2, delay: 2.7,  opacity: 0.42 },
  { top: '51%',  height: 2, dur: 7.1, delay: 0.4,  opacity: 0.48 },
  { top: '63%',  height: 1, dur: 3.7, delay: 4.0,  opacity: 0.33 },
  { top: '75%',  height: 3, dur: 5.7, delay: 1.2,  opacity: 0.58 },
  { top: '87%',  height: 2, dur: 4.5, delay: 3.6,  opacity: 0.44 },
]

export default function GlitchRedTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #080000 !important; }
        @keyframes glitchBarRed {
          0%, 82%, 100% { opacity: 0; transform: scaleX(0.2); }
          83%, 84% { opacity: 0.5; transform: scaleX(1); }
          85% { opacity: 0; transform: scaleX(0.8); }
          86% { opacity: 0.3; transform: scaleX(0.6); }
          87%, 81% { opacity: 0; }
          92%, 93% { opacity: 0.2; transform: scaleX(0.4); }
          94% { opacity: 0; }
        }
        @keyframes glitchTextRed {
          0%, 89%, 100% { text-shadow: none; }
          90% { text-shadow: -3px 0 #ff0020, 3px 0 #ff8800; }
          91% { text-shadow: 3px 0 #ff0020, -3px 0 #ff8800; transform: translateX(-2px); }
          92% { text-shadow: -1px 0 #ff4040; transform: translateX(1px); }
          93% { text-shadow: none; transform: translateX(0); }
        }
        @keyframes warningGlow {
          0%, 100% { box-shadow: 0 0 18px rgba(255,0,32,0.45); }
          50%       { box-shadow: 0 0 32px rgba(255,64,64,0.75), 0 0 58px rgba(255,0,32,0.25); }
        }
      `}</style>

      {/* Glitch bar overlay */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {BARS.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: b.top,
              height: b.height,
              background: '#ff0020',
              opacity: b.opacity,
              animation: `glitchBarRed ${b.dur}s step-end ${b.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#080000', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #ff0020, transparent)' }} />

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #ff4040, #880010)',
                    animation: 'warningGlow 2.2s ease-in-out infinite',
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
                    background: '#160000',
                    border: '2px solid #ff0020',
                    animation: 'warningGlow 2.2s ease-in-out infinite',
                  }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#ff4040' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1
              className="text-2xl font-bold tracking-widest mb-2"
              style={{
                color: '#ff6060',
                animation: 'glitchTextRed 5s ease infinite',
              }}
            >
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, #ff0020, transparent)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#802020' }}>
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
                  background: 'linear-gradient(135deg, #160000, #200000)',
                  border: '1px solid rgba(255,0,32,0.2)',
                  color: '#ff4040',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,64,64,0.12), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #ff0020, transparent)' }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
