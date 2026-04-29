'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type PollState = 'polling' | 'confirmed' | 'timeout' | 'no_session'

const POLL_INTERVAL_MS = 3000
const MAX_ATTEMPTS = 12 // 最大36秒ポーリング

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')

  const [state, setState] = useState<PollState>(sessionId ? 'polling' : 'no_session')
  const [attemptCount, setAttemptCount] = useState(0)
  const [itemType, setItemType] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!sessionId) return

    const poll = async () => {
      try {
        const res = await fetch(`/api/purchases/status?session_id=${encodeURIComponent(sessionId)}`)

        // 未認証なら login へ
        if (res.status === 401) {
          router.push('/login')
          return
        }

        const json = await res.json()

        if (json.confirmed) {
          // Webhook 到達 → 確定
          setItemType(json.item_type ?? null)
          setState('confirmed')
          clearInterval(intervalRef.current!)
          return
        }

        // まだ未反映 — カウントアップ
        setAttemptCount((prev) => {
          const next = prev + 1
          if (next >= MAX_ATTEMPTS) {
            setState('timeout')
            clearInterval(intervalRef.current!)
          }
          return next
        })
      } catch {
        // ネットワークエラーは静かに無視してリトライ
      }
    }

    // 初回即時実行
    poll()
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [sessionId, router])

  // ---- UI ----

  if (state === 'no_session') {
    return <LayoutWrapper><NoSessionView /></LayoutWrapper>
  }

  if (state === 'polling') {
    return <LayoutWrapper><PollingView attempt={attemptCount} max={MAX_ATTEMPTS} /></LayoutWrapper>
  }

  if (state === 'timeout') {
    return <LayoutWrapper><TimeoutView sessionId={sessionId!} /></LayoutWrapper>
  }

  // confirmed
  return <LayoutWrapper><ConfirmedView itemType={itemType} /></LayoutWrapper>
}

// ---- 子コンポーネント ----

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* ロゴ */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
          <span className="text-xl font-bold tracking-wider text-white">Veyra</span>
        </div>
        {children}
      </div>
    </div>
  )
}

/** Webhook 反映待ち */
function PollingView({ attempt, max }: { attempt: number; max: number }) {
  return (
    <>
      {/* スピナー */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
      >
        <div className="w-8 h-8 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">決済を確認中</h1>
      <p className="text-gray-400 mb-4 leading-relaxed text-sm">
        購入状態を反映しています。
        <br />
        このまましばらくお待ちください。
      </p>

      {/* プログレスバー */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-[#d4af37] rounded-full transition-all duration-700"
          style={{ width: `${Math.min((attempt / max) * 100, 95)}%` }}
        />
      </div>

      <p className="text-xs text-gray-600">
        ページを閉じても購入は完了しています
      </p>
    </>
  )
}

/** Webhook 確認完了 */
function ConfirmedView({ itemType }: { itemType: string | null }) {
  const isLogoRemove = itemType === 'logo_remove'

  return (
    <>
      {/* 成功アイコン */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
      >
        <svg className="w-10 h-10 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-white mb-4">ご購入ありがとうございます</h1>
      <p className="text-gray-400 mb-10 leading-relaxed text-sm">
        {isLogoRemove
          ? 'Veyraロゴが非表示になりました。'
          : 'テーマの利用権限が解放されました。'}
        <br />
        ダッシュボードから確認できます。
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!isLogoRemove && (
          <Link
            href="/dashboard/themes"
            className="px-6 py-3 bg-[#d4af37] text-black font-semibold rounded-2xl hover:bg-[#e8cc6a] transition-colors"
          >
            テーマを選択する
          </Link>
        )}
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/15 transition-colors border border-white/10"
        >
          ダッシュボードへ
        </Link>
      </div>
    </>
  )
}

/**
 * タイムアウト — Webhook が36秒以内に届かなかった場合。
 * session_id を表示して管理者が手動確認できるようにする。
 */
function TimeoutView({ sessionId }: { sessionId: string }) {
  return (
    <>
      {/* 時計アイコン */}
      <div className="w-20 h-20 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-8">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">反映に時間がかかっています</h1>
      <p className="text-gray-400 mb-6 leading-relaxed text-sm">
        決済は完了していますが、権限反映の確認に時間がかかっています。
        <br />
        しばらく後にダッシュボードをご確認ください。
        <br />
        問題が続く場合はサポートへお問い合わせください。
      </p>

      {/* 管理者確認用 session_id */}
      <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-8 text-left">
        <p className="text-xs text-gray-500 mb-1">決済確認用 ID（お問い合わせ時にお伝えください）</p>
        <p className="text-xs text-gray-300 font-mono break-all">{sessionId}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-[#d4af37] text-black font-semibold rounded-2xl hover:bg-[#e8cc6a] transition-colors"
        >
          ダッシュボードを確認する
        </Link>
      </div>
    </>
  )
}

/** session_id なしで直アクセスした場合 */
function NoSessionView() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-4">このページは直接アクセスできません</h1>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/15 transition-colors border border-white/10 inline-block"
      >
        ダッシュボードへ
      </Link>
    </>
  )
}
