import type { ThemeDefinition } from '@/types'

export const THEMES: ThemeDefinition[] = [
  {
    id: 'free_basic',
    name: 'Basic',
    description: 'シンプルで清潔感のある白背景テーマ',
    price: 0,
    isFree: true,
    isAnimated: false,
    stripePriceId: null,
    previewColors: ['#ffffff', '#f3f4f6', '#111827'],
  },
  {
    id: 'free_dark',
    name: 'Simple Dark',
    description: 'スタイリッシュなダークテーマ',
    price: 0,
    isFree: true,
    isAnimated: false,
    stripePriceId: null,
    previewColors: ['#0a0a0a', '#1a1a1a', '#ffffff'],
  },
  {
    id: 'luxury_black',
    name: 'Luxury Black',
    description: 'ゴールドアクセントで高級感を演出',
    price: 500,
    isFree: false,
    isAnimated: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_LUXURY_BLACK ?? null,
    previewColors: ['#0a0a0a', '#d4af37', '#1a1a1a'],
  },
  {
    id: 'glass_premium',
    name: 'Glass Premium',
    description: 'ガラスモーフィズムの洗練されたデザイン',
    price: 500,
    isFree: false,
    isAnimated: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GLASS_PREMIUM ?? null,
    previewColors: ['#1a1a2e', '#16213e', '#00d4ff'],
  },
  {
    id: 'neon_glow',
    name: 'Neon Glow',
    description: 'ネオンの光が際立つサイバーパンクテーマ',
    price: 600,
    isFree: false,
    isAnimated: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_NEON_GLOW ?? null,
    previewColors: ['#0d0d0d', '#ff00ff', '#00ffff'],
  },
  {
    id: 'animated_aurora',
    name: 'Animated Aurora',
    description: 'オーロラが揺れる幻想的なアニメーションテーマ',
    price: 900,
    isFree: false,
    isAnimated: true,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANIMATED_AURORA ?? null,
    previewColors: ['#7c3aed', '#2563eb', '#ec4899'],
  },
]

export function getThemeById(id: string): ThemeDefinition | undefined {
  return THEMES.find((t) => t.id === id)
}

export const FREE_THEME_IDS = THEMES.filter((t) => t.isFree).map((t) => t.id)
export const PAID_THEME_IDS = THEMES.filter((t) => !t.isFree).map((t) => t.id)
