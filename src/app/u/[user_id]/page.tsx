import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import FreeBasicTheme from '@/themes/free_basic'
import FreeDarkTheme from '@/themes/free_dark'
import LuxuryBlackTheme from '@/themes/luxury_black'
import LuxuryNavyTheme from '@/themes/luxury_navy'
import LuxuryIvoryTheme from '@/themes/luxury_ivory'
import NeonGlowTheme from '@/themes/neon_glow'
import NeonAmberTheme from '@/themes/neon_amber'
import NeonVioletTheme from '@/themes/neon_violet'
import SakuraWhiteTheme from '@/themes/sakura_white'
import SakuraDuskTheme from '@/themes/sakura_dusk'
import SakuraMatchaTheme from '@/themes/sakura_matcha'
import ChromeSilverTheme from '@/themes/chrome_silver'
import ChromeGoldTheme from '@/themes/chrome_gold'
import ChromePlatinumTheme from '@/themes/chrome_platinum'
import ChromeVoidTheme from '@/themes/chrome_void'
import OceanAbyssTheme from '@/themes/ocean_abyss'
import OceanLagoonTheme from '@/themes/ocean_lagoon'
import OceanArcticTheme from '@/themes/ocean_arctic'
import SnowNightTheme from '@/themes/snow_night'
import SnowAuroraTheme from '@/themes/snow_aurora'
import SnowPowderTheme from '@/themes/snow_powder'
import EmberRedTheme from '@/themes/ember_red'
import EmberAshTheme from '@/themes/ember_ash'
import EmberGoldTheme from '@/themes/ember_gold'
import BotanicalMossTheme from '@/themes/botanical_moss'
import BotanicalIvoryTheme from '@/themes/botanical_ivory'
import BotanicalEarthTheme from '@/themes/botanical_earth'
import GlitchGreenTheme from '@/themes/glitch_green'
import GlitchWhiteTheme from '@/themes/glitch_white'
import GlitchRedTheme from '@/themes/glitch_red'
import type { Profile, Link } from '@/types'

