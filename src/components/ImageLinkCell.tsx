'use client'

import { useState } from 'react'
import type { Link } from '@/types'

type Props = {
  link: Link
  titleColor?: string
}

export default function ImageLinkCell({ link, titleColor = 'text-gray-400' }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <button
          onClick={() => setOpen(true)}
          className="block w-full overflow-hidden rounded-xl active:scale-[0.97] transition-transform [transform:translateZ(0)] focus:outline-none"
          style={{ aspectRatio: '1 / 1' }}
        >
          {link.image_url && (
            <img src={link.image_url} alt={link.title || ''} className="w-full h-full object-cover" />
          )}
        </button>
        {link.title && (
          <p className={`text-[11px] text-center leading-tight px-1 ${titleColor}`}>
            {link.title}
          </p>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image — original ratio, fills screen, NO rounded corners */}
          <img
            src={link.image_url!}
            alt={link.title || ''}
            className="w-screen h-screen object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* URL button */}
          {link.url && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black font-bold rounded-full text-[14px] whitespace-nowrap shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {link.title ? link.title : 'リンクを開く'} →
            </a>
          )}
        </div>
      )}
    </>
  )
}
