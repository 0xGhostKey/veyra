'use client'

import {
  DndContext,
  closestCenter,
  type SensorDescriptor,
  type SensorOptions,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableLinkCard from '@/components/SortableLinkCard'
import type { Link as LinkType } from '@/types'

type EditingLink = { id: string | null; title: string; url: string }

type Props = {
  textLinks: LinkType[]
  imageLinks: LinkType[]
  linkLimit: number
  showLinkForm: boolean
  editingLink: EditingLink | null
  saving: boolean
  sensors: SensorDescriptor<SensorOptions>[]
  onShowForm: () => void
  onEditingLinkChange: (link: EditingLink) => void
  onAdd: () => void
  onUpdate: () => void
  onCancel: () => void
  onEdit: (link: LinkType) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, isActive: boolean) => void
  onDragEnd: (event: DragEndEvent) => void
}

export default function LinksSection({
  textLinks, imageLinks, linkLimit, showLinkForm, editingLink, saving, sensors,
  onShowForm, onEditingLinkChange, onAdd, onUpdate, onCancel, onEdit, onDelete, onToggleActive, onDragEnd,
}: Props) {
  const isUnlimited = linkLimit >= 30
  return (
    <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-bold text-gray-500 tracking-[0.12em] uppercase">リンク</p>
          <span className="text-[10px] text-gray-600">
            {textLinks.length}/{isUnlimited ? '∞' : linkLimit}
          </span>
        </div>
        {textLinks.length < linkLimit ? (
          <button onClick={onShowForm}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white/8 hover:bg-white/15 rounded-lg text-[11px] font-medium text-gray-400 transition-colors">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            追加
          </button>
        ) : (
          <span className="text-[10px] text-gray-600">上限 {linkLimit} 個</span>
        )}
      </div>

      {showLinkForm && editingLink && (
        <div className="mb-3 p-4 bg-white/5 border border-white/8 rounded-2xl space-y-2.5">
          <input type="text" value={editingLink.title}
            onChange={e => onEditingLinkChange({ ...editingLink, title: e.target.value })}
            placeholder="タイトル（例: Instagram）" autoFocus
            className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]" />
          <input type="url" value={editingLink.url}
            onChange={e => onEditingLinkChange({ ...editingLink, url: e.target.value })}
            onKeyDown={e => { if (e.key === 'Enter' && editingLink.title && editingLink.url) { editingLink.id ? onUpdate() : onAdd() } }}
            placeholder="URL（https://...）"
            className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 text-[14px]" />
          <div className="flex gap-2">
            <button onClick={editingLink.id ? onUpdate : onAdd}
              disabled={saving || !editingLink.title || !editingLink.url}
              className="flex-1 py-3 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40">
              {saving ? '...' : editingLink.id ? '更新' : '追加'}
            </button>
            <button onClick={onCancel}
              className="flex-1 py-3 bg-white/5 border border-white/8 text-gray-400 text-[13px] font-medium rounded-xl hover:bg-white/10 transition-colors">
              キャンセル
            </button>
          </div>
        </div>
      )}

      {textLinks.length === 0 && imageLinks.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-600 text-[13px]">リンクがありません</p>
        </div>
      ) : (
        <div className="space-y-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={textLinks.map(l => l.id)} strategy={verticalListSortingStrategy}>
              {textLinks.map(link => (
                <SortableLinkCard
                  key={link.id}
                  link={link}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleActive={onToggleActive}
                />
              ))}
            </SortableContext>
          </DndContext>

          {imageLinks.map(link => (
            <div key={link.id} className="flex items-center gap-3 px-3 py-3 rounded-2xl border border-red-500/20 bg-red-500/5">
              {link.image_url && (
                <div className="flex-none w-8 rounded-lg overflow-hidden bg-white/8" style={{ aspectRatio: '1/1' }}>
                  <img src={link.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-gray-300 truncate">{link.title || link.url || '—'}</p>
                <p className="text-[10px] text-red-400/70 mt-0.5">画像リンク（廃止）</p>
              </div>
              <button onClick={() => onDelete(link.id)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
