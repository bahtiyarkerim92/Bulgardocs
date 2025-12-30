<template>
  <div class="loading-spinner"/>
</template>

<style lang="scss" scoped>
.loading-spinner {
  width: 4rem;
  height: 4rem;
  border: 3px solid var(--border);
  border-top-color: var(--main-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 