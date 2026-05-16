import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function ChromeVoidTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#03040a' }}>
      <style>{`html, body { background-color: #03040a !important; }`}</style>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-px rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, #80b8f0, #2060b0, #80b8f0)',
                boxShadow: '0 0 28px rgba(64, 144, 224, 0.4)',
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
                background: '#060810',
                border: '1px solid rgba(64, 144, 224, 0.4)',
                boxShadow: '0 0 20px rgba(64, 144, 224, 0.15), inset 0 0 20px rgba(64, 144, 224, 0.05)',
              }}
            >
              <span
                className="text-3xl font-bold"
                style={{ color: '#80b8f0', textShadow: '0 0 12px rgba(64, 144, 224, 0.8)' }}
              >
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1
            className="text-2xl font-bold tracking-widest mb-2"
            style={{ color: '#c0d8f0', textShadow: '0 0 16px rgba(64, 144, 224, 0.4)' }}
          >
            {profile.display_name ?? 'No Name'}
          </h1>
          <div
            className="w-16 h-px mb-3"
            style={{
              background: 'linear-gradient(90deg, transparent, #4090e0, transparent)',
              boxShadow: '0 0 8px rgba(64, 144, 224, 0.6)',
            }}
          />
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#4870a0' }}>
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
              className="block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300"
              style={{
                background: '#060810',
                border: '1px solid rgba(64, 144, 224, 0.25)',
                color: '#80b8f0',
                boxShadow: '0 0 12px rgba(64, 144, 224, 0.06)',
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
  )
}
