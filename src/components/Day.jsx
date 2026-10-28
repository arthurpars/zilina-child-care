import { useLanguage } from '../useLanguage'

export default function Day() {
  const { t } = useLanguage()
  const d = t.day

  return (
    <section id="day" aria-labelledby="day-heading" className="bg-white">
      <div className="max-w-content mx-auto px-6 py-12 sm:py-16 md:py-[88px] flex flex-col gap-9">
        <div className="flex flex-col gap-2.5 max-w-[620px]">
          <h2 id="day-heading" className="m-0 font-extrabold text-3xl md:text-[2.375rem] leading-[1.15]">{d.heading}</h2>
          <p className="m-0">{d.sub}</p>
        </div>
        <div className="columns-1 sm:columns-2 gap-x-12">
          {d.steps.map((step, i) => (
            <div
              key={step.time}
              className="flex items-center gap-3 py-3 border-b border-pale-blue break-inside-avoid"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="shrink-0 font-extrabold text-sm text-link-blue">{step.time}</span>
              <span className="font-semibold text-sm leading-snug">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
