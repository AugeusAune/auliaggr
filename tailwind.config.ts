import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#171717',
          card: '#262626',
          border: '#333333'
        },
        light: {
          DEFAULT: '#f6f6f6',
          subtle: '#fafafa',
          border: '#e5e5e5'
        },
        accent: {
          cyan: '#29ffff',
          blue: '#2a29ff',
          coral: '#ec8f8d'
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        mono: ['Fragment Mono', 'monospace'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
