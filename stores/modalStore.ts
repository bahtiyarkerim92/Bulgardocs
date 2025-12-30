import { defineStore } from "pinia";

export const useModalStore = defineStore('modalStore', {
  // State: contains the reactive properties of the store
  state: () => ({
    isAuthModalOpen: false,
    currentAuthForm: 'login' as 'login' | 'register' | 'forgotPassword',
    isTransitioning: false,
  }),

  // Actions: methods that modify the state or perform asynchronous operations
  actions: {
    showLogin() {
      if (this.isTransitioning) return;
      this.currentAuthForm = 'login';
      this.isAuthModalOpen = true;
    },

    showRegister() {
      if (this.isTransitioning) return;
      this.currentAuthForm = 'register';
      this.isAuthModalOpen = true;
    },

    showForgotPassword() {
      if (this.isTransitioning) return;
      this.currentAuthForm = 'forgotPassword';
      this.isAuthModalOpen = true;
    },

    hideModal() {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.isAuthModalOpen = false;

      // Remove showLogin parameter from URL if it exists
      const route = useRoute();
      const router = useRouter();
      if (route.query.showLogin) {
        const query = { ...route.query };
        delete query.showLogin;
        router.replace({ query });
      }

      // Reset transitioning state after animation completes
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    },
  },
});
