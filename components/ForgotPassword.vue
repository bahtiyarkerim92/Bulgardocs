<template>
  <div class="forgot-password-wrapper">
    <div class="forgot-password-form" ref="forgotPasswordFormRef">
      <MessageModal
        :is-visible="isMessageVisible"
        :title="messageTitle"
        :message="messageContent"
        :frame-type="frameType"
        @confirm="handleMessageConfirm"
      />
      
      <h1>{{ $t('forgotPassword.title') }}</h1>
      <form @submit.prevent="handleForgotPassword">
        <!-- Email Field -->
        <div :class="{ 'forgot-password-form__field--error': errors.email }">
          <label class="forgot-password-form__label" for="email">
            {{ errors.email ? errors.email : $t('forgotPassword.email') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            :placeholder="$t('forgotPassword.emailPlaceholder')"
            @blur="validateField('email')"
            @input="validateFieldOnError('email')"
          >
        </div>

        <!-- Submit Button -->
        <div class="forgot-password-form__button-container">
          <button :disabled="isSubmitting" type="submit">
            <div v-if="isSubmitting" class="forgot-password-form__loading-spinner" />
            <span v-else>{{ $t('forgotPassword.sendResetLink') }}</span>
          </button>

          <button
            type="button"
            class="forgot-password-form__cancel"
            @click.prevent="$emit('switch-to-login')"
          >
            <span>{{ $t('forgotPassword.cancel') }}</span>
          </button>
        </div>

        <!-- Message Display -->
        <div
          v-if="message"
          class="forgot-password-form__message"
          :class="{ 'forgot-password-form__message--success': emailSendSuccess }"
        >
          {{ message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { z } from 'zod';
  import { useI18n } from 'vue-i18n';
  import { useModalStore } from '~/stores/modalStore';

  defineEmits(['switch-to-login']);

  const { t, locale } = useI18n();
  const modalStore = useModalStore();
  const email = ref('');
  const message = ref('');
  const errors = ref<Record<string, string | null>>({
    email: null,
  });
  const isSubmitting = ref(false);
  const emailSendSuccess = ref(false);

  // Add modal state
  const isMessageVisible = ref(false);
  const messageTitle = ref('');
  const messageContent = ref('');
  const frameType = ref<'success' | 'warning'>('success');

  const forgotPasswordFormRef = ref<HTMLElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (forgotPasswordFormRef.value && !forgotPasswordFormRef.value.contains(event.target as Node)) {
      modalStore.hideModal();
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  const showTimedErrorMessage = (message: string) => {
    messageContent.value = message;
    frameType.value = 'warning';
    isMessageVisible.value = true;
    
    
  };

  const handleMessageConfirm = () => {
    isMessageVisible.value = false;
  };

  const showSuccessMessage = (title: string, message: string) => {
    messageTitle.value = title;
    messageContent.value = message;
    frameType.value = 'success';
    isMessageVisible.value = true;
  };

  const showErrorMessage = (message: string) => {
    messageContent.value = message;
    frameType.value = 'warning';
    isMessageVisible.value = true;
  };

  const fieldSchemas = {
    email: z.string().email(t('forgotPassword.validation.emailInvalid')),
  };

  const validateField = (fieldName: keyof typeof fieldSchemas) => {
    const result = fieldSchemas[fieldName].safeParse(email.value);
    if (!result.success) {
      errors.value[fieldName] = result.error.errors[0].message;
    } else {
      errors.value[fieldName] = null;
    }
  };

  const validateFieldOnError = (fieldName: keyof typeof fieldSchemas) => {
    if (errors.value[fieldName]) {
      validateField(fieldName);
    }
  };

  const handleForgotPassword = async () => {
    message.value = ''; // Reset message
    
    if (!email.value) {
      errors.value.email = t('forgotPassword.validation.emailRequired');
      return;
    }
    if (errors.value.email) {
      return;
    }

    try {
      isSubmitting.value = true;
      await $fetch<{ message: string; retryAfter?: number }>('/auth/forgot-password', {
        method: 'POST',
        body: {
          email: email.value,
          locale: locale.value
        }
      });

      // Success case
      showSuccessMessage(
        t('forgotPassword.title'),
        t('forgotPassword.messages.success')
      );
      emailSendSuccess.value = true;
      email.value = ''; // Clear the email field on success
      
    } catch (error) {
      const fetchError = error as { data?: { message?: string; retryAfter?: number }; status?: number };
      console.error(fetchError);

      // Case 1: User doesn't exist
      if (fetchError.status === 404) {
        emailSendSuccess.value = false;
        errors.value.email = t('forgotPassword.validation.userNotFound');
        return;
      }

      // Case 2: Rate limiting or already sent
      if (fetchError.status === 400) {
        const translationKey = fetchError.data?.retryAfter && fetchError.data.retryAfter < 60 
          ? 'forgotPassword.errors.tooManyRequests' 
          : 'forgotPassword.errors.emailAlreadySent';
          
        showTimedErrorMessage(
          t(translationKey, { 
            time: fetchError.data?.retryAfter && fetchError.data.retryAfter < 60 
              ? t('forgotPassword.time.seconds')
              : t('forgotPassword.time.minutes')
          })
        );
        return;
      }

      // Case 3: Other errors
      showErrorMessage(t('forgotPassword.messages.error'));
      emailSendSuccess.value = false;
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

<style scoped lang="scss">
  .forgot-password-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 45rem);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .forgot-password-form {
    position: relative;
    max-width: 55rem;
    width: 95%;
    margin: 8rem 1.5rem;
    padding: 1rem;
    border: 0.2rem solid var(--main-blue);
    border-radius: 0.5rem;
    background-color: var(--white-smoke);
    @media (min-width: $breakpoint_verysmall) {
      padding: 2rem;
      margin-inline: auto;
    }

    h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 3rem;
      font-weight: 500;
      @media (min-width: $breakpoint-small) {
        font-size: 2.5rem;
      }
    }

    &__label {
      font-size: 1.2rem;
      @media (min-width: $breakpoint-small) {
        font-size: 1.4rem;
      }
    }

    &__button-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      @media(min-width: $breakpoint-verysmall) {
      flex-direction: row-reverse;

      }
    }

    &__field--error label {
      color: var(--warning);
    }

    &__field--error input::placeholder {
      color: var(--warning);
    }

    input,
    button {
      display: block;
      width: 15rem;
      margin-bottom: 1rem;
      padding: 1rem;
      border: 0.1rem solid var(--border);
      border-radius: 0.5rem;
      font-size: 1.4rem;
      
      @media (min-width: $breakpoint-small) {
        font-size: 1.6rem;
      }
      @media (min-width: $breakpoint-medium) {
        padding: 1rem;
      }

      &::placeholder {
        font-size: 1.6rem;
        padding-left: 0.5rem;
        color: var(--text-grey);
        font-weight: 300;
      }

      &:focus,
      &:hover {
        outline: none;
        border-color: var(--main-blue);
        box-shadow: 0 0 0.5rem rgba(2, 85, 174, 0.5);
        transition: all 0.3s;
      }
    }
    & input {
      width: 100%;
    }

    button {
      background-color: var(--main-blue);
      color: white;
      border: none;
      cursor: pointer;
 

      & span {
        font-weight: 500;
        font-size: 1.5rem;
        
      }
      &:first-child {
        width: max-content;
        width: -webkit-fill-available;
        width: -moz-available;
        width: auto;
      }
      &:last-child {
        background-color: var(--placeholder);
        color: var(--dark-text);
        width: 100%;
        @media(min-width: $breakpoint-verysmall) {
          width: auto;
        }
        
      }

      &:disabled {
        background-color: #ccc;
      }
    }
    &__cancel {
      color: var(dark-text);
    }

    &__loading-spinner {
      display: inline-block;
      width: 1.7rem;
      height: 1.7rem;
      border: 0.2rem solid var(--main-blue);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 1s ease infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    &__message {
      color: var(--main-orange-dark);
      text-align: center;
      margin-top: 1rem;
      &--success {
        color: var(--exist-green);
      }
    }

    &__field--error {
      input {
        color: var(--warning);
        &:focus,
        &:focus-visible,
        &:hover,
        &:active,
        &::placeholder {
          border-color: var(--warning);
          color: var(--warning);
        }
      }
    }
  }
</style>
