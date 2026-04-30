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

const THEME_BODY_CSS: Record<string, string> = {
  free_basic: `html, body { background-color: #f5f5f7 !important; }`,
  free_dark: `html, body { background-color: #0a0a0a !important; }`,
  luxury_black: `html, body { background-color: #0a0a0a !important; }`,
  glass_premium: `html, body { background: transparent !important; }`,
  neon_glow: `html, body { background-color: #0d0d0d !important; }`,
  animated_aurora: `html, body { background: transparent !important; }`,
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
    case 'glass_premium':
      content = <GlassPremiumTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'neon_glow':
      content = <NeonGlowTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
      break
    case 'animated_aurora':
      content = <AnimatedAuroraTheme profile={DUMMY_PROFILE} links={DUMMY_LINKS} />
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
