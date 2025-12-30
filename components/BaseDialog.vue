<template>
  <section>
    <dialog
      ref="baseDialog"
      class="dialog"
      :class="{ 'is-closing': dialogClose }"
    >
      <slot name="modal-body" />
    </dialog>
  </section>
</template>

<script lang="ts" setup>
const dialogClose = ref(false)
const baseDialog = ref<HTMLDialogElement>()

const openModal = () => {
    if (!baseDialog.value) return
    dialogClose.value = false
    baseDialog.value.showModal()
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    if (!baseDialog.value?.open) return
    
    dialogClose.value = true
    document.body.style.overflow = 'auto'
    
    // Force close after animation duration
    setTimeout(() => {
        if (baseDialog.value?.open) {
            baseDialog.value.close()
            dialogClose.value = false
        }
    }, 300) // Match animation duration
}

const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
    }
}

onMounted(() => {
    openModal()
    baseDialog.value?.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
    baseDialog.value?.removeEventListener('keydown', handleEscape)
    if (baseDialog.value?.open) {
        baseDialog.value.close()
        document.body.style.overflow = 'auto'
    }
})

defineExpose({
    openModal,
    closeModal
})
</script>

<style lang="scss" scoped>
.dialog {
  border: none;
  height: 100vh;
  margin: 0;
  max-height: none;
  max-width: none;
  padding: 0;
  width: 100vw;
  background-color: #ffffff;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  overflow: hidden;
  animation: slide-in-right 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  &::backdrop {
    background: rgba(16, 44, 70, 0.4);
    backdrop-filter: blur(10px);
  }
}

.is-closing {
  animation: slide-out-right 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>

