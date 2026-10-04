import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../useLanguage'
import logo from '/zilina-logo.svg'

function FlagUS() {
  return (
    <span className="flex flex-none rounded-[3px] overflow-hidden shadow-[0_0_0_1px_#C3CEDF]">
      <svg width="26" height="18" viewBox="0 0 26 18" aria-hidden="true">
        <rect width="26" height="18" fill="#B22234" />
        <path d="M0 2.08h26M0 4.85h26M0 7.62h26M0 10.38h26M0 13.15h26M0 15.92h26" stroke="#FFFFFF" strokeWidth="1.385" />
        <rect width="11" height="9.7" fill="#3C3B6E" />
        <path d="M2 2h.01M4.3 2h.01M6.7 2h.01M9 2h.01M3.2 3.6h.01M5.5 3.6h.01M7.8 3.6h.01M2 5.2h.01M4.3 5.2h.01M6.7 5.2h.01M9 5.2h.01M3.2 6.8h.01M5.5 6.8h.01M7.8 6.8h.01M2 8.2h.01M4.3 8.2h.01M6.7 8.2h.01M9 8.2h.01" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function FlagRU() {
  return (
    <span className="flex flex-none rounded-[3px] overflow-hidden shadow-[0_0_0_1px_#C3CEDF]">
      <svg width="26" height="18" viewBox="0 0 26 18" aria-hidden="true">
        <rect width="26" height="6" fill="#FFFFFF" />
        <rect y="6" width="26" height="6" fill="#0039A6" />
        <rect y="12" width="26" height="6" fill="#D52B1E" />
      </svg>
    </span>
  )
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const btnRef = useRef(null)

  const otherLang = lang === 'en' ? 'ru' : 'en'
  const otherLabel = lang === 'en' ? 'Русский' : 'English'

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  function switchLang(newLang) {
    setLang(newLang)
    setOpen(false)
  }

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-content mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3 gap-x-6">
        <a href="#top" className="flex items-center gap-3 no-underline text-navy">
          <img src={logo} alt="" aria-hidden="true" className="h-16 w-auto block" />
          <span className="font-extrabold text-lg leading-tight">Zilina Child Care&nbsp;&amp;&nbsp;Preschool</span>
        </a>

        <nav aria-label={lang === 'en' ? 'Main' : 'Основное меню'} className="flex flex-wrap items-center gap-1">
          <a href="#about"   className="px-2 py-2.5 text-navy no-underline font-bold hover:text-link-blue">{t.nav.about}</a>
          <a href="#programs" className="px-2 py-2.5 text-navy no-underline font-bold hover:text-link-blue">{t.nav.programs}</a>
          <a href="#day"     className="px-2 py-2.5 text-navy no-underline font-bold hover:text-link-blue">{t.nav.day}</a>
          <a href="#gallery" className="px-2 py-2.5 text-navy no-underline font-bold hover:text-link-blue">{t.nav.gallery}</a>
          <a href="#contact" className="px-2 py-2.5 text-navy no-underline font-bold hover:text-link-blue">{t.nav.contact}</a>

          {/* Language switcher */}
          <div ref={menuRef} className="relative ml-2">
            <button
              ref={btnRef}
              type="button"
              aria-label={t.nav.langLabel}
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              className="flex items-center gap-2 min-h-[44px] px-3 border-[1.5px] border-navy rounded-full bg-white text-navy font-extrabold text-[15px] cursor-pointer"
            >
              {lang === 'en' ? <FlagUS /> : <FlagRU />}
              <span>{lang.toUpperCase()}</span>
              <ChevronDown />
            </button>

            {open && (
              <div className="absolute z-10 top-[calc(100%+6px)] left-0 min-w-full box-border p-1.5 bg-white border-[1.5px] border-navy rounded-2xl shadow-[0_8px_20px_rgba(16,42,94,0.18)]">
                <button
                  type="button"
                  lang={otherLang}
                  aria-label={otherLabel}
                  onClick={() => switchLang(otherLang)}
                  className="flex items-center gap-2 min-h-[44px] w-full px-2 rounded-[10px] text-navy no-underline font-extrabold text-[15px] hover:bg-pale-blue cursor-pointer"
                >
                  {otherLang === 'en' ? <FlagUS /> : <FlagRU />}
                  <span>{otherLang.toUpperCase()}</span>
                </button>
              </div>
            )}
          </div>

          <a href="#apply" className="ml-2 px-[22px] py-2.5 bg-light-blue text-navy no-underline font-extrabold rounded-full hover:opacity-90">
            {t.nav.apply}
          </a>
        </nav>
      </div>
    </header>
  )
}
