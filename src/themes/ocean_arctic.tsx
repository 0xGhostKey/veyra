import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

function AnimatedWave({ color }: { color: string }) {
  const back = 'M0,30 C16,10 34,50 50,30 C66,10 84,50 100,30 L100,50 L0,50 Z'
  const front = 'M0,36 C20,16 30,54 50,36 C70,16 80,54 100,36 L100,50 L0,50 Z'
  return (
    <div style={{ overflow: 'hidden', width: '100%', height: 50, position: 'relative' }}>
      <div style={{ display: 'flex', width: '200%', height: '100%', position: 'absolute', inset: 0, animation: 'oceanWave 12s linear infinite' }}>
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 100 50" preserveAspectRatio="none" style={{ flex: '0 0 50%', height: '100%' }}>
            <path d={back} fill={color} fillOpacity="0.13" />
          </svg>
        ))}
      </div>
      <div style={{ display: 'flex', width: '200%', height: '100%', position: 'absolute', inset: 0, animation: 'oceanWave 7s linear infinite reverse' }}>
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 100 50" preserveAspectRatio="none" style={{ flex: '0 0 50%', height: '100%' }}>
            <path d={front} fill={color} fillOpacity="0.24" />
          </svg>
        ))}
      </div>
    </div>
  )
}

export default function OceanArcticTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#04080e', overflowX: 'hidden' }}>
      <style>{`
        html, body { background-color: #04080e !important; }
        @keyframes oceanWave {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes oceanRipple {
          0%, 100% { box-shadow: 0 0 0 0 rgba(160,216,248,0.18), 0 0 0 7px rgba(160,216,248,0.06); }
          50%       { box-shadow: 0 0 0 10px rgba(160,216,248,0.03), 0 0 0 20px rgba(160,216,248,0); }
        }
      `}</style>
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-6">
          {profile.avatar_url ? (
            <div
              className="p-px rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, #a0d8f8, #2050a0, #a0d8f8)',
                animation: 'oceanRipple 3s ease-in-out infinite',
              }}
            >
              <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-24 h-24 rounded-full object-cover" />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{
                background: '#020610',
                border: '1px solid rgba(160,216,248,0.3)',
                animation: 'oceanRipple 3s ease-in-out infinite',
              }}
            >
              <span className="text-3xl font-bold" style={{ color: '#80c8f8' }}>
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-3" style={{ color: '#d0ecff' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#3060a0' }}>
              {profile.bio}
            </p>
          )}
        </div>

        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <AnimatedWave color="#80c8f8" />
        </div>

        <div className="mt-4">
          <MixedLinks
            links={activeLinks}
            gap="gap-3"
            renderTextLink={(link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: 'linear-gradient(180deg, rgba(160,216,248,0.07) 0%, rgba(10,30,70,0.45) 100%)',
                  border: '1px solid rgba(160,216,248,0.15)',
                  color: '#a0d8f8',
                }}
              >
                {link.title}
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
        </div>

        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <AnimatedWave color="#80c8f8" />
        </div>

        {!profile.logo_removed && (
          <div className="flex justify-center mt-4">
            <Logo dark />
          </div>
        )}
      </div>
    </div>
  )
}
