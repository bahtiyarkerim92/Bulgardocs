<template>
  <div class="about-page">
    <div class="about-page__container">
      <!-- Hero Section -->
      <div class="about-page__hero">
        <h1 class="about-page__title">{{ $t('about.titleColored') }} {{ $t('about.title') }}</h1>
        <p class="about-page__subtitle">
          {{ $t('about.description') }}
        </p>
      </div>
    </div>

    <!-- Mission Section -->
    <section class="about-page__mission section-primary circalanimat">
      <div class="it-wrapper">
        <div class="about-page__mission-content">
          <div class="section-intro">
            <h2 class="section-title text-white">{{ $t('about.mission.title') }}</h2>
            <p class="section-description text-white opacity-80">
              {{ $t('about.mission.text') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="about-page__container">
      <!-- Features Section -->
      <section class="about-page__section">
        <div class="about-page__content">
          <div class="section-intro">
            <h2 class="section-title">{{ $t('about.features.title') }}</h2>
            <p class="section-description">
              {{ $t('about.features.description') }}
            </p>
          </div>
          <div class="about-page__features">
            <div class="about-page__feature">
              <div class="about-page__feature-icon">
                <Icon name="mdi:account-heart" />
              </div>
              <h3 class="about-page__feature-title">{{ $t('about.features.patients.title') }}</h3>
              <p class="about-page__feature-text">
                {{ $t('about.features.patients.text') }}
              </p>
            </div>
            <div class="about-page__feature">
              <div class="about-page__feature-icon">
                <Icon name="mdi:doctor" />
              </div>
              <h3 class="about-page__feature-title">{{ $t('about.features.doctors.title') }}</h3>
              <p class="about-page__feature-text">
                {{ $t('about.features.doctors.text') }}
              </p>
            </div>
            <div class="about-page__feature">
              <div class="about-page__feature-icon">
                <Icon name="mdi:hospital-building" />
              </div>
              <h3 class="about-page__feature-title">{{ $t('about.features.clinics.title') }}</h3>
              <p class="about-page__feature-text">
                {{ $t('about.features.clinics.text') }}
              </p>
            </div>
            <div class="about-page__feature">
              <div class="about-page__feature-icon">
                <Icon name="mdi:office-building" />
              </div>
              <h3 class="about-page__feature-title">{{ $t('about.features.agencies.title') }}</h3>
              <p class="about-page__feature-text">
                {{ $t('about.features.agencies.text') }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="about-page__cta bg-alice-blue">
        <div class="about-page__container">
          <div class="about-page__cta-content">
            <h2 class="about-page__cta-title">{{ $t('components.healthcareFeatures.tagline.highlight') }}</h2>
            <p class="about-page__cta-text">
              {{ $t('components.healthcareFeatures.tagline.text') }}
            </p>
            <div class="about-page__cta-buttons">
              <NuxtLink to="/search" class="btn-apple btn-apple--primary btn-large">
                {{ $t('button.startForFree') }}
              </NuxtLink>
              <NuxtLink to="/contact" class="btn-apple btn-apple--secondary btn-large">
                {{ $t('nav.contact') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

useHead({
  title: `About Us - Bulgardocs`,
  meta: [
    {
      name: 'description',
      content: t('about.description')
    }
  ]
})
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__hero {
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
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto;
  }

  &__section {
    padding: 12rem 0;
    position: relative;
    overflow: hidden;
  }

  &__mission {
    padding: 12rem 0;
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  &__mission-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-intro {
    text-align: center;
    margin-bottom: 6rem;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3.6rem);
    font-weight: 700;
    margin-bottom: 2rem;
  }

  .section-description {
    font-size: clamp(1.125rem, 2vw, 1.8rem);
    color: var(--slate-blue);
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
  }

  &__features {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
    margin-top: 4rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__feature {
    background: #ffffff;
    border: 1px solid var(--border-line);
    border-radius: 1.4rem;
    text-align: center;
    padding: 4rem 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 20px 80px 0px rgba(104, 117, 141, 0.15);
      transform: translateY(-4px);
    }
  }

  &__feature-icon {
    width: 5rem;
    height: 5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--alice-blue);
    border-radius: 1.2rem;
    color: var(--primary);

    :deep(svg) {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  &__feature-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 1.5rem;
  }

  &__feature-text {
    font-size: 1.5rem;
    color: var(--slate-blue);
    line-height: 1.6;
    flex: 1;
  }

  &__cta {
    padding: 12rem 2rem;
    text-align: center;
  }

  &__cta-content {
    max-width: 700px;
    margin: 0 auto;
  }

  &__cta-title {
    font-size: clamp(2rem, 4vw, 3.6rem);
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 2rem;
  }

  &__cta-text {
    font-size: 1.8rem;
    color: var(--slate-blue);
    line-height: 1.7;
    margin-bottom: 4rem;
  }

  &__cta-buttons {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-large {
    padding: 1.6rem 4rem;
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .about-page {
    &__container {
      padding: 0 2rem;
    }

    &__hero {
      padding: 8rem 0 4rem;
      margin-bottom: 4rem;
    }

    &__section {
      padding: 4rem 0;
      margin-bottom: 4rem;
    }

    &__mission {
      padding: 6rem 0;
    }

    &__features {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    &__cta {
      padding: 6rem 2rem;
    }

    &__cta-buttons {
      flex-direction: column;
      gap: 1.5rem;
    }

    &__cta-button {
      width: 100%;
    }
  }
}
</style>

