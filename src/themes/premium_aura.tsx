'use client'

import { useEffect, useRef } from 'react'
import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

// ── Twinkling star field (canvas) ────────────────────────────────────────────
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fit = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    fit()
    window.addEventListener('resize', fit)

    type Star = {
      x: number; y: number; r: number
      a: number; ts: number; tp: number; bright: boolean
    }

    const make = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() < 0.08 ? Math.random() * 1.4 + 1.1 : Math.random() * 0.85 + 0.18,
      a: Math.random() * 0.52 + 0.14,
      ts: Math.random() * 0.016 + 0.004,
      tp: Math.random() * Math.PI * 2,
      bright: Math.random() < 0.08,
    })

    const stars: Star[] = Array.from({ length: 240 }, make)

    let raf: number
    let t = 0

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++

      for (const s of stars) {
        const tw = Math.sin(t * s.ts + s.tp)
        const alpha = Math.max(0.04, s.a * (0.76 + 0.24 * tw))
        const r = s.r * (0.92 + 0.08 * tw)

        if (s.bright) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4)
          g.addColorStop(0,   `rgba(210,190,255,${alpha})`)
          g.addColorStop(0.4, `rgba(180,155,255,${alpha * 0.38})`)
          g.addColorStop(1,   'transparent')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = s.bright
          ? `rgba(225,205,255,${alpha})`
          : `rgba(198,188,255,${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
        ctx.fill()

        // Slow drift upward
        s.y -= 0.020
        if (s.y < -5) {
          s.y = canvas.height + 5
          s.x = Math.random() * canvas.width
        }
      }

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', fit)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

// ── Theme ────────────────────────────────────────────────────────────────────
type Props = { profile: Profile; links: Link[] }

export default function PremiumAuraTheme({ profile, links }: Props) {
  const textLinks   = links.filter(l => l.link_type === 'text')
  const galleryPhotos = links.filter(l => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        /* overscroll color — matches the darkest visible zone */
        html, body { background-color: #010108 !important; margin: 0; padding: 0; }

        /* ── Keyframes ── */
        @keyframes orbitCW  {
          from { transform: translate(-50%,-50%) rotate(0deg);   }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes orbitCCW {
          from { transform: translate(-50%,-50%) rotate(0deg);    }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes ringCW  { from { filter: hue-rotate(0deg);   } to { filter: hue-rotate(360deg);  } }
        @keyframes ringCCW { from { filter: hue-rotate(360deg); } to { filter: hue-rotate(0deg);    } }

        @keyframes haloBreath {
          0%,100% { opacity: 0.44; transform: scale(1);    }
          50%      { opacity: 0.70; transform: scale(1.06); }
        }

        /* Aurora bands */
        @keyframes band1 {
          0%,100% { transform: translateX(-80%) skewY(-6deg); opacity: 0.14; }
          50%      { transform: translateX( 8%) skewY(-3deg); opacity: 0.22; }
        }
        @keyframes band2 {
          0%,100% { transform: translateX( 80%) skewY( 5deg); opacity: 0.11; }
          50%      { transform: translateX(-10%) skewY( 2deg); opacity: 0.19; }
        }
        @keyframes band3 {
          0%,100% { transform: translateY(-22%) skewX(-2deg); opacity: 0.09; }
          50%      { transform: translateY( 8%) skewX( 1deg); opacity: 0.16; }
        }

        /* Ambient orb pulses */
        @keyframes orbA {
          0%,100% { opacity: 0.20; transform: scale(1);    }
          50%      { opacity: 0.30; transform: scale(1.08); }
        }
        @keyframes orbB {
          0%,100% { opacity: 0.17; transform: scale(1);    }
          50%      { opacity: 0.26; transform: scale(1.07); }
        }
        @keyframes orbC {
          0%,100% { opacity: 0.10; }
          50%      { opacity: 0.17; }
        }

        /* Sparkle dots on avatar ring */
        @keyframes spkT {
          0%,100% { opacity:0; transform:translateX(-50%) scale(0.15) rotate(0deg);   }
          40%,60%  { opacity:1; transform:translateX(-50%) scale(1)    rotate(180deg); }
        }
        @keyframes spkB {
          0%,100% { opacity:0; transform:translateX(-50%) scale(0.15) rotate(30deg);  }
          35%,65%  { opacity:.88; transform:translateX(-50%) scale(.9)  rotate(210deg); }
        }
        @keyframes spkL {
          0%,100% { opacity:0; transform:translateY(-50%) scale(0.15) rotate(-20deg); }
          30%,70%  { opacity:1; transform:translateY(-50%) scale(1.1)  rotate(160deg); }
        }
        @keyframes spkR {
          0%,100% { opacity:0; transform:translateY(-50%) scale(0.15) rotate( 50deg); }
          45%,55%  { opacity:.92; transform:translateY(-50%) scale(.85) rotate(230deg); }
        }

        /* Name glow */
        @keyframes nameGlow {
          0%,100% {
            filter: drop-shadow(0 0 11px rgba(170,90,255,.34))
                    drop-shadow(0 0 24px rgba(90,160,255,.20));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255,80,170,.42))
                    drop-shadow(0 0 44px rgba(80,220,255,.28));
          }
        }

        /* Dividers */
        @keyframes divShift {
          from { filter: hue-rotate(  0deg); }
          to   { filter: hue-rotate(360deg); }
        }

        /* Link entrance */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0);    }
        }

        /* Profile block entrance */
        @keyframes profileIn {
          from { opacity:0; transform:translateY(30px) scale(.96); }
          to   { opacity:1; transform:translateY(0)    scale(1);   }
        }

        /* ── Link button ── */
        .aura-shimmer {
          position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          background: linear-gradient(108deg, transparent 18%, rgba(255,255,255,.11) 50%, transparent 82%);
          transform: translateX(-115%);
          will-change: transform;
        }
        .aura-lnk:hover .aura-shimmer {
          transform: translateX(115%);
          transition: transform .60s cubic-bezier(.4,0,.2,1);
        }
        .aura-lnk {
          transition: transform .18s ease, filter .22s ease;
          text-decoration: none;
        }
        .aura-lnk:hover  { transform: translateY(-2px); filter: brightness(1.12); }
        .aura-lnk:active { transform: scale(.982);      transition: transform .08s; }
      `}</style>

      {/* ── Star field ── */}
      <StarField />

      {/* ══════════════════════════════════════
          Fixed background layers  (z-index 0)
          All layers are fixed → perfectly cover
          viewport + the overscroll color (#010108)
          fills the rest seamlessly.
      ══════════════════════════════════════ */}

      {/* Main conic nebula — rotates CW */}
      <div aria-hidden style={{
        position:'fixed', top:'42%', left:'50%',
        width:'270vw', height:'270vw',
        borderRadius:'50%',
        background:'conic-gradient(from 0deg,#ff0077 0%,#9900ff 14%,#0044ff 28%,#00e5cc 42%,#00ff88 56%,#ffcc00 70%,#ff4400 84%,#ff0077 100%)',
        filter:'blur(120px)',
        animation:'orbitCW 46s linear infinite',
        opacity:0.09, pointerEvents:'none', zIndex:0, willChange:'transform',
      }} />

      {/* Inner counter disc — rotates CCW */}
      <div aria-hidden style={{
        position:'fixed', top:'50%', left:'50%',
        width:'175vw', height:'175vw',
        borderRadius:'50%',
        background:'conic-gradient(from 90deg,#cc00ff 0%,#0066ff 25%,#00ffcc 50%,#ff6600 75%,#cc00ff 100%)',
        filter:'blur(100px)',
        animation:'orbitCCW 32s linear infinite',
        opacity:0.07, pointerEvents:'none', zIndex:0,
      }} />

      {/* Aurora band — teal-green */}
      <div aria-hidden style={{
        position:'fixed', top:'26%', left:0, right:0, height:210,
        background:'linear-gradient(180deg,transparent 0%,rgba(0,225,185,.26) 42%,rgba(0,205,165,.33) 56%,rgba(0,225,185,.26) 70%,transparent 100%)',
        filter:'blur(24px)',
        animation:'band1 21s ease-in-out infinite',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* Aurora band — violet */}
      <div aria-hidden style={{
        position:'fixed', top:'48%', left:0, right:0, height:170,
        background:'linear-gradient(180deg,transparent 0%,rgba(165,0,255,.22) 42%,rgba(185,0,255,.29) 56%,rgba(165,0,255,.22) 70%,transparent 100%)',
        filter:'blur(20px)',
        animation:'band2 26s ease-in-out infinite',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* Aurora band — rose */}
      <div aria-hidden style={{
        position:'fixed', top:'70%', left:0, right:0, height:140,
        background:'linear-gradient(180deg,transparent 0%,rgba(255,0,105,.16) 42%,rgba(255,20,125,.23) 56%,rgba(255,0,105,.16) 70%,transparent 100%)',
        filter:'blur(18px)',
        animation:'band3 32s ease-in-out infinite',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* Ambient orb — violet (top-left) */}
      <div aria-hidden style={{
        position:'fixed', top:'4%', left:'7%',
        width:'44vw', height:'44vw', borderRadius:'50%',
        background:'radial-gradient(circle at 38% 38%,#aa00ff 0%,transparent 66%)',
        filter:'blur(62px)',
        animation:'orbA 23s ease-in-out infinite',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* Ambient orb — cyan (bottom-right) */}
      <div aria-hidden style={{
        position:'fixed', bottom:'7%', right:'4%',
        width:'38vw', height:'38vw', borderRadius:'50%',
        background:'radial-gradient(circle at 62% 62%,#00ccff 0%,transparent 66%)',
        filter:'blur(56px)',
        animation:'orbB 28s ease-in-out infinite reverse',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* Ambient orb — rose (center-bottom) */}
      <div aria-hidden style={{
        position:'fixed', bottom:'18%', left:'50%',
        transform:'translateX(-50%)',
        width:'62vw', height:'36vw', borderRadius:'50%',
        background:'radial-gradient(ellipse at center,#ff0088 0%,transparent 66%)',
        filter:'blur(72px)',
        animation:'orbC 19s ease-in-out infinite',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* ══════════════════════════════════════
          Content  (z-index 2 — above starfield)
      ══════════════════════════════════════ */}
      <div style={{
        minHeight:'100vh',
        display:'flex', flexDirection:'column', alignItems:'center',
        padding:'68px 16px 60px',
        position:'relative', zIndex:2, overflowX:'hidden',
      }}>
        <div style={{ width:'100%', maxWidth:420 }}>

          {/* Top prismatic divider */}
          <div style={{
            height:1,
            background:'linear-gradient(90deg,transparent,rgba(255,0,110,.72),rgba(130,0,255,.72),rgba(0,180,255,.72),rgba(0,255,180,.72),transparent)',
            marginBottom:64,
            animation:'divShift 9s linear infinite',
          }} />

          {/* Profile block */}
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center',
            marginBottom:50,
            animation:'profileIn 1s cubic-bezier(.22,1,.36,1) both',
          }}>

            {/* ── Avatar ── */}
            <div style={{ position:'relative', width:126, height:126, marginBottom:32 }}>

              {/* Outer diffuse halo */}
              <div style={{
                position:'absolute', inset:-22, borderRadius:'50%',
                background:'conic-gradient(from 0deg,#ff0077,#9900ff,#0055ff,#00ffcc,#ff0077)',
                filter:'blur(24px)',
                animation:'ringCW 7s linear infinite, haloBreath 3.5s ease-in-out infinite',
              }} />

              {/* Outer prism ring (fast) */}
              <div style={{
                position:'absolute', inset:0, borderRadius:'50%',
                background:'conic-gradient(from 0deg,#ff006e,#9900ff,#0055ff,#00e5cc,#aaff00,#ff9900,#ff006e)',
                animation:'ringCW 4.5s linear infinite',
              }} />

              {/* Gap 1 */}
              <div style={{ position:'absolute', inset:3, borderRadius:'50%', background:'#04020e' }} />

              {/* Inner counter ring (slower) */}
              <div style={{
                position:'absolute', inset:5, borderRadius:'50%',
                background:'conic-gradient(from 180deg,#00ffcc,#0055ff,#9900ff,#ff006e,#00ffcc)',
                animation:'ringCCW 8s linear infinite',
              }} />

              {/* Gap 2 */}
              <div style={{ position:'absolute', inset:8, borderRadius:'50%', background:'#060116' }} />

              {/* Avatar surface */}
              <div style={{
                position:'absolute', inset:11, borderRadius:'50%',
                overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center',
                background:'linear-gradient(135deg,#0e0824 0%,#081630 100%)',
              }}>
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name ?? ''}
                    style={{ width:'100%', height:'100%', objectFit:'cover' }}
                  />
                ) : (
                  <span style={{
                    fontSize:42, fontWeight:800, lineHeight:1,
                    background:'linear-gradient(135deg,#ffb0ea,#caaaff,#aadcff)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                )}
              </div>

              {/* Sparkle — top */}
              <div style={{
                position:'absolute', top:-5, left:'50%',
                width:7, height:7, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 8px 3px rgba(200,160,255,.95),0 0 18px 6px rgba(140,100,255,.55)',
                animation:'spkT 2.6s ease-in-out infinite',
              }} />
              {/* Sparkle — bottom */}
              <div style={{
                position:'absolute', bottom:-5, left:'50%',
                width:6, height:6, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 7px 2px rgba(160,200,255,.92),0 0 15px 5px rgba(100,140,255,.52)',
                animation:'spkB 3.2s ease-in-out infinite .65s',
              }} />
              {/* Sparkle — left */}
              <div style={{
                position:'absolute', left:-5, top:'50%',
                width:6, height:6, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 7px 2px rgba(255,160,224,.92),0 0 15px 5px rgba(255,100,185,.52)',
                animation:'spkL 2.9s ease-in-out infinite 1.0s',
              }} />
              {/* Sparkle — right */}
              <div style={{
                position:'absolute', right:-5, top:'50%',
                width:7, height:7, borderRadius:'50%', background:'#fff',
                boxShadow:'0 0 8px 3px rgba(160,232,255,.92),0 0 18px 6px rgba(80,200,255,.52)',
                animation:'spkR 3.5s ease-in-out infinite 1.5s',
              }} />
            </div>

            {/* Display name */}
            <h1 style={{
              fontSize:23, fontWeight:700, letterSpacing:'0.19em',
              background:'linear-gradient(135deg,#fff 0%,#e4ccff 28%,#cce4ff 62%,#fff 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              marginBottom:16, textAlign:'center',
              animation:'nameGlow 6s ease-in-out infinite',
            }}>
              {profile.display_name ?? 'No Name'}
            </h1>

            {/* Accent bar */}
            <div style={{
              width:36, height:1.5, borderRadius:2,
              background:'linear-gradient(90deg,#ff006e,#9900ff,#0088ff,#00ffcc)',
              marginBottom: profile.bio ? 18 : 0,
              animation:'divShift 7s linear infinite',
            }} />

            {profile.bio && (
              <p style={{
                fontSize:13, textAlign:'center', lineHeight:1.88,
                maxWidth:248, color:'rgba(200,180,255,.50)',
                letterSpacing:'0.03em', marginTop:9,
              }}>
                {profile.bio}
              </p>
            )}
          </div>

          {/* ── Links ── */}
          <MixedLinks
            links={textLinks}
            gap="gap-3"
            renderTextLink={(link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aura-lnk"
                style={{
                  display:'block', position:'relative',
                  borderRadius:16, padding:1,
                  background:'linear-gradient(135deg,rgba(255,0,110,.5),rgba(140,0,255,.5),rgba(0,140,255,.5),rgba(0,255,180,.5))',
                  animation:`fadeUp .65s cubic-bezier(.22,1,.36,1) ${0.05+index*0.09}s backwards`,
                }}
              >
                {/* Glass inner */}
                <div style={{
                  borderRadius:15, padding:'16px 28px',
                  background:'rgba(4,2,20,.88)',
                  backdropFilter:'blur(36px)', WebkitBackdropFilter:'blur(36px)',
                  textAlign:'center', position:'relative', overflow:'hidden',
                }}>
                  <div className="aura-shimmer" />
                  {/* Left prismatic bar */}
                  <span style={{
                    position:'absolute', left:0, top:0, bottom:0, width:2.5,
                    borderRadius:'16px 0 0 16px',
                    background:'linear-gradient(180deg,#ff006e,#9900ff,#0088ff)',
                    opacity:.65, animation:'divShift 9s linear infinite',
                  }} />
                  <span style={{
                    fontSize:14, fontWeight:600, letterSpacing:'0.10em',
                    color:'rgba(222,208,255,.94)', position:'relative',
                  }}>
                    {link.title}
                  </span>
                </div>
              </a>
            )}
          />

          <GallerySection photos={galleryPhotos} />

          {/* Bottom divider */}
          <div style={{
            height:1,
            background:'linear-gradient(90deg,transparent,rgba(140,0,255,.52),rgba(0,180,255,.52),transparent)',
            marginTop:60, marginBottom:28,
            animation:'divShift 13s linear infinite',
          }} />

          {!profile.logo_removed && (
            <div style={{ display:'flex', justifyContent:'center' }}>
              <Logo dark />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
