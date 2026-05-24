'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (newPassword.length < 8) {
      setError('パスワードは8文字以上で入力してください。')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('パスワードが一致しません。')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setError('パスワードの更新に失敗しました。もう一度お試しください。')
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col px-5 pb-safe">
      {/* Nav */}
      <div className="flex items-center justify-between py-5 max-w-sm mx-auto w-full">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
          <span className="text-[16px] font-bold tracking-wider text-white">Veyra</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          {success ? (
            /* 成功画面 */
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-[22px] font-bold text-white mb-2">パスワードを更新しました</h1>
              <p className="text-[13px] text-gray-500">ダッシュボードに移動します...</p>
            </div>
          ) : !ready ? (
            /* 待機画面（PASSWORD_RECOVERY イベント待ち） */
            <div className="text-center">
              <div className="w-7 h-7 border-2 border-white/10 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-5" />
              <p className="text-[14px] text-gray-500">認証情報を確認中...</p>
              <p className="text-[12px] text-gray-700 mt-2">
                リンクが無効な場合は{' '}
                <Link href="/forgot-password" className="text-[#d4af37] hover:text-[#e8cc6a] transition-colors">
                  こちら
                </Link>
                から再送できます。
              </p>
            </div>
          ) : (
            /* パスワード入力フォーム */
            <>
              <div className="mb-8">
                <h1 className="text-[26px] font-bold text-white mb-2">新しいパスワードを設定</h1>
                <p className="text-[14px] text-gray-500">8文字以上で入力してください</p>
              </div>

              <div className="bg-[#111] border border-white/8 rounded-3xl p-6">
                {error && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] text-gray-500 mb-2" htmlFor="new-password">
                      新しいパスワード
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-gray-500 mb-2" htmlFor="confirm-password">
                      パスワードの確認
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-[15px] bg-white text-black font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-[15px] mt-2"
                  >
                    {loading ? '更新中...' : 'パスワードを更新する'}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
