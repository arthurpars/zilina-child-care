import { useLanguage } from '../useLanguage'

const ADDRESS = '6051 Colfax Ave, North Hollywood'
const PHONE_DISPLAY = '+1 747 306-3705'
const PHONE_LINK = 'tel:+17473063705'
const EMAIL = 'info@zilinachildcare.com'
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`

function LocationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#102A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none mt-0.5">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#102A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none mt-0.5">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#102A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none mt-0.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#102A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none mt-0.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section id="contact" className="bg-pale-blue">
      <div className="max-w-content mx-auto px-6 py-[88px] flex flex-wrap gap-12">
        <div className="flex-1 basis-[320px] flex flex-col gap-[22px]">
          <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{c.heading}</h2>

          <div className="flex gap-3.5 items-start">
            <LocationIcon />
            <div>
              <div className="font-extrabold">{c.addressLabel}</div>
              <div lang="en">{ADDRESS}</div>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <PhoneIcon />
            <div>
              <div className="font-extrabold">{c.phoneLabel}</div>
              <div><a href={PHONE_LINK}>{PHONE_DISPLAY}</a></div>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <EmailIcon />
            <div>
              <div className="font-extrabold">{c.emailLabel}</div>
              <div><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <ClockIcon />
            <div>
              <div className="font-extrabold">{c.hoursLabel}</div>
              <div>{c.hours}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 basis-[380px] min-h-[320px] rounded-panel overflow-hidden bg-white">
          <iframe
            title={c.mapTitle}
            src={MAP_SRC}
            width="100%"
            height="100%"
            style={{ minHeight: '320px', border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
