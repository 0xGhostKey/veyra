import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

export default function PremiumAuraTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #030308 !important; }
        @keyframes auraRotate {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes auraPulse {
          0%, 100% { opacity: 0.14; }
          50%       { opacity: 0.24; }
        }
        @keyframes prismRing {
          0%   { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>

      {/* Rotating prismatic aura */}
      <div style={{
        position: 'fixed',
        top: '40%', left: '50%',
        width: '180vw', height: '180vw',
        background: 'conic-gradient(from 0deg, #ff0080, #8800ff, #0055ff, #00ffcc, #ccff00, #ff8800, #ff0080)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'auraRotate 28s linear infinite, auraPulse 7s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
      }} />

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>

          {/* Top separator */}
          <div className="h-px mb-10" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,0,128,0.5), rgba(128,0,255,0.5), rgba(0,150,255,0.5), rgba(0,220,180,0.5), transparent)',
          }} />

          <div className="flex flex-col items-center mb-10">
            {/* Avatar with prismatic ring */}
            <div className="relative mb-5" style={{ width: 96, height: 96 }}>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #ff0080, #8800ff, #0055ff, #00ffcc, #ccff00, #ff8800, #ff0080)',
                  animation: 'prismRing 8s linear infinite',
                }}
              />
              <div
                className="absolute rounded-full overflow-hidden flex items-center justify-center"
                style={{ inset: 2, background: '#0a0a18' }}
              >
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.95)' }}>
              {profile.display_name ?? 'No Name'}
            </h1>

            {/* Prismatic separator line */}
            <div className="w-14 h-px mb-4" style={{
              background: 'linear-gradient(90deg, #ff0080, #8800ff, #0055ff, #00ffcc)',
            }} />

            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.42)' }}>
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
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(16px)',
                  // @ts-ignore
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />

          <GallerySection photos={galleryPhotos} />

          <div className="h-px mt-10 mb-6" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,0,128,0.4), rgba(128,0,255,0.4), rgba(0,150,255,0.4), transparent)',
          }} />
          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
