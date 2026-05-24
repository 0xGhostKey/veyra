import { notFound } from 'next/navigation'
import { THEMES } from '@/themes'
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
  params: Promise<{ theme_id: string }>
}

const DUMMY_PROFILE: Profile = {
  id: 'preview',
  user_id: 'preview',
  display_name: 'Yuna',
  bio: 'photographer · Tokyo',
  avatar_url: null,
  selected_theme: 'free_basic',
  logo_removed: false,
  role: 'user',
  created_at: '',
  updated_at: '',
}

const DUMMY_LINKS: Link[] = [
  { id: '1', profile_id: 'preview', title: 'Instagram', url: '#', icon_type: null, link_type: 'text', image_url: null, link_size: 'small', sort_order: 0, is_active: true, created_at: '', updated_at: '' },
  { id: '2', profile_id: 'preview', title: 'Portfolio', url: '#', icon_type: null, link_type: 'text', image_url: null, link_size: 'small', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '3', profile_id: 'preview', title: 'Online Shop', url: '#', icon_type: null, link_type: 'text', image_url: null, link_size: 'small', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
]

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

export default async function ThemePreviewPage({ params }: Props) {
  const { theme_id } = await params
  const theme = THEMES.find((t) => t.id === theme_id)
  if (!theme) notFound()

  const css = THEME_BODY_CSS[theme_id] ?? `html, body { background-color: #0a0a0a !important; }`

  let content
  switch (theme_id) {
    case 'free_basic':
      content = <FreeBasicTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'free_dark':
      content = <FreeDarkTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'luxury_black':
      content = <LuxuryBlackTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'luxury_navy':
      content = <LuxuryNavyTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'luxury_ivory':
      content = <LuxuryIvoryTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'neon_glow':
      content = <NeonGlowTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'neon_amber':
      content = <NeonAmberTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'neon_violet':
      content = <NeonVioletTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'sakura_white':
      content = <SakuraWhiteTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'sakura_dusk':
      content = <SakuraDuskTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'sakura_matcha':
      content = <SakuraMatchaTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'chrome_silver':
      content = <ChromeSilverTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'chrome_gold':
      content = <ChromeGoldTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'chrome_platinum':
      content = <ChromePlatinumTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'chrome_void':
      content = <ChromeVoidTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'ocean_abyss':
      content = <OceanAbyssTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'ocean_lagoon':
      content = <OceanLagoonTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'ocean_arctic':
      content = <OceanArcticTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'snow_night':
      content = <SnowNightTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'snow_aurora':
      content = <SnowAuroraTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'snow_powder':
      content = <SnowPowderTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'ember_red':
      content = <EmberRedTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'ember_ash':
      content = <EmberAshTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'ember_gold':
      content = <EmberGoldTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'botanical_moss':
      content = <BotanicalMossTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'botanical_ivory':
      content = <BotanicalIvoryTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'botanical_earth':
      content = <BotanicalEarthTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'glitch_green':
      content = <GlitchGreenTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'glitch_white':
      content = <GlitchWhiteTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'glitch_red':
      content = <GlitchRedTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    default:
      notFound()
  }

  return (
    <>
      <style>{css}</style>
      {content}
    </>
  )
}
