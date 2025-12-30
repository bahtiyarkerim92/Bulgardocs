import { useModalStore } from '~/stores/modalStore';

export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (import.meta.server) return;

  const handleShowLogin = () => {
    const modalStore = useModalStore();
    const route = useRoute();
    const router = useRouter();

    if (route.query.showLogin === 'true') {
      // Show login modal
      modalStore.showLogin();

      // Remove showLogin parameter without navigation
      const query = { ...route.query };
      delete query.showLogin;
      router.replace({ path: route.path, query });
    }
  };

  // Handle initial mount
  nuxtApp.hook('app:mounted', handleShowLogin);

  // Handle route changes
  nuxtApp.hook('page:finish', handleShowLogin);
});
