<template>
  <div class="search-page">
    <div class="search-page__container">
      <div class="search-page__header">
        <h1 class="search-page__title">
          {{ $t('search.title', 'Search Doctors & Clinics') }}
        </h1>
        <p class="search-page__subtitle">{{ $t('search.subtitle') }}</p>
      </div>

      <div class="search-page__content">
        <!-- Filters Sidebar -->
        <aside class="search-page__sidebar">
          <div class="search-page__sidebar-sticky">
            <SearchFilters
              v-model:filters="filters"
              @search="performSearch"
              @reset="resetFilters"
            />
          </div>
        </aside>

        <!-- Results -->
        <div class="search-page__results">
          <div v-if="loading" class="search-page__loading">
            <div class="search-page__spinner"></div>
            <p class="search-page__loading-text">{{ $t('search.searching') }}</p>
          </div>

          <div v-else-if="error" class="search-page__error">
            <svg class="search-page__error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="search-page__error-text">{{ error }}</p>
          </div>

          <div v-else>
            <!-- Result Type Tabs -->
            <div class="search-page__tabs">
              <button
                @click="resultType = 'all'"
                :class="['search-page__tab', { 'search-page__tab--active': resultType === 'all' }]"
              >
                {{ $t('search.tabs.all') }}
                <span class="search-page__tab-count">{{ getTotalCount() }}</span>
              </button>
              <button
                @click="resultType = 'doctors'"
                :class="['search-page__tab', { 'search-page__tab--active': resultType === 'doctors' }]"
              >
                {{ $t('search.tabs.doctors') }}
                <span class="search-page__tab-count">{{ results.doctors?.length || 0 }}</span>
              </button>
              <button
                @click="resultType = 'clinics'"
                :class="['search-page__tab', { 'search-page__tab--active': resultType === 'clinics' }]"
              >
                {{ $t('search.tabs.clinics') }}
                <span class="search-page__tab-count">{{ results.clinics?.length || 0 }}</span>
              </button>
              <button
                @click="resultType = 'agencies'"
                :class="['search-page__tab', { 'search-page__tab--active': resultType === 'agencies' }]"
              >
                {{ $t('search.tabs.agencies') }}
                <span class="search-page__tab-count">{{ results.agencies?.length || 0 }}</span>
              </button>
              <button
                @click="resultType = 'treatments'"
                :class="['search-page__tab', { 'search-page__tab--active': resultType === 'treatments' }]"
              >
                {{ $t('search.tabs.treatments') }}
                <span class="search-page__tab-count">{{ results.treatments?.length || 0 }}</span>
              </button>
            </div>

            <!-- Search Results Summary -->
            <div class="search-page__summary">
              <div class="search-page__summary-content">
                <span class="search-page__summary-label">{{ $t('search.found') }}</span>
                <span class="search-page__summary-count">{{ getFilteredCount() }}</span>
                <span class="search-page__summary-label">{{ getResultTypeLabel() }}</span>
              </div>
            </div>

            <!-- Doctors Results -->
            <div v-if="shouldShowDoctors() && results.doctors && results.doctors.length > 0" class="search-page__section">
              <h2 class="search-page__section-title">
                <div class="search-page__section-indicator search-page__section-indicator--blue"></div>
                {{ $t('search.tabs.doctors') }}
              </h2>
              <div class="search-page__cards">
                <DoctorCard
                  v-for="doctor in results.doctors"
                  :key="doctor._id"
                  :doctor="doctor"
                />
              </div>
            </div>

            <!-- Clinics Results -->
            <div v-if="shouldShowClinics() && results.clinics && results.clinics.length > 0" class="search-page__section">
              <h2 class="search-page__section-title">
                <div class="search-page__section-indicator search-page__section-indicator--purple"></div>
                {{ $t('search.tabs.clinics') }}
              </h2>
              <div class="search-page__cards">
                <ClinicCard
                  v-for="clinic in results.clinics"
                  :key="clinic._id"
                  :clinic="clinic"
                />
              </div>
            </div>

            <!-- Agencies Results -->
            <div v-if="shouldShowAgencies() && results.agencies && results.agencies.length > 0" class="search-page__section">
              <h2 class="search-page__section-title">
                <div class="search-page__section-indicator search-page__section-indicator--orange"></div>
                {{ $t('search.tabs.agencies') }} ({{ results.agencies.length }})
              </h2>
              <div class="search-page__cards">
                <AgencyCard
                  v-for="agency in results.agencies"
                  :key="agency._id"
                  :agency="agency"
                />
              </div>
            </div>

            <!-- Treatments Results -->
            <div v-if="shouldShowTreatments() && results.treatments && results.treatments.length > 0" class="search-page__section">
              <h2 class="search-page__section-title">
                <div class="search-page__section-indicator search-page__section-indicator--green"></div>
                {{ $t('search.tabs.treatments') }} ({{ results.treatments.length }})
              </h2>
              <div class="search-page__cards">
                <TreatmentCard
                  v-for="(treatment, index) in results.treatments"
                  :key="treatment.id || treatment._id || `treatment-${index}`"
                  :treatment="treatment"
                  :provider="treatment.provider || {}"
                  :provider-type="treatment.providerType || 'doctor'"
                />
              </div>
            </div>

            <!-- No Results -->
            <div v-if="!loading && (!results.doctors || results.doctors.length === 0) && (!results.clinics || results.clinics.length === 0) && (!results.agencies || results.agencies.length === 0) && (!results.treatments || results.treatments.length === 0)" class="search-page__no-results">
              <div class="search-page__no-results-content">
                <svg class="search-page__no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <h3 class="search-page__no-results-title">{{ $t('search.noResults.title') }}</h3>
                <p class="search-page__no-results-text">{{ $t('search.noResults.text') }}</p>
                <button
                  @click="resetFilters"
                  class="search-page__reset-button"
                >
                  {{ $t('search.noResults.resetFilters') }}
                </button>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="results.pagination && results.pagination.pages > 1" class="search-page__pagination">
              <Pagination
                :current-page="results.pagination.page"
                :total-pages="results.pagination.pages"
                @page-change="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/composables/useApi'
