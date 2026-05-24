import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veyra — 自分らしいプロフィールページを、好きなデザインで。',
}

const CAROUSEL_AVATARS = [
  { initial: 'Y', name: '@yuna_photo',  color: 'linear-gradient(135deg, #f472b6, #a855f7)' },
  { initial: 'R', name: '@reo_music',   color: 'linear-gradient(135deg, #60a5fa, #3b82f6)' },
  { initial: 'M', name: '@mei_design',  color: 'linear-gradient(135deg, #34d399, #059669)' },
  { initial: 'K', name: '@kai_video',   color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { initial: 'S', name: '@sora_art',    color: 'linear-gradient(135deg, #e87ca8, #8a2040)' },
  { initial: 'H', name: '@hana_shop',   color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { initial: 'A', name: '@aki_style',   color: 'linear-gradient(135deg, #a78bfa, #7c3aed)' },
  { initial: 'T', name: '@tao_brand',   color: 'linear-gradient(135deg, #c0c8d8, #607080)' },
  { initial: 'N', name: '@nao_photo',   color: 'linear-gradient(135deg, #f97316, #ef4444)' },
  { initial: 'J', name: '@jun_style',   color: 'linear-gradient(135deg, #2dd4bf, #0891b2)' },
]

const THEME_PREVIEWS = [
  {
    id: 'sakura_white',
    name: 'Sakura White',
    series: 'Sakura',
    badge: '桜',
    accent: '#c4849a',
    bg: '#fdf6f8',
    avatarBg: 'linear-gradient(135deg, #e8b4c0, #c4849a)',
    avatarBorder: 'transparent',
    textColor: '#3d2030',
    subColor: '#8a6070',
    linkBorder: '#e8b4c0',
    linkBg: '#ffffff',
    linkText: '#5a2840',
    cardBg: '#f0eaec',
    light: true,
  },
  {
    id: 'ocean_arctic',
    name: 'Ocean Arctic',
    series: 'Ocean',
    badge: '波',
    accent: '#a0d8f8',
    bg: '#04080e',
    avatarBg: 'linear-gradient(135deg, #a0d8f8, #2050a0)',
    avatarBorder: 'rgba(160,216,248,0.4)',
    textColor: '#d0ecff',
    subColor: '#3060a0',
    linkBorder: 'rgba(160,216,248,0.2)',
    linkBg: 'rgba(160,216,248,0.07)',
    linkText: '#a0d8f8',
    cardBg: '#0a1018',
    light: false,
  },
  {
    id: 'neon_violet',
    name: 'Neon Violet',
    series: 'Neon',
    badge: 'NEON',
    accent: '#c77dff',
    bg: '#08000f',
    avatarBg: 'rgba(199,125,255,0.15)',
    avatarBorder: 'rgba(199,125,255,0.6)',
    textColor: '#ffffff',
    subColor: 'rgba(199,125,255,0.6)',
    linkBorder: 'rgba(199,125,255,0.25)',
    linkBg: 'rgba(199,125,255,0.06)',
    linkText: 'rgba(199,125,255,0.9)',
    cardBg: '#0d0014',
    light: false,
  },
  {
    id: 'chrome_silver',
    name: 'Chrome Silver',
    series: 'Chrome',
    badge: '金属',
    accent: '#b0bcd0',
    bg: '#060810',
    avatarBg: 'linear-gradient(135deg, #b0bcd0, #506080)',
    avatarBorder: 'transparent',
    textColor: '#c8d4e8',
    subColor: '#506880',
    linkBorder: 'rgba(176,188,208,0.2)',
    linkBg: 'rgba(176,188,208,0.05)',
    linkText: '#b0bcd0',
    cardBg: '#0c1018',
    light: false,
  },
  {
    id: 'luxury_black',
    name: 'Luxury Black',
    series: 'Luxury',
    badge: 'LUXURY',
    accent: '#d4af37',
    bg: '#0a0a0a',
    avatarBg: 'linear-gradient(135deg, #d4af37, #8B6914)',
    avatarBorder: 'transparent',
    textColor: '#ffffff',
    subColor: '#d4af37',
    linkBorder: 'rgba(212,175,55,0.25)',
    linkBg: 'rgba(212,175,55,0.07)',
    linkText: '#d4af37',
    cardBg: '#111',
    topDecor: true,
    light: false,
  },
  {
    id: 'sakura_dusk',
    name: 'Sakura Dusk',
    series: 'Sakura',
    badge: '夜桜',
    accent: '#e87ca8',
    bg: '#13090d',
    avatarBg: 'linear-gradient(135deg, #e87ca8, #8a2040)',
    avatarBorder: 'transparent',
    textColor: '#f0c8d8',
    subColor: '#a06878',
    linkBorder: 'rgba(232,124,168,0.3)',
    linkBg: '#1e0a12',
    linkText: '#e87ca8',
    cardBg: '#120810',
    light: false,
  },
  {
    id: 'neon_amber',
    name: 'Neon Amber',
    series: 'Neon',
    badge: 'NEON',
    accent: '#ffb300',
    bg: '#0d0800',
    avatarBg: 'rgba(255,179,0,0.15)',
    avatarBorder: 'rgba(255,179,0,0.6)',
    textColor: '#ffffff',
    subColor: 'rgba(255,179,0,0.6)',
    linkBorder: 'rgba(255,179,0,0.25)',
    linkBg: 'rgba(255,179,0,0.06)',
    linkText: 'rgba(255,179,0,0.9)',
    cardBg: '#100e00',
    light: false,
  },
  {
    id: 'ocean_lagoon',
    name: 'Ocean Lagoon',
    series: 'Ocean',
    badge: '波',
    accent: '#40e0c0',
    bg: '#020d0a',
    avatarBg: 'linear-gradient(135deg, #40e0c0, #008060)',
    avatarBorder: 'rgba(64,224,192,0.4)',
    textColor: '#c0f4e8',
    subColor: '#208060',
    linkBorder: 'rgba(64,224,192,0.2)',
    linkBg: 'rgba(64,224,192,0.06)',
    linkText: '#40e0c0',
    cardBg: '#060e0c',
    light: false,
  },
  {
    id: 'ember_red',
    name: 'Ember Red',
    series: 'Ember',
    badge: '炎',
    accent: '#ff4400',
    bg: '#0f0300',
    avatarBg: 'linear-gradient(135deg, #ff7700, #cc2200)',
    avatarBorder: 'rgba(255,68,0,0.5)',
    textColor: '#ffaa77',
    subColor: '#994422',
    linkBorder: 'rgba(255,68,0,0.2)',
    linkBg: 'rgba(255,68,0,0.06)',
    linkText: '#ff7700',
    cardBg: '#1a0800',
    light: false,
  },
  {
    id: 'botanical_moss',
    name: 'Botanical Moss',
    series: 'Botanical',
    badge: '葉',
    accent: '#7ec850',
    bg: '#080c05',
    avatarBg: 'linear-gradient(135deg, #a0e870, #3a8020)',
    avatarBorder: 'rgba(126,200,80,0.4)',
    textColor: '#c0f090',
    subColor: '#4a7030',
    linkBorder: 'rgba(126,200,80,0.2)',
    linkBg: 'rgba(126,200,80,0.06)',
    linkText: '#a0e870',
    cardBg: '#0d1408',
    light: false,
  },
  {
    id: 'glitch_green',
    name: 'Glitch Green',
    series: 'Glitch',
    badge: 'GLITCH',
    accent: '#00ff41',
    bg: '#000800',
    avatarBg: 'rgba(0,255,65,0.15)',
    avatarBorder: 'rgba(0,255,65,0.6)',
    textColor: '#00ff41',
    subColor: '#008020',
    linkBorder: 'rgba(0,255,65,0.3)',
    linkBg: 'rgba(0,255,65,0.05)',
    linkText: '#00ff41',
    cardBg: '#001800',
    light: false,
  },
]

const USE_CASES = [
  {
    num: '01',
    title: 'リンクをまとめたい',
    desc: 'Instagram・X・LINE・連絡先…バラバラなリンクをひとつのページに。SNSのプロフィールに貼るだけで完成。',
  },
  {
    num: '02',
    title: 'おしゃれなページを持ちたい',
    desc: '桜・海・ネオン・クロームなど、テーマを選ぶだけでデザインが完成。自分のスタイルに合った見た目に。',
  },
  {
    num: '03',
    title: '仕事・副業に使いたい',
    desc: 'ポートフォリオ・問い合わせ先・予約ページをひとまとめにして、そのまま名刺代わりに。',
  },
]

const SERIES = [
  { name: 'Sakura',    desc: '桜・花びらアニメ',   color: '#e87ca8' },
  { name: 'Ocean',     desc: '海・波アニメ',        color: '#40e0c0' },
  { name: 'Neon',      desc: 'サイバー・発光',      color: '#c77dff' },
  { name: 'Chrome',    desc: 'メタリック',           color: '#b0bcd0' },
  { name: 'Luxury',    desc: '上品・エレガント',    color: '#d4af37' },
  { name: 'Snow',      desc: '雪・結晶アニメ',      color: '#a8d4ff' },
  { name: 'Ember',     desc: '炎・火花アニメ',      color: '#ff6600' },
  { name: 'Botanical', desc: '植物・葉っぱアニメ',  color: '#7ec850' },
  { name: 'Glitch',    desc: 'デジタルノイズ',      color: '#00ff41' },
]

const FEATURES = [
  { title: '豊富なテーマ',       desc: 'シリーズ続々追加中。気分やブランドに合ったデザインを選べます。' },
  { title: 'アニメーション対応', desc: '花びら・波など、動くテーマで個性を際立たせます。' },
  { title: 'リンクをまとめる',   desc: 'SNS・サイト・ECなどのリンクをひとつのページに集約。' },
  { title: '画像ギャラリー',     desc: '写真をそのままリンクに。ビジュアルで訴求できます。' },
  { title: 'スマホ最適化',       desc: 'どのデバイスでも美しく表示されます。' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-carousel {
          animation: carousel-scroll 32s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
        .theme-card-scroll {
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .theme-card-scroll > * {
          scroll-snap-align: start;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
      <section className="relative px-5 pt-16 pb-6 text-center overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 600, height: 280,
            background: 'radial-gradient(ellipse at center top, rgba(168,85,247,0.10) 0%, rgba(99,102,241,0.05) 45%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        <div className="max-w-md mx-auto relative">
          <h1 className="text-[2.8rem] leading-[1.15] font-bold mb-5 tracking-tight">
            あなたらしさを、
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 40%, #60a5fa 75%, #34d399 100%)' }}
            >
              好きなデザインで。
            </span>
          </h1>

          <p className="text-[15px] text-gray-400 leading-relaxed mb-8">
            リンクをまとめるだけじゃない。<br />
            テーマを選んで、あなただけのページを作ろう。
          </p>

          <Link
            href="/signup"
            className="inline-block px-8 py-[15px] bg-white text-black font-bold rounded-full hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
          >
            無料で作ってみる →
          </Link>
          <p className="mt-3 text-[12px] text-gray-700">登録30秒 · クレジットカード不要</p>
        </div>

        {/* Avatar carousel */}
        <div className="mt-14 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />
          <div className="flex gap-2 animate-carousel w-max">
            {[...CAROUSEL_AVATARS, ...CAROUSEL_AVATARS, ...CAROUSEL_AVATARS].map((a, i) => (
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

      {/* ── Use Cases ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2 text-center">Who is it for</p>
          <h2 className="text-[24px] font-bold text-center mb-2">こんな使い方ができます</h2>
          <p className="text-[13px] text-gray-500 text-center mb-10">クリエイターから普通の人まで、リンクをまとめたい人なら誰でも。</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {USE_CASES.map(({ num, title, desc }) => (
              <div key={num} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <div className="text-[10px] font-bold tracking-[0.2em] text-gray-700 mb-4">{num}</div>
                <h3 className="font-bold text-[15px] mb-2">{title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Series ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2 text-center">Series</p>
          <h2 className="text-[24px] font-bold text-center mb-2">テーマはシリーズ展開</h2>
          <p className="text-[13px] text-gray-500 text-center mb-8">各シリーズに複数のテーマ。続々追加中です。</p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SERIES.map(({ name, desc, color }) => (
              <div
                key={name}
                className="flex items-center gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-5 py-3.5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />
                <div className="w-1 h-7 rounded-full flex-none" style={{ background: color }} />
                <div>
                  <div className="text-[13px] font-semibold">{name}</div>
                  <div className="text-[11px] text-gray-600">{desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Theme Gallery ── */}
      <section id="themes" className="pt-20 pb-4">
        <div className="px-5 mb-6 max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">Themes</p>
          <h2 className="text-[24px] font-bold mb-1">テーマを選ぶ</h2>
          <p className="text-[13px] text-gray-500">好みのスタイルを見つけてください。</p>
        </div>

        <div className="px-5 grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {THEME_PREVIEWS.map((theme) => (
            <div
              key={theme.id}
              className="rounded-2xl overflow-hidden border border-white/10 [transform:translateZ(0)]"
            >
              {/* Card body */}
              <div
                className="w-full h-[200px] flex flex-col items-center pt-5 px-3.5 overflow-hidden"
                style={{ background: theme.bg }}
              >
                {'topDecor' in theme && theme.topDecor && (
                  <div className="w-full h-px mb-3 opacity-40" style={{ background: `linear-gradient(to right, transparent, ${theme.accent}, transparent)` }} />
                )}
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-bold mb-2 flex-none"
                  style={{
                    background: theme.avatarBg,
                    border: `1.5px solid ${theme.avatarBorder}`,
                    color: theme.light ? '#5a2840' : '#fff',
                    boxShadow: `0 0 14px ${theme.accent}55`,
                  }}
                >
                  Y
                </div>
                <p className="text-[11px] font-bold mb-0.5" style={{ color: theme.textColor }}>Yuna</p>
                <p className="text-[8px] mb-3" style={{ color: theme.subColor }}>@yuna</p>
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
              {/* Card footer */}
              <div className="px-3 py-2.5" style={{ background: theme.cardBg }}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold" style={{ color: theme.light ? '#3d2030' : '#fff' }}>
                    {theme.name}
                  </span>
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: `${theme.accent}22`, color: theme.accent }}
                  >
                    {theme.series}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 mt-3 max-w-lg mx-auto">
          <Link
            href="/signup"
            className="block w-full py-3 text-center border border-white/10 rounded-2xl text-[13px] text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            すべてのテーマを確認する →
          </Link>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="px-5 pt-20 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2 text-center">Features</p>
          <h2 className="text-[24px] font-bold text-center mb-2">Veyraでできること</h2>
          <p className="text-[13px] text-gray-500 text-center mb-10">必要なものが、すべて揃っています</p>

          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="w-5 h-px mb-4" style={{ background: 'rgba(255,255,255,0.15)' }} />
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
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">How it works</p>
          <h2 className="text-[24px] font-bold mb-2">3ステップで完成</h2>
          <p className="text-[13px] text-gray-500 mb-10">登録からページ公開まで、5分とかかりません。</p>

          <div className="space-y-px">
            {[
              { step: '01', title: 'アカウント作成',     desc: 'メールアドレスだけで登録。30秒で完了。' },
              { step: '02', title: 'テーマ・リンク設定', desc: '好きなテーマを選び、SNSやサイトのリンクを追加。' },
              { step: '03', title: 'SNSに貼る',          desc: 'あなただけのURLをプロフィールに設定して完成。' },
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

      {/* ── FAQ ── */}
      <section className="px-5 pt-20 pb-6">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">FAQ</p>
          <h2 className="text-[24px] font-bold mb-10">よくある質問</h2>
          <div className="space-y-3">
            {[
              {
                q: 'テーマはいつでも変えられますか？',
                a: 'はい。ダッシュボードからいつでも切り替え可能。購入済みのテーマは何度でも使えます。',
              },
              {
                q: 'SNSのプロフィールにどう使うの？',
                a: 'あなたの公開ページURLをTikTok・Instagram・Xなどのプロフィールに貼るだけです。',
              },
              {
                q: 'クリエイターじゃないと使えない？',
                a: 'いいえ。普通の自己紹介や連絡先まとめとして使う人も多いです。誰でも利用できます。',
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
            <h2 className="text-[22px] font-bold mb-3">さっそく作ってみよう</h2>
            <p className="text-[13px] text-gray-500 mb-7">好きなテーマを選んで、あなただけのページを。</p>
            <Link
              href="/signup"
              className="block w-full py-[15px] bg-white text-black font-bold rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all text-[15px]"
            >
              無料で作ってみる →
            </Link>
            <p className="mt-3 text-[12px] text-gray-700">登録30秒 · クレジットカード不要</p>
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
              <Link href="/login"  className="hover:text-gray-400 transition-colors">ログイン</Link>
              <Link href="/signup" className="hover:text-gray-400 transition-colors">新規登録</Link>
              <Link href="/terms"   className="hover:text-gray-400 transition-colors">利用規約</Link>
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">プライバシー</Link>
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
