<template>
  <span :class="['simple-icon', iconClass]" v-html="iconHtml"></span>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "1.6rem",
});

const iconMap: Record<string, string> = {
  // Dashboard icons
  "mdi:account": "👤",
  "mdi:calendar-clock": "📅",
  "mdi:file-document": "📄",
  "mdi:pill": "💊",
  "mdi:menu-left": "☰",

  // Appointment icons
  "mdi:plus": "+",
  "mdi:calendar-check": "✓",
  "mdi:calendar-plus": "📅+",
  "mdi:calendar-today": "📅",
  "mdi:phone": "📞",
  "mdi:video": "📹",
  "mdi:account-edit": "✏️",
  "mdi:arrow-right": "→",

  // Status icons
  "mdi:alert": "⚠️",
  "mdi:alert-circle": "⚠️",
  "mdi:check-circle": "✅",
  "mdi:close": "✕",
  "mdi:refresh": "↻",
  "mdi:loading": "⟳",

  // Profile icons
  "mdi:account-details": "👤",
  "mdi:gender-male-female": "⚥",
  "mdi:cake": "🎂",
  "mdi:map-marker": "📍",
  "mdi:flag": "🏳️",
  "mdi:card-account-details": "🆔",
  "mdi:shield-check": "🛡️",
  "mdi:shield": "🛡️",
  "mdi:office-building": "🏢",
  "mdi:identifier": "#",
  "mdi:cog": "⚙️",
  "mdi:email": "📧",
  "mdi:check": "✓",
  "mdi:pencil": "✏️",
  "mdi:key": "🔑",
};

const iconHtml = computed(() => {
  return iconMap[props.name] || "?";
});

const iconClass = computed(() => ({
  "simple-icon--emoji":
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      iconHtml.value
    ),
  "simple-icon--symbol":
    !/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      iconHtml.value
    ),
}));
</script>

<style lang="scss" scoped>
.simple-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: v-bind(size);
  line-height: 1;

  &--emoji {
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  &--symbol {
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    font-weight: bold;
  }
}
</style>
