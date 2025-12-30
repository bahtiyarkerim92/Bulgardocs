<template>
  <div class="contact-form">
    <div class="contact-form__content">
      <form @submit.prevent="handleSubmit" class="contact-form__form">
        <div class="contact-form__field">
          <label for="name" class="contact-form__label">{{ t('contact.form.name.label') }}</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            :placeholder="t('contact.form.name.placeholder')"
            class="contact-form__input"
            :class="{ 'contact-form__input--error': errors.name }"
          />
          <span v-if="errors.name" class="contact-form__error">{{ errors.name }}</span>
        </div>

        <div class="contact-form__field">
          <label for="email" class="contact-form__label">{{ t('contact.form.email.label') }}</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            :placeholder="t('contact.form.email.placeholder')"
            class="contact-form__input"
            :class="{ 'contact-form__input--error': errors.email }"
          />
          <span v-if="errors.email" class="contact-form__error">{{ errors.email }}</span>
        </div>

        <div class="contact-form__field">
          <label for="message" class="contact-form__label">
            {{ t('contact.form.message.label') }}
          </label>
          <textarea
            id="message"
            v-model="formData.message"
            :placeholder="t('contact.form.message.placeholder')"
            class="contact-form__textarea"
            :class="{ 'contact-form__textarea--error': errors.message }"
            rows="5"
          ></textarea>
          <span v-if="errors.message" class="contact-form__error">{{ errors.message }}</span>
        </div>

        <button type="submit" class="contact-form__submit" :disabled="isSubmitting">
          {{ t('contact.form.submit') }}
        </button>
      </form>

      <div
        v-if="submitStatus"
        :class="['contact-form__status', `contact-form__status--${submitStatus.type}`]"
      >
        {{ submitStatus.message }}
      </div>
    </div>

    <div class="contact-form__info">
      <h3 class="contact-form__info-title">{{ t('contact.contactInfo.title') }}</h3>

      <div class="contact-form__info-section">
        <h4 class="contact-form__info-subtitle">{{ t('contact.contactInfo.address.title') }}</h4>
        <p>{{ t('contact.contactInfo.address.line1') }}</p>
        <p>{{ t('contact.contactInfo.address.line2') }}</p>
      </div>

      <div class="contact-form__info-section">
        <h4 class="contact-form__info-subtitle">{{ t('contact.contactInfo.email.title') }}</h4>
        <p>info@bulgardocs.com</p>
      </div>

      <div class="contact-form__info-section">
        <h4 class="contact-form__info-subtitle">{{ t('contact.contactInfo.hours.title') }}</h4>
        <p>{{ t('contact.contactInfo.hours.schedule') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { z } from 'zod';

  const { t } = useI18n();

  const contactSchema = z.object({
    name: z.string().min(2, t('contact.validation.name.minLength')),
    email: z.string().email(t('contact.validation.email.invalid')),
    message: z.string().min(10, t('contact.validation.message.minLength')),
  });

  const formData = reactive({
    name: '',
    email: '',
    message: '',
  });

  const errors = reactive({
    name: '',
    email: '',
    message: '',
  });

  const isSubmitting = ref(false);
  const submitStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null);

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      Object.keys(errors).forEach((key) => (errors[key as keyof typeof errors] = ''));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof typeof errors] = err.message;
          }
        });
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    submitStatus.value = null;
    if (!validateForm()) return;

    isSubmitting.value = true;
    try {
      // Here you would typically make an API call to submit the form
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      submitStatus.value = {
        type: 'success',
        message: t('contact.success'),
      };
      // Reset form after successful submission
      Object.keys(formData).forEach((key) => (formData[key as keyof typeof formData] = ''));
    } catch (error) {
      submitStatus.value = {
        type: 'error',
        message: t('contact.error'),
      };
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

<style lang="scss" scoped>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 0;
    max-width: 900px;
    margin: 0 auto;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    &__content {
      flex: 1;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    &__field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    &__label {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--slate-blue);
      margin-bottom: 0.5rem;
    }

    &__input,
    &__textarea {
      padding: 1.2rem 1.6rem;
      border: 1px solid var(--border-line);
      border-radius: 0.8rem;
      font-size: 1.5rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: #ffffff;
      color: var(--slate-blue);
      font-family: inherit;

      &:focus {
        border-color: var(--primary);
        outline: none;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }

      &--error {
        border-color: #ef4444;
      }
    }

    &__textarea {
      resize: vertical;
      min-height: 8rem;
    }

    &__error {
      font-size: 0.875rem;
      color: #ef4444;
    }

    &__submit {
      margin-top: 0.5rem;
      padding: 1.6rem 4rem;
      background: var(--primary);
      color: #ffffff;
      border: 2px solid #ffffff;
      border-radius: 0.8rem;
      font-size: 1.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;

      &:hover {
        background: var(--secondary);
        border-color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }
    }

    &__status {
      margin-top: 1.5rem;
      padding: 0.875rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      text-align: center;

      &--success {
        background-color: #10b981;
        color: white;
      }

      &--error {
        background-color: #ef4444;
        color: white;
      }
    }

    &__info {
      flex: 0 0 280px;
      padding: 3rem;
      background: #ffffff;
      border: 1px solid var(--border-line);
      border-radius: 1.4rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        box-shadow: 0 20px 80px 0px rgba(104, 117, 141, 0.15);
        transform: translateY(-4px);
      }

      @media (min-width: 768px) {
        margin-left: 3rem;
      }
    }

    &__info-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 2rem;
    }

    &__info-section {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__info-subtitle {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--secondary);
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1.5rem;
      color: var(--slate-blue);
      line-height: 1.6;
    }
  }
</style>
