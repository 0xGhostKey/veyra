import { cache } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { THEME_REGISTRY, THEME_BODY_CSS } from '@/lib/theme-registry'
import FreeBasicTheme from '@/themes/free_basic'
import type { Profile, Link } from '@/types'

type Props = {
  params: Promise<{ user_id: string }>
}

const fetchProfile = cache(async (user_id: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user_id)
    .single()
  return data as Profile | null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { user_id } = await params
  const profile = await fetchProfile(user_id)

  if (!profile) return { title: 'Not Found' }

  return {
    title: `${profile.display_name ?? 'Profile'} | Veyra`,
    description: profile.bio ?? 'Veyra プロフィールページ',
  }
}

export default async function PublicProfilePage({ params }: Props) {
  const { user_id } = await params
  const profile = await fetchProfile(user_id)

  if (!profile) notFound()

  const supabase = await createClient()
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const activeLinks: Link[] = links ?? []

  const effectiveProfile = profile.role === 'admin'
    ? { ...profile, logo_removed: true }
    : profile

  return (
    <ThemeRenderer
      profile={effectiveProfile}
      links={activeLinks}
      themeId={profile.selected_theme}
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
  const css = THEME_BODY_CSS[themeId] ?? `html, body { background-color: #0a0a0a !important; }`
  const ThemeComponent = THEME_REGISTRY[themeId] ?? FreeBasicTheme

  return (
    <>
      <style>{css}</style>
      <ThemeComponent profile={profile} links={links} />
    </>
  )
}
