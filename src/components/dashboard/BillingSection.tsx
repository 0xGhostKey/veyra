'use client'

import type { Profile } from '@/types'

type Props = {
  profile: Profile
  cancelingSubscription: boolean
  onSubscribe: () => void
  onCancel: () => void
}

export default function BillingSection({ profile, cancelingSubscription, onSubscribe, onCancel }: Props) {
  return (
    <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
      <p className="text-[11px] font-bold text-gray-500 tracking-[0.12em] uppercase mb-5">ロゴ非表示</p>
      {profile.role === 'admin' ? (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#d4af37]/8 border border-[#d4af37]/20 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-[#d4af37] flex-none" />
          <p className="text-[13px] text-[#d4af37]">管理者アカウントのため常に非表示</p>
        </div>
      ) : profile.logo_removed ? (
        <div>
          <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-[#d4af37]/8 border border-[#d4af37]/20 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-[#d4af37] flex-none" />
            <p className="text-[13px] text-[#d4af37]">
              {profile.subscription_status === 'canceling' ? '次の更新日をもって終了します' : 'ロゴ非表示が有効です'}
            </p>
          </div>
          <p className="text-[12px] text-gray-600 mb-4">
            {profile.subscription_status === 'canceling'
              ? '期間終了後にロゴが再表示されます。'
              : '公開プロフィールにVeyraロゴが表示されていません。'}
          </p>
          {profile.subscription_status !== 'canceling' && (
            <button onClick={onCancel} disabled={cancelingSubscription}
              className="w-full py-3 text-[13px] text-gray-500 border border-white/8 rounded-xl hover:border-white/15 hover:text-gray-400 active:scale-[0.98] transition-all disabled:opacity-40">
              {cancelingSubscription ? '処理中...' : 'キャンセルする'}
            </button>
          )}
        </div>
      ) : (
        <div>
          <p className="text-[13px] text-gray-400 mb-1">公開ページのVeyraロゴを非表示にします。</p>
          <p className="text-[12px] text-gray-600 mb-5">月額サブスクリプション。いつでもキャンセル可能。</p>
          <button onClick={onSubscribe}
            className="w-full py-3 text-[13px] font-bold bg-[#d4af37] text-black rounded-xl hover:bg-[#c49e30] active:scale-[0.98] transition-all">
            ¥490/月 — ロゴを非表示にする
          </button>
        </div>
      )}
    </section>
  )
}
