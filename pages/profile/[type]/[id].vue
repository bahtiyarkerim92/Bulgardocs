<template>
  <div class="profile-page">
    <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
      <div class="spinner">Loading...</div>
    </div>

    <div v-else-if="error" class="container mx-auto px-4 py-8 text-center text-red-500">
      {{ error }}
    </div>

    <div v-else-if="profile" class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Profile Header -->
      <div class="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 mb-8">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="relative flex-shrink-0 mx-auto md:mx-0">
            <img
              v-if="profile.photoUrl"
              :src="profile.photoUrl"
              :alt="profile.name"
              class="w-40 h-40 rounded-3xl object-cover ring-4 ring-white/50 shadow-xl"
            />
            <div v-else class="w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ring-4 ring-white/50 shadow-xl">
              <span class="text-6xl">{{ profileType === 'doctor' ? '👨‍⚕️' : '🏥' }}</span>
            </div>
            <div v-if="profile.subscriptionStatus === 'active'" class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full ring-4 ring-white flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <div class="flex-1 text-center md:text-left">
            <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {{ profile.name }}
            </h1>
            
            <div v-if="profileType === 'doctor' && profile.specialties" class="mb-4">
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <span
                  v-for="specialty in profile.specialties"
                  :key="specialty"
                  class="text-sm font-medium px-3 py-1.5 bg-white/80 backdrop-blur-sm text-blue-700 rounded-full border border-blue-200/50"
                >
                  {{ specialty }}
                </span>
              </div>
            </div>

            <div v-if="profile.rating" class="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span class="ml-2 text-xl font-bold text-gray-900">{{ profile.rating.average?.toFixed(1) || 0 }}</span>
              </div>
              <span class="text-gray-600">
                ({{ profile.rating.count || 0 }} reviews)
              </span>
            </div>

            <div v-if="profile.address" class="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-6">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-lg">{{ formatAddress(profile.address) }}</span>
            </div>

            <div v-if="profile.subscriptionStatus === 'active'" class="flex gap-4 justify-center md:justify-start">
              <NuxtLink
                :to="`/book/${profileType}/${profile._id}`"
                class="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Book Video Consultation
                <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>
            <div v-else class="flex items-center justify-center md:justify-start gap-2 text-amber-600 bg-amber-50/50 px-4 py-2.5 rounded-xl border border-amber-200/50">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm font-medium">Contact information available after subscription</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bio -->
      <div v-if="profile.bio" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-8 mb-8">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">About</h2>
        <p class="text-gray-700 leading-relaxed text-lg">{{ profile.bio }}</p>
      </div>

      <!-- Treatments -->
      <div v-if="profile.treatments && profile.treatments.length > 0" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-8 mb-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Treatments & Prices</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TreatmentCard
            v-for="treatment in profile.treatments"
            :key="treatment._id || treatment.name"
            :treatment="treatment"
          />
        </div>
      </div>

      <!-- Contact Information (only if subscribed) -->
      <div v-if="profile.subscriptionStatus === 'active'" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-8 mb-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
        <div class="space-y-4">
          <div v-if="profile.email" class="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium text-gray-900">{{ profile.email }}</p>
            </div>
          </div>
          <div v-if="profile.phone" class="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p class="font-medium text-gray-900">{{ profile.phone }}</p>
            </div>
          </div>
          <div v-if="profile.website" class="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            </svg>
            <div>
              <p class="text-sm text-gray-500">Website</p>
              <a :href="profile.website" target="_blank" class="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                {{ profile.website }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div v-if="profile.languages && profile.languages.length > 0" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-8 mb-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Languages</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="lang in profile.languages"
            :key="lang"
            class="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200/50"
          >
            {{ lang }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { $fetch } = useNuxtApp()

const loading = ref(true)
const error = ref<string | null>(null)
const profile = ref<any>(null)

const profileType = computed(() => route.params.type as string)

const formatAddress = (address: any) => {
  if (!address) return ''
  const parts = [
    address.street,
    address.number,
    address.city,
    address.country?.name,
  ].filter(Boolean)
  return parts.join(', ')
}

onMounted(async () => {
  const { type, id } = route.params

  try {
    loading.value = true
    const endpoint = type === 'doctor' ? '/api/doctors' : '/api/clinics'
    const response = await $fetch(`${endpoint}/${id}`)
    profile.value = response.data || response
  } catch (err: any) {
    error.value = err.message || 'Error loading profile'
    console.error('Profile error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
}
</style>

