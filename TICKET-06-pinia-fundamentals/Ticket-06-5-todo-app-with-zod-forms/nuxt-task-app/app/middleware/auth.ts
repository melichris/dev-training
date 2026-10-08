export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  if (import.meta.server) return;

  if (!auth.isAuthenticated) {
    return navigateTo("/login");
  }
});
