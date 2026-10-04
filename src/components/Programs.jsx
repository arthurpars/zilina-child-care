import { useLanguage } from '../useLanguage'

function HeartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#102A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#102A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#102A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function Card({ icon, title, ages, desc }) {
  return (
    <div className="flex-1 basis-[280px] bg-white rounded-card p-7 flex flex-col gap-3">
      <div className="w-[52px] h-[52px] rounded-full bg-light-blue flex items-center justify-center">
        {icon}
      </div>
      <h3 className="m-0 font-extrabold text-2xl">{title}</h3>
      <div className="font-extrabold text-link-blue">{ages}</div>
      <p className="m-0 text-muted">{desc}</p>
    </div>
  )
}

export default function Programs() {
  const { t } = useLanguage()
  const p = t.programs

  return (
    <section id="programs" className="bg-pale-blue">
      <div className="max-w-content mx-auto px-6 py-[88px] flex flex-col gap-9">
        <div className="flex flex-col gap-2.5 max-w-[620px]">
          <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{p.heading}</h2>
          <p className="m-0">{p.sub}</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Card icon={<HeartIcon />} title={p.card1.title} ages={p.card1.ages} desc={p.card1.desc} />
          <Card icon={<BookIcon />}  title={p.card2.title} ages={p.card2.ages} desc={p.card2.desc} />
          <Card icon={<SunIcon />}   title={p.card3.title} ages={p.card3.ages} desc={p.card3.desc} />
        </div>
      </div>
    </section>
  )
}
