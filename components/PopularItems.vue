<template>
  <section class="popular-items bg-alice-blue">
    <div class="container">
        <div class="section-intro">
          <h2 class="section-title text-white">{{ $t('components.popularItems.title') }}</h2>
          <p class="section-description text-white opacity-80">
            {{ $t('components.popularItems.description') }}
          </p>
        </div>

        <div v-if="loading" class="popular-items__loading">
          <div class="popular-items__spinner"></div>
        </div>

        <div v-else-if="error" class="popular-items__error">
          <p>{{ error }}</p>
        </div>

        <div v-else class="popular-items__grid">
          <!-- Debug info (remove later) -->
          <div v-if="totalItems !== 6" class="popular-items__debug" style="grid-column: 1 / -1; padding: 1rem; background: yellow; color: black; margin-bottom: 1rem;">
            Debug: Treatments: {{ items.treatments.length }}, Doctors: {{ doctors.length }}, Clinics: {{ clinics.length }}, Total: {{ totalItems }}
          </div>
          
          <!-- Treatments -->
          <TreatmentCard
            v-for="(item, index) in items.treatments"
            :key="`treatment-${index}`"
            :treatment="item.treatment"
            :provider="item.provider"
            :provider-type="item.providerType"
          />

          <!-- Doctors -->
          <DoctorCard
            v-for="(doctor, index) in doctors"
            :key="`doctor-${index}`"
            :doctor="doctor"
          />

          <!-- Clinics -->
          <ClinicCard
            v-for="(clinic, index) in clinics"
            :key="`clinic-${index}`"
            :clinic="clinic"
          />
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TreatmentCard from '~/components/search/TreatmentCard.vue'
import DoctorCard from '~/components/search/DoctorCard.vue'
import ClinicCard from '~/components/search/ClinicCard.vue'

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || 'http://localhost:3030'

const loading = ref(true)
const error = ref<string | null>(null)
const items = ref({
  treatments: [] as any[],
  providers: [] as any[],
})

const doctors = computed(() => {
  const filtered = items.value.providers.filter((provider: any) => provider.specialties && provider.specialties.length > 0)
  console.log('Doctors computed:', filtered.length, 'from', items.value.providers.length)
  return filtered
})

const clinics = computed(() => {
  const filtered = items.value.providers.filter((provider: any) => !provider.specialties || provider.specialties.length === 0)
  console.log('Clinics computed:', filtered.length, 'from', items.value.providers.length)
  return filtered
})

const totalItems = computed(() => {
  return items.value.treatments.length + doctors.value.length + clinics.value.length
})

const fetchPopularItems = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await $fetch(`${baseUrl}/api/popular`)
    const responseData = response.data || response
    
    items.value = {
      treatments: responseData.treatments || [],
      providers: responseData.providers || [],
    }
    
    console.log('Popular items received:', {
      treatments: items.value.treatments.length,
      providers: items.value.providers.length,
      total: items.value.treatments.length + items.value.providers.length
    })
  } catch (err: any) {
    error.value = err.message || 'Error loading popular items'
    console.error('Error fetching popular items:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPopularItems()
})
</script>

<style lang="scss" scoped>
.popular-items {
  padding: 12rem 2rem;
  position: relative;
  overflow: hidden;

  .section-intro {
    text-align: center;
    margin-bottom: 6rem;
    padding: 0 2rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 2;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 2rem;
    color: var(--secondary);
  }

  .section-description {
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    color: var(--slate-blue);
  }

  &__loading {
    text-align: center;
    padding: 5rem 0;
  }

  &__spinner {
    width: 4rem;
    height: 4rem;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  &__error {
    text-align: center;
    padding: 3rem;
    color: var(--secondary);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 1rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>

