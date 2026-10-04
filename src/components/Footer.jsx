import { useLanguage } from '../useLanguage'
import logo from '/zilina-logo.svg'

// Facebook and Instagram links — replace # with real URLs when provided
const FACEBOOK_URL = '#'
const INSTAGRAM_URL = '#'
const EMAIL = 'info@zilinachildcare.com'

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-content mx-auto px-6 py-9 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-[76px] h-[76px] flex-none box-border p-2 bg-white rounded-[18px] flex items-center justify-center">
            <img src={logo} alt="" aria-hidden="true" className="h-[60px] w-auto block" />
          </div>
          <div className="flex flex-col gap-1">
            <div lang="en" className="font-extrabold text-xl leading-tight">Zilina Child Care &amp; Preschool</div>
            <div lang="en" className="text-[15px]">{f.copyright}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={FACEBOOK_URL}
            aria-label={f.facebook}
            className="w-12 h-12 rounded-full bg-light-blue text-navy flex items-center justify-center hover:opacity-90"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href={INSTAGRAM_URL}
            aria-label={f.instagram}
            className="w-12 h-12 rounded-full bg-light-blue text-navy flex items-center justify-center hover:opacity-90"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label={f.email}
            className="w-12 h-12 rounded-full bg-light-blue text-navy flex items-center justify-center hover:opacity-90"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
