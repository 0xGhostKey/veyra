import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

function GoldDust({ color, opacity }: { color: string; opacity: number }) {
  return (
    <svg width="8" height="8" viewBox="0 0 12 12" style={{ display: 'block' }}>
      <polygon points="6,0 7.8,4.2 12,6 7.8,7.8 6,12 4.2,7.8 0,6 4.2,4.2" fill={color} fillOpacity={opacity} />
    </svg>
  )
}

const DUST = [
  { left: '4%',  dur: 12, delay: 0,    op: 0.55, drift: 18  },
  { left: '9%',  dur: 16, delay: 3,    op: 0.4,  drift: -12 },
  { left: '15%', dur: 10, delay: 1.5,  op: 0.65, drift: 22  },
  { left: '21%', dur: 14, delay: 5,    op: 0.45, drift: -8  },
  { left: '27%', dur: 11, delay: 2,    op: 0.6,  drift: 15  },
  { left: '33%', dur: 17, delay: 7,    op: 0.35, drift: -20 },
  { left: '39%', dur: 13, delay: 0.8,  op: 0.5,  drift: 10  },
  { left: '45%', dur: 9,  delay: 4,    op: 0.7,  drift: -16 },
  { left: '52%', dur: 15, delay: 6,    op: 0.4,  drift: 24  },
  { left: '58%', dur: 12, delay: 1,    op: 0.6,  drift: -14 },
  { left: '64%', dur: 10, delay: 8,    op: 0.5,  drift: 18  },
  { left: '70%', dur: 16, delay: 2.5,  op: 0.45, drift: -10 },
  { left: '76%', dur: 11, delay: 4.5,  op: 0.65, drift: 20  },
  { left: '82%', dur: 14, delay: 0.3,  op: 0.4,  drift: -22 },
  { left: '88%', dur: 13, delay: 6.5,  op: 0.55, drift: 12  },
  { left: '93%', dur: 9,  delay: 3.5,  op: 0.7,  drift: -18 },
  { left: '11%', dur: 15, delay: 9,    op: 0.35, drift: 16  },
  { left: '48%', dur: 12, delay: 10,   op: 0.5,  drift: -8  },
  { left: '61%', dur: 17, delay: 11,   op: 0.4,  drift: 14  },
  { left: '78%', dur: 10, delay: 7.5,  op: 0.6,  drift: -12 },
]

export default function LuxuryIvoryTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #f8f5ef !important; }
        @keyframes goldDrift {
          0%   { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(105vh) translateX(var(--drift)) rotate(180deg); opacity: 0; }
        }
      `}</style>

      {/* Gold dust overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {DUST.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-20px',
              left: d.left,
              '--drift': `${d.drift}px`,
              animation: `goldDrift ${d.dur}s ease-in-out ${d.delay}s infinite`,
            } as React.CSSProperties}
          >
            <GoldDust color="#a07840" opacity={d.op} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4" style={{ background: '#f8f5ef', overflowX: 'hidden' }}>
        <div className="w-full max-w-sm" style={{ position: 'relative', zIndex: 1 }}>
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
