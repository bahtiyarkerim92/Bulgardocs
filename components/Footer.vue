<template>
  <footer class="site-footer">
    <div class="site-footer__container">
      <div class="site-footer__main">
        <!-- Logo and Brand -->
        <div class="site-footer__brand">
          <NuxtLink to="/" class="site-footer__logo-link">
            <span class="site-footer__logo-text">Bulgardocs</span>
          </NuxtLink>
          <p class="site-footer__brand-desc">
            {{ $t('footer.description') }}
          </p>
        </div>

        <!-- Links Grid -->
        <div class="site-footer__links">
          <!-- Quick Links -->
          <div class="site-footer__menu">
            <h4 class="site-footer__menu-title">{{ $t('footer.quickLinks') }}</h4>
            <ul class="site-footer__menu-list">
              <li
                v-for="(item, index) in mainMenuItems"
                :key="index"
                class="site-footer__menu-item"
              >
                <NuxtLink
                  :to="localePath(item.path)"
                  class="site-footer__menu-link"
                >
                  {{ $t(item.label) }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Account -->
          <div class="site-footer__menu">
            <h4 class="site-footer__menu-title">{{ $t('footer.account') }}</h4>
            <ul class="site-footer__menu-list">
              <li class="site-footer__menu-item">
                <a
                  @click="handleSignIn"
                  class="site-footer__menu-link site-footer__auth-link"
                  style="cursor: pointer"
                >
                  {{ $t("nav.signIn") }}
                </a>
              </li>
              <li class="site-footer__menu-item">
                <a
                  @click="handleSignUp"
                  class="site-footer__menu-link site-footer__auth-link site-footer__auth-link--register"
                  style="cursor: pointer"
                >
                  {{ $t("nav.signUp") }}
                </a>
              </li>
            </ul>
          </div>

          <!-- For Providers -->
          <div class="site-footer__menu">
            <h4 class="site-footer__menu-title">{{ $t('footer.providers') }}</h4>
            <ul class="site-footer__menu-list">
              <li class="site-footer__menu-item">
                <BaseButton
                  tag="a"
                  :link-path="dashboardUrl"
                  variant="outline-white"
                  :button-text="$t('footer.joinAsProvider')"
                  class="site-footer__provider-btn"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="site-footer__bottom">
        <p class="site-footer__copyright">
          © {{ currentYear }} Bulgardocs. {{ $t("footer.allRightsReserved") }}
        </p>

        <div class="site-footer__socials">
          <a
            href="https://facebook.com/bulgardocs"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer__social-link"
            aria-label="Follow us on Facebook"
          >
            <Icon name="mdi:facebook" class="site-footer__social-icon" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer__social-link"
            aria-label="Follow us on Twitter"
          >
            <Icon name="mdi:twitter" class="site-footer__social-icon" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer__social-link"
            aria-label="Follow us on LinkedIn"
          >
            <Icon name="mdi:linkedin" class="site-footer__social-icon" />
          </a>
        </div>

        <div class="site-footer__legal">
          <ul class="site-footer__legal-list">
            <li
              v-for="(item, index) in legalLinks"
              :key="index"
              class="site-footer__legal-item"
            >
              <NuxtLink
                :to="localePath(item.path)"
                class="site-footer__legal-link"
              >
                {{ $t(item.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/modalStore";
import BaseButton from "./BaseButton.vue";

defineOptions({
  name: "SiteFooter",
});

const localePath = useLocalePath();
const currentYear = new Date().getFullYear();

// Use modal store for auth
const modalStore = useModalStore();

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

const mainMenuItems = [
  { path: "/", label: "nav.home" },
  { path: "/about", label: "nav.about_us" },
  { path: "/services", label: "nav.services" },
  { path: "/pricing", label: "nav.pricing" },
  { path: "/contact", label: "nav.contact" },
];

const legalLinks = [
  { path: "/privacy", label: "nav.privacy" },
  { path: "/terms", label: "nav.terms" },
  { path: "/legal", label: "nav.legal" },
];

// Handle auth actions
const handleSignIn = () => {
  modalStore.showLogin();
};

const handleSignUp = () => {
  modalStore.showRegister();
};
</script>

<style lang="scss" scoped>
.site-footer {
  background: var(--secondary);
  color: #ffffff;
  padding: 10rem 2rem 5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  &__container {
    max-width: 1400px;
    margin: 0 auto;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6rem;
    margin-bottom: 8rem;
    padding-bottom: 8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    @media (min-width: 992px) {
      grid-template-columns: 1.5fr 3fr;
      align-items: start;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  &__logo-link {
    text-decoration: none;
  }

  &__logo-text {
    font-size: 3rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.03em;
    transition: all 0.3s ease;

    &:hover {
      color: var(--accent);
    }
  }

  &__brand-desc {
    font-size: 1.6rem;
    line-height: 1.6;
    color: var(--slate-blue);
    max-width: 32rem;
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__menu-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: #ffffff;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.8rem;
      left: 0;
      width: 3rem;
      height: 2px;
      background: var(--accent);
    }
  }

  &__menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__menu-link {
    color: var(--slate-blue);
    text-decoration: none;
    font-size: 1.6rem;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;

    &:hover {
      color: #ffffff;
      transform: translateX(5px);
    }
  }

  &__auth-link {
    &--register {
      color: var(--accent);
      font-weight: 700;
      
      &:hover {
        color: #ffffff;
      }
    }
  }

  &__provider-btn {
    width: 100%;
    margin-top: 0.5rem;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__copyright {
    font-size: 1.5rem;
    color: var(--slate-blue);
    margin: 0;
    order: 3;

    @media (min-width: 768px) {
      order: 1;
    }
  }

  &__socials {
    display: flex;
    gap: 2rem;
    order: 1;

    @media (min-width: 768px) {
      order: 2;
    }
  }

  &__social-link {
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      background: var(--accent);
      color: var(--secondary);
      transform: translateY(-5px);
      border-color: var(--accent);
    }
  }

  &__social-icon {
    width: 2.2rem;
    height: 2.2rem;
  }

  &__legal {
    order: 2;

    @media (min-width: 768px) {
      order: 3;
    }
  }

  &__legal-list {
    display: flex;
    gap: 2.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__legal-link {
    color: var(--slate-blue);
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      color: #ffffff;
    }
  }
}
</style>

