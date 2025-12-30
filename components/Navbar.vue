<template>
  <header
    ref="header"
    class="header"
    :class="{
      'sticky-header': isHeaderBg || !isHomePage,
      'transparent-header': !isHeaderBg && isHomePage,
      'is-homepage': isHomePage,
    }"
  >
    <div class="header__container">
      <div class="header__logo-container">
        <NuxtLink :to="localePath('/')" class="header__logo-link">
          <span class="header__logo-text">Bulgardocs</span>
        </NuxtLink>
      </div>
      <nav class="header__nav" aria-label="main navigation">
        <!-- MOBILE HAMBURGER DIALOG -->
        <Teleport to="body">
          <div
            v-if="showMobileMenu"
            class="mobile-menu-overlay"
            :class="{ 'is-visible': isToggle }"
            @click="hiddenModal"
          >
            <div
              class="mobile-menu"
              :class="{ 'is-visible': isToggle }"
              @click.stop
            >
              <div class="mobile-menu__header">
                <span class="mobile-menu__logo-text">Bulgardocs</span>
                <closeBtn class="mobile-menu__close" @click="hiddenModal" />
              </div>
              <NavbarMenu
                aria-label="breadcrumb"
                :is-toggle="isToggle"
                @show-register="showRegister"
                @show-login="showLogin"
                @close-modal="hiddenModal"
              />
              <div class="mobile-menu__auth-row">
                <div class="mobile-menu__auth">
                  <AuthMenu />
                </div>
                <div class="mobile-menu__lang">
                  <LangDropDown />
                </div>
              </div>
              <div class="mobile-menu__actions">
                <BaseButton
                  tag="a"
                  :link-path="dashboardUrl"
                  variant="primary"
                  :button-text="$t('nav.forProviders')"
                  class="mobile-menu__provider-btn"
                />
              </div>
            </div>
          </div>
        </Teleport>

        <!-- DESKTOP MENU -->
        <NavbarMenu
          v-show="showDesktopMenu"
          class="header__menu-desktop"
          :is-toggle="false"
          :is-above="!isHeaderBg"
          @show-register="showRegister"
          @show-login="showLogin"
        />
      </nav>

      <div class="header__last-items">
        <div class="header__auth-wrapper">
          <AuthMenu />
        </div>
        <BaseButton
          tag="a"
          :link-path="dashboardUrl"
          variant="outline-white"
          :button-text="$t('nav.forProviders')"
          class="header__provider-btn"
        />
        <div class="header__lang-switcher">
          <LangDropDown />
        </div>

        <div class="header__auth">
          <Teleport to="body">
            <BaseDialog
              v-if="modalStore.isAuthModalOpen"
              ref="authModal"
              class="dialog-register"
            >
              <template #modal-body>
                <NuxtLink :to="localePath('/')" @click="hiddenModal" />
                <div v-if="modalStore.currentAuthForm === 'login'">
                  <Login
                    @switch-to-register="showRegister"
                    @switch-to-forgot-password="showForgotPassword"
                    @close-modal="hiddenModal"
                  />
                </div>
                <div v-if="modalStore.currentAuthForm === 'register'">
                  <Register
                    @switch-to-login="showLogin"
                    @close-register="hiddenModal"
                  />
                </div>
                <div v-if="modalStore.currentAuthForm === 'forgotPassword'">
                  <ForgotPassword @switch-to-login="showLogin" />
                </div>
              </template>
            </BaseDialog>
          </Teleport>
        </div>

        <button
          type="button"
          class="header__hamburger-btn"
          :class="{ 'header__hamburger-active': isToggle }"
          @click="showModal"
          aria-label="Toggle menu"
        >
          <span
            :class="[
              {
                'header__hamburger-icon--white': !isHeaderBg,
              },
            ]"
            class="header__hamburger-icon"
          >
            <span class="header__hamburger-line"></span>
            <span class="header__hamburger-line"></span>
            <span class="header__hamburger-line"></span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseDialog from "./BaseDialog.vue";