type Props = {
  params: Promise<{ user_id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { user_id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, bio')
    .eq('user_id', user_id)
    .single()

  if (!profile) {
    return { title: 'Not Found' }
  }

  return {
    title: `${profile.display_name ?? 'Profile'} | Veyra`,
    description: profile.bio ?? 'Veyra プロフィールページ',
  }
}

export default async function PublicProfilePage({ params }: Props) {
  const { user_id } = await params
  const supabase = await createClient()

  // プロフィール取得
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user_id)
    .single()

  if (!profile) {
    notFound()
  }

  // アクティブなリンク取得
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const activeLinks: Link[] = links ?? []

  const resolvedProfile = profile as Profile
  const effectiveProfile = resolvedProfile.role === 'admin'
    ? { ...resolvedProfile, logo_removed: true }
    : resolvedProfile

  return (
    <ThemeRenderer
      profile={effectiveProfile}
      links={activeLinks}
      themeId={resolvedProfile.selected_theme}
    />
  )
}

const THEME_BODY_CSS: Record<string, string> = {
  free_basic: `html, body { background-color: #f5f5f7 !important; }`,
  free_dark: `html, body { background-color: #0a0a0a !important; }`,
  luxury_black: `html, body { background-color: #0a0a0a !important; }`,
  luxury_navy: `html, body { background-color: #0a0f1e !important; }`,
  luxury_ivory: `html, body { background-color: #f8f5ef !important; }`,
  neon_glow: `html, body { background-color: #0d0d0d !important; }`,
  neon_amber: `html, body { background-color: #0a0800 !important; }`,
  neon_violet: `html, body { background-color: #050510 !important; }`,
  sakura_white: `html, body { background-color: #fdf6f8 !important; }`,
  sakura_dusk: `html, body { background-color: #13090d !important; }`,
  sakura_matcha: `html, body { background-color: #0a100a !important; }`,
  chrome_silver: `html, body { background-color: #0e0f11 !important; }`,
  chrome_gold: `html, body { background-color: #0c0a00 !important; }`,
  chrome_platinum: `html, body { background-color: #08090c !important; }`,
  chrome_void: `html, body { background-color: #03040a !important; }`,
  ocean_abyss: `html, body { background-color: #020c14 !important; }`,
  ocean_lagoon: `html, body { background-color: #02100e !important; }`,
  ocean_arctic: `html, body { background-color: #04080e !important; }`,
  snow_night:       `html, body { background-color: #020615 !important; }`,
  snow_aurora:      `html, body { background-color: #08060f !important; }`,
  snow_powder:      `html, body { background-color: #f0f5ff !important; }`,
  ember_red:        `html, body { background-color: #0f0300 !important; }`,
  ember_ash:        `html, body { background-color: #111010 !important; }`,
  ember_gold:       `html, body { background-color: #0c0700 !important; }`,
  botanical_moss:   `html, body { background-color: #080c05 !important; }`,
  botanical_ivory:  `html, body { background-color: #f5f0e8 !important; }`,
  botanical_earth:  `html, body { background-color: #1a1008 !important; }`,
  glitch_green:     `html, body { background-color: #000800 !important; }`,
  glitch_white:     `html, body { background-color: #0a0a0a !important; }`,
  glitch_red:       `html, body { background-color: #080000 !important; }`,
}

function ThemeRenderer({
  profile,
  links,
  themeId,
}: {
  profile: Profile
  links: Link[]
  themeId: string
}) {
  const css = THEME_BODY_CSS[themeId] ?? `html, body { background-color: #0a0a0a !important; }`

  return (
    <>
      <style>{css}</style>
      {(() => {
        switch (themeId) {
          case 'free_basic':
            return <FreeBasicTheme profile={profile} links={links} />
          case 'free_dark':
            return <FreeDarkTheme profile={profile} links={links} />
          case 'luxury_black':
            return <LuxuryBlackTheme profile={profile} links={links} />
          case 'luxury_navy':
            return <LuxuryNavyTheme profile={profile} links={links} />
          case 'luxury_ivory':
            return <LuxuryIvoryTheme profile={profile} links={links} />
          case 'neon_glow':
            return <NeonGlowTheme profile={profile} links={links} />
          case 'neon_amber':
            return <NeonAmberTheme profile={profile} links={links} />
          case 'neon_violet':
            return <NeonVioletTheme profile={profile} links={links} />
          case 'sakura_white':
            return <SakuraWhiteTheme profile={profile} links={links} />
          case 'sakura_dusk':
            return <SakuraDuskTheme profile={profile} links={links} />
          case 'sakura_matcha':
            return <SakuraMatchaTheme profile={profile} links={links} />
          case 'chrome_silver':
            return <ChromeSilverTheme profile={profile} links={links} />
          case 'chrome_gold':
            return <ChromeGoldTheme profile={profile} links={links} />
          case 'chrome_platinum':
            return <ChromePlatinumTheme profile={profile} links={links} />
          case 'chrome_void':
            return <ChromeVoidTheme profile={profile} links={links} />
          case 'ocean_abyss':
            return <OceanAbyssTheme profile={profile} links={links} />
          case 'ocean_lagoon':
            return <OceanLagoonTheme profile={profile} links={links} />
          case 'ocean_arctic':
            return <OceanArcticTheme profile={profile} links={links} />
          case 'snow_night':
            return <SnowNightTheme profile={profile} links={links} />
          case 'snow_aurora':
            return <SnowAuroraTheme profile={profile} links={links} />
          case 'snow_powder':
            return <SnowPowderTheme profile={profile} links={links} />
          case 'ember_red':
            return <EmberRedTheme profile={profile} links={links} />
          case 'ember_ash':
            return <EmberAshTheme profile={profile} links={links} />
          case 'ember_gold':
            return <EmberGoldTheme profile={profile} links={links} />
          case 'botanical_moss':
            return <BotanicalMossTheme profile={profile} links={links} />
          case 'botanical_ivory':
            return <BotanicalIvoryTheme profile={profile} links={links} />
          case 'botanical_earth':
            return <BotanicalEarthTheme profile={profile} links={links} />
          case 'glitch_green':
            return <GlitchGreenTheme profile={profile} links={links} />
          case 'glitch_white':
            return <GlitchWhiteTheme profile={profile} links={links} />
          case 'glitch_red':
            return <GlitchRedTheme profile={profile} links={links} />
          default:
            return <FreeBasicTheme profile={profile} links={links} />
        }
      })()}
    </>
  )
}
