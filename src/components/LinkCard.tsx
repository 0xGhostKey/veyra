'use client'

import { useState } from 'react'
import type { Link } from '@/types'

type LinkCardProps = {
  link: Link
  onEdit: (link: Link) => void
  onDelete: (linkId: string) => void
  onToggleActive: (linkId: string, isActive: boolean) => void
}

export default function LinkCard({ link, onEdit, onDelete, onToggleActive }: LinkCardProps) {
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
      <div className="text-gray-700 cursor-grab flex-shrink-0">
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
        {/* Toggle */}
        <button
          onClick={() => onToggleActive(link.id, !link.is_active)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            link.is_active
              ? 'text-green-400 hover:bg-green-400/10'
              : 'text-gray-600 hover:bg-white/5'
          }`}
          title={link.is_active ? '非表示にする' : '表示する'}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            {link.is_active ? (
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            ) : (
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(link)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
          title="編集"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>

        {/* Delete */}
        <button
          onClick={() => setConfirming(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          title="削除"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
