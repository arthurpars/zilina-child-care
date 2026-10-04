import { useLanguage } from '../useLanguage'

export default function Welcome() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="bg-white">
      <div className="max-w-content mx-auto px-6 py-[88px] flex flex-wrap items-center gap-14">
        <div className="flex-1 basis-[340px] flex flex-col gap-[18px]">
          <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{a.heading}</h2>
          <p className="m-0">{a.p1}</p>
          <p className="m-0 text-muted">{a.p2}</p>
          <a href="#contact" className="font-extrabold">{a.link}</a>
        </div>
        <div
          className="flex-1 basis-[340px] aspect-[4/3] bg-pale-blue border-2 border-dashed border-[#3F8FA0] rounded-panel flex items-center justify-center font-bold text-muted"
          aria-hidden="true"
        >
          {/* Replace with <img> when welcome photo is provided */}
          Photo: teachers and children
        </div>
      </div>
    </section>
  )
}
