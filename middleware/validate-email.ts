export default defineNuxtRouteMiddleware((to) => {
  // Check if we're on the validate-email page and there's no token
  if (to.path.toLowerCase() === '/validate-email' && !to.query.token) {
    // Get locale from query parameters if it exists
    const locale = to.query.locale as string;
    // Redirect to home page with locale if present
    return navigateTo(locale ? `/${locale}` : '/');
  }
});
