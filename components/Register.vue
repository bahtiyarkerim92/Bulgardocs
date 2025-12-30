<template>
  <MessageModal
    :is-visible="isConfirmMessageVisible"
    :title="messageTitle"
    :message="messageContent"
    :frame-type="frameType"
    @confirm="handleConfirmMessage"
  />

  <div class="register-form">
    <div class="register-form__header">
      <span class="register-form__logo-text">Bulgardocs</span>
      <h2>{{ $t('registration.title') }}</h2>
      <closeBtn class="register-form__dialog-close" @click="modalStore.hideModal()" />
    </div>

    <form @submit.prevent.stop="submitForm" @enter="handleSubmitEnter">
      <div class="register-form__container">
        <!-- Name row -->
        <div class="register-form__row">
          <!-- First Name -->
          <div
            class="register-form__field"
            :class="{ 'register-form__field--error': errors.firstName }"
          >
            <label class="register-form__label" for="firstName">
              {{ errors.firstName ? errors.firstName : $t('registration.fields.firstName.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              :placeholder="$t('registration.fields.firstName.placeholder')"
              @blur="validateField('firstName')"
              @input="validateFieldOnError('firstName')"
              @keydown.enter.prevent="focusNextInput"
            />
          </div>

          <!-- Last Name -->
          <div
            class="register-form__field"
            :class="{ 'register-form__field--error': errors.lastName }"
          >
            <label class="register-form__label" for="lastName">
              {{ errors.lastName ? errors.lastName : $t('registration.fields.lastName.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              :placeholder="$t('registration.fields.lastName.placeholder')"
              @blur="validateField('lastName')"
              @input="validateFieldOnError('lastName')"
              @keydown.enter.prevent="focusNextInput"
            />
          </div>
        </div>

        <!-- Gender and Birthday row -->
        <div class="register-form__row register-form__row--birthday-gender">
          <!-- Birthday -->
          <div
            class="register-form__field register-form__field--birthday"
            :class="{ 'register-form__field--error': errors.birthDate }"
          >
            <label class="register-form__label">
              {{ errors.birthDate ? errors.birthDate : $t('registration.fields.birthday.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <div class="register-form__date-wrapper">
              <BaseSelect
                v-model="dateComponents.day"
                :title="''"
                :placeholder="$t('registration.fields.birthday.day')"
                :options="
                  days.map((day) => ({
                    value: String(day),
                    label: day.toString().padStart(2, '0'),
                  }))
                "
                :has-error="errors.birthDate"
                @change="updateBirthDate"
              />
              <BaseSelect
                v-model="dateComponents.month"
                :title="''"
                :placeholder="$t('registration.fields.birthday.month')"
                :options="
                  months.map((month, index) => ({
                    value: String(index + 1),
                    label: month,
                  }))
                "
                :has-error="errors.birthDate"
                @change="updateBirthDate"
              />
              <BaseSelect
                v-model="dateComponents.year"
                :title="''"
                :placeholder="$t('registration.fields.birthday.year')"
                :options="
                  years.map((year) => ({
                    value: String(year),
                    label: year.toString(),
                  }))
                "
                :has-error="errors.birthDate"
                @change="updateBirthDate"
              />
            </div>
          </div>

          <!-- Gender -->
          <div
            class="register-form__field register-form__field--gender"
            :class="{ 'register-form__field--error': errors.gender }"
          >
            <BaseSelect
              v-model="form.gender"
              :title="$t('registration.fields.gender.label')"
              :has-error="errors.gender"
              :required="true"
              :placeholder="$t('registration.fields.gender.select')"
              :options="[
                { value: 'male', label: $t('registration.fields.gender.options.male') },
                { value: 'female', label: $t('registration.fields.gender.options.female') },
                { value: 'other', label: $t('registration.fields.gender.options.other') },
              ]"
              :error-message="errors.gender"
              @change="validateField('gender')"
            />
          </div>
        </div>

        <!-- Address row -->
        <div class="register-form__row register-form__row--address">
          <!-- Street -->
          <div
            class="register-form__field register-form__field--street"
            :class="{ 'register-form__field--error': errors.address }"
          >
            <label class="register-form__label" for="address">
              {{ errors.address ? errors.address : $t('registration.fields.address.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="address"
              v-model="form.address"
              type="text"
              :placeholder="$t('registration.fields.address.placeholder')"
              @blur="validateField('address')"
              @input="validateFieldOnError('address')"
              @keydown.enter.prevent="focusNextInput"
            />
          </div>

          <!-- House Number -->
          <div
            class="register-form__field register-form__field--number"
            :class="{ 'register-form__field--error': errors.addressNumber }"
          >
            <label class="register-form__label" for="addressNumber">
              {{
                errors.addressNumber
                  ? errors.addressNumber
                  : $t('registration.fields.addressNumber.label')
              }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="addressNumber"
              v-model="form.addressNumber"
              type="text"
              :placeholder="$t('registration.fields.addressNumber.placeholder')"
              @blur="validateField('addressNumber')"
              @input="validateFieldOnError('addressNumber')"
              @keydown.enter.prevent="focusNextInput"
            />
          </div>
        </div>

        <!-- Location row -->
        <div class="register-form__row register-form__row--location">
          <!-- Post Code -->
          <div
            class="register-form__field"
            :class="{ 'register-form__field--error': errors.postCode }"
          >
            <label class="register-form__label" for="postCode">
              {{ errors.postCode ? errors.postCode : $t('registration.fields.postCode.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="postCode"
              v-model="form.postCode"
              type="text"
              :placeholder="$t('registration.fields.postCode.placeholder')"
              @blur="validateField('postCode')"
              @input="validateFieldOnError('postCode')"
              @keydown.enter.prevent="focusNextInput"
            />
          </div>

          <!-- City -->
          <div class="register-form__field" :class="{ 'register-form__field--error': errors.city }">
            <label class="register-form__label" for="city">
              {{ errors.city ? errors.city : $t('registration.fields.city.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="city"
              v-model="form.city"
              type="text"
              :placeholder="$t('registration.fields.city.placeholder')"
              @blur="validateField('city')"
              @input="validateFieldOnError('city')"
              @keydown.enter.prevent="focusNextInput"
            />
          </div>

          <!-- Country -->
          <div
            class="register-form__field"
            :class="{ 'register-form__field--error': errors.country }"
          >
            <BaseSelect
              v-model="form.countryCode"
              :title="$t('registration.fields.country.label')"
              :has-error="errors.country"
              :required="true"
              :placeholder="$t('registration.fields.country.select')"
              :options="
                countries.map((country) => ({
                  value: country.code,
                  label: country.name,
                }))
              "
              :error-message="errors.country"
              @change="validateField('country')"
            />
          </div>
        </div>

        <!-- Bulgaria-specific fields -->
        <div v-if="showNationalIdField" class="register-form__row">
          <!-- National ID Number -->
          <div :class="{ 'register-form__field--error': errors.nationalIdNumber }">
            <label class="register-form__label" for="nationalIdNumber">
              {{
                errors.nationalIdNumber
                  ? errors.nationalIdNumber
                  : $t('registration.fields.nationalId.label')
              }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="nationalIdNumber"
              v-model="form.nationalIdNumber"
              type="text"
              maxlength="10"
              :placeholder="$t('registration.fields.nationalId.placeholder')"
              @blur="validateField('nationalIdNumber')"
              @input="validateFieldOnError('nationalIdNumber')"
            />
          </div>

          <!-- Existing Patient -->
          <div :class="{ 'register-form__field--error': errors.isExistingPatient }">
            <label class="register-form__label">
              {{
                errors.isExistingPatient
                  ? errors.isExistingPatient
                  : $t('registration.fields.existingPatient.label')
              }}
              <span class="register-form__required-mark">*</span>
            </label>
            <div class="register-form__radio-group">
              <label class="register-form__radio-label">
                <input
                  type="radio"
                  v-model="form.isExistingPatient"
                  :value="true"
                  class="register-form__radio"
                  @change="validateField('isExistingPatient')"
                />
                <span class="register-form__radio-text">
                  {{ $t('registration.fields.existingPatient.yes') }}
                </span>
              </label>
              <label class="register-form__radio-label">
                <input
                  type="radio"
                  v-model="form.isExistingPatient"
                  :value="false"
                  class="register-form__radio"
                  @change="validateField('isExistingPatient')"
                />
                <span class="register-form__radio-text">
                  {{ $t('registration.fields.existingPatient.no') }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Conditional Fields for Germany -->
        <template v-if="showInsuranceFields">
          <!-- Insurance Type -->
          <div v-if="showInsuranceFields" class="register-form__wrapper">
            <BaseSelect
              v-model="form.insurance!.type"
              :title="$t('registration.fields.insuranceType.label')"
              :has-error="errors.insurance"
              :required="true"
              :placeholder="$t('registration.fields.insuranceType.select')"
              :options="[
                { value: 'state', label: $t('registration.fields.insuranceType.options.state') },
                {
                  value: 'private',
                  label: $t('registration.fields.insuranceType.options.private'),
                },
              ]"
              :error-message="errors.insurance"
              @change="validateField('insurance')"
            />
          </div>

          <!-- Insurance Company -->
          <div v-if="form.insurance?.type" class="register-form__wrapper">
            <BaseSelect
              v-model="form.insurance.company"
              :title="$t('registration.fields.insuranceCompany.label')"
              :has-error="errors.insurance"
              :required="true"
              :placeholder="$t('registration.fields.insuranceCompany.select')"
              :options="
                insuranceOptions.map((company) => ({
                  value: company,
                  label: company,
                }))
              "
              :error-message="errors.insurance"
              @change="validateField('insurance')"
            />
          </div>

          <!-- Insurance Number -->
          <div class="register-form__wrapper" v-if="form.insurance?.type">
            <div :class="{ 'register-form__field--error': errors.insurance }">
              <label class="register-form__label" for="insuranceNumber">
                {{
                  errors.insurance
                    ? errors.insurance
                    : $t('registration.fields.insuranceNumber.label')
                }}
                <span class="register-form__required-mark">*</span>
              </label>
              <input
                id="insuranceNumber"
                v-model="form.insurance.number"
                type="text"
                :placeholder="$t('registration.fields.insuranceNumber.placeholder')"
                @blur="validateField('insurance')"
                @input="validateFieldOnError('insurance')"
              />
            </div>
          </div>
        </template>

        <!-- Email -->
        <div class="register-form__wrapper">
          <div :class="{ 'register-form__field--error': errors.email }">
            <label class="register-form__label" for="email">
              {{ errors.email ? errors.email : $t('registration.fields.email.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              :placeholder="$t('registration.fields.email.placeholder')"
              @blur="validateField('email')"
              @input="validateFieldOnError('email')"
              @keydown.enter.prevent="focusNextInput"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="register-form__wrapper">
          <div :class="{ 'register-form__field--error': errors.password }">
            <label class="register-form__label" for="password">
              {{ errors.password ? errors.password : $t('registration.fields.password.label') }}
              <span class="register-form__required-mark">*</span>
            </label>
            <div class="register-form__password-wrapper">
              <input
                id="password"
                v-model="form.password"
                type="password"
                :placeholder="$t('registration.fields.password.placeholder')"
                @blur="validateField('password')"
                @input="validateFieldOnError('password')"
                @keydown.enter.prevent="focusNextInput"
              />
              <eye
                v-if="form.password"
                class="register-form__show-pass"
                @click="togglePasswordVisibility('password')"
              />
            </div>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="register-form__wrapper">
          <div :class="{ 'register-form__field--error': errors.confirmPassword }">
            <label class="register-form__label" for="confirmPassword">
              {{
                errors.confirmPassword
                  ? errors.confirmPassword
                  : $t('registration.fields.confirmPassword.label')
              }}
              <span class="register-form__required-mark">*</span>
            </label>
            <div class="register-form__password-wrapper">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                :placeholder="$t('registration.fields.confirmPassword.placeholder')"
                @blur="validateField('confirmPassword')"
                @input="validateFieldOnError('confirmPassword')"
                @keydown.enter.prevent="focusNextInput"
              />
              <eye
                v-if="form.confirmPassword"
                class="register-form__show-pass"
                @click="togglePasswordVisibility('confirmPassword')"
              />
            </div>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div
          class="register-form__field register-form__terms"
          :class="{ 'register-form__field--error': errors.termsAccepted }"
        >
          <div class="register-form__checkbox-wrapper">
            <label class="register-form__checkbox-label">
              <input
                type="checkbox"
                v-model="form.termsAccepted"
                class="register-form__checkbox"
                @change="validateField('termsAccepted')"
              />
              <span class="register-form__checkbox-text">
                {{ $t('registration.terms.accept') }}
                <a href="#" class="register-form__terms-link">
                  {{ $t('registration.terms.link') }}
                </a>
                <span class="register-form__required-mark">*</span>
              </span>
            </label>
          </div>
          <span v-if="errors.termsAccepted" class="register-form__error-text">
            {{ errors.termsAccepted }}
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="register-form__button">
        <button :disabled="isSubmitting" type="submit" @keydown.enter.stop.prevent="submitForm">
          <div v-if="isSubmitting" class="register-form__loading-spinner" />
          <span v-else>{{ $t('registration.submit.buttonText') }}</span>
        </button>
        <div class="register-form__links">
          <a @click.prevent="modalStore.showLogin()">
            {{ $t('registration.submit.loginPrompt') }}
            <span class="register-form__login-text">{{ $t('registration.submit.loginText') }}</span>
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import { z } from 'zod';
  import closeBtn from './public/svg/closeBold.svg';
  import eye from './public/svg/eye.svg';
  import BaseSelect from './BaseSelect.vue';
  import { countries } from '~/utils/countries';
  import { krankenkassen, private_krankenkassen } from '~/utils/krankenkassen';
  import type { ComponentPublicInstance } from 'vue';

  // Types
  interface FormData {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    address: string;
    addressNumber: string;
    postCode: string;
    city: string;
    countryCode: string;
    country: string | null;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
    nationalIdNumber?: string;
    isExistingPatient?: boolean;
    insurance?: {
      type?: string;
      company?: string;
      number?: string;
    };
  }

  type VatInputInstance = ComponentPublicInstance<{}, { validateVatNumberField: () => boolean }>;

  const emit = defineEmits(['close-register', 'switch-to-login']);
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const { t, locale } = useI18n();
  const modalStore = useModalStore();

  // State
  const form = reactive<FormData>({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    address: '',
    addressNumber: '',
    postCode: '',
    city: '',
    countryCode: '',
    country: null,
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    insurance: {
      type: undefined,
      company: undefined,
      number: undefined,
    },
    isExistingPatient: undefined,
  });

  const dateComponents = reactive({
    day: '',
    month: '',
    year: '',
  });

  const errors = reactive<Record<keyof FormData | string, string | null>>({});
  const isSubmitting = ref(false);
  const messageTitle = ref('');
  const messageContent = ref('');
  const isConfirmMessageVisible = ref(false);
  const frameType = ref<'success' | 'warning'>('success');
  const vatInputRef = ref<VatInputInstance | null>(null);

  // Computed
  const selectedCountry = computed(() => {
    return countries.find((c) => c.code === form.countryCode) || null;
  });

  const showNationalIdField = computed(() => form.countryCode === 'BG');
  const showInsuranceFields = computed(() => form.countryCode === 'DE');

  const insuranceOptions = computed(() => {
    if (!form.insurance?.type) return [];
    return form.insurance.type === 'state' ? krankenkassen : private_krankenkassen;
  });

  const years = computed(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  });

  const months = computed(() => [
    t('registration.fields.birthday.months.january'),
    t('registration.fields.birthday.months.february'),
    t('registration.fields.birthday.months.march'),
    t('registration.fields.birthday.months.april'),
    t('registration.fields.birthday.months.may'),
    t('registration.fields.birthday.months.june'),
    t('registration.fields.birthday.months.july'),
    t('registration.fields.birthday.months.august'),
    t('registration.fields.birthday.months.september'),
    t('registration.fields.birthday.months.october'),
    t('registration.fields.birthday.months.november'),
    t('registration.fields.birthday.months.december'),
  ]);

  const days = computed(() => {
    if (!dateComponents.year || !dateComponents.month) {
      return Array.from({ length: 31 }, (_, i) => i + 1);
    }

    const daysInMonth = new Date(
      Number(dateComponents.year),
      Number(dateComponents.month),
      0
    ).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  });

  // Methods
  const togglePasswordVisibility = (fieldId: string) => {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };

  // Validation Schema
  const validationSchema = {
    firstName: z.string().min(1, t('registration.validation.firstName')),
    lastName: z.string().min(1, t('registration.validation.lastName')),
    gender: z.enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: t('registration.validation.gender') }),
    }),
    birthDate: z.string().min(1, t('registration.validation.birthDate')),
    address: z.string().min(1, t('registration.validation.address')),
    addressNumber: z.string().min(1, t('registration.validation.addressNumber')),
    postCode: z.string().min(1, t('registration.validation.postCode')),
    city: z.string().min(1, t('registration.validation.city')),
    countryCode: z.string().min(1, t('registration.validation.country')),
    email: z
      .string()
      .min(1, t('registration.validation.email'))
      .email(t('registration.validation.email')),
    password: z
      .string()
      .min(8, t('registration.validation.password.minLength'))
      .regex(/[a-z]/, t('registration.validation.password.lowercase'))
      .regex(/[A-Z]/, t('registration.validation.password.uppercase'))
      .regex(/[0-9]/, t('registration.validation.password.number'))
      .regex(/[^a-zA-Z0-9]/, t('registration.validation.password.specialChar')),
    confirmPassword: z.string().min(1, t('registration.validation.confirmPassword')),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: t('registration.validation.termsRequired'),
    }),
    nationalIdNumber: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!selectedCountry.value || selectedCountry.value.code !== 'BG') return true;
          return /^\d{10}$/.test(val || '');
        },
        { message: t('registration.validation.nationalId') }
      ),
    isExistingPatient: z
      .boolean()
      .optional()
      .refine(
        (val) => {
          if (!selectedCountry.value || selectedCountry.value.code !== 'BG') return true;
          return typeof val === 'boolean';
        },
        { message: t('registration.validation.existingPatient') }
      ),
    insurance: z
      .object({
        type: z.enum(['state', 'private']).optional(),
        company: z.string().optional(),
        number: z.string().optional(),
      })
      .optional()
      .refine(
        (val) => {
          if (!selectedCountry.value || selectedCountry.value.code !== 'DE') return true;
          if (!val?.type || !val?.company || !val?.number) return false;
          return true;
        },
        { message: t('registration.validation.insurance') }
      ),
  };

  // Methods
  const validateField = (fieldName: keyof FormData) => {
    if (validationSchema[fieldName as keyof typeof validationSchema]) {
      try {
        validationSchema[fieldName as keyof typeof validationSchema]?.parse(form[fieldName]);
        errors[fieldName] = null;
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors[fieldName] = error.errors[0].message;
        }
      }
    }
  };

  const validateFieldOnError = (fieldName: keyof FormData) => {
    if (errors[fieldName]) {
      validateField(fieldName);
    }
  };

  const validateAllFields = () => {
    let hasErrors = false;

    // Clear all previous errors
    Object.keys(errors).forEach((key) => {
      errors[key] = null;
    });

    // Required fields validation
    if (!form.firstName) {
      errors.firstName = t('registration.validation.firstName');
      hasErrors = true;
    }
    if (!form.lastName) {
      errors.lastName = t('registration.validation.lastName');
      hasErrors = true;
    }
    if (!form.gender) {
      errors.gender = t('registration.validation.gender');
      hasErrors = true;
    }
    if (!form.birthDate) {
      errors.birthDate = t('registration.validation.birthDate');
      hasErrors = true;
    }
    if (!form.address) {
      errors.address = t('registration.validation.address');
      hasErrors = true;
    }
    if (!form.addressNumber) {
      errors.addressNumber = t('registration.validation.addressNumber');
      hasErrors = true;
    }
    if (!form.postCode) {
      errors.postCode = t('registration.validation.postCode');
      hasErrors = true;
    }
    if (!form.city) {
      errors.city = t('registration.validation.city');
      hasErrors = true;
    }
    if (!form.countryCode) {
      errors.country = t('registration.validation.country');
      hasErrors = true;
    }
    if (!form.email) {
      errors.email = t('registration.validation.email');
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t('registration.validation.email');
      hasErrors = true;
    }
    if (!form.password) {
      errors.password = t('registration.validation.password.minLength');
      hasErrors = true;
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = t('registration.validation.confirmPassword');
      hasErrors = true;
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = t('registration.validation.confirmPassword');
      hasErrors = true;
    }
    if (!form.termsAccepted) {
      errors.termsAccepted = t('registration.validation.termsRequired');
      hasErrors = true;
    }

    // Country-specific validations
    if (form.countryCode === 'BG') {
      if (!form.nationalIdNumber) {
        errors.nationalIdNumber = t('registration.validation.nationalId');
        hasErrors = true;
      }
      if (form.isExistingPatient === undefined) {
        errors.isExistingPatient = t('registration.validation.existingPatient');
        hasErrors = true;
      }
    }

    if (form.countryCode === 'DE') {
      if (!form.insurance?.type || !form.insurance?.company || !form.insurance?.number) {
        errors.insurance = t('registration.validation.insurance');
        hasErrors = true;
      }
    }

    return !hasErrors;
  };

  const updateBirthDate = () => {
    if (dateComponents.year && dateComponents.month && dateComponents.day) {
      const date = new Date(
        Number(dateComponents.year),
        Number(dateComponents.month) - 1,
        Number(dateComponents.day)
      );
      form.birthDate = date.toISOString().split('T')[0];
      validateField('birthDate');
    } else {
      form.birthDate = '';
    }
  };

  const handleSubmitEnter = (event: Event) => {
    event.stopImmediatePropagation();
    event.preventDefault();

    const isVatValid = vatInputRef.value?.validateVatNumberField() ?? false;
    errors.vatNumber = isVatValid ? null : t('registration.validation.vatNumber');
    const hasFieldErrors = Object.values(errors).some((error) => error !== null);
    if (isVatValid && !hasFieldErrors) {
      submitForm();
    }
  };

  const submitForm = async () => {
    const isValid = validateAllFields();

    if (!isValid) {
      frameType.value = 'warning';
      messageModal(
        t('registration.validation.error'),
        t('registration.validation.pleaseCheckFields')
      );
      return;
    }

    if (isConfirmMessageVisible.value) {
      return;
    }

    try {
      isSubmitting.value = true;
      const formData = {
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        birthDate: form.birthDate,
        address: form.address,
        addressNumber: form.addressNumber,
        postCode: form.postCode,
        city: form.city,
        country: form.countryCode,
        countryName: selectedCountry.value?.name || '',
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        nationalIdNumber: form.countryCode === 'BG' ? form.nationalIdNumber : undefined,
        isExistingPatient: form.countryCode === 'BG' ? form.isExistingPatient : undefined,
        insurance: form.countryCode === 'DE' ? form.insurance : undefined,
        termsAccepted: form.termsAccepted,
        ipCountry: selectedCountry.value?.code || null,
      };

      console.log('Form data:', formData);

      try {
        const response = await $fetch(`${baseUrl}/auth/register`, {
          headers: {
            'Accept-Language': locale.value,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: formData,
        });

        // Success
        isConfirmMessageVisible.value = true;
        frameType.value = 'success';
        messageModal(
          t('registration.validation.success'),
          t('registration.validation.successMessage')
        );
      } catch (fetchError: any) {
        console.error('Registration error:', fetchError);
        
        // Handle validation errors
        if (fetchError?.data?.error?.errors) {
          Object.entries(fetchError.data.error.errors).forEach(([key, message]) => {
            errors[key] = message as string;
          });
          return;
        }

        // Handle other errors
        frameType.value = 'warning';
        const errorMessage = fetchError?.data?.message 
          || fetchError?.data?.content 
          || fetchError?.message 
          || t('registration.validation.errorOccurred');
        messageModal(t('registration.validation.error'), errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      frameType.value = 'warning';
      messageModal(
        t('registration.validation.error'),
        t('registration.validation.registrationError')
      );
    } finally {
      isSubmitting.value = false;
    }
  };

  const messageModal = (title: string, content: string) => {
    isConfirmMessageVisible.value = true;
    messageTitle.value = title;
    messageContent.value = content;
  };

  const handleConfirmMessage = () => {
    isConfirmMessageVisible.value = false;
    if (frameType.value === 'success') {
      modalStore.hideModal();
    }
  };

  // Watch for country changes to reset conditional fields
  watch(
    () => form.countryCode,
    (newCode) => {
      form.country = newCode || null;
      if (newCode === 'DE') {
        form.nationalIdNumber = undefined;
        form.isExistingPatient = undefined;
      } else if (newCode === 'BG') {
        form.insurance = {
          type: undefined,
          company: undefined,
          number: undefined,
        };
      } else {
        form.nationalIdNumber = undefined;
        form.isExistingPatient = undefined;
        form.insurance = {
          type: undefined,
          company: undefined,
          number: undefined,
        };
      }
    }
  );

  // Lifecycle
  onMounted(async () => {
    try {
      const locationData = await useLocation();
      if (locationData?.country) {
        const userCountry = countries.find((c) => c.code === locationData.country);
        if (userCountry) {
          form.countryCode = userCountry.code;
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  });
</script>

<style scoped lang="scss">
  .country-flag {
    height: 2rem;
    border-radius: 0.4rem;
    margin-right: 1rem;
  }

  .blur {
    filter: blur(0.2rem) !important;
  }

  .confirm-email__text {
    color: var(--white);
  }

  .register-form {
    max-width: $max-size-full;
    margin-inline: 1.5rem;
    padding: 1rem;
    border: 0.2rem solid var(--main-blue);
    border-radius: 0.5rem;
    background-color: var(--white-smoke);
    align-items: center;
    transform: 0;
    margin-top: 1rem;
    margin-bottom: 15rem;

    @media (min-width: $breakpoint-medium) {
      padding: 2rem;
    }

    @media (min-width: $breakpoint-small) {
      margin-top: 8rem;
      margin-inline: auto;
      padding: 2rem;
      width: 70%;
      max-width: 60rem;
    }

    &__container {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      column-gap: 0;
      @media (min-width: $breakpoint-small) {
        width: 100%;
        column-gap: 2rem;
      }
    }
    &__button {
      width: 100%;

      @media (min-width: $breakpoint-small) {
        width: 50%;
        margin: 0 auto;
      }
      & > button {
        margin-top: 2rem;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;

      & > h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
        font-weight: 500;
        left: 0;
        @media (min-width: $breakpoint-small) {
          font-size: 2.5rem;
        }
      }
    }

    &__dialog-close {
      position: absolute;
      top: -2.5rem;
      right: -2.5rem;
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

      @media (min-width: $breakpoint-small) {
        top: -2.5rem;
        right: -2.5rem;
      }
    }

    &__login-text {
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.3rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, #1e40af 0%, #6d28d9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    &__logo-text {
      font-size: 3rem;
      font-weight: 800;
      color: var(--primary);
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      display: block;
    }

    h1 {
      text-align: center;
      font-size: 2.7rem;
      margin-bottom: 3rem;
      font-weight: 500;
    }

    &__label {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--secondary);
    }

    &__password-wrapper {
      position: relative;
    }

    &__required-mark {
      color: #ff3b30;
      font-weight: 500;
      margin-left: 0.2rem;
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

    &__field--error label {
      color: #ff3b30;
    }

    &__field--error input::placeholder {
      color: #ff3b30;
    }

    input,
    button {
      display: block;
      width: 100%;
      margin-bottom: 1rem;
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

      &:focus,
      &:hover {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(19, 88, 216, 0.1);
      }
    }

    button {
      background: var(--primary);
      color: #ffffff;
      border: none;
      font-weight: 700;
      cursor: pointer;

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

    &__loading-spinner {
      width: 2.4rem;
      height: 2.4rem;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    &__message {
      color: #ff3b30;
      text-align: center;
      margin-top: 1rem;
      font-size: 1.4rem;
    }

    &__phone-wrapper {
      display: flex;
      gap: 1rem;
    }

    &__field--error {
      input {
        border-color: #ff3b30;
        &:focus {
          box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1);
        }
      }
      .register-form__show-pass {
        color: #ff3b30;
      }
    }

    &__links {
      margin-top: 2.5rem;
      font-size: 1.5rem;
      color: var(--slate-blue);
      text-align: center;

      a {
        cursor: pointer;
      }
    }

    &__terms {
      margin-top: 2rem;
      margin-bottom: 1rem;

      .register-form__checkbox-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .register-form__checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 1.2rem;
        cursor: pointer;
        font-size: 1.4rem;
        color: var(--slate-blue);
        line-height: 1.5;
      }

      .register-form__checkbox-text {
        font-size: 1.4rem;
        color: var(--slate-blue);
      }

      .register-form__terms-link {
        color: var(--primary);
        font-weight: 700;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__error-text {
      color: #ff3b30;
      font-size: 1.2rem;
      margin-top: 0.4rem;
      display: block;
    }

    &__row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      margin-bottom: 2.5rem;

      &--address {
        grid-template-columns: 3fr 1fr;
      }

      &--location {
        grid-template-columns: 1fr 2fr 2fr;
      }

      &--birthday-gender {
        grid-template-columns: 2fr 1fr;
      }

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;

        &:first-child {
          grid-template-columns: 1fr;
        }

        &--birthday-gender {
          grid-template-columns: 1fr;
        }

        &--address {
          grid-template-columns: 1fr;
        }

        &--location {
          grid-template-columns: 1fr;
        }
      }
    }

    &__field {
      width: 100%;
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      &--birthday {
        width: 100%;
      }

      &--gender {
        width: 100%;
      }
    }

    &__date-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 0;
    }

    &__radio-group {
      display: flex;
      gap: 3rem;
      margin-top: 0.5rem;
    }

    &__radio-label {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      font-size: 1.5rem;
      color: var(--text-dark);
    }

    &__radio {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      accent-color: var(--primary);
    }

    &__login-text {
      color: var(--primary);
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }

    &__dialog-close {
      position: absolute;
      top: -2.5rem;
      right: -2.5rem;
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
  }

  .register-form {
    position: relative;
    max-width: 80rem;
    width: 95%;
    padding: 4rem;
    background-color: #ffffff;
    border-radius: 2rem;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    margin: 4rem auto;
    max-height: 90vh;
    overflow-y: auto;
    @include customHorizontalScrollbar();

    &__header {
      margin-bottom: 4rem;
      text-align: center;
      position: relative;

      h2 {
        font-size: 3.2rem;
        font-weight: 800;
        color: var(--secondary);
        margin-bottom: 1rem;
      }
    }
  }
</style>

