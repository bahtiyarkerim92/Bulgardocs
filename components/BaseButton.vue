<template>
  <component
    :is="componentTag"
    :to="componentTag !== 'a' && linkPath ? linkPath : undefined"
    :href="componentTag === 'a' && linkPath ? linkPath : undefined"
    class="base-button"
    :class="[
      `base-button--${variant}`,
      { 'base-button--loading': loading }
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="!loading" class="base-button__content">
      <slot>{{ buttonText }}</slot>
      <arrow v-if="showArrow" class="base-button__arrow" />
    </span>
    <div v-else class="base-button__spinner" />
  </component>
</template>

<script setup lang="ts">
  import arrow from "./public/svg/arrowRightStr.svg";
  import { computed, h, resolveComponent } from 'vue';

  interface Props {
    variant?: 'primary' | 'secondary' | 'accent' | 'white' | 'outline' | 'outline-white';
    tag?: string;
    buttonText?: string;
    linkPath?: string;
    loading?: boolean;
    showArrow?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    tag: 'button',
    buttonText: 'Button',
    linkPath: '',
    loading: false,
    showArrow: false,
  });

  defineEmits(['click']);

  const componentTag = computed(() => {
    // In Nuxt 3, we need to resolve NuxtLink component
    if (props.tag === 'NuxtLink') {
      return resolveComponent('NuxtLink');
    }
    return props.tag;
  });
</script>

<style scoped lang="scss">
  .base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 1.4rem;
    border-radius: 0.6rem;
    font-size: 1.3rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    outline: none;
    position: relative;
    height: 3.6rem;
    white-space: nowrap;

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      width: 100%;
    }

    &__arrow {
      width: 1.6rem;
      height: 1.6rem;
      transition: transform 0.3s ease;
    }

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      
      .base-button__arrow {
        transform: translateX(4px);
      }
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &--primary {
      background: var(--primary);
      color: #ffffff;
      box-shadow: 0 10px 20px rgba(19, 88, 216, 0.15);

      &:hover {
        background: var(--primary-dark);
        box-shadow: 0 15px 30px rgba(19, 88, 216, 0.25);
      }
    }

    &--secondary {
      background: var(--secondary);
      color: #ffffff;
      box-shadow: 0 10px 20px rgba(16, 44, 70, 0.15);

      &:hover {
        background: var(--secondary-dark);
        box-shadow: 0 15px 30px rgba(16, 44, 70, 0.25);
      }
    }

    &--accent {
      background: var(--accent);
      color: var(--secondary);
      box-shadow: 0 10px 20px rgba(255, 185, 145, 0.15);

      &:hover {
        background: #ffa87d;
        box-shadow: 0 15px 30px rgba(255, 185, 145, 0.25);
      }
    }

    &--white {
      background: #ffffff;
      color: var(--primary);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);

      &:hover {
        background: var(--alice-blue);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      }
    }

    &--outline {
      background: transparent;
      border: 2px solid var(--primary);
      color: var(--primary);

      &:hover {
        background: var(--primary);
        color: #ffffff;
      }
    }

    &--outline-white {
      background: transparent;
      border: 2px solid #ffffff;
      color: #ffffff;

      &:hover {
        background: #ffffff;
        color: var(--primary);
      }
    }

    &__spinner {
      width: 2.4rem;
      height: 2.4rem;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: currentColor;
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

<style lang="scss">
// Global styles for outline-white buttons when header is transparent
// This needs to be outside scoped to work with parent selectors
.transparent-header .base-button--outline-white {
  border: 2px solid var(--secondary) !important;
  color: var(--secondary) !important;
  background: transparent !important;

  &:hover {
    background: var(--secondary) !important;
    color: #ffffff !important;
  }
}

// Buttons on purple background (section-primary) should have white border for visibility
.section-primary .base-button--white {
  border: 2px solid #ffffff !important;
  
  &:hover {
    border-color: #ffffff !important;
  }
}

.section-primary .base-button--primary {
  border: 2px solid #ffffff !important;
  
  &:hover {
    border-color: #ffffff !important;
  }
}

.section-primary .base-button--accent {
  border: 2px solid #ffffff !important;
  
  &:hover {
    border-color: #ffffff !important;
  }
}
</style>

