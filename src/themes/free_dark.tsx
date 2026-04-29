import type { Profile, Link } from '@/types'
import Logo from '@/components/Logo'

type Props = {
  profile: Profile
  links: Link[]
}

export default function FreeDarkTheme({ profile, links }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center py-12 px-4 pb-safe">
      <div className="w-full max-w-[390px]">
        {/* Avatar + Profile */}
        <div className="flex flex-col items-center mb-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name ?? 'avatar'}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white/10 shadow-lg mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/8 ring-4 ring-white/10 flex items-center justify-center mb-4">
              <span className="text-3xl text-gray-600 font-light select-none">
                {(profile.display_name ?? 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <h1 className="text-[22px] font-bold text-white tracking-tight mb-1.5">
            {profile.display_name ?? 'No Name'}
          </h1>
          {profile.bio && (
            <p className="text-[13px] text-gray-500 text-center leading-relaxed max-w-[270px]">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2.5">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-[15px] bg-white/8 border border-white/10 rounded-2xl text-center text-white font-semibold hover:bg-white/12 active:scale-[0.98] transition-all duration-150 text-[15px]"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Logo */}
        {!profile.logo_removed && (
          <div className="mt-12 flex justify-center">
            <Logo dark />
          </div>
        )}
      </div>
    </div>
  )
}
