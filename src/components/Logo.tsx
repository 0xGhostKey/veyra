type LogoProps = {
  dark?: boolean
  gold?: boolean
  size?: 'sm' | 'md'
}

export default function Logo({ dark = false, gold = false, size = 'sm' }: LogoProps) {
  const textColor = gold
    ? 'text-[#d4af37]'
    : dark
    ? 'text-gray-500'
    : 'text-gray-400'

  const dotColor = gold ? 'bg-[#d4af37]' : 'bg-purple-500'

  return (
    <a
      href="/"
      className={`flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      }`}
      aria-label="Powered by Veyra"
    >
      <span className={`inline-block ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full ${dotColor}`} />
      <span className={`font-semibold tracking-wide ${textColor}`}>
        Powered by <span className="font-bold">Veyra</span>
      </span>
    </a>
  )
}
