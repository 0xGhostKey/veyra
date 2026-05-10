import type { Link } from '@/types'
import type { ReactNode } from 'react'

type Props = {
  links: Link[]
  renderTextLink: (link: Link, index: number) => ReactNode
  gap?: string
  titleColor?: string
}

export default function MixedLinks({ links, renderTextLink, gap = 'gap-2.5' }: Props) {
  return (
    <div className={`flex flex-col ${gap}`}>
      {links.map((link, index) => renderTextLink(link, index))}
    </div>
  )
}
