<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)"
      class="pagination__button"
    >
      Previous
    </button>

    <div class="pagination__pages">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="$emit('page-change', page)"
        :class="[
          'pagination__page-button',
          { 'pagination__page-button--active': page === currentPage }
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button
      :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)"
      class="pagination__button"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(props.totalPages, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.pagination__button {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f3f4f6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pagination__pages {
  display: flex;
  gap: 0.25rem;
}

.pagination__page-button {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 2.5rem;

  &:hover {
    background: #f3f4f6;
  }

  &--active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;

    &:hover {
      background: #1d4ed8;
    }
  }
}
</style>
