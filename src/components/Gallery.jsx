import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '../useLanguage'

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
  const canScroll = total > visibleCount

  const prev = useCallback(() => {
    setIndex(i => (i === 0 ? Math.max(0, total - visibleCount) : i - 1))
  }, [total, visibleCount])

  const next = useCallback(() => {
    setIndex(i => {
      const max = Math.max(0, total - visibleCount)
      return i >= max ? 0 : i + 1
    })
  }, [total, visibleCount])

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

  // gap-5 = 20px between items
  const gapPx = 20
  const itemWidthCalc = `calc((100% - ${gapPx * (visibleCount - 1)}px) / ${visibleCount})`
  const translateX = `calc(-${index} * (${itemWidthCalc} + ${gapPx}px))`

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-pale-blue">
      <div className="max-w-content mx-auto px-6 py-12 sm:py-16 md:py-[88px] flex flex-col gap-8">
        <h2 id="gallery-heading" className="m-0 font-extrabold text-3xl md:text-[2.375rem] leading-[1.15]">{g.heading}</h2>

        <div className="relative">
          {canScroll && (
            <button
              type="button"
              aria-label={g.prev}
              onClick={prev}
              className="absolute z-10 left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-14 h-14 box-border rounded-full border-[3px] border-white bg-navy text-white flex items-center justify-center cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {hasImages ? (
              <div
                ref={trackRef}
                className="flex gap-5 transition-transform duration-300 ease-in-out"
                style={{ transform: canScroll ? `translateX(${translateX})` : undefined }}
              >
                {images.map((src) => (
                  <div
                    key={src}
                    className="flex-none rounded-card overflow-hidden bg-pale-blue"
                    style={{ width: itemWidthCalc, aspectRatio: '4/3' }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover block"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-5">
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

          {canScroll && (
            <button
              type="button"
              aria-label={g.next}
              onClick={next}
              className="absolute z-10 right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-14 h-14 box-border rounded-full border-[3px] border-white bg-navy text-white flex items-center justify-center cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
