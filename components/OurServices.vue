<template>
  <section class="our-services" ref="sectionRef">
    <div class="our-services__container">
      <div class="our-services__header" :class="{ 'is-visible': isVisible }">
        <h2 class="our-services__title">{{ $t('components.ourServices.title') }}</h2>
        <p class="our-services__description">{{ $t('components.ourServices.description') }}</p>
      </div>

      <div class="our-services__grid">
        <div
          v-for="(entry, index) in Object.entries(countries)"
          :key="entry[0]"
          class="our-services__card card-apple"
          :class="{ 'is-visible': isVisible }"
          :style="{ '--animation-order': index }"
        >
          <div class="our-services__card-header">
            <img
              :src="entry[1].icon"
              :alt="$t('components.ourServices.countries.' + entry[0] + '.name')"
              class="our-services__card-flag"
            />
            <h3 class="our-services__card-title">
              {{ $t('components.ourServices.countries.' + entry[0] + '.name') }}
            </h3>
          </div>
          <p class="our-services__card-info">
            {{ $t('components.ourServices.countries.' + entry[0] + '.clinicInfo') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  interface Country {
    icon: string;
  }

  interface Props {
    countries: Record<string, Country>;
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
  .our-services {
    padding: 12rem 2rem;
    background: var(--alice-blue);
    overflow: hidden;

    &__container {
      max-width: 1200px;
      margin: 0 auto;
    }

    &__header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 6rem;
    }

    &__title {
      margin-bottom: 2.5rem;
    }

    &__description {
      max-width: 600px;
      margin: 0 auto;
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
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

      &:hover {
        transform: translateY(-5px);
      }
    }

    &__card-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2.5rem;
    }

    &__card-flag {
      width: 5rem;
      height: 5rem;
      object-fit: contain;
      border-radius: 1.2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &__card-title {
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--secondary);
      margin: 0;
    }

    &__card-info {
      font-size: 1.5rem;
      line-height: 1.6;
      color: var(--slate-blue);
      margin: 0;
    }
  }
</style>

