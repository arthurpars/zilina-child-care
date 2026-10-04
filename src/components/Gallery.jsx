import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '../useLanguage'

// Eagerly import all images from the gallery folder
const imageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,avif}', { eager: true })
const images = Object.values(imageModules).map(m => m.default)

function useVisibleCount() {
  const [count, setCount] = useState(3)
  useEffect(() => {
    function update() {
      const w = window.innerWidth
      if (w < 640) setCount(1)
      else if (w < 1024) setCount(2)
      else setCount(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

export default function Gallery() {
  const { t } = useLanguage()
  const g = t.gallery
  const visibleCount = useVisibleCount()
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)
  const touchStartX = useRef(null)
  const total = images.length

  const hasImages = total > 0

  const prev = useCallback(() => {
    setIndex(i => (i === 0 ? Math.max(0, total - visibleCount) : i - 1))
  }, [total, visibleCount])

  const next = useCallback(() => {
    setIndex(i => {
      const max = Math.max(0, total - visibleCount)
      return i >= max ? 0 : i + 1
    })
  }, [total, visibleCount])

  // Clamp index when visible count changes
  useEffect(() => {
    setIndex(i => {
      const max = Math.max(0, total - visibleCount)
      return Math.min(i, max)
    })
  }, [visibleCount, total])

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0) next()
    else prev()
  }

  // Calculate item width including gap
  // gap-5 = 20px, items visible = visibleCount
  const gapPx = 20
  const itemWidthCalc = `calc((100% - ${gapPx * (visibleCount - 1)}px) / ${visibleCount})`
  const translateX = `calc(-${index} * (${itemWidthCalc} + ${gapPx}px))`

  return (
    <section id="gallery" className="bg-pale-blue">
      <div className="max-w-content mx-auto px-6 py-[88px] flex flex-col gap-8">
        <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{g.heading}</h2>

        <div className="relative">
          {/* Prev button */}
          <button
            type="button"
            aria-label={g.prev}
            onClick={prev}
            className="absolute z-10 -left-5 top-1/2 -translate-y-1/2 w-14 h-14 box-border rounded-full border-[3px] border-white bg-navy text-white flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Track */}
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {hasImages ? (
              <div
                ref={trackRef}
                className="flex gap-5 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(${translateX})` }}
              >
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="flex-none rounded-card overflow-hidden bg-pale-blue"
                    style={{ width: itemWidthCalc, aspectRatio: '4/3' }}
                  >
                    <img
                      src={src}
                      alt=""
                      aria-label={`Gallery photo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover block"
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Placeholder when no images are present yet */
              <div className="flex gap-5">
                {[1, 2, 3].map(n => (
                  <div
                    key={n}
                    className="flex-1 basis-[280px] aspect-[4/3] bg-white border-2 border-dashed border-[#3F8FA0] rounded-card flex items-center justify-center font-bold text-muted"
                    aria-hidden="true"
                  >
                    Photo {n}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next button */}
          <button
            type="button"
            aria-label={g.next}
            onClick={next}
            className="absolute z-10 -right-5 top-1/2 -translate-y-1/2 w-14 h-14 box-border rounded-full border-[3px] border-white bg-navy text-white flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
