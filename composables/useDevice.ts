import { useState} from '#app';

export const useDevice = () => {
  // Create a reactive width ref
  const windowWidth = ref(import.meta.client ? window.innerWidth : 992);

  // Helper function to check if viewport is mobile width
  const checkIsMobileWidth = (width: number) => width <= 1024;

  // Use Nuxt's useState with a default based on viewport size
  const isMobile = useState('device-is-mobile', () => {
    // During SSR, default to mobile first
    if (import.meta.server) {
      return true;
    }

    // On client, immediately check viewport
    if (import.meta.client) {
      return checkIsMobileWidth(windowWidth.value);
    }

    // Default to mobile first
    return true;
  });

  if (import.meta.client) {
    // Update immediately on mount to ensure correct initial state
    onMounted(() => {
      windowWidth.value = window.innerWidth;
      isMobile.value = checkIsMobileWidth(windowWidth.value);
      window.addEventListener('resize', handleResize, { passive: true });

    });

    // Watch for width changes
    watch(
      windowWidth,
      (newWidth) => {
        isMobile.value = checkIsMobileWidth(newWidth);
      },
      { immediate: true }
    );

    // Resize handler without debounce for more responsiveness
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };

    // Add resize listener
    // onBeforeMount(() => {
    //   window.addEventListener('resize', handleResize, { passive: true });
    // });

    // Cleanup
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  }

  return {
    isMobile,
    windowWidth,
  };
};
