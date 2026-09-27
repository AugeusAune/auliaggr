// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Portfolio - Aulia Anggraeni',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Crafting meaningful and intuitive digital experiences. UI/UX design, creative design, web design, visual branding, and creative digital solutions for modern products and growing brands.'
        },
        { property: 'og:title', content: 'Portfolio - Aulia Anggraeni' },
        {
          property: 'og:description',
          content: 'Crafting meaningful and intuitive digital experiences. UI/UX design, creative design, web design, visual branding, and creative digital solutions for modern products and growing brands.'
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Portfolio - Aulia Anggraeni' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  }
})
