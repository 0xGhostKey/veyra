'use client'

import { useEffect, useRef } from 'react'
import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

// ── Twinkling starfield — transparent canvas, body color bleeds through seamlessly ──
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')!
    const fit = () => { c.width = innerWidth; c.height = innerHeight }
    fit()
    addEventListener('resize', fit)

    type S = { x:number; y:number; r:number; a:number; ts:number; tp:number; glow:boolean }
    const stars: S[] = Array.from({ length: 210 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() < .09 ? Math.random() * 1.4 + 1.0 : Math.random() * .8 + .14,
      a: Math.random() * .50 + .12,
      ts: Math.random() * .016 + .004,
      tp: Math.random() * Math.PI * 2,
      glow: Math.random() < .09,
    }))

    let raf: number, t = 0
    const tick = () => {
      x.clearRect(0, 0, c.width, c.height)
      t++
      for (const s of stars) {
        const tw = Math.sin(t * s.ts + s.tp)
        const a  = Math.max(.04, s.a * (.76 + .24 * tw))
        const r  = s.r * (.93 + .07 * tw)
        if (s.glow) {
          const g = x.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4)
          g.addColorStop(0,   `rgba(215,195,255,${a})`)
          g.addColorStop(.45, `rgba(185,160,255,${a * .35})`)
          g.addColorStop(1,   'transparent')
          x.fillStyle = g
          x.beginPath(); x.arc(s.x, s.y, r * 4, 0, Math.PI * 2); x.fill()
        }
        x.fillStyle = `rgba(${s.glow ? '222,204,255' : '196,186,255'},${a})`
        x.beginPath(); x.arc(s.x, s.y, r, 0, Math.PI * 2); x.fill()
        s.y -= .019
        if (s.y < -5) { s.y = c.height + 5; s.x = Math.random() * c.width }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit) }
  }, [])

  // position:fixed + transparent background → overscroll shows body color seamlessly
  return <canvas ref={ref} style={{ position:'fixed', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />
}

// ── Theme ────────────────────────────────────────────────────────────────────
type Props = { profile: Profile; links: Link[] }

export default function PremiumAuraTheme({ profile, links }: Props) {
  const textLinks    = links.filter(l => l.link_type === 'text')
  const galleryPhotos = links.filter(l => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        /*
          Background strategy: solid #010108 everywhere — body, page, overscroll.
          NO fixed colored layers. Stars are drawn on a transparent canvas so the
          body color bleeds through to overscroll areas without any mismatch.
          All visual premium-ness radiates FROM the content elements themselves.
        */
        html, body { background-color: #010108 !important; margin:0; padding:0; }

        /* Ring animations */
        @keyframes rcw  { from{filter:hue-rotate(0deg)}   to{filter:hue-rotate(360deg)}  }
        @keyframes rccw { from{filter:hue-rotate(360deg)} to{filter:hue-rotate(0deg)}    }
        @keyframes halo {
          0%,100%{ opacity:.50; transform:scale(1);    }
          50%    { opacity:.80; transform:scale(1.07); }
        }

        /* Sparkle keyframes — cardinal (include translate for centering) */
        @keyframes spkT {
          0%,100%{ opacity:0; transform:translateX(-50%) scale(.1); }
          45%,55%{ opacity:1; transform:translateX(-50%) scale(1);  }
        }
        @keyframes spkB {
          0%,100%{ opacity:0;  transform:translateX(-50%) scale(.1);  }
          40%,60%{ opacity:.9; transform:translateX(-50%) scale(.92); }
        }
        @keyframes spkL {
          0%,100%{ opacity:0; transform:translateY(-50%) scale(.1); }
          42%,58%{ opacity:1; transform:translateY(-50%) scale(1);  }
        }
        @keyframes spkR {
          0%,100%{ opacity:0;   transform:translateY(-50%) scale(.1);   }
          38%,62%{ opacity:.95; transform:translateY(-50%) scale(1.05); }
        }
        /* Diagonal sparkles (no translate needed at these sizes) */
        @keyframes spkD {
          0%,100%{ opacity:0;   transform:scale(.1);  }
          50%    { opacity:.80; transform:scale(.86); }
        }

        /* Name glow pulse */
        @keyframes nglow {
          0%,100%{
            filter: drop-shadow(0 0 12px rgba(160,90,255,.38))
                    drop-shadow(0 0 28px rgba(80,160,255,.22));
          }
          50%{
            filter: drop-shadow(0 0 22px rgba(255,80,160,.46))
                    drop-shadow(0 0 52px rgba(80,220,255,.30));
          }
        }

        /* Generic hue-rotate (dividers, accent bars, link borders) */
        @keyframes hue { from{filter:hue-rotate(0deg)} to{filter:hue-rotate(360deg)} }

        /* Link entrance */
        @keyframes fadeUp {
          from{ opacity:0; transform:translateY(22px); }
          to  { opacity:1; transform:translateY(0);    }
        }

        /* Profile block entrance */
        @keyframes profIn {
          from{ opacity:0; transform:translateY(30px) scale(.97); }
          to  { opacity:1; transform:translateY(0)    scale(1);   }
        }

        /*
          Animated gradient border for link cards.
          Applied to an absolutely-positioned div BEHIND the glass content,
          so filter:hue-rotate does NOT affect the text color inside.
        */
        .a-border {
          position:absolute; inset:0; border-radius:16px;
          background: linear-gradient(135deg, #ff006e 0%, #9900ff 25%, #0088ff 50%, #00ffcc 75%, #ff9900 100%);
          animation: hue 10s linear infinite;
        }

        /* CSS-only shimmer on hover */
        .a-shimmer {
          position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          background: linear-gradient(108deg, transparent 18%, rgba(255,255,255,.11) 50%, transparent 82%);
          transform: translateX(-115%);
          will-change: transform;
        }
        .a-lnk:hover .a-shimmer {
          transform: translateX(115%);
          transition: transform .60s cubic-bezier(.4,0,.2,1);
        }
        .a-lnk {
          display:block; text-decoration:none;
          transition: transform .18s ease, filter .22s ease;
        }
        .a-lnk:hover  { transform:translateY(-2px); filter:brightness(1.13); }
        .a-lnk:active { transform:scale(.982); transition:transform .08s; }
      `}</style>

      {/* Starfield (transparent canvas — body bleeds through to overscroll) */}
      <StarField />

      {/* ── Content — z-index 1, above starfield ── */}
      <div style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '68px 16px 60px',
        position: 'relative', zIndex: 1, overflowX: 'hidden',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Top prismatic divider */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(255,0,110,.75),rgba(130,0,255,.75),rgba(0,180,255,.75),rgba(0,255,180,.75),transparent)',
            marginBottom: 64,
            animation: 'hue 9s linear infinite',
          }} />

          {/* Profile block with entrance animation */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            marginBottom: 52,
            animation: 'profIn 1s cubic-bezier(.22,1,.36,1) both',
          }}>

            {/* ═══════════════════════
                Avatar — 3 rings + halo + 8 sparkles
            ═══════════════════════ */}
            <div style={{ position: 'relative', width: 128, height: 128, marginBottom: 32 }}>

              {/* Outermost diffuse halo glow */}
              <div style={{
                position: 'absolute', inset: -24, borderRadius: '50%',
                background: 'conic-gradient(from 0deg,#ff0077,#9900ff,#0055ff,#00ffcc,#ff0077)',
                filter: 'blur(28px)',
                animation: 'rcw 7s linear infinite, halo 3.5s ease-in-out infinite',
              }} />

              {/* Outer prism ring — fast CW */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'conic-gradient(from 0deg,#ff006e,#9900ff,#0055ff,#00e5cc,#aaff00,#ff9900,#ff006e)',
                animation: 'rcw 4.5s linear infinite',
              }} />

              {/* Gap 1 */}
              <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#04020e' }} />

              {/* Inner ring — slower CCW */}
              <div style={{
                position: 'absolute', inset: 5, borderRadius: '50%',
                background: 'conic-gradient(from 180deg,#00ffcc,#0055ff,#9900ff,#ff006e,#00ffcc)',
                animation: 'rccw 8s linear infinite',
              }} />

              {/* Gap 2 */}
              <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: '#060116' }} />

              {/* Avatar surface */}
              <div style={{
                position: 'absolute', inset: 11, borderRadius: '50%',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg,#0e0824,#081630)',
              }}>
                {profile.avatar_url
                  ? <img src={profile.avatar_url} alt={profile.display_name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg,#ffb0ea,#caaaff,#aadcff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {(profile.display_name ?? 'U')[0].toUpperCase()}
                    </span>
                }
              </div>

              {/* ── 8 sparkle points ── */}

              {/* Top */}
              <div style={{ position:'absolute', top:-6, left:'50%', width:7, height:7, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 9px 3px rgba(200,160,255,.95),0 0 20px 7px rgba(140,100,255,.55)',
                animation:'spkT 2.6s ease-in-out infinite' }} />
              {/* Bottom */}
              <div style={{ position:'absolute', bottom:-6, left:'50%', width:6, height:6, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 8px 3px rgba(160,200,255,.92),0 0 18px 6px rgba(100,150,255,.52)',
                animation:'spkB 3.1s ease-in-out infinite .65s' }} />
              {/* Left */}
              <div style={{ position:'absolute', left:-6, top:'50%', width:6, height:6, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 8px 3px rgba(255,160,224,.92),0 0 18px 6px rgba(255,100,185,.52)',
                animation:'spkL 2.9s ease-in-out infinite 1.0s' }} />
              {/* Right */}
              <div style={{ position:'absolute', right:-6, top:'50%', width:7, height:7, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 9px 3px rgba(160,232,255,.92),0 0 20px 7px rgba(80,200,255,.52)',
                animation:'spkR 3.4s ease-in-out infinite 1.5s' }} />
              {/* Top-left */}
              <div style={{ position:'absolute', top:'14%', left:'14%', width:5, height:5, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 7px 2px rgba(255,155,195,.88),0 0 14px 4px rgba(255,95,155,.48)',
                animation:'spkD 3.8s ease-in-out infinite .3s' }} />
              {/* Top-right */}
              <div style={{ position:'absolute', top:'14%', right:'14%', width:5, height:5, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 7px 2px rgba(155,175,255,.88),0 0 14px 4px rgba(115,135,255,.48)',
                animation:'spkD 4.2s ease-in-out infinite .8s' }} />
              {/* Bottom-left */}
              <div style={{ position:'absolute', bottom:'14%', left:'14%', width:4, height:4, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 6px 2px rgba(195,255,215,.85),0 0 12px 4px rgba(95,255,175,.45)',
                animation:'spkD 3.6s ease-in-out infinite 1.2s' }} />
              {/* Bottom-right */}
              <div style={{ position:'absolute', bottom:'14%', right:'14%', width:5, height:5, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 7px 2px rgba(255,215,155,.88),0 0 14px 4px rgba(255,175,95,.48)',
                animation:'spkD 4.0s ease-in-out infinite 1.8s' }} />
            </div>

            {/* Display name */}
            <h1 style={{
              fontSize: 23, fontWeight: 700, letterSpacing: '0.19em',
              background: 'linear-gradient(135deg,#fff 0%,#e4ccff 28%,#cce4ff 62%,#fff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 16, textAlign: 'center',
              animation: 'nglow 6s ease-in-out infinite',
            }}>
              {profile.display_name ?? 'No Name'}
            </h1>

            {/* Thin prismatic accent line */}
            <div style={{
              width: 36, height: 1.5, borderRadius: 2,
              background: 'linear-gradient(90deg,#ff006e,#9900ff,#0088ff,#00ffcc)',
              marginBottom: profile.bio ? 18 : 0,
              animation: 'hue 7s linear infinite',
            }} />

            {profile.bio && (
              <p style={{
                fontSize: 13, textAlign: 'center', lineHeight: 1.88,
                maxWidth: 248, color: 'rgba(200,180,255,.50)',
                letterSpacing: '0.03em', marginTop: 9,
              }}>
                {profile.bio}
              </p>
            )}
          </div>

          {/* ═══════════════════════
              Links — staggered entrance + animated gradient borders
              Each card's border animates at a different phase offset,
              creating a cascading rainbow ripple across all cards.
          ═══════════════════════ */}
          <MixedLinks
            links={textLinks}
            gap="gap-3"
            renderTextLink={(link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="a-lnk"
                style={{
                  position: 'relative',
                  borderRadius: 16,
                  padding: 1,
                  animation: `fadeUp .65s cubic-bezier(.22,1,.36,1) ${.05 + index * .09}s backwards`,
                }}
              >
                {/* Animated gradient border — filter:hue-rotate only on this div,
                    does NOT bleed into the text content above it */}
                <div className="a-border" style={{ animationDelay: `-${index * 1.0}s` }} />

                {/* Glass content surface */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  borderRadius: 15, padding: '16px 28px',
                  background: 'rgba(4,2,20,.88)',
                  backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
                  textAlign: 'center', overflow: 'hidden',
                }}>
                  <div className="a-shimmer" />

                  {/* Left prismatic bar — same hue phase as its border */}
                  <span style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 2.5,
                    borderRadius: '15px 0 0 15px',
                    background: 'linear-gradient(180deg,#ff006e,#9900ff,#0088ff)',
                    opacity: .65,
                    animation: `hue 10s linear infinite`,
                    animationDelay: `-${index * 1.0}s`,
                  }} />

                  <span style={{
                    fontSize: 14, fontWeight: 600, letterSpacing: '.10em',
                    color: 'rgba(222,208,255,.94)', position: 'relative',
                  }}>
                    {link.title}
                  </span>
                </div>
              </a>
            )}
          />

          <GallerySection photos={galleryPhotos} />

          {/* Bottom prismatic divider */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(140,0,255,.55),rgba(0,180,255,.55),transparent)',
            marginTop: 60, marginBottom: 28,
            animation: 'hue 13s linear infinite',
          }} />

          {!profile.logo_removed && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Logo dark />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
