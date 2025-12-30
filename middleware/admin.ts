import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware(async (_to) => {
  // Skip on server side
  if (import.meta.server) return;

  const userStore = useAuthStore();
  const nuxtApp = useNuxtApp();
  const currentLocale = nuxtApp.$i18n.locale.value;

  try {
    if (!userStore.isAuthenticated) {
      await userStore.checkAuth();
    }

    if (!userStore.isAdmin) {
      return navigateTo(`/${currentLocale}/404`, {
        redirectCode: 404,
        replace: true,
      });
    }
  } catch (error) {
    // Handle any errors silently and redirect
    return navigateTo(`/${currentLocale}/404`, {
      redirectCode: 404,
      replace: true,
    });
  }
});
