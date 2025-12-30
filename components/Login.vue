<template>
  <div class="login-wrapper">
    <div class="login-form" ref="loginFormRef">
      <MessageModal
        :is-visible="isMessageVisible"
        :title="messageTitle"
        :message="messageContent"
        :frame-type="frameType"
        @confirm="handleMessageConfirm"
      />

      <div class="login-form__header">
        <span class="login-form__logo-text">Bulgardocs</span>
        <closeBtn
          class="login-form__dialog-close"
          @click="modalStore.hideModal()"
        />
      </div>
      <h1>{{ $t("login.title") }}</h1>
      <form @submit.prevent="handleLogin">
        <div class="login-form__container">
          <!-- Email Field -->
          <div :class="{ 'login-form__field--error': errors.email }">
            <label class="login-form__label" for="email">
              {{ errors.email ? errors.email : $t("login.form.email.label") }}
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              :placeholder="$t('login.form.email.placeholder')"
              @blur="validateField('email')"
              @input="handleEmailChange"
            />
          </div>

          <!-- Password Field -->
          <div :class="{ 'login-form__field--error': errors.password }">
            <label class="login-form__label" for="password">
              {{
                errors.password
                  ? errors.password
                  : $t("login.form.password.label")
              }}
            </label>
            <div class="login-form__password-wrapper">
              <input
                id="password"
                ref="password"
                v-model="form.password"
                type="password"
                :placeholder="$t('login.form.password.placeholder')"
                @blur="validateField('password')"
                @input="validateFieldOnError('password')"
              />
              <eye
                v-if="form.password.length"
                class="login-form__show-pass"
                @click="showPassword"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button
            :disabled="isSubmitting || (!isEmailValidated && !!userEmail)"
            type="submit"
            class="login-form__submit-button"
          >
            <div v-if="isSubmitting" class="login-form__loading-spinner" />
            <span v-else>{{ $t("login.form.submit") }}</span>
          </button>

          <!-- Error Message -->
          <div class="login-form__message-container">
            <div v-if="errorMessage" class="login-form__message">
              {{ errorMessage }}
            </div>
            <div
              v-if="!isEmailValidated && userEmail"
              class="login-form__validation-prompt"
            >
              <button
                class="login-form__resend-button"
                :disabled="isResending"
                @click="resendValidationEmail"
              >
                {{ getResendButtonText() }}
              </button>
            </div>
          </div>

          <!-- Links to Register and Forgot Password -->
          <a
            class="login-form__forgot-password"
            @click.prevent="modalStore.showForgotPassword()"
          >
            {{ $t("login.form.forgotPassword") }}
          </a>
          <div
            class="login-form__links"
            @click.prevent="modalStore.showRegister()"
          >
            <span class="login-form__register-now">
              {{ $t("login.form.noAccount") }}
              <span class="login-form__register-now--color">
                {{ $t("login.form.registerNow") }}
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~/stores/authStore";
import { useModalStore } from "~/stores/modalStore";
import eye from "./public/svg/eye.svg";
import closeBtn from "./public/svg/closeBold.svg";
import { z } from "zod";

const { t, locale } = useI18n();

interface BackendError {
  status: number;
  data: {
    status?: string;
    code?: string;
    message?: string;
    isEmailValidated?: boolean;
    email?: string;
  };
}

const emit = defineEmits([
  "switch-to-register",
  "switch-to-forgot-password",
  "close-modal",
]);
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isSubmitting = ref(false);
const errorMessage = ref("");
const password = ref<HTMLInputElement | null>(null);
const isEmailValidated = ref(true);
const userEmail = ref("");
const isResending = ref(false);
const localePath = useLocalePath();

const form = reactive({
  email: "",
  password: "",
});

const errors: Record<string, string | null> = reactive({
  email: null,
  password: null,
});

