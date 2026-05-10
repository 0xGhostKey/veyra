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
          default:
            return <FreeBasicTheme profile={profile} links={links} />
        }
      })()}
    </>
  )
}
