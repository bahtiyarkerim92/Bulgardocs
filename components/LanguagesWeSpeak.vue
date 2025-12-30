<template>
  <section class="languages" ref="sectionRef">
    <div class="languages__container">
      <div class="languages__header" :class="{ 'is-visible': isVisible }">
        <h2 class="languages__title">{{ title }}</h2>
        <p class="languages__description">{{ description }}</p>
      </div>

      <div class="languages__grid">
        <div
          v-for="(language, index) in languages"
          :key="language.code"
          class="languages__card"
          :class="{ 'is-visible': isVisible }"
          :style="{ '--animation-order': index }"
        >
          <div class="languages__flag-wrapper">
            <img :src="language.icon" :alt="`${language.code} flag`" class="languages__flag" />
            <div class="languages__flag-glow"></div>
          </div>
          <h3 class="languages__language">{{ language.code }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  interface Language {
    code: string;
    icon: string;
  }

  interface Props {
    title: string;
    description: string;
    languages: Language[];
  }

  defineProps<Props>();

  const isVisible = ref(false);
  const sectionRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.value) {
      observer.observe(sectionRef.value);
    }
  });
</script>

<style lang="scss" scoped>
  .languages {
    padding: 6rem 2rem;
    background: linear-gradient(to bottom, var(--white) 0%, var(--light-white) 100%);
    overflow: hidden;

    &__container {
      max-width: $breakpoint_container;
      margin: 0 auto;
    }

    &__header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 4rem;
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;

      &.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &__title {
      font-size: $font-large;
      font-weight: $font-weight-boldest;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, var(--main-blue) 0%, var(--main-orange) 100%);
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
      margin: 0 auto;
      max-width: 700px;

      @media (min-width: $breakpoint_small) {
        font-size: $font-small;
      }
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      padding: 1rem;

      @media (min-width: $breakpoint_small) {
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        padding: 2rem;
      }

      @media (min-width: $breakpoint_medium) {
        grid-template-columns: repeat(5, 1fr);
      }
    }

    &__card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

      &.is-visible {
        opacity: 1;
        transform: translateY(0);
        transition-delay: calc(var(--animation-order) * 0.1s);
      }
    }

    &__flag-wrapper {
      position: relative;
      width: 6rem;
      height: 6rem;
      border-radius: 1.5rem;
      overflow: hidden;
      transition: transform 0.3s ease;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--main-blue) 0%, var(--main-orange) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-5px);

        &::before {
          opacity: 0.1;
        }

        .languages__flag-glow {
          opacity: 1;
        }
      }
    }

    &__flag {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1.5rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    &__flag-glow {
      position: absolute;
      inset: -20%;
      background: radial-gradient(
        circle at center,
        rgba(var(--primary-rgb), 0.1) 0%,
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    &__language {
      font-size: $font-medium;
      font-weight: $extra-bold;
      color: var(--main-blue);
      margin: 0;
      text-align: center;
    }
  }
</style>
