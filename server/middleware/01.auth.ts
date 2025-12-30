import { defineEventHandler, parseCookies } from 'h3';

type AuthResponse = {
  accessToken?: string;
  userId?: string;
  isAdmin?: boolean;
  userType?: string;
  isPaid?: boolean;
};

export default defineEventHandler(async (event) => {
  const path = event.path;

  if (path.startsWith('/api/') || path.match(/\.(js|css|png|jpg|gif|ico|svg)$/)) {
    return;
  }

  const config = useRuntimeConfig();
  const cookies = parseCookies(event);

  // Handle multiple ways the refresh token might be stored
  const refreshToken = cookies.refreshToken || cookies['refreshToken'] || '';

  // Get request headers for debugging
  const requestHeaders = event.node.req.headers;
  const origin = requestHeaders.origin || '';
  const referer = requestHeaders.referer || '';

  try {
    // Only make auth request if we have a refresh token
    if (refreshToken) {
      try {
        const apiUrl = new URL(config.public.baseUrl);
        const apiHostname = apiUrl.hostname;

        const effectiveOrigin = origin || config.public.siteUrl || 'https://pickup2.netlify.app';
        const data = await $fetch<AuthResponse>('/auth/status', {
          baseURL: config.public.baseUrl,
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'X-Forwarded-Proto': 'https',
            Origin: effectiveOrigin,
            Host: apiHostname,
            Referer: referer || effectiveOrigin,
            Cookie: `refreshToken=${refreshToken}`, // Explicitly forward the refresh token
          },
          retry: 0, // Disable retries for auth requests
        });

        // Set auth state in context
        event.context.auth = {
          isAuthenticated: !!data?.accessToken,
          user: data?.accessToken
            ? {
                userId: data.userId,
                isAdmin: data.isAdmin,
                userType: data.userType?.toLowerCase(),
                isPaid: data.isPaid ?? false,
              }
            : null,
          accessToken: data?.accessToken || null,
          isInitialized: true,
        };
      } catch (error) {
        // Clear invalid refresh token from context
        event.context.auth = {
          isAuthenticated: false,
          user: null,
          accessToken: null,
          isInitialized: true,
        };
      }
    } else {
      event.context.auth = {
        isAuthenticated: false,
        user: null,
        accessToken: null,
        isInitialized: true,
      };
    }
  } catch (error) {
    console.error('🔴 [Server Middleware] Auth error:', error);
    event.context.auth = {
      isAuthenticated: false,
      user: null,
      accessToken: null,
      isInitialized: true,
    };
  }
});
