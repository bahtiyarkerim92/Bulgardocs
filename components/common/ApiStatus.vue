<template>
  <div v-if="showStatus" class="api-status">
    <div class="api-status__card" :class="statusClass">
      <Icon :name="statusIcon" class="api-status__icon" />
      <div class="api-status__content">
        <h3 class="api-status__title">{{ statusTitle }}</h3>
        <p class="api-status__message">{{ statusMessage }}</p>
        <button
          v-if="!isConnected"
          @click="checkStatus"
          class="api-status__retry"
        >
          <Icon name="mdi:refresh" class="api-status__retry-icon" />
          Retry Connection
        </button>
      </div>
      <button @click="hideStatus" class="api-status__close">
        <Icon name="mdi:close" class="api-status__close-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

const showStatus = ref(props.show);
const isConnected = ref(false);
const backendStatus = ref("");
const errorMessage = ref("");

const statusClass = computed(() => ({
  "api-status__card--connected": isConnected.value,
  "api-status__card--disconnected": !isConnected.value,
}));

const statusIcon = computed(() =>
  isConnected.value ? "mdi:check-circle" : "mdi:alert-circle"
);

const statusTitle = computed(() =>
  isConnected.value ? "Connection Restored" : "Connection Issue"
);

const statusMessage = computed(() => {
  if (isConnected.value) {
    return "Successfully connected to the server.";
  }
  return (
    errorMessage.value || "Unable to connect to the server. Using demo data."
  );
});

const checkStatus = async () => {
  try {
    const config = useRuntimeConfig();
    const baseApiUrl = config.public.baseUrl;

    const response = await fetch(`${baseApiUrl}/auth/status`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    isConnected.value = data.backend === "Connected";
    backendStatus.value = data.backend;
    errorMessage.value = data.error || "";

    if (isConnected.value) {
      setTimeout(() => {
        showStatus.value = false;
      }, 3000);
    }
  } catch (error) {
    isConnected.value = false;
    errorMessage.value = "Failed to check server status";
  }
};

const hideStatus = () => {
  showStatus.value = false;
};

// Auto-check status on mount
onMounted(() => {
  if (props.show) {
    checkStatus();
  }
});

// Watch for prop changes
watch(
  () => props.show,
  (newVal) => {
    showStatus.value = newVal;
    if (newVal) {
      checkStatus();
    }
  }
);
</script>

<style lang="scss" scoped>
.api-status {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;

  @media (max-width: $breakpoint_small) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
  }

  &__card {
    background: var(--white);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    min-width: 30rem;
    position: relative;
    border-left: 0.4rem solid var(--error);

    @media (max-width: $breakpoint_small) {
      min-width: auto;
      padding: 1.5rem;
    }

    &--connected {
      border-left-color: var(--success);
    }

    &--disconnected {
      border-left-color: var(--error);
    }
  }

  &__icon {
    font-size: 2.4rem;
    margin-top: 0.2rem;

    .api-status__card--connected & {
      color: var(--success);
    }

    .api-status__card--disconnected & {
      color: var(--error);
    }
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: $font-medium;
    font-weight: $bold-default;
    color: var(--dark-text);
    margin-bottom: 0.5rem;
  }

  &__message {
    font-size: $font-small;
    color: var(--medium-text);
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  &__retry {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: var(--primary);
    color: var(--white);
    border: none;
    border-radius: 0.6rem;
    font-size: $font-very-small;
    font-weight: $bold-default;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--primary-dark);
      transform: translateY(-0.1rem);
    }

    &-icon {
      font-size: 1.4rem;
    }
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.4rem;
    height: 2.4rem;
    background: transparent;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: var(--widget-grey);
    }

    &-icon {
      font-size: 1.6rem;
      color: var(--medium-text);
    }
  }
}
</style>
