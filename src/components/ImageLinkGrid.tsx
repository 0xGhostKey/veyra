import type { Link } from '@/types'

type Props = {
  links: Link[]
}

// 5:7 aspect ratio = aspect-[5/7]
// small: 2 per row (half width), large: full width
export default function ImageLinkGrid({ links }: Props) {
  if (links.length === 0) return null

  return (
    <div className="mt-3">
      <MasonryRow links={links} />
    </div>
  )
}

function MasonryRow({ links }: { links: Link[] }) {
  const rows: Link[][] = []
  let i = 0

  while (i < links.length) {
    const link = links[i]
    if (link.link_size === 'large') {
      rows.push([link])
      i++
    } else {
      // small: try to pair with next small
      const next = links[i + 1]
      if (next && next.link_size !== 'large') {
        rows.push([link, next])
        i += 2
      } else {
        rows.push([link])
        i++
      }
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex gap-2.5 ${row.length === 2 ? '' : ''}`}
        >
          {row.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-2xl overflow-hidden active:scale-[0.97] transition-transform [transform:translateZ(0)] ${
                link.link_size === 'large' || row.length === 1
                  ? 'w-full'
                  : 'flex-1'
              }`}
              style={{ aspectRatio: '5/7' }}
            >
              <img
                src={link.image_url!}
                alt={link.title || ''}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}
