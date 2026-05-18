import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import GallerySection from '@/components/GallerySection'
import MixedLinks from '@/components/MixedLinks'

type Props = { profile: Profile; links: Link[] }

export default function PremiumAuraTheme({ profile, links }: Props) {
  const textLinks = links.filter((l) => l.link_type === 'text')
  const galleryPhotos = links.filter((l) => l.link_type === 'gallery')

  return (
    <>
      <style>{`
        html, body {
          background-color: #020208 !important;
          margin: 0; padding: 0;
        }

        /* ── Keyframes ── */
        @keyframes auraOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes auraOrbitCCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes orbDrift1 {
          0%,100% { transform: translate(0px, 0px); opacity: 0.18; }
          33%      { transform: translate(28px, -38px); opacity: 0.26; }
          66%      { transform: translate(-18px, 22px); opacity: 0.14; }
        }
        @keyframes orbDrift2 {
          0%,100% { transform: translate(0px, 0px); opacity: 0.15; }
          50%      { transform: translate(-32px, 26px); opacity: 0.22; }
        }
        @keyframes orbDrift3 {
          0%,100% { opacity: 0.1; }
          50%      { opacity: 0.16; }
        }
        @keyframes prismSpin {
          from { filter: hue-rotate(0deg); }
          to   { filter: hue-rotate(360deg); }
        }
        @keyframes prismSpinSlow {
          from { filter: hue-rotate(0deg); }
          to   { filter: hue-rotate(360deg); }
        }
        @keyframes avatarHalo {
          0%,100% { opacity: 0.42; transform: scale(1); }
          50%      { opacity: 0.58; transform: scale(1.04); }
        }
        @keyframes nameShimmer {
          0%,100% {
            filter:
              drop-shadow(0 0 12px rgba(160, 80, 255, 0.28))
              drop-shadow(0 0 24px rgba(80, 160, 255, 0.16));
          }
          50% {
            filter:
              drop-shadow(0 0 20px rgba(255, 80, 170, 0.35))
              drop-shadow(0 0 40px rgba(80, 210, 255, 0.22));
          }
        }
        @keyframes dividerPulse {
          from { filter: hue-rotate(0deg); opacity: 0.8; }
          to   { filter: hue-rotate(360deg); opacity: 0.8; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes borderShift {
          from { filter: hue-rotate(0deg); }
          to   { filter: hue-rotate(360deg); }
        }

        /* ── Link button shimmer ── */
        .aura-link-inner {
          position: relative;
          overflow: hidden;
        }
        .aura-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            108deg,
            transparent 20%,
            rgba(255,255,255,0.08) 50%,
            transparent 80%
          );
          transform: translateX(-110%);
          pointer-events: none;
          border-radius: inherit;
        }
        .aura-link:hover .aura-shimmer {
          transform: translateX(110%);
          transition: transform 0.55s ease;
        }
        .aura-link:active { transform: scale(0.985); transition: transform 0.1s; }
      `}</style>

      {/* ══════════════════════════════════════
          Background layers — fixed, pointer-events: none
      ══════════════════════════════════════ */}

      {/* L1 · Main rotating nebula (huge, very blurred) */}
      <div aria-hidden style={{
        position: 'fixed', top: '40%', left: '50%',
        width: '240vw', height: '240vw',
        background: 'conic-gradient(from 0deg, #ff0077 0%, #8800ff 14%, #0044ff 28%, #00e5cc 42%, #00ff88 56%, #ffaa00 70%, #ff0077 100%)',
        borderRadius: '50%',
        filter: 'blur(110px)',
        animation: 'auraOrbit 38s linear infinite',
        opacity: 0.10,
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
      }} />

      {/* L2 · Counter-rotating inner disc */}
      <div aria-hidden style={{
        position: 'fixed', top: '48%', left: '50%',
        width: '140vw', height: '140vw',
        background: 'conic-gradient(from 80deg, #cc00ff 0%, #0088ff 33%, #00ffcc 66%, #cc00ff 100%)',
        borderRadius: '50%',
        filter: 'blur(78px)',
        animation: 'auraOrbitCCW 25s linear infinite',
        opacity: 0.08,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* L3 · Top-left violet orb */}
      <div aria-hidden style={{
        position: 'fixed', top: '6%', left: '12%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(circle at 40% 40%, #aa00ff 0%, transparent 68%)',
        borderRadius: '50%',
        filter: 'blur(56px)',
        animation: 'orbDrift1 22s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* L4 · Bottom-right cyan orb */}
      <div aria-hidden style={{
        position: 'fixed', bottom: '10%', right: '6%',
        width: '34vw', height: '34vw',
        background: 'radial-gradient(circle at 60% 60%, #00ccff 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(48px)',
        animation: 'orbDrift2 28s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* L5 · Center-bottom rose orb */}
      <div aria-hidden style={{
        position: 'fixed', bottom: '22%', left: '50%',
        transform: 'translateX(-50%)',
        width: '55vw', height: '32vw',
        background: 'radial-gradient(ellipse at center, #ff0088 0%, transparent 68%)',
        borderRadius: '50%',
        filter: 'blur(64px)',
        animation: 'orbDrift3 16s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ══════════════════════════════════════
          Content
      ══════════════════════════════════════ */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 16px 52px',
        position: 'relative',
        zIndex: 1,
        overflowX: 'hidden',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* ── Top prismatic divider ── */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,110,0.6) 20%, rgba(130,0,255,0.6) 40%, rgba(0,180,255,0.6) 60%, rgba(0,255,180,0.6) 80%, transparent 100%)',
            marginBottom: 56,
            animation: 'dividerPulse 9s linear infinite',
          }} />

          {/* ── Profile ── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 48,
          }}>

            {/* Avatar with triple-ring + halo */}
            <div style={{ position: 'relative', width: 116, height: 116, marginBottom: 26 }}>

              {/* Outer soft halo */}
              <div style={{
                position: 'absolute',
                inset: -12,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #ff0077, #8800ff, #0055ff, #00ffcc, #ff0077)',
                filter: 'blur(16px)',
                animation: 'prismSpin 6s linear infinite, avatarHalo 4s ease-in-out infinite',
              }} />

              {/* Spinning prism ring */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #ff006e, #9900ff, #0055ff, #00e5cc, #aaff00, #ff9900, #ff006e)',
                animation: 'prismSpin 5s linear infinite',
              }} />

              {/* Separator ring */}
              <div style={{
                position: 'absolute',
                inset: 3,
                borderRadius: '50%',
                background: '#04020e',
              }} />

              {/* Avatar content */}
              <div style={{
                position: 'absolute',
                inset: 6,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0d0820, #081828)',
              }}>
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name ?? ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{
                    fontSize: 40,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ffb0e0, #c0a0ff, #a0d4ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                  }}>
                    {(profile.display_name ?? 'U')[0].toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Display name */}
            <h1 style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.17em',
              background: 'linear-gradient(135deg, #ffffff 0%, #e0c8ff 30%, #c8e0ff 65%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 14,
              textAlign: 'center',
              animation: 'nameShimmer 6s ease-in-out infinite',
            }}>
              {profile.display_name ?? 'No Name'}
            </h1>

            {/* Prismatic accent line */}
            <div style={{
              width: 40,
              height: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #ff006e, #9900ff, #0088ff, #00ffcc)',
              marginBottom: profile.bio ? 16 : 0,
              animation: 'borderShift 7s linear infinite',
            }} />

            {profile.bio && (
              <p style={{
                fontSize: 13,
                textAlign: 'center',
                lineHeight: 1.8,
                maxWidth: 256,
                color: 'rgba(200,180,255,0.48)',
                letterSpacing: '0.03em',
                marginTop: 6,
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
                className="aura-link"
                style={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: 16,
                  padding: 1,
                  background: 'linear-gradient(135deg, rgba(255,0,110,0.45) 0%, rgba(140,0,255,0.45) 33%, rgba(0,140,255,0.45) 66%, rgba(0,255,180,0.45) 100%)',
                  animation: `fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) ${0.06 + index * 0.07}s backwards, borderShift 11s linear infinite`,
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Glass inner */}
                <div
                  className="aura-link-inner"
                  style={{
                    borderRadius: 15,
                    padding: '15px 28px',
                    background: 'rgba(4, 2, 18, 0.87)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    textAlign: 'center',
                  }}
                >
                  <div className="aura-shimmer" />

                  {/* Left prismatic accent bar */}
                  <span style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0,
                    width: 2.5,
                    borderRadius: '16px 0 0 16px',
                    background: 'linear-gradient(180deg, #ff006e 0%, #9900ff 50%, #0088ff 100%)',
                    opacity: 0.6,
                    animation: 'borderShift 8s linear infinite',
                  }} />

                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: 'rgba(220,205,255,0.92)',
                    position: 'relative',
                  }}>
                    {link.title}
                  </span>
                </div>
              </a>
            )}
          />

          <GallerySection photos={galleryPhotos} />

          {/* ── Bottom divider ── */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(130,0,255,0.45) 30%, rgba(0,180,255,0.45) 70%, transparent 100%)',
            marginTop: 52,
            marginBottom: 24,
            animation: 'dividerPulse 13s linear infinite',
          }} />

          {/* Logo */}
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
