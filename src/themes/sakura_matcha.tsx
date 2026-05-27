import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

function SakuraFlower({ size, color, opacity = 1 }: { size: number; color: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <g key={deg} transform={`rotate(${deg}, 10, 10)`}>
          <path
            d="M10,10 C8,9 6.5,6 9.5,2.5 L10,6 L10.5,2.5 C13.5,6 12,9 10,10 Z"
            fill={color}
            fillOpacity={opacity}
          />
        </g>
      ))}
      <circle cx="10" cy="10" r="1.3" fill="rgba(255,255,255,0.45)" />
    </svg>
  )
}

const PETALS = [
  { top: '4%',  size: 11, dur: 14, delay: 0,   op: 0.5  },
  { top: '12%', size: 8,  dur: 19, delay: 2.5, op: 0.4  },
  { top: '21%', size: 13, dur: 12, delay: 4,   op: 0.55 },
  { top: '29%', size: 9,  dur: 17, delay: 1,   op: 0.45 },
  { top: '37%', size: 11, dur: 22, delay: 6.5, op: 0.5  },
  { top: '45%', size: 8,  dur: 13, delay: 3,   op: 0.4  },
  { top: '53%', size: 14, dur: 16, delay: 8.5, op: 0.55 },
  { top: '61%', size: 9,  dur: 18, delay: 5.5, op: 0.45 },
  { top: '69%', size: 10, dur: 11, delay: 2,   op: 0.5  },
  { top: '77%', size: 12, dur: 20, delay: 7,   op: 0.4  },
  { top: '85%', size: 8,  dur: 15, delay: 1.5, op: 0.45 },
  { top: '93%', size: 11, dur: 13, delay: 9.5, op: 0.5  },
]

export default function SakuraMatchaTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0d2010' }}>
      <style>{`
        html, body { background-color: #0d2010 !important; }
        @keyframes sakuraPetal {
          0%   { transform: translateX(0) translateY(0px) rotate(0deg);       opacity: 0; }
          8%   { opacity: 1; }
          25%  { transform: translateX(-25vw) translateY(18px) rotate(-25deg); }
          50%  { transform: translateX(-50vw) translateY(-6px) rotate(-55deg); }
          75%  { transform: translateX(-75vw) translateY(22px) rotate(-85deg); }
          92%  { opacity: 1; }
          100% { transform: translateX(-108vw) translateY(8px) rotate(-110deg); opacity: 0; }
        }
        @keyframes sakuraGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(240,128,176,0.35), 0 0 20px rgba(240,128,176,0.12); }
          50%       { box-shadow: 0 0 16px rgba(240,128,176,0.55), 0 0 32px rgba(240,128,176,0.22); }
        }
        @keyframes sakuraSep {
          0%, 100% { opacity: 0.65; transform: scale(1) rotate(0deg); }
          50%       { opacity: 1;    transform: scale(1.35) rotate(180deg); }
        }
      `}</style>

      {/* Floating petals */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {PETALS.map((p, i) => (
          <div key={i} style={{ position: 'absolute', top: p.top, right: '-15px', animation: `sakuraPetal ${p.dur}s ease-in-out ${p.delay}s infinite` }}>
            <svg width={p.size} height={Math.round(p.size * 1.4)} viewBox="0 0 20 28">
              <path
                d="M10,6.5 L4,1.5 C1.5,3 0.5,7 0.5,11.5 C0.5,17.5 3.5,23 10,26.5 C16.5,23 19.5,17.5 19.5,11.5 C19.5,7 18.5,3 16,1.5 L10,6.5 Z"
                fill="#f080b0" fillOpacity={p.op}
              />
              <path d="M10,6.5 Q10.6,16 10,26.5" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" fill="none" />
            </svg>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>

        <div className="flex justify-center gap-5 mb-6" style={{ opacity: 0.3 }}>
          <SakuraFlower size={9} color="#f080b0" />
          <SakuraFlower size={13} color="#f080b0" />
          <SakuraFlower size={9} color="#f080b0" />
        </div>

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-0.5 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #f080b0, #c04080)', animation: 'sakuraGlow 3.5s ease-in-out infinite' }}
            >
              <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-24 h-24 rounded-full object-cover" />
            </div>
          ) : (
            <div
              className="p-0.5 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #f080b0, #c04080)', animation: 'sakuraGlow 3.5s ease-in-out infinite' }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: '#0a1808' }}>
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
            <span style={{ display: 'inline-block', animation: 'sakuraSep 4s ease-in-out infinite' }}>
              <SakuraFlower size={14} color="#f080b0" opacity={0.9} />
            </span>
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
              style={{ background: '#0a1808', border: '1px solid rgba(240,128,176,0.3)', color: '#f080b0', boxShadow: '0 2px 12px rgba(240,128,176,0.08)' }}
            >
              {link.title}
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

                  <div className="mt-10 flex justify-center">
            {!profile.logo_removed && <Logo dark />}
          </div>
      </div>
    </div>
  )
}
