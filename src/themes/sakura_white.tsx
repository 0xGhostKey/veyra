import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

const PETALS = [
  { top: '4%',  size: 11, dur: 14, delay: 0,   op: 0.55 },
  { top: '12%', size: 8,  dur: 19, delay: 2.5, op: 0.45 },
  { top: '21%', size: 13, dur: 12, delay: 4,   op: 0.6  },
  { top: '29%', size: 9,  dur: 17, delay: 1,   op: 0.5  },
  { top: '37%', size: 11, dur: 22, delay: 6.5, op: 0.55 },
  { top: '45%', size: 8,  dur: 13, delay: 3,   op: 0.45 },
  { top: '53%', size: 14, dur: 16, delay: 8.5, op: 0.6  },
  { top: '61%', size: 9,  dur: 18, delay: 5.5, op: 0.5  },
  { top: '69%', size: 10, dur: 11, delay: 2,   op: 0.55 },
  { top: '77%', size: 12, dur: 20, delay: 7,   op: 0.45 },
  { top: '85%', size: 8,  dur: 15, delay: 1.5, op: 0.5  },
  { top: '93%', size: 11, dur: 13, delay: 9.5, op: 0.55 },
]

export default function SakuraWhiteTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#fdf6f8' }}>
      <style>{`
        html, body { background-color: #fdf6f8 !important; }
        @keyframes sakuraPetal {
          0%   { transform: translateX(0) translateY(0px)  rotate(0deg);    opacity: 0; }
          8%   { opacity: 1; }
          25%  { transform: translateX(-25vw) translateY(18px) rotate(-25deg); }
          50%  { transform: translateX(-50vw) translateY(-6px) rotate(-55deg); }
          75%  { transform: translateX(-75vw) translateY(22px) rotate(-85deg); }
          92%  { opacity: 1; }
          100% { transform: translateX(-108vw) translateY(8px) rotate(-110deg); opacity: 0; }
        }
        @keyframes sakuraGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(196,132,154,0.35), 0 0 20px rgba(196,132,154,0.12); }
          50%       { box-shadow: 0 0 16px rgba(196,132,154,0.55), 0 0 32px rgba(196,132,154,0.22); }
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
              {/* Petal body: rounded teardrop with top notch — characteristic sakura shape */}
              <path
                d="M10,6 C9,2.5 6.5,0.5 4,1.5 C1.5,2.5 0.5,6.5 0.5,11 C0.5,17 3.5,23 10,26.5 C16.5,23 19.5,17 19.5,11 C19.5,6.5 18.5,2.5 16,1.5 C13.5,0.5 11,2.5 10,6 Z"
                fill="#c4849a" fillOpacity={p.op}
              />
              {/* Midrib vein — slightly curved */}
              <path d="M10,6 Q10.6,16 10,26.5" stroke="rgba(255,255,255,0.28)" strokeWidth="0.6" fill="none" />
            </svg>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 1 }}>

        {/* Top decoration */}
        <div className="flex justify-center gap-5 mb-6" style={{ opacity: 0.35 }}>
          <span style={{ color: '#c4849a', fontSize: 9 }}>✿</span>
          <span style={{ color: '#c4849a', fontSize: 13 }}>✿</span>
          <span style={{ color: '#c4849a', fontSize: 9 }}>✿</span>
        </div>

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-0.5 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, #e8b4c0, #c4849a)',
                animation: 'sakuraGlow 3.5s ease-in-out infinite',
              }}
            >
              <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-24 h-24 rounded-full object-cover" />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, #f5d0da, #e8b4c0)',
                animation: 'sakuraGlow 3.5s ease-in-out infinite',
              }}
            >
              <span className="text-3xl font-bold" style={{ color: '#8a4060' }}>
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#3d2030' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-px" style={{ background: '#c4849a' }} />
            <span style={{ color: '#c4849a', fontSize: 15, display: 'inline-block', animation: 'sakuraSep 4s ease-in-out infinite' }}>✿</span>
            <div className="w-8 h-px" style={{ background: '#c4849a' }} />
          </div>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#8a6070' }}>
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
                background: '#ffffff',
                border: '1px solid #e8b4c0',
                color: '#5a2840',
                boxShadow: '0 2px 12px rgba(196,132,154,0.12)',
              }}
            >
              {link.title}
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

        {!profile.logo_removed && (
          <div className="mt-10 flex justify-center">
            <Logo />
          </div>
        )}
      </div>
    </div>
  )
}