const fieldSchemas = {
  email: z.string().email(t("login.validation.email.invalid")),
  password: z
    .string()
    .min(8, t("login.validation.password.minLength"))
    .regex(/[a-z]/, t("login.validation.password.lowercase"))
    .regex(/[A-Z]/, t("login.validation.password.uppercase"))
    .regex(/[0-9]/, t("login.validation.password.number"))
    .regex(/[^a-zA-Z0-9]/, t("login.validation.password.specialChar")),
};

const validateField = (fieldName: keyof typeof fieldSchemas) => {
  if (!form[fieldName]) {
    errors[fieldName] = t(`login.validation.${fieldName}.required`);
    return;
  }
  const result = fieldSchemas[fieldName].safeParse(form[fieldName]);
  if (!result.success) {
    errors[fieldName] = result.error.errors[0].message;
  } else {
    errors[fieldName] = null;
  }
};

const validateFieldOnError = (fieldName: keyof typeof fieldSchemas) => {
  if (errors[fieldName]) {
    validateField(fieldName);
  }
};

const showPassword = () => {
  const input = password.value;
  if (input instanceof HTMLInputElement) {
    input.type = input.type === "password" ? "text" : "password";
  }
};

const modalStore = useModalStore();
const isMessageVisible = ref(false);
const messageTitle = ref("");
const messageContent = ref("");
const frameType = ref<"success" | "warning">("success");

const handleMessageConfirm = () => {
  isMessageVisible.value = false;
};

const showSuccessMessage = (title: string, message: string) => {
  messageTitle.value = title;
  messageContent.value = message;
  frameType.value = "success";
  isMessageVisible.value = true;
};

const showErrorMessage = (message: string) => {
  messageContent.value = message;
  frameType.value = "warning";
  isMessageVisible.value = true;
};

const resendValidationEmail = async () => {
  try {
    isResending.value = true;
    await $fetch<{ message: string; retryAfter?: number }>(
      "/auth/resend-validation-email",
      {
        method: "POST",
        body: {
          email: userEmail.value,
          locale: locale.value,
        },
      }
    );

    showSuccessMessage(
      t("login.emailValidation.resendSuccess"),
      t("login.emailValidation.tokenStillValid")
    );
  } catch (error) {
    const fetchError = error as {
      data?: { message?: string; retryAfter?: number };
      status?: number;
    };
    if (
      fetchError.data?.message?.includes(
        "A valid verification email was already sent"
      )
    ) {
      showErrorMessage(t("login.emailValidation.alreadySent"));
    } else if (fetchError.status === 400 && fetchError.data?.retryAfter) {
      showErrorMessage(fetchError.data.message || "");
    } else {
      errorMessage.value = t("login.emailValidation.resendError");
    }
  } finally {
    isResending.value = false;
  }
};

const handleLogin = async () => {
  errorMessage.value = "";

  // Prevent login attempt if email is not validated
  if (!isEmailValidated.value && userEmail.value) {
    return;
  }

  if (!form.email || !form.password) {
    if (!form.email) errors.email = t("login.validation.email.required");
    if (!form.password)
      errors.password = t("login.validation.password.required");
    return;
  }
  if (errors.email || errors.password) {
    return;
  }

  try {
    isSubmitting.value = true;
    console.log(form.email, form.password);
    await authStore.login(form.email, form.password);

    emit("close-modal");

    if (authStore.isAuthenticated) {
      if (route.path.toLocaleLowerCase().includes("pricing")) {
        return;
      }

      if (authStore.user?.isAdmin) {
        router.push(localePath("/admin"));
      } else {
        // Redirect to patient app
        const patientAppUrl =
          process.env.NODE_ENV === "production"
            ? "https://patient.bulgardocs.com"
            : "http://localhost:5173";
        window.location.href = patientAppUrl;
      }
    }
  } catch (error) {
    const backendError = authStore.loginBackendError as BackendError;

    // Reset states first
    isEmailValidated.value = true;
    userEmail.value = "";

    // Case 1 & 2: User doesn't exist or invalid password
    if (backendError?.data?.message === "Email or password is incorrect") {
      errorMessage.value = t("login.errors.invalidCredentials");
      return;
    }

    // Case 3: Email not validated
    if (backendError?.data?.isEmailValidated === false) {
      isEmailValidated.value = false;
      userEmail.value = form.email;
      errorMessage.value = t("login.errors.emailNotValidated");
      return;
    }
    // Case 4: Server error
    if (backendError?.status === 500) {
      errorMessage.value = t("login.errors.500");
      return;
    }

    if (
      (backendError.data as string) ===
      "Too many login attempts, please try again later."
    ) {
      errorMessage.value = t("errors.tooManyAttempts");
      return;
    }

    // Fallback for any other unexpected errors
    errorMessage.value = t("login.errors.unknown");
  } finally {
    isSubmitting.value = false;
  }
};

const onEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    handleLogin();
  }
};

const loginFormRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (
    loginFormRef.value &&
    !loginFormRef.value.contains(event.target as Node)
  ) {
    modalStore.hideModal();
  }
};

onMounted(() => {
  document.addEventListener("keydown", onEnter);
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onEnter);
  document.removeEventListener("mousedown", handleClickOutside);
});

const getResendButtonText = () => {
  if (isResending.value) {
    return t("login.emailValidation.sending");
  }
  return t("login.emailValidation.resend");
};

const handleEmailChange = () => {
  validateFieldOnError("email");
  // Reset validation state if user changes email
  if (userEmail.value && form.email !== userEmail.value) {
    isEmailValidated.value = true;
    userEmail.value = "";
    errorMessage.value = "";
  }
};
</script>

<style scoped lang="scss">
.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(16, 44, 70, 0.4);
  backdrop-filter: blur(10px);
}

.login-form {
  position: relative;
  max-width: 50rem;
  width: 90%;
  padding: 4rem;
  background-color: #ffffff;
  border-radius: 2rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  
  &__header {
    margin-bottom: 4rem;
    text-align: center;
  }

  &__logo-text {
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary);
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 3rem;
    text-align: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  &__label {
    display: block;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--secondary);
    margin-bottom: 0.8rem;
  }

  input {
    width: 100%;
    padding: 1.4rem 1.6rem;
    border: 1px solid var(--border-line);
    border-radius: 1rem;
    font-size: 1.6rem;
    transition: all 0.3s ease;
    background: #ffffff;
    color: var(--text-dark);

    &::placeholder {
      color: var(--slate-blue);
      opacity: 0.5;
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(19, 88, 216, 0.1);
    }
  }

  &__password-wrapper {
    position: relative;
  }

  &__show-pass {
    position: absolute;
    right: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    color: var(--slate-blue);
  }

  &__submit-button {
    width: 100%;
    padding: 1.6rem;
    background: var(--primary);
    color: #ffffff;
    border: none;
    border-radius: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover:not(:disabled) {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(19, 88, 216, 0.2);
    }

    &:disabled {
      background: var(--border-line);
      cursor: not-allowed;
    }
  }

  &__forgot-password {
    display: block;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--primary);
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }

  &__links {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.5rem;
    color: var(--slate-blue);
  }

  &__register-now--color {
    color: var(--primary);
    font-weight: 700;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__dialog-close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    color: var(--secondary);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0.5rem;
    background: var(--alice-blue);
    border-radius: 50%;

    &:hover {
      background: var(--border-line);
      transform: rotate(90deg);
    }
  }

  &__field--error {
    label {
      color: #ff3b30;
    }
    input {
      border-color: #ff3b30;
      &:focus {
        box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1);
      }
    }
  }

  &__message {
    color: #ff3b30;
    font-size: 1.4rem;
    text-align: center;
    margin-top: 1rem;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-form__loading-spinner {
  width: 2.4rem;
  height: 2.4rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
</style>

