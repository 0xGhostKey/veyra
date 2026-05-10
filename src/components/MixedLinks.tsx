import type { Link } from '@/types'
import type { ReactNode } from 'react'

type Props = {
  links: Link[]
  renderTextLink: (link: Link) => ReactNode
  gap?: string
}

// Renders text + image links in unified sort order.
// Consecutive image links (up to 2) are placed side by side.
// A lone image link occupies half the row width.
export default function MixedLinks({ links, renderTextLink, gap = 'gap-2.5' }: Props) {
  const items: ReactNode[] = []
  let i = 0

  while (i < links.length) {
    const link = links[i]

    if (link.link_type === 'image') {
      const pair: Link[] = [link]
      if (i + 1 < links.length && links[i + 1].link_type === 'image') {
        pair.push(links[i + 1])
        i += 2
      } else {
        i++
      }

      items.push(
        <div key={link.id} className="flex gap-2.5">
          {pair.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 block rounded-2xl overflow-hidden active:scale-[0.97] transition-transform [transform:translateZ(0)]"
              style={{ aspectRatio: '5/7' }}
            >
              {l.image_url && (
                <img src={l.image_url} alt={l.title || ''} className="w-full h-full object-cover" />
              )}
            </a>
          ))}
        </div>
      )
    } else {
      items.push(renderTextLink(link))
      i++
    }
  }

  return <div className={`flex flex-col ${gap}`}>{items}</div>
}
