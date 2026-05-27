import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const SPARKS = [
  { left: '3%',  size: 5,  dur: 3.8, delay: 0,    color: '#ff3300' },
  { left: '7%',  size: 7,  dur: 4.5, delay: 0.5,  color: '#ff6600' },
  { left: '11%', size: 4,  dur: 3.5, delay: 1.3,  color: '#ff3300' },
  { left: '15%', size: 8,  dur: 5.0, delay: 0.2,  color: '#ff6600' },
  { left: '19%', size: 5,  dur: 4.6, delay: 2.1,  color: '#ff3300' },
  { left: '23%', size: 6,  dur: 3.9, delay: 0.8,  color: '#ff6600' },
  { left: '27%', size: 9,  dur: 4.8, delay: 3.4,  color: '#ff3300' },
  { left: '31%', size: 4,  dur: 3.3, delay: 1.6,  color: '#ff6600' },
  { left: '35%', size: 7,  dur: 5.2, delay: 0.4,  color: '#ff3300' },
  { left: '39%', size: 6,  dur: 4.1, delay: 4.0,  color: '#ff6600' },
  { left: '43%', size: 7,  dur: 3.7, delay: 2.5,  color: '#ff3300' },
  { left: '47%', size: 5,  dur: 4.9, delay: 0.9,  color: '#ff6600' },
  { left: '51%', size: 4,  dur: 3.4, delay: 3.8,  color: '#ff3300' },
  { left: '55%', size: 9,  dur: 5.1, delay: 1.1,  color: '#ff6600' },
  { left: '59%', size: 6,  dur: 4.3, delay: 0.3,  color: '#ff3300' },
  { left: '63%', size: 7,  dur: 3.6, delay: 5.2,  color: '#ff6600' },
  { left: '67%', size: 4,  dur: 4.7, delay: 2.0,  color: '#ff3300' },
  { left: '71%', size: 8,  dur: 5.4, delay: 0.6,  color: '#ff6600' },
  { left: '75%', size: 5,  dur: 3.8, delay: 3.1,  color: '#ff3300' },
  { left: '79%', size: 7,  dur: 4.5, delay: 1.4,  color: '#ff6600' },
  { left: '83%', size: 6,  dur: 3.2, delay: 4.7,  color: '#ff3300' },
  { left: '87%', size: 7,  dur: 5.0, delay: 0.7,  color: '#ff6600' },
  { left: '91%', size: 4,  dur: 4.2, delay: 2.8,  color: '#ff3300' },
  { left: '95%', size: 6,  dur: 3.6, delay: 6.0,  color: '#ff6600' },
  { left: '5%',  size: 6,  dur: 4.8, delay: 5.1,  color: '#ff6600' },
  { left: '13%', size: 4,  dur: 3.3, delay: 7.3,  color: '#ff3300' },
  { left: '29%', size: 7,  dur: 5.5, delay: 4.3,  color: '#ff6600' },
  { left: '41%', size: 5,  dur: 4.0, delay: 6.9,  color: '#ff3300' },
  { left: '53%', size: 9,  dur: 3.9, delay: 8.1,  color: '#ff6600' },
  { left: '65%', size: 6,  dur: 4.6, delay: 3.6,  color: '#ff3300' },
  { left: '77%', size: 7,  dur: 3.4, delay: 7.5,  color: '#ff6600' },
  { left: '93%', size: 4,  dur: 5.2, delay: 5.8,  color: '#ff3300' },
]

export default function EmberRedTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(function(){document.documentElement.style.backgroundColor='#050100';document.body.style.backgroundColor='#200900';})()` }} />
      <style>{`
        html { background-color: #050100 !important; }
        body { background-color: #200900 !important; }
        @keyframes sparkRise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          5%   { opacity: 1; }
          40%  { transform: translateY(-38vh) translateX(8px) scale(0.82); opacity: 0.85; }
          70%  { transform: translateY(-72vh) translateX(-6px) scale(0.55); opacity: 0.42; }
          100% { transform: translateY(-108vh) translateX(4px) scale(0.2); opacity: 0; }
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(255,68,0,0.55); }
          50%       { box-shadow: 0 0 48px rgba(255,119,0,0.95), 0 0 85px rgba(255,68,0,0.38); }
        }
        @keyframes heatPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.92; }
        }
      `}</style>

      {/* Bottom heat glow — radiates warmth from below */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,55,0,0.30) 0%, rgba(255,20,0,0.13) 45%, transparent 75%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'heatPulse 3.5s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '18%',
        background: 'radial-gradient(ellipse 65% 100% at 50% 100%, rgba(255,120,0,0.24) 0%, transparent 100%)',
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

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: 'radial-gradient(ellipse 150% 80% at 50% 100%, #200900 0%, #0f0300 45%, #050100 100%)', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,80,0,0.55), transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #ff7700, #cc2200)', animation: 'avatarGlow 2.5s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#1a0800', border: '1px solid rgba(255,68,0,0.4)', animation: 'avatarGlow 2.5s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold" style={{ color: '#ff7700' }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest mb-2" style={{ color: '#ffaa77' }}>
              {profile.display_name ?? 'No Name'}
            </h1>
            <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, #cc2200, #ff7700, #cc2200)' }} />
            {profile.bio && (
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: '#994422' }}>
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
                  background: 'linear-gradient(135deg, #1a0800, #260d00)',
                  border: '1px solid rgba(255,68,0,0.22)',
                  color: '#ff7700',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,119,0,0.16), transparent)' }}
                />
                <span className="relative">{link.title}</span>
              </a>
            )}
          />
          <GallerySection photos={galleryPhotos} />
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,80,0,0.55), transparent)' }} />
          <div className="flex justify-center">
            {!profile.logo_removed && <Logo dark />}
          </div>
        </div>
      </div>
    </>
  )
}
