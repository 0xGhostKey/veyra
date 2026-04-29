import type { Profile, Link } from '@/types'
import FreeBasicTheme from '@/themes/free_basic'
import FreeDarkTheme from '@/themes/free_dark'
import LuxuryBlackTheme from '@/themes/luxury_black'
import GlassPremiumTheme from '@/themes/glass_premium'
import NeonGlowTheme from '@/themes/neon_glow'
import AnimatedAuroraTheme from '@/themes/animated_aurora'

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
    case 'glass_premium':
      return GlassPremiumTheme
    case 'neon_glow':
      return NeonGlowTheme
    case 'animated_aurora':
      return AnimatedAuroraTheme
    default:
      return FreeBasicTheme
  }
}
