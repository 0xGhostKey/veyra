'use client'

import { useState } from 'react'
import type { Link } from '@/types'

type LinkCardProps = {
  link: Link
  onEdit: (link: Link) => void
  onDelete: (linkId: string) => void
  onToggleActive: (linkId: string, isActive: boolean) => void
  dragHandleProps?: Record<string, unknown>
}

export default function LinkCard({ link, onEdit, onDelete, onToggleActive, dragHandleProps }: LinkCardProps) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-red-500/20 bg-red-500/5">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-gray-400">
            <span className="text-white font-semibold">{link.title}</span> を削除しますか？
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setConfirming(false)}
            className="px-3 py-1.5 text-[12px] font-medium text-gray-400 bg-white/5 border border-white/8 rounded-lg hover:bg-white/10 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="px-3 py-1.5 text-[12px] font-bold text-white bg-red-500/70 border border-red-500/40 rounded-lg hover:bg-red-500/90 transition-colors"
          >
            削除
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-colors ${
        link.is_active
          ? 'bg-white/5 border-white/10'
          : 'bg-white/[0.02] border-white/5 opacity-40'
      }`}
    >
      {/* Drag handle */}
      <div
        className="text-gray-600 cursor-grab active:cursor-grabbing flex-shrink-0 touch-none"
        {...dragHandleProps}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </div>

      {/* Link info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate text-[14px]">{link.title}</p>
        <p className="text-[11px] text-gray-600 truncate mt-0.5">{link.url}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button
          onClick={() => onToggleActive(link.id, !link.is_active)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            link.is_active
              ? 'text-green-400 hover:bg-green-400/10'
              : 'text-gray-600 hover:bg-white/5'
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" clipRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.003 10.003 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.003 10.003 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41Z M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          </svg>
        </button>

        <button
          onClick={() => onEdit(link)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>

        <button
          onClick={() => setConfirming(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}
