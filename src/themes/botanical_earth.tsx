import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

function Leaf({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  const w = Math.round(size * 0.58)
  const h = size
  return (
    <svg width={w} height={h} viewBox="0 0 16 28" style={{ display: 'block' }}>
      <path
        d="M8 1 C11 3 14 9 14 15 C14 21 12 25 8 27 C4 25 2 21 2 15 C2 9 5 3 8 1Z"
        fill={color}
        fillOpacity={opacity}
      />
      <line x1="8" y1="1" x2="8" y2="27" stroke={color} strokeOpacity={Math.min(opacity * 2.2, 1)} strokeWidth="0.9" />
      <line x1="8" y1="9"  x2="3"  y2="14" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="9"  x2="13" y2="14" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="16" x2="3"  y2="21" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
      <line x1="8" y1="16" x2="13" y2="21" stroke={color} strokeOpacity={Math.min(opacity * 1.5, 1)} strokeWidth="0.55" />
    </svg>
  )
}

function BranchLeaf({ color, opacity }: { color: string; opacity: number }) {
  return (
    <>
      <path
        d="M0,-6 C2.5,-4 3,0 3,3 C3,6 1.5,7 0,7 C-1.5,7 -3,6 -3,3 C-3,0 -2.5,-4 0,-6Z"
        fill={color}
        fillOpacity={opacity}
      />
      <line x1="0" y1="-6" x2="0" y2="7" stroke={color} strokeOpacity={Math.min(opacity * 1.8, 1)} strokeWidth="0.55" />
    </>
  )
}

const LEAF_COLORS = ['#c87040', '#e09060', '#c87040', '#d47848']

const LEAVES = [
  { left: '2%',  size: 16, dur: 9.0,  delay: 0,    opacity: 0.70, colorIdx: 0 },
  { left: '8%',  size: 14, dur: 7.5,  delay: 2.2,  opacity: 0.62, colorIdx: 1 },
  { left: '14%', size: 20, dur: 11.0, delay: 0.7,  opacity: 0.75, colorIdx: 2 },
  { left: '20%', size: 15, dur: 8.8,  delay: 4.1,  opacity: 0.58, colorIdx: 3 },
  { left: '27%', size: 17, dur: 10.5, delay: 1.4,  opacity: 0.68, colorIdx: 0 },
  { left: '33%', size: 13, dur: 9.2,  delay: 6.3,  opacity: 0.60, colorIdx: 1 },
  { left: '40%', size: 22, dur: 12.0, delay: 0.3,  opacity: 0.72, colorIdx: 2 },
  { left: '47%', size: 16, dur: 8.0,  delay: 3.8,  opacity: 0.65, colorIdx: 3 },
  { left: '54%', size: 12, dur: 11.5, delay: 5.5,  opacity: 0.55, colorIdx: 0 },
  { left: '61%', size: 19, dur: 9.8,  delay: 1.0,  opacity: 0.70, colorIdx: 1 },
  { left: '68%', size: 14, dur: 7.8,  delay: 7.2,  opacity: 0.62, colorIdx: 2 },
  { left: '75%', size: 17, dur: 10.2, delay: 2.6,  opacity: 0.68, colorIdx: 3 },
  { left: '82%', size: 13, dur: 9.5,  delay: 4.9,  opacity: 0.58, colorIdx: 0 },
  { left: '88%', size: 20, dur: 11.8, delay: 0.8,  opacity: 0.72, colorIdx: 1 },
  { left: '93%', size: 15, dur: 8.5,  delay: 6.1,  opacity: 0.60, colorIdx: 2 },
  { left: '97%', size: 16, dur: 10.0, delay: 3.3,  opacity: 0.66, colorIdx: 3 },
]

const C = '#c87040'

export default function BotanicalEarthTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(function(){var b='#120c05';document.documentElement.style.backgroundColor=b;document.body.style.backgroundColor=b;})()` }} />
      <style>{`
        html, body { background-color: #120c05 !important; }
        @keyframes leafFall {
          0%   { transform: translateY(-50px) translateX(0) rotate(-20deg); opacity: 0; }
          6%   { opacity: 1; }
          25%  { transform: translateY(22vh) translateX(28px) rotate(15deg); }
          50%  { transform: translateY(50vh) translateX(-18px) rotate(-8deg); }
          75%  { transform: translateY(78vh) translateX(24px) rotate(32deg); opacity: 0.60; }
          100% { transform: translateY(115vh) translateX(8px) rotate(55deg); opacity: 0; }
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(200,112,64,0.44); }
          50%       { box-shadow: 0 0 48px rgba(224,144,96,0.82), 0 0 75px rgba(200,112,64,0.28); }
        }
      `}</style>

      {/* Top atmospheric fade */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '22%',
        background: 'linear-gradient(to bottom, #120c05 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Bottom atmospheric fade */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '18%',
        background: 'linear-gradient(to top, #120c05 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Leaf particle overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {LEAVES.map((l, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-50px',
              left: l.left,
              filter: `drop-shadow(0 0 4px ${LEAF_COLORS[l.colorIdx]}55)`,
              animation: `leafFall ${l.dur}s ease-in ${l.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          >
            <Leaf size={l.size} color={LEAF_COLORS[l.colorIdx]} opacity={l.opacity} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: 'radial-gradient(ellipse 120% 70% at 50% 30%, #221408 0%, #1a1008 55%, #110a04 100%)', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>

          {/* Branch decoration — header */}
          <div className="flex justify-center mb-6">
            <svg width="320" height="72" viewBox="0 0 320 72">
              <path d="M8 36 C55 30 100 42 130 36 C155 31 165 41 190 36 C220 31 260 42 312 36"
                stroke={C} strokeWidth="1.2" strokeOpacity="0.44" fill="none"/>
              <g transform="translate(55,36)">
                <line x1="0" y1="0" x2="-5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(-8,-16) rotate(-27)"><BranchLeaf color={C} opacity={0.44} /></g>
                <line x1="0" y1="0" x2="5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(8,-16) rotate(27)"><BranchLeaf color={C} opacity={0.38} /></g>
              </g>
              <g transform="translate(105,36)">
                <line x1="0" y1="0" x2="-5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(-8,16) rotate(-153)"><BranchLeaf color={C} opacity={0.32} /></g>
                <line x1="0" y1="0" x2="5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(8,16) rotate(153)"><BranchLeaf color={C} opacity={0.28} /></g>
              </g>
              <g transform="translate(160,36)">
                <circle cx="0" cy="0" r="2.5" fill={C} fillOpacity="0.52" />
                <line x1="0" y1="0" x2="0" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.30" />
                <g transform="translate(0,-17) rotate(0)"><BranchLeaf color={C} opacity={0.40} /></g>
                <line x1="0" y1="0" x2="-6" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.24" />
                <g transform="translate(-10,-14) rotate(-37)"><BranchLeaf color={C} opacity={0.30} /></g>
                <line x1="0" y1="0" x2="6" y2="-8" stroke={C} strokeWidth="0.6" strokeOpacity="0.24" />
                <g transform="translate(10,-14) rotate(37)"><BranchLeaf color={C} opacity={0.30} /></g>
              </g>
              <g transform="translate(215,36)">
                <line x1="0" y1="0" x2="-5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(-8,16) rotate(-153)"><BranchLeaf color={C} opacity={0.28} /></g>
                <line x1="0" y1="0" x2="5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(8,16) rotate(153)"><BranchLeaf color={C} opacity={0.32} /></g>
              </g>
              <g transform="translate(265,36)">
                <line x1="0" y1="0" x2="-5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(-8,-16) rotate(-27)"><BranchLeaf color={C} opacity={0.38} /></g>
                <line x1="0" y1="0" x2="5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(8,-16) rotate(27)"><BranchLeaf color={C} opacity={0.44} /></g>
              </g>
            </svg>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #e09060, #803020)', animation: 'avatarGlow 2.8s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#231508', border: '1px solid rgba(200,112,64,0.38)', animation: 'avatarGlow 2.8s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#e09060' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#f0c090' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, #803020, #c87040, #803020)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#806040' }}>
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
                  background: 'linear-gradient(135deg, #231508, #2e1c0a)',
                  border: '1px solid rgba(200,112,64,0.22)',
                  color: '#e09060',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(224,144,96,0.13), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />

          {/* Branch decoration — footer (inverted) */}
          <div className="flex justify-center mt-10 mb-6">
            <svg width="320" height="72" viewBox="0 0 320 72">
              <path d="M8 36 C55 42 100 30 130 36 C155 41 165 31 190 36 C220 41 260 30 312 36"
                stroke={C} strokeWidth="1.2" strokeOpacity="0.44" fill="none"/>
              <g transform="translate(55,36)">
                <line x1="0" y1="0" x2="-5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(-8,16) rotate(-153)"><BranchLeaf color={C} opacity={0.44} /></g>
                <line x1="0" y1="0" x2="5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(8,16) rotate(153)"><BranchLeaf color={C} opacity={0.38} /></g>
              </g>
              <g transform="translate(105,36)">
                <line x1="0" y1="0" x2="-5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(-8,-16) rotate(-27)"><BranchLeaf color={C} opacity={0.32} /></g>
                <line x1="0" y1="0" x2="5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(8,-16) rotate(27)"><BranchLeaf color={C} opacity={0.28} /></g>
              </g>
              <g transform="translate(160,36)">
                <circle cx="0" cy="0" r="2.5" fill={C} fillOpacity="0.52" />
                <line x1="0" y1="0" x2="0" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.30" />
                <g transform="translate(0,17) rotate(180)"><BranchLeaf color={C} opacity={0.40} /></g>
                <line x1="0" y1="0" x2="-6" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.24" />
                <g transform="translate(-10,14) rotate(-143)"><BranchLeaf color={C} opacity={0.30} /></g>
                <line x1="0" y1="0" x2="6" y2="8" stroke={C} strokeWidth="0.6" strokeOpacity="0.24" />
                <g transform="translate(10,14) rotate(143)"><BranchLeaf color={C} opacity={0.30} /></g>
              </g>
              <g transform="translate(215,36)">
                <line x1="0" y1="0" x2="-5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(-8,-16) rotate(-27)"><BranchLeaf color={C} opacity={0.28} /></g>
                <line x1="0" y1="0" x2="5" y2="-10" stroke={C} strokeWidth="0.7" strokeOpacity="0.28" />
                <g transform="translate(8,-16) rotate(27)"><BranchLeaf color={C} opacity={0.32} /></g>
              </g>
              <g transform="translate(265,36)">
                <line x1="0" y1="0" x2="-5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(-8,16) rotate(-153)"><BranchLeaf color={C} opacity={0.38} /></g>
                <line x1="0" y1="0" x2="5" y2="10" stroke={C} strokeWidth="0.7" strokeOpacity="0.32" />
                <g transform="translate(8,16) rotate(153)"><BranchLeaf color={C} opacity={0.44} /></g>
              </g>
            </svg>
          </div>

          <div className="flex justify-center">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
