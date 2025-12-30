<template>
  <ul
    class="header__nav-list"
    :class="{
      'header__nav-mobile': isMobile || props.isToggle,
      'header__menu-desktop': !isMobile && !props.isToggle,
    }"
  >
    <li v-for="(item, index) in navItems" :key="index" class="header__nav-item">
      <NuxtLink :to="localePath(item.path)" class="header__nav-link" @click="handleClick">
        <span class="header__nav-title">
          {{ $t(item.label) }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  const localePath = useLocalePath();
  const { isMobile } = useDevice();

  interface Props {
    isToggle: boolean;
    isAbove?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits(['close-modal', 'show-register', 'show-login']);

  const handleClick = () => {
    if (isMobile.value) {
      emit('close-modal');
    }
  };

  const navItems = [
    { path: '/', label: 'nav.home' },
    { path: '/about', label: 'nav.about_us' },
    { path: '/services', label: 'nav.services' },
    { path: '/pricing', label: 'nav.pricing' },
    { path: '/contact', label: 'nav.contact' },
  ];
</script>

<style scoped lang="scss">
  .header__nav-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0;
    list-style: none;
    margin: 0;

    @media (min-width: 1025px) {
      flex-direction: row;
      gap: 2.5rem;
      align-items: center;
    }
  }

  .header__nav-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #000000;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    padding: 0.5rem 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .header__nav-mobile & {
      color: var(--secondary);
      font-size: 1.8rem;
      font-weight: 800;
    }
  }

  .header__nav-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
      .header__nav-title {
        // Keep text color unchanged, only show underline
        color: #000000 !important;
        &::after {
          width: 100%;
        }
      }

      // For mobile menu
      .header__nav-mobile & {
        .header__nav-title {
          color: var(--primary);
          transform: translateX(10px);
        }
      }
    }

    &.router-link-active {
      .header__nav-title {
        // Keep text color unchanged, only show underline
        color: #000000 !important;
        &::after {
          width: 100%;
        }
      }

      .header__nav-mobile & {
        .header__nav-title {
          color: var(--primary);
        }
      }
    }
  }
</style>


