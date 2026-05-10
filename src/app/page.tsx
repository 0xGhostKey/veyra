import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veyra — Your luxury link profile.',
}

const CAROUSEL_AVATARS = [
  { initial: 'Y', name: '@yuna_photo', color: 'linear-gradient(135deg, #d4af37, #8B6914)' },
  { initial: 'R', name: '@reo_music', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { initial: 'M', name: '@mei_design', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { initial: 'K', name: '@kai_video', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { initial: 'S', name: '@sora_art', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { initial: 'H', name: '@hana_shop', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { initial: 'A', name: '@aki_style', color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { initial: 'T', name: '@tao_brand', color: 'linear-gradient(135deg, #ffecd2, #c9a06a)' },
]

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
    pt: 'pt-2',
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

const FOR_EVERYONE = [
  {
    icon: '✦',
    title: 'クリエイター',
    desc: 'YouTube・写真・イラストなど、作品へのリンクをひとつのページにまとめて発信できます。',
  },
  {
    icon: '◈',
    title: 'インフルエンサー',
    desc: 'TikTok・InstagramのプロフィールリンクをVeyraに設定するだけ。フォロワーを導線に。',
  },
  {
    icon: '⬡',
    title: 'ビジネス',
    desc: 'ショップ・予約・SNS・連絡先をひとつのURLで管理。ブランドの顔になるページを作れます。',
  },
]

const FEATURES = [
  { icon: '🎨', title: '無料テーマ 2種類', desc: '登録後すぐ使えるテーマを用意。まず試せます。' },
  { icon: '✦', title: 'プレミアムテーマ', desc: '高級感のあるデザインで他ユーザーと差別化。' },
  { icon: '∞', title: 'リンク無制限', desc: 'SNS・サイト・ECなど、何個でも追加可能。' },
  { icon: '🖼', title: '画像リンク', desc: '写真をそのままリンクに。ビジュアルで訴求。' },
  { icon: '💳', title: '買い切り課金', desc: '月額ゼロ。一度買えばずっと使えます。' },
  { icon: '📱', title: 'スマホ最適化', desc: 'どのデバイスでも美しく表示されます。' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <style>{`
        @keyframes aurora-card {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes carousel-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel-scroll 24s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            <span className="text-[17px] font-bold tracking-wider">Veyra</span>
          </div>
          <div className="hidden sm:flex items-center gap-7">
            <a href="#features" className="text-[13px] text-gray-500 hover:text-white transition-colors">機能</a>
            <a href="#pricing" className="text-[13px] text-gray-500 hover:text-white transition-colors">料金</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[13px] text-gray-500 hover:text-white transition-colors">
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

      {/* ── Hero ── */}
      <section className="px-5 pt-16 pb-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-8">
            <span className="text-[#d4af37] text-[10px]">✦</span>
            無料から始められます
          </div>

          <h1 className="text-[2.8rem] leading-[1.15] font-bold mb-5 tracking-tight">
            あなただけの
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #d4af37 0%, #f0d878 50%, #d4af37 100%)' }}
            >
              高級プロフィール
            </span>
          </h1>

          <p className="text-[15px] text-gray-400 leading-relaxed mb-8">
            SNSプロフィールを、上質なリンクページへ。
            <br />
            TikTok・Instagram・X、どこからでも。
          </p>

          <Link
            href="/signup"
            className="inline-block px-8 py-[15px] bg-white text-black font-bold rounded-full hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
          >
            無料で始める →
          </Link>
          <p className="mt-3 text-[12px] text-gray-700">クレジットカード不要 · 30秒で登録完了</p>
        </div>

        {/* Avatar carousel */}
        <div className="mt-14 overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
          />
          <div className="flex gap-6 animate-carousel w-max">
            {[...CAROUSEL_AVATARS, ...CAROUSEL_AVATARS].map((a, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-none">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-[18px] font-bold text-white/90 shadow-lg border border-white/10"
                  style={{ background: a.color }}
                >
                  {a.initial}
                </div>
                <span className="text-[11px] text-gray-600">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Everyone ── */}
      <section id="features" className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-2 text-center">
            For Everyone
          </p>
          <h2 className="text-[24px] font-bold text-center mb-2">クリエイターから企業まで</h2>
          <p className="text-[13px] text-gray-500 text-center mb-10">あらゆる発信者に使えるプロフィールリンクページ</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FOR_EVERYONE.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[18px] mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-[15px] mb-2">{title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Themes ── */}
      <section className="pt-20 pb-4">
        <div className="px-5 mb-6 max-w-lg mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-2">Themes</p>
          <h2 className="text-[24px] font-bold mb-1">プレミアムテーマ</h2>
          <p className="text-[13px] text-gray-500">テーマを変えるだけで、まるで別のページに。</p>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {THEME_PREVIEWS.map((theme) => (
            <div
              key={theme.id}
              className="flex-none w-[148px] rounded-2xl overflow-hidden border border-white/10 [transform:translateZ(0)]"
            >
              <div
                className={`h-[210px] flex flex-col items-center ${'pt' in theme ? theme.pt : 'pt-5'} px-3.5 overflow-hidden`}
                style={
                  'animated' in theme && theme.animated
                    ? {
                        background: 'linear-gradient(270deg, #7c3aed, #2563eb, #ec4899, #7c3aed)',
                        backgroundSize: '300% 300%',
                        animation: 'aurora-card 8s ease infinite',
                      }
                    : { background: theme.bg }
                }
              >
                {'topDecor' in theme && theme.topDecor && (
                  <div className="w-full h-px mb-3 opacity-50" style={{ background: 'linear-gradient(to right, transparent, #d4af37, transparent)' }} />
                )}
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
                <p className="text-[11px] font-bold mb-0.5" style={{ color: theme.textColor }}>Yuna</p>
                <p className="text-[8px] mb-3" style={{ color: theme.subColor }}>photographer · Tokyo</p>
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

      {/* ── Features Grid ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-2 text-center">
            Features
          </p>
          <h2 className="text-[24px] font-bold text-center mb-2">Veyraでできること</h2>
          <p className="text-[13px] text-gray-500 text-center mb-10">必要なものが、すべて揃っています</p>

          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="text-[22px] mb-3">{icon}</div>
                <h3 className="font-bold text-[13px] mb-1">{title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-2">
            How it works
          </p>
          <h2 className="text-[24px] font-bold mb-2">3ステップで完成</h2>
          <p className="text-[13px] text-gray-500 mb-10">登録からページ公開まで、5分とかかりません。</p>

          <div className="space-y-px">
            {[
              { step: '01', title: 'アカウント作成', desc: 'メールアドレスだけで無料登録。30秒で完了。' },
              { step: '02', title: 'リンクを追加', desc: 'Instagram・X・YouTubeなどのリンクをまとめる。' },
              { step: '03', title: 'SNSに貼る', desc: 'あなただけのURLをプロフィールに設定して完成。' },
            ].map(({ step, title, desc }, idx) => (
              <div key={step} className="flex gap-5 items-start">
                <div className="flex flex-col items-center flex-none">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#d4af37]">{step}</span>
                  </div>
                  {idx < 2 && <div className="w-px h-8 bg-white/8 my-1" />}
                </div>
                <div className="pt-2 pb-6">
                  <h3 className="font-bold text-[15px] mb-1">{title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="px-5 pt-20 pb-6">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-2">
            Pricing
          </p>
          <h2 className="text-[24px] font-bold mb-2">シンプルな料金</h2>
          <p className="text-[13px] text-gray-500 mb-10">まず無料で始めて、必要なら追加購入</p>

          <div className="rounded-3xl border border-white/10 p-6 bg-white/[0.03] mb-4">
            <h3 className="text-base font-bold mb-1">無料プラン</h3>
            <p className="text-[36px] font-bold tracking-tight mb-5">¥0</p>
            <ul className="space-y-3 text-[13px] text-gray-400 mb-6">
              {['無料テーマ 2種類', 'リンク無制限', 'カスタムプロフィール', 'Veyra ロゴ表示あり'].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex-none w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full py-3.5 text-center border border-white/15 rounded-2xl text-[13px] font-semibold hover:bg-white/5 active:scale-[0.98] transition-all"
            >
              無料で始める
            </Link>
          </div>

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
            <p className="text-[36px] font-bold tracking-tight mb-0.5">
              ¥500<span className="text-base text-gray-500 font-normal">〜</span>
            </p>
            <p className="text-[11px] text-gray-600 mb-6">テーマごとの一括購入</p>
            <ul className="space-y-3 text-[13px] text-gray-400 mb-6">
              {[
                'Luxury Black — ¥500',
                'Glass Premium — ¥500',
                'Neon Glow — ¥600',
                'Animated Aurora — ¥900',
                'ロゴ削除 — ¥300',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex-none w-4 h-4 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[8px] text-[#d4af37]">✦</span>
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

      {/* ── FAQ ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-[#d4af37] font-bold tracking-[0.15em] uppercase mb-2">FAQ</p>
          <h2 className="text-[24px] font-bold mb-10">よくある質問</h2>
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
                a: 'あなたの公開ページURLをTikTok・Instagram・Xなどのプロフィールに貼るだけです。',
              },
              {
                q: 'リンクは何個まで追加できますか？',
                a: '無制限に追加できます。表示/非表示の切り替えも自由です。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <h3 className="font-bold text-[14px] mb-2">{q}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-5 pt-20 pb-24 text-center">
        <div className="max-w-sm mx-auto">
          <div
            className="rounded-3xl border border-[#d4af37]/15 p-8"
            style={{ background: 'linear-gradient(160deg, #131008, #0a0a0a)' }}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            </div>
            <h2 className="text-[22px] font-bold mb-3">今すぐページを作ろう</h2>
            <p className="text-[13px] text-gray-500 mb-7">無料で始めて、あなたのブランドを発信</p>
            <Link
              href="/signup"
              className="block w-full py-[15px] bg-white text-black font-bold rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
            >
              無料で始める →
            </Link>
            <p className="mt-3 text-[12px] text-gray-700">クレジットカード不要</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-5 py-10">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-sm font-bold tracking-wider">Veyra</span>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-gray-600">
              <a href="#features" className="hover:text-gray-400 transition-colors">機能</a>
              <a href="#pricing" className="hover:text-gray-400 transition-colors">料金</a>
              <Link href="/login" className="hover:text-gray-400 transition-colors">ログイン</Link>
              <Link href="/signup" className="hover:text-gray-400 transition-colors">新規登録</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-700">© 2026 Veyra. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
