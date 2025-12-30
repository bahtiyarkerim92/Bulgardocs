import { defineEventHandler, getRequestHeaders } from 'h3';

type AuthResponse = {
  accessToken: string | null;
  userId: string | null;
  isAdmin: boolean;
  userType: string | null;
  isPaid: boolean;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getRequestHeaders(event);
  const rawCookie = headers.cookie || '';

  try {
    const data = await $fetch<AuthResponse>('/auth/status', {
      baseURL: config.public.baseUrl,
      headers: {
        Accept: 'application/json',
        Cookie: rawCookie,
      },
      credentials: 'include',
    });

    return data;
  } catch (error: any) {
    console.error('🔴 [API Status] Error:', {
      status: error.status,
      message: error.message,
    });

    return {
      accessToken: null,
      userId: null,
      isAdmin: false,
      userType: null,
      isPaid: false,
    } as AuthResponse;
  }
});
