import { useLanguage } from '../useLanguage'

export default function Day() {
  const { t } = useLanguage()
  const d = t.day

  return (
    <section id="day" className="bg-white">
      <div className="max-w-content mx-auto px-6 py-[88px] flex flex-col gap-9">
        <div className="flex flex-col gap-2.5 max-w-[620px]">
          <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{d.heading}</h2>
          <p className="m-0">{d.sub}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          {d.steps.map((step, i) => (
            <div key={i} className="flex-1 basis-[180px] flex flex-col gap-2">
              <div className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center font-extrabold text-xl">
                {i + 1}
              </div>
              <div className="font-extrabold text-link-blue">{step.time}</div>
              <div className="font-bold text-xl leading-[1.3]">{step.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
