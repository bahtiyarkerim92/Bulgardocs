<template>
  <div class="base-select">
    <label
      v-if="title || hasError"
      :for="selectId"
      class="base-select__label"
      :class="{ 'base-select__label--error': hasError }"
    >
      {{ hasError ? errorMessage : title }}
      <span v-if="required" class="base-select__required-mark">*</span>
    </label>
    <div class="base-select__select-wrapper">
      <select
        :id="selectId"
        :value="modelValue"
        class="base-select__select"
        :class="{ 'base-select__select--error': hasError }"
        @change="handleSelectChange"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <arrowDown class="base-select__select-arrow" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import arrowDown from './public/svg/arrowDown.svg';

  interface SelectOption {
    value: string;
    label: string;
  }

  interface Props {
    modelValue?: string | null;
    title?: string;
    options: SelectOption[];
    hasError?: boolean | string | null;
    required?: boolean;
    placeholder?: string;
    errorMessage?: string | null;
  }

  const _props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    title: '',
    hasError: false,
    required: false,
    placeholder: '',
    errorMessage: null,
    options: () => [],
  });

  const emit = defineEmits(['update:modelValue', 'change']);

  const selectId = `select-${Math.random().toString(36).substring(2, 9)}`;

  const handleSelectChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const value = target.value || null;
    emit('update:modelValue', value);
    emit('change', value);
  };
</script>

<style scoped lang="scss">
  .base-select {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;

    &__required-mark {
      color: #ff3b30;
      margin-left: 0.2rem;
    }

    &__label {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--secondary);
      display: block;

      &--error {
        color: #ff3b30;
      }
    }

    &__select-wrapper {
      position: relative;
      width: 100%;
    }

    &__select {
      appearance: none;
      background-color: #ffffff;
      cursor: pointer;
      color: var(--text-dark);
      font-size: 1.6rem;
      display: block;
      width: 100%;
      padding: 1.4rem 1.6rem;
      padding-right: 4rem;
      border: 1px solid var(--border-line);
      border-radius: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(19, 88, 216, 0.1);
      }

      &--error {
        border-color: #ff3b30;
        &:focus {
          box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1);
        }
      }

      option {
        font-size: 1.6rem;
        padding: 1rem;
      }
    }

    &__select-arrow {
      position: absolute;
      right: 1.6rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      width: 1.6rem;
      height: 1.6rem;
      color: var(--slate-blue);
      transition: all 0.3s ease;

      .base-select__select:focus + & {
        transform: translateY(-50%) rotate(180deg);
        color: var(--primary);
      }

      .base-select__select--error + & {
        color: #ff3b30;
      }
    }
  }
</style>

