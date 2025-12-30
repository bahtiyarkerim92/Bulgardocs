<template>
  <div class="search-filters card-apple">
    <div class="search-filters__header">
      <h2 class="search-filters__title">{{ $t('search.filters.title') }}</h2>
      <button
        @click="handleReset"
        class="search-filters__reset-link"
      >
        {{ $t('search.filters.reset') }}
      </button>
    </div>

    <div class="search-filters__content">
      <!-- Search Input -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.search') }}</label>
        <div class="search-filters__input-wrapper">
          <svg class="search-filters__search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="localFilters.search"
            type="text"
            :placeholder="$t('search.filters.searchPlaceholder')"
            class="search-filters__input"
            @input="$emit('update:filters', localFilters)"
          />
        </div>
      </div>

      <!-- User Type -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.type') }}</label>
        <select
          v-model="localFilters.userType"
          class="search-filters__select"
          @change="$emit('update:filters', localFilters)"
        >
          <option value="all">{{ $t('search.filters.typeAll') }}</option>
          <option value="doctor">{{ $t('search.filters.typeDoctors') }}</option>
          <option value="clinic">{{ $t('search.filters.typeClinics') }}</option>
          <option value="agency">{{ $t('search.filters.typeAgencies') }}</option>
        </select>
      </div>

      <!-- Specialty (for Doctors) -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.specialty') }}</label>
        <input
          v-model="localFilters.specialty"
          type="text"
          :placeholder="$t('search.filters.specialtyPlaceholder')"
          class="search-filters__input"
          @input="$emit('update:filters', localFilters)"
        />
      </div>

      <!-- Treatment Name -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.treatment') }}</label>
        <input
          v-model="localFilters.treatment"
          type="text"
          :placeholder="$t('search.filters.treatmentPlaceholder')"
          class="search-filters__input"
          @input="$emit('update:filters', localFilters)"
        />
      </div>

      <!-- Treatment Category -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.category') }}</label>
        <input
          v-model="localFilters.category"
          type="text"
          :placeholder="$t('search.filters.categoryPlaceholder')"
          class="search-filters__input"
          @input="$emit('update:filters', localFilters)"
        />
      </div>

      <!-- Price Range -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.priceRange') }}</label>
        <div class="search-filters__price-range">
          <input
            v-model="localFilters.minPrice"
            type="number"
            :placeholder="$t('search.filters.minPrice')"
            class="search-filters__input search-filters__input--small"
            @input="$emit('update:filters', localFilters)"
          />
          <input
            v-model="localFilters.maxPrice"
            type="number"
            :placeholder="$t('search.filters.maxPrice')"
            class="search-filters__input search-filters__input--small"
            @input="$emit('update:filters', localFilters)"
          />
        </div>
      </div>

      <!-- Rating -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.minRating') }}</label>
        <select
          v-model="localFilters.minRating"
          class="search-filters__select"
          @change="$emit('update:filters', localFilters)"
        >
          <option value="">{{ $t('search.filters.any') }}</option>
          <option value="4">{{ $t('search.filters.rating4') }}</option>
          <option value="3">{{ $t('search.filters.rating3') }}</option>
          <option value="2">{{ $t('search.filters.rating2') }}</option>
          <option value="1">{{ $t('search.filters.rating1') }}</option>
        </select>
      </div>

      <!-- Location -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.country') }}</label>
        <input
          v-model="localFilters.country"
          type="text"
          :placeholder="$t('search.filters.countryPlaceholder')"
          class="search-filters__input"
          @input="$emit('update:filters', localFilters)"
        />
      </div>

      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.city') }}</label>
        <input
          v-model="localFilters.city"
          type="text"
          :placeholder="$t('search.filters.cityPlaceholder')"
          class="search-filters__input"
          @input="$emit('update:filters', localFilters)"
        />
      </div>

      <!-- Languages -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.languages') }}</label>
        <input
          v-model="localFilters.languagesInput"
          type="text"
          :placeholder="$t('search.filters.languagesPlaceholder')"
          class="search-filters__input"
          @input="handleLanguagesInput"
        />
        <div v-if="localFilters.languages && localFilters.languages.length > 0" class="search-filters__tags">
          <span
            v-for="(lang, index) in localFilters.languages"
            :key="index"
            class="search-filters__tag"
          >
            {{ lang }}
            <button
              @click="removeLanguage(index)"
              class="search-filters__tag-remove"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Recruitment Filters -->
      <div v-if="localFilters.userType === 'clinic' || localFilters.userType === 'all'" class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.recruitmentStatus') }}</label>
        <select
          v-model="localFilters.isRecruiting"
          class="search-filters__select"
          @change="$emit('update:filters', localFilters)"
        >
          <option value="">{{ $t('search.filters.any') }}</option>
          <option value="true">{{ $t('search.filters.recruiting') }}</option>
          <option value="false">{{ $t('search.filters.notRecruiting') }}</option>
        </select>
      </div>

      <div v-if="localFilters.userType === 'doctor' || localFilters.userType === 'all'" class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.openForRecruitment') }}</label>
        <select
          v-model="localFilters.isOpenForRecruitment"
          class="search-filters__select"
          @change="$emit('update:filters', localFilters)"
        >
          <option value="">{{ $t('search.filters.any') }}</option>
          <option value="true">{{ $t('search.filters.openForRecruitment') }}</option>
          <option value="false">{{ $t('search.filters.notOpen') }}</option>
        </select>
      </div>

      <!-- Sort -->
      <div class="search-filters__field">
        <label class="search-filters__label">{{ $t('search.filters.sortBy') }}</label>
        <select
          v-model="localFilters.sortBy"
          class="search-filters__select search-filters__select--margin"
          @change="$emit('update:filters', localFilters)"
        >
          <option value="rating">{{ $t('search.filters.sortRating') }}</option>
          <option value="name">{{ $t('search.filters.sortName') }}</option>
          <option value="price">{{ $t('search.filters.sortPrice') }}</option>
          <option value="createdAt">{{ $t('search.filters.sortNewest') }}</option>
        </select>
        <select
          v-model="localFilters.sortOrder"
          class="search-filters__select"
          @change="$emit('update:filters', localFilters)"
        >
          <option value="desc">{{ $t('search.filters.sortDesc') }}</option>
          <option value="asc">{{ $t('search.filters.sortAsc') }}</option>
        </select>
      </div>

      <!-- Action Buttons -->
      <div class="search-filters__actions">
        <BaseButton
          variant="primary"
          :button-text="$t('search.filters.searchButton')"
          @click="$emit('search')"
        />
        <BaseButton
          variant="outline"
          :button-text="$t('search.filters.resetFilters')"
          @click="handleReset"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from '~/components/BaseButton.vue'

