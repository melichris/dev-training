// nuxt.config.ts
export default defineNuxtConfig({
  // CRITICAL: Tells Nuxt to look inside your "app/" folder structure
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@pinia/nuxt'
  ],

  typescript: {
    tsConfig: {
      include: [
        "../playwright.config.ts"
      ]
    }
  }
})
