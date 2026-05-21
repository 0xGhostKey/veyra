'use client'

import { useEffect, useRef } from 'react'
import type { Profile, Link } from '@/types'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'
import Logo from '@/components/Logo'

// ── StarField ────────────────────────────────────────────────────────────────
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
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

// ── PulseWave — concentric energy rings emanating from avatar ─────────────────
function PulseWave() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const SZ = 440
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = SZ * dpr; c.height = SZ * dpr
    const ctx = c.getContext('2d')!
    ctx.scale(dpr, dpr)
    const CX = SZ / 2, CY = SZ / 2

    type Wave = { r: number; alpha: number; speed: number }
    const waves: Wave[] = []
    const MAX_R = 210, START_R = 74
    let frame = 0, nextWave = 0, raf: number

    const tick = () => {
      ctx.clearRect(0, 0, SZ, SZ)
      frame++
      if (frame >= nextWave) {
        waves.push({ r: START_R, alpha: 0.72, speed: 1.1 + Math.random() * 0.5 })
        nextWave = frame + 108 + Math.floor(Math.random() * 60)
      }
      for (let wi = waves.length - 1; wi >= 0; wi--) {
        const w = waves[wi]
        w.r += w.speed
        w.alpha = 0.72 * Math.max(0, 1 - (w.r - START_R) / (MAX_R - START_R))
        if (w.alpha <= 0.01) { waves.splice(wi, 1); continue }

        const SEGS = 56
        const jitter = 2 + (1 - w.alpha / 0.72) * 7

        const buildPath = () => {
          ctx.beginPath()
          for (let p = 0; p <= SEGS; p++) {
            const a = (p / SEGS) * Math.PI * 2
            const r = w.r + (Math.random() - 0.5) * jitter * 2
            const px = CX + Math.cos(a) * r, py = CY + Math.sin(a) * r
            if (p === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
          }
          ctx.closePath()
        }

        ctx.save(); ctx.strokeStyle=`rgba(0,0,0,${(w.alpha*.55).toFixed(3)})`; ctx.lineWidth=9; buildPath(); ctx.stroke(); ctx.restore()
        ctx.save(); ctx.strokeStyle=`rgba(160,0,0,${(w.alpha*.78).toFixed(3)})`; ctx.lineWidth=4; ctx.shadowBlur=18; ctx.shadowColor=`rgba(255,0,0,${w.alpha.toFixed(3)})`; buildPath(); ctx.stroke(); ctx.restore()
        ctx.save(); ctx.strokeStyle=`rgba(230,10,0,${(w.alpha*.90).toFixed(3)})`; ctx.lineWidth=1.6; ctx.shadowBlur=8; ctx.shadowColor='rgba(255,60,0,1)'; buildPath(); ctx.stroke(); ctx.restore()
        ctx.save(); ctx.strokeStyle=`rgba(255,200,80,${(w.alpha*.85).toFixed(3)})`; ctx.lineWidth=0.6; ctx.shadowBlur=5; ctx.shadowColor='rgba(255,120,0,1)'; buildPath(); ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])
  // Center 440px canvas on avatar center (74px from float-div top-left)
  return <canvas ref={ref} style={{position:'absolute',top:-146,left:-146,width:440,height:440,pointerEvents:'none',zIndex:0}}/>
}

// ── Theme ────────────────────────────────────────────────────────────────────
type Props = { profile: Profile; links: Link[] }