const props = defineProps<{
  filters: any
}>()

const emit = defineEmits<{
  'update:filters': [filters: any]
  search: []
  reset: []
}>()

const localFilters = ref({ 
  ...props.filters,
  languagesInput: props.filters.languages?.join(', ') || '',
})

watch(() => props.filters, (newFilters) => {
  localFilters.value = { 
    ...newFilters,
    languagesInput: newFilters.languages?.join(', ') || '',
  }
}, { deep: true })

const handleLanguagesInput = () => {
  if (localFilters.value.languagesInput) {
    localFilters.value.languages = localFilters.value.languagesInput
      .split(',')
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0)
  } else {
    localFilters.value.languages = []
  }
  emit('update:filters', localFilters.value)
}

const removeLanguage = (index: number) => {
  localFilters.value.languages.splice(index, 1)
  localFilters.value.languagesInput = localFilters.value.languages.join(', ')
  emit('update:filters', localFilters.value)
}

const handleReset = () => {
  localFilters.value = {
    search: '',
    userType: 'all',
    specialty: '',
    treatment: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    country: '',
    city: '',
    languages: [],
    languagesInput: '',
    isRecruiting: '',
    isOpenForRecruitment: '',
    sortBy: 'rating',
    sortOrder: 'desc',
  }
  emit('update:filters', localFilters.value)
  emit('reset')
}
</script>

<style lang="scss" scoped>
.search-filters {
  padding: 3rem;
  position: sticky;
  top: 10rem;
  background: #ffffff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-line);
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--secondary);
  }

  &__reset-link {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--primary);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__label {
    display: block;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--secondary);
  }

  &__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__search-icon {
    position: absolute;
    left: 1.2rem;
    width: 1.8rem;
    height: 1.8rem;
    color: var(--primary);
    pointer-events: none;
  }

  &__input {
    width: 100%;
    padding: 1.2rem 1.5rem;
    padding-left: 4rem;
    border: 1px solid var(--border-line);
    border-radius: 0.8rem;
    background: #ffffff;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    outline: none;
    color: var(--text-dark);

    &::placeholder {
      color: var(--slate-blue);
      opacity: 0.6;
    }

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(19, 88, 216, 0.1);
    }

    &--small {
      padding-left: 1.5rem;
    }
  }

  &__select {
    width: 100%;
    padding: 1.2rem 1.5rem;
    border: 1px solid var(--border-line);
    border-radius: 0.8rem;
    background: #ffffff;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    outline: none;
    cursor: pointer;
    color: var(--text-dark);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23547593'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1.2rem center;
    background-size: 1.6rem;

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(19, 88, 216, 0.1);
    }

    &--margin {
      margin-bottom: 1rem;
    }
  }

  &__price-range {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  &__actions {
    padding-top: 3rem;
    border-top: 1px solid var(--border-line);
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__button {
    width: 100%;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: var(--primary);
    color: white;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    font-weight: 500;
  }

  &__tag-remove {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.6rem;
    line-height: 1;
    padding: 0;
    margin-left: 0.25rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>

