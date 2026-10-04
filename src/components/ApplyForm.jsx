import { useState } from 'react'
import { useLanguage } from '../useLanguage'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-extrabold">{label}</label>
      {children}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}

const inputClass = 'font-[inherit] text-inherit px-3.5 py-3 border-[1.5px] border-input-border rounded-xl bg-white min-h-[48px] box-border w-full focus:outline-none focus:border-link-blue'

export default function ApplyForm() {
  const { t, lang } = useLanguage()
  const a = t.apply

  const [values, setValues] = useState({
    yourName: '', childName: '', childAge: '', yourEmail: '', phone: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function set(field, val) {
    setValues(v => ({ ...v, [field]: val }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!values.yourName.trim())  e.yourName  = a.errors.nameRequired
    if (!values.yourEmail.trim()) e.yourEmail = a.errors.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.yourEmail)) e.yourEmail = a.errors.emailInvalid
    if (!values.childAge.trim())  e.childAge  = a.errors.ageRequired
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New application from ${values.yourName}`,
          'Parent name': values.yourName,
          "Child's name": values.childName,
          "Child's age": values.childAge,
          Email: values.yourEmail,
          Phone: values.phone,
          Message: values.message,
          botcheck: '',
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="apply" className="bg-white">
        <div className="max-w-content mx-auto px-6 py-[88px] flex flex-wrap gap-14">
          <div className="flex-1 basis-[320px] flex flex-col gap-4">
            <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{a.heading}</h2>
          </div>
          <div className="flex-1 basis-[380px] bg-pale-blue rounded-panel p-8 box-border flex items-center justify-center">
            <p className="m-0 font-bold text-xl text-center">{a.success}</p>
          </div>
        </div>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section id="apply" className="bg-white">
        <div className="max-w-content mx-auto px-6 py-[88px] flex flex-wrap gap-14">
          <div className="flex-1 basis-[320px] flex flex-col gap-4">
            <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{a.heading}</h2>
          </div>
          <div className="flex-1 basis-[380px] bg-pale-blue rounded-panel p-8 box-border flex flex-col gap-4 items-center justify-center text-center">
            <p className="m-0 text-red-700 font-bold">{a.error}</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="px-7 py-3 bg-navy text-white font-extrabold rounded-full"
            >
              {lang === 'en' ? 'Try again' : 'Попробовать снова'}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="bg-white">
      <div className="max-w-content mx-auto px-6 py-[88px] flex flex-wrap gap-14">
        <div className="flex-1 basis-[320px] flex flex-col gap-4">
          <h2 className="m-0 font-extrabold text-[38px] leading-[1.15]">{a.heading}</h2>
          <p className="m-0">{a.sub}</p>
          <p className="m-0">
            {a.emailLine}{' '}
            <a href="mailto:info@zilinachildcare.com" className="font-extrabold">
              info@zilinachildcare.com
            </a>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex-1 basis-[380px] bg-pale-blue rounded-panel p-8 flex flex-col gap-4 box-border"
        >
          {/* Honeypot */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />

          <Field id="a-name" label={a.fields.yourName} error={errors.yourName}>
            <input
              id="a-name"
              type="text"
              autoComplete="name"
              value={values.yourName}
              onChange={e => set('yourName', e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="flex flex-wrap gap-4">
            <Field id="a-child" label={a.fields.childName} error={errors.childName}>
              <div className="flex-1 basis-[180px]">
                <input
                  id="a-child"
                  type="text"
                  value={values.childName}
                  onChange={e => set('childName', e.target.value)}
                  className={inputClass}
                />
              </div>
            </Field>
            <Field id="a-age" label={a.fields.childAge} error={errors.childAge}>
              <div className="flex-1 basis-[120px]">
                <input
                  id="a-age"
                  type="text"
                  value={values.childAge}
                  onChange={e => set('childAge', e.target.value)}
                  className={inputClass}
                />
              </div>
            </Field>
          </div>

          <div className="flex flex-wrap gap-4">
            <Field id="a-email" label={a.fields.yourEmail} error={errors.yourEmail}>
              <div className="flex-1 basis-[180px]">
                <input
                  id="a-email"
                  type="email"
                  autoComplete="email"
                  value={values.yourEmail}
                  onChange={e => set('yourEmail', e.target.value)}
                  className={inputClass}
                />
              </div>
            </Field>
            <Field id="a-phone" label={a.fields.phone} error={errors.phone}>
              <div className="flex-1 basis-[120px]">
                <input
                  id="a-phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={e => set('phone', e.target.value)}
                  className={inputClass}
                />
              </div>
            </Field>
          </div>

          <Field id="a-msg" label={a.fields.message} error={errors.message}>
            <textarea
              id="a-msg"
              rows={4}
              value={values.message}
              onChange={e => set('message', e.target.value)}
              className="font-[inherit] text-inherit px-3.5 py-3 border-[1.5px] border-input-border rounded-xl bg-white box-border w-full resize-y focus:outline-none focus:border-link-blue"
            />
          </Field>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="font-[inherit] font-extrabold px-7 py-3.5 min-h-[52px] bg-navy text-white border-0 rounded-full cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? a.submitting : a.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