export default function PremiumAuraTheme({ profile, links }: Props) {
  const textLinks     = links.filter(l => l.link_type === 'text')
  const galleryPhotos = links.filter(l => l.link_type === 'gallery')

  const CURTAINS = [
    { l:'7%',  col:'0,255,170',  dur:'9s',  del:'0s'   },
    { l:'23%', col:'130,0,255',  dur:'12s', del:'-4s'  },
    { l:'43%', col:'0,220,200',  dur:'8s',  del:'-2s'  },
    { l:'61%', col:'190,0,255',  dur:'11s', del:'-6s'  },
    { l:'77%', col:'0,255,180',  dur:'10s', del:'-3s'  },
    { l:'91%', col:'70,0,220',   dur:'13s', del:'-8s'  },
  ]

  return (
    <>
      <style>{`
        html, body { background-color: #010108 !important; margin: 0; padding: 0; }

        @keyframes halo {
          0%,100%{ opacity:.70; transform:scale(1.00); filter:hue-rotate(0deg);   }
          33%    { opacity:.96; transform:scale(1.22); filter:hue-rotate(120deg); }
          66%    { opacity:.80; transform:scale(1.12); filter:hue-rotate(240deg); }
        }
        @keyframes float {
          0%,100%{ transform:translateY(0px)  rotate( 0.0deg); }
          25%    { transform:translateY(-14px) rotate( 0.6deg); }
          50%    { transform:translateY(-22px) rotate( 0.0deg); }
          75%    { transform:translateY(-14px) rotate(-0.6deg); }
        }
        @keyframes spkT { 0%,100%{opacity:0;transform:translateX(-50%) scale(.1)} 40%,60%{opacity:1;transform:translateX(-50%) scale(1)} }
        @keyframes spkB { 0%,100%{opacity:0;transform:translateX(-50%) scale(.1)} 38%,62%{opacity:.9;transform:translateX(-50%) scale(.95)} }
        @keyframes spkL { 0%,100%{opacity:0;transform:translateY(-50%) scale(.1)} 42%,58%{opacity:1;transform:translateY(-50%) scale(1)} }
        @keyframes spkR { 0%,100%{opacity:0;transform:translateY(-50%) scale(.1)} 36%,64%{opacity:.95;transform:translateY(-50%) scale(1.05)} }
        @keyframes spkD { 0%,100%{opacity:0;transform:scale(.1)} 50%{opacity:.85;transform:scale(.90)} }
        @keyframes nglow {
          0%,100%{ filter:drop-shadow(0 0 10px rgba(200,80,255,.50)) drop-shadow(0 0 28px rgba(80,160,255,.30)); }
          50%    { filter:drop-shadow(0 0 22px rgba(255,60,180,.65)) drop-shadow(0 0 54px rgba(60,220,255,.40)); }
        }
        @keyframes hue  { from{filter:hue-rotate(0deg)} to{filter:hue-rotate(360deg)} }
        @keyframes aur1 { 0%,100%{transform:skewY(-8deg) translateX(-42%) scaleY(1.0);opacity:.62} 50%{transform:skewY(-2deg) translateX(10%) scaleY(1.22);opacity:.85} }
        @keyframes aur2 { 0%,100%{transform:skewY( 6deg) translateX( 42%) scaleY(1.0);opacity:.55} 50%{transform:skewY( 2deg) translateX(-10%) scaleY(1.18);opacity:.75} }
        @keyframes aur3 { 0%,100%{transform:skewY(-5deg) translateX(-26%) scaleY(1.0);opacity:.50} 50%{transform:skewY( 3deg) translateX( 15%) scaleY(1.20);opacity:.70} }
        @keyframes aur4 { 0%,100%{transform:skewY( 5deg) translateX( 28%) scaleY(1.0);opacity:.44} 50%{transform:skewY(-2deg) translateX(-12%) scaleY(1.12);opacity:.62} }
        @keyframes aur5 { 0%,100%{transform:skewY(-4deg) translateX(-18%) scaleY(1.0);opacity:.40} 50%{transform:skewY( 1deg) translateX( 22%) scaleY(1.14);opacity:.58} }
        @keyframes aur6 { 0%,100%{transform:skewY( 3deg) translateX( 32%) scaleY(1.0);opacity:.36} 50%{transform:skewY(-3deg) translateX( -8%) scaleY(1.10);opacity:.52} }
        @keyframes crtA { 0%,100%{transform:translateX(-16px) scaleX(1.0);opacity:.52} 50%{transform:translateX(16px) scaleX(1.50);opacity:.80} }
        @keyframes crtB { 0%,100%{transform:translateX( 13px) scaleX(1.0);opacity:.46} 50%{transform:translateX(-13px) scaleX(1.42);opacity:.74} }
        @keyframes crtC { 0%,100%{transform:translateX( -9px) scaleX(1.1);opacity:.50} 50%{transform:translateX( 19px) scaleX(0.80);opacity:.78} }
        @keyframes orbV { 0%,100%{opacity:.35;transform:translateX(-50%) scale(1)} 50%{opacity:.55;transform:translateX(-50%) scale(1.10)} }
        @keyframes orbB { 0%,100%{opacity:.25;transform:translateX(-50%) scale(1)} 50%{opacity:.42;transform:translateX(-50%) scale(1.12)} }
        @keyframes orbR { 0%,100%{opacity:.20;transform:translateX(-50%) scale(1)} 50%{opacity:.35;transform:translateX(-50%) scale(1.08)} }
        @keyframes cGlow  { 0%,100%{opacity:.55} 50%{opacity:.92} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes profIn { from{opacity:0;transform:translateY(40px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }

        .a-border  { position:absolute;inset:0;border-radius:16px;background:linear-gradient(135deg,#ff006e,#9900ff,#0088ff,#00ffcc,#ff9900,#ff006e);animation:hue 8s linear infinite; }
        .a-shimmer { position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(108deg,transparent 18%,rgba(255,255,255,.18) 50%,transparent 82%);transform:translateX(-115%);will-change:transform; }
        .a-lnk:hover .a-shimmer { transform:translateX(115%);transition:transform .55s cubic-bezier(.4,0,.2,1); }
        .a-lnk { display:block;text-decoration:none;transition:transform .18s ease,filter .22s ease; }
        .a-lnk:hover  { transform:translateY(-2px);filter:brightness(1.18); }
        .a-lnk:active { transform:scale(.982);transition:transform .08s; }
      `}</style>

      {/* ── Fixed background layer — clipped by viewport, never traps scroll ── */}
      <div aria-hidden style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
        <StarField />

        {[
          { top:'14%', h:140, col:'0,255,180',  anim:'aur1', dur:'22s', del:'0s'   },
          { top:'36%', h:120, col:'160,0,255',   anim:'aur2', dur:'28s', del:'-6s'  },
          { top:'58%', h:110, col:'255,0,140',   anim:'aur3', dur:'32s', del:'-4s'  },
          { top:'25%', h: 90, col:'255,180,0',   anim:'aur4', dur:'36s', del:'-10s' },
          { top:'48%', h: 80, col:'0,200,255',   anim:'aur5', dur:'40s', del:'-8s'  },
          { top:'70%', h: 70, col:'100,0,220',   anim:'aur6', dur:'45s', del:'-15s' },
        ].map((a,i)=>(
          <div key={i} style={{
            position:'absolute', top:a.top, left:'-42%', right:'-42%', height:a.h,
            background:`linear-gradient(180deg,transparent 0%,rgba(${a.col},.62) 38%,rgba(${a.col},.78) 52%,rgba(${a.col},.62) 66%,transparent 100%)`,
            filter:'blur(28px)', animation:`${a.anim} ${a.dur} ease-in-out infinite ${a.del}`,
          }}/>
        ))}

        {CURTAINS.map((ct,i)=>{
          const anims=['crtA','crtB','crtC']
          return (
            <div key={i} style={{
              position:'absolute', top:0, bottom:0, left:ct.l, width:52,
              background:`linear-gradient(180deg,transparent 0%,rgba(${ct.col},.26) 20%,rgba(${ct.col},.52) 45%,rgba(${ct.col},.26) 72%,transparent 92%)`,
              filter:'blur(24px)', animation:`${anims[i%3]} ${ct.dur} ease-in-out infinite ${ct.del}`,
            }}/>
          )
        })}

        <div style={{ position:'absolute',top:'8%', left:'50%',width:'130vw',height:'130vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(140,0,255,.30) 0%,rgba(100,0,200,.12) 40%,transparent 65%)',filter:'blur(60px)',animation:'orbV 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute',top:'52%',left:'50%',width:'110vw',height:'110vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(0,80,255,.22) 0%,rgba(0,50,180,.10) 40%,transparent 65%)',filter:'blur(64px)',animation:'orbB 22s ease-in-out infinite reverse' }} />
        <div style={{ position:'absolute',top:'75%',left:'50%',width:'90vw', height:'90vw', borderRadius:'50%',background:'radial-gradient(circle,rgba(255,0,100,.18) 0%,transparent 60%)',filter:'blur(50px)',animation:'orbR 28s ease-in-out infinite' }} />
      </div>

      {/* ── Scrollable content — no overflow restriction ── */}
      <div style={{ position:'relative', zIndex:1, minHeight:'100dvh' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'120px 16px 64px' }}>
          <div style={{ width:'100%', maxWidth:420 }}>

            {/* Profile */}
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',marginBottom:48,animation:'profIn 1.1s cubic-bezier(.22,1,.36,1) both' }}>

              {/* position:relative on float div so PulseWave positions relative to it */}
              <div style={{ marginBottom:40, animation:'float 5s ease-in-out infinite', position:'relative' }}>
                <PulseWave />

                <div style={{ position:'relative', width:148, height:148 }}>
                  {/* Outer halos */}
                  <div style={{ position:'absolute',inset:-52,borderRadius:'50%',background:'conic-gradient(from 0deg,#ff0077,#aa00ff,#0055ff,#00ffcc,#ff9900,#ff0077)',filter:'blur(54px)',animation:'halo 3.6s ease-in-out infinite',opacity:.72,pointerEvents:'none',zIndex:2 }} />
                  <div style={{ position:'absolute',inset:-22,borderRadius:'50%',background:'conic-gradient(from 180deg,#00ffcc,#aa00ff,#ff006e,#ff9900,#00ffcc)',filter:'blur(22px)',animation:'halo 3.6s ease-in-out infinite .65s',opacity:.65,pointerEvents:'none',zIndex:3 }} />

                  {/* Avatar surface */}
                  <div style={{
                    position:'absolute', inset:0, borderRadius:'50%',
                    overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center',
                    background:'radial-gradient(circle at 50% 35%, rgba(100,0,220,.22) 0%, rgba(14,8,38,.95) 45%, rgba(7,2,20,.98) 100%)',
                    boxShadow:'inset 0 0 28px 10px rgba(80,0,200,.24), inset 0 0 56px 20px rgba(20,0,80,.14)',
                    zIndex:7,
                  }}>
                    {profile.avatar_url
                      ? <img src={profile.avatar_url} alt={profile.display_name??''} style={{ width:'100%',height:'100%',objectFit:'cover' }} />
                      : <span style={{ fontSize:42,fontWeight:800,lineHeight:1,background:'linear-gradient(135deg,#ffb0ea,#caaaff,#aadcff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
                          {(profile.display_name??'U')[0].toUpperCase()}
                        </span>
                    }
                  </div>

                  {/* Sparkle nodes */}
                  <div style={{ position:'absolute',top:-8,  left:'50%',width:8,height:8,borderRadius:'50%',background:'#fff',boxShadow:'0 0 12px 5px rgba(255,180,80,.98),0 0 26px 10px rgba(255,100,0,.60)',  animation:'spkT 2.4s ease-in-out infinite',zIndex:10 }} />
                  <div style={{ position:'absolute',bottom:-8,left:'50%',width:7,height:7,borderRadius:'50%',background:'#fff',boxShadow:'0 0 11px 4px rgba(200,100,255,.95),0 0 24px 8px rgba(140,0,255,.58)',   animation:'spkB 3.0s ease-in-out infinite .60s',zIndex:10 }} />
                  <div style={{ position:'absolute',left:-8,  top:'50%', width:7,height:7,borderRadius:'50%',background:'#fff',boxShadow:'0 0 11px 4px rgba(255,80,40,.95),0 0 24px 8px rgba(200,0,0,.58)',       animation:'spkL 2.8s ease-in-out infinite 1.0s',zIndex:10 }} />
                  <div style={{ position:'absolute',right:-8, top:'50%', width:8,height:8,borderRadius:'50%',background:'#fff',boxShadow:'0 0 12px 5px rgba(255,160,60,.95),0 0 26px 10px rgba(200,80,0,.58)',    animation:'spkR 3.3s ease-in-out infinite 1.5s',zIndex:10 }} />
                  <div style={{ position:'absolute',top:'12%',left:'12%', width:6,height:6,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px 3px rgba(255,120,60,.92)',animation:'spkD 3.7s ease-in-out infinite .25s',zIndex:10 }} />
                  <div style={{ position:'absolute',top:'12%',right:'12%',width:6,height:6,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px 3px rgba(200,80,255,.92)', animation:'spkD 4.1s ease-in-out infinite .78s',zIndex:10 }} />
                  <div style={{ position:'absolute',bottom:'12%',left:'12%', width:5,height:5,borderRadius:'50%',background:'#fff',boxShadow:'0 0 7px 2px rgba(255,140,40,.90)',animation:'spkD 3.5s ease-in-out infinite 1.2s',zIndex:10 }} />
                  <div style={{ position:'absolute',bottom:'12%',right:'12%',width:6,height:6,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px 3px rgba(255,80,20,.92)', animation:'spkD 3.9s ease-in-out infinite 1.8s',zIndex:10 }} />
                </div>
              </div>

              <h1 style={{ fontSize:26,fontWeight:700,letterSpacing:'0.06em',background:'linear-gradient(135deg,#fff 0%,#e0c8ff 25%,#c8e0ff 55%,#fff 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:20,textAlign:'center',animation:'nglow 5s ease-in-out infinite' }}>
                {profile.display_name ?? 'No Name'}
              </h1>

              <div style={{ width:48,height:2,borderRadius:2,background:'linear-gradient(90deg,#ff006e,#9900ff,#0088ff,#00ffcc)',marginBottom:profile.bio?20:0,animation:'hue 6s linear infinite',boxShadow:'0 0 12px 4px rgba(140,0,255,.50)' }} />

              {profile.bio && (
                <p style={{ fontSize:13,textAlign:'center',lineHeight:1.95,maxWidth:260,color:'rgba(210,190,255,.55)',letterSpacing:'0.04em',marginTop:12 }}>
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Prismatic divider */}
            <div style={{ height:1.5,borderRadius:1,background:'linear-gradient(90deg,transparent,rgba(255,0,110,.88),rgba(140,0,255,.88),rgba(0,160,255,.88),rgba(0,255,180,.88),transparent)',marginBottom:36,animation:'hue 8s linear infinite',boxShadow:'0 0 8px 2px rgba(140,0,255,.30)' }} />

            {/* Links */}
            <MixedLinks links={textLinks} gap="gap-4" renderTextLink={(link,index)=>(
              <div key={link.id} style={{ position:'relative',animation:`fadeUp .70s cubic-bezier(.22,1,.36,1) ${.08+index*.12}s backwards` }}>
                <div style={{ position:'absolute',inset:-10,borderRadius:26,pointerEvents:'none',background:'linear-gradient(135deg,rgba(255,0,110,.28),rgba(160,0,255,.28),rgba(0,140,255,.28),rgba(0,210,255,.28))',filter:'blur(16px)',animation:`hue 8s linear ${-index*1.1}s infinite, cGlow 2.8s ease-in-out ${-index*0.6}s infinite` }} />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="a-lnk" style={{ position:'relative',borderRadius:16,padding:1 }}>
                  <div className="a-border" style={{ animationDelay:`-${index*1.1}s` }} />
                  <div style={{ position:'relative',zIndex:1,borderRadius:15,padding:'18px 32px',background:'rgba(4,2,22,.88)',backdropFilter:'blur(36px)',WebkitBackdropFilter:'blur(36px)',textAlign:'center',overflow:'hidden' }}>
                    <div className="a-shimmer" />
                    <span style={{ position:'absolute',left:0,top:0,bottom:0,width:3,borderRadius:'15px 0 0 15px',background:'linear-gradient(180deg,#ff006e,#9900ff,#0088ff,#00ffcc)',opacity:.80,animation:`hue 8s linear ${-index*1.1}s infinite` }} />
                    <span style={{ fontSize:14,fontWeight:600,letterSpacing:'.11em',color:'rgba(230,218,255,.96)',position:'relative' }}>
                      {link.title}
                    </span>
                  </div>
                </a>
              </div>
            )} />

            <GallerySection photos={galleryPhotos} />

            {/* Bottom divider */}
            <div style={{ height:1,borderRadius:1,background:'linear-gradient(90deg,transparent,rgba(140,0,255,.60),rgba(0,180,255,.60),transparent)',marginTop:64,marginBottom:24,animation:'hue 12s linear infinite' }} />

            {/* Logo — uses shared Logo component, same as all other themes */}
            {!profile.logo_removed && (
              <div className="flex justify-center pb-2">
                <Logo dark gold />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
