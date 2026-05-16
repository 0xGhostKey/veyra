import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function ChromePlatinumTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#08090c' }}>
      <style>{`html, body { background-color: #08090c !important; }`}</style>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="rounded-full mb-4"
              style={{
                padding: '2px',
                background: 'linear-gradient(135deg, #ffffff, #808090, #ffffff)',
                boxShadow: '0 0 30px rgba(220, 228, 236, 0.2)',
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
                background: '#0f1014',
                border: '1px solid rgba(220, 228, 236, 0.3)',
                boxShadow: '0 0 20px rgba(220, 228, 236, 0.05)',
              }}
            >
              <span className="text-3xl font-bold" style={{ color: '#dce4ec' }}>
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-[0.2em] mb-2" style={{ color: '#eef2f6' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div
            className="w-8 h-px mb-3"
            style={{ background: '#dce4ec', boxShadow: '0 0 6px rgba(220, 228, 236, 0.6)' }}
          />
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#6070808' }}>
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
              className="block w-full px-6 py-4 rounded-2xl text-center font-semibold tracking-wider transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #0f1014 0%, #141620 100%)',
                border: '1px solid rgba(220, 228, 236, 0.15)',
                color: '#dce4ec',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
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
