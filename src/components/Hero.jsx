import { useLanguage } from '../useLanguage'
import heroBg from '../assets/hero-bg.png'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative text-white"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1D3F73',
      }}
    >
      <div className="absolute inset-0 bg-[#1D3F73]/70" aria-hidden="true" />

      <div className="relative max-w-content mx-auto px-6 pt-16 sm:pt-20 md:pt-[120px] pb-20 sm:pb-24 md:pb-[130px] box-border">
        <div className="max-w-[640px] flex flex-col gap-[22px]">
          <div className="font-extrabold text-[15px] tracking-widest uppercase text-light-blue">
            {h.label}
          </div>
          <h1 id="hero-heading" className="m-0 font-extrabold text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.08]">
            {h.headline}
          </h1>
          <p className="m-0 text-base sm:text-lg md:text-xl leading-relaxed">
            {h.sub}
          </p>
          <div className="flex flex-wrap gap-[14px] mt-2">
            <a
              href="#apply"
              className="px-7 py-3.5 bg-light-blue text-navy no-underline font-extrabold rounded-full hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D3F73]"
            >
              {h.cta1}
            </a>
            <a
              href="#contact"
              className="px-[26px] py-3 border-2 border-white text-white no-underline font-extrabold rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D3F73]"
            >
              {h.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
