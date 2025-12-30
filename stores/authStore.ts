import { defineStore } from 'pinia';
interface BackendError {
  status: number;
  data: Record<string, unknown>;
}

interface AuthUser {
  userId: string;
  isAdmin: boolean;
  userType?: string;
  isPaid: boolean;
}

interface TokenResponse {
  accessToken: string | null;
  userId: string;
  isAdmin: boolean;
  userType?: string;
  isPaid?: boolean;
}

interface PaymentInfo {
  userId: string;
  email: string;
  companyName: string;
  vatNumber: string;
  country: string;
  street: string;
  postalCode: string;
  companyAddress: string;
  phoneNumber: string;
  countryCode: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: AuthUser | null;
  loginBackendError: BackendError;
  isAdmin: boolean;
  ip: string;
  paymentInfo: PaymentInfo | null;
  isInitialized: boolean;
  isRefreshing: boolean;
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    isAuthenticated: false,
    accessToken: null,
    user: null,
    loginBackendError: { status: 0, data: {} },
    isAdmin: false,
    ip: '',
    paymentInfo: null,
    isInitialized: false,
    isRefreshing: false,
  }),

  getters: {
    hasPaid: (state): boolean => {
      return state.user?.isPaid ?? false;
    },
  },

  actions: {
    setAccessToken(token: string | null) {
      this.accessToken = token;
      this.isAuthenticated = !!token;
    },

    async refreshAccessToken() {
      if (this.isRefreshing) return;

      this.isRefreshing = true;
      const config = useRuntimeConfig();

      try {
        const { data, error } = await useFetch<TokenResponse>(
          `${config.public.baseUrl}/auth/status`,
          {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (error.value || !data.value?.accessToken) {
          this.setAccessToken(null);
          this.user = null;
          throw new Error('Failed to refresh token');
        }

        this.setAccessToken(data.value.accessToken);
        if (data.value) {
          this.user = {
            userId: data.value.userId,
            isAdmin: data.value.isAdmin,
            userType: data.value.userType?.toLowerCase(),
            isPaid: data.value.isPaid ?? false,
          };
        }
      } catch (err) {
        if (err.message !== 'Failed to refresh token') {
          console.error('🟪 [Auth Store] Token refresh error:', err);
        }
      } finally {
        this.isRefreshing = false;
      }
    },

    async getPaymentInfo(): Promise<PaymentInfo> {
      const config = useRuntimeConfig();

      try {
        const response = await $fetch<PaymentInfo>('/auth/payment-info', {
          baseURL: config.public.baseUrl,
          credentials: 'include',
          headers: this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : undefined,
        });

        this.paymentInfo = response;
        return response;
      } catch (error: unknown) {
        const err = error as { status?: number };
        if (err.status === 401) {
          await this.refreshAccessToken();
          return this.getPaymentInfo();
        }
        console.error('🟪 [Auth Store] Failed to fetch payment information:', error);
        throw error;
      }
    },

    async login(email: string, password: string) {
      const config = useRuntimeConfig();
      const baseUrl = config.public.baseUrl;
      this.loginBackendError = { status: 0, data: {} };
      const ipInfo = await useLocation();
      const currentIp = ipInfo?.ip || 'unknown';
    
      try {
        console.log("login", email, password, currentIp);
        const { error, data } = await useFetch<TokenResponse>(`${baseUrl}/auth/login`, {
          method: 'POST',
          body: {
            email,
            password,
            ip: currentIp,
          },
          credentials: 'include',
        });
    

        if (error.value) {
          this.loginBackendError = {
            status: error.value.statusCode || 0,
            data: error.value.data || {},
          };
          throw new Error(error.value.data?.message || 'Invalid email or password');
        }

        if (data.value) {
          this.setAccessToken(data.value.accessToken);
          this.isAdmin = data.value.isAdmin || false;
          this.user = {
            userId: data.value.userId,
            isAdmin: data.value.isAdmin,
            userType: data.value.userType?.toLowerCase(),
            isPaid: data.value.isPaid ?? false,
          };

          // Verify the authentication state immediately
          const statusCheck = await useFetch<TokenResponse>(`${baseUrl}/auth/status`, {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
          });

       
        }
      } catch (err) {
        console.error('🟪 [Auth Store] Login error:', err);
        throw err;
      }
    },

    async logout() {
      const router = useRouter();
      const config = useRuntimeConfig();
      const baseUrl = config.public.baseUrl;

      try {
        await useFetch(`${baseUrl}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });

        this.setAccessToken(null);
        this.user = null;
        const localePath = useLocalePath();
        router.push(localePath('/'));
      } catch (err) {
        console.error('🟪 [Auth Store] Logout error:', err);
      }
    },
  },
});
