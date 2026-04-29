'use client'

import { useState } from 'react'
import Link from 'next/link'

type User = {
  user_id: string
  display_name: string | null
  email: string
  role: 'user' | 'admin'
  created_at: string
}

type Purchase = {
  id: string
  user_id: string
  item_type: string
  item_id: string
  amount: number
  status: string
  created_at: string
}

type Props = {
  users: User[]
  purchases: Purchase[]
}

export default function AdminClient({ users, purchases }: Props) {
  const [tab, setTab] = useState<'users' | 'purchases'>('users')
  const [localUsers, setLocalUsers] = useState(users)
  const [loading, setLoading] = useState<string | null>(null)

  const totalRevenue = purchases.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)

  const handleToggleRole = async (targetUserId: string, currentRole: 'user' | 'admin') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'

    if (currentRole === 'admin') {
      const ok = window.confirm('このアカウントのAdmin権限を解除しますか？\n解除すると管理画面にアクセスできなくなります。')
      if (!ok) return
    }

    setLoading(targetUserId)
    const res = await fetch('/api/admin/set-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_user_id: targetUserId, role: newRole }),
    })
    if (res.ok) {
      setLocalUsers(prev => prev.map(u => u.user_id === targetUserId ? { ...u, role: newRole } : u))
    }
    setLoading(null)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 py-3.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
              <span className="text-[16px] font-bold tracking-wider">Veyra</span>
            </div>
            <span className="text-gray-600">/</span>
            <span className="text-[13px] text-[#d4af37] font-semibold">Admin</span>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            ダッシュボードへ
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'ユーザー', value: localUsers.length },
            { label: '購入', value: purchases.filter(p => p.status === 'paid').length },
            { label: '売上', value: `¥${totalRevenue.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#111] border border-white/8 rounded-2xl p-4">
              <p className="text-[10px] text-gray-600 font-bold tracking-[0.12em] uppercase mb-1">{label}</p>
              <p className="text-[22px] font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-fit">
          {(['users', 'purchases'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                tab === t ? 'bg-white text-black' : 'text-gray-500 hover:text-white'
              }`}
            >
              {t === 'users' ? 'ユーザー' : '購入履歴'}
            </button>
          ))}
        </div>

        {/* Users */}
        {tab === 'users' && (
          <section className="bg-[#111] rounded-2xl border border-white/8 overflow-hidden">
            {localUsers.length === 0 ? (
              <div className="py-12 text-center text-gray-600 text-[13px]">ユーザーなし</div>
            ) : (
              <div className="divide-y divide-white/5">
                {localUsers.map((user) => (
                  <div key={user.user_id} className="flex items-center gap-3 px-5 py-4">
                    <div className="flex-none w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-[12px] font-bold text-gray-400">
                      {(user.display_name ?? user.email ?? '?')[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-semibold truncate">{user.display_name ?? '—'}</p>
                        {user.role === 'admin' && (
                          <span className="flex-none text-[9px] px-1.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] font-bold tracking-wider uppercase">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 truncate">{user.email || user.user_id}</p>
                    </div>
                    <p className="hidden sm:block flex-none text-[11px] text-gray-700">
                      {new Date(user.created_at).toLocaleDateString('ja-JP')}
                    </p>
                    <button
                      onClick={() => handleToggleRole(user.user_id, user.role)}
                      disabled={loading === user.user_id}
                      className={`flex-none px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-40 ${
                        user.role === 'admin'
                          ? 'bg-white/8 text-gray-400 hover:bg-red-500/15 hover:text-red-400'
                          : 'bg-white/8 text-gray-500 hover:bg-[#d4af37]/15 hover:text-[#d4af37]'
                      }`}
                    >
                      {loading === user.user_id ? '...' : user.role === 'admin' ? '解除' : 'Admin化'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Purchases */}
        {tab === 'purchases' && (
          <section className="bg-[#111] rounded-2xl border border-white/8 overflow-hidden">
            {purchases.length === 0 ? (
              <div className="py-12 text-center text-gray-600 text-[13px]">購入履歴なし</div>
            ) : (
              <div className="divide-y divide-white/5">
                {purchases.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 px-5 py-4">
                    <div className={`flex-none w-1.5 h-1.5 rounded-full ${
                      p.status === 'paid' ? 'bg-green-500' : p.status === 'refunded' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold">{p.item_id}</p>
                      <p className="text-[11px] text-gray-600 truncate">{p.user_id}</p>
                    </div>
                    <p className="flex-none text-[13px] font-bold text-[#d4af37]">¥{p.amount.toLocaleString()}</p>
                    <span className={`flex-none text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      p.status === 'paid' ? 'bg-green-500/15 text-green-400' :
                      p.status === 'refunded' ? 'bg-yellow-500/15 text-yellow-400' :
                      'bg-red-500/15 text-red-400'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
