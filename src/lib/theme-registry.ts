import type { ComponentType } from 'react'
import type { Profile, Link } from '@/types'
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

export type ThemeComponent = ComponentType<{ profile: Profile; links: Link[] }>

export const THEME_REGISTRY: Record<string, ThemeComponent> = {
  free_basic: FreeBasicTheme,
  free_dark: FreeDarkTheme,
  luxury_black: LuxuryBlackTheme,
  luxury_navy: LuxuryNavyTheme,
  luxury_ivory: LuxuryIvoryTheme,
  neon_glow: NeonGlowTheme,
  neon_amber: NeonAmberTheme,
  neon_violet: NeonVioletTheme,
  sakura_white: SakuraWhiteTheme,
  sakura_dusk: SakuraDuskTheme,
  sakura_matcha: SakuraMatchaTheme,
  chrome_silver: ChromeSilverTheme,
  chrome_gold: ChromeGoldTheme,
  chrome_platinum: ChromePlatinumTheme,
  chrome_void: ChromeVoidTheme,
  ocean_abyss: OceanAbyssTheme,
  ocean_lagoon: OceanLagoonTheme,
  ocean_arctic: OceanArcticTheme,
  snow_night: SnowNightTheme,
  snow_aurora: SnowAuroraTheme,
  snow_powder: SnowPowderTheme,
  ember_red: EmberRedTheme,
  ember_ash: EmberAshTheme,
  ember_gold: EmberGoldTheme,
  botanical_moss: BotanicalMossTheme,
  botanical_ivory: BotanicalIvoryTheme,
  botanical_earth: BotanicalEarthTheme,
  glitch_green: GlitchGreenTheme,
  glitch_white: GlitchWhiteTheme,
  glitch_red: GlitchRedTheme,
}

export const THEME_BODY_CSS: Record<string, string> = {
  free_basic:       `html, body { background-color: #f5f5f7 !important; }`,
  free_dark:        `html, body { background-color: #0a0a0a !important; }`,
  luxury_black:     `html, body { background-color: #0a0a0a !important; }`,
  luxury_navy:      `html, body { background-color: #0a0f1e !important; }`,
  luxury_ivory:     `html, body { background-color: #f8f5ef !important; }`,
  neon_glow:        `html, body { background-color: #0d0d0d !important; }`,
  neon_amber:       `html, body { background-color: #0a0800 !important; }`,
  neon_violet:      `html, body { background-color: #050510 !important; }`,
  sakura_white:     `html, body { background-color: #fdf6f8 !important; }`,
  sakura_dusk:      `html, body { background-color: #13090d !important; }`,
  sakura_matcha:    `html, body { background-color: #0a100a !important; }`,
  chrome_silver:    `html, body { background-color: #0e0f11 !important; }`,
  chrome_gold:      `html, body { background-color: #0c0a00 !important; }`,
  chrome_platinum:  `html, body { background-color: #08090c !important; }`,
  chrome_void:      `html, body { background-color: #03040a !important; }`,
  ocean_abyss:      `html, body { background-color: #020c14 !important; }`,
  ocean_lagoon:     `html, body { background-color: #02100e !important; }`,
  ocean_arctic:     `html, body { background-color: #04080e !important; }`,
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

export function getThemeComponent(themeId: string): ThemeComponent {
  return THEME_REGISTRY[themeId] ?? FreeBasicTheme
}
