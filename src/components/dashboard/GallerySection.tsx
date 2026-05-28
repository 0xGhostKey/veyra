'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  type SensorDescriptor,
  type SensorOptions,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Link as LinkType } from '@/types'

type EditingGalleryPhoto = { id: string | null; image_url: string | null; previewSrc: string | null; file: File | null }

type Props = {
  galleryPhotos: LinkType[]
  showGalleryForm: boolean
  editingGalleryPhoto: EditingGalleryPhoto | null
  uploadingGalleryPhoto: boolean
  sensors: SensorDescriptor<SensorOptions>[]
  onOpenForm: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
  onClose: () => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, isActive: boolean) => void
  onDragEnd: (event: DragEndEvent) => void
}

export default function GallerySection({
  galleryPhotos, showGalleryForm, editingGalleryPhoto, uploadingGalleryPhoto, sensors,
  onOpenForm, onFileChange, onSave, onClose, onDelete, onToggleActive, onDragEnd,
}: Props) {
  return (
    <section className="bg-[#111] rounded-3xl border border-white/8 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-bold text-gray-500 tracking-[0.12em] uppercase">フォトギャラリー</p>
          <p className="text-[11px] text-gray-700 mt-0.5">最大3枚 · タップで拡大表示</p>
        </div>
        {galleryPhotos.length < 3 && (
          <button onClick={onOpenForm}
            className="w-8 h-8 bg-white/8 hover:bg-white/15 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        )}
      </div>

      {showGalleryForm && editingGalleryPhoto && (
        <div className="mb-4 p-4 bg-white/5 border border-white/8 rounded-2xl space-y-3">
          <label className="block cursor-pointer">
            <div className="w-1/2 mx-auto rounded-xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center overflow-hidden" style={{ aspectRatio: '5/7' }}>
              {editingGalleryPhoto.previewSrc || editingGalleryPhoto.image_url ? (
                <img src={editingGalleryPhoto.previewSrc ?? editingGalleryPhoto.image_url!} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center py-6 px-3">
                  <svg className="w-7 h-7 text-gray-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[11px] text-gray-600">写真を選択</p>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>
          <div className="flex gap-2">
            <button onClick={onSave}
              disabled={uploadingGalleryPhoto || (!editingGalleryPhoto.file && !editingGalleryPhoto.image_url)}
              className="flex-1 py-3 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40">
              {uploadingGalleryPhoto ? 'アップロード中...' : '追加'}
            </button>
            <button onClick={onClose}
              className="flex-1 py-3 bg-white/5 border border-white/8 text-gray-400 text-[13px] font-medium rounded-xl hover:bg-white/10 transition-colors">
              キャンセル
            </button>
          </div>
        </div>
      )}

      {galleryPhotos.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-600 text-[13px] mb-3">写真がありません</p>
          <button onClick={onOpenForm} className="text-[13px] text-[#d4af37] hover:text-[#e8cc6a] transition-colors">+ 写真を追加する</button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={galleryPhotos.map(p => p.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 gap-2">
              {galleryPhotos.map(photo => (
                <SortableGalleryCell
                  key={photo.id}
                  photo={photo}
                  onDelete={onDelete}
                  onToggleActive={onToggleActive}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </section>
  )
}

function SortableGalleryCell({
  photo,
  onDelete,
  onToggleActive,
}: {
  photo: { id: string; image_url: string | null; is_active: boolean }
  onDelete: (id: string) => void
  onToggleActive: (id: string, isActive: boolean) => void
}) {
  const [confirming, setConfirming] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: photo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div className="rounded-xl overflow-hidden [transform:translateZ(0)]"
        style={{ aspectRatio: '5/7', opacity: photo.is_active ? 1 : 0.35 }}>
        <img src={photo.image_url!} alt="" className="w-full h-full object-cover" />
      </div>

      {confirming && (
        <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-2 bg-black/70 backdrop-blur-sm">
          <p className="text-[10px] text-white/80 font-medium text-center px-1">削除しますか？</p>
          <button onClick={() => onDelete(photo.id)}
            className="w-14 py-1 bg-red-500/80 hover:bg-red-500 rounded-lg text-[11px] font-bold text-white transition-colors">
            削除
          </button>
          <button onClick={() => setConfirming(false)}
            className="w-14 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-medium text-white/70 transition-colors">
            戻る
          </button>
        </div>
      )}

      {!confirming && (
        <>
          <div {...attributes} {...listeners}
            className="absolute top-1.5 left-1.5 w-6 h-6 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing touch-none">
            <svg className="w-3.5 h-3.5 text-white/70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </div>
          <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onToggleActive(photo.id, !photo.is_active)}
              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${photo.is_active ? 'bg-green-500/70 hover:bg-green-500/90' : 'bg-black/50 hover:bg-white/20'}`}>
              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20">
                <path fill="currentColor" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.003 10.003 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.003 10.003 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41Z" />
                <circle cx="10" cy="10" r="3.3" fill={photo.is_active ? '#22c55e' : '#000'} />
                <circle cx="10" cy="10" r="1.3" fill="currentColor" />
              </svg>
            </button>
            <button onClick={() => setConfirming(true)}
              className="w-6 h-6 bg-black/50 rounded-lg flex items-center justify-center hover:bg-red-500/80 transition-colors">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
