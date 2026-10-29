/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        teal: { DEFAULT: '#078F96', dark: '#067077' },
        mist: '#F2F7F8',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11, 31, 58, 0.06), 0 4px 12px rgba(11, 31, 58, 0.05)',
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
}
