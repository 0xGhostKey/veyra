'use client'

import { useState, useRef, useEffect } from 'react'
import type { Link } from '@/types'

type Props = {
  photos: Link[]
}

export default function GallerySection({ photos }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [dragY, setDragY] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const swipeAxis = useRef<'x' | 'y' | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Prevent body scroll while lightbox is open + ESC to close
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxIndex(null) }
      window.addEventListener('keydown', onKeyDown)
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown) }
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // Prevent passive touch scroll on the overlay (needed for e.preventDefault())
  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    const prevent = (e: TouchEvent) => e.preventDefault()
    el.addEventListener('touchmove', prevent, { passive: false })
    return () => el.removeEventListener('touchmove', prevent)
  }, [lightboxIndex])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    swipeAxis.current = null
    setDragY(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    const dy = e.touches[0].clientY - touchStartY.current

    // Lock axis after 6px of movement to prevent diagonal drift
    if (!swipeAxis.current) {
      if (Math.max(dx, Math.abs(dy)) < 6) return
      swipeAxis.current = dx > Math.abs(dy) ? 'x' : 'y'
    }

    if (swipeAxis.current === 'y' && dy > 0) setDragY(dy)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || lightboxIndex === null) return

    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0)

    // Swipe down to close (only if y-axis was locked)
    if (swipeAxis.current === 'y' && dy > 80) {
      setDragY(0)
      setLightboxIndex(null)
      swipeAxis.current = null
      touchStartX.current = null
      touchStartY.current = null
      return
    }

    setDragY(0)

    // Horizontal swipe to change image (only if x-axis was locked)
    if (swipeAxis.current === 'x' && Math.abs(dx) > 40) {
      if (dx > 0 && lightboxIndex < photos.length - 1) setLightboxIndex(lightboxIndex + 1)
      if (dx < 0 && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
    }

    swipeAxis.current = null
    touchStartX.current = null
    touchStartY.current = null
  }

  if (photos.length === 0) return null

  // Fade image + overlay as user drags down
  const dragProgress = Math.min(dragY / 250, 1)
  const imageOpacity = 1 - dragProgress * 0.6

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
            <img src={photo.image_url!} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Blur layer — smooth CSS transition, not driven by drag */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              opacity: 1 - dragProgress * 0.8,
            }}
          />

          {/* Dark tint — tap to close */}
          <div
            className="absolute inset-0 bg-black/60 transition-opacity duration-300"
            style={{ opacity: 1 - dragProgress * 0.8 }}
            onClick={() => setLightboxIndex(null)}
          />

          {/* Image */}
          <div
            className="relative z-10 max-w-[100vw]"
            style={{
              transform: `translateY(${dragY}px)`,
              opacity: imageOpacity,
              transition: dragY === 0 ? 'transform 0.25s ease, opacity 0.25s ease' : 'none',
            }}
            onClick={(e) => e.stopPropagation()}
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
