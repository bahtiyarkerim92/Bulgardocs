<template>
  <div class="treatment-card group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 border border-gray-200/50 hover:border-blue-300/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
        {{ treatment.name }}
      </h3>
      <div v-if="treatment.category" class="ml-3">
        <span class="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200/50">
          {{ treatment.category }}
        </span>
      </div>
    </div>
    
    <div v-if="treatment.description" class="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
      {{ treatment.description }}
    </div>

    <div class="pt-4 border-t border-gray-200/50">
      <div class="flex items-end justify-between">
        <div>
          <div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            €{{ treatment.price }}
          </div>
          <div v-if="treatment.duration" class="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ treatment.duration }}</span>
          </div>
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  treatment: any
}>()
</script>

<style scoped>
.treatment-card {
  transition: all 0.2s;
}

.treatment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

