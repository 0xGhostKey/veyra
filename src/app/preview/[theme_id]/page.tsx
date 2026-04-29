import { notFound } from 'next/navigation'
import { THEMES } from '@/themes'
import FreeBasicTheme from '@/themes/free_basic'
import FreeDarkTheme from '@/themes/free_dark'
import LuxuryBlackTheme from '@/themes/luxury_black'
import GlassPremiumTheme from '@/themes/glass_premium'
import NeonGlowTheme from '@/themes/neon_glow'
import AnimatedAuroraTheme from '@/themes/animated_aurora'
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
  { id: '1', profile_id: 'preview', title: 'Instagram', url: '#', icon_type: null, sort_order: 0, is_active: true, created_at: '', updated_at: '' },
  { id: '2', profile_id: 'preview', title: 'Portfolio', url: '#', icon_type: null, sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '3', profile_id: 'preview', title: 'Online Shop', url: '#', icon_type: null, sort_order: 2, is_active: true, created_at: '', updated_at: '' },
]

export default async function ThemePreviewPage({ params }: Props) {
  const { theme_id } = await params
  const theme = THEMES.find((t) => t.id === theme_id)
  if (!theme) notFound()

  switch (theme_id) {
    case 'free_basic':
      return <FreeBasicTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
    case 'free_dark':
      return <FreeDarkTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
    case 'luxury_black':
      return <LuxuryBlackTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
    case 'glass_premium':
      return <GlassPremiumTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
    case 'neon_glow':
      return <NeonGlowTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
    case 'animated_aurora':
      return <AnimatedAuroraTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
    default:
      notFound()
  }
}
