<template>
  <section class="what-we-do bg-alice-blue">
    <div class="what-we-do__container">
      <div class="what-we-do__layout">
        <div class="what-we-do__content">
          <h2 class="what-we-do__title">{{ $t('components.whatWeDo.title') }}</h2>
          <p class="what-we-do__description">
            {{ $t('components.whatWeDo.description') }}
          </p>
          <div class="what-we-do__features">
            <div class="what-we-do__feature">
              <Icon name="material-symbols:check-circle-rounded" class="what-we-do__feature-icon" />
              <span>Search & Connect with Doctors & Clinics</span>
            </div>
            <div class="what-we-do__feature">
              <Icon name="material-symbols:check-circle-rounded" class="what-we-do__feature-icon" />
              <span>Recruitment Network for Doctors & Clinics</span>
            </div>
            <div class="what-we-do__feature">
              <Icon name="material-symbols:check-circle-rounded" class="what-we-do__feature-icon" />
              <span>Agency Management Tools</span>
            </div>
          </div>
          <div class="what-we-do__cta">
            <BaseButton
              variant="primary"
              button-text="Get Started"
              show-arrow
            />
          </div>
        </div>

        <div class="what-we-do__grid">
          <!-- Search Card -->
          <div class="what-we-do__card card-apple">
            <div class="what-we-do__card-icon-wrapper">
              <Icon name="mdi:magnify" style="width: 5rem; height: 5rem; color: var(--primary);" />
            </div>
            <h3 class="what-we-do__card-title">
              {{ $t('components.whatWeDo.cards.search.title') }}
            </h3>
            <p class="what-we-do__card-text">
              {{ $t('components.whatWeDo.cards.search.text') }}
            </p>
            <NuxtLink to="/search" class="what-we-do__card-link">Learn More →</NuxtLink>
          </div>

          <!-- Connect Card -->
          <div class="what-we-do__card card-apple">
            <div class="what-we-do__card-icon-wrapper">
              <Icon name="mdi:video" style="width: 5rem; height: 5rem; color: var(--primary);" />
            </div>
            <h3 class="what-we-do__card-title">
              {{ $t('components.whatWeDo.cards.connect.title') }}
            </h3>
            <p class="what-we-do__card-text">
              {{ $t('components.whatWeDo.cards.connect.text') }}
            </p>
            <NuxtLink to="/search" class="what-we-do__card-link">Learn More →</NuxtLink>
          </div>

          <!-- Recruit Card -->
          <div class="what-we-do__card card-apple">
            <div class="what-we-do__card-icon-wrapper">
              <Icon name="mdi:briefcase" style="width: 5rem; height: 5rem; color: var(--primary);" />
            </div>
            <h3 class="what-we-do__card-title">
              {{ $t('components.whatWeDo.cards.recruit.title') }}
            </h3>
            <p class="what-we-do__card-text">
              {{ $t('components.whatWeDo.cards.recruit.text') }}
            </p>
            <NuxtLink to="/services" class="what-we-do__card-link">Learn More →</NuxtLink>
          </div>

          <!-- Manage Card -->
          <div class="what-we-do__card card-apple">
            <div class="what-we-do__card-icon-wrapper">
              <Icon name="mdi:office-building" style="width: 5rem; height: 5rem; color: var(--primary);" />
            </div>
            <h3 class="what-we-do__card-title">
              {{ $t('components.whatWeDo.cards.manage.title') }}
            </h3>
            <p class="what-we-do__card-text">
              {{ $t('components.whatWeDo.cards.manage.text') }}
            </p>
            <NuxtLink to="/services" class="what-we-do__card-link">Learn More →</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import BaseButton from '~/components/BaseButton.vue'
</script>

<style lang="scss" scoped>
.what-we-do {
  padding: 12rem 2rem;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6rem;
    align-items: center;

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1.2fr;
    }
  }

  &__content {
    text-align: left;
  }

  &__title {
    margin-bottom: 2.5rem;
    max-width: 450px;
  }

  &__description {
    margin-bottom: 3rem;
    max-width: 450px;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--slate-blue);

    &-icon {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--primary);
      opacity: 0.2;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    background: #ffffff;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    height: 100%;
    box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.06);

    &:hover {
      .what-we-do__card-link {
        color: var(--primary-dark);
        transform: translateX(5px);
      }
    }
  }

  &__card-icon-wrapper {
    width: 5rem;
    height: 5rem;
    margin-bottom: 2.5rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__card-title {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }

  &__card-text {
    font-size: 1.4rem;
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
    transition: all 0.3s ease;
  }
}
</style>


