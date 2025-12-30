<template>
  <div class="homepage">
    <HeroSection />
    
    <!-- Popular Items Section -->
    <PopularItems />

    <!-- Process Section - Simple Steps -->
    <section class="process section-primary circalanimat">
      <div class="it-wrapper">
        <div class="container">
          <div class="section-intro">
            <h2 class="section-title text-white">{{ $t('components.whatWeDo.title') }}</h2>
            <p class="section-description text-white opacity-80">
              {{ $t('components.whatWeDo.description') }}
            </p>
          </div>
          <div class="steps">
            <div class="step card-apple">
              <div class="step-number">01</div>
              <div class="step-content">
                <h3 class="step-title">{{ $t('components.whatWeDo.cards.search.title') }}</h3>
                <p class="step-text">{{ $t('components.whatWeDo.cards.search.text') }}</p>
              </div>
            </div>
            <div class="step card-apple">
              <div class="step-number">02</div>
              <div class="step-content">
                <h3 class="step-title">{{ $t('components.whatWeDo.cards.connect.title') }}</h3>
                <p class="step-text">{{ $t('components.whatWeDo.cards.connect.text') }}</p>
              </div>
            </div>
            <div class="step card-apple">
              <div class="step-number">03</div>
              <div class="step-content">
                <h3 class="step-title">{{ $t('components.whatWeDo.cards.recruit.title') }}</h3>
                <p class="step-text">{{ $t('components.whatWeDo.cards.recruit.text') }}</p>
              </div>
            </div>
            <div class="step card-apple">
              <div class="step-number">04</div>
              <div class="step-content">
                <h3 class="step-title">{{ $t('components.whatWeDo.cards.manage.title') }}</h3>
                <p class="step-text">{{ $t('components.whatWeDo.cards.manage.text') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section - Minimal -->
    <section class="cta bg-alice-blue">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">{{ $t('components.healthcareFeatures.tagline.highlight') }}</h2>
          <p class="cta-text">{{ $t('components.healthcareFeatures.tagline.text') }}</p>
          <NuxtLink to="/search" class="btn-apple btn-apple--primary btn-large">
            {{ $t('button.startForFree') }}
          </NuxtLink>
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
  title: `Bulgardocs - ${t('components.heroSection.title')}`,
  meta: [
    {
      name: 'description',
      content: t('components.heroSection.subtitle')
    }
  ]
})
</script>

<style lang="scss" scoped>
.homepage {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-intro {
  text-align: center;
  margin-bottom: 6rem;
  padding: 0 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
}


// Process Section
.process {
  padding: 12rem 0;
  position: relative;
  overflow: hidden;

  .section-intro {
    padding: 0 4rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 6rem;
    position: relative;
    z-index: 2;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 2rem;
    word-wrap: break-word;
    hyphens: auto;
  }

  .section-description {
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    word-wrap: break-word;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
    max-width: 800px;
    margin: 0 auto;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  .step {
    background: #ffffff;
    padding: 4rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    height: 100%;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-10px);
      
      .step-number {
        color: var(--primary);
      }
    }
  }

  .step-number {
    font-size: 4rem;
    font-weight: 800;
    color: var(--border-line);
    line-height: 1;
    margin-bottom: 2.5rem;
    transition: all 0.3s ease;
  }

  .step-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 1.5rem;
  }

  .step-text {
    font-size: 1.5rem;
    color: var(--slate-blue);
    line-height: 1.6;
  }
}

// CTA Section
.cta {
  padding: 12rem 2rem;
  text-align: center;

  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-title {
    margin-bottom: 2rem;
  }

  .cta-text {
    font-size: 1.8rem;
    color: var(--slate-blue);
    margin-bottom: 4rem;
  }
}

.btn-large {
  padding: 1.6rem 4rem;
  font-size: 1.8rem;
}
</style>

