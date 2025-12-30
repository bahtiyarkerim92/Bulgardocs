<template>
  <div class="appointment-detail-page min-h-screen py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <div v-if="loading" class="text-center py-12">
        <div class="spinner">Loading...</div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-800">{{ error }}</p>
        <NuxtLink to="/" class="text-blue-600 hover:underline mt-2 inline-block">
          Return to Home
        </NuxtLink>
      </div>

      <div v-else-if="appointment">
        <!-- Success Message (if just booked) -->
        <div v-if="isNewBooking" class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div class="flex items-center gap-3">
            <span class="text-3xl">✅</span>
            <div>
              <h2 class="text-xl font-semibold text-green-800">Appointment Booked Successfully!</h2>
              <p class="text-green-700">Your video consultation has been scheduled.</p>
            </div>
          </div>
        </div>

        <!-- Appointment Details Card -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 class="text-3xl font-bold mb-6">Appointment Details</h1>

          <!-- Status Badge -->
          <div class="mb-6">
            <span :class="statusBadgeClass(appointment.status)" class="px-4 py-2 rounded-full text-sm font-semibold">
              {{ appointment.status.toUpperCase() }}
            </span>
          </div>

          <!-- Provider Info -->
          <div class="flex items-center gap-4 mb-6 pb-6 border-b">
            <img
              v-if="provider?.photoUrl"
              :src="provider.photoUrl"
              :alt="provider.name"
              class="w-20 h-20 rounded-full object-cover"
            />
            <div v-else class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-3xl">{{ providerType === 'doctor' ? '👨‍⚕️' : '🏥' }}</span>
            </div>
            <div>
              <h2 class="text-2xl font-semibold">{{ provider?.name || 'Loading...' }}</h2>
              <p v-if="providerType === 'doctor' && provider?.specialties" class="text-gray-600">
                {{ provider.specialties.join(', ') }}
              </p>
            </div>
          </div>

          <!-- Appointment Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Date</h3>
              <p class="text-lg font-semibold">{{ formatDate(appointment.date) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Time</h3>
              <p class="text-lg font-semibold">{{ formatTime(appointment.slot) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Duration</h3>
              <p class="text-lg font-semibold">{{ appointment.plan }} minutes</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Appointment ID</h3>
              <p class="text-sm font-mono text-gray-600">{{ appointment._id }}</p>
            </div>
          </div>

          <!-- Reason -->
          <div v-if="appointment.reason" class="mb-6">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Reason for Consultation</h3>
            <p class="text-gray-700">{{ appointment.reason }}</p>
          </div>

          <!-- Notes -->
          <div v-if="appointment.notes" class="mb-6">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Additional Notes</h3>
            <p class="text-gray-700">{{ appointment.notes }}</p>
          </div>

          <!-- Video Consultation Link (if confirmed) -->
          <div v-if="appointment.status === 'confirmed' && appointment.meetingUrl" class="mb-6">
            <a
              :href="appointment.meetingUrl"
              target="_blank"
              class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Join Video Consultation
            </a>
          </div>

          <!-- Offer PDF (if available) -->
          <div v-if="appointment.offerPdfUrl" class="mb-6">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Treatment Offer</h3>
            <a
              :href="appointment.offerPdfUrl"
              target="_blank"
              class="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span>📄</span>
              <span>Download Treatment Offer PDF</span>
            </a>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-6 border-t">
            <button
              v-if="appointment.status === 'pending' || appointment.status === 'confirmed'"
              @click="cancelAppointment"
              :disabled="cancelling"
              class="px-6 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition disabled:opacity-50"
            >
              {{ cancelling ? 'Cancelling...' : 'Cancel Appointment' }}
            </button>
            <NuxtLink
              :to="`/profile/${providerType}/${appointment[providerType === 'clinic' ? 'clinicId' : 'doctorId']?._id || appointment[providerType === 'clinic' ? 'clinicId' : 'doctorId']}`"
              class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              View Provider Profile
            </NuxtLink>
            <NuxtLink
              to="/appointments"
              class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              My Appointments
            </NuxtLink>
          </div>
        </div>

        <!-- Important Information -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-semibold text-blue-900 mb-2">📋 Important Information</h3>
          <ul class="space-y-2 text-blue-800 text-sm">
            <li>• You will receive a confirmation email with meeting details</li>
            <li>• Please join the video consultation 5 minutes before the scheduled time</li>
            <li>• After the consultation, you will receive a treatment offer PDF if applicable</li>
            <li>• You can cancel this appointment up to 24 hours before the scheduled time</li>
          </ul>
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

const appointmentId = computed(() => route.params.id as string)
const isNewBooking = computed(() => route.query.booked === 'true')

const loading = ref(true)
const error = ref<string | null>(null)
const appointment = ref<any>(null)
const provider = ref<any>(null)
const providerType = ref<'doctor' | 'clinic'>('doctor')
const cancelling = ref(false)

const statusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

const loadAppointment = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await appointments.getById(appointmentId.value)
    appointment.value = response.data || response

    // Determine provider type and load provider info
    if (appointment.value.clinicId) {
      providerType.value = 'clinic'
      const clinicId = typeof appointment.value.clinicId === 'object' 
        ? appointment.value.clinicId._id 
        : appointment.value.clinicId
      const clinicResponse = await $fetch(`/api/clinics/${clinicId}`)
      provider.value = clinicResponse.data || clinicResponse
    } else if (appointment.value.doctorId) {
      providerType.value = 'doctor'
      const doctorId = typeof appointment.value.doctorId === 'object' 
        ? appointment.value.doctorId._id 
        : appointment.value.doctorId
      const doctorResponse = await $fetch(`/api/doctors/${doctorId}`)
      provider.value = doctorResponse.data || doctorResponse
    }
  } catch (err: any) {
    error.value = err.message || 'Error loading appointment'
    console.error('Error loading appointment:', err)
  } finally {
    loading.value = false
  }
}

const cancelAppointment = async () => {
  if (!confirm('Are you sure you want to cancel this appointment?')) {
    return
  }

  try {
    cancelling.value = true
    await appointments.cancel(appointmentId.value)
    
    // Reload appointment to get updated status
    await loadAppointment()
    
    alert('Appointment cancelled successfully')
  } catch (err: any) {
    error.value = err.message || 'Error cancelling appointment'
    console.error('Error cancelling appointment:', err)
  } finally {
    cancelling.value = false
  }
}

onMounted(() => {
  loadAppointment()
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

