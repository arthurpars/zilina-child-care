import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'zilina-lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'ru' || saved === 'en') return saved
    } catch {}
    return 'en'
  })

  const t = translations[lang]

  function setLang(newLang) {
    setLangState(newLang)
    try { localStorage.setItem(STORAGE_KEY, newLang) } catch {}
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.pageTitle
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t.metaDescription)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', t.siteName)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', t.metaDescription)
  }, [lang, t])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
