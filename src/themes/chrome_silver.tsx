import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function ChromeSilverTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0e0f11' }}>
      <style>{`html, body { background-color: #0e0f11 !important; }`}</style>
      <div className="w-full max-w-md">
        <div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #b8bec8, transparent)' }}
        />

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-px rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #dce4ec, #606872, #dce4ec)' }}
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
                background: 'linear-gradient(135deg, #1a1c20, #242830)',
                border: '1px solid #505860',
              }}
            >
              <span className="text-3xl font-bold" style={{ color: '#b8bec8' }}>
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#dce4ec' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div
            className="w-12 h-px mb-3"
            style={{ background: 'linear-gradient(90deg, #606872, #b8bec8, #606872)' }}
          />
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#808890' }}>
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
                background: 'linear-gradient(135deg, #16181c, #1e2028)',
                border: '1px solid rgba(184, 190, 200, 0.2)',
                color: '#c8d0da',
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(184,190,200,0.08), transparent)' }}
              />
              <span className="relative">{link.title}</span>
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

        <div
          className="h-px mt-10 mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, #b8bec8, transparent)' }}
        />

        {!profile.logo_removed && (
          <div className="flex justify-center">
            <Logo dark />
          </div>
        )}
      </div>
    </div>
  )
}
