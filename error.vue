<template>
  <div class="error-page">
    <div class="error">
      <div class="error__container">
        <img src="/img/404.png" alt="404 Error" class="error__image" />
        <h1 class="error__title">{{ $t('errorPage.oops') }}</h1>
        <p class="error__text">
          {{
            error?.statusCode === 404 ? $t('errorPage.not_found') : $t('errorPage.something_wrong')
          }}
        </p>
        <button class="error__button" @click="handleError">{{ $t('errorPage.back_home') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { locale } = useI18n();

  const props = defineProps({
    error: Object,
  });

  const handleError = () => {
    // Clear the error and return to home, only include locale if not English
    clearError();
    navigateTo(locale.value === 'en' ? '/' : `/${locale.value}`);
  };
</script>

<style lang="scss">
  .error {
    &__container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      text-align: center;
      background-color: #fff;
    }

    &__image {
      max-width: 100%;
      height: auto;
      margin-bottom: 2.5rem;

      @media (min-width: 768px) {
        max-width: 450px;
      }
    }

    &__title {
      font-size: 2.5rem;
      margin-bottom: 1.25rem;
      color: var(--main-blue);
      font-weight: 700;
      letter-spacing: -0.5px;

      @media (min-width: 768px) {
        font-size: 4rem;
      }
    }

    &__text {
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
      color: var(--main-blue);
      max-width: 80%;
      line-height: 1.6;

      @media (min-width: 768px) {
        font-size: 1.5rem;
        max-width: 600px;
      }
    }

    &__button {
      display: inline-block;
      padding: 1rem 2rem;
      background-color: var(--main-orange);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.125rem;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(0);
      }

      @media (min-width: 768px) {
        padding: 1.25rem 2.5rem;
        font-size: 1.25rem;
      }
    }
  }
</style>
