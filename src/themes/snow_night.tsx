import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

// Hexagonal snowflake — 6 arms with branches
function Snowflake({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  const arms = [0, 60, 120, 180, 240, 300]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {arms.map((deg) => {
        const a = (deg - 90) * Math.PI / 180
        const tx = 12 + 9 * Math.cos(a),  ty = 12 + 9 * Math.sin(a)
        const mx = 12 + 5 * Math.cos(a),  my = 12 + 5 * Math.sin(a)
        const b1 = (deg - 90 + 60) * Math.PI / 180
        const b2 = (deg - 90 - 60) * Math.PI / 180
        return (
          <g key={deg} stroke={color} strokeOpacity={opacity} strokeLinecap="round" fill="none">
            <line x1="12" y1="12" x2={tx} y2={ty} strokeWidth="1.3" />
            <line x1={mx} y1={my} x2={mx + 3.5 * Math.cos(b1)} y2={my + 3.5 * Math.sin(b1)} strokeWidth="0.85" />
            <line x1={mx} y1={my} x2={mx + 3.5 * Math.cos(b2)} y2={my + 3.5 * Math.sin(b2)} strokeWidth="0.85" />
          </g>
        )
      })}
      <circle cx="12" cy="12" r="1.6" fill={color} fillOpacity={opacity} />
    </svg>
  )
}

const FLAKES = [
  { left: '4%',  size: 14, dur: 9,   delay: 0,   op: 0.65 },
  { left: '12%', size: 9,  dur: 13,  delay: 2,   op: 0.5  },
  { left: '20%', size: 16, dur: 8,   delay: 4.5, op: 0.7  },
  { left: '30%', size: 11, dur: 11,  delay: 1,   op: 0.55 },
  { left: '40%', size: 13, dur: 10,  delay: 6,   op: 0.6  },
  { left: '52%', size: 20, dur: 7,   delay: 3,   op: 0.75 },
  { left: '62%', size: 10, dur: 12,  delay: 0.5, op: 0.5  },
  { left: '71%', size: 15, dur: 9.5, delay: 7.5, op: 0.65 },
  { left: '80%', size: 11, dur: 11,  delay: 2.5, op: 0.55 },
  { left: '88%', size: 13, dur: 8.5, delay: 5,   op: 0.6  },
  { left: '95%', size: 9,  dur: 14,  delay: 1.5, op: 0.45 },
  { left: '25%', size: 12, dur: 10,  delay: 8,   op: 0.55 },
]

// Faint star dots for depth
const STARS = [
  { left: '7%',  top: '8%',  r: 1.2 }, { left: '18%', top: '3%',  r: 0.8 },
  { left: '32%', top: '14%', r: 1.0 }, { left: '55%', top: '6%',  r: 1.4 },
  { left: '70%', top: '11%', r: 0.9 }, { left: '84%', top: '4%',  r: 1.1 },
  { left: '91%', top: '18%', r: 0.7 }, { left: '44%', top: '22%', r: 1.0 },
  { left: '13%', top: '30%', r: 0.8 }, { left: '76%', top: '28%', r: 1.2 },
  { left: '60%', top: '35%', r: 0.9 }, { left: '28%', top: '45%', r: 0.7 },
]

export default function SnowNightTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#020615', overflowX: 'hidden' }}>
      <style>{`
        html, body { background-color: #020615 !important; }
        @keyframes snowFall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 0; }
          7%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
        @keyframes crystalGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(168,212,255,0.5), 0 0 35px rgba(168,212,255,0.18), 0 0 70px rgba(100,160,255,0.08); }
          50%       { box-shadow: 0 0 22px rgba(168,212,255,0.7), 0 0 55px rgba(168,212,255,0.28), 0 0 90px rgba(100,160,255,0.14); }
        }
        @keyframes snowSep {
          0%, 100% { opacity: 0.7; transform: rotate(0deg)  scale(1); }
          50%       { opacity: 1;   transform: rotate(30deg) scale(1.25); }
        }
        @keyframes topFlakeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.35; }
          50%       { transform: translateY(-6px) rotate(15deg); opacity: 0.55; }
        }
      `}</style>

      {/* Star layer */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: s.left, top: s.top,
            width: s.r * 2, height: s.r * 2, borderRadius: '50%',
            background: '#c8e8ff', opacity: 0.35,
          }} />
        ))}
      </div>

      {/* Falling snowflakes */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {FLAKES.map((f, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-30px', left: f.left,
            animation: `snowFall ${f.dur}s linear ${f.delay}s infinite`,
            opacity: f.op,
          }}>
            <Snowflake size={f.size} color="#a8d4ff" opacity={1} />
          </div>
        ))}
      </div>

      <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>

        {/* Top decorative snowflake */}
        <div className="flex justify-center mb-6" style={{ animation: 'topFlakeFloat 5s ease-in-out infinite' }}>
          <Snowflake size={52} color="#a8d4ff" opacity={0.4} />
        </div>

        {/* Crystal divider */}
        <div className="flex items-center gap-3 justify-center mb-8" style={{ opacity: 0.3 }}>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #a8d4ff)' }} />
          <Snowflake size={10} color="#a8d4ff" opacity={1} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #a8d4ff)' }} />
        </div>

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-[2px] rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, #c8e8ff 0%, #2050a0 50%, #c8e8ff 100%)',
                animation: 'crystalGlow 3.5s ease-in-out infinite',
              }}
            >
              <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-24 h-24 rounded-full object-cover" />
            </div>
          ) : (
            <div
              className="p-[2px] rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, #c8e8ff 0%, #2050a0 50%, #c8e8ff 100%)',
                animation: 'crystalGlow 3.5s ease-in-out infinite',
              }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: '#030916' }}>
                <span className="text-3xl font-bold" style={{ color: '#a8d4ff' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#dce8ff' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px" style={{ background: 'linear-gradient(to right, transparent, #a8d4ff)' }} />
            <span style={{ display: 'inline-block', animation: 'snowSep 4s ease-in-out infinite' }}>
              <Snowflake size={14} color="#a8d4ff" opacity={0.9} />
            </span>
            <div className="w-10 h-px" style={{ background: 'linear-gradient(to left, transparent, #a8d4ff)' }} />
          </div>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#304870' }}>
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
                background: 'linear-gradient(180deg, rgba(168,212,255,0.09) 0%, rgba(0,18,55,0.55) 100%)',
                border: '1px solid rgba(168,212,255,0.22)',
                color: '#a8d4ff',
                boxShadow: '0 2px 16px rgba(100,160,255,0.08)',
              }}
            >
              {link.title}
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

        {/* Bottom decorative snowflake */}
        <div className="flex items-center gap-3 justify-center mt-8" style={{ opacity: 0.2 }}>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #a8d4ff)' }} />
          <Snowflake size={12} color="#a8d4ff" opacity={1} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #a8d4ff)' }} />
        </div>

        {!profile.logo_removed && (
          <div className="mt-6 flex justify-center">
            <Logo dark />
          </div>
        )}
      </div>
    </div>
  )
}
