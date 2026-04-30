import type { Link } from '@/types'

type Props = {
  links: Link[]
}

export default function ImageLinkGrid({ links }: Props) {
  if (links.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-2.5 mt-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden aspect-square active:scale-[0.97] transition-transform"
        >
          <img
            src={link.image_url!}
            alt={link.title || ''}
            className="w-full h-full object-cover"
          />
        </a>
      ))}
    </div>
  )
}
