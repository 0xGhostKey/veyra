import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function LuxuryBlackTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4" style={{ background: '#0a0a0a' }}>
      <style>{`html, body { background-color: #0a0a0a !important; }`}</style>
      <div className="w-full max-w-sm">
        {/* Outer frame */}
        <div style={{ border: '1px solid rgba(212,175,55,0.22)', padding: '2px' }}>
          <div style={{ border: '1px solid rgba(212,175,55,0.08)', padding: '40px 28px' }}>

            {/* Top ornamental divider */}
            <div className="flex items-center gap-3 mb-10">
              <div className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.35)' }} />
              <span style={{ color: '#d4af37', fontSize: 9, letterSpacing: '0.3em' }}>◆</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.35)' }} />
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center mb-10">
              {profile.avatar_url ? (
                <div className="mb-6" style={{ border: '1px solid rgba(212,175,55,0.45)', padding: '3px' }}>
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name ?? 'avatar'}
                    className="w-24 h-24 object-cover block"
                  />
                </div>
              ) : (
                <div
                  className="flex items-center justify-center mb-6"
                  style={{
                    width: 96, height: 96,
                    border: '1px solid rgba(212,175,55,0.45)',
                    background: '#111',
                  }}
                >
                  <span style={{ color: '#d4af37', fontSize: 30 }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
              <h1
                className="text-center"
                style={{ color: '#f0e8d0', fontSize: 14, fontWeight: 600, letterSpacing: '0.3em', marginBottom: 12 }}
              >
                {profile.display_name ?? 'No Name'}
              </h1>
              <div style={{ width: 28, height: 1, background: 'rgba(212,175,55,0.5)', marginBottom: 12 }} />
              {profile.bio && (
                <p className="text-center" style={{ color: 'rgba(212,175,55,0.45)', fontSize: 11, lineHeight: 1.9, letterSpacing: '0.04em', maxWidth: 200 }}>
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Links */}
            <MixedLinks
              links={activeLinks}
              gap="gap-2.5"
              renderTextLink={(link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full px-5 py-3.5 text-center text-[12px] font-medium tracking-widest transition-all duration-300 border border-[#d4af37]/25 text-white/70 hover:border-[#d4af37]/60 hover:text-white hover:bg-[#d4af37]/5"
                >
                  {link.title}
                </a>
              )}
            />
            <GallerySection photos={galleryPhotos} />

            {/* Bottom ornamental divider */}
            <div className="flex items-center gap-3 mt-10">
              <div className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.35)' }} />
              <span style={{ color: '#d4af37', fontSize: 9, letterSpacing: '0.3em' }}>◆</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(212,175,55,0.35)' }} />
            </div>

            {!profile.logo_removed && (
              <div className="flex justify-center mt-6">
                <Logo dark gold />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
