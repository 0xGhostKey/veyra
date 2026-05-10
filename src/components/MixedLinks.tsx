import type { Link } from '@/types'
import type { ReactNode } from 'react'
import ImageLinkCell from './ImageLinkCell'

type Props = {
  links: Link[]
  renderTextLink: (link: Link) => ReactNode
  gap?: string
  titleColor?: string
}

// Renders text + image links in unified sort order.
// Consecutive image links are paired side by side (2 per row, 1:1 ratio).
// When odd count in a group, top 2 pair first; lone image is centered at half-width.
export default function MixedLinks({ links, renderTextLink, gap = 'gap-2.5', titleColor = 'text-gray-400' }: Props) {
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

      if (pair.length === 2) {
        items.push(
          <div key={link.id} className="flex gap-2.5">
            {pair.map((l) => (
              <div key={l.id} className="flex-1">
                <ImageLinkCell link={l} titleColor={titleColor} />
              </div>
            ))}
          </div>
        )
      } else {
        // Single image: centered at half-width
        items.push(
          <div key={link.id} className="flex justify-center">
            <div className="w-1/2">
              <ImageLinkCell link={pair[0]} titleColor={titleColor} />
            </div>
          </div>
        )
      }
    } else {
      items.push(renderTextLink(link))
      i++
    }
  }

  return <div className={`flex flex-col ${gap}`}>{items}</div>
}
