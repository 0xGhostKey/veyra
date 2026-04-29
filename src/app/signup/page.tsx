'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-5 pb-safe">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[22px] font-bold text-white mb-3">確認メールを送信しました</h2>
          <p className="text-[13px] text-gray-500 mb-8 leading-relaxed">
            {email} に確認メールを送りました。
            <br />
            メール内のリンクをクリックして登録を完了してください。
          </p>
          <Link
            href="/login"
            className="block w-full py-[15px] bg-white text-black font-bold rounded-xl text-[15px] hover:bg-gray-100 active:scale-[0.98] transition-all"
          >
            ログインページへ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-5 pb-safe">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-4">
            <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            <span className="text-[20px] font-bold tracking-wider text-white">Veyra</span>
          </Link>
          <p className="text-[14px] text-gray-500">アカウントを作成して始めましょう</p>
        </div>

        {/* Form card */}
        <div className="bg-[#111] border border-white/8 rounded-3xl p-6">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1.5" htmlFor="email">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1.5" htmlFor="password">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="8文字以上"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[15px] bg-white text-black font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1 text-[15px]"
            >
              {loading ? '処理中...' : '無料で登録する'}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-600 mt-5">
            すでにアカウントをお持ちの方は{' '}
            <Link href="/login" className="text-[#d4af37] hover:text-[#e8cc6a] transition-colors">
              ログイン
            </Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-gray-700 mt-5">
          登録することで、利用規約とプライバシーポリシーに同意したものとみなされます。
        </p>
      </div>
    </div>
  )
}
