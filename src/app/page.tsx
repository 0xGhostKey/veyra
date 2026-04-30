import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veyra — Your luxury link profile.',
}

const THEME_PREVIEWS = [
  {
    id: 'luxury_black',
    name: 'Luxury Black',
    accent: '#d4af37',
    bg: '#0a0a0a',
    badge: '人気',
    price: '¥500',
    avatarBg: 'linear-gradient(135deg, #d4af37, #8B6914)',
    textColor: '#ffffff',
    subColor: '#d4af37',
    linkBorder: 'rgba(212,175,55,0.25)',
    linkBg: 'rgba(212,175,55,0.07)',
    linkText: '#d4af37',
    topDecor: true,
  },
  {
    id: 'glass_premium',
    name: 'Glass Premium',
    accent: '#00d4ff',
    bg: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #0f3460 100%)',
    badge: 'おすすめ',
    price: '¥500',
    avatarBg: 'rgba(0,212,255,0.2)',
    avatarBorder: 'rgba(0,212,255,0.5)',
    textColor: '#ffffff',
    subColor: 'rgba(255,255,255,0.5)',
    linkBorder: 'rgba(255,255,255,0.15)',
    linkBg: 'rgba(255,255,255,0.07)',
    linkText: '#ffffff',
  },
  {
    id: 'animated_aurora',
    name: 'Animated Aurora',
    accent: '#ec4899',
    bg: 'linear-gradient(270deg, #7c3aed, #2563eb, #ec4899, #7c3aed)',
    badge: 'ANIMATED',
    price: '¥900',
    avatarBg: 'rgba(255,255,255,0.25)',
    avatarBorder: 'rgba(255,255,255,0.5)',
    textColor: '#ffffff',
    subColor: 'rgba(255,255,255,0.7)',
    linkBorder: 'rgba(255,255,255,0.35)',
    linkBg: 'rgba(255,255,255,0.18)',
    linkText: '#ffffff',
    animated: true,
  },
  {
    id: 'neon_glow',
    name: 'Neon Glow',
    accent: '#39ff14',
    bg: '#0d0d0d',
    badge: 'NEW',
    price: '¥600',
    avatarBg: 'rgba(57,255,20,0.15)',
    avatarBorder: 'rgba(57,255,20,0.6)',
    textColor: '#ffffff',
    subColor: 'rgba(57,255,20,0.6)',
    linkBorder: 'rgba(57,255,20,0.25)',
    linkBg: 'rgba(57,255,20,0.06)',
    linkText: 'rgba(57,255,20,0.9)',
  },
]

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[175px] my-10">
      {/* Ambient glow */}
      <div
        className="absolute -inset-6 rounded-[3.5rem] blur-3xl pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse, #d4af37 0%, transparent 70%)' }}
      />
      {/* Phone frame */}
      <div className="relative rounded-[2.8rem] bg-[#1c1c1e] border border-white/15 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.9)]">
        {/* Dynamic island */}
        <div className="bg-[#0a0a0a] flex justify-center pt-3 pb-1">
          <div className="w-[68px] h-[18px] bg-[#1c1c1e] rounded-full" />
        </div>
        {/* Screen */}
        <div className="bg-[#0a0a0a] px-4 pt-3 pb-4">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-4">
            <div
              className="w-12 h-12 rounded-full mb-2 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #d4af37, #8B6914)' }}
            />
            <div className="text-white text-[11px] font-bold mb-0.5 tracking-wide">Yuna</div>
            <div className="text-gray-500 text-[8px] tracking-wide">photographer · Tokyo</div>
          </div>
          {/* Links */}
          <div className="space-y-2">
            {['Instagram', 'Portfolio', 'Shop'].map((name) => (
              <div
                key={name}
                className="w-full h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
              >
                <span className="text-gray-300 text-[9px] font-medium tracking-wider">{name}</span>
              </div>
            ))}
          </div>
          {/* Veyra tag */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-1 opacity-20">
              <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
              <span className="text-gray-400 text-[7px] tracking-[0.15em] uppercase">Veyra</span>
            </div>
          </div>
        </div>
        {/* Home indicator */}
        <div className="bg-[#0a0a0a] flex justify-center py-3">
          <div className="w-[90px] h-[3px] bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 py-3.5">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            <span className="text-[17px] font-bold tracking-wider">Veyra</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="text-[13px] px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-100 active:scale-[0.97] transition-all"
            >
              始める
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-5 pt-12 pb-4 text-center">
        <div className="max-w-sm mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-7">
            <span className="text-[#d4af37] text-[10px]">✦</span>
            無料から始められます
          </div>

          {/* Headline */}
          <h1 className="text-[2.6rem] leading-[1.18] font-bold mb-4 tracking-tight">
            あなただけの
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #d4af37 0%, #f0d878 50%, #d4af37 100%)',
              }}
            >
              高級プロフィール
            </span>
          </h1>

          <p className="text-[15px] text-gray-400 leading-relaxed">
            SNSプロフィールを、上質なリンクページへ。
          </p>

          <PhoneMockup />

          <Link
            href="/signup"
            className="block w-full py-[15px] bg-white text-black font-bold rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
          >
            無料で始める →
          </Link>
          <Link
            href="/login"
            className="block mt-4 text-[13px] text-gray-600 hover:text-gray-400 transition-colors"
          >
            ログインはこちら
          </Link>
        </div>
      </section>

      {/* Theme preview - horizontal scroll */}
      <section className="pt-16 pb-4">
        <div className="px-5 mb-5 max-w-lg mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-1">
            Themes
          </p>
          <h2 className="text-[22px] font-bold">プレミアムテーマ</h2>
        </div>
        {/* Aurora animation */}
        <style>{`
          @keyframes aurora-card {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
        <div className="flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {THEME_PREVIEWS.map((theme) => (
            <div
              key={theme.id}
              className="flex-none w-[148px] rounded-2xl overflow-hidden border border-white/10"
            >
              {/* Mini profile preview */}
              <div
                className="h-[210px] flex flex-col items-center pt-5 px-3.5 overflow-hidden"
                style={
                  theme.animated
                    ? {
                        background: 'linear-gradient(270deg, #7c3aed, #2563eb, #ec4899, #7c3aed)',
                        backgroundSize: '300% 300%',
                        animation: 'aurora-card 8s ease infinite',
                      }
                    : { background: theme.bg }
                }
              >
                {/* Luxury top line */}
                {'topDecor' in theme && theme.topDecor && (
                  <div className="w-full h-px mb-3 opacity-50" style={{ background: 'linear-gradient(to right, transparent, #d4af37, transparent)' }} />
                )}
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-bold mb-2 flex-none"
                  style={{
                    background: theme.avatarBg,
                    border: `1.5px solid ${'avatarBorder' in theme ? theme.avatarBorder : 'transparent'}`,
                    color: theme.accent,
                    boxShadow: `0 0 12px ${'avatarBorder' in theme ? theme.avatarBorder : theme.accent + '40'}`,
                  }}
                >
                  Y
                </div>
                {/* Name */}
                <p className="text-[11px] font-bold mb-0.5" style={{ color: theme.textColor }}>Yuna</p>
                {/* Bio */}
                <p className="text-[8px] mb-3" style={{ color: theme.subColor }}>photographer · Tokyo</p>
                {/* Links */}
                {['Instagram', 'Portfolio', 'Shop'].map((label) => (
                  <div
                    key={label}
                    className="w-full h-[26px] rounded-xl mb-1.5 flex items-center justify-center text-[8px] font-semibold tracking-wide flex-none"
                    style={{
                      border: `1px solid ${theme.linkBorder}`,
                      background: theme.linkBg,
                      color: theme.linkText,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              {/* Info */}
              <div className="p-3 bg-[#111]">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px] font-bold truncate mr-1">{theme.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/8 text-gray-500 flex-none">
                    {theme.badge}
                  </span>
                </div>
                <span className="text-[#d4af37] text-[11px] font-semibold">{theme.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 pt-14 pb-4">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-1">
            How it works
          </p>
          <h2 className="text-[22px] font-bold mb-8">3ステップで完成</h2>
          <div className="space-y-5">
            {[
              { step: '01', title: 'アカウント作成', desc: 'メールアドレスだけで無料登録。30秒で完了。' },
              { step: '02', title: 'リンクを追加', desc: 'Instagram・X・YouTubeなどのリンクをまとめる。' },
              { step: '03', title: 'SNSに貼る', desc: 'あなただけのURLをプロフィールに設定して完成。' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="flex-none w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#d4af37]">{step}</span>
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-[15px] mb-0.5">{title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-5 pt-16 pb-4">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-1">
            Pricing
          </p>
          <h2 className="text-[22px] font-bold mb-1">シンプルな料金</h2>
          <p className="text-[13px] text-gray-500 mb-8">まず無料で始めて、必要なら追加</p>

          {/* Free plan */}
          <div className="rounded-3xl border border-white/10 p-6 bg-white/[0.03] mb-4">
            <h3 className="text-base font-bold mb-1">無料プラン</h3>
            <p className="text-[32px] font-bold mb-5">
              ¥0
            </p>
            <ul className="space-y-3 text-[13px] text-gray-400 mb-6">
              {['無料テーマ 2種類', 'リンク無制限', 'カスタムプロフィール', 'Veyra ロゴ表示あり'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex-none w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                )
              )}
            </ul>
            <Link
              href="/signup"
              className="block w-full py-3.5 text-center border border-white/15 rounded-2xl text-[13px] font-semibold hover:bg-white/5 active:scale-[0.98] transition-all"
            >
              無料で始める
            </Link>
          </div>

          {/* Premium */}
          <div
            className="rounded-3xl border border-[#d4af37]/20 p-6"
            style={{ background: 'linear-gradient(160deg, #131008, #0a0a0a)' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-[#d4af37]">プレミアム</h3>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] font-bold tracking-wide">
                買い切り
              </span>
            </div>
            <p className="text-[32px] font-bold mb-0.5">
              ¥500<span className="text-base text-gray-500 font-normal">〜</span>
            </p>
            <p className="text-[11px] text-gray-600 mb-5">テーマごとの一括購入</p>
            <ul className="space-y-3 text-[13px] text-gray-400 mb-6">
              {[
                'Luxury Black — ¥500',
                'Glass Premium — ¥500',
                'Neon Glow — ¥600',
                'Animated Aurora — ¥900',
                'ロゴ削除 — ¥300',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex-none w-4 h-4 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[8px] text-[#d4af37]">
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full py-3.5 text-center bg-[#d4af37] text-black font-bold rounded-2xl text-[13px] hover:bg-[#e8cc6a] active:scale-[0.98] transition-all"
            >
              始める
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 pt-16 pb-4">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-1">
            FAQ
          </p>
          <h2 className="text-[22px] font-bold mb-8">よくある質問</h2>
          <div className="space-y-3">
            {[
              {
                q: '無料で使えますか？',
                a: 'はい。アカウント作成・リンク追加・公開ページ作成はすべて無料です。有料テーマやロゴ削除はオプションです。',
              },
              {
                q: 'テーマは買い切りですか？',
                a: 'はい。月額費用は一切かかりません。テーマを一度購入すればずっと使えます。',
              },
              {
                q: 'SNSのプロフィールにどう使うの？',
                a: 'あなたの公開ページURL（veyra.jp/u/...）をTikTok・Instagram・Xなどのプロフィールに貼るだけです。',
              },
              {
                q: 'リンクは何個まで追加できますか？',
                a: '無制限に追加できます。表示/非表示の切り替えも自由です。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <h3 className="font-bold text-[14px] mb-2">{q}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pt-16 pb-20 text-center">
        <div className="max-w-sm mx-auto">
          <h2 className="text-[22px] font-bold mb-3">今すぐページを作ろう</h2>
          <p className="text-[13px] text-gray-500 mb-8">無料で始めて、あなたのブランドを発信</p>
          <Link
            href="/signup"
            className="block w-full py-[15px] bg-white text-black font-bold rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
          >
            無料で始める →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-5 py-8 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="text-sm font-bold tracking-wider">Veyra</span>
        </div>
        <p className="text-[11px] text-gray-700">© 2026 Veyra. All rights reserved.</p>
      </footer>
    </div>
  )
}
