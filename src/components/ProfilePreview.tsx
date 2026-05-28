import type { Profile, Link } from '@/types'
import { getThemeComponent } from '@/lib/theme-registry'

type ProfilePreviewProps = {
  profile: Profile
  links: Link[]
  themeId?: string
}

export default function ProfilePreview({ profile, links, themeId }: ProfilePreviewProps) {
  const ThemeComponent = getThemeComponent(themeId ?? profile.selected_theme)

  return (
    <div className="w-full h-full overflow-hidden rounded-2xl">
      <ThemeComponent profile={profile} links={links} />
    </div>
  )
}