import closeBtn from "./public/svg/closeBold.svg";
import ForgotPassword from "./ForgotPassword.vue";
import BaseButton from "./BaseButton.vue";
import { useModalStore } from "~/stores/modalStore";
import { useAuthStore } from "~/stores/authStore";
import { useDevice } from "~/composables/useDevice";

const localePath = useLocalePath();
const modalStore = useModalStore();
const authStore = useAuthStore();
const { isMobile } = useDevice();
const route = useRoute();

// Dashboard URL - use environment variable or default to localhost
// Use useState to avoid hydration mismatch
const dashboardUrl = useState('dashboardUrl', () => {
  // Default to production URL for SSR
  return 'https://dashboard.bulgardocs.com';
});

// Update URL on client side after mount
onMounted(() => {
  if (process.client) {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.0.')) {
      dashboardUrl.value = 'http://localhost:5173';
    } else {
      dashboardUrl.value = 'https://dashboard.bulgardocs.com';
    }
  }
});

// Define main navigation pages
const mainPages = [
  "pricing",
  "about",
  "services",
  "contact",
];

const isHomePage = computed(() => {
  // Remove query parameters and trailing slashes for comparison
  const currentPath = route.path.toLowerCase().split("?")[0].replace(/\/$/, "");
  const localizedRoot = localePath("/").toLowerCase().replace(/\/$/, "");

  // Check if it's the root path
  if (currentPath === "" || currentPath === localizedRoot) {
    return true;
  }

  // Check if it's one of the main pages
  return mainPages.some((page) => {
    const localizedPath = localePath("/" + page)
      .toLowerCase()
      .replace(/\/$/, "");
    return currentPath === localizedPath;
  });
});

const header = ref<HTMLElement | null>(null);
const isHeaderBg = ref(!isHomePage.value);
const isToggle = ref(false);
const modal = ref<typeof BaseDialog>();
const authModal = ref<typeof BaseDialog>();
let lastScrollPosition = 0;

// Track loading state separately
const isLoading = ref(true);

// Add SSR-friendly computed for mobile menu visibility
const showMobileMenu = computed(() => isMobile.value && isToggle.value);
const showDesktopMenu = computed(() => !isMobile.value);

const showLogin = () => {
  modalStore.currentAuthForm = "login";
  showAuthModal();
};

const showRegister = () => {
  modalStore.currentAuthForm = "register";
  showAuthModal();
};

const showForgotPassword = () => {
  modalStore.currentAuthForm = "forgotPassword";
  showAuthModal();
};

const handleScroll = () => {
  if (!header.value) return;

  const threshold = 0;
  const currentScrollPosition = window.scrollY;

  // Update header background based on scroll position and page type
  if (isHomePage.value) {
    isHeaderBg.value = currentScrollPosition > threshold;
  }

  // Handle header visibility
  if (
    currentScrollPosition < lastScrollPosition ||
    currentScrollPosition <= threshold
  ) {
    header.value.style.top = "0";
  } else {
    header.value.style.top = "-100%";
  }

  lastScrollPosition = currentScrollPosition;
};

