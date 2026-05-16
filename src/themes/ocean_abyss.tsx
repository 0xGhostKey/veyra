import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

function WaveDiv({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 300 14" className="w-full" style={{ height: 14, display: 'block' }}>
      <path
        d="M0,7 C50,1 100,13 150,7 C200,1 250,13 300,7"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        strokeOpacity="0.45"
      />
    </svg>
  )
}

export default function OceanAbyssTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#020c14' }}>
      <style>{`html, body { background-color: #020c14 !important; }`}</style>
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-px rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #003870, #00d4ff)',
                boxShadow: '0 0 0 5px rgba(0,212,255,0.07), 0 0 0 10px rgba(0,212,255,0.03)',
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
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{
                background: '#010a10',
                border: '1px solid rgba(0,212,255,0.3)',
                boxShadow: '0 0 0 5px rgba(0,212,255,0.07), 0 0 0 10px rgba(0,212,255,0.03)',
              }}
            >
              <span className="text-3xl font-bold" style={{ color: '#00d4ff' }}>
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}

          <h1 className="text-2xl font-bold tracking-widest mb-3" style={{ color: '#a0e8ff' }}>
            {profile.display_name ?? 'No Name'}
          </h1>

          <div className="w-full max-w-[180px] mb-3">
            <WaveDiv color="#00d4ff" />
          </div>

          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#2a6880' }}>
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
              className="block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(180deg, rgba(0,212,255,0.08) 0%, rgba(0,30,80,0.4) 100%)',
                border: '1px solid rgba(0,212,255,0.18)',
                color: '#80e8ff',
              }}
            >
              {link.title}
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

        <div className="w-full mt-10 mb-6">
          <WaveDiv color="#00d4ff" />
        </div>

        {!profile.logo_removed && (
          <div className="flex justify-center">
            <Logo dark />
          </div>
        )}
      </div>
    </div>
  )
}
