<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

// Function to generate ItemList structured data

// Function to generate BreadcrumbList structured data

// Run auth check when app starts
onMounted(() => {
  watchEffect(() => {
    document.documentElement.className = locale.value;
  });
});
</script>
