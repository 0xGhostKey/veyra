'use client'

import { useEffect, useRef } from 'react'
import type { Profile, Link } from '@/types'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

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

// ── Conqueror's Haki — canvas jagged lightning: red core / black outer ───────
function HakiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const SZ = 300, CX = 150, CY = 150, IR = 76
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = SZ * dpr; c.height = SZ * dpr
    const ctx = c.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'

    function mkPath(x1:number,y1:number,x2:number,y2:number,depth:number):[number,number][] {
      if (depth<=0) return [[x1,y1],[x2,y2]]
      const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)
      if (len<0.5) return [[x1,y1],[x2,y2]]
      const nx=-dy/len, ny=dx/len
      const disp=(Math.random()-.5)*len*0.82
      const mx=(x1+x2)/2+nx*disp, my=(y1+y2)/2+ny*disp
      return [...mkPath(x1,y1,mx,my,depth-1).slice(0,-1),...mkPath(mx,my,x2,y2,depth-1)]
    }

    function buildPaths(base:number) {
      const angle=base+(Math.random()-.5)*0.5
      const len=46+Math.random()*48
      const sx=CX+Math.cos(angle)*IR, sy=CY+Math.sin(angle)*IR
      const ex=CX+Math.cos(angle)*(IR+len), ey=CY+Math.sin(angle)*(IR+len)
      const path=mkPath(sx,sy,ex,ey,5)
      const branches:[number,number][][]=[]
      const nb=Math.random()<0.45?2:Math.random()<0.70?1:0
      for(let b=0;b<nb;b++){
        const bi=Math.floor(path.length*(0.25+Math.random()*0.45))
        const [bx,by]=path[bi]
        const ba=angle+(Math.random()-.5)*1.6
        const bl=len*(0.25+Math.random()*0.42)
        branches.push(mkPath(bx,by,bx+Math.cos(ba)*bl,by+Math.sin(ba)*bl,4))
      }
      return { path, branches }
    }

    function stroke(pts:[number,number][],a:number,main:boolean){
      if(pts.length<2) return
      const w=main?1.0:0.55
      const go=()=>{ ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]) }
      ctx.save(); ctx.strokeStyle=`rgba(0,0,0,${a*0.65})`; ctx.lineWidth=w*12; ctx.shadowBlur=0; go(); ctx.stroke(); ctx.restore()
      ctx.save(); ctx.shadowBlur=18; ctx.shadowColor='rgba(180,0,0,1)'; ctx.strokeStyle=`rgba(90,0,0,${a*0.82})`; ctx.lineWidth=w*6.5; go(); ctx.stroke(); ctx.restore()
      ctx.save(); ctx.shadowBlur=9; ctx.shadowColor='rgba(255,0,0,1)'; ctx.strokeStyle=`rgba(220,0,0,${a*0.93})`; ctx.lineWidth=w*2.8; go(); ctx.stroke(); ctx.restore()
      ctx.save(); ctx.shadowBlur=4; ctx.shadowColor='rgba(255,140,0,1)'; ctx.strokeStyle=`rgba(255,90,20,${a})`; ctx.lineWidth=w*0.85; go(); ctx.stroke(); ctx.restore()
    }

    type Bolt = { base:number;path:[number,number][];branches:[number,number][][];alpha:number;target:number;decay:number;next:number }
    let frame=0
    const bolts:Bolt[]=Array.from({length:12},(_,i)=>{
      const base=i*Math.PI*2/12
      const {path,branches}=buildPaths(base)
      return { base,path,branches,alpha:0.14,target:0.14,decay:0.92,next:Math.floor(Math.random()*100) }
    })
    let raf:number
    const tick=()=>{
      ctx.clearRect(0,0,SZ,SZ); frame++
      for(const b of bolts){
        if(frame>=b.next){
          const p=buildPaths(b.base); b.path=p.path; b.branches=p.branches
          b.target=0.68+Math.random()*0.32; b.decay=0.87+Math.random()*0.10
          b.next=frame+85+Math.floor(Math.random()*145)
        }
        b.alpha+=(b.target-b.alpha)*0.14
        b.target=Math.max(0.12,b.target*b.decay)
        stroke(b.path,b.alpha,true)
        b.branches.forEach(br=>stroke(br,b.alpha*0.55,false))
      }
      raf=requestAnimationFrame(tick)
    }
    tick()
    return()=>cancelAnimationFrame(raf)
  },[])
  return <canvas ref={ref} style={{position:'absolute',top:-76,left:-76,width:300,height:300,pointerEvents:'none',zIndex:5}}/>
}

