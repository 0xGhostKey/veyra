import type { Link } from '@/types'
import type { ReactNode } from 'react'

type Props = {
  links: Link[]
  renderTextLink: (link: Link) => ReactNode
  gap?: string
  titleColor?: string
}

// Renders text + image links in unified sort order.
// Consecutive image links are paired side by side (2 per row, 5:7 ratio).
// When odd count in a group, top 2 pair first; lone image stays half-width with spacer.
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

      items.push(
        <div key={link.id} className="flex gap-2.5">
          {pair.map((l) => (
            <div key={l.id} className="flex-1 flex flex-col gap-1.5">
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden active:scale-[0.97] transition-transform [transform:translateZ(0)]"
                style={{ aspectRatio: '5/7' }}
              >
                {l.image_url && (
                  <img src={l.image_url} alt={l.title || ''} className="w-full h-full object-cover" />
                )}
              </a>
              {l.title && (
                <p className={`text-[11px] text-center leading-tight px-1 ${titleColor}`}>
                  {l.title}
                </p>
              )}
            </div>
          ))}
          {/* Spacer: keeps lone image at half-width */}
          {pair.length === 1 && <div className="flex-1" />}
        </div>
      )
    } else {
      items.push(renderTextLink(link))
      i++
    }
  }

  return <div className={`flex flex-col ${gap}`}>{items}</div>
}
