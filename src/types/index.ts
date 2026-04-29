export type Profile = {
  id: string
  user_id: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  selected_theme: string
  logo_removed: boolean
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export type Link = {
  id: string
  profile_id: string
  title: string
  url: string
  icon_type: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Theme = {
  id: string
  name: string
  description: string
  price: number
  is_free: boolean
  is_animated: boolean
  stripe_price_id: string | null
  created_at: string
}

export type Purchase = {
  id: string
  user_id: string
  item_type: 'logo_remove' | 'theme' | 'theme_pack'
  item_id: string
  amount: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  status: 'paid' | 'failed' | 'refunded'
  created_at: string
}

export type ThemeDefinition = {
  id: string
  name: string
  description: string
  price: number
  isFree: boolean
  isAnimated: boolean
  stripePriceId: string | null
  previewColors: string[]
}
