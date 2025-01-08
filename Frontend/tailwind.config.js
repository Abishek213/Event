/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'ui-serif', 'serif'],
        mono: ['SFMono-Regular', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [require("daisyui")],
}