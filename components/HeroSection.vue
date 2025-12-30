<template>
  <section class="hero section-primary circalanimat">
    <div class="banner-shap it-wrapper">
      <div class="hero__container">
        <div class="hero__content">
          <div class="hero__rating">
            <div class="hero__stars">
              <Icon v-for="i in 5" :key="i" name="material-symbols:star-rounded" class="hero__star" />
            </div>
            <span class="hero__rating-text">{{ $t('components.heroSection.trustedByCount') }}</span>
          </div>
          
          <h1 class="hero__title">{{ $t("components.heroSection.title") }}</h1>
          <p class="hero__subtitle">
            {{ $t("components.heroSection.subtitle") }}
          </p>

          <div class="hero__actions">
            <BaseButton
              tag="NuxtLink"
              :link-path="localePath('/search')"
              variant="white"
              :button-text="$t('components.heroSection.cta')"
              show-arrow
            />
          </div>

          <div class="hero__partners">
            <span class="hero__partners-label">{{ $t('components.heroSection.trustedBy') }}</span>
          </div>
        </div>

        <div class="hero__form-wrapper">
          <div class="hero__form">
            <h3 class="hero__form-title">{{ $t('components.heroSection.findTreatment') }}</h3>
            <form @submit.prevent="handleSearch" class="hero__search-fields">
              <div class="hero__field">
                <label>{{ $t('components.heroSection.searchLabel') }}</label>
                <div class="hero__input-wrapper">
                  <Icon name="material-symbols:search-rounded" class="hero__input-icon" />
                  <input 
                    v-model="searchQuery"
                    type="text" 
                    :placeholder="$t('search.placeholder')" 
                  />
                </div>
              </div>
              <div class="hero__field">
                <label>{{ $t('components.heroSection.locationLabel') }}</label>
                <div class="hero__input-wrapper">
                  <Icon name="material-symbols:location-on-rounded" class="hero__input-icon" />
                  <input 
                    v-model="searchLocation"
                    type="text" 
                    :placeholder="$t('search.location')" 
                  />
                </div>
              </div>
              <BaseButton
                variant="accent"
                :button-text="$t('search.button') || 'Search Now'"
                class="hero__submit"
                type="submit"
              />
            </form>
            <p class="hero__form-footer">
              {{ $t('components.heroSection.termsAcknowledge') }} <a href="#">{{ $t('nav.terms') }}</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '~/components/BaseButton.vue'

const router = useRouter()
const localePath = useLocalePath()
const searchQuery = ref('')
const searchLocation = ref('')

const handleSearch = () => {
  const queryParams: any = {}
  
  if (searchQuery.value) {
    // Set both search and treatment so treatments can be found
    queryParams.search = searchQuery.value
    queryParams.treatment = searchQuery.value
  }
  
  if (searchLocation.value) {
    // Try to determine if it's a city or country
    queryParams.city = searchLocation.value
    queryParams.country = searchLocation.value
  }
  
  router.push({
    path: '/search',
    query: queryParams
  })
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 10rem 2rem 12rem;
  overflow: hidden;
  min-height: 85vh;
  display: flex;

  @media (min-width: 768px) {
    padding: 12rem 2rem 15rem;
  }
  align-items: center;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    position: relative;
    z-index: 2;
    align-items: center;

    @media (min-width: 480px) {
      padding: 0 2rem;
      gap: 5rem;
    }

    @media (min-width: 768px) {
      gap: 6rem;
    }

    @media (min-width: 992px) {
      flex-direction: row;
      align-items: center;
      gap: 8rem;
      padding: 0;
      align-items: center;
    }
  }

  &__content {
    flex: 1;
    text-align: left;
    position: relative;
    z-index: 2;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__stars {
    display: flex;
    gap: 0.2rem;
  }

  &__star {
    color: var(--accent);
    width: 1.8rem;
    height: 1.8rem;
  }

  &__rating-text {
    font-size: 1.4rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  &__title {
    margin-bottom: 2.5rem;
    max-width: 550px;
    color: #ffffff;
    font-size: clamp(2.8rem, 5vw, 4.8rem);
    line-height: 1.2;
  }

  &__subtitle {
    margin-bottom: 4rem;
    max-width: 480px;
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
    line-height: 1.6;
  }

  &__partners {
    margin-top: 6rem;
    
    &-label {
      display: block;
      font-size: 1.4rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  &__form-wrapper {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 480px) {
      max-width: 450px;
    }

    @media (min-width: 992px) {
      flex: 0.8;
      max-width: 450px;
      justify-content: flex-start;
    }
  }

  &__form {
    background: #ffffff;
    padding: 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 100%;
    margin: 0 auto;

    @media (min-width: 480px) {
      padding: 2.5rem;
      border-radius: 2rem;
      max-width: 450px;
    }

    @media (min-width: 768px) {
      padding: 3.5rem;
    }
    
    &-title {
      color: var(--secondary);
      font-size: clamp(2rem, 4vw, 2.4rem);
      font-weight: 700;
      margin-bottom: 2.5rem;
    }

    &-footer {
      margin-top: 2rem;
      font-size: 1.3rem;
      color: var(--text-gray);
      
      a {
        color: var(--primary);
        text-decoration: underline;
      }
    }
  }

  &__search-fields {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;

    label {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--secondary);

      @media (min-width: 480px) {
        font-size: 1.4rem;
      }
    }
  }

  &__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    input {
      width: 100%;
      padding: 1rem 1.2rem 1rem 3.5rem;
      border: 1px solid var(--border-line);
      border-radius: 0.8rem;
      font-size: 1.4rem;
      color: var(--text-dark);
      transition: all 0.3s ease;
      box-sizing: border-box;

      @media (min-width: 480px) {
        padding: 1.2rem 1.5rem 1.2rem 4rem;
        font-size: 1.5rem;
      }

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(19, 88, 216, 0.1);
      }
    }
  }

  &__input-icon {
    position: absolute;
    left: 1rem;
    width: 1.8rem;
    height: 1.8rem;
    color: var(--primary);
    z-index: 1;

    @media (min-width: 480px) {
      left: 1.2rem;
      width: 2rem;
      height: 2rem;
    }
  }

  &__submit {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>


