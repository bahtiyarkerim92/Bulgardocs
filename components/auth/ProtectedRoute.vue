<template>
  <div v-if="!isLoading && isAuthenticated">
    <slot />
  </div>
  <div v-else-if="isLoading" class="auth-loading">
    <LoadingSpinner class="auth-loading__spinner" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore';
import LoadingSpinner from '~/components/common/LoadingSpinner.vue';

const authStore = useAuthStore();
const isLoading = ref(true);
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Initialize auth state if needed
onMounted(async () => {
  try {
    if (!authStore.isInitialized) {
      await authStore.initialize();
    }
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  } finally {
    // Small delay to prevent flash
    setTimeout(() => {
      isLoading.value = false;
    }, 100);
  }
});
</script>

<style lang="scss" scoped>
.auth-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  z-index: 9999;

  &__spinner {
    width: 8rem !important;
    height: 8rem !important;
    border-width: 0.6rem !important;
  }
}
</style> 