import DoctorCard from '~/components/search/DoctorCard.vue'
import ClinicCard from '~/components/search/ClinicCard.vue'
import AgencyCard from '~/components/search/AgencyCard.vue'
import TreatmentCard from '~/components/search/TreatmentCard.vue'
import Pagination from '~/components/search/Pagination.vue'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || 'http://localhost:3030'

// $fetch is globally available in Nuxt 3

const loading = ref(false)
const error = ref<string | null>(null)
const results = ref<any>({
  doctors: [],
  clinics: [],
  agencies: [],
  treatments: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalDoctors: 0,
    totalClinics: 0,
    totalAgencies: 0,
    totalTreatments: 0,
    pages: 0,
  },
})

const filters = ref({
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
  languages: [] as string[],
  isRecruiting: '',
  isOpenForRecruitment: '',
  sortBy: 'rating',
  sortOrder: 'desc',
})

// Result type filter: 'all', 'doctors', 'clinics', 'agencies', 'treatments'
const resultType = ref<'all' | 'doctors' | 'clinics' | 'agencies' | 'treatments'>('all')

const performSearch = async (page = 1) => {
  loading.value = true
  error.value = null

  try {
    const queryParams: any = {
      page,
      limit: 20,
    }

    // Add filters to query
    Object.keys(filters.value).forEach((key) => {
      const value = filters.value[key as keyof typeof filters.value]
      if (value && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
        if (Array.isArray(value)) {
          queryParams[key] = value.join(',')
        } else {
          queryParams[key] = value
        }
      }
    })

    // If search is set but treatment is not, also search in treatments
    // This allows users to find treatments by typing in the main search field
    if (filters.value.search && !filters.value.treatment) {
      queryParams.treatment = filters.value.search
    }

    // Build query string
    const queryString = new URLSearchParams(queryParams as any).toString()
    
    // Use Nuxt's $fetch with full backend URL
    const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl || 'http://localhost:3030'
    
    const response = await $fetch(`${baseUrl}/api/search`, {
      method: 'GET',
      params: queryParams,
    })

    const responseData = response.data || response
    console.log('Search response:', responseData)
    console.log('Treatments:', responseData.treatments)
    console.log('Treatments count:', responseData.treatments?.length || 0)
    console.log('First treatment:', responseData.treatments?.[0])
    
    // Ensure treatments array exists
    if (!responseData.treatments) {
      responseData.treatments = []
    }
    
    results.value = responseData
  } catch (err: any) {
    error.value = err.message || 'Error performing search'
    console.error('Search error:', err)
  } finally {
    loading.value = false
  }
}

const resetFilters = () => {
  filters.value = {
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
    isRecruiting: '',
    isOpenForRecruitment: '',
    sortBy: 'rating',
    sortOrder: 'desc',
  }
  performSearch(1)
}

const formatPrice = (price: number, currency: string = 'EUR') => {
  if (!price || isNaN(price)) return '€0'
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  } catch (e) {
    return `${price} ${currency || 'EUR'}`
  }
}

