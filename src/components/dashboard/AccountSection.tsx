'use client'

type Props = {
  currentEmail: string | null
  newEmail: string
  emailChanging: boolean
  emailChangeMessage: { type: 'success' | 'error'; text: string } | null
  onNewEmailChange: (v: string) => void
  onEmailChange: () => void
}

export default function AccountSection({
  currentEmail, newEmail, emailChanging, emailChangeMessage, onNewEmailChange, onEmailChange,
}: Props) {
  return (
    <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
      <p className="text-[11px] font-bold text-gray-500 tracking-[0.12em] uppercase mb-5">メールアドレス変更</p>
      <div className="space-y-3">
        {currentEmail && (
          <div>
            <label className="block text-[11px] text-gray-500 mb-1.5">現在のメールアドレス</label>
            <div className="px-4 py-3.5 bg-white/3 border border-white/8 rounded-xl text-gray-400 text-[14px]">{currentEmail}</div>
          </div>
        )}
        <div>
          <label className="block text-[11px] text-gray-500 mb-1.5">新しいメールアドレス</label>
          <input type="email" value={newEmail} onChange={e => onNewEmailChange(e.target.value)}
            placeholder="new@example.com"
            className="w-full px-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 transition-colors text-[15px]" />
        </div>
        {emailChangeMessage && (
          <div className={`px-4 py-3 rounded-xl text-[13px] ${
            emailChangeMessage.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {emailChangeMessage.text}
          </div>
        )}
        <button onClick={onEmailChange} disabled={emailChanging || !newEmail}
          className="w-full py-3 text-[13px] font-bold bg-white text-black rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
          {emailChanging ? '変更中...' : '変更する'}
        </button>
      </div>
    </section>
  )
}
