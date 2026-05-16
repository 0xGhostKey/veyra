import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veyra — 自分らしいプロフィールページを、好きなデザインで。',
}

const CAROUSEL_AVATARS = [
  { initial: 'Y', name: '@yuna_photo',   color: 'linear-gradient(135deg, #f472b6, #a855f7)' },
  { initial: 'R', name: '@reo_music',    color: 'linear-gradient(135deg, #60a5fa, #3b82f6)' },
  { initial: 'M', name: '@mei_design',   color: 'linear-gradient(135deg, #34d399, #059669)' },
  { initial: 'K', name: '@kai_video',    color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { initial: 'S', name: '@sora_art',     color: 'linear-gradient(135deg, #e87ca8, #8a2040)' },
  { initial: 'H', name: '@hana_shop',    color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { initial: 'A', name: '@aki_style',    color: 'linear-gradient(135deg, #a78bfa, #7c3aed)' },
  { initial: 'T', name: '@tao_brand',    color: 'linear-gradient(135deg, #a0d8f8, #2050a0)' },
]

// Theme preview cards — show design variety across series
const THEME_PREVIEWS = [
  {
    id: 'sakura_white',
    name: 'Sakura White',
    series: 'Sakura',
    accent: '#c4849a',
    bg: '#fdf6f8',
    badge: '花びら',
    price: '¥500',
    avatarBg: 'linear-gradient(135deg, #e8b4c0, #c4849a)',
    avatarBorder: 'transparent',
    textColor: '#3d2030',
    subColor: '#8a6070',
    linkBorder: '#e8b4c0',
    linkBg: '#ffffff',
    linkText: '#5a2840',
    light: true,
  },
  {
    id: 'ocean_arctic',
    name: 'Ocean Arctic',
    series: 'Ocean',
    accent: '#a0d8f8',
    bg: '#04080e',
    badge: '波',
    price: '¥500',
    avatarBg: 'linear-gradient(135deg, #a0d8f8, #2050a0)',
    avatarBorder: 'rgba(160,216,248,0.4)',
    textColor: '#d0ecff',
    subColor: '#3060a0',
    linkBorder: 'rgba(160,216,248,0.2)',
    linkBg: 'rgba(160,216,248,0.07)',
    linkText: '#a0d8f8',
    light: false,
  },
  {
    id: 'neon_violet',
    name: 'Neon Violet',
    series: 'Neon',
    accent: '#c77dff',
    bg: '#08000f',
    badge: 'NEON',
    price: '¥600',
    avatarBg: 'rgba(199,125,255,0.15)',
    avatarBorder: 'rgba(199,125,255,0.6)',
    textColor: '#ffffff',
    subColor: 'rgba(199,125,255,0.6)',
    linkBorder: 'rgba(199,125,255,0.25)',
    linkBg: 'rgba(199,125,255,0.06)',
    linkText: 'rgba(199,125,255,0.9)',
    light: false,
  },
  {
    id: 'animated_aurora',
    name: 'Aurora',
    series: 'Animated',
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
    light: false,
  },
  {
    id: 'luxury_black',
    name: 'Luxury Black',
    series: 'Luxury',
    accent: '#d4af37',
    bg: '#0a0a0a',
    badge: 'LUXURY',
    price: '¥500',
    avatarBg: 'linear-gradient(135deg, #d4af37, #8B6914)',
    avatarBorder: 'transparent',
    textColor: '#ffffff',
    subColor: '#d4af37',
    linkBorder: 'rgba(212,175,55,0.25)',
    linkBg: 'rgba(212,175,55,0.07)',
    linkText: '#d4af37',
    topDecor: true,
    light: false,
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
  { icon: '🎨', title: '20以上のテーマ',    desc: 'Sakura・Ocean・Neon・Luxuryなど、シリーズ別に揃えた豊富なデザイン。' },
  { icon: '✦', title: 'アニメーション対応', desc: '花びら・波・オーロラなど、動くテーマで個性を際立たせます。' },
  { icon: '∞', title: 'リンク無制限',       desc: 'SNS・サイト・ECなど、何個でも追加可能。' },
  { icon: '🖼', title: '画像ギャラリー',    desc: '写真をそのままリンクに。ビジュアルで訴求。' },
  { icon: '💳', title: '買い切り課金',       desc: '月額ゼロ。一度買えばずっと使えます。' },
  { icon: '📱', title: 'スマホ最適化',      desc: 'どのデバイスでも美しく表示されます。' },
]

const SERIES = [
  { name: 'Sakura',   desc: '桜・和モダン',     color: '#e87ca8', bg: 'rgba(232,124,168,0.12)' },
  { name: 'Ocean',    desc: '海・波アニメ',      color: '#a0d8f8', bg: 'rgba(160,216,248,0.12)' },
  { name: 'Neon',     desc: 'サイバー・発光',    color: '#c77dff', bg: 'rgba(199,125,255,0.12)' },
  { name: 'Luxury',   desc: '上品・金属質感',    color: '#d4af37', bg: 'rgba(212,175,55,0.12)'  },
  { name: 'Chrome',   desc: 'メタリック',        color: '#c0c8d8', bg: 'rgba(192,200,216,0.12)' },
  { name: 'Animated', desc: 'オーロラ・動く背景', color: '#ec4899', bg: 'rgba(236,72,153,0.12)'  },
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
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }} />
            <span className="text-[17px] font-bold tracking-wider">Veyra</span>
          </div>
          <div className="hidden sm:flex items-center gap-7">
            <a href="#themes"   className="text-[13px] text-gray-500 hover:text-white transition-colors">テーマ</a>
            <a href="#features" className="text-[13px] text-gray-500 hover:text-white transition-colors">機能</a>
            <a href="#pricing"  className="text-[13px] text-gray-500 hover:text-white transition-colors">料金</a>
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

          <h1 className="text-[2.8rem] leading-[1.15] font-bold mb-5 tracking-tight">
            あなたらしさを、
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 40%, #60a5fa 70%, #34d399 100%)' }}
            >
              好きなデザインで。
            </span>
          </h1>

          <p className="text-[15px] text-gray-400 leading-relaxed mb-8">
            桜・海・ネオン・オーロラ…<br />
            20以上のテーマから選んで、あなただけのプロフィールページに。
          </p>

          <Link
            href="/signup"
            className="inline-block px-8 py-[15px] bg-white text-black font-bold rounded-full hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
          >
            テーマを選ぶ →
          </Link>
          <p className="mt-3 text-[12px] text-gray-700">無料で登録 · 30秒で完了</p>
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

      {/* ── Series ── */}
      <section id="themes" className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2 text-center">Series</p>
          <h2 className="text-[24px] font-bold text-center mb-2">6つのシリーズ</h2>
          <p className="text-[13px] text-gray-500 text-center mb-8">テーマはシリーズで展開。気分やブランドに合わせて選べます。</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {SERIES.map(({ name, desc, color, bg }) => (
              <div
                key={name}
                className="rounded-2xl p-4 border border-white/5"
                style={{ background: bg }}
              >
                <div
                  className="text-[11px] font-bold tracking-wide mb-1"
                  style={{ color }}
                >
                  {name}
                </div>
                <div className="text-[12px] text-gray-400">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Theme Previews ── */}
      <section className="pt-14 pb-4">
        <div className="px-5 mb-6 max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">Themes</p>
          <h2 className="text-[24px] font-bold mb-1">テーマギャラリー</h2>
          <p className="text-[13px] text-gray-500">スクロールして雰囲気を比べてみてください。</p>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {THEME_PREVIEWS.map((theme) => (
            <div
              key={theme.id}
              className="flex-none w-[148px] rounded-2xl overflow-hidden border border-white/10 [transform:translateZ(0)]"
            >
              <div
                className="h-[210px] flex flex-col items-center pt-5 px-3.5 overflow-hidden"
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
                  <div className="w-full h-px mb-3 opacity-50" style={{ background: `linear-gradient(to right, transparent, ${theme.accent}, transparent)` }} />
                )}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-bold mb-2 flex-none"
                  style={{
                    background: theme.avatarBg,
                    border: `1.5px solid ${theme.avatarBorder ?? 'transparent'}`,
                    color: theme.light ? theme.accent : '#fff',
                    boxShadow: `0 0 12px ${theme.avatarBorder !== 'transparent' ? theme.avatarBorder : theme.accent + '40'}`,
                  }}
                >
                  Y
                </div>
                <p className="text-[11px] font-bold mb-0.5" style={{ color: theme.textColor }}>Yuna</p>
                <p className="text-[8px] mb-3" style={{ color: theme.subColor }}>photographer</p>
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
              <div className="p-3" style={{ background: theme.light ? '#f0eaec' : '#111' }}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-bold truncate mr-1" style={{ color: theme.light ? '#3d2030' : '#fff' }}>{theme.name}</span>
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded-full flex-none font-bold"
                    style={{ background: theme.light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', color: theme.accent }}
                  >
                    {theme.badge}
                  </span>
                </div>
                <span className="text-[11px] font-semibold" style={{ color: theme.accent }}>{theme.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 mt-4 max-w-lg mx-auto">
          <Link
            href="/signup"
            className="block w-full py-3 text-center border border-white/10 rounded-2xl text-[13px] text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            すべてのテーマを見る →
          </Link>
        </div>
      </section>

      {/* ── For Everyone ── */}
      <section id="features" className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2 text-center">
            For Everyone
          </p>
          <h2 className="text-[24px] font-bold text-center mb-2">誰でも使えます</h2>
          <p className="text-[13px] text-gray-500 text-center mb-10">あらゆる発信者に使えるプロフィールリンクページ</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FOR_EVERYONE.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[18px] mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-[15px] mb-2">{title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2 text-center">
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
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">
            How it works
          </p>
          <h2 className="text-[24px] font-bold mb-2">3ステップで完成</h2>
          <p className="text-[13px] text-gray-500 mb-10">登録からページ公開まで、5分とかかりません。</p>

          <div className="space-y-px">
            {[
              { step: '01', title: 'アカウント作成', desc: 'メールアドレスだけで登録。30秒で完了。' },
              { step: '02', title: 'テーマとリンクを設定', desc: '好きなテーマを選び、SNSリンクをまとめる。' },
              { step: '03', title: 'SNSに貼る', desc: 'あなただけのURLをプロフィールに設定して完成。' },
            ].map(({ step, title, desc }, idx) => (
              <div key={step} className="flex gap-5 items-start">
                <div className="flex flex-col items-center flex-none">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-400">{step}</span>
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
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">
            Pricing
          </p>
          <h2 className="text-[24px] font-bold mb-2">シンプルな料金</h2>
          <p className="text-[13px] text-gray-500 mb-10">基本は無料。テーマは好きなものだけ買い切りで。</p>

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
              登録する
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 p-6 bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold">テーマ購入</h3>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/8 text-gray-400 font-bold tracking-wide">
                買い切り
              </span>
            </div>
            <p className="text-[36px] font-bold tracking-tight mb-0.5">
              ¥500<span className="text-base text-gray-500 font-normal">〜</span>
            </p>
            <p className="text-[11px] text-gray-600 mb-6">月額なし・テーマごとの一括購入</p>
            <ul className="space-y-3 text-[13px] text-gray-400 mb-6">
              {[
                'Sakura / Ocean / Luxury / Chrome — ¥500',
                'Neon シリーズ — ¥600',
                'Animated Aurora — ¥900',
                'ロゴ削除 — ¥300',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex-none w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-white">✦</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full py-3.5 text-center bg-white text-black font-bold rounded-2xl text-[13px] hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              テーマを選ぶ
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">FAQ</p>
          <h2 className="text-[24px] font-bold mb-10">よくある質問</h2>
          <div className="space-y-3">
            {[
              {
                q: 'テーマはいつでも変えられますか？',
                a: 'はい。ダッシュボードからいつでも切り替え可能です。購入済みのテーマは何度でも使えます。',
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
          <div className="rounded-3xl border border-white/10 p-8 bg-white/[0.02]">
            <div className="flex justify-center gap-2 mb-6">
              {['#f472b6', '#a78bfa', '#60a5fa', '#34d399'].map((c) => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <h2 className="text-[22px] font-bold mb-3">さっそく始めよう</h2>
            <p className="text-[13px] text-gray-500 mb-7">好きなテーマを選んで、自分らしいページを作ろう。</p>
            <Link
              href="/signup"
              className="block w-full py-[15px] bg-white text-black font-bold rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
            >
              テーマを選ぶ →
            </Link>
            <p className="mt-3 text-[12px] text-gray-700">無料で登録 · クレジットカード不要</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-5 py-10">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }} />
              <span className="text-sm font-bold tracking-wider">Veyra</span>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-gray-600">
              <a href="#themes"   className="hover:text-gray-400 transition-colors">テーマ</a>
              <a href="#features" className="hover:text-gray-400 transition-colors">機能</a>
              <a href="#pricing"  className="hover:text-gray-400 transition-colors">料金</a>
              <Link href="/login"  className="hover:text-gray-400 transition-colors">ログイン</Link>
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
