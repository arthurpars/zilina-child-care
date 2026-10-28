import { useState, cloneElement } from 'react'
import { useLanguage } from '../useLanguage'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

if (import.meta.env.DEV && !ACCESS_KEY) {
  console.warn('[ApplyForm] VITE_WEB3FORMS_ACCESS_KEY is not set — form submissions will fail.')
}

function Field({ id, label, error, required, children }) {
  const errorId = `${id}-error`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-extrabold">
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      {cloneElement(children, {
        'aria-describedby': error ? errorId : undefined,
        'aria-invalid': error ? 'true' : undefined,
      })}
      {error && (
        <span id={errorId} role="alert" className="text-sm text-red-600">{error}</span>
      )}
    </div>
  )
}

const inputClass = 'font-[inherit] text-inherit px-3.5 py-3 border-[1.5px] border-input-border rounded-xl bg-white min-h-[48px] box-border w-full focus:outline-none focus:border-link-blue focus-visible:ring-2 focus-visible:ring-link-blue focus-visible:ring-offset-1'

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
      setStatus(res.ok && data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="apply" aria-labelledby="apply-heading" className="bg-white">
      <div className="max-w-content mx-auto px-6 py-12 sm:py-16 md:py-[88px] flex flex-wrap gap-8 md:gap-14">

        <div className="flex-1 basis-[320px] flex flex-col gap-4">
          <h2 id="apply-heading" className="m-0 font-extrabold text-3xl md:text-[2.375rem] leading-[1.15]">{a.heading}</h2>
          {(status === 'idle' || status === 'submitting') && (
            <>
              <p className="m-0">{a.sub}</p>
              <p className="m-0">
                {a.emailLine}{' '}
                <a href="mailto:info@zilinachildcare.com" className="font-extrabold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded">
                  info@zilinachildcare.com
                </a>
              </p>
            </>
          )}
        </div>

        <div className="flex-1 basis-[380px] bg-pale-blue rounded-panel p-5 sm:p-6 md:p-8 box-border">
          {status === 'success' && (
            <div className="h-full flex items-center justify-center py-8">
              <p className="m-0 font-bold text-xl text-center" role="status">{a.success}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="h-full flex flex-col gap-4 items-center justify-center text-center py-8">
              <p className="m-0 text-red-700 font-bold" role="alert">{a.error}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-7 py-3 bg-navy text-white font-extrabold rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                {a.tryAgain}
              </button>
            </div>
          )}

          {(status === 'idle' || status === 'submitting') && (
            <form
              onSubmit={handleSubmit}
              noValidate
              lang={lang}
              className="flex flex-col gap-4"
            >
              {/* Honeypot — hidden from users and assistive tech */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" aria-hidden="true" />

              <Field id="a-name" label={a.fields.yourName} error={errors.yourName} required>
                <input
                  id="a-name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  value={values.yourName}
                  onChange={e => set('yourName', e.target.value)}
                  className={inputClass}
                />
              </Field>

              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px]">
                  <Field id="a-child" label={a.fields.childName} error={errors.childName}>
                    <input
                      id="a-child"
                      type="text"
                      value={values.childName}
                      onChange={e => set('childName', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <Field id="a-age" label={a.fields.childAge} error={errors.childAge} required>
                    <input
                      id="a-age"
                      type="text"
                      required
                      aria-required="true"
                      value={values.childAge}
                      onChange={e => set('childAge', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px]">
                  <Field id="a-email" label={a.fields.yourEmail} error={errors.yourEmail} required>
                    <input
                      id="a-email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      value={values.yourEmail}
                      onChange={e => set('yourEmail', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <Field id="a-phone" label={a.fields.phone} error={errors.phone}>
                    <input
                      id="a-phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={e => set('phone', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              <Field id="a-msg" label={a.fields.message} error={errors.message}>
                <textarea
                  id="a-msg"
                  rows={4}
                  value={values.message}
                  onChange={e => set('message', e.target.value)}
                  className="font-[inherit] text-inherit px-3.5 py-3 border-[1.5px] border-input-border rounded-xl bg-white box-border w-full resize-y focus:outline-none focus:border-link-blue focus-visible:ring-2 focus-visible:ring-link-blue focus-visible:ring-offset-1"
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="font-[inherit] font-extrabold px-7 py-3.5 min-h-[52px] bg-navy text-white border-0 rounded-full cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                {status === 'submitting' ? a.submitting : a.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
