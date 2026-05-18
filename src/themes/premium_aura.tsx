'use client'

import { useEffect, useRef } from 'react'
import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

// ── Starfield canvas ─────────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const x = c.getContext('2d')!
    const fit = () => { c.width = innerWidth; c.height = innerHeight }
    fit(); addEventListener('resize', fit)
    type S = { x:number;y:number;r:number;a:number;ts:number;tp:number;g:boolean }
    const stars: S[] = Array.from({ length: 260 }, () => ({
      x:Math.random()*innerWidth, y:Math.random()*innerHeight,
      r:Math.random()<.10?Math.random()*1.6+1.0:Math.random()*.9+.16,
      a:Math.random()*.60+.15, ts:Math.random()*.018+.005,
      tp:Math.random()*Math.PI*2, g:Math.random()<.12,
    }))
    let raf:number, t=0
    const tick = () => {
      x.clearRect(0,0,c.width,c.height); t++
      for (const s of stars) {
        const tw=Math.sin(t*s.ts+s.tp), a=Math.max(.06,s.a*(.76+.24*tw)), r=s.r*(.93+.07*tw)
        if (s.g) {
          const g=x.createRadialGradient(s.x,s.y,0,s.x,s.y,r*5)
          g.addColorStop(0,`rgba(215,175,255,${a})`); g.addColorStop(.45,`rgba(175,130,255,${a*.40})`); g.addColorStop(1,'transparent')
          x.fillStyle=g; x.beginPath(); x.arc(s.x,s.y,r*5,0,Math.PI*2); x.fill()
        }
        x.fillStyle=`rgba(${s.g?'222,200,255':'200,185,255'},${a})`
        x.beginPath(); x.arc(s.x,s.y,r,0,Math.PI*2); x.fill()
        s.y-=.018; if(s.y<-5){s.y=c.height+5;s.x=Math.random()*c.width}
      }
      raf=requestAnimationFrame(tick)
    }
    tick()
    return ()=>{cancelAnimationFrame(raf);removeEventListener('resize',fit)}
  },[])
  return <canvas ref={ref} style={{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>
}

// ── Conqueror's Haki — 16 lightning spokes, always-on glow + periodic surge ──
const HAKI = [
  { angle:   0, len: 52, w: 3.0, d: '0.00s', dur: '2.6s' },
  { angle:  22, len: 38, w: 1.8, d: '0.28s', dur: '3.0s' },
  { angle:  45, len: 58, w: 3.5, d: '0.54s', dur: '2.4s' },
  { angle:  67, len: 34, w: 1.8, d: '0.80s', dur: '3.2s' },
  { angle:  90, len: 54, w: 3.0, d: '1.08s', dur: '2.7s' },
  { angle: 112, len: 36, w: 1.8, d: '1.36s', dur: '3.1s' },
  { angle: 135, len: 60, w: 3.5, d: '0.18s', dur: '2.5s' },
  { angle: 157, len: 32, w: 1.8, d: '0.44s', dur: '3.3s' },
  { angle: 180, len: 56, w: 3.0, d: '0.72s', dur: '2.8s' },
  { angle: 202, len: 38, w: 1.8, d: '1.00s', dur: '3.0s' },
  { angle: 225, len: 52, w: 3.0, d: '1.28s', dur: '2.6s' },
  { angle: 247, len: 34, w: 1.8, d: '0.08s', dur: '3.2s' },
  { angle: 270, len: 58, w: 3.5, d: '0.36s', dur: '2.4s' },
  { angle: 292, len: 36, w: 1.8, d: '0.64s', dur: '3.1s' },
  { angle: 315, len: 50, w: 3.0, d: '0.92s', dur: '2.7s' },
  { angle: 337, len: 32, w: 1.8, d: '1.20s', dur: '3.4s' },
]

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

        /* Halo: big diffuse glow pulsing */
        @keyframes halo {
          0%,100%{ opacity:.65; transform:scale(1.00); filter:hue-rotate(0deg); }
          33%    { opacity:.90; transform:scale(1.15); filter:hue-rotate(120deg); }
          66%    { opacity:.75; transform:scale(1.08); filter:hue-rotate(240deg); }
        }

        /* ── Avatar float — slow dramatic drift ── */
        @keyframes float {
          0%,100%{ transform:translateY(0px)   rotate( 0.0deg); }
          25%    { transform:translateY(-14px)  rotate( 0.6deg); }
          50%    { transform:translateY(-22px)  rotate( 0.0deg); }
          75%    { transform:translateY(-14px)  rotate(-0.6deg); }
        }

        /* ── Conqueror's Haki ──
           Always visible at 25% opacity (base glow).
           Surges to 100% opacity twice per cycle (main burst + echo).
        */
        @keyframes hakiFlash {
          /* base glow */
          0%   { opacity:.25; transform:scaleY(.85); }
          /* MAIN BURST */
          12%  { opacity:1.00; transform:scaleY(1.18); }
          18%  { opacity:.80; transform:scaleY(1.10); }
          26%  { opacity:.30; transform:scaleY(.90); }
          /* settle back */
          38%  { opacity:.22; transform:scaleY(.84); }
          /* ECHO BURST */
          58%  { opacity:.75; transform:scaleY(1.10); }
          64%  { opacity:.55; transform:scaleY(1.05); }
          74%  { opacity:.22; transform:scaleY(.84); }
          100% { opacity:.25; transform:scaleY(.85); }
        }

        /* ── Sparkles ── */
        @keyframes spkT { 0%,100%{opacity:0;transform:translateX(-50%) scale(.1)} 40%,60%{opacity:1;transform:translateX(-50%) scale(1)} }
        @keyframes spkB { 0%,100%{opacity:0;transform:translateX(-50%) scale(.1)} 38%,62%{opacity:.9;transform:translateX(-50%) scale(.95)} }
        @keyframes spkL { 0%,100%{opacity:0;transform:translateY(-50%) scale(.1)} 42%,58%{opacity:1;transform:translateY(-50%) scale(1)} }
        @keyframes spkR { 0%,100%{opacity:0;transform:translateY(-50%) scale(.1)} 36%,64%{opacity:.95;transform:translateY(-50%) scale(1.05)} }
        @keyframes spkD { 0%,100%{opacity:0;transform:scale(.1)} 50%{opacity:.85;transform:scale(.90)} }

        /* ── Name glow pulse ── */
        @keyframes nglow {
          0%,100%{ filter:drop-shadow(0 0 16px rgba(180,80,255,.60)) drop-shadow(0 0 40px rgba(80,160,255,.35)); }
          50%    { filter:drop-shadow(0 0 32px rgba(255,60,180,.70)) drop-shadow(0 0 72px rgba(60,220,255,.45)); }
        }

        /* ── Hue rotation ── */
        @keyframes hue { from{filter:hue-rotate(0deg)} to{filter:hue-rotate(360deg)} }

        /* ── Aurora bands ── */
        @keyframes aurora1 {
          0%,100%{ transform:skewY(-8deg) translateX(-42%); opacity:.55; }
          50%    { transform:skewY(-2deg) translateX( 10%); opacity:.75; }
        }
        @keyframes aurora2 {
          0%,100%{ transform:skewY( 6deg) translateX( 42%); opacity:.45; }
          50%    { transform:skewY( 2deg) translateX(-10%); opacity:.65; }
        }
        @keyframes aurora3 {
          0%,100%{ transform:skewY(-4deg) translateX(-25%); opacity:.40; }
          50%    { transform:skewY( 3deg) translateX( 15%); opacity:.58; }
        }
        @keyframes aurora4 {
          0%,100%{ transform:skewY( 5deg) translateX( 28%); opacity:.35; }
          50%    { transform:skewY(-2deg) translateX(-12%); opacity:.50; }
        }

        /* ── Ambient orb pulses ── */
        @keyframes orbV { 0%,100%{opacity:.35;transform:translateX(-50%) scale(1)} 50%{opacity:.55;transform:translateX(-50%) scale(1.10)} }
        @keyframes orbB { 0%,100%{opacity:.25;transform:translateX(-50%) scale(1)} 50%{opacity:.40;transform:translateX(-50%) scale(1.12)} }
        @keyframes orbR { 0%,100%{opacity:.20;transform:translateX(-50%) scale(1)} 50%{opacity:.35;transform:translateX(-50%) scale(1.08)} }

        /* ── Card + entrance ── */
        @keyframes cGlow { 0%,100%{opacity:.55} 50%{opacity:.90} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes profIn { from{opacity:0;transform:translateY(40px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }

        /* ── Link animated border ── */
        .a-border {
          position:absolute; inset:0; border-radius:16px;
          background:linear-gradient(135deg,#ff006e,#9900ff,#0088ff,#00ffcc,#ff9900,#ff006e);
          animation:hue 8s linear infinite;
        }
        .a-shimmer {
          position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          background:linear-gradient(108deg,transparent 18%,rgba(255,255,255,.18) 50%,transparent 82%);
          transform:translateX(-115%); will-change:transform;
        }
        .a-lnk:hover .a-shimmer { transform:translateX(115%); transition:transform .55s cubic-bezier(.4,0,.2,1); }
        .a-lnk { display:block; text-decoration:none; transition:transform .18s ease,filter .22s ease; }
        .a-lnk:hover  { transform:translateY(-2px); filter:brightness(1.18); }
        .a-lnk:active { transform:scale(.982); transition:transform .08s; }
      `}</style>

      <StarField />

      {/*
        Root: position:relative → all absolute children scroll with page.
        Body #010108 = overscroll = no mismatch.
      */}
      <div style={{ position:'relative', minHeight:'100vh', overflowX:'hidden', zIndex:1 }}>

        {/* ── Aurora bands — high opacity so they're clearly visible ── */}
        {/* Teal/cyan — upper sweep */}
        <div aria-hidden style={{
          position:'absolute', top:'18%', left:'-40%', right:'-40%', height:130,
          background:'linear-gradient(180deg,transparent 0%,rgba(0,255,200,.55) 40%,rgba(0,220,180,.65) 52%,rgba(0,255,200,.55) 65%,transparent 100%)',
          filter:'blur(28px)', animation:'aurora1 24s ease-in-out infinite', pointerEvents:'none', zIndex:0,
        }} />
        {/* Violet — mid sweep */}
        <div aria-hidden style={{
          position:'absolute', top:'40%', left:'-40%', right:'-40%', height:110,
          background:'linear-gradient(180deg,transparent 0%,rgba(170,0,255,.50) 40%,rgba(190,0,255,.62) 52%,rgba(170,0,255,.50) 65%,transparent 100%)',
          filter:'blur(24px)', animation:'aurora2 30s ease-in-out infinite', pointerEvents:'none', zIndex:0,
        }} />
        {/* Rose/pink — lower sweep */}
        <div aria-hidden style={{
          position:'absolute', top:'62%', left:'-40%', right:'-40%', height:100,
          background:'linear-gradient(180deg,transparent 0%,rgba(255,0,130,.42) 40%,rgba(255,30,150,.52) 52%,rgba(255,0,130,.42) 65%,transparent 100%)',
          filter:'blur(22px)', animation:'aurora3 34s ease-in-out infinite', pointerEvents:'none', zIndex:0,
        }} />
        {/* Gold — accenting sweep */}
        <div aria-hidden style={{
          position:'absolute', top:'30%', left:'-40%', right:'-40%', height:80,
          background:'linear-gradient(180deg,transparent 0%,rgba(255,190,0,.35) 40%,rgba(255,160,0,.44) 52%,rgba(255,190,0,.35) 65%,transparent 100%)',
          filter:'blur(20px)', animation:'aurora4 38s ease-in-out infinite', pointerEvents:'none', zIndex:0,
        }} />

        {/* ── Ambient orbs ── */}
        <div aria-hidden style={{
          position:'absolute', top:'8%', left:'50%', width:'130vw', height:'130vw', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(140,0,255,.30) 0%,rgba(100,0,200,.12) 40%,transparent 65%)',
          filter:'blur(60px)', animation:'orbV 16s ease-in-out infinite', pointerEvents:'none', zIndex:0,
        }} />
        <div aria-hidden style={{
          position:'absolute', top:'52%', left:'50%', width:'110vw', height:'110vw', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,80,255,.22) 0%,rgba(0,50,180,.10) 40%,transparent 65%)',
          filter:'blur(64px)', animation:'orbB 22s ease-in-out infinite reverse', pointerEvents:'none', zIndex:0,
        }} />
        <div aria-hidden style={{
          position:'absolute', top:'75%', left:'50%', width:'90vw', height:'90vw', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(255,0,100,.18) 0%,transparent 60%)',
          filter:'blur(50px)', animation:'orbR 28s ease-in-out infinite', pointerEvents:'none', zIndex:0,
        }} />

        {/* ── Main content ── */}
        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'68px 16px 64px' }}>
          <div style={{ width:'100%', maxWidth:420 }}>

            {/* Top prismatic line */}
            <div style={{
              height:1.5, borderRadius:1,
              background:'linear-gradient(90deg,transparent,rgba(255,0,110,.90),rgba(140,0,255,.90),rgba(0,160,255,.90),rgba(0,255,180,.90),transparent)',
              marginBottom:68, animation:'hue 8s linear infinite',
            }} />

            {/* ── Profile section ── */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom:52, animation:'profIn 1.1s cubic-bezier(.22,1,.36,1) both' }}>

              {/* Float wrapper */}
              <div style={{ marginBottom:44, animation:'float 5s ease-in-out infinite' }}>
                <div style={{ position:'relative', width:148, height:148 }}>

                  {/* ── Conqueror's Haki — 16 lightning spokes ──
                      Always-on at ~25% opacity, surges to 100% on burst.
                  ── */}
                  {HAKI.map((h, i) => (
                    <div key={i} style={{ position:'absolute', inset:0, transform:`rotate(${h.angle}deg)`, pointerEvents:'none' }}>
                      <div style={{
                        position:'absolute',
                        top: -h.len,
                        left: `calc(50% - ${h.w / 2}px)`,
                        width: h.w,
                        height: h.len,
                        transformOrigin: '50% 100%',
                        background: `linear-gradient(180deg,
                          rgba(200,0,255,0) 0%,
                          rgba(210,0,255,.85) 28%,
                          rgba(255,255,255,1.00) 50%,
                          rgba(210,0,255,.85) 72%,
                          rgba(200,0,255,0) 100%)`,
                        boxShadow: `
                          0 0 ${Math.round(h.w * 4)}px ${Math.round(h.w * 1.5)}px rgba(200,0,255,.75),
                          0 0 ${Math.round(h.w * 2)}px 1px rgba(255,255,255,.90)
                        `,
                        animation: `hakiFlash ${h.dur} ease-in-out infinite ${h.d}`,
                      }} />
                    </div>
                  ))}

                  {/* ── Rings ── */}

                  {/* Diffuse outer halo */}
                  <div style={{
                    position:'absolute', inset:-36, borderRadius:'50%',
                    background:'conic-gradient(from 0deg,#ff0077,#aa00ff,#0055ff,#00ffcc,#ff0077)',
                    filter:'blur(38px)', animation:'halo 3.8s ease-in-out infinite',
                  }} />

                  {/* Ring 1 — outermost CW fast */}
                  <div style={{ position:'absolute', inset:0, borderRadius:'50%',
                    background:'conic-gradient(from 0deg,#ff006e,#9900ff,#0055ff,#00e5cc,#aaff00,#ff9900,#ff006e)',
                    animation:'rcw 3.8s linear infinite' }} />
                  <div style={{ position:'absolute', inset:3, borderRadius:'50%', background:'#04020e' }} />

                  {/* Ring 2 — middle CCW slow */}
                  <div style={{ position:'absolute', inset:5, borderRadius:'50%',
                    background:'conic-gradient(from 180deg,#00ffcc,#0055ff,#9900ff,#ff006e,#00ffcc)',
                    animation:'rccw 8.5s linear infinite' }} />
                  <div style={{ position:'absolute', inset:8, borderRadius:'50%', background:'#060116' }} />

                  {/* Ring 3 — inner CW medium */}
                  <div style={{ position:'absolute', inset:10, borderRadius:'50%',
                    background:'conic-gradient(from 60deg,#9900ff,#ff006e,#ff9900,#00e5cc,#0055ff,#9900ff)',
                    animation:'rcw 6.2s linear infinite' }} />
                  <div style={{ position:'absolute', inset:13, borderRadius:'50%', background:'#060218' }} />

                  {/* Avatar surface */}
                  <div style={{
                    position:'absolute', inset:16, borderRadius:'50%',
                    overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center',
                    background:'linear-gradient(135deg,#0e0826,#081836)',
                  }}>
                    {profile.avatar_url
                      ? <img src={profile.avatar_url} alt={profile.display_name ?? ''} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      : <span style={{ fontSize:42, fontWeight:800, lineHeight:1, background:'linear-gradient(135deg,#ffb0ea,#caaaff,#aadcff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                          {(profile.display_name ?? 'U')[0].toUpperCase()}
                        </span>
                    }
                  </div>

                  {/* ── 8 sparkle nodes ── */}
                  <div style={{ position:'absolute', top:-8, left:'50%', width:8, height:8, borderRadius:'50%', background:'#fff', boxShadow:'0 0 12px 5px rgba(200,140,255,.98),0 0 26px 10px rgba(140,80,255,.60)', animation:'spkT 2.4s ease-in-out infinite' }} />
                  <div style={{ position:'absolute', bottom:-8, left:'50%', width:7, height:7, borderRadius:'50%', background:'#fff', boxShadow:'0 0 11px 4px rgba(140,200,255,.95),0 0 24px 8px rgba(80,150,255,.58)', animation:'spkB 3.0s ease-in-out infinite .60s' }} />
                  <div style={{ position:'absolute', left:-8, top:'50%', width:7, height:7, borderRadius:'50%', background:'#fff', boxShadow:'0 0 11px 4px rgba(255,140,220,.95),0 0 24px 8px rgba(255,80,185,.58)', animation:'spkL 2.8s ease-in-out infinite 1.0s' }} />
                  <div style={{ position:'absolute', right:-8, top:'50%', width:8, height:8, borderRadius:'50%', background:'#fff', boxShadow:'0 0 12px 5px rgba(140,230,255,.95),0 0 26px 10px rgba(60,200,255,.58)', animation:'spkR 3.3s ease-in-out infinite 1.5s' }} />
                  <div style={{ position:'absolute', top:'12%', left:'12%', width:6, height:6, borderRadius:'50%', background:'#fff', boxShadow:'0 0 8px 3px rgba(255,140,195,.92),0 0 16px 6px rgba(255,80,155,.55)', animation:'spkD 3.7s ease-in-out infinite .25s' }} />
                  <div style={{ position:'absolute', top:'12%', right:'12%', width:6, height:6, borderRadius:'50%', background:'#fff', boxShadow:'0 0 8px 3px rgba(140,165,255,.92),0 0 16px 6px rgba(100,125,255,.55)', animation:'spkD 4.1s ease-in-out infinite .78s' }} />
                  <div style={{ position:'absolute', bottom:'12%', left:'12%', width:5, height:5, borderRadius:'50%', background:'#fff', boxShadow:'0 0 7px 2px rgba(180,255,210,.90),0 0 14px 5px rgba(80,255,170,.52)', animation:'spkD 3.5s ease-in-out infinite 1.2s' }} />
                  <div style={{ position:'absolute', bottom:'12%', right:'12%', width:6, height:6, borderRadius:'50%', background:'#fff', boxShadow:'0 0 8px 3px rgba(255,210,140,.92),0 0 16px 6px rgba(255,170,80,.55)', animation:'spkD 3.9s ease-in-out infinite 1.8s' }} />
                </div>
              </div>{/* /float */}

              {/* Display name */}
              <h1 style={{
                fontSize:26, fontWeight:700, letterSpacing:'0.22em',
                background:'linear-gradient(135deg,#fff 0%,#e0c8ff 25%,#c8e0ff 55%,#fff 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                marginBottom:20, textAlign:'center',
                animation:'nglow 5s ease-in-out infinite',
              }}>
                {profile.display_name ?? 'No Name'}
              </h1>

              {/* Accent line */}
              <div style={{
                width:48, height:2, borderRadius:2,
                background:'linear-gradient(90deg,#ff006e,#9900ff,#0088ff,#00ffcc)',
                marginBottom: profile.bio ? 20 : 0,
                animation:'hue 6s linear infinite',
                boxShadow:'0 0 12px 4px rgba(140,0,255,.50)',
              }} />

              {profile.bio && (
                <p style={{ fontSize:13, textAlign:'center', lineHeight:1.95, maxWidth:260, color:'rgba(210,190,255,.55)', letterSpacing:'0.04em', marginTop:12 }}>
                  {profile.bio}
                </p>
              )}
            </div>{/* /profile */}

            {/* ── Links ── */}
            <MixedLinks
              links={textLinks}
              gap="gap-4"
              renderTextLink={(link, index) => (
                <div key={link.id} style={{ position:'relative', animation:`fadeUp .70s cubic-bezier(.22,1,.36,1) ${.08+index*.12}s backwards` }}>
                  {/* Outer blurred glow */}
                  <div style={{
                    position:'absolute', inset:-10, borderRadius:26, pointerEvents:'none',
                    background:'linear-gradient(135deg,rgba(255,0,110,.28),rgba(160,0,255,.28),rgba(0,140,255,.28),rgba(0,210,255,.28))',
                    filter:'blur(16px)',
                    animation:`hue 8s linear ${-index*1.1}s infinite, cGlow 2.8s ease-in-out ${-index*0.6}s infinite`,
                  }} />
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="a-lnk"
                    style={{ position:'relative', borderRadius:16, padding:1 }}>
                    {/* Animated gradient border */}
                    <div className="a-border" style={{ animationDelay:`-${index*1.1}s` }} />
                    {/* Glass inner */}
                    <div style={{
                      position:'relative', zIndex:1, borderRadius:15, padding:'18px 32px',
                      background:'rgba(4,2,22,.88)', backdropFilter:'blur(36px)', WebkitBackdropFilter:'blur(36px)',
                      textAlign:'center', overflow:'hidden',
                    }}>
                      <div className="a-shimmer" />
                      <span style={{ position:'absolute', left:0, top:0, bottom:0, width:3, borderRadius:'15px 0 0 15px', background:'linear-gradient(180deg,#ff006e,#9900ff,#0088ff,#00ffcc)', opacity:.80, animation:`hue 8s linear ${-index*1.1}s infinite` }} />
                      <span style={{ fontSize:14, fontWeight:600, letterSpacing:'.11em', color:'rgba(230,218,255,.96)', position:'relative' }}>
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
              height:1.5, borderRadius:1,
              background:'linear-gradient(90deg,transparent,rgba(140,0,255,.70),rgba(0,180,255,.70),transparent)',
              marginTop:64, marginBottom:28, animation:'hue 12s linear infinite',
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
