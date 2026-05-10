'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import LinkCard from './LinkCard'
import type { Link } from '@/types'

type Props = {
  link: Link
  onEdit: (link: Link) => void
  onDelete: (linkId: string) => void
  onToggleActive: (linkId: string, isActive: boolean) => void
}

export default function SortableLinkCard({ link, onEdit, onDelete, onToggleActive }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <LinkCard
        link={link}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  )
}
