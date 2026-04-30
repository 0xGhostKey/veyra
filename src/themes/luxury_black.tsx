import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'
import ImageLinkGrid from '@/components/ImageLinkGrid'

type Props = {
  profile: Profile
  links: Link[]
}

export default function LuxuryBlackTheme({ profile, links }: Props) {
  const textLinks = links.filter((l) => l.link_type !== 'image')
  const imageLinks = links.filter((l) => l.link_type === 'image')

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center py-12 px-4">
      {/* ゴールドラインの装飾 */}
      <div className="w-full max-w-md">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8 opacity-60" />

        {/* アバター・プロフィール */}
        <div className="flex flex-col items-center mb-10">
          {profile.avatar_url ? (
            <div className="p-1 rounded-full bg-gradient-to-br from-[#d4af37] via-[#e8cc6a] to-[#b8962c] mb-4">
              <img
                src={profile.avatar_url}
                alt={profile.display_name ?? 'avatar'}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="p-1 rounded-full bg-gradient-to-br from-[#d4af37] via-[#e8cc6a] to-[#b8962c] mb-4">
              <div className="w-24 h-24 rounded-full bg-[#111] flex items-center justify-center">
                <span className="text-3xl text-[#d4af37]">
                  {(profile.display_name ?? 'U')[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <h1 className="text-2xl font-bold text-white tracking-widest mb-2">
            {profile.display_name ?? 'No Name'}
          </h1>
          {/* ゴールドの区切り線 */}
          <div className="w-12 h-px bg-[#d4af37] mb-3" />
          {profile.bio && (
            <p className="text-gray-400 text-sm text-center leading-relaxed max-w-xs">
              {profile.bio}
            </p>
          )}
        </div>

        {/* リンク一覧 */}
        <div className="flex flex-col gap-4">
          {textLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full px-6 py-4 bg-[#111111] border border-[#d4af37]/30 rounded-2xl text-center text-white font-medium tracking-wider hover:border-[#d4af37] hover:bg-[#1a1a1a] transition-all duration-300 relative overflow-hidden"
            >
              {/* ホバー時のゴールドシマー */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{link.title}</span>
            </a>
          ))}
        </div>

        <ImageLinkGrid links={imageLinks} />

        {/* ボトム装飾 */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-10 mb-6 opacity-60" />

        {/* ロゴ */}
        {!profile.logo_removed && (
          <div className="flex justify-center">
            <Logo dark gold />
          </div>
        )}
      </div>
    </div>
  )
}
