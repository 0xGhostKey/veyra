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
  { left: '3%',  dur: 13, delay: 0,    op: 0.6,  drift: 20  },
  { left: '8%',  dur: 17, delay: 2.8,  op: 0.45, drift: -14 },
  { left: '14%', dur: 11, delay: 1.2,  op: 0.7,  drift: 24  },
  { left: '20%', dur: 15, delay: 5.5,  op: 0.5,  drift: -10 },
  { left: '26%', dur: 12, delay: 0.6,  op: 0.65, drift: 16  },
  { left: '32%', dur: 18, delay: 7.2,  op: 0.4,  drift: -22 },
  { left: '38%', dur: 14, delay: 3.4,  op: 0.55, drift: 12  },
  { left: '44%', dur: 10, delay: 9,    op: 0.75, drift: -18 },
  { left: '51%', dur: 16, delay: 1.8,  op: 0.45, drift: 26  },
  { left: '57%', dur: 13, delay: 6,    op: 0.65, drift: -16 },
  { left: '63%', dur: 11, delay: 4.2,  op: 0.55, drift: 20  },
  { left: '69%', dur: 17, delay: 0.4,  op: 0.5,  drift: -12 },
  { left: '75%', dur: 12, delay: 8,    op: 0.7,  drift: 18  },
  { left: '81%', dur: 15, delay: 2.2,  op: 0.45, drift: -24 },
  { left: '87%', dur: 14, delay: 5,    op: 0.6,  drift: 14  },
  { left: '92%', dur: 10, delay: 3,    op: 0.75, drift: -20 },
  { left: '12%', dur: 16, delay: 10,   op: 0.4,  drift: 18  },
  { left: '47%', dur: 13, delay: 11,   op: 0.55, drift: -10 },
  { left: '66%', dur: 18, delay: 8.5,  op: 0.45, drift: 16  },
  { left: '79%', dur: 11, delay: 12,   op: 0.65, drift: -14 },
]

export default function LuxuryBlackTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0a0a0a !important; }
        @keyframes goldDriftBlack {
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
              animation: `goldDriftBlack ${d.dur}s ease-in-out ${d.delay}s infinite`,
            } as React.CSSProperties}
          >
            <GoldDust color="#d4af37" opacity={d.op} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4" style={{ background: '#0a0a0a', overflowX: 'hidden' }}>
        <div className="w-full max-w-sm" style={{ position: 'relative', zIndex: 1 }}>
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

                              <div className="flex justify-center mt-6">
                  <Logo dark gold />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
