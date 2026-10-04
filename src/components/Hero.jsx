import { useLanguage } from '../useLanguage'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section
      id="top"
      className="relative text-white"
      style={{ background: '#1D3F73' }}
    >
      {/* Hero background photo — add as CSS bg-image when available */}
      <div className="max-w-content mx-auto px-6 py-[120px] pb-[130px] box-border">
        <div className="max-w-[640px] flex flex-col gap-[22px]">
          <div className="font-extrabold text-[15px] tracking-widest uppercase text-light-blue">
            {h.label}
          </div>
          <h1 className="m-0 font-extrabold text-[clamp(36px,5vw,56px)] leading-[1.08]">
            {h.headline}
          </h1>
          <p className="m-0 text-[20px] leading-relaxed">
            {h.sub}
          </p>
          <div className="flex flex-wrap gap-[14px] mt-2">
            <a
              href="#apply"
              className="px-7 py-3.5 bg-light-blue text-navy no-underline font-extrabold rounded-full hover:opacity-90"
            >
              {h.cta1}
            </a>
            <a
              href="#contact"
              className="px-[26px] py-3 border-2 border-white text-white no-underline font-extrabold rounded-full hover:bg-white/10"
            >
              {h.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
