'use client'

import { useState, useRef } from 'react'
import type { Link } from '@/types'

type Props = {
  photos: Link[]
}

export default function GallerySection({ photos }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const [dragY, setDragY] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setDragY(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const dy = e.touches[0].clientY - touchStartY.current
    if (dy > 0) setDragY(dy)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || lightboxIndex === null) return

    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = (touchStartY.current ?? 0) - e.changedTouches[0].clientY

    // Swipe down to close
    if (-dy > 80 && Math.abs(dx) < Math.abs(-dy)) {
      setDragY(0)
      setLightboxIndex(null)
      return
    }

    setDragY(0)

    // Horizontal swipe to change image
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(-dy)) {
      if (dx > 0 && lightboxIndex < photos.length - 1) setLightboxIndex(lightboxIndex + 1)
      if (dx < 0 && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  if (photos.length === 0) return null

  const overlayOpacity = lightboxIndex !== null ? Math.max(0, 1 - dragY / 300) : 0

  return (
    <>
      {/* Centered square thumbnails */}
      <div className="mt-5 flex gap-2 justify-center">
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: `rgba(0,0,0,${0.92 * overlayOpacity})`, backdropFilter: `blur(${8 * overlayOpacity}px)` }}
        >
          {/* Image — swipeable, no buttons */}
          <div
            className="max-w-[100vw] transition-transform"
            style={{ transform: `translateY(${dragY}px)`, opacity: overlayOpacity }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={photos[lightboxIndex].image_url!}
              alt=""
              className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
