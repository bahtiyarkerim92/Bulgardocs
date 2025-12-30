import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server side
  if (import.meta.server) return;

  const authStore = useAuthStore();
  const { $i18n } = useNuxtApp();
  const currentLocale = $i18n.locale.value;

  const baseProtectedPaths = [
    'dashboard',
    'user-profile',
    'payment',
    'admin',
    'Dashboard',
    'User-Profile',
    'Payment',
    'Admin',
    'change-password',
    'Change-Password',
  ];

  // Create protected routes for both localized and non-localized paths
  const protectedRoutes = [
    ...baseProtectedPaths.map((path) => `/${path}`), // For default locale (en)
    ...baseProtectedPaths.map((path) => `/${currentLocale}/${path}`), // For other locales
  ];

  // Check if trying to access protected route
  const isProtectedRoute = protectedRoutes.some((route) => to.path.startsWith(route));

  if (isProtectedRoute) {
    if (authStore.isAuthenticated) {
      return;
    }

    abortNavigation();

    // Build redirect URL - don't include locale prefix for default locale
    const redirectUrl =
      currentLocale === 'en' ? '/?showLogin=true' : `/${currentLocale}/?showLogin=true`;

    if (authStore.isInitialized) {
      window.location.href = redirectUrl;
      return;
    }

    try {
      await authStore.initialize();
      if (!authStore.isAuthenticated) {
        window.location.href = redirectUrl;
        return;
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      window.location.href = redirectUrl;
      return;
    }
  }
});