onMounted(async () => {
  watch(
    () => modalStore.isAuthModalOpen,
    (newValue) => {
      console.log("Modal open state changed:", newValue);
      console.log("Current auth form:", modalStore.currentAuthForm);

      if (newValue) {
        openModal();
      } else {
        hiddenModal();
      }
    },
    { immediate: true }
  );

  try {
    // Auth initialization is now handled by patient app
    await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for smooth loading
  } catch (error) {
    console.error("Failed to initialize auth:", error);
  } finally {
    isLoading.value = false;
  }

  // Initialize header position and background
  if (header.value) {
    header.value.style.top = "0";
  }

  // Set initial header background state
  isHeaderBg.value = !isHomePage.value || window.scrollY > 0;

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const hiddenModal = () => {
  if (authModal.value) {
    authModal.value.closeModal();
  }
  if (modal.value) {
    modal.value.closeModal();
  }

  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("popstate", hiddenModal);

  // Wait for animation to complete before updating store
  setTimeout(() => {
    isToggle.value = false;
    modalStore.hideModal();
  }, 300);
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    hiddenModal();
  }
};

const showAuthModal = () => {
  if (!modalStore.isAuthModalOpen) {
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("popstate", hiddenModal);

    modalStore.isAuthModalOpen = true;
    nextTick(() => {
      if (authModal.value) {
        authModal.value.openModal();
      }
    });
  }
};

const openModal = () => {
  document.addEventListener("keydown", handleEscape);
  window.addEventListener("popstate", hiddenModal);

  modalStore.isAuthModalOpen = true;
  nextTick(() => {
    if (authModal.value) {
      authModal.value.openModal();
    }
  });
};

const showModal = () => {
  isToggle.value = !isToggle.value;
  if (isToggle.value) {
    modal.value?.openModal();
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("popstate", hiddenModal);
  }
};

// Watch for route changes to update header background
watch(
  () => route.path,
  () => {
    // Reset scroll position and header background on route change
    lastScrollPosition = 0;
    if (isHomePage.value) {
      isHeaderBg.value = window.scrollY > 0;
    } else {
      isHeaderBg.value = true;
    }
    if (header.value) {
      header.value.style.top = "0";
    }
  }
);
</script>

<style lang="scss" scoped>
@media (max-width: $breakpoint-mobiletabs) {
  :deep(.dialog) {
    overflow: auto !important;
  }
}
.header__auth {
  display: flex;
}

.dialog-register {
  :deep(.dialog) {
    overflow: auto !important;
    backdrop-filter: blur(0.4rem);
    -webkit-backdrop-filter: blur(0.4rem);
    background-color: rgba(0, 0, 0, 0.7);
  }
}
.transparent-header {
  background-color: transparent;
}

.header {
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 6rem;
  min-height: 6rem;
  top: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &.sticky-header {
    background: var(--primary);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-bottom: none;
    
    .header__hamburger-icon {
      color: #ffffff;
    }


    // Menu items stay white when header is purple, and stay white on hover
    .header__menu-desktop {
      .header__nav-link {
        .header__nav-title {
          color: #ffffff !important;
        }

        &:hover {
          .header__nav-title {
            color: #ffffff !important;
          }
        }
      }
    }
  }

  // When header is transparent (white background), buttons should be dark
  &.transparent-header {
    .base-button--outline-white,
    .header__auth-wrapper .base-button--outline-white,
    .header__nav-auth .base-button--outline-white,
    .header__auth-btn.base-button--outline-white,
    .header__provider-btn.base-button--outline-white {
      border: 2px solid var(--secondary) !important;
      color: var(--secondary) !important;
      background: transparent !important;

      &:hover {
        background: var(--secondary) !important;
        color: #ffffff !important;
      }
    }
  }

  @media (min-width: $breakpoint-verysmall) {
    height: 9rem;
    min-height: 9rem;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 100%;

    @media (min-width: 768px) {
      padding: 0 4rem;
    }
  }

  &__logo-container {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &__logo-link {
    text-decoration: none;
  }

  &__nav {
    flex: 2;
    display: flex;
    justify-content: center;
    
    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__last-items {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.8rem;

    @media (max-width: 1024px) {
      // Hide auth menu, provider button, and lang switcher on mobile (they go in mobile menu)
      .header__auth-wrapper,
      .header__provider-btn,
      .header__lang-switcher {
        display: none;
      }
    }
  }

  &__logo-text {
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -0.03em;
    transition: all 0.3s ease;
  }

  &__hamburger-btn {
    display: none;
    cursor: pointer;
    padding: 0.8rem;
    z-index: 1002;
    background: transparent;
    border: none;
    outline: none;

    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__hamburger-icon {
    position: relative;
    width: 2.4rem;
    height: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &__hamburger-line {
    width: 100%;
    height: 3px;
    background-color: var(--accent);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;

    // Keep yellow for all states
    .header__hamburger-icon--white & {
      background-color: var(--accent);
    }

    // Active state - transform to X
    .header__hamburger-active & {
      &:nth-child(1) {
        transform: translateY(0.75rem) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }

      &:nth-child(3) {
        transform: translateY(-0.75rem) rotate(-45deg);
      }
    }
  }


  &__auth-wrapper {
    display: flex;
    align-items: center;
  }

  &__lang-switcher {
    display: flex;
    align-items: center;
  }
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(16, 44, 70, 0.4);
  backdrop-filter: blur(10px);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;

  &.is-visible {
    opacity: 1;
    visibility: visible;
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: #ffffff;
  z-index: 1001;
  padding: 2.5rem 2rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (min-width: 480px) {
    padding: 3rem 3rem;
  }

  @media (min-width: 768px) {
    width: 85%;
    max-width: 500px;
    padding: 3rem 4rem;
  }

  &.is-visible {
    right: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--alice-blue);

    @media (min-width: 480px) {
      margin-bottom: 5rem;
    }

    @media (min-width: 768px) {
      margin-bottom: 6rem;
    }
  }

  &__logo-text {
    font-size: clamp(1.8rem, 4vw, 2rem);
    font-weight: 800;
    color: var(--primary);
    letter-spacing: -0.02em;
  }

  &__close {
    width: 3rem;
    height: 3rem;
    color: var(--secondary);
    cursor: pointer;
    transition: all 0.3s ease;
    background: var(--alice-blue);
    border-radius: 50%;
    padding: 0.6rem;

    &:hover {
      transform: rotate(90deg);
      background: var(--border-line);
      color: var(--primary);
    }
  }

  &__auth-row {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--alice-blue);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 480px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 3rem;
      padding-top: 3rem;
      gap: 1.5rem;
    }
  }

  &__auth {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;

    @media (min-width: 480px) {
      flex: 1;
      min-width: 0;
      gap: 1rem;
    }

    // Make buttons visible on white background
    :deep(.base-button--outline-white) {
      border: 2px solid var(--primary) !important;
      color: var(--primary) !important;
      background: transparent !important;

      &:hover {
        background: var(--primary) !important;
        color: #ffffff !important;
      }
    }

    :deep(.base-button--accent) {
      // Accent button should be fine, but ensure visibility
      background: var(--accent) !important;
      color: var(--secondary) !important;
    }
  }

  &__actions {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 480px) {
      margin-top: 2.5rem;
    }
  }

  &__provider-btn {
    width: 100%;
  }

  &__lang {
    width: 100%;

    @media (min-width: 480px) {
      flex-shrink: 0;
      width: auto;
    }
    
    // Make it match the button styles - 2px border and lila background
    :deep(.custom-select) {
      width: 100%;

      @media (min-width: 480px) {
        width: auto;
      }
    }

    :deep(.custom-select__button) {
      border: 2px solid var(--primary) !important;
      border-radius: 0.6rem;
      background: var(--primary) !important;
      color: #ffffff !important;
      transition: all 0.3s ease;
      height: 3.6rem;
      width: 100%;

      @media (min-width: 480px) {
        width: auto;
      }

      &:hover {
        background: var(--primary-dark) !important;
        border-color: var(--primary-dark) !important;
      }
    }

    :deep(.custom-select__value) {
      color: #ffffff !important;
    }

    :deep(.custom-select__arrow) {
      color: #ffffff !important;
    }

    // Open dropdown upwards in mobile menu
    :deep(.custom-select__dropdown) {
      top: auto !important;
      bottom: calc(100% + 1.5rem) !important;
      right: 0 !important;
    }
  }
}
</style>


