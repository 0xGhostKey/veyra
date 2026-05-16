import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function ChromeGoldTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0c0a00' }}>
      <style>{`html, body { background-color: #0c0a00 !important; }`}</style>
      <div className="w-full max-w-md">
        <div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #c8a830, transparent)' }}
        />

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-px rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #e8d060, #907820, #e8d060)' }}
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
                background: 'linear-gradient(135deg, #140e00, #1e1600)',
                border: '1px solid #706020',
              }}
            >
              <span className="text-3xl font-bold" style={{ color: '#c8a830' }}>
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#e8d880' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div
            className="w-12 h-px mb-3"
            style={{ background: 'linear-gradient(90deg, #604810, #c09828, #604810)' }}
          />
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#806830' }}>
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
                background: 'linear-gradient(135deg, #140e00, #1e1600)',
                border: '1px solid rgba(200, 168, 48, 0.2)',
                color: '#c8a830',
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,48,0.08), transparent)' }}
              />
              <span className="relative">{link.title}</span>
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

        <div
          className="h-px mt-10 mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, #c8a830, transparent)' }}
        />

        {!profile.logo_removed && (
          <div className="flex justify-center">
            <Logo dark gold />
          </div>
        )}
      </div>
    </div>
  )
}
