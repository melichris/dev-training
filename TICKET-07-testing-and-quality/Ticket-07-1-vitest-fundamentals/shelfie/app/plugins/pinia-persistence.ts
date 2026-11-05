import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  if (import.meta.client) {
    $pinia.use(piniaPluginPersistedstate)
  }
})
