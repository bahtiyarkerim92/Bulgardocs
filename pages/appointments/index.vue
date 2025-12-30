<template>
  <div class="appointments-page min-h-screen py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-3xl font-bold mb-6">My Appointments</h1>

      <div v-if="loading" class="text-center py-12">
        <div class="spinner">Loading...</div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <div v-else>
        <!-- Filter Tabs -->
        <div class="flex gap-2 mb-6 border-b">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'px-4 py-2 font-medium transition',
              activeFilter === filter.value
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            {{ filter.label }}
            <span v-if="filter.count !== undefined" class="ml-2 text-sm">
              ({{ filter.count }})
            </span>
          </button>
        </div>

        <!-- Appointments List -->
        <div v-if="filteredAppointments.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg mb-4">No appointments found.</p>
          <NuxtLink
            to="/search"
            class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Find a Doctor or Clinic
          </NuxtLink>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="appointment in filteredAppointments"
            :key="appointment._id"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-4 mb-3">
                  <div>
                    <h3 class="text-xl font-semibold">
                      {{ getProviderName(appointment) }}
                    </h3>
                    <p v-if="getProviderSpecialty(appointment)" class="text-gray-600 text-sm">
                      {{ getProviderSpecialty(appointment) }}
                    </p>
                  </div>
                  <span :class="statusBadgeClass(appointment.status)" class="px-3 py-1 rounded-full text-xs font-semibold">
                    {{ appointment.status.toUpperCase() }}
                  </span>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p class="text-gray-500">Date</p>
                    <p class="font-semibold">{{ formatDate(appointment.date) }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Time</p>
                    <p class="font-semibold">{{ formatTime(appointment.slot) }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Duration</p>
                    <p class="font-semibold">{{ appointment.plan }} min</p>
                  </div>
                  <div v-if="appointment.reason">
                    <p class="text-gray-500">Reason</p>
                    <p class="font-semibold truncate">{{ appointment.reason }}</p>
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <NuxtLink
                  :to="`/appointments/${appointment._id}`"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                >
                  View Details
                </NuxtLink>
                <button
                  v-if="appointment.status === 'confirmed' && appointment.meetingUrl"
                  @click="window.open(appointment.meetingUrl, '_blank')"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                >
                  Join Meeting
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="mt-6 flex justify-center">
          <div class="flex gap-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page === 1"
              class="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span class="px-4 py-2">
              Page {{ pagination.page }} of {{ pagination.pages }}
            </span>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page === pagination.pages"
              class="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
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
import { ref, computed, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

const { appointments } = useApi()

const loading = ref(true)
const error = ref<string | null>(null)
const allAppointments = ref<any[]>([])
const activeFilter = ref<string>('all')
const pagination = ref({
  page: 1,
  pages: 1,
  total: 0,
  limit: 10,
})

const filters = computed(() => [
  { value: 'all', label: 'All', count: allAppointments.value.length },
  { value: 'pending', label: 'Pending', count: allAppointments.value.filter(a => a.status === 'pending').length },
  { value: 'confirmed', label: 'Confirmed', count: allAppointments.value.filter(a => a.status === 'confirmed').length },
  { value: 'completed', label: 'Completed', count: allAppointments.value.filter(a => a.status === 'completed').length },
  { value: 'cancelled', label: 'Cancelled', count: allAppointments.value.filter(a => a.status === 'cancelled').length },
])

const filteredAppointments = computed(() => {
  if (activeFilter.value === 'all') {
    return allAppointments.value
  }
  return allAppointments.value.filter(a => a.status === activeFilter.value)
})

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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

const getProviderName = (appointment: any) => {
  if (appointment.clinicId) {
    return typeof appointment.clinicId === 'object' 
      ? appointment.clinicId.name 
      : 'Clinic'
  }
  if (appointment.doctorId) {
    return typeof appointment.doctorId === 'object' 
      ? appointment.doctorId.name 
      : 'Doctor'
  }
  return 'Unknown Provider'
}

const getProviderSpecialty = (appointment: any) => {
  if (appointment.doctorId && typeof appointment.doctorId === 'object') {
    return appointment.doctorId.specialties?.join(', ')
  }
  return null
}

const loadAppointments = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await appointments.getAll()
    const data = response.data || response

    if (Array.isArray(data)) {
      allAppointments.value = data.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    } else if (data.pagination) {
      allAppointments.value = data.data || []
      pagination.value = data.pagination
    } else {
      allAppointments.value = []
    }
  } catch (err: any) {
    error.value = err.message || 'Error loading appointments'
    console.error('Error loading appointments:', err)
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  pagination.value.page = page
  loadAppointments()
}

onMounted(() => {
  loadAppointments()
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

