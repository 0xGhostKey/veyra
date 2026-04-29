import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    default: 'Veyra — Your luxury link profile.',
    template: '%s | Veyra',
  },
  description: 'あなたのブランドを引き立てる、高級感あふれるプロフィールリンクサービス。',
  keywords: ['プロフィールリンク', 'リンクまとめ', 'SNS', 'Veyra'],
  openGraph: {
    title: 'Veyra — Your luxury link profile.',
    description: 'あなたのブランドを引き立てる、高級感あふれるプロフィールリンクサービス。',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
