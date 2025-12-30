import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '~/stores/authStore';
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';
import { useI18n } from 'vue-i18n';

interface FetchError extends Error {
  status?: number;
  statusCode?: number;
  statusText?: string;
  data?: unknown;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  // Create fetch interceptor
  nuxtApp.hook('app:created', () => {
    const originalFetch = globalThis.$fetch;

    globalThis.$fetch = async <T>(
      request: RequestInfo,
      options?: NitroFetchOptions<NitroFetchRequest>
    ) => {
      const fetchOptions = options || {};

      // Skip interceptor for server-side requests
      if (import.meta.server) {
        return originalFetch<T>(request, fetchOptions);
      }

      const urlString = request.toString();

      // Add base URL if it's a relative URL
      const url = urlString.startsWith('http') ? request : `${config.public.baseUrl}${request}`;

      // Skip interceptor for internal API routes
      if (urlString.startsWith('/api/')) {
        return originalFetch<T>(request, fetchOptions);
      }

      // Add authorization header if we have an access token
      if (authStore.accessToken) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authStore.accessToken}`,
        };
      }

      try {
        return await originalFetch<T>(url, fetchOptions);
      } catch (error) {
        const fetchError = error as FetchError;

        // Skip token refresh for password reset related endpoints
        const isPasswordResetEndpoint = [
          '/auth/reset-password',
          '/auth/validate-respass-token',
          '/auth/forgot-password',
        ].some((endpoint) => urlString.includes(endpoint));

        // If it's a 401 and NOT a password reset endpoint, try to refresh the token
        if (fetchError.status === 401 && !isPasswordResetEndpoint) {
          try {
            await authStore.refreshAccessToken();

            // Retry the original request with new token
            fetchOptions.headers = {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authStore.accessToken}`,
            };

            return await originalFetch<T>(url, fetchOptions);
          } catch (refreshError) {
            // If refresh fails, redirect to login
            authStore.setAccessToken(null);
            const router = useRouter();
            const { locale } = useI18n();
            router.push(`/${locale.value}/?showLogin=true`);
            throw fetchError;
          }
        }
        throw fetchError;
      }
    };
  });
});
