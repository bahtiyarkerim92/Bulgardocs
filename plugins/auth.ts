export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  // On server-side, set the initial state from SSR context
  if (import.meta.server) {
    const event = useRequestEvent();
    const auth = event?.context?.auth;
    if (auth) {
      // Set the SSR state directly
      authStore.$patch({
        isAuthenticated: auth.isAuthenticated,
        accessToken: auth.accessToken,
        user: auth.user,
        isInitialized: true,
      });
    } else {
      authStore.$patch({
        isAuthenticated: false,
        accessToken: null,
        user: null,
        isInitialized: true,
      });
    }
  }

  return {
    provide: {
      auth: authStore,
    },
  };
});
