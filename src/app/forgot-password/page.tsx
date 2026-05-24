'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    })

    if (error) {
      setError('メールの送信に失敗しました。メールアドレスをご確認ください。')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col px-5 pb-safe">
      {/* Nav */}
      <div className="flex items-center justify-between py-5 max-w-sm mx-auto w-full">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
          <span className="text-[16px] font-bold tracking-wider text-white">Veyra</span>
        </Link>
        <Link href="/login" className="text-[13px] text-gray-500 hover:text-white transition-colors">
          ログイン
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          {sent ? (
            /* 送信完了画面 */
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h1 className="text-[22px] font-bold text-white mb-2">メールを送信しました</h1>
              <p className="text-[13px] text-gray-500 mb-1">
                <span className="text-gray-300">{email}</span> に
              </p>
              <p className="text-[13px] text-gray-500 mb-8">
                パスワードリセットのリンクを送りました。<br />
                メールをご確認ください。
              </p>
              <Link
                href="/login"
                className="text-[13px] text-[#d4af37] hover:text-[#e8cc6a] transition-colors"
              >
                ← ログインページに戻る
              </Link>
            </div>
          ) : (
            /* 入力フォーム */
            <>
              <div className="mb-8">
                <h1 className="text-[26px] font-bold text-white mb-2">パスワードをリセット</h1>
                <p className="text-[14px] text-gray-500">登録済みのメールアドレスを入力してください</p>
              </div>

              <div className="bg-[#111] border border-white/8 rounded-3xl p-6">
                {error && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-[15px] bg-white text-black font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-[15px] mt-2"
                  >
                    {loading ? '送信中...' : 'リセットメールを送信'}
                  </button>
                </form>

                <p className="text-center text-[13px] text-gray-600 mt-5">
                  <Link href="/login" className="text-gray-500 hover:text-gray-300 transition-colors">
                    ← ログインに戻る
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
