import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function SakuraMatchaTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0a100a' }}>
      <style>{`html, body { background-color: #0a100a !important; }`}</style>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-0.5 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #f080b0, #c04080)' }}
            >
              <img
                src={profile.avatar_url}
                alt={profile.display_name ?? 'avatar'}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          ) : (
            <div
              className="p-0.5 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #f080b0, #c04080)' }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: '#0f180f' }}>
                <span className="text-3xl font-bold" style={{ color: '#f080b0' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#fce4f0' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-px" style={{ background: '#f080b0' }} />
            <span style={{ color: '#f080b0', fontSize: 14 }}>✿</span>
            <div className="w-8 h-px" style={{ background: '#f080b0' }} />
          </div>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#a06080' }}>
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
                background: '#0f180f',
                border: '1px solid rgba(240, 128, 176, 0.3)',
                color: '#f080b0',
                boxShadow: '0 2px 12px rgba(240, 128, 176, 0.08)',
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
