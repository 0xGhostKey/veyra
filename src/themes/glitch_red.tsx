import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const BARS = [
  { top: '7%',   height: 2, dur: 4.0, delay: 0,    opacity: 0.55 },
  { top: '15%',  height: 1, dur: 3.2, delay: 1.2,  opacity: 0.42 },
  { top: '24%',  height: 3, dur: 5.5, delay: 0.5,  opacity: 0.60 },
  { top: '33%',  height: 1, dur: 3.8, delay: 2.4,  opacity: 0.38 },
  { top: '42%',  height: 2, dur: 6.2, delay: 0.3,  opacity: 0.52 },
  { top: '51%',  height: 3, dur: 3.4, delay: 3.8,  opacity: 0.48 },
  { top: '60%',  height: 1, dur: 4.8, delay: 1.0,  opacity: 0.35 },
  { top: '69%',  height: 2, dur: 3.1, delay: 4.6,  opacity: 0.62 },
  { top: '78%',  height: 3, dur: 5.0, delay: 0.8,  opacity: 0.44 },
  { top: '86%',  height: 1, dur: 3.6, delay: 2.9,  opacity: 0.50 },
  { top: '92%',  height: 2, dur: 4.3, delay: 1.5,  opacity: 0.40 },
  { top: '97%',  height: 1, dur: 2.9, delay: 5.2,  opacity: 0.33 },
]

export default function GlitchRedTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #080000 !important; }
        @keyframes glitchBarRed {
          0%, 78%, 100% { opacity: 0; transform: scaleX(0.2); }
          79%, 80% { opacity: 0.6; transform: scaleX(1); }
          81% { opacity: 0; transform: scaleX(0.9); }
          82% { opacity: 0.35; transform: scaleX(0.7); }
          83%, 77% { opacity: 0; }
          88%, 89% { opacity: 0.25; transform: scaleX(0.5); }
          90% { opacity: 0; }
        }
        @keyframes glitchTextRed {
          0%, 87%, 100% { text-shadow: none; }
          88% { text-shadow: -4px 0 #ff0020, 4px 0 #ff8800; }
          89% { text-shadow: 4px 0 #ff0020, -4px 0 #ff8800; transform: translateX(-3px); }
          90% { text-shadow: -2px 0 #ff4040; transform: translateX(2px); }
          91% { text-shadow: 3px 0 #ff0020; transform: translateX(-1px); }
          92% { text-shadow: none; transform: translateX(0); }
        }
        @keyframes warningGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,0,32,0.50); }
          50%       { box-shadow: 0 0 38px rgba(255,64,64,0.82), 0 0 66px rgba(255,0,32,0.28); }
        }
        @keyframes warningStrobe {
          0%, 94%, 100% { opacity: 1; }
          95% { opacity: 0.4; }
          96% { opacity: 1; }
          97% { opacity: 0.6; }
          98% { opacity: 1; }
        }
      `}</style>

      {/* Warning strip at top */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '4px',
        background: 'repeating-linear-gradient(90deg, #ff0020 0px, #ff0020 22px, #1a0000 22px, #1a0000 34px)',
        zIndex: 100,
        pointerEvents: 'none',
        animation: 'warningStrobe 4.5s ease infinite',
      }} />

      {/* Glitch bar overlay */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {BARS.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0, right: 0,
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

      <div className="min-h-screen flex flex-col items-center pt-14 pb-12 px-4" style={{ background: '#080000', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #ff0020, transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #ff4040, #880010)', animation: 'warningGlow 2.0s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#160000', border: '2px solid #ff0020', animation: 'warningGlow 2.0s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#ff4040' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1
              className="text-2xl font-bold tracking-widest mb-2"
              style={{ color: '#ff6060', animation: 'glitchTextRed 4.5s ease infinite' }}
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
                  background: 'repeating-linear-gradient(45deg, #160000, #160000 10px, #1c0000 10px, #1c0000 20px)',
                  border: '1px solid rgba(255,0,32,0.25)',
                  borderLeft: '3px solid rgba(255,0,32,0.55)',
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