const handlePageChange = (page: number) => {
  performSearch(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Helper functions for filtering results
const shouldShowDoctors = () => {
  return resultType.value === 'all' || resultType.value === 'doctors'
}

const shouldShowClinics = () => {
  return resultType.value === 'all' || resultType.value === 'clinics'
}

const shouldShowAgencies = () => {
  return resultType.value === 'all' || resultType.value === 'agencies'
}

const shouldShowTreatments = () => {
  return resultType.value === 'all' || resultType.value === 'treatments'
}

const getTotalCount = () => {
  return (results.value.doctors?.length || 0) + 
         (results.value.clinics?.length || 0) + 
         (results.value.agencies?.length || 0) + 
         (results.value.treatments?.length || 0)
}

const getFilteredCount = () => {
  if (resultType.value === 'all') {
    return getTotalCount()
  } else if (resultType.value === 'doctors') {
    return results.value.doctors?.length || 0
  } else if (resultType.value === 'clinics') {
    return results.value.clinics?.length || 0
  } else if (resultType.value === 'agencies') {
    return results.value.agencies?.length || 0
  } else if (resultType.value === 'treatments') {
    return results.value.treatments?.length || 0
  }
  return 0
}

const getResultTypeLabel = () => {
  const { t } = useI18n()
  if (resultType.value === 'all') {
    return t('search.resultLabels.results')
  } else if (resultType.value === 'doctors') {
    return t('search.resultLabels.doctors')
  } else if (resultType.value === 'clinics') {
    return t('search.resultLabels.clinics')
  } else if (resultType.value === 'agencies') {
    return t('search.resultLabels.agencies')
  } else if (resultType.value === 'treatments') {
    return t('search.resultLabels.treatments')
  }
  return t('search.resultLabels.results')
}

// Load initial search from query params
onMounted(() => {
  if (route.query.search) {
    filters.value.search = route.query.search as string
  }
  if (route.query.userType) {
    filters.value.userType = route.query.userType as string
  }
  if (route.query.page) {
    performSearch(parseInt(route.query.page as string))
  } else {
    performSearch(1)
  }
})
</script>

<style lang="scss" scoped>
.search-page {
  min-height: 100vh;
  padding: 3rem 0;
  padding-top: 10rem;

  &__container {
    max-width: 1350px;
    margin: 0 auto;
    padding: 0 4rem 0 6rem;
  }

  &__header {
    margin-bottom: 3rem;
    padding-top: 4rem;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #111827 0%, #1e40af 50%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.01em;
  }

  &__subtitle {
    font-size: 1.125rem;
    color: #6b7280;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 1024px) {
      grid-template-columns: 300px 1fr;
    }
  }

  &__sidebar {
    @media (min-width: 1024px) {
      position: relative;
    }
  }

  &__sidebar-sticky {
    @media (min-width: 1024px) {
      position: sticky;
      top: 2rem;
    }
  }

  &__results {
    min-width: 0;
  }

  &__loading {
    text-align: center;
    padding: 5rem 0;
  }

  &__spinner {
    width: 4rem;
    height: 4rem;
    border: 4px solid #dbeafe;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  &__loading-text {
    color: #6b7280;
    font-weight: 500;
  }

  &__error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
  }

  &__error-icon {
    width: 3rem;
    height: 3rem;
    color: #ef4444;
    margin: 0 auto 0.75rem;
  }

  &__error-text {
    color: #991b1b;
    font-weight: 500;
  }

  &__tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0;
  }

  &__tab {
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: -2px;

    &:hover {
      color: #2563eb;
    }

    &--active {
      color: #2563eb;
      border-bottom-color: #2563eb;
    }
  }

  &__tab-count {
    background: #e5e7eb;
    color: #6b7280;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  &__tab--active &__tab-count {
    background: #2563eb;
    color: white;
  }

  &__summary {
    margin-bottom: 1.5rem;
  }

  &__summary-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__summary-label {
    color: #6b7280;
    font-weight: 500;
  }

  &__summary-count {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }

  &__section {
    margin-bottom: 2.5rem;
  }

  &__section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__section-indicator {
    width: 4px;
    height: 2rem;
    border-radius: 9999px;

    &--blue {
      background: linear-gradient(180deg, #3b82f6 0%, #7c3aed 100%);
    }

    &--purple {
      background: linear-gradient(180deg, #7c3aed 0%, #ec4899 100%);
    }

    &--green {
      background: linear-gradient(180deg, #10b981 0%, #3b82f6 100%);
    }

    &--orange {
      background: linear-gradient(180deg, #f59e0b 0%, #ef4444 100%);
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__no-results {
    text-align: center;
    padding: 5rem 0;
  }

  &__no-results-content {
    max-width: 28rem;
    margin: 0 auto;
  }

  &__no-results-icon {
    width: 6rem;
    height: 6rem;
    color: #d1d5db;
    margin: 0 auto 1.5rem;
  }

  &__no-results-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  &__no-results-text {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }

  &__reset-button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    color: white;
    border-radius: 0.75rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  &__pagination {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
}
</style>

