import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../useLanguage'

const logo = '/zilina-logo.svg'

const NAV_LINKS = [
  { key: 'about',    href: '#about' },
  { key: 'programs', href: '#programs' },
  { key: 'day',      href: '#day' },
  { key: 'gallery',  href: '#gallery' },
  { key: 'contact',  href: '#contact' },
]

const linkClass = 'px-2 py-2.5 text-navy no-underline font-bold hover:text-link-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded'

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

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const langRef = useRef(null)

  const otherLang = lang === 'en' ? 'ru' : 'en'
  const otherLabel = lang === 'en' ? 'Русский' : 'English'

  useEffect(() => {
    function handleOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') { setLangOpen(false); setMobileOpen(false) }
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  function switchLang(newLang) {
    setLang(newLang)
    setLangOpen(false)
  }

  function closeAll() {
    setMobileOpen(false)
    setLangOpen(false)
  }

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-content mx-auto px-6 py-3 flex items-center justify-between gap-3">

        <a href="#top" className="flex items-center gap-3 no-underline text-navy flex-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded">
          <img src={logo} alt="" aria-hidden="true" className="h-10 sm:h-14 md:h-16 w-auto block" />
          <span className="font-extrabold text-sm sm:text-base md:text-lg leading-tight">Zilina Child Care&nbsp;&amp;&nbsp;Preschool</span>
        </a>

        <div className="flex items-center gap-1">
          {/* Desktop nav links */}
          <nav aria-label={t.nav.ariaLabel} className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ key, href }) => (
              <a key={key} href={href} className={linkClass}>{t.nav[key]}</a>
            ))}
          </nav>

          {/* Language switcher — always visible */}
          <div ref={langRef} className="relative ml-1 md:ml-2">
            <button
              type="button"
              aria-label={t.nav.langLabel}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1.5 min-h-[44px] px-2.5 md:px-3 border-[1.5px] border-navy rounded-full bg-white text-navy font-extrabold text-[15px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {lang === 'en' ? <FlagUS /> : <FlagRU />}
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
              <ChevronDown />
            </button>

            {langOpen && (
              <div role="menu" className="absolute z-20 top-[calc(100%+6px)] right-0 min-w-full box-border p-1.5 bg-white border-[1.5px] border-navy rounded-2xl shadow-[0_8px_20px_rgba(16,42,94,0.18)]">
                <button
                  type="button"
                  role="menuitem"
                  lang={otherLang}
                  aria-label={otherLabel}
                  onClick={() => switchLang(otherLang)}
                  className="flex items-center gap-2 min-h-[44px] w-full px-2 rounded-[10px] text-navy no-underline font-extrabold text-[15px] hover:bg-pale-blue cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1"
                >
                  {otherLang === 'en' ? <FlagUS /> : <FlagRU />}
                  <span>{otherLang.toUpperCase()}</span>
                </button>
              </div>
            )}
          </div>

          {/* Apply — desktop only */}
          <a href="#apply" className="hidden md:flex ml-1 px-[22px] py-2.5 bg-light-blue text-navy no-underline font-extrabold rounded-full hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2">
            {t.nav.apply}
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-navy cursor-pointer rounded-lg hover:bg-pale-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — always in DOM so aria-controls reference is always valid.
          Use conditional Tailwind classes (never HTML hidden + flex together:
          author-stylesheet flex beats UA-stylesheet hidden). */}
      <nav
        id="mobile-nav"
        aria-label={t.nav.ariaLabel}
        className={`md:hidden bg-white border-t border-pale-blue px-6 py-4 flex-col ${mobileOpen ? 'flex' : 'hidden'}`}
      >
        {NAV_LINKS.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            onClick={closeAll}
            className="py-3.5 text-navy no-underline font-bold border-b border-pale-blue hover:text-link-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1"
          >
            {t.nav[key]}
          </a>
        ))}
        <a
          href="#apply"
          onClick={closeAll}
          className="mt-4 px-[22px] py-3 bg-light-blue text-navy no-underline font-extrabold rounded-full hover:opacity-90 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          {t.nav.apply}
        </a>
      </nav>
    </header>
  )
}
