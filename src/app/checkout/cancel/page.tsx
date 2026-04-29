import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '決済キャンセル | Veyra',
}

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* キャンセルアイコン */}
        <div className="w-20 h-20 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* ロゴ */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
          <span className="text-xl font-bold tracking-wider text-white">Veyra</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">決済がキャンセルされました</h1>
        <p className="text-gray-400 mb-10 leading-relaxed">
          決済はキャンセルされました。
          <br />
          料金は請求されていません。
          <br />
          いつでも購入を再開できます。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard/themes"
            className="px-6 py-3 bg-white text-black font-semibold rounded-2xl hover:bg-gray-100 transition-colors"
          >
            テーマ選択に戻る
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/15 transition-colors border border-white/10"
          >
            ダッシュボードへ
          </Link>
        </div>
      </div>
    </div>
  )
}
