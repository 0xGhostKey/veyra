import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function SakuraDuskTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#13090d' }}>
      <style>{`html, body { background-color: #13090d !important; }`}</style>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-0.5 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #e87ca8, #8a2040)' }}
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
              style={{ background: 'linear-gradient(135deg, #e87ca8, #8a2040)' }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: '#200a12' }}>
                <span className="text-3xl font-bold" style={{ color: '#e87ca8' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#f0c8d8' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-px" style={{ background: '#e87ca8' }} />
            <span style={{ color: '#e87ca8', fontSize: 14 }}>✿</span>
            <div className="w-8 h-px" style={{ background: '#e87ca8' }} />
          </div>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#a06878' }}>
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
                background: '#1e0a12',
                border: '1px solid rgba(232, 124, 168, 0.3)',
                color: '#e87ca8',
                boxShadow: '0 2px 12px rgba(232, 124, 168, 0.08)',
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
