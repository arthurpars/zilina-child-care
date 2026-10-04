/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:       '#102A5E',
        'light-blue': '#78D2D9',
        'pale-blue':  '#E6F5F7',
        'hero-navy':  '#1D3F73',
        'link-blue':  '#14609B',
        'link-blue-hover': '#0D3F6B',
        'muted':      '#44597E',
        'input-border': '#5F7FA3',
      },
      borderRadius: {
        card:   '24px',
        panel:  '28px',
      },
      maxWidth: {
        content: '1120px',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
