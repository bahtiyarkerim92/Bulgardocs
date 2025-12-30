<template>
  <section class="feature-section" :class="{ 'feature-section--reverse': reverse }">
    <div class="feature-section__container">
      <div class="feature-section__image-wrapper">
        <img :src="image" :alt="title" class="feature-section__image" />
      </div>

      <div class="feature-section__content">
        <h2 class="feature-section__title">{{ title }}</h2>
        <p class="feature-section__description">{{ description }}</p>

        <ul class="feature-section__points">
          <li v-for="(point, index) in points" :key="index" class="feature-section__point">
            <span class="feature-section__point-icon">
              <Icon name="material-symbols:check-circle-rounded" />
            </span>
            <span class="feature-section__point-text">{{ point }}</span>
          </li>
        </ul>

        <button v-if="buttonText" class="feature-section__button">
          {{ buttonText }}
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="feature-section__button-icon"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    title: string;
    description: string;
    image: string;
    points: string[];
    buttonText?: string;
    reverse?: boolean;
  }>();
</script>

<style lang="scss" scoped>
  .feature-section {
    padding: 6rem 2rem;
    background: linear-gradient(to bottom, var(--white) 0%, var(--light-white) 100%);
    overflow: hidden;

    &__container {
      max-width: $breakpoint_container;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 4rem;

      @media (min-width: $breakpoint_small) {
        flex-direction: row;
        align-items: center;
        gap: 6rem;
      }
    }

    &--reverse {
      .feature-section__container {
        @media (min-width: $breakpoint_small) {
          flex-direction: row-reverse;
        }
      }
    }

    &__image-wrapper {
      flex: 1;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 120%;
        height: 120%;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        border-radius: 50%;
        opacity: 0.1;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &__image {
      width: 100%;
      height: auto;
      border-radius: $button-border-large;

      transform: translateY(0);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-10px);
      }
    }

    &__content {
      flex: 1;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.6s ease forwards;
    }

    &__title {
      font-size: $font-large;
      font-weight: $font-weight-boldest;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: $line-height-small;

      @media (min-width: $breakpoint_small) {
        font-size: $font-very-large;
      }
    }

    &__description {
      font-size: $font-base-small;
      line-height: $line-height-text;
      color: var(--text-grey);
      margin-bottom: 2rem;

      @media (min-width: $breakpoint_small) {
        font-size: $font-small;
      }
    }

    &__points {
      list-style: none;
      padding: 0;
      margin: 0 0 3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__point {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 0.5rem;
      border-radius: $border-default;
      transition:
        transform 0.3s ease,
        background-color 0.3s ease;

      &:hover {
        transform: translateX(10px);
        background-color: rgba(0, 0, 0, 0.02);
      }
    }

    &__point-icon {
      flex-shrink: 0;
      color: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      margin-top: 0.2rem;

      :deep(svg) {
        width: 2.2rem;
        height: 2.2rem;
      }
    }

    &__point:hover &__point-icon {
      transform: scale(1.1);
      color: #2563eb;
    }

    &__point-text {
      font-size: $font-base-small;
      line-height: $line-height-text;
      color: var(--text-grey);
      padding-top: 0.3rem;

      @media (min-width: $breakpoint_small) {
        font-size: $font-small;
      }
    }

    &__button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      font-size: $font-small;
      font-weight: $extra-bold;
      color: var(--white);
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      border: none;
      border-radius: $button-border-medium;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(37, 99, 235, 0.4);
        background: linear-gradient(135deg, #1e40af 0%, #6d28d9 100%);

        .feature-section__button-icon {
          transform: translateX(5px);
        }
      }
    }

    &__button-icon {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 0.3s ease;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
