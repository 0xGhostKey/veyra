'use client'

import { useState } from 'react'
import type { Link } from '@/types'

type Props = {
  photos: Link[]
}

export default function GallerySection({ photos }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (photos.length === 0) return null

  return (
    <>
      {/* Horizontal scroll, square thumbnails */}
      <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(idx)}
            className="flex-none w-[70px] h-[70px] rounded-xl overflow-hidden active:scale-[0.97] transition-transform [transform:translateZ(0)] focus:outline-none"
          >
            <img
              src={photo.image_url!}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox — original ratio */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image — natural ratio, no forced crop, no rounded corners */}
          <div
            className="max-w-[100vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].image_url!}
              alt=""
              className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
            />
          </div>

          {/* Dots */}
          {photos.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx) }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === lightboxIndex ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
