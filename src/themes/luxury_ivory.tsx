import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

export default function LuxuryIvoryTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`html, body { background-color: #f8f5ef !important; }`}</style>
      <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4" style={{ background: '#f8f5ef' }}>
        <div className="w-full max-w-sm">
          {/* Outer frame */}
          <div style={{ border: '1px solid rgba(160,120,64,0.3)', padding: '2px' }}>
            <div style={{ border: '1px solid rgba(160,120,64,0.12)', padding: '40px 28px' }}>

              {/* Top ornamental divider */}
              <div className="flex items-center gap-3 mb-10">
                <div className="flex-1 h-px" style={{ background: 'rgba(160,120,64,0.4)' }} />
                <span style={{ color: '#a07840', fontSize: 9, letterSpacing: '0.3em' }}>◆</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(160,120,64,0.4)' }} />
              </div>

              {/* Profile */}
              <div className="flex flex-col items-center mb-10">
                {profile.avatar_url ? (
                  <div className="mb-6" style={{ border: '1px solid rgba(160,120,64,0.5)', padding: '3px' }}>
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
                      border: '1px solid rgba(160,120,64,0.5)',
                      background: '#ede8de',
                    }}
                  >
                    <span style={{ color: '#a07840', fontSize: 30 }}>
                      {(profile.display_name ?? 'U')[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <h1
                  className="text-center"
                  style={{ color: '#1a1208', fontSize: 14, fontWeight: 600, letterSpacing: '0.3em', marginBottom: 12 }}
                >
                  {profile.display_name ?? 'No Name'}
                </h1>
                <div style={{ width: 28, height: 1, background: 'rgba(160,120,64,0.5)', marginBottom: 12 }} />
                {profile.bio && (
                  <p className="text-center" style={{ color: 'rgba(160,120,64,0.65)', fontSize: 11, lineHeight: 1.9, letterSpacing: '0.04em', maxWidth: 200 }}>
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
                    className="group block w-full px-5 py-3.5 text-center text-[12px] font-medium tracking-widest transition-all duration-300 border border-[#a07840]/25 text-[#1a1208]/70 hover:border-[#a07840]/60 hover:text-[#1a1208] hover:bg-[#a07840]/5"
                  >
                    {link.title}
                  </a>
                )}
              />
              <GallerySection photos={galleryPhotos} />

              {/* Bottom ornamental divider */}
              <div className="flex items-center gap-3 mt-10">
                <div className="flex-1 h-px" style={{ background: 'rgba(160,120,64,0.4)' }} />
                <span style={{ color: '#a07840', fontSize: 9, letterSpacing: '0.3em' }}>◆</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(160,120,64,0.4)' }} />
              </div>

              {!profile.logo_removed && (
                <div className="flex justify-center mt-6">
                  <Logo />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
