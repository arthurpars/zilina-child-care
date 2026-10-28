import { useLanguage } from '../useLanguage'
import welcomePhoto from '../assets/zilina-banner.png'

export default function Welcome() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white">
      <div className="max-w-content mx-auto px-6 py-12 sm:py-16 md:py-[88px] flex flex-wrap items-center gap-8 md:gap-14">
        <div className="flex-1 basis-[340px] flex flex-col gap-[18px]">
          <h2 id="about-heading" className="m-0 font-extrabold text-3xl md:text-[2.375rem] leading-[1.15]">{a.heading}</h2>
          <p className="m-0">{a.p1}</p>
          <p className="m-0 text-muted">{a.p2}</p>
          <a href="#contact" className="font-extrabold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded">{a.link}</a>
        </div>
        <div className="flex-1 basis-[340px] aspect-[4/3] rounded-panel overflow-hidden">
          <img
            src={welcomePhoto}
            alt={a.photoAlt}
            loading="lazy"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </section>
  )
}
