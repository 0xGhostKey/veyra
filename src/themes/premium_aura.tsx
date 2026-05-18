'use client'

import { useEffect, useRef } from 'react'
import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

// ── Canvas starfield ─────────────────────────────────────────────────────────
// Transparent background → body color (#010108) bleeds through to overscroll
// seamlessly. No colored fixed layers = no overscroll mismatch.
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const x = c.getContext('2d')!
    const fit = () => { c.width = innerWidth; c.height = innerHeight }
    fit(); addEventListener('resize', fit)

    type S = { x:number; y:number; r:number; a:number; ts:number; tp:number; g:boolean }
    const stars: S[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: Math.random() < .09 ? Math.random() * 1.4 + 1.0 : Math.random() * .8 + .14,
      a: Math.random() * .50 + .12, ts: Math.random() * .016 + .004,
      tp: Math.random() * Math.PI * 2, g: Math.random() < .09,
    }))

    let raf: number, t = 0
    const tick = () => {
      x.clearRect(0, 0, c.width, c.height); t++
      for (const s of stars) {
        const tw = Math.sin(t * s.ts + s.tp)
        const a = Math.max(.04, s.a * (.76 + .24 * tw))
        const r = s.r * (.93 + .07 * tw)
        if (s.g) {
          const g = x.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4)
          g.addColorStop(0, `rgba(215,195,255,${a})`); g.addColorStop(.45, `rgba(185,160,255,${a*.34})`); g.addColorStop(1, 'transparent')
          x.fillStyle = g; x.beginPath(); x.arc(s.x, s.y, r * 4, 0, Math.PI * 2); x.fill()
        }
        x.fillStyle = `rgba(${s.g ? '222,204,255' : '196,186,255'},${a})`
        x.beginPath(); x.arc(s.x, s.y, r, 0, Math.PI * 2); x.fill()
        s.y -= .019; if (s.y < -5) { s.y = c.height + 5; s.x = Math.random() * c.width }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit) }
  }, [])
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
        html, body { background-color: #010108 !important; margin:0; padding:0; }

        /* ── Rings ── */
        @keyframes rcw  { from{filter:hue-rotate(0deg)}   to{filter:hue-rotate(360deg)}  }
        @keyframes rccw { from{filter:hue-rotate(360deg)} to{filter:hue-rotate(0deg)}    }
        @keyframes halo {
          0%,100%{ opacity:.52; transform:scale(1);    filter:hue-rotate(0deg); }
          50%    { opacity:.84; transform:scale(1.08); filter:hue-rotate(180deg); }
        }

        /* ── Sparkles ── */
        @keyframes spkT { 0%,100%{opacity:0;transform:translateX(-50%) scale(.1)} 45%,55%{opacity:1;transform:translateX(-50%) scale(1)} }
        @keyframes spkB { 0%,100%{opacity:0;transform:translateX(-50%) scale(.1)} 40%,60%{opacity:.9;transform:translateX(-50%) scale(.92)} }
        @keyframes spkL { 0%,100%{opacity:0;transform:translateY(-50%) scale(.1)} 42%,58%{opacity:1;transform:translateY(-50%) scale(1)} }
        @keyframes spkR { 0%,100%{opacity:0;transform:translateY(-50%) scale(.1)} 38%,62%{opacity:.95;transform:translateY(-50%) scale(1.05)} }
        @keyframes spkD { 0%,100%{opacity:0;transform:scale(.1)} 50%{opacity:.80;transform:scale(.86)} }

        /* ── Name glow ── */
        @keyframes nglow {
          0%,100%{ filter:drop-shadow(0 0 14px rgba(160,90,255,.40)) drop-shadow(0 0 32px rgba(80,160,255,.24)); }
          50%    { filter:drop-shadow(0 0 26px rgba(255,80,160,.50)) drop-shadow(0 0 60px rgba(80,220,255,.32)); }
        }

        /* ── Generic hue-rotate ── */
        @keyframes hue { from{filter:hue-rotate(0deg)} to{filter:hue-rotate(360deg)} }

        /* ── Ambient content orbs (position:absolute → scroll with page) ── */
        @keyframes orbV { 0%,100%{opacity:.13;transform:translateX(-50%) scale(1)} 50%{opacity:.20;transform:translateX(-50%) scale(1.06)} }
        @keyframes orbB { 0%,100%{opacity:.10;transform:translateX(-50%) scale(1)} 50%{opacity:.16;transform:translateX(-50%) scale(1.08)} }

        /* ── Card outer glow pulse ── */
        @keyframes cGlow { 0%,100%{opacity:.55} 50%{opacity:.85} }

        /* ── Card scan line ── */
        @keyframes scanY {
          0%   { top:-2px; opacity:0; }
          4%   { opacity:.70; }
          96%  { opacity:.70; }
          100% { top:calc(100% + 2px); opacity:0; }
        }
        .a-scan {
          position:absolute; left:0; right:0; height:1px; pointer-events:none; z-index:2;
          background:linear-gradient(90deg,transparent,rgba(200,180,255,.65),rgba(255,255,255,.95),rgba(200,180,255,.65),transparent);
          animation:scanY 6s ease-in-out infinite;
        }

        /* ── Link border (absolutely-positioned → filter:hue-rotate scoped here) ── */
        .a-border {
          position:absolute; inset:0; border-radius:16px;
          background:linear-gradient(135deg,#ff006e,#9900ff,#0088ff,#00ffcc,#ff9900,#ff006e);
          animation:hue 10s linear infinite;
        }

        /* ── Hover shimmer ── */
        .a-shimmer {
          position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          background:linear-gradient(108deg,transparent 18%,rgba(255,255,255,.13) 50%,transparent 82%);
          transform:translateX(-115%); will-change:transform;
        }
        .a-lnk:hover .a-shimmer { transform:translateX(115%); transition:transform .58s cubic-bezier(.4,0,.2,1); }
        .a-lnk { display:block; text-decoration:none; transition:transform .18s ease,filter .22s ease; }
        .a-lnk:hover  { transform:translateY(-2px); filter:brightness(1.14); }
        .a-lnk:active { transform:scale(.982); transition:transform .08s; }

        /* ── Fade-up entrance ── */
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes profIn  { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>

      {/* Starfield */}
      <StarField />

      {/* ════════════════════════════════════════════════════════
          Page root — position:relative so absolute globs are
          contained here, not fixed. Scroll with content →
          top/bottom of page stays dark → matches overscroll body.
      ════════════════════════════════════════════════════════ */}
      <div style={{ position:'relative', minHeight:'100vh', overflowX:'hidden', zIndex:1 }}>

        {/* Ambient orb — violet (near avatar, ~20% from top) */}
        <div aria-hidden style={{
          position:'absolute', top:'18%', left:'50%',
          width:'130vw', height:'130vw', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(140,0,255,.15) 0%,transparent 65%)',
          filter:'blur(50px)', pointerEvents:'none', zIndex:0,
          animation:'orbV 15s ease-in-out infinite',
        }} />

        {/* Ambient orb — indigo/blue (near links, ~60% from top) */}
        <div aria-hidden style={{
          position:'absolute', top:'58%', left:'50%',
          width:'110vw', height:'110vw', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,60,255,.10) 0%,transparent 65%)',
          filter:'blur(55px)', pointerEvents:'none', zIndex:0,
          animation:'orbB 20s ease-in-out infinite reverse',
        }} />

        {/* ── Main content ── */}
        <div style={{
          position:'relative', zIndex:1,
          display:'flex', flexDirection:'column', alignItems:'center',
          padding:'68px 16px 64px',
        }}>
          <div style={{ width:'100%', maxWidth:420 }}>

            {/* Top divider */}
            <div style={{
              height:1,
              background:'linear-gradient(90deg,transparent,rgba(255,0,110,.78),rgba(130,0,255,.78),rgba(0,180,255,.78),rgba(0,255,180,.78),transparent)',
              marginBottom:68, animation:'hue 9s linear infinite',
            }} />

            {/* ── Profile ── */}
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              marginBottom:52, animation:'profIn 1s cubic-bezier(.22,1,.36,1) both',
            }}>

              {/* ══════════════════
                  Avatar 140 × 140
                  3 rings + halo + 8 sparkles
              ══════════════════ */}
              <div style={{ position:'relative', width:140, height:140, marginBottom:36 }}>

                {/* Outermost diffuse halo — very large blur */}
                <div style={{
                  position:'absolute', inset:-28, borderRadius:'50%',
                  background:'conic-gradient(from 0deg,#ff0077,#9900ff,#0055ff,#00ffcc,#ff0077)',
                  filter:'blur(32px)',
                  animation:'halo 4s ease-in-out infinite',
                }} />

                {/* Ring 1 — outer, fast CW */}
                <div style={{
                  position:'absolute', inset:0, borderRadius:'50%',
                  background:'conic-gradient(from 0deg,#ff006e,#9900ff,#0055ff,#00e5cc,#aaff00,#ff9900,#ff006e)',
                  animation:'rcw 4.2s linear infinite',
                }} />
                {/* Gap 1 */}
                <div style={{ position:'absolute', inset:3, borderRadius:'50%', background:'#04020e' }} />

                {/* Ring 2 — middle, slow CCW */}
                <div style={{
                  position:'absolute', inset:5, borderRadius:'50%',
                  background:'conic-gradient(from 180deg,#00ffcc,#0055ff,#9900ff,#ff006e,#00ffcc)',
                  animation:'rccw 9s linear infinite',
                }} />
                {/* Gap 2 */}
                <div style={{ position:'absolute', inset:8, borderRadius:'50%', background:'#060116' }} />

                {/* Ring 3 — inner, medium CW (different phase) */}
                <div style={{
                  position:'absolute', inset:10, borderRadius:'50%',
                  background:'conic-gradient(from 60deg,#9900ff,#ff006e,#ff9900,#00e5cc,#0055ff,#9900ff)',
                  animation:'rcw 6.8s linear infinite',
                }} />
                {/* Gap 3 */}
                <div style={{ position:'absolute', inset:13, borderRadius:'50%', background:'#060218' }} />

                {/* Avatar surface */}
                <div style={{
                  position:'absolute', inset:16, borderRadius:'50%',
                  overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center',
                  background:'linear-gradient(135deg,#0e0826,#081836)',
                }}>
                  {profile.avatar_url
                    ? <img src={profile.avatar_url} alt={profile.display_name ?? ''} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    : <span style={{ fontSize:44, fontWeight:800, lineHeight:1, background:'linear-gradient(135deg,#ffb0ea,#caaaff,#aadcff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                        {(profile.display_name ?? 'U')[0].toUpperCase()}
                      </span>
                  }
                </div>

                {/* ── 8 sparkle nodes ── */}
                {/* Cardinal */}
                <div style={{ position:'absolute', top:-7, left:'50%', width:7, height:7, borderRadius:'50%', background:'#fff', boxShadow:'0 0 10px 4px rgba(200,160,255,.96),0 0 22px 8px rgba(140,100,255,.56)', animation:'spkT 2.6s ease-in-out infinite' }} />
                <div style={{ position:'absolute', bottom:-7, left:'50%', width:6, height:6, borderRadius:'50%', background:'#fff', boxShadow:'0 0 9px 3px rgba(160,200,255,.93),0 0 20px 6px rgba(100,150,255,.53)', animation:'spkB 3.1s ease-in-out infinite .65s' }} />
                <div style={{ position:'absolute', left:-7, top:'50%', width:6, height:6, borderRadius:'50%', background:'#fff', boxShadow:'0 0 9px 3px rgba(255,160,224,.93),0 0 20px 6px rgba(255,100,185,.53)', animation:'spkL 2.9s ease-in-out infinite 1.0s' }} />
                <div style={{ position:'absolute', right:-7, top:'50%', width:7, height:7, borderRadius:'50%', background:'#fff', boxShadow:'0 0 10px 4px rgba(160,232,255,.93),0 0 22px 8px rgba(80,200,255,.53)', animation:'spkR 3.4s ease-in-out infinite 1.5s' }} />
                {/* Diagonal */}
                <div style={{ position:'absolute', top:'13%', left:'13%', width:5, height:5, borderRadius:'50%', background:'#fff', boxShadow:'0 0 7px 2px rgba(255,155,195,.90),0 0 14px 5px rgba(255,95,155,.50)', animation:'spkD 3.8s ease-in-out infinite .3s' }} />
                <div style={{ position:'absolute', top:'13%', right:'13%', width:5, height:5, borderRadius:'50%', background:'#fff', boxShadow:'0 0 7px 2px rgba(155,175,255,.90),0 0 14px 5px rgba(115,135,255,.50)', animation:'spkD 4.2s ease-in-out infinite .8s' }} />
                <div style={{ position:'absolute', bottom:'13%', left:'13%', width:4, height:4, borderRadius:'50%', background:'#fff', boxShadow:'0 0 6px 2px rgba(195,255,215,.87),0 0 12px 4px rgba(95,255,175,.47)', animation:'spkD 3.6s ease-in-out infinite 1.2s' }} />
                <div style={{ position:'absolute', bottom:'13%', right:'13%', width:5, height:5, borderRadius:'50%', background:'#fff', boxShadow:'0 0 7px 2px rgba(255,215,155,.90),0 0 14px 5px rgba(255,175,95,.50)', animation:'spkD 4.0s ease-in-out infinite 1.8s' }} />
              </div>

              {/* Display name */}
              <h1 style={{
                fontSize:24, fontWeight:700, letterSpacing:'0.20em',
                background:'linear-gradient(135deg,#fff 0%,#e4ccff 28%,#cce4ff 62%,#fff 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                marginBottom:18, textAlign:'center',
                animation:'nglow 5.5s ease-in-out infinite',
              }}>
                {profile.display_name ?? 'No Name'}
              </h1>

              {/* Accent line */}
              <div style={{
                width:40, height:1.5, borderRadius:2,
                background:'linear-gradient(90deg,#ff006e,#9900ff,#0088ff,#00ffcc)',
                marginBottom: profile.bio ? 20 : 0,
                animation:'hue 7s linear infinite',
              }} />

              {profile.bio && (
                <p style={{
                  fontSize:13, textAlign:'center', lineHeight:1.90,
                  maxWidth:252, color:'rgba(200,180,255,.52)',
                  letterSpacing:'0.03em', marginTop:10,
                }}>
                  {profile.bio}
                </p>
              )}
            </div>

            {/* ══════════════════════════════
                Links — cascading rainbow + scan
            ══════════════════════════════ */}
            <MixedLinks
              links={textLinks}
              gap="gap-4"
              renderTextLink={(link, index) => (
                <div
                  key={link.id}
                  style={{
                    position:'relative',
                    animation:`fadeUp .65s cubic-bezier(.22,1,.36,1) ${.06 + index * .10}s backwards`,
                  }}
                >
                  {/* Outer glow — blurred, extends beyond card */}
                  <div style={{
                    position:'absolute', inset:-8, borderRadius:24,
                    background:'linear-gradient(135deg,rgba(255,0,110,.20),rgba(153,0,255,.20),rgba(0,136,255,.20),rgba(0,204,255,.20))',
                    filter:'blur(14px)',
                    animation:`hue 10s linear infinite, cGlow 3s ease-in-out infinite`,
                    animationDelay: `-${index * 1.0}s, -${index * 0.5}s`,
                    pointerEvents:'none',
                  }} />

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="a-lnk"
                    style={{ position:'relative', borderRadius:16, padding:1 }}
                  >
                    {/* Animated gradient border (phase offset per card) */}
                    <div className="a-border" style={{ animationDelay:`-${index * 1.0}s` }} />

                    {/* Glass inner */}
                    <div style={{
                      position:'relative', zIndex:1,
                      borderRadius:15, padding:'18px 32px',
                      background:'rgba(4,2,22,.90)',
                      backdropFilter:'blur(36px)', WebkitBackdropFilter:'blur(36px)',
                      textAlign:'center', overflow:'hidden',
                    }}>
                      {/* Hover shimmer */}
                      <div className="a-shimmer" />

                      {/* Periodic scan line — each card at different phase */}
                      <div className="a-scan" style={{ animationDelay:`-${index * 1.5}s` }} />

                      {/* Left prismatic accent bar */}
                      <span style={{
                        position:'absolute', left:0, top:0, bottom:0, width:3,
                        borderRadius:'15px 0 0 15px',
                        background:'linear-gradient(180deg,#ff006e,#9900ff,#0088ff,#00ffcc)',
                        opacity:.70,
                        animation:`hue 10s linear infinite`,
                        animationDelay:`-${index * 1.0}s`,
                      }} />

                      <span style={{
                        fontSize:14, fontWeight:600, letterSpacing:'.10em',
                        color:'rgba(224,210,255,.95)', position:'relative',
                      }}>
                        {link.title}
                      </span>
                    </div>
                  </a>
                </div>
              )}
            />

            <GallerySection photos={galleryPhotos} />

            {/* Bottom divider */}
            <div style={{
              height:1,
              background:'linear-gradient(90deg,transparent,rgba(140,0,255,.58),rgba(0,180,255,.58),transparent)',
              marginTop:64, marginBottom:28,
              animation:'hue 13s linear infinite',
            }} />

            {!profile.logo_removed && (
              <div style={{ display:'flex', justifyContent:'center' }}>
                <Logo dark />
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
