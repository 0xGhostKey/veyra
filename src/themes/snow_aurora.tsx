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

// Faint star dots for depth
const STARS = [
  { left: '6%',  top: '5%',  r: 1.0, color: '#90ffd8' },
  { left: '17%', top: '2%',  r: 0.7, color: '#c0a0ff' },
  { left: '29%', top: '12%', r: 1.2, color: '#90ffd8' },
  { left: '48%', top: '4%',  r: 0.9, color: '#c0a0ff' },
  { left: '63%', top: '9%',  r: 1.1, color: '#90ffd8' },
  { left: '78%', top: '3%',  r: 0.8, color: '#c0a0ff' },
  { left: '90%', top: '15%', r: 1.0, color: '#90ffd8' },
  { left: '38%', top: '20%', r: 0.7, color: '#c0a0ff' },
  { left: '12%', top: '28%', r: 0.9, color: '#90ffd8' },
  { left: '72%', top: '25%', r: 1.1, color: '#c0a0ff' },
  { left: '55%', top: '33%', r: 0.8, color: '#90ffd8' },
  { left: '24%', top: '42%', r: 0.6, color: '#c0a0ff' },
]

const FLAKES = [
  { left: '3%',  size: 12, dur: 10,  delay: 0,   op: 0.6  },
  { left: '11%', size: 8,  dur: 14,  delay: 2,   op: 0.45 },
  { left: '22%', size: 17, dur: 8,   delay: 4,   op: 0.7  },
  { left: '33%', size: 10, dur: 12,  delay: 1,   op: 0.55 },
  { left: '43%', size: 14, dur: 9,   delay: 6,   op: 0.65 },
  { left: '54%', size: 20, dur: 7,   delay: 3,   op: 0.75 },
  { left: '63%', size: 9,  dur: 13,  delay: 0.5, op: 0.5  },
  { left: '72%', size: 15, dur: 10,  delay: 7,   op: 0.65 },
  { left: '81%', size: 11, dur: 11,  delay: 2.5, op: 0.55 },
  { left: '89%', size: 13, dur: 8.5, delay: 5,   op: 0.6  },
  { left: '96%', size: 8,  dur: 15,  delay: 1.5, op: 0.45 },
  { left: '26%', size: 12, dur: 10,  delay: 8.5, op: 0.5  },
]

export default function SnowAuroraTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#08060f', overflowX: 'hidden' }}>
      <style>{`
        html, body { background-color: #08060f !important; }
        @keyframes snowFall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 0; }
          7%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
        @keyframes auroraGlow {
          0%, 100% { box-shadow: 0 0 14px rgba(80,255,180,0.45), 0 0 40px rgba(80,255,180,0.18), 0 0 80px rgba(160,80,255,0.1); }
          50%       { box-shadow: 0 0 24px rgba(80,255,180,0.65), 0 0 60px rgba(80,255,180,0.28), 0 0 110px rgba(160,80,255,0.18); }
        }
        @keyframes snowSep {
          0%, 100% { opacity: 0.7; transform: rotate(0deg)  scale(1); }
          50%       { opacity: 1;   transform: rotate(30deg) scale(1.25); }
        }
        @keyframes topFlakeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg);  opacity: 0.4; }
          50%       { transform: translateY(-6px) rotate(20deg); opacity: 0.65; }
        }
      `}</style>

      {/* Star layer */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: s.left, top: s.top,
            width: s.r * 2, height: s.r * 2, borderRadius: '50%',
            background: s.color, opacity: 0.4,
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
            <Snowflake size={f.size} color="#90ffd8" opacity={1} />
          </div>
        ))}
      </div>

      <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>

        {/* Top decorative snowflake */}
        <div className="flex justify-center mb-6" style={{ animation: 'topFlakeFloat 5s ease-in-out infinite' }}>
          <Snowflake size={52} color="#90ffd8" opacity={0.45} />
        </div>

        <div className="flex items-center gap-3 justify-center mb-8" style={{ opacity: 0.35 }}>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #80ffcc)' }} />
          <Snowflake size={10} color="#80ffcc" opacity={1} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #b070ff)' }} />
        </div>

        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div
              className="p-[2px] rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, #80ffcc 0%, #1a6040 40%, #b070ff 100%)',
                animation: 'auroraGlow 3.5s ease-in-out infinite',
              }}
            >
              <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-24 h-24 rounded-full object-cover" />
            </div>
          ) : (
            <div
              className="p-[2px] rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, #80ffcc 0%, #1a6040 40%, #b070ff 100%)',
                animation: 'auroraGlow 3.5s ease-in-out infinite',
              }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: '#040e0a' }}>
                <span className="text-3xl font-bold" style={{ color: '#80ffcc' }}>
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#c0fff0' }}>
            {profile.display_name ?? 'No Name'}
          </h1>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px" style={{ background: 'linear-gradient(to right, transparent, #80ffcc)' }} />
            <span style={{ display: 'inline-block', animation: 'snowSep 4s ease-in-out infinite' }}>
              <Snowflake size={14} color="#80ffcc" opacity={0.9} />
            </span>
            <div className="w-10 h-px" style={{ background: 'linear-gradient(to left, transparent, #b070ff)' }} />
          </div>
          {profile.bio && (
            <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#2a6050' }}>
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
                background: 'linear-gradient(135deg, rgba(80,255,180,0.08) 0%, rgba(100,40,200,0.12) 100%)',
                border: '1px solid rgba(80,255,180,0.2)',
                color: '#80ffcc',
                boxShadow: '0 2px 16px rgba(60,200,140,0.08)',
              }}
            >
              {link.title}
            </a>
          )}
        />
        <GallerySection photos={galleryPhotos} />

        <div className="flex items-center gap-3 justify-center mt-8" style={{ opacity: 0.2 }}>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #80ffcc)' }} />
          <Snowflake size={12} color="#b070ff" opacity={1} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #b070ff)' }} />
        </div>

                  <div className="mt-6 flex justify-center">
            <Logo dark />
          </div>
      </div>
    </div>
  )
}
