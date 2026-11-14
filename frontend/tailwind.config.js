/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest:     '#173F35',
        'deep-forest': '#102F29',
        moss:       '#617B62',
        sage:       '#A5B69A',
        mineral:    '#537D8C',
        'ocean-slate': '#345C68',
        terracotta: '#B96F50',
        sand:       '#DCCDB5',
        paper:      '#F5F4ED',
        graphite:   '#252B28',
        'slate-text': '#68716C',
        border:     '#E0E3DB',
        muted:      '#EAECE5',
      },
      fontFamily: {
        serif: ["'Source Serif 4'", 'Georgia', 'serif'],
        sans:  ["'Inter'", 'system-ui', 'sans-serif'],
        mono:  ["'IBM Plex Mono'", "'Courier New'", 'monospace'],
      },
      borderRadius: {
        sm:  '6px',
        DEFAULT: '9px',
        lg:  '12px',
        xl:  '14px',
      },
    },
  },
  plugins: [],
}
