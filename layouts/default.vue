<template>
  <div class="container">
    <div class="bg-mesh"></div>
    <Navbar aria-label="breadcrumb" />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script lang="ts" setup></script>

<style scoped lang="scss">
  .container {
    width: 100%;
    padding: 0;

    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }
</style>
