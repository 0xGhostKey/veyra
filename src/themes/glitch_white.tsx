import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

// Scattered pixel clusters (not full-width — TV static effect)
const PIXELS = [
  { top: '5%',  left: '8%',  width: '38%', height: 2, dur: 4.0, delay: 0    },
  { top: '12%', left: '58%', width: '22%', height: 1, dur: 3.2, delay: 1.6  },
  { top: '20%', left: '3%',  width: '50%', height: 3, dur: 5.6, delay: 0.4  },
  { top: '31%', left: '65%', width: '28%', height: 1, dur: 4.8, delay: 2.3  },
  { top: '42%', left: '18%', width: '45%', height: 2, dur: 3.7, delay: 0.9  },
  { top: '55%', left: '72%', width: '20%', height: 3, dur: 6.1, delay: 3.6  },
  { top: '63%', left: '2%',  width: '35%', height: 1, dur: 4.4, delay: 1.3  },
  { top: '74%', left: '50%', width: '40%', height: 2, dur: 3.5, delay: 4.2  },
  { top: '83%', left: '25%', width: '55%', height: 1, dur: 5.3, delay: 0.7  },
  { top: '91%', left: '62%', width: '25%', height: 3, dur: 4.7, delay: 2.9  },
]

export default function GlitchWhiteTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0a0a0a !important; }
        @keyframes glitchPixel {
          0%, 78%, 100% { opacity: 0; transform: scaleX(0.1) translateX(-20px); }
          79% { opacity: 0.55; transform: scaleX(1) translateX(0); }
          80% { opacity: 0.30; transform: scaleX(0.8) translateX(5px); }
          81% { opacity: 0; transform: scaleX(0.5); }
          88%, 89% { opacity: 0.20; transform: scaleX(0.6) translateX(-3px); }
          90% { opacity: 0; }
        }
        @keyframes glitchTextWhite {
          0%, 91%, 100% { text-shadow: none; }
          92% { text-shadow: -2px 0 rgba(255,255,255,0.5), 2px 0 rgba(180,180,180,0.5); }
          93% { text-shadow: 2px 0 rgba(255,255,255,0.5); transform: translateX(-1px); }
          94% { text-shadow: none; transform: translateX(0); }
        }
        @keyframes whiteGlow {
          0%, 100% { box-shadow: 0 0 14px rgba(255,255,255,0.22); }
          50%       { box-shadow: 0 0 26px rgba(255,255,255,0.48), 0 0 50px rgba(220,220,220,0.14); }
        }
      `}</style>

      {/* Subtle noise texture */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 3px)',
      }} />

      {/* Scattered pixel static overlay */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {PIXELS.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: p.width,
              height: p.height,
              background: '#ffffff',
              opacity: 0,
              animation: `glitchPixel ${p.dur}s step-end ${p.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0a0a0a', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {/* Pixel corner notches */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, background: '#0a0a0a', zIndex: 1 }} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, background: '#0a0a0a', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, background: '#0a0a0a', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, background: '#0a0a0a', zIndex: 1 }} />

              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #ffffff, #606060)', animation: 'whiteGlow 3s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#161616', border: '2px solid rgba(255,255,255,0.6)', animation: 'whiteGlow 3s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#e0e0e0' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1
              className="text-2xl font-bold tracking-widest mb-2"
              style={{ color: '#ffffff', animation: 'glitchTextWhite 7s ease infinite' }}
            >
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#606060' }}>
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
                className="group block w-full px-6 py-4 text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #161616, #1e1e1e)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '3px',
                  color: '#e0e0e0',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
