import type { Profile, Link } from '@/types'
import FreeBasicTheme from '@/themes/free_basic'
import FreeDarkTheme from '@/themes/free_dark'
import LuxuryBlackTheme from '@/themes/luxury_black'
import LuxuryNavyTheme from '@/themes/luxury_navy'
import LuxuryIvoryTheme from '@/themes/luxury_ivory'
import NeonGlowTheme from '@/themes/neon_glow'
import NeonAmberTheme from '@/themes/neon_amber'
import NeonVioletTheme from '@/themes/neon_violet'
import EmberRedTheme from '@/themes/ember_red'
import EmberAshTheme from '@/themes/ember_ash'
import EmberGoldTheme from '@/themes/ember_gold'
import BotanicalMossTheme from '@/themes/botanical_moss'
import BotanicalIvoryTheme from '@/themes/botanical_ivory'
import BotanicalEarthTheme from '@/themes/botanical_earth'
import GlitchGreenTheme from '@/themes/glitch_green'
import GlitchWhiteTheme from '@/themes/glitch_white'
import GlitchRedTheme from '@/themes/glitch_red'

type ProfilePreviewProps = {
  profile: Profile
  links: Link[]
  themeId?: string
}

export default function ProfilePreview({ profile, links, themeId }: ProfilePreviewProps) {
  const activeTheme = themeId ?? profile.selected_theme

  const ThemeComponent = getThemeComponent(activeTheme)

  return (
    <div className="w-full h-full overflow-hidden rounded-2xl">
      <ThemeComponent profile={profile} links={links} />
    </div>
  )
}

function getThemeComponent(themeId: string) {
  switch (themeId) {
    case 'free_basic':
      return FreeBasicTheme
    case 'free_dark':
      return FreeDarkTheme
    case 'luxury_black':
      return LuxuryBlackTheme
    case 'luxury_navy':
      return LuxuryNavyTheme
    case 'luxury_ivory':
      return LuxuryIvoryTheme
    case 'neon_glow':
      return NeonGlowTheme
    case 'neon_amber':
      return NeonAmberTheme
    case 'neon_violet':
      return NeonVioletTheme
    case 'ember_red':
      return EmberRedTheme
    case 'ember_ash':
      return EmberAshTheme
    case 'ember_gold':
      return EmberGoldTheme
    case 'botanical_moss':
      return BotanicalMossTheme
    case 'botanical_ivory':
      return BotanicalIvoryTheme
    case 'botanical_earth':
      return BotanicalEarthTheme
    case 'glitch_green':
      return GlitchGreenTheme
    case 'glitch_white':
      return GlitchWhiteTheme
    case 'glitch_red':
      return GlitchRedTheme
    default:
      return FreeBasicTheme
  }
}
