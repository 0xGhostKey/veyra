import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const BARS = [
  { top: '7%',   height: 1, dur: 5.5, delay: 0,   opacity: 0.45 },
  { top: '18%',  height: 2, dur: 4.0, delay: 1.6,  opacity: 0.35 },
  { top: '27%',  height: 3, dur: 6.8, delay: 0.5,  opacity: 0.55 },
  { top: '39%',  height: 1, dur: 4.3, delay: 2.9,  opacity: 0.38 },
  { top: '50%',  height: 2, dur: 7.2, delay: 0.2,  opacity: 0.50 },
  { top: '62%',  height: 1, dur: 3.6, delay: 4.4,  opacity: 0.30 },
  { top: '74%',  height: 3, dur: 5.9, delay: 1.0,  opacity: 0.60 },
  { top: '86%',  height: 2, dur: 4.7, delay: 3.3,  opacity: 0.40 },
]

export default function GlitchWhiteTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0a0a0a !important; }
        @keyframes glitchBarWhite {
          0%, 82%, 100% { opacity: 0; transform: scaleX(0.2); }
          83%, 84% { opacity: 0.5; transform: scaleX(1); }
          85% { opacity: 0; transform: scaleX(0.8); }
          86% { opacity: 0.3; transform: scaleX(0.6); }
          87%, 81% { opacity: 0; }
          92%, 93% { opacity: 0.2; transform: scaleX(0.4); }
          94% { opacity: 0; }
        }
        @keyframes glitchTextWhite {
          0%, 91%, 100% { text-shadow: none; }
          92% { text-shadow: -2px 0 rgba(255,255,255,0.5), 2px 0 rgba(200,200,200,0.5); }
          93% { text-shadow: 2px 0 rgba(255,255,255,0.5); transform: translateX(-1px); }
          94% { text-shadow: none; transform: translateX(0); }
        }
        @keyframes whiteGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(255,255,255,0.25); }
          50%       { box-shadow: 0 0 28px rgba(255,255,255,0.5), 0 0 50px rgba(224,224,224,0.15); }
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
              background: '#ffffff',
              opacity: b.opacity,
              animation: `glitchBarWhite ${b.dur}s step-end ${b.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0a0a0a', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff, #606060)',
                    animation: 'whiteGlow 3s ease-in-out infinite',
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
                    background: '#161616',
                    border: '2px solid rgba(255,255,255,0.6)',
                    animation: 'whiteGlow 3s ease-in-out infinite',
                  }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#e0e0e0' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1
              className="text-2xl font-bold tracking-widest mb-2"
              style={{
                color: '#ffffff',
                animation: 'glitchTextWhite 7s ease infinite',
              }}
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
                className="group block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #161616, #1e1e1e)',
                  border: '1px solid rgba(255,255,255,0.15)',
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
