import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import FreeBasicTheme from '@/themes/free_basic'
import FreeDarkTheme from '@/themes/free_dark'
import LuxuryBlackTheme from '@/themes/luxury_black'
import GlassPremiumTheme from '@/themes/glass_premium'
import NeonGlowTheme from '@/themes/neon_glow'
import AnimatedAuroraTheme from '@/themes/animated_aurora'
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

function ThemeRenderer({
  profile,
  links,
  themeId,
}: {
  profile: Profile
  links: Link[]
  themeId: string
}) {
  switch (themeId) {
    case 'free_basic':
      return <FreeBasicTheme profile={profile} links={links} />
    case 'free_dark':
      return <FreeDarkTheme profile={profile} links={links} />
    case 'luxury_black':
      return <LuxuryBlackTheme profile={profile} links={links} />
    case 'glass_premium':
      return <GlassPremiumTheme profile={profile} links={links} />
    case 'neon_glow':
      return <NeonGlowTheme profile={profile} links={links} />
    case 'animated_aurora':
      return <AnimatedAuroraTheme profile={profile} links={links} />
    default:
      return <FreeBasicTheme profile={profile} links={links} />
  }
}
