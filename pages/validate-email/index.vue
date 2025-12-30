<template>
  <div class="validate-email__container">
    <MessageModal
      :is-visible="isMessageVisible"
      :title="messageTitle"
      :message="messageContent"
      :frame-type="frameColor"
      @confirm="handleButton"
    />
    <div class="validate-email">
      <h1>{{ $t("login.emailValidation.prompt") }}</h1>
      <div v-if="isValidating" class="validate-email__status">
        <div class="validate-email__spinner" />
        <p>{{ $t("login.emailValidation.sending") }}</p>
      </div>
      <div v-if="showResendForm" class="validate-email__form">
        <div
          :class="{ 'validate-email__field--error': errors.userEmail }"
          class="validate-email__main-container"
        >
          <label
            class="validate-email__label"
            :class="{ 'validate-email__error-message': errors.userEmail }"
            for="email"
          >
            {{
              errors.userEmail ? errors.userEmail : $t("login.form.email.label")
            }}
          </label>
          <input
            id="email"
            v-model="userEmail"
            type="email"
            :placeholder="$t('login.form.email.placeholder')"
            @blur="validateField('userEmail')"
            @input="validateFieldOnError('userEmail')"
          />
        </div>
        <button
          :disabled="isSubmitting"
          class="validate-email__button"
          @click="resendValidationEmail"
        >
          <div v-if="isSubmitting" class="validate-email__loading-spinner" />
          <span v-else>{{ $t("login.emailValidation.resend") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";

// Add middleware
definePageMeta({
  layout: 'default',
  middleware: ["validate-email"],
});

type MessageFrameType = "success" | "warning";

interface ValidationResponse {
  message: string;
}

const route = useRoute();
const isValidating = ref(true);
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;
const isMessageVisible = ref(false);
const messageTitle = ref("");
const messageContent = ref("");
const frameColor = ref<MessageFrameType>("warning");
const showResendForm = ref(false);
const userEmail = ref("");
const isSubmitting = ref(false);

const errors: Record<string, string | null> = reactive({
  userEmail: null,
});

const { locale, t } = useI18n();
const emailSchema = z.string().email(t("login.validation.email.invalid"));

const validateField = (fieldName: keyof typeof errors) => {
  const result = emailSchema.safeParse(userEmail.value);
  if (!result.success) {
    errors[fieldName] = result.error.errors[0].message;
  } else {
    errors[fieldName] = null;
  }
};

const validateFieldOnError = (fieldName: keyof typeof errors) => {
  if (errors[fieldName]) {
    validateField(fieldName);
  }
};

const messageModal = (
  title: string,
  content: string,
  frame: MessageFrameType = "warning"
) => {
  isMessageVisible.value = true;
  messageTitle.value = title;
  messageContent.value = content;
  frameColor.value = frame;
};

const handleButton = () => {
  isMessageVisible.value = false;
  if (frameColor.value === "success") {
    return navigateTo(`/${locale.value}`);
  }
};

const resendValidationEmail = async () => {
  if (!userEmail.value) {
    validateField("userEmail");
    return;
  }
  if (errors.userEmail) {
    return;
  }
  try {
    isSubmitting.value = true;
    const { data, error } = await useFetch<ValidationResponse>(
      `${baseUrl}/auth/resend-validation-email`,
      {
        method: "POST",
        body: { email: userEmail.value, locale: locale.value },
        credentials: "include",
      }
    );

    if (error.value) {
      // Check for already validated email using status code and isEmailValidated flag
      if (
        error.value.statusCode === 400 &&
        error.value.data?.isEmailValidated
      ) {
        messageModal(
          "",
          t("login.emailValidation.emailIsValidated"),
          "success"
        );
        return;
      }

      // Case 1: User not found (404)
      if (error.value.statusCode === 404) {
        errors.userEmail = t("login.validation.email.invalid");
        return;
      }

      if (error.value.statusCode === 429) {
        messageModal("", t("forgotPassword.errors.tooManyRequests"));
        return;
      }

      // Case 2: Email already validated or rate limiting (400)
      if (error.value.statusCode === 400) {
        const errorData = error.value.data;
        if (errorData?.retryAfter) {
          // Rate limiting case
          const message =
            errorData.retryAfter < 60
              ? t("forgotPassword.errors.tooManyRequests")
              : t("login.emailValidation.alreadySent");
          messageModal("", message);
        } else {
          messageModal(
            "",
            errorData?.message || t("login.emailValidation.resendError")
          );
        }
        return;
      }

      // Case 3: Server error (500)
      if (error.value.statusCode === 500) {
        messageModal("", t("login.errors.500"));
        return;
      }

      // Default error case
      messageModal("", error.value?.data?.message || t("login.errors.unknown"));
    } else if (data.value) {
      messageModal(
        t("success"),
        t("login.emailValidation.tokenStillValid"),
        "success"
      );
      showResendForm.value = false;
    }
  } catch (err) {
    console.error(err);
    messageModal("", t("login.errors.unknown"));
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  const token = route.query.token;
  if (!token) {
    isValidating.value = false;
    showResendForm.value = true;
    messageModal("", t("login.emailValidation.resendError"));
    return;
  }

  try {
    const { data, error, refresh } = await useFetch<ValidationResponse>(
      `${baseUrl}/auth/validate-email`,
      {
        method: "POST",
        params: { token, locale: locale.value },
        credentials: "include",
      }
    );
    if (!data.value && !error.value) await refresh();
    if (error.value) {
      showResendForm.value = true;

      // Check for already validated email using status code and isEmailValidated flag
      if (
        error.value.statusCode === 400 &&
        error.value.data?.isEmailValidated
      ) {
        messageModal(
          "",
          t("login.emailValidation.emailIsValidated"),
          "success"
        );
        return;
      }

      // Handle specific error cases
      if (error.value.statusCode === 404) {
        messageModal("", t("login.validation.email.invalid"));
      } else if (error.value.statusCode === 400) {
        messageModal("", t("login.emailValidation.expiredToken"));
      } else {
        messageModal(
          "",
          error.value.data?.message ?? t("login.errors.unknown"),
          "warning"
        );
      }
    } else if (data.value) {
      messageModal(
        t("success"),
        t("login.emailValidation.emailValidated"),
        "success"
      );
      setTimeout(() => {
        navigateTo(`/${locale.value}`);
      }, 3000);
    }
  } catch (err) {
    console.error(err);
    messageModal("", t("login.errors.unknown"), "warning");
  } finally {
    isValidating.value = false;
  }
});

// Use composable for header styling
</script>

<style scoped lang="scss">
.validate-email {
  background: var(--white);
  border-radius: 1rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
  width: 100%;

  @media (min-width: $breakpoint-small) {
    padding: 4rem 3rem;
  }

  &__container {
    max-width: 80rem;
    margin: 4rem auto;
    padding: 1rem;
    min-height: calc(100vh - 30rem);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;

    @media (min-width: $breakpoint-small) {
      margin: 8rem auto;
      padding: 2rem;
    }
  }

  h1 {
    color: var(--main-blue);
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-align: center;

    @media (min-width: $breakpoint-small) {
      font-size: 3.2rem;
      margin-bottom: 3rem;
    }
  }

  &__status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (min-width: $breakpoint-small) {
      gap: 2rem;
    }

    p {
      font-size: 1.4rem;

      @media (min-width: $breakpoint-small) {
        font-size: 1.6rem;
      }
    }
  }

  &__spinner {
    width: 3rem;
    height: 3rem;
    border: 0.3rem solid var(--border);
    border-top-color: var(--main-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @media (min-width: $breakpoint-small) {
      width: 4rem;
      height: 4rem;
    }
  }

  &__message {
    text-align: center;
    color: var(--text-grey);
    margin: 1.5rem 0;
    font-size: 1.4rem;

    @media (min-width: $breakpoint-small) {
      margin: 2rem 0;
      font-size: 1.6rem;
    }
  }

  &__form {
    max-width: 40rem;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: $breakpoint-small) {
      padding: 0 2rem;
    }
  }

  &__main-container {
    margin-bottom: 1.5rem;

    @media (min-width: $breakpoint-small) {
      margin-bottom: 2rem;
    }
  }

  &__label {
    display: block;
    margin-bottom: 0.6rem;
    color: var(--text-grey);
    font-size: 1.3rem;
    font-weight: 500;

    @media (min-width: $breakpoint-small) {
      margin-bottom: 0.8rem;
      font-size: 1.4rem;
    }
  }

  &__error-message {
    color: var(--warning);
  }

  input {
    width: 100%;
    padding: 1rem;
    border: 0.2rem solid var(--border);
    border-radius: 0.8rem;
    font-size: 1.4rem;
    transition: all 0.3s ease;

    @media (min-width: $breakpoint-small) {
      padding: 1.2rem;
      font-size: 1.6rem;
    }

    &:focus {
      border-color: var(--main-blue);
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      outline: none;
    }
  }

  &__field--error input {
    border-color: var(--warning);
    &::placeholder {
      color: var(--warning);
    }
    &:focus {
      border-color: var(--warning);
    }
  }

  &__button {
    width: 100%;
    padding: 1rem;
    background: var(--main-blue);
    color: white;
    border: none;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    @media (min-width: $breakpoint-small) {
      padding: 1.2rem;
      font-size: 1.6rem;
      gap: 1rem;
    }

    &:hover:not(:disabled) {
      background: var(--main-blue);
    }

    &:disabled {
      background: var(--border);
      cursor: not-allowed;
    }
  }

  &__loading-spinner {
    width: 1.6rem;
    height: 1.6rem;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @media (min-width: $breakpoint-small) {
      width: 2rem;
      height: 2rem;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
