'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません。')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
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
          <p className="text-[14px] text-gray-500">おかえりなさい</p>
        </div>

        {/* Form card */}
        <div className="bg-[#111] border border-white/8 rounded-3xl p-6">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
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
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[15px] bg-white text-black font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1 text-[15px]"
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-600 mt-5">
            アカウントをお持ちでない方は{' '}
            <Link href="/signup" className="text-[#d4af37] hover:text-[#e8cc6a] transition-colors">
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
