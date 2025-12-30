<template>
  <div
    class="modal-frame"
    :class="{
      'modal-frame--blur' : backgroundBlur,
    }"
  >
    <div
      v-if="backdrop"
      class="modal-frame__backdrop"
    />
    <div class="modal-frame__box">
      <div
        class="modal-frame__base"
        :class="colorType"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  type ColorType = 'success' | 'warning';

  interface Props {
    colorType?: ColorType;
    backgroundBlur?: boolean;
    backdrop?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    colorType: 'warning',
    backgroundBlur: true,
    backdrop: true,
  });

  onMounted(() => {
    document.body.style.overflow = 'hidden';
  });

  onBeforeUnmount(() => {
    document.body.style.overflow = 'auto';
  });
</script>

<style lang="scss" scoped>
  .modal-frame {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 4500;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(16, 44, 70, 0.4);
    backdrop-filter: blur(10px);

    &__box {
      width: 90%;
      max-width: 60rem;
      z-index: 1;
    }

    &__base {
      padding: 4rem;
      background: #ffffff;
      border-radius: 2rem;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
      border-left: 0.8rem solid var(--primary);
      position: relative;

      &.success {
        border-left-color: #34c759;
      }

      &.warning {
        border-left-color: #ff9500;
      }
    }
  }
</style>