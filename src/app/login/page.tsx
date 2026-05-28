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
  const [emailUnconfirmed, setEmailUnconfirmed] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setEmailUnconfirmed(false)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        setEmailUnconfirmed(true)
      } else {
        setError('メールアドレスまたはパスワードが正しくありません。')
      }
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleResend = async () => {
    setResendStatus('sending')
    const supabase = createClient()
    await supabase.auth.resend({ type: 'signup', email })
    setResendStatus('sent')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col px-5 pb-safe">
      {/* Nav */}
      <div className="flex items-center justify-between py-5 max-w-sm mx-auto w-full">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
          <span className="text-[16px] font-bold tracking-wider text-white">Veyra</span>
        </Link>
        <Link href="/signup" className="text-[13px] text-gray-500 hover:text-white transition-colors">
          新規登録
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-[26px] font-bold text-white mb-2">おかえりなさい</h1>
            <p className="text-[14px] text-gray-500">アカウントにログインする</p>
          </div>

          <div className="bg-[#111] border border-white/8 rounded-3xl p-6">
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
                {error}
              </div>
            )}

            {emailUnconfirmed && (
              <div className="mb-4 px-4 py-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[13px]">
                <p className="text-amber-400 mb-2.5">メールアドレスの確認が完了していません。</p>
                {resendStatus === 'sent' ? (
                  <p className="text-green-400 text-[12px]">確認メールを再送しました ✓</p>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={resendStatus === 'sending'}
                    className="text-[12px] font-bold text-amber-300 underline underline-offset-2 hover:text-amber-200 disabled:opacity-50"
                  >
                    {resendStatus === 'sending' ? '送信中...' : '確認メールを再送する'}
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[12px] text-gray-500 mb-2" htmlFor="email">
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
                <label className="block text-[12px] text-gray-500 mb-2" htmlFor="password">
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
              <div className="text-right">
                <Link href="/forgot-password" className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors">
                  パスワードを忘れた場合
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-[15px] bg-white text-black font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-[15px] mt-2"
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
    </div>
  )
}
