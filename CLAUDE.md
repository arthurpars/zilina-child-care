# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build (outputs to dist/)
npm run preview    # serve the dist/ build locally
```

There are no tests and no linter configured.

### Local build caveat

The project folder name contains `&`, which causes Rollup to reject it as a file path. `npm run dev` works fine. For a local production build, use a path without special characters:

```bash
# Example: create a junction on Windows
mklink /J C:\zilina-build "C:\...\Zilina Child Care & Preschool"
cd C:\zilina-build && node node_modules\vite\bin\vite.js build
```

On Vercel (Linux), `npm run build` works normally.

## Architecture

Single-page React app. No router — all navigation is anchor links. One `LanguageProvider` at the root wraps everything; every component reads translations via `useLanguage()`.

### i18n

`src/translations.js` — single source of truth for all UI strings in `en` and `ru` objects. The structure mirrors the page sections: `nav`, `hero`, `about`, `programs`, `day`, `gallery`, `apply`, `contact`, `footer`.

`src/useLanguage.jsx` — React context + `localStorage` persistence. Exposes `{ lang, setLang, t }`. Switching language also updates `document.lang`, `<title>`, and the meta description/OG tags in the DOM.

**To change any visible text**: edit `src/translations.js` only. Never hardcode strings in components.

### Design tokens

All colours, radii and the content max-width live in `tailwind.config.js`. Use the named tokens everywhere (`bg-navy`, `text-light-blue`, `rounded-card`, `max-w-content`, etc.). Do not use ad-hoc hex values in JSX.

### Gallery

`src/components/Gallery.jsx` uses `import.meta.glob` to eagerly load every image in `src/assets/gallery/`. Adding or removing files there updates the slider automatically — no code change needed. The component manages a controlled index (not scroll-snap) to keep loop and touch-swipe logic predictable.

### Apply form

`src/components/ApplyForm.jsx` POSTs to Web3Forms (`https://api.web3forms.com/submit`). The access key is read from `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`. A `.env` file (gitignored) must define it locally; on Vercel it is set as an environment variable. The form includes a hidden honeypot field named `botcheck`.

### Placeholders still outstanding

These are bracketed in `src/translations.js` and need real content from the client:

- `[AGES]` / `[ВОЗРАСТ]` — age ranges for each program card
- `[Short description…]` — program card body text (both languages)
- `[Add two or three sentences…]` — Welcome section body text
- `[TIME]` / `[ВРЕМЯ]` — five schedule times in the Day section
- `[DAYS AND HOURS]` / `[ДНИ И ЧАСЫ]` — opening hours in Contact
- Facebook and Instagram URLs in `src/components/Footer.jsx` (`FACEBOOK_URL`, `INSTAGRAM_URL`)
- Hero background photo, Welcome photo, gallery photos (drop images into `src/assets/gallery/`)
- Decision on whether to keep the third program card

### Static contact details

Address, phone and email are hardcoded as constants in `src/components/Contact.jsx` because they are the same in both languages and never need translation.