// ── ElectricRings — jagged lightning arcs replacing smooth plasma rings ───────
// Matches HakiCanvas color scheme: black outer → deep red → bright red → white-orange core
// Three rings rotate in alternating directions; arc segments regenerate for flicker effect.
function ElectricRings() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const SZ = 148, CX = 74, CY = 74
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = SZ * dpr; c.height = SZ * dpr
    const ctx = c.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'

    // Build jagged arc in LOCAL (ring-centered) coords.
    // Points are relative to (0,0); ctx.rotate handles ring rotation.
    function makeSegPts(r: number, a0: number, a1: number, jitter: number): [number,number][] {
      const steps = Math.max(7, Math.round(Math.abs(a1 - a0) * r * 0.75))
      const pts: [number,number][] = []
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const a = a0 + (a1 - a0) * t
        const rr = r + (Math.random() - 0.5) * jitter * 2
        pts.push([Math.cos(a) * rr, Math.sin(a) * rr])
      }
      return pts
    }

    // Draw a single arc segment: 4 layers matching Haki lightning style
    function drawSeg(pts: [number,number][], alpha: number) {
      if (pts.length < 2) return
      const go = () => {
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
      }
      // Black outer
      ctx.save(); ctx.strokeStyle = `rgba(0,0,0,${(alpha * 0.70).toFixed(3)})`; ctx.lineWidth = 11; go(); ctx.stroke(); ctx.restore()
      // Deep red glow
      ctx.save(); ctx.strokeStyle = `rgba(130,0,0,${(alpha * 0.85).toFixed(3)})`; ctx.lineWidth = 5.5; ctx.shadowBlur = 18; ctx.shadowColor = 'rgba(255,0,0,0.85)'; go(); ctx.stroke(); ctx.restore()
      // Bright red
      ctx.save(); ctx.strokeStyle = `rgba(230,10,0,${(alpha * 0.93).toFixed(3)})`; ctx.lineWidth = 2.4; ctx.shadowBlur = 9; ctx.shadowColor = 'rgba(255,60,0,1)'; go(); ctx.stroke(); ctx.restore()
      // White-orange core
      ctx.save(); ctx.strokeStyle = `rgba(255,200,80,${alpha.toFixed(3)})`; ctx.lineWidth = 0.75; ctx.shadowBlur = 5; ctx.shadowColor = 'rgba(255,130,0,1)'; go(); ctx.stroke(); ctx.restore()
    }

    type Seg = { pts: [number,number][]; alpha: number; target: number; decay: number; next: number }
    type Ring = { r: number; dir: number; speed: number; angle: number; numSegs: number; segs: Seg[] }

    const RING_DEFS = [
      { r: 72, dir:  1, speed: 0.008, numSegs: 3 },  // outer — CW
      { r: 65, dir: -1, speed: 0.013, numSegs: 4 },  // mid — CCW
      { r: 59, dir:  1, speed: 0.009, numSegs: 3 },  // inner — CW
    ]
    const GAP_FRAC = 0.22

    function initSegs(r: number, n: number): Seg[] {
      const arcFrac = (1 - GAP_FRAC * n) / n
      return Array.from({ length: n }, (_, i) => {
        const a0 = (i / n) * Math.PI * 2
        const a1 = a0 + arcFrac * Math.PI * 2
        return {
          pts: makeSegPts(r, a0, a1, 4.5),
          alpha: 0.15, target: 0.15, decay: 0.92,
          next: Math.floor(Math.random() * 80),
        }
      })
    }

    const rings: Ring[] = RING_DEFS.map(def => ({
      r: def.r, dir: def.dir, speed: def.speed, numSegs: def.numSegs,
      angle: Math.random() * Math.PI * 2,
      segs: initSegs(def.r, def.numSegs),
    }))

    let frame = 0, raf: number

    const tick = () => {
      ctx.clearRect(0, 0, SZ, SZ)
      frame++

      for (const ring of rings) {
        ring.angle += ring.dir * ring.speed
        const n = ring.numSegs
        const arcFrac = (1 - GAP_FRAC * n) / n

        // Apply ring rotation via canvas transform — segments are in local coords
        ctx.save()
        ctx.translate(CX, CY)
        ctx.rotate(ring.angle)

        ring.segs.forEach((seg, i) => {
          // Regenerate jagged path periodically for lightning flicker
          if (frame >= seg.next) {
            const a0 = (i / n) * Math.PI * 2
            const a1 = a0 + arcFrac * Math.PI * 2
            seg.pts = makeSegPts(ring.r, a0, a1, 4.5)
            seg.target = 0.52 + Math.random() * 0.48
            seg.decay  = 0.88 + Math.random() * 0.10
            seg.next   = frame + 45 + Math.floor(Math.random() * 90)
          }
          seg.alpha  += (seg.target - seg.alpha) * 0.12
          seg.target  = Math.max(0.12, seg.target * seg.decay)
          drawSeg(seg.pts, seg.alpha)
        })

        ctx.restore()

        // Discharge sparks — radial spikes flying outward from ring surface
        if (Math.random() < 0.28) {
          const sa = Math.random() * Math.PI * 2
          const sl = 3 + Math.random() * 7
          const sx = CX + Math.cos(sa) * ring.r
          const sy = CY + Math.sin(sa) * ring.r
          const ex = CX + Math.cos(sa) * (ring.r + sl)
          const ey = CY + Math.sin(sa) * (ring.r + sl)
          ctx.save()
          ctx.strokeStyle = `rgba(255,150,40,${(0.5 + Math.random() * 0.5).toFixed(2)})`
          ctx.lineWidth = 0.85; ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(255,60,0,0.9)'
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke()
          ctx.restore()
        }
      }

      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:148,height:148,pointerEvents:'none',zIndex:6}}/>
}

