import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function NeonAmberTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`html, body { background-color: #0a0800 !important; }`}</style>
      <div className="min-h-screen bg-[#0a0800] flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-10">
            {profile.avatar_url ? (
              <div
                className="p-0.5 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #ff8c00, #ffd700)',
                  boxShadow: '0 0 20px rgba(255, 140, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)',
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
                  background: '#110900',
                  border: '2px solid #ff8c00',
                  boxShadow: '0 0 20px rgba(255, 140, 0, 0.5), inset 0 0 20px rgba(255, 140, 0, 0.1)',
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: '#ff8c00', textShadow: '0 0 10px #ff8c00, 0 0 20px #ff8c00' }}
                >
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
            <h1
              className="text-2xl font-bold tracking-widest mb-1"
              style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4)' }}
            >
              {profile.display_name ?? 'No Name'}
            </h1>
            <div
              className="w-16 h-px my-3"
              style={{ background: 'linear-gradient(90deg, #ff8c00, #ffd700)', boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)' }}
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
                  background: '#110900',
                  border: idx % 2 === 0 ? '1px solid rgba(255, 140, 0, 0.4)' : '1px solid rgba(255, 215, 0, 0.4)',
                  color: idx % 2 === 0 ? '#ff8c00' : '#ffd700',
                  textShadow: idx % 2 === 0 ? '0 0 8px rgba(255, 140, 0, 0.8)' : '0 0 8px rgba(255, 215, 0, 0.8)',
                  boxShadow: idx % 2 === 0
                    ? '0 0 15px rgba(255, 140, 0, 0.15), inset 0 0 15px rgba(255, 140, 0, 0.05)'
                    : '0 0 15px rgba(255, 215, 0, 0.15), inset 0 0 15px rgba(255, 215, 0, 0.05)',
                }}
              >
                {link.title}
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          {!profile.logo_removed && (
            <div className="mt-10 flex justify-center">
              <Logo dark />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
