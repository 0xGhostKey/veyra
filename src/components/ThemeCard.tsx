'use client'

import type { ThemeDefinition } from '@/types'

type ThemeCardProps = {
  theme: ThemeDefinition
  isSelected: boolean
  isPurchased: boolean
  onSelect: (themeId: string) => void
  onPurchase: (themeId: string) => void
}

export default function ThemeCard({
  theme,
  isSelected,
  isPurchased,
  onSelect,
  onPurchase,
}: ThemeCardProps) {
  const isAccessible = theme.isFree || isPurchased
  const isLocked = !theme.isFree && !isPurchased

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden transition-all duration-200 ${
        isSelected
          ? 'border-[#d4af37]/50 bg-[#d4af37]/5'
          : isLocked
          ? 'border-white/8 bg-white/[0.02]'
          : 'border-white/10 bg-[#111] hover:border-white/20 cursor-pointer'
      }`}
      onClick={() => {
        if (isAccessible) onSelect(theme.id)
      }}
    >
      {/* Phone preview */}
      <div className="flex justify-center items-center py-5 bg-black/20">
        <div className="relative" style={{ width: 160, height: 286 }}>
          {/* Phone frame */}
          <div className="absolute inset-0 rounded-[28px] border-2 border-white/20 overflow-hidden shadow-xl bg-[#111]">
            {/* Dynamic island */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex justify-center items-end pb-1">
              <div className="w-10 h-2 bg-[#1c1c1e] rounded-full" />
            </div>
            {/* iframe scaled to fit - top offset by dynamic island height (24px) */}
            <iframe
              src={`/preview/${theme.id}`}
              scrolling="no"
              className="absolute left-0 pointer-events-none border-none"
              style={{
                top: 24,
                width: 390,
                height: 844,
                transform: `scale(${160 / 390})`,
                transformOrigin: 'top left',
              }}
            />
            {/* Home indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-black/60 z-10 flex justify-center items-center">
              <div className="w-16 h-1 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 rounded-[28px] bg-black/40 z-20 flex flex-col items-center justify-center gap-2">
              <div className="w-9 h-9 bg-black/60 rounded-full flex items-center justify-center border border-white/15">
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          {/* Selected badge */}
          {isSelected && (
            <div className="absolute top-2 right-2 z-20 w-7 h-7 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-[14px]">{theme.name}</h3>
            {theme.isAnimated && (
              <span className="text-[9px] text-[#d4af37] font-bold bg-[#d4af37]/15 px-2 py-0.5 rounded-full tracking-wide">
                ANIMATED
              </span>
            )}
          </div>
          <span className="text-[13px] font-bold text-gray-300 flex-none">
            {theme.isFree ? '無料' : `¥${theme.price.toLocaleString()}`}
          </span>
        </div>
        <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">{theme.description}</p>

        <div className="flex gap-2">
          {/* Preview button */}
          <a
            href={`/preview/${theme.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2.5 text-center text-[12px] font-medium text-gray-400 bg-white/5 border border-white/8 rounded-xl hover:bg-white/10 transition-colors"
          >
            全画面で見る ↗
          </a>

          {/* Action button */}
          {isLocked ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPurchase(theme.id)
              }}
              className="flex-1 py-2.5 bg-[#d4af37] text-black text-[12px] font-bold rounded-xl hover:bg-[#e8cc6a] active:scale-[0.97] transition-all"
            >
              購入する
            </button>
          ) : isSelected ? (
            <div className="flex-1 py-2.5 text-center text-[12px] text-[#d4af37] font-semibold">
              選択中 ✓
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelect(theme.id)
              }}
              className="flex-1 py-2.5 bg-white/8 text-gray-300 text-[12px] font-medium rounded-xl hover:bg-white/15 transition-colors"
            >
              選択する
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
