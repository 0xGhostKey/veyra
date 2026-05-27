import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const SPARKS = [
  { left: '3%',  size: 5,  dur: 3.8, delay: 0,    color: '#b8b5b0' },
  { left: '7%',  size: 7,  dur: 4.5, delay: 0.5,  color: '#d4d0ca' },
  { left: '11%', size: 4,  dur: 3.5, delay: 1.3,  color: '#b8b5b0' },
  { left: '15%', size: 8,  dur: 5.0, delay: 0.2,  color: '#d4d0ca' },
  { left: '19%', size: 5,  dur: 4.6, delay: 2.1,  color: '#b8b5b0' },
  { left: '23%', size: 6,  dur: 3.9, delay: 0.8,  color: '#d4d0ca' },
  { left: '27%', size: 9,  dur: 4.8, delay: 3.4,  color: '#b8b5b0' },
  { left: '31%', size: 4,  dur: 3.3, delay: 1.6,  color: '#d4d0ca' },
  { left: '35%', size: 7,  dur: 5.2, delay: 0.4,  color: '#b8b5b0' },
  { left: '39%', size: 6,  dur: 4.1, delay: 4.0,  color: '#d4d0ca' },
  { left: '43%', size: 7,  dur: 3.7, delay: 2.5,  color: '#b8b5b0' },
  { left: '47%', size: 5,  dur: 4.9, delay: 0.9,  color: '#d4d0ca' },
  { left: '51%', size: 4,  dur: 3.4, delay: 3.8,  color: '#b8b5b0' },
  { left: '55%', size: 9,  dur: 5.1, delay: 1.1,  color: '#d4d0ca' },
  { left: '59%', size: 6,  dur: 4.3, delay: 0.3,  color: '#b8b5b0' },
  { left: '63%', size: 7,  dur: 3.6, delay: 5.2,  color: '#d4d0ca' },
  { left: '67%', size: 4,  dur: 4.7, delay: 2.0,  color: '#b8b5b0' },
  { left: '71%', size: 8,  dur: 5.4, delay: 0.6,  color: '#d4d0ca' },
  { left: '75%', size: 5,  dur: 3.8, delay: 3.1,  color: '#b8b5b0' },
  { left: '79%', size: 7,  dur: 4.5, delay: 1.4,  color: '#d4d0ca' },
  { left: '83%', size: 6,  dur: 3.2, delay: 4.7,  color: '#b8b5b0' },
  { left: '87%', size: 7,  dur: 5.0, delay: 0.7,  color: '#d4d0ca' },
  { left: '91%', size: 4,  dur: 4.2, delay: 2.8,  color: '#b8b5b0' },
  { left: '95%', size: 6,  dur: 3.6, delay: 6.0,  color: '#d4d0ca' },
  { left: '5%',  size: 6,  dur: 4.8, delay: 5.1,  color: '#d4d0ca' },
  { left: '13%', size: 4,  dur: 3.3, delay: 7.3,  color: '#b8b5b0' },
  { left: '29%', size: 7,  dur: 5.5, delay: 4.3,  color: '#d4d0ca' },
  { left: '41%', size: 5,  dur: 4.0, delay: 6.9,  color: '#b8b5b0' },
  { left: '53%', size: 9,  dur: 3.9, delay: 8.1,  color: '#d4d0ca' },
  { left: '65%', size: 6,  dur: 4.6, delay: 3.6,  color: '#b8b5b0' },
  { left: '77%', size: 7,  dur: 3.4, delay: 7.5,  color: '#d4d0ca' },
  { left: '93%', size: 4,  dur: 5.2, delay: 5.8,  color: '#b8b5b0' },
]

export default function EmberAshTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(function(){document.documentElement.style.backgroundColor='#0e0c0b';document.body.style.backgroundColor='#1e1a16';})()` }} />
      <style>{`
        html { background-color: #0e0c0b !important; }
        body { background-color: #1e1a16 !important; }
        @keyframes sparkRise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          5%   { opacity: 1; }
          40%  { transform: translateY(-38vh) translateX(8px) scale(0.82); opacity: 0.85; }
          70%  { transform: translateY(-72vh) translateX(-6px) scale(0.55); opacity: 0.42; }
          100% { transform: translateY(-108vh) translateX(4px) scale(0.2); opacity: 0; }
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(180,165,145,0.40); }
          50%       { box-shadow: 0 0 48px rgba(210,200,185,0.75), 0 0 85px rgba(180,165,145,0.28); }
        }
        @keyframes heatPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.92; }
        }
      `}</style>

      {/* Bottom heat glow — residual warmth */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(180,160,135,0.22) 0%, rgba(160,145,125,0.09) 45%, transparent 75%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'heatPulse 3.5s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '18%',
        background: 'radial-gradient(ellipse 65% 100% at 50% 100%, rgba(200,185,165,0.16) 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'heatPulse 2.2s ease-in-out infinite',
      }} />

      {/* Spark overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {SPARKS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}, 0 0 ${s.size * 4}px ${s.color}66`,
              animation: `sparkRise ${s.dur}s ease-out ${s.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: 'radial-gradient(ellipse 150% 80% at 50% 100%, #1e1a16 0%, #111010 45%, #0e0c0b 100%)', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,190,175,0.45), transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #d8d0c8, #706050)', animation: 'avatarGlow 2.5s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#1a1614', border: '1px solid rgba(180,165,145,0.38)', animation: 'avatarGlow 2.5s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#d8d0c8' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#e8e0d8' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, #706050, #d8d0c8, #706050)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#7a6858' }}>
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
                  background: 'linear-gradient(135deg, #191514, #201c18)',
                  border: '1px solid rgba(180,160,140,0.20)',
                  color: '#ccc0b4',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(200,185,168,0.13), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,190,175,0.45), transparent)' }} />
          <div className="flex justify-center">
            {!profile.logo_removed && <Logo dark />}
          </div>
        </div>
      </div>
    </>
  )
}
