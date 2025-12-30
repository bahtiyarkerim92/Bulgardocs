<template>
  <transition name="modal-fade">
    <ModalFrame
      v-if="isVisible"
      v-show="isOpen"
      ref="frame"
      :color-type="frameType"
    >
      <div class="modal-content">
        <div class="modal-content__header">
          <h2 class="modal-content__header-title">
            {{ title }}
          </h2>
        </div>
        <div class="modal-content__body">
          <p class="modal-content__body-content">
            {{ message }}
          </p>
        </div>
        <div class="modal-content__footer">
          <button
            class="modal-content__button"
            @click="onConfirm"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </ModalFrame>
  </transition>
</template>

<script lang="ts" setup>
  import type ModalFrame from "./ModalFrame.vue";
  type ColorType = 'success' | 'warning';

  const props = withDefaults(defineProps<{
    isVisible?: boolean;
    isOpen?: boolean;
    title?: string;
    message?: string;
    buttonText?: string;
    frameType?: ColorType;
  }>(), {
    isVisible: false,
    isOpen: true,
    title: 'Default Title',
    message: 'Default message.',
    buttonText: 'OK',
    frameType: 'success'
  });

  const emit = defineEmits(['confirm']);

  const frame = ref<InstanceType<typeof ModalFrame>>();

  const onConfirm = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    emit('confirm');
  };
</script>

<style lang="scss" scoped>
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__header-title {
      font-size: 2.4rem;
      font-weight: 800;
      color: var(--secondary);
      line-height: 1.2;
    }

    &__body-content {
      font-size: 1.8rem;
      line-height: 1.6;
      color: var(--slate-blue);
    }

    &__footer {
      margin-top: 1rem;
    }

    &__button {
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

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(19, 88, 216, 0.2);
      }
    }
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
</style>

