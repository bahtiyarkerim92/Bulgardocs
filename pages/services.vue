<template>
  <div class="services-page">
    <div class="services-page__container">
      <!-- Hero Section -->
      <div class="services-page__hero">
        <h1 class="services-page__title">{{ $t('components.ourServices.title') }}</h1>
        <p class="services-page__subtitle">
          {{ $t('components.ourServices.description') }}
        </p>
      </div>
    </div>

    <!-- For Patients Section -->
    <section class="services-page__section section-primary circalanimat">
        <div class="it-wrapper">
          <div class="services-page__content">
            <div class="section-intro">
              <h2 class="section-title text-white">{{ $t('components.ourServices.forPatients.title') }}</h2>
              <p class="section-description text-white opacity-80">
                {{ $t('components.ourServices.forPatients.description') }}
              </p>
            </div>
          <div class="services-page__services-grid services-page__services-grid--four">
            <div class="services-page__service services-page__service--patients">
              <div class="services-page__service-icon">
                <Icon name="mdi:magnify" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forPatients.search.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forPatients.search.text') }}
              </p>
            </div>
            <div class="services-page__service services-page__service--patients">
              <div class="services-page__service-icon">
                <Icon name="mdi:video" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forPatients.book.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forPatients.book.text') }}
              </p>
            </div>
            <div class="services-page__service services-page__service--patients">
              <div class="services-page__service-icon">
                <Icon name="mdi:file-document-outline" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forPatients.offers.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forPatients.offers.text') }}
              </p>
            </div>
            <div class="services-page__service services-page__service--patients">
              <div class="services-page__service-icon">
                <Icon name="mdi:calendar-month" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forPatients.manage.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forPatients.manage.text') }}
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

    <div class="services-page__container">
      <!-- For Doctors Section -->
      <section class="services-page__section">
        <div class="services-page__content">
          <div class="section-intro">
            <h2 class="section-title">{{ $t('components.ourServices.forDoctors.title') }}</h2>
            <p class="section-description">
              {{ $t('components.ourServices.forDoctors.description') }}
            </p>
          </div>
          <div class="services-page__services-grid">
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:account-circle" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forDoctors.profile.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forDoctors.profile.text') }}
              </p>
            </div>
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:account-group" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forDoctors.patients.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forDoctors.patients.text') }}
              </p>
            </div>
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:briefcase" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forDoctors.jobs.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forDoctors.jobs.text') }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- For Clinics Section -->
    <section class="services-page__section section-primary circalanimat">
        <div class="it-wrapper">
          <div class="services-page__content">
            <div class="section-intro">
              <h2 class="section-title text-white">{{ $t('components.ourServices.forClinics.title') }}</h2>
              <p class="section-description text-white opacity-80">
                {{ $t('components.ourServices.forClinics.description') }}
              </p>
            </div>
          <div class="services-page__services-grid">
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:hospital-building" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forClinics.profile.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forClinics.profile.text') }}
              </p>
            </div>
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:account-multiple" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forClinics.doctors.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forClinics.doctors.text') }}
              </p>
            </div>
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:account-search" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forClinics.recruit.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forClinics.recruit.text') }}
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

    <div class="services-page__container">
      <!-- For Agencies Section -->
      <section class="services-page__section">
        <div class="services-page__content">
          <div class="section-intro">
            <h2 class="section-title">{{ $t('components.ourServices.forAgencies.title') }}</h2>
            <p class="section-description">
              {{ $t('components.ourServices.forAgencies.description') }}
            </p>
          </div>
          <div class="services-page__services-grid">
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:office-building" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forAgencies.manage.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forAgencies.manage.text') }}
              </p>
            </div>
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:file-document-multiple" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forAgencies.treatments.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forAgencies.treatments.text') }}
              </p>
            </div>
            <div class="services-page__service">
              <div class="services-page__service-icon">
                <Icon name="mdi:account-network" />
              </div>
              <h3 class="services-page__service-title">{{ $t('components.ourServices.forAgencies.coordination.title') }}</h3>
              <p class="services-page__service-text">
                {{ $t('components.ourServices.forAgencies.coordination.text') }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- CTA Section -->
    <section class="services-page__cta bg-alice-blue">
      <div class="services-page__container">
          <div class="services-page__cta-content">
            <h2 class="services-page__cta-title">{{ $t('components.healthcareFeatures.tagline.highlight') }}</h2>
            <p class="services-page__cta-text">
              {{ $t('components.healthcareFeatures.tagline.text') }}
            </p>
            <div class="services-page__cta-buttons">
              <NuxtLink to="/search" class="btn-apple btn-apple--primary btn-large">
                {{ $t('button.startForFree') }}
              </NuxtLink>
              <NuxtLink to="/pricing" class="btn-apple btn-apple--secondary btn-large">
                {{ $t('nav.pricing') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

useHead({
  title: `${t('nav.services')} - Bulgardocs`,
  meta: [
    {
      name: 'description',
      content: t('components.ourServices.description')
    }
  ]
})
</script>

<style lang="scss" scoped>
.services-page {
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

  &__services-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    &--four {
      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem;
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }

  &__service {
    background: #ffffff;
    border: 1px solid var(--border-line);
    border-radius: 1.4rem;
    padding: 4rem 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 20px 80px 0px rgba(104, 117, 141, 0.15);
      transform: translateY(-4px);
    }

    &--patients {
      padding: 4rem 3rem;
      text-align: left;

      .services-page__service-icon {
        width: 5rem;
        height: 5rem;
        margin-bottom: 2.5rem;
        background: var(--alice-blue);
        color: var(--primary);
        border-radius: 1.2rem;

        :deep(svg) {
          width: 2.5rem;
          height: 2.5rem;
        }
      }

      .services-page__service-title {
        font-size: 2.2rem;
        margin-bottom: 1.5rem;
        text-align: left;
      }

      .services-page__service-text {
        font-size: 1.5rem;
        line-height: 1.6;
        text-align: left;
      }
    }
  }

  &__service-icon {
    width: 5rem;
    height: 5rem;
    margin-bottom: 2.5rem;
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

  &__service-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 1.5rem;
  }

  &__service-text {
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
  .services-page {
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

    &__services-grid {
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