// ── PulseWave — PREMIUM: concentric energy rings emanating from avatar ────────
// Spawns jagged, crackling pulse rings that expand and fade outward.
// Matches Haki color scheme. Rendered behind avatar (zIndex 0 in float div).
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
    const MAX_R = 210
    const START_R = 74  // avatar radius
    let frame = 0, nextWave = 0, raf: number

    const tick = () => {
      ctx.clearRect(0, 0, SZ, SZ)
      frame++

      // Spawn new wave every ~1.8-2.8 s at 60 fps
      if (frame >= nextWave) {
        waves.push({ r: START_R, alpha: 0.72, speed: 1.1 + Math.random() * 0.5 })
        nextWave = frame + 108 + Math.floor(Math.random() * 60)
      }

      for (let wi = waves.length - 1; wi >= 0; wi--) {
        const w = waves[wi]
        w.r += w.speed
        // Fade smoothly from 0.72 at START_R to 0 at MAX_R
        w.alpha = 0.72 * Math.max(0, 1 - (w.r - START_R) / (MAX_R - START_R))

        if (w.alpha <= 0.01) { waves.splice(wi, 1); continue }

        // Draw a jagged circle — re-randomized each frame for crackling effect
        const SEGS = 56
        const jitter = 2 + (1 - w.alpha / 0.72) * 7  // more jagged as it fades

        const buildPath = () => {
          ctx.beginPath()
          for (let p = 0; p <= SEGS; p++) {
            const a = (p / SEGS) * Math.PI * 2
            const r = w.r + (Math.random() - 0.5) * jitter * 2
            const x = CX + Math.cos(a) * r
            const y = CY + Math.sin(a) * r
            if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
          }
          ctx.closePath()
        }

        // Black outer
        ctx.save(); ctx.strokeStyle = `rgba(0,0,0,${(w.alpha * 0.55).toFixed(3)})`; ctx.lineWidth = 9; buildPath(); ctx.stroke(); ctx.restore()
        // Deep red glow
        ctx.save(); ctx.strokeStyle = `rgba(160,0,0,${(w.alpha * 0.78).toFixed(3)})`; ctx.lineWidth = 4; ctx.shadowBlur = 18; ctx.shadowColor = `rgba(255,0,0,${w.alpha.toFixed(3)})`; buildPath(); ctx.stroke(); ctx.restore()
        // Bright red
        ctx.save(); ctx.strokeStyle = `rgba(230,10,0,${(w.alpha * 0.90).toFixed(3)})`; ctx.lineWidth = 1.6; ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(255,60,0,1)'; buildPath(); ctx.stroke(); ctx.restore()
        // White-orange core
        ctx.save(); ctx.strokeStyle = `rgba(255,200,80,${(w.alpha * 0.85).toFixed(3)})`; ctx.lineWidth = 0.6; ctx.shadowBlur = 5; ctx.shadowColor = 'rgba(255,120,0,1)'; buildPath(); ctx.restore()
      }

      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  // Center 440px canvas on avatar center (74,74 in float div, avatar is 148×148)
  // offset = avatarCenter - canvasCenter = 74 - 220 = -146px
  return <canvas ref={ref} style={{
    position: 'absolute', top: -146, left: -146,
    width: 440, height: 440,
    pointerEvents: 'none', zIndex: 0,
  }}/>
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
        html, body {
          background-color: #010108 !important;
          margin: 0; padding: 0;
        }

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
        @keyframes hue { from{filter:hue-rotate(0deg)} to{filter:hue-rotate(360deg)} }

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

        @keyframes cGlow { 0%,100%{opacity:.55} 50%{opacity:.92} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes profIn { from{opacity:0;transform:translateY(40px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }

        .a-border { position:absolute;inset:0;border-radius:16px;background:linear-gradient(135deg,#ff006e,#9900ff,#0088ff,#00ffcc,#ff9900,#ff006e);animation:hue 8s linear infinite; }
        .a-shimmer { position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(108deg,transparent 18%,rgba(255,255,255,.18) 50%,transparent 82%);transform:translateX(-115%);will-change:transform; }
        .a-lnk:hover .a-shimmer { transform:translateX(115%);transition:transform .55s cubic-bezier(.4,0,.2,1); }
        .a-lnk { display:block;text-decoration:none;transition:transform .18s ease,filter .22s ease; }
        .a-lnk:hover  { transform:translateY(-2px);filter:brightness(1.18); }
        .a-lnk:active { transform:scale(.982);transition:transform .08s; }
      `}</style>

      {/*
        ── Fixed background layer ──────────────────────────────────────────────
        position:fixed + overflow:hidden clips aurora bands to the viewport
        without creating a vertical scroll container (no two-stage scroll trap).
        All decorative background elements live here.
      */}
      <div aria-hidden style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
        <StarField />

        {/* Aurora horizontal bands */}
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
            pointerEvents:'none',
          }}/>
        ))}

        {/* Aurora vertical curtains */}
        {CURTAINS.map((ct,i)=>{
          const anims=['crtA','crtB','crtC']
          return (
            <div key={i} style={{
              position:'absolute', top:0, bottom:0, left:ct.l, width:52,
              background:`linear-gradient(180deg,transparent 0%,rgba(${ct.col},.26) 20%,rgba(${ct.col},.52) 45%,rgba(${ct.col},.26) 72%,transparent 92%)`,
              filter:'blur(24px)', animation:`${anims[i%3]} ${ct.dur} ease-in-out infinite ${ct.del}`,
              pointerEvents:'none',
            }}/>
          )
        })}

        {/* Ambient orbs */}
        <div style={{ position:'absolute',top:'8%',left:'50%',width:'130vw',height:'130vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(140,0,255,.30) 0%,rgba(100,0,200,.12) 40%,transparent 65%)',filter:'blur(60px)',animation:'orbV 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute',top:'52%',left:'50%',width:'110vw',height:'110vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(0,80,255,.22) 0%,rgba(0,50,180,.10) 40%,transparent 65%)',filter:'blur(64px)',animation:'orbB 22s ease-in-out infinite reverse' }} />
        <div style={{ position:'absolute',top:'75%',left:'50%',width:'90vw',height:'90vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(255,0,100,.18) 0%,transparent 60%)',filter:'blur(50px)',animation:'orbR 28s ease-in-out infinite' }} />
      </div>

      {/*
        ── Scrollable content layer ────────────────────────────────────────────
        No overflow restriction here — vertical scroll works naturally on all iOS.
        Background clipping is handled entirely by the fixed layer above.
      */}
      <div style={{ position:'relative', zIndex:1, minHeight:'100dvh' }}>
        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'120px 16px 64px' }}>
          <div style={{ width:'100%', maxWidth:420 }}>

            {/* ── Profile ── */}
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',marginBottom:48,animation:'profIn 1.1s cubic-bezier(.22,1,.36,1) both' }}>

              {/*
                Float wrapper has position:relative so PulseWave can be
                positioned absolutely relative to it.
                marginBottom:90 ensures name text clears HakiCanvas below.
              */}
              <div style={{ marginBottom:90, animation:'float 5s ease-in-out infinite', position:'relative' }}>

                {/* PulseWave — behind everything (zIndex:0) */}
                <PulseWave />

                <div style={{ position:'relative', width:148, height:148 }}>

                  {/* HakiCanvas: 300px canvas, starts at IR=76 outside container */}
                  <HakiCanvas />

                  {/* Outer halo */}
                  <div style={{ position:'absolute',inset:-52,borderRadius:'50%',
                    background:'conic-gradient(from 0deg,#ff0077,#aa00ff,#0055ff,#00ffcc,#ff9900,#ff0077)',
                    filter:'blur(54px)', animation:'halo 3.6s ease-in-out infinite',
                    opacity:.72, pointerEvents:'none', zIndex:2 }} />
                  <div style={{ position:'absolute',inset:-22,borderRadius:'50%',
                    background:'conic-gradient(from 180deg,#00ffcc,#aa00ff,#ff006e,#ff9900,#00ffcc)',
                    filter:'blur(22px)', animation:'halo 3.6s ease-in-out infinite .65s',
                    opacity:.65, pointerEvents:'none', zIndex:3 }} />

                  {/* ElectricRings — lightning arc rings matching Haki */}
                  <ElectricRings />

                  {/* Avatar surface */}
                  <div style={{
                    position:'absolute', inset:16, borderRadius:'50%',
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

                  {/* Sparkle nodes — white/red/orange palette to match Haki */}
                  <div style={{ position:'absolute',top:-8,left:'50%',width:8,height:8,borderRadius:'50%',background:'#fff',boxShadow:'0 0 12px 5px rgba(255,180,80,.98),0 0 26px 10px rgba(255,100,0,.60)',animation:'spkT 2.4s ease-in-out infinite',zIndex:10 }} />
                  <div style={{ position:'absolute',bottom:-8,left:'50%',width:7,height:7,borderRadius:'50%',background:'#fff',boxShadow:'0 0 11px 4px rgba(200,100,255,.95),0 0 24px 8px rgba(140,0,255,.58)',animation:'spkB 3.0s ease-in-out infinite .60s',zIndex:10 }} />
                  <div style={{ position:'absolute',left:-8,top:'50%',width:7,height:7,borderRadius:'50%',background:'#fff',boxShadow:'0 0 11px 4px rgba(255,80,40,.95),0 0 24px 8px rgba(200,0,0,.58)',animation:'spkL 2.8s ease-in-out infinite 1.0s',zIndex:10 }} />
                  <div style={{ position:'absolute',right:-8,top:'50%',width:8,height:8,borderRadius:'50%',background:'#fff',boxShadow:'0 0 12px 5px rgba(255,160,60,.95),0 0 26px 10px rgba(200,80,0,.58)',animation:'spkR 3.3s ease-in-out infinite 1.5s',zIndex:10 }} />
                  <div style={{ position:'absolute',top:'12%',left:'12%',width:6,height:6,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px 3px rgba(255,120,60,.92)',animation:'spkD 3.7s ease-in-out infinite .25s',zIndex:10 }} />
                  <div style={{ position:'absolute',top:'12%',right:'12%',width:6,height:6,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px 3px rgba(200,80,255,.92)',animation:'spkD 4.1s ease-in-out infinite .78s',zIndex:10 }} />
                  <div style={{ position:'absolute',bottom:'12%',left:'12%',width:5,height:5,borderRadius:'50%',background:'#fff',boxShadow:'0 0 7px 2px rgba(255,140,40,.90)',animation:'spkD 3.5s ease-in-out infinite 1.2s',zIndex:10 }} />
                  <div style={{ position:'absolute',bottom:'12%',right:'12%',width:6,height:6,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px 3px rgba(255,80,20,.92)',animation:'spkD 3.9s ease-in-out infinite 1.8s',zIndex:10 }} />
                </div>
              </div>{/* /float */}

              {/* Name — letter spacing reduced from 0.22em to 0.06em */}
              <h1 style={{ fontSize:26,fontWeight:700,letterSpacing:'0.06em',
                background:'linear-gradient(135deg,#fff 0%,#e0c8ff 25%,#c8e0ff 55%,#fff 100%)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
                marginBottom:20,textAlign:'center',animation:'nglow 5s ease-in-out infinite' }}>
                {profile.display_name ?? 'No Name'}
              </h1>

              <div style={{ width:48,height:2,borderRadius:2,
                background:'linear-gradient(90deg,#ff006e,#9900ff,#0088ff,#00ffcc)',
                marginBottom:profile.bio?20:0,animation:'hue 6s linear infinite',
                boxShadow:'0 0 12px 4px rgba(140,0,255,.50)' }} />

              {profile.bio && (
                <p style={{ fontSize:13,textAlign:'center',lineHeight:1.95,maxWidth:260,color:'rgba(210,190,255,.55)',letterSpacing:'0.04em',marginTop:12 }}>
                  {profile.bio}
                </p>
              )}
            </div>{/* /profile */}

            {/* Prismatic divider */}
            <div style={{ height:1.5,borderRadius:1,
              background:'linear-gradient(90deg,transparent,rgba(255,0,110,.88),rgba(140,0,255,.88),rgba(0,160,255,.88),rgba(0,255,180,.88),transparent)',
              marginBottom:36,animation:'hue 8s linear infinite',
              boxShadow:'0 0 8px 2px rgba(140,0,255,.30)' }} />

            {/* ── Links ── */}
            <MixedLinks links={textLinks} gap="gap-4" renderTextLink={(link,index)=>(
              <div key={link.id} style={{ position:'relative',animation:`fadeUp .70s cubic-bezier(.22,1,.36,1) ${.08+index*.12}s backwards` }}>
                <div style={{ position:'absolute',inset:-10,borderRadius:26,pointerEvents:'none',
                  background:'linear-gradient(135deg,rgba(255,0,110,.28),rgba(160,0,255,.28),rgba(0,140,255,.28),rgba(0,210,255,.28))',
                  filter:'blur(16px)',
                  animation:`hue 8s linear ${-index*1.1}s infinite, cGlow 2.8s ease-in-out ${-index*0.6}s infinite` }} />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="a-lnk"
                  style={{ position:'relative',borderRadius:16,padding:1 }}>
                  <div className="a-border" style={{ animationDelay:`-${index*1.1}s` }} />
                  <div style={{ position:'relative',zIndex:1,borderRadius:15,padding:'18px 32px',
                    background:'rgba(4,2,22,.88)',backdropFilter:'blur(36px)',WebkitBackdropFilter:'blur(36px)',
                    textAlign:'center',overflow:'hidden' }}>
                    <div className="a-shimmer" />
                    <span style={{ position:'absolute',left:0,top:0,bottom:0,width:3,borderRadius:'15px 0 0 15px',
                      background:'linear-gradient(180deg,#ff006e,#9900ff,#0088ff,#00ffcc)',opacity:.80,
                      animation:`hue 8s linear ${-index*1.1}s infinite` }} />
                    <span style={{ fontSize:14,fontWeight:600,letterSpacing:'.11em',color:'rgba(230,218,255,.96)',position:'relative' }}>
                      {link.title}
                    </span>
                  </div>
                </a>
              </div>
            )} />

            <GallerySection photos={galleryPhotos} />

            {/* Bottom divider */}
            <div style={{ height:1,borderRadius:1,
              background:'linear-gradient(90deg,transparent,rgba(140,0,255,.60),rgba(0,180,255,.60),transparent)',
              marginTop:64,marginBottom:24,animation:'hue 12s linear infinite' }} />

            {/* Logo */}
            {!profile.logo_removed && (
              <div style={{ display:'flex', justifyContent:'center', paddingBottom:8 }}>
                <a href="/" style={{ display:'flex', alignItems:'center', gap:4, opacity:.75, textDecoration:'none' }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#d4af37', display:'inline-block', flexShrink:0 }} />
                  <span style={{ fontSize:12, fontWeight:600, color:'#d4af37', letterSpacing:'0.05em' }}>
                    Powered by <strong style={{ color:'#d4af37' }}>Veyra</strong>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
