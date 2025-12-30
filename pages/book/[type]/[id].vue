<template>
  <div class="booking-page min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-red-800 font-medium">{{ error }}</p>
        </div>
      </div>

      <div v-else-if="provider">
        <!-- Header -->
        <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 mb-8">
          <h1 class="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Book Video Consultation
          </h1>
          <div class="flex items-center gap-6">
            <img
              v-if="provider.photoUrl"
              :src="provider.photoUrl"
              :alt="provider.name"
              class="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/50 shadow-lg"
            />
            <div v-else class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ring-4 ring-white/50 shadow-lg">
              <span class="text-4xl">{{ providerType === 'doctor' ? '👨‍⚕️' : '🏥' }}</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ provider.name }}</h2>
              <p v-if="providerType === 'doctor' && provider.specialties" class="text-gray-600 mt-1">
                {{ provider.specialties.join(', ') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Booking Form -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
          <form @submit.prevent="submitBooking" class="space-y-8">
            <!-- Date Selection -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Select Date
              </label>
              <input
                v-model="selectedDate"
                type="date"
                :min="minDate"
                :max="maxDate"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                @change="loadAvailableSlots"
              />
            </div>

            <!-- Time Slot Selection -->
            <div v-if="availableSlots.length > 0">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Select Time
              </label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  v-for="slot in availableSlots"
                  :key="slot"
                  type="button"
                  :class="[
                    'px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200',
                    selectedSlot === slot
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
                  ]"
                  @click="selectedSlot = slot"
                >
                  {{ formatTime(slot) }}
                </button>
              </div>
            </div>
            <div v-else-if="selectedDate && !loadingSlots" class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <span>No available slots for this date. Please select another date.</span>
              </div>
            </div>

            <!-- Consultation Plan -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Consultation Plan
              </label>
              <select
                v-model="selectedPlan"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
              >
                <option value="15">15 minutes - €50</option>
                <option value="30">30 minutes - €80</option>
                <option value="45">45 minutes - €110</option>
                <option value="60">60 minutes - €140</option>
              </select>
            </div>

            <!-- Reason for Consultation -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Reason for Consultation
              </label>
              <textarea
                v-model="reason"
                rows="4"
                placeholder="Please describe your reason for consultation..."
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 resize-none"
              ></textarea>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Additional Notes (Optional)
              </label>
              <textarea
                v-model="notes"
                rows="3"
                placeholder="Any additional information..."
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex gap-4 pt-4">
              <button
                type="submit"
                :disabled="!canSubmit || submitting"
                class="flex-1 group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                <span v-if="!submitting" class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Book Appointment
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Booking...
                </span>
              </button>
              <NuxtLink
                :to="`/profile/${providerType}/${providerId}`"
                class="px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700"
              >
                Cancel
              </NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { $fetch } = useNuxtApp()
const { appointments } = useApi()

const providerType = computed(() => route.params.type as string)
const providerId = computed(() => route.params.id as string)

const loading = ref(true)
const error = ref<string | null>(null)
const provider = ref<any>(null)
const selectedDate = ref('')
const selectedSlot = ref('')
const selectedPlan = ref('30')
const reason = ref('')
const notes = ref('')
const availableSlots = ref<string[]>([])
const loadingSlots = ref(false)
const submitting = ref(false)

const minDate = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() + 1) // Tomorrow
  return today.toISOString().split('T')[0]
})

const maxDate = computed(() => {
  const max = new Date()
  max.setDate(max.getDate() + 90) // 90 days from now
  return max.toISOString().split('T')[0]
})

const canSubmit = computed(() => {
  return selectedDate.value && selectedSlot.value && selectedPlan.value && reason.value.trim()
})

const loadProvider = async () => {
  try {
    loading.value = true
    error.value = null

    const endpoint = providerType.value === 'clinic' 
      ? `/api/clinics/${providerId.value}`
      : `/api/doctors/${providerId.value}`
    
    const response = await $fetch(endpoint)
    provider.value = response.data || response

    if (provider.value.subscriptionStatus !== 'active') {
      error.value = 'This provider is not currently accepting appointments.'
    }
  } catch (err: any) {
    error.value = err.message || 'Error loading provider information'
    console.error('Error loading provider:', err)
  } finally {
    loading.value = false
  }
}

const loadAvailableSlots = async () => {
  if (!selectedDate.value) return

  try {
    loadingSlots.value = true
    selectedSlot.value = ''

    const endpoint = providerType.value === 'clinic'
      ? `/api/availability/clinic/${providerId.value}?date=${selectedDate.value}`
      : `/api/availability/doctor/${providerId.value}?date=${selectedDate.value}`
    
    const response = await $fetch(endpoint)
    const availability = response.data || response

    // Extract available slots from the availability data
    if (Array.isArray(availability) && availability.length > 0) {
      const dayAvailability = availability.find((a: any) => 
        new Date(a.date).toISOString().split('T')[0] === selectedDate.value
      )
      availableSlots.value = dayAvailability?.slots?.filter((s: any) => !s.booked)?.map((s: any) => s.time) || []
    } else {
      availableSlots.value = []
    }
  } catch (err: any) {
    console.error('Error loading available slots:', err)
    availableSlots.value = []
  } finally {
    loadingSlots.value = false
  }
}

const formatTime = (time: string) => {
  // Format time string (e.g., "09:00" -> "9:00 AM")
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

const submitBooking = async () => {
  if (!canSubmit.value || submitting.value) return

  try {
    submitting.value = true

    const appointmentData = {
      [providerType.value === 'clinic' ? 'clinicId' : 'doctorId']: providerId.value,
      date: selectedDate.value,
      slot: selectedSlot.value,
      plan: selectedPlan.value,
      reason: reason.value.trim(),
      notes: notes.value.trim() || undefined,
    }

    const response = await appointments.create(appointmentData)

    // Redirect to appointment confirmation page
    router.push(`/appointments/${response.data?._id || response._id}?booked=true`)
  } catch (err: any) {
    error.value = err.message || 'Error booking appointment'
    console.error('Error booking appointment:', err)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadProvider()
})
</script>

<style scoped>
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

