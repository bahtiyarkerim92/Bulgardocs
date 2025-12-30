<template>
  <div class="contact-page">
    <div class="contact-page__container">
      <div class="contact-page__header">
        <h1 class="contact-page__title">{{ t('contact.title') }}</h1>
        <p class="contact-page__subtitle">{{ t('contact.subtitle') }}</p>
      </div>
    </div>

    <section class="contact-page__section section-primary circalanimat">
      <div class="it-wrapper">
        <div class="contact-page__container">
          <div class="contact-page__content">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  definePageMeta({
    layout: 'default',
  });
</script>

<style lang="scss" scoped>
  .contact-page {
    min-height: 100vh;

    &__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    &__header {
      text-align: center;
      margin-bottom: 6rem;
      padding: 12rem 0 6rem;
    }

    &__title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, #111827 0%, #1e40af 50%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.01em;
    }

    &__subtitle {
      font-size: clamp(1.125rem, 2vw, 1.5rem);
      color: var(--slate-blue);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    &__section {
      padding: 12rem 0;
      position: relative;
      overflow: hidden;
    }

    &__content {
      margin-bottom: 0;
      padding: 0;
    }
  }

  @media (max-width: 768px) {
    .contact-page {
      &__header {
        padding: 8rem 0 4rem;
        margin-bottom: 4rem;
      }

      &__section {
        padding: 4rem 0;
      }
    }
  }
</style>
