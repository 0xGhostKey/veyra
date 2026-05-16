import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = {
  profile: Profile
  links: Link[]
}

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

// Faint star dots for depth (darker on light bg)
const STARS = [
  { left: '5%',  top: '6%',  r: 1.1 },
  { left: '16%', top: '2%',  r: 0.8 },
  { left: '28%', top: '13%', r: 1.2 },
  { left: '47%', top: '5%',  r: 0.9 },
  { left: '61%', top: '10%', r: 1.0 },
  { left: '77%', top: '3%',  r: 0.7 },
  { left: '89%', top: '16%', r: 1.1 },
  { left: '36%', top: '21%', r: 0.8 },
  { left: '11%', top: '29%', r: 0.9 },
  { left: '70%', top: '26%', r: 1.0 },
  { left: '53%', top: '34%', r: 0.7 },
  { left: '22%', top: '43%', r: 0.6 },
]

const FLAKES = [
  { left: '4%',  size: 13, dur: 10,  delay: 0,   op: 0.55 },
  { left: '13%', size: 8,  dur: 14,  delay: 2,   op: 0.4  },
  { left: '22%', size: 16, dur: 8.5, delay: 4,   op: 0.65 },
  { left: '31%', size: 10, dur: 12,  delay: 1,   op: 0.5  },
  { left: '41%', size: 14, dur: 9,   delay: 6,   op: 0.6  },
  { left: '52%', size: 19, dur: 7.5, delay: 3,   op: 0.7  },
  { left: '62%', size: 9,  dur: 13,  delay: 0.5, op: 0.45 },
  { left: '71%', size: 15, dur: 10,  delay: 7,   op: 0.6  },
  { left: '80%', size: 11, dur: 11,  delay: 2.5, op: 0.5  },
  { left: '89%', size: 13, dur: 9,   delay: 5,   op: 0.55 },
  { left: '95%', size: 8,  dur: 15,  delay: 1.5, op: 0.4  },
  { left: '26%', size: 12, dur: 10,  delay: 8.5, op: 0.5  },
]

export default function SnowPowderTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#f0f5ff', overflowX: 'hidden' }}>
      <style>{`
        html, body { background-color: #f0f5ff !important; }
        @keyframes snowFall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 0; }
          7%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
        @keyframes frostGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(70,130,220,0.35), 0 0 28px rgba(70,130,220,0.15); }
          50%       { box-shadow: 0 0 20px rgba(70,130,220,0.55), 0 0 45px rgba(70,130,220,0.22); }
        }
        @keyframes snowSep {
          0%, 100% { opacity: 0.55; transform: rotate(0deg)  scale(1); }
          50%       { opacity: 0.85; transform: rotate(30deg) scale(1.25); }
        }
        @keyframes topFlakeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg);  opacity: 0.3; }
          50%       { transform: translateY(-5px) rotate(20deg); opacity: 0.5; }
        }
      `}</style>

      {/* Star layer */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: s.left, top: s.top,
            width: s.r * 2, height: s.r * 2, borderRadius: '50%',
            background: '#3060c0', opacity: 0.3,
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
            <Snowflake size={f.size} color="#5080d0" opacity={1} />
          </div>
        ))}
      </div>

      <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>

        {/* Top decorative snowflake */}
        <div className="flex justify-center mb-6" style={{ animation: 'topFlakeFloat 5s ease-in-out infinite' }}>
          <Snowflake size={52} color="#3060c0" opacity={0.3} />
        </div>

        <div className="flex items-center gap-3 justify-center mb-8" style={{ opacity: 0.3 }}>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #5080d0)' }} />
          <Snowflake size={10} color="#5080d0" opacity={1} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #5080d0)' }} />
        </div>

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-[2px] rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, #90b8f8, #3060c0)',
                animation: 'frostGlow 3.5s ease-in-out infinite',
              }}
            >
              <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-24 h-24 rounded-full object-cover" />
            </div>
          ) : (
            <div
              className="p-[2px] rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, #90b8f8, #3060c0)',
                animation: 'frostGlow 3.5s ease-in-out infinite',
              }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: '#e8f0ff' }}>
                <span className="text-3xl font-bold" style={{ color: '#3060c0' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#1a2a4a' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px" style={{ background: '#a0b8e8' }} />
            <span style={{ display: 'inline-block', animation: 'snowSep 4s ease-in-out infinite' }}>
              <Snowflake size={14} color="#5080d0" opacity={0.7} />
            </span>
            <div className="w-10 h-px" style={{ background: '#a0b8e8' }} />
          </div>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#607090' }}>
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
                border: '1px solid #c0d4f0',
                color: '#2a4a90',
                boxShadow: '0 2px 14px rgba(70,130,220,0.1)',
              }}
            >
              {link.title}
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

        <div className="flex items-center gap-3 justify-center mt-8" style={{ opacity: 0.2 }}>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #5080d0)' }} />
          <Snowflake size={12} color="#5080d0" opacity={1} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #5080d0)' }} />
        </div>

                  <div className="mt-6 flex justify-center">
            <Logo />
          </div>
      </div>
    </div>
  )
}
