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
              style={{ background: 'linear-gradient(135deg, #7ab87a, #e8a4b0)' }}
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
                background: '#0f180f',
                border: '1.5px solid #4a8050',
              }}
            >
              <span className="text-3xl font-bold" style={{ color: '#7ab87a' }}>
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#d0e8d0' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-px" style={{ background: '#4a8050' }} />
            <span style={{ color: '#e8a4b0', fontSize: 12 }}>✿</span>
            <div className="w-8 h-px" style={{ background: '#4a8050' }} />
          </div>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#708870' }}>
              {profile.bio}
            </p>
          )}
        </div>

        <MixedLinks
          links={activeLinks}
          gap="gap-3"
          renderTextLink={(link, idx) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 rounded-2xl text-center font-medium tracking-wider transition-all duration-300"
              style={{
                background: '#0f180f',
                border: idx % 2 === 0 ? '1px solid rgba(122, 184, 122, 0.35)' : '1px solid rgba(232, 164, 176, 0.35)',
                color: idx % 2 === 0 ? '#7ab87a' : '#e8a4b0',
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
