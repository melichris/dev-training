import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin(({ $pinia }) => {
  ($pinia as ReturnType<typeof createPinia>).use(piniaPluginPersistedstate);
});
