import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

const SPARKS = [
  { left: '3%',  size: 5, dur: 3.8, delay: 0,    color: '#ff3300' },
  { left: '7%',  size: 7, dur: 4.5, delay: 0.5,  color: '#ff6600' },
  { left: '11%', size: 4, dur: 3.5, delay: 1.3,  color: '#ff4400' },
  { left: '15%', size: 8, dur: 5.0, delay: 0.2,  color: '#ff8800' },
  { left: '19%', size: 5, dur: 4.6, delay: 2.1,  color: '#ff3300' },
  { left: '23%', size: 6, dur: 3.9, delay: 0.8,  color: '#ff6600' },
  { left: '27%', size: 9, dur: 4.8, delay: 3.4,  color: '#ff4400' },
  { left: '31%', size: 4, dur: 3.3, delay: 1.6,  color: '#ff8800' },
  { left: '35%', size: 7, dur: 5.2, delay: 0.4,  color: '#ff3300' },
  { left: '39%', size: 5, dur: 4.1, delay: 4.0,  color: '#ff6600' },
  { left: '43%', size: 8, dur: 3.7, delay: 2.5,  color: '#ff4400' },
  { left: '47%', size: 6, dur: 4.9, delay: 0.9,  color: '#ff8800' },
  { left: '51%', size: 4, dur: 3.4, delay: 3.8,  color: '#ff3300' },
  { left: '55%', size: 9, dur: 5.1, delay: 1.1,  color: '#ff6600' },
  { left: '59%', size: 5, dur: 4.3, delay: 0.3,  color: '#ff4400' },
  { left: '63%', size: 7, dur: 3.6, delay: 5.2,  color: '#ff8800' },
  { left: '67%', size: 4, dur: 4.7, delay: 2.0,  color: '#ff3300' },
  { left: '71%', size: 8, dur: 5.4, delay: 0.6,  color: '#ff6600' },
  { left: '75%', size: 6, dur: 3.8, delay: 3.1,  color: '#ff4400' },
  { left: '79%', size: 9, dur: 4.5, delay: 1.4,  color: '#ff8800' },
  { left: '83%', size: 5, dur: 3.2, delay: 4.7,  color: '#ff3300' },
  { left: '87%', size: 7, dur: 5.0, delay: 0.7,  color: '#ff6600' },
  { left: '91%', size: 4, dur: 4.2, delay: 2.8,  color: '#ff4400' },
  { left: '95%', size: 6, dur: 3.6, delay: 6.0,  color: '#ff8800' },
]

export default function EmberRedTheme({ profile, links }: Props) {
  const activeLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body { background-color: #0f0300 !important; }
        @keyframes sparkRise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          8%   { opacity: 0.95; }
          35%  { transform: translateY(-35vh) translateX(9px) scale(0.85); opacity: 0.75; }
          65%  { transform: translateY(-68vh) translateX(-7px) scale(0.6); opacity: 0.38; }
          100% { transform: translateY(-108vh) translateX(5px) scale(0.3); opacity: 0; }
        }
        @keyframes emberGlow {
          0%, 100% { box-shadow: 0 0 22px rgba(255,68,0,0.55); }
          50%       { box-shadow: 0 0 44px rgba(255,119,0,0.95), 0 0 75px rgba(255,68,0,0.4); }
        }
        @keyframes flameFlicker {
          0%, 100% { transform: scaleY(1)    scaleX(1);    opacity: 0.82; }
          20%      { transform: scaleY(1.07) scaleX(0.97); opacity: 0.92; }
          40%      { transform: scaleY(0.93) scaleX(1.04); opacity: 0.74; }
          60%      { transform: scaleY(1.11) scaleX(0.96); opacity: 0.95; }
          80%      { transform: scaleY(0.96) scaleX(1.02); opacity: 0.78; }
        }
        @keyframes flameFlicker2 {
          0%, 100% { transform: scaleY(0.94) scaleX(1);    opacity: 0.55; }
          30%      { transform: scaleY(1.10) scaleX(0.97); opacity: 0.70; }
          60%      { transform: scaleY(0.87) scaleX(1.05); opacity: 0.50; }
          80%      { transform: scaleY(1.07) scaleX(0.97); opacity: 0.73; }
        }
      `}</style>

      {/* Spark overlay */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {SPARKS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '145px',
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${s.color} 0%, ${s.color}aa 35%, transparent 70%)`,
              animation: `sparkRise ${s.dur}s ease-out ${s.delay}s infinite`,
              animationFillMode: 'backwards',
            }}
          />
        ))}
      </div>

      {/* Bottom fire */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '180px', pointerEvents: 'none', zIndex: 1 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(255,28,0,0.80) 0%, rgba(255,75,0,0.50) 40%, rgba(255,50,0,0.18) 70%, transparent 100%)',
          animation: 'flameFlicker 2.4s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55px',
          background: 'linear-gradient(0deg, rgba(255,170,0,0.55) 0%, rgba(255,80,0,0.25) 100%)',
        }} />
        <svg width="100%" height="120" viewBox="0 0 800 120" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, animation: 'flameFlicker 2.1s ease-in-out infinite' }}>
          <path
            d="M0 120 C25 82 42 58 62 73 C82 88 98 42 122 18 C140 -2 154 33 174 57 C194 81 213 44 238 63 C263 82 280 46 304 26 C324 8 342 41 363 62 C384 83 403 46 426 63 C449 80 466 44 490 26 C512 10 530 42 553 64 C576 86 595 48 619 64 C643 80 660 44 684 28 C706 14 724 48 748 68 C772 88 786 54 800 70 L800 120Z"
            fill="rgba(255,45,0,0.68)"
          />
        </svg>
        <svg width="100%" height="88" viewBox="0 0 800 88" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, animation: 'flameFlicker2 1.8s ease-in-out infinite' }}>
          <path
            d="M0 88 C22 62 38 44 56 57 C74 70 92 36 112 16 C128 0 144 28 162 50 C180 72 198 40 220 58 C242 76 260 42 282 24 C302 8 320 38 342 60 C364 82 382 44 406 62 C430 80 448 44 470 28 C492 14 512 42 534 62 C556 82 574 46 598 62 C622 78 640 42 664 26 C686 12 704 42 728 62 C752 82 768 50 790 66 L800 88Z"
            fill="rgba(255,100,0,0.46)"
          />
        </svg>
      </div>

      <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ background: '#0f0300', overflowX: 'hidden' }}>
        <div className="w-full max-w-md" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #ff4400, transparent)' }} />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4" style={{ width: 96, height: 96 }}>
              {profile.avatar_url ? (
                <div
                  className="absolute inset-0 p-px rounded-full"
                  style={{ background: 'linear-gradient(135deg, #ff7700, #cc2200)', animation: 'emberGlow 2.5s ease-in-out infinite' }}
                >
                  <img src={profile.avatar_url} alt={profile.display_name ?? 'avatar'} className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: '#1a0800', border: '1px solid rgba(255,68,0,0.4)', animation: 'emberGlow 2.5s ease-in-out infinite' }}
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
          <div className="h-px mt-10 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #ff4400, transparent)' }} />
          <div className="flex justify-center pb-8">
            <Logo dark />
          </div>
        </div>
      </div>
    </>
  )
}
