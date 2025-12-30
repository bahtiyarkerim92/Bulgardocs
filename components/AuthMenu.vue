<template>
  <div class="header__auth-wrapper">
    <!-- Show Sign In / Sign Up buttons if not logged into patient app -->
    <div v-if="!isPatientAuthenticated" class="header__nav-auth">
      <BaseButton
        variant="outline-white"
        :button-text="$t('nav.signIn')"
        class="header__auth-btn"
        @click="handleSignIn"
      />
      <BaseButton
        variant="accent"
        :button-text="$t('nav.signUp')"
        class="header__auth-btn"
        @click="handleSignUp"
      />
    </div>

    <!-- Show Profile icon with dropdown if logged into patient app -->
    <div v-else class="header__nav-auth">
      <div class="header__dropdown-trigger" @click="toggleDropdown">
        <div class="header__user-icon-wrapper">
          <UserIcon class="header__auth-icon" />
          <svg
            class="header__dropdown-arrow"
            :class="{ 'header__dropdown-arrow--open': isDropdownOpen }"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <!-- Dropdown Menu -->
        <div v-if="isDropdownOpen" class="header__dropdown-menu">
          <a @click="handleDashboardClick" class="header__dropdown-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              class="header__dropdown-icon"
            >
              <path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <polyline
                points="9,22 9,12 15,12 15,22"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t("nav.dashboard") || "Dashboard" }}
          </a>
          <a
            @click="handleLogout"
            class="header__dropdown-item header__dropdown-item--logout"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              class="header__dropdown-icon"
            >
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <polyline
                points="16,17 21,12 16,7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t("nav.logout") || "Logout" }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import UserIcon from "~/public/svg/user.svg";
import { useModalStore } from "~/stores/modalStore";
import BaseButton from "~/components/BaseButton.vue";

const {
  isPatientLoggedIn,
  redirectToPatientLogin,
  redirectToPatientDashboard,
} = usePatientAuth();

const modalStore = useModalStore();

// Reactive computed for authentication status
const isPatientAuthenticated = computed(() => {
  // Force reactivity by referencing the force check
  forceAuthCheck.value;
  const isLoggedIn = isPatientLoggedIn();
  if (import.meta.client) {
    console.log("🔍 AuthMenu: Patient authentication status:", isLoggedIn);
  }
  return isLoggedIn;
});

// Dropdown state
const isDropdownOpen = ref(false);

// Force reactivity by checking auth status periodically
const forceAuthCheck = ref(0);

// Only run interval on client side
if (import.meta.client) {
  setInterval(() => {
    forceAuthCheck.value++;
  }, 500); // Check every 500ms for faster detection
}

// Handle sign in click
const handleSignIn = () => {
  modalStore.showLogin();
};

// Handle sign up click
const handleSignUp = () => {
  modalStore.showRegister();
};

// Toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown
const closeDropdown = () => {
  isDropdownOpen.value = false;
};

// Handle dashboard click
const handleDashboardClick = () => {
  closeDropdown();
  redirectToPatientDashboard();
};

// Handle logout click
const handleLogout = async () => {
  closeDropdown();
  // Clear the refresh token cookie
  const tokenCookie = useCookie("refreshToken");
  tokenCookie.value = null;

  // Redirect to home page
  await navigateTo("/");
};

// Handle click outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element;
  const dropdown = document.querySelector(".header__dropdown-trigger");
  if (dropdown && !dropdown.contains(target)) {
    closeDropdown();
  }
};

// Add event listener for click outside and focus events
onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  // Check auth status when window gains focus (user returns to tab)
  const handleFocus = () => {
    forceAuthCheck.value++;
  };

  window.addEventListener("focus", handleFocus);

  // Also check when page becomes visible
  const handleVisibilityChange = () => {
    if (!document.hidden) {
      forceAuthCheck.value++;
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
});

// Remove event listener on unmount
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("focus", () => {});
  document.removeEventListener("visibilitychange", () => {});
});
</script>

<style lang="scss" scoped>
.header__auth-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

// When header is transparent (white background), make outline-white buttons dark
// Use :deep() to reach into BaseButton component
:deep(.base-button--outline-white) {
  // Default: white (for purple header)
  border: 2px solid #ffffff;
  color: #ffffff;
  background: transparent;
}

.header__nav-auth {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header__user-icon-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  border-radius: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
}

.header__auth-icon {
  width: 2.2rem;
  height: 2.2rem;
  color: #ffffff;
}

.header__dropdown-trigger {
  position: relative;
}

.header__dropdown-arrow {
  margin-left: 1rem;
  color: #ffffff;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &--open {
    transform: rotate(180deg);
  }
}

.header__dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 1.5rem;
  background: #ffffff;
  border-radius: 1.6rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  min-width: 240px;
  z-index: 50;
  overflow: hidden;
  padding: 1rem;
  border: 1px solid var(--border-line);
  animation: dropdown-fade 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes dropdown-fade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header__dropdown-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.4rem 1.6rem;
  color: var(--secondary);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 1rem;

  &:hover {
    background: var(--alice-blue);
    color: var(--primary);
    transform: translateX(5px);
  }

  &--logout {
    color: #ff3b30;
    margin-top: 0.8rem;
    border-top: 1px solid var(--border-line);
    border-radius: 0;
    padding-top: 1.8rem;

    &:hover {
      background: #fff5f5;
      color: #ff3b30;
    }
  }
}

.header__dropdown-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
}
</style>

