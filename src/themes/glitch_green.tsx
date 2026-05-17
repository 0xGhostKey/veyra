import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const BARS = [
  { top: '8%',   height: 1, dur: 5.2, delay: 0,   opacity: 0.45 },
  { top: '17%',  height: 2, dur: 3.8, delay: 1.4,  opacity: 0.35 },
  { top: '26%',  height: 3, dur: 6.5, delay: 0.6,  opacity: 0.55 },
  { top: '38%',  height: 1, dur: 4.1, delay: 2.8,  opacity: 0.40 },
  { top: '49%',  height: 2, dur: 7.0, delay: 0.3,  opacity: 0.50 },
  { top: '61%',  height: 1, dur: 3.5, delay: 4.2,  opacity: 0.30 },
  { top: '73%',  height: 3, dur: 5.8, delay: 1.1,  opacity: 0.60 },
  { top: '85%',  height: 2, dur: 4.6, delay: 3.5,  opacity: 0.38 },
]

export default function GlitchGreenTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #000800 !important; }
        @keyframes glitchBar {
          0%, 82%, 100% { opacity: 0; transform: scaleX(0.2); }
          83%, 84% { opacity: 0.5; transform: scaleX(1); }
          85% { opacity: 0; transform: scaleX(0.8); }
          86% { opacity: 0.3; transform: scaleX(0.6); }
          87%, 81% { opacity: 0; }
          92%, 93% { opacity: 0.2; transform: scaleX(0.4); }
          94% { opacity: 0; }
        }
        @keyframes glitchText {
          0%, 88%, 100% { text-shadow: none; }
          89% { text-shadow: -2px 0 #ff4444, 2px 0 #00ff41; }
          90% { text-shadow: 2px 0 #ff4444, -2px 0 #00ff41; transform: translateX(-1px); }
          91% { text-shadow: none; transform: translateX(1px); }
          92% { transform: translateX(0); }
        }
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      {/* Scanlines overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.03) 3px, rgba(0,255,65,0.03) 4px)',
      }} />

      {/* Glitch bar overlay */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {BARS.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0, right: 0,
              top: b.top,
              height: b.height,
              background: '#00ff41',
              opacity: b.opacity,
              animation: `glitchBar ${b.dur}s step-end ${b.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#000800', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.4), transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            {/* Avatar with corner bracket decorations */}
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {/* Corner brackets */}
              <div style={{ position: 'absolute', top: -6, left: -6, width: 14, height: 14, borderTop: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
              <div style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderTop: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />
              <div style={{ position: 'absolute', bottom: -6, left: -6, width: 14, height: 14, borderBottom: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
              <div style={{ position: 'absolute', bottom: -6, right: -6, width: 14, height: 14, borderBottom: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />

              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '2px solid #00ff41', boxShadow: '0 0 16px rgba(0,255,65,0.4)' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#001500', border: '2px solid #00ff41', boxShadow: '0 0 16px rgba(0,255,65,0.4)' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#00ff41' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <h1
              className="text-2xl font-bold tracking-widest mb-1"
              style={{ color: '#00ff41', fontFamily: 'monospace', animation: 'glitchText 6s ease infinite' }}
            >
              {profile.display_name ?? 'No Name'}
            </h1>
            {/* Blinking cursor */}
            <span style={{ color: '#00ff41', fontFamily: 'monospace', fontSize: '1.2rem', animation: 'cursorBlink 1s step-end infinite' }}>_</span>

            <div className="w-12 h-px mb-3 mt-2" style={{ background: 'rgba(0,255,65,0.3)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#008020', fontFamily: 'monospace' }}>
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
                  background: '#001800',
                  border: '1px solid rgba(0,255,65,0.3)',
                  color: '#00ff41',
                  fontFamily: 'monospace',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.1), transparent)' }}
                />
                <span className="relative">{`> ${link.title}`}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.4), transparent)' }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
