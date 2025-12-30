<template>
  <div class="pricing-page">
    <div class="pricing-page__container">
      <div class="pricing-page__header">
        <h1 class="pricing-page__title">{{ $t('components.pricing.title') }}</h1>
        <p class="pricing-page__description">
          {{ $t('components.pricing.description') }}
        </p>
      </div>
    </div>

    <!-- Patient Plan (Free) -->
    <section class="pricing-page__section section-primary circalanimat">
      <div class="it-wrapper">
        <div class="pricing-page__container">
          <div class="section-intro">
            <h2 class="section-title text-white">{{ $t('components.pricing.forPatients') }}</h2>
          </div>
          <div class="pricing-page__grid pricing-page__grid--single">
            <div class="pricing-card pricing-card--free">
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">{{ $t('components.pricing.free') }}</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount">€0</span>
                <span class="pricing-card__period">{{ $t('components.pricing.forever') }}</span>
              </div>
              <p class="pricing-card__subtitle">{{ $t('components.pricing.freeSubtitle') }}</p>
            </div>
            <ul class="pricing-card__features">
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.patientFeatures.search') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.patientFeatures.book') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.patientFeatures.offers') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.patientFeatures.manage') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.patientFeatures.save') }}
              </li>
            </ul>
            <NuxtLink to="/search" class="pricing-card__button pricing-card__button--primary">
              {{ $t('components.pricing.getStartedFree') }}
            </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Doctor Plans -->
    <section class="pricing-page__section">
      <div class="pricing-page__container">
        <div class="section-intro">
          <h2 class="section-title">{{ $t('components.pricing.forDoctors') }}</h2>
        </div>
        <div class="pricing-page__grid">
          <div class="pricing-card">
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">{{ $t('components.pricing.monthlyPlan') }}</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount">€30</span>
                <span class="pricing-card__period">{{ $t('components.pricing.perMonth') }}</span>
              </div>
            </div>
            <ul class="pricing-card__features">
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Show contact information to patients
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Receive video consultation bookings
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Manage your treatments and pricing
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Apply for clinic positions
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Receive recruitment offers
              </li>
            </ul>
            <NuxtLink to="/dashboard/subscription" class="pricing-card__button pricing-card__button--primary">
              {{ $t('components.pricing.getStarted') }}
            </NuxtLink>
          </div>

          <div class="pricing-card pricing-card--featured">
            <div class="pricing-card__badge">{{ $t('components.pricing.bestValue') }}</div>
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">{{ $t('components.pricing.annualPlan') }}</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount">€300</span>
                <span class="pricing-card__period">{{ $t('components.pricing.perYear') }}</span>
              </div>
              <p class="pricing-card__savings">{{ $t('components.pricing.save') }} €60 {{ $t('components.pricing.perYear') }}</p>
            </div>
            <ul class="pricing-card__features">
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.doctorFeatures.contact') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.doctorFeatures.bookings') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.doctorFeatures.treatments') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.doctorFeatures.apply') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.doctorFeatures.offers') }}
              </li>
            </ul>
            <NuxtLink to="/dashboard/subscription" class="pricing-card__button pricing-card__button--primary">
              {{ $t('components.pricing.getStarted') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Clinic Plans -->
    <section class="pricing-page__section section-primary circalanimat">
      <div class="it-wrapper">
        <div class="pricing-page__container">
          <div class="section-intro">
            <h2 class="section-title text-white">{{ $t('components.pricing.forClinics') }}</h2>
          </div>
          <div class="pricing-page__grid">
            <div class="pricing-card">
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">{{ $t('components.pricing.monthlyPlan') }}</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount">€80</span>
                <span class="pricing-card__period">{{ $t('components.pricing.perMonth') }}</span>
              </div>
            </div>
            <ul class="pricing-card__features">
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Show contact information to patients
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Receive video consultation bookings
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Manage clinic treatments and pricing
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Recruit doctors and send offers
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                Manage multiple doctors
              </li>
            </ul>
            <NuxtLink to="/dashboard/subscription" class="pricing-card__button pricing-card__button--primary">
              {{ $t('components.pricing.getStarted') }}
            </NuxtLink>
      </div>

          <div class="pricing-card pricing-card--featured">
            <div class="pricing-card__badge">{{ $t('components.pricing.bestValue') }}</div>
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">{{ $t('components.pricing.annualPlan') }}</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount">€800</span>
                <span class="pricing-card__period">{{ $t('components.pricing.perYear') }}</span>
              </div>
              <p class="pricing-card__savings">{{ $t('components.pricing.save') }} €160 {{ $t('components.pricing.perYear') }}</p>
            </div>
            <ul class="pricing-card__features">
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.clinicFeatures.contact') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.clinicFeatures.bookings') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.clinicFeatures.treatments') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.clinicFeatures.recruit') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.clinicFeatures.manage') }}
              </li>
            </ul>
            <NuxtLink to="/dashboard/subscription" class="pricing-card__button pricing-card__button--primary">
              {{ $t('components.pricing.getStarted') }}
            </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Agency Plans -->
    <section class="pricing-page__section">
      <div class="pricing-page__container">
        <div class="section-intro">
          <h2 class="section-title">{{ $t('components.pricing.forAgencies') }}</h2>
        </div>
        <div class="pricing-page__grid pricing-page__grid--single">
          <div class="pricing-card pricing-card--custom">
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">{{ $t('components.pricing.customPlan') }}</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount pricing-card__amount--custom">{{ $t('components.pricing.customPrice') }}</span>
              </div>
              <p class="pricing-card__subtitle">{{ $t('components.pricing.customSubtitle') }}</p>
            </div>
            <ul class="pricing-card__features">
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.agencyFeatures.manage') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.agencyFeatures.treatments') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.agencyFeatures.coordination') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.agencyFeatures.scalable') }}
              </li>
              <li class="pricing-card__feature">
                <Icon name="mdi:check-circle" class="pricing-card__check-icon" />
                {{ $t('components.pricing.agencyFeatures.support') }}
              </li>
            </ul>
            <NuxtLink to="/contact" class="pricing-card__button pricing-card__button--primary">
              {{ $t('components.pricing.requestPlan') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Note -->
    <div class="pricing-page__container">
      <div class="pricing-page__note">
        <Icon name="mdi:information-outline" class="pricing-page__note-icon" />
        <div class="pricing-page__note-content">
          <p class="pricing-page__note-text">
            {{ $t('components.pricing.note.text') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

useHead({
  title: `${t('nav.pricing')} - Bulgardocs`,
  meta: [
    {
      name: 'description',
      content: t('components.pricing.description')
    }
  ]
})
</script>

<style lang="scss" scoped>
.pricing-page {
  min-height: 100vh;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 6rem;
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

  &__description {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    color: var(--slate-blue);
    line-height: 1.6;
  }

  &__section {
    padding: 12rem 0;
    position: relative;
    overflow: hidden;
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

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    &--single {
      max-width: 500px;
      grid-template-columns: 1fr;
    }
  }

  &__note {
    background: #ffffff;
    border: 1px solid var(--border-line);
    border-radius: 1.4rem;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    max-width: 800px;
    margin: 6rem auto 0;
    padding: 3rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 20px 80px 0px rgba(104, 117, 141, 0.15);
      transform: translateY(-4px);
    }
  }

  &__note-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    color: var(--primary);
    margin-top: 0.25rem;
  }

  &__note-content {
    flex: 1;
  }

  &__note-text {
    font-size: 1.5rem;
    line-height: 1.6;
    color: var(--slate-blue);
    margin: 0;
  }
}

.pricing-card {
  background: #ffffff;
  border: 1px solid var(--border-line);
  border-radius: 1.4rem;
  position: relative;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 20px 80px 0px rgba(104, 117, 141, 0.15);
    transform: translateY(-4px);
  }

  &--featured {
    border: 2px solid var(--primary);
    box-shadow: 0 10px 15px -3px rgba(19, 88, 216, 0.1);
  }

  &--free {
    border: 2px solid #10b981;
    box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.1);
    background: #ffffff;
  }

  &--custom {
    border: 2px solid var(--primary);
    box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.1);
    background: #ffffff;
  }

  &__badge {
    position: absolute;
    top: -0.75rem;
    right: 1.5rem;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    color: white;
    padding: 0.375rem 1rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
  }

  &__header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }

  &__title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 1.5rem;
  }

  &__price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.5rem;
  }

  &__amount {
    font-size: 3rem;
    font-weight: 700;
    color: var(--secondary);
    line-height: 1;

    &--custom {
      font-size: 2.2rem;
      font-weight: 600;
      color: var(--primary);
    }
  }

  &__period {
    font-size: 1.5rem;
    color: var(--slate-blue);
    font-weight: 400;
  }

  &__savings {
    font-size: 0.875rem;
    color: #10b981;
    font-weight: 500;
    margin-top: 0.5rem;
  }

  &__subtitle {
    font-size: 1.5rem;
    color: var(--slate-blue);
    margin-top: 1rem;
    font-weight: 400;
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem;
    flex: 1;
  }

  &__feature {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
    font-size: 1.5rem;
    color: var(--slate-blue);
    line-height: 1.6;
  }

  &__check-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    color: #10b981;
    margin-top: 0.25rem;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1.6rem 4rem;
    font-size: 1.8rem;
    font-weight: 600;
    border-radius: 0.8rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    text-decoration: none;
    border: none;
    font-family: inherit;
    background: var(--primary);
    color: #ffffff;
    margin-top: auto;

    &:hover {
      background: var(--secondary);
    }
  }
}

@media (max-width: 768px) {
  .pricing-page {
    &__header {
      padding: 8rem 0 4rem;
      margin-bottom: 4rem;
    }

    &__section {
      padding: 4rem 0;
      margin-bottom: 4rem;
    }

    &__grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    &__note {
      padding: 2rem;
      margin-top: 4rem;
    }
  }
}
</style>
