<template>
  <section class="healthcare bg-alice-blue">
    <div class="healthcare__container">
      <div class="healthcare__content">
        <h2 class="healthcare__title">{{ $t('components.healthcareFeatures.title') }}</h2>
        <p class="healthcare__description">
          {{ $t('components.healthcareFeatures.description') }}
        </p>
        <div class="healthcare__features-list">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="healthcare__feature-item"
          >
            <div class="healthcare__check-icon">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12.5" r="12.5" :style="{ fill: `${primaryColor}20` }" />
                <g clip-path="url(#clip0_7_836)">
                  <path
                    d="M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z"
                    :style="{ fill: primaryColor }"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7_836">
                    <rect width="11" height="11" fill="white" transform="translate(7 7)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span class="healthcare__feature-text">{{ feature }}</span>
          </div>
        </div>
        <div class="healthcare__cta">
          <NuxtLink to="/search" class="btn-apple btn-apple--primary">
            Get Started
            <svg class="healthcare__arrow-icon" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6H15M15 6L10 1M15 6L10 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
      <div class="healthcare__cards">
        <div 
          v-for="(feature, index) in featureCards" 
          :key="index"
          class="healthcare__card card-apple"
        >
          <div class="healthcare__card-icon">
            <Icon :name="feature.icon" />
          </div>
          <h3 class="healthcare__card-title">
            {{ feature.title }}
          </h3>
          <p class="healthcare__card-text">
            {{ feature.text }}
          </p>
          <NuxtLink to="/search" class="healthcare__card-link">
            Learn More
            <svg class="healthcare__card-arrow" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6H15M15 6L10 1M15 6L10 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const { t } = useI18n()

const primaryColor = ref('#1358D8')

onMounted(() => {
  // Get primary color from CSS variables
  if (typeof window !== 'undefined') {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    primaryColor.value = computedStyle.getPropertyValue('--primary').trim() || '#1358D8'
  }
})

const features = computed(() => [
  'Search & Connect with Doctors & Clinics',
  'Recruitment Network for Doctors & Clinics',
  'Agency Management Tools'
])

const featureCards = computed(() => [
  {
    icon: 'material-symbols:video-camera-front-rounded',
    title: t('components.healthcareFeatures.features.experts.title'),
    text: t('components.healthcareFeatures.features.experts.text')
  },
  {
    icon: 'material-symbols:health-and-safety-rounded',
    title: t('components.healthcareFeatures.features.services.title'),
    text: t('components.healthcareFeatures.features.services.text')
  },
  {
    icon: 'material-symbols:location-on-rounded',
    title: t('components.healthcareFeatures.features.care.title'),
    text: t('components.healthcareFeatures.features.care.text')
  }
])
</script>

<style lang="scss" scoped>
.healthcare {
  padding: 12rem 2rem;
  overflow: hidden;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 6rem;
    align-items: center;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__content {
    text-align: left;
  }

  &__title {
    margin-bottom: 2rem;
    max-width: 450px;
  }

  &__description {
    font-size: 1.6rem;
    line-height: 1.6;
    color: var(--slate-blue);
    margin-bottom: 3rem;
    max-width: 450px;
  }

  &__features-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  &__feature-item {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  &__check-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__feature-text {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--slate-blue);
  }

  &__cta {
    margin-top: 3rem;
  }

  &__arrow-icon {
    width: 1.6rem;
    height: 1.2rem;
    margin-left: 0.8rem;
    transition: transform 0.3s ease;
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    height: 100%;
    transition: all 0.3s ease;

    &:hover {
      .healthcare__card-link {
        color: var(--primary);
        transform: translateX(5px);
      }
    }
  }

  &__card-icon {
    width: 5rem;
    height: 5rem;
    margin-bottom: 2.5rem;
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg) {
      width: 5rem;
      height: 5rem;
    }
  }

  &__card-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  &__card-text {
    font-size: 1.4rem;
    line-height: 1.6;
    color: var(--slate-blue);
    margin-bottom: 2.5rem;
    flex: 1;
  }

  &__card-link {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    transition: all 0.3s ease;
  }

  &__card-arrow {
    width: 1.6rem;
    height: 1.2rem;
    transition: transform 0.3s ease;
  }

  &__card:hover &__card-arrow {
    transform: translateX(5px);
  }
}
</style>