<template>
  <div class="treatment-card card-apple" @click.stop="openModal">
    <div class="treatment-card__image-wrapper">
      <img
        v-if="treatment?.photos && treatment.photos.length > 0"
        :src="treatment.photos[0]"
        :alt="treatment?.name || 'Treatment'"
        class="treatment-card__image"
      />
      <div v-else class="treatment-card__placeholder">
        <span class="treatment-card__emoji">🏥</span>
      </div>
      <div v-if="providerRating && providerRating > 0" class="treatment-card__rating-badge">
        <svg class="treatment-card__star-icon" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
        <span>{{ providerRating ? providerRating.toFixed(1) : '0.0' }}</span>
      </div>
    </div>

    <div class="treatment-card__content">
      <div class="treatment-card__header">
        <h3 class="treatment-card__name">{{ treatment?.name || $t('cards.unknownTreatment') }}</h3>
        <div class="treatment-card__provider">
          <span class="treatment-card__provider-type">{{ $t(`cards.providerType.${providerType}`) }}</span>
          <span class="treatment-card__provider-name">{{ providerName }}</span>
        </div>
        <div v-if="provider?.belongsToAgency || provider?.agencyId" class="treatment-card__agency-badge">
          <svg class="treatment-card__agency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{{ $t('cards.managedBy') }} {{ provider?.agencyName || $t('cards.agency') }}</span>
        </div>
      </div>

      <div v-if="treatment?.category" class="treatment-card__category">
        {{ treatment.category }}
      </div>

      <div v-if="treatment?.description" class="treatment-card__description">
        {{ truncateDescription(treatment.description) }}
      </div>

      <div class="treatment-card__details">
        <div v-if="treatment?.duration" class="treatment-card__detail">
          <svg class="treatment-card__detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>{{ treatment.duration }}</span>
        </div>
        <div v-if="providerLocation" class="treatment-card__detail">
          <svg class="treatment-card__detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>{{ providerLocation }}</span>
        </div>
      </div>

      <div class="treatment-card__footer">
        <div class="treatment-card__price">
          <span class="treatment-card__price-amount">{{ formatPrice(treatment?.price || 0, treatment?.currency || 'EUR') }}</span>
          <span v-if="treatment?.duration" class="treatment-card__price-duration">/ {{ treatment.duration }}</span>
        </div>
        <div class="treatment-card__view-button">
          {{ $t('cards.viewDetails') }}
          <svg class="treatment-card__arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for expanded view -->
  <Teleport to="body">
    <div
      v-if="showModal"
      class="treatment-modal-overlay"
      @click.self="closeModal"
    >
      <div class="treatment-modal">
        <button class="treatment-modal__close" @click="closeModal">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="treatment-modal__content">
          <div class="treatment-modal__images">
            <img
              v-if="treatment?.photos && treatment.photos.length > 0"
              :src="treatment.photos[0]"
              :alt="treatment?.name || 'Treatment'"
              class="treatment-modal__main-image"
            />
            <div v-else class="treatment-modal__placeholder">
              <span class="treatment-modal__emoji">🏥</span>
            </div>
          </div>

          <div class="treatment-modal__info">
            <div class="treatment-modal__header">
              <h2 class="treatment-modal__title">{{ treatment?.name || $t('cards.unknownTreatment') }}</h2>
              <div class="treatment-modal__provider">
                <span class="treatment-modal__provider-type">{{ $t(`cards.providerType.${providerType}`) }}</span>
                <span class="treatment-modal__provider-name">{{ providerName }}</span>
              </div>
              <div v-if="provider?.belongsToAgency || provider?.agencyId" class="treatment-modal__agency-badge">
                <svg class="treatment-modal__agency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{{ $t('cards.managedBy') }} {{ provider?.agencyName || $t('cards.agency') }}</span>
              </div>
            </div>

            <div v-if="providerRating && providerRating > 0" class="treatment-modal__rating">
              <div class="treatment-modal__rating-stars">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="treatment-modal__star"
                  :class="{ 'treatment-modal__star--filled': i <= Math.round(providerRating) }"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              </div>
              <span class="treatment-modal__rating-value">{{ providerRating ? providerRating.toFixed(1) : '0.0' }}</span>
            </div>

            <div class="treatment-modal__price-section">
              <div class="treatment-modal__price">
                <span class="treatment-modal__price-amount">{{ formatPrice(treatment?.price || 0, treatment?.currency || 'EUR') }}</span>
                <span v-if="treatment?.duration" class="treatment-modal__price-duration">/ {{ treatment.duration }}</span>
              </div>
            </div>

            <div v-if="treatment?.category" class="treatment-modal__category">
              <strong>{{ $t('cards.category') }}:</strong> {{ treatment.category }}
            </div>

            <div v-if="treatment?.description" class="treatment-modal__description">
              <h3>{{ $t('cards.description') }}</h3>
              <p>{{ treatment.description }}</p>
            </div>

            <div v-if="treatment?.includedServices && treatment.includedServices.length > 0" class="treatment-modal__services">
              <h3>{{ $t('cards.includedServices') }}</h3>
              <ul>
                <li v-for="(service, index) in treatment.includedServices" :key="index">
                  {{ service }}
                </li>
              </ul>
            </div>

            <div v-if="treatment?.excludedServices && treatment.excludedServices.length > 0" class="treatment-modal__services">
              <h3>{{ $t('cards.excludedServices') }}</h3>
              <ul>
                <li v-for="(service, index) in treatment.excludedServices" :key="index">
                  {{ service }}
                </li>
              </ul>
            </div>

            <div v-if="treatment?.preparationRequired" class="treatment-modal__preparation">
              <h3>{{ $t('cards.preparationRequired') }}</h3>
              <p>{{ treatment.preparationRequired }}</p>
            </div>

            <div v-if="treatment?.recoveryTime" class="treatment-modal__recovery">
              <h3>{{ $t('cards.recoveryTime') }}</h3>
              <p>{{ treatment.recoveryTime }}</p>
            </div>

            <div v-if="providerLocation" class="treatment-modal__location">
              <h3>{{ $t('cards.location') }}</h3>
              <p>{{ providerLocation }}</p>
            </div>

            <div class="treatment-modal__actions">
              <NuxtLink
                v-if="treatment?.id || treatment?._id"
                :to="`/book/treatment/${treatment.id || treatment._id}`"
                class="treatment-modal__book-button btn-apple btn-apple--primary"
                @click="closeModal"
              >
                {{ $t('cards.bookNow') }}
              </NuxtLink>
              <NuxtLink
                v-if="provider?._id"
                :to="providerLink"
                class="treatment-modal__profile-button btn-apple btn-apple--outline"
                @click="closeModal"
              >
                {{ $t('cards.viewProviderProfile', { type: $t(`cards.providerType.${providerType}`) }) }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  treatment: any
  provider: any
  providerType: 'doctor' | 'clinic'
}>()

const showModal = ref(false)

const providerName = computed(() => props.provider?.name || 'Unknown')
const providerRating = computed(() => {
  const rating = props.provider?.rating?.average
  return rating && rating > 0 ? rating : null
})
const providerLocation = computed(() => {
  if (!props.provider?.address) return null
  const parts = [props.provider.address.city, props.provider.address.country?.name].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : null
})

const providerLink = computed(() => {
  if (props.providerType === 'doctor') {
    return `/profile/doctor/${props.provider._id}`
  }
  return `/profile/clinic/${props.provider._id}`
})

const truncateDescription = (text: string | undefined, maxLength = 100) => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
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

const openModal = () => {
  showModal.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeModal = () => {
  showModal.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}
</script>

<style lang="scss" scoped>
.treatment-card {
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 480px;
  position: relative;
  overflow: hidden;

  &__image-wrapper {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    background: var(--alice-blue);
    flex-shrink: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover &__image {
    transform: scale(1.08);
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__emoji {
    font-size: 4rem;
  }

  &__rating-badge {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 0.5rem 1rem;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.4rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__star-icon {
    width: 1.4rem;
    height: 1.4rem;
    color: #ff9500;
    fill: currentColor;
  }

  &__content {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
  }

  &__header {
    margin-bottom: 1.5rem;
  }

  &__name {
    font-size: 2rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 0.8rem;
  }

  &__provider {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
  }

  &__provider-type {
    text-transform: capitalize;
    color: var(--slate-blue);
    font-weight: 500;
  }

  &__provider-name {
    color: var(--primary);
    font-weight: 600;
  }

  &__agency-badge {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #5856d6;
    background: #e8e8f5;
    padding: 0.6rem 1.2rem;
    border-radius: 0.8rem;
    width: fit-content;
    margin-top: 0.8rem;
  }

  &__agency-icon {
    width: 1.6rem;
    height: 1.6rem;
    flex-shrink: 0;
  }

  &__category {
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    background: var(--alice-blue);
    color: var(--primary);
    border-radius: 0.8rem;
    margin-bottom: 1.5rem;
  }

  &__description {
    font-size: 1.4rem;
    color: var(--slate-blue);
    line-height: 1.6;
    margin-bottom: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__details {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;
    font-size: 1.4rem;
    color: var(--slate-blue);
  }

  &__detail {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__detail-icon {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--slate-blue);
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 2rem;
    border-top: 1px solid var(--border-line);
    margin-top: auto;
  }

  &__price {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
  }

  &__price-amount {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--secondary);
  }

  &__price-duration {
    font-size: 1.4rem;
    color: var(--slate-blue);
  }

  &__view-button {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary);
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    transition: all 0.3s ease;
    padding: 0.8rem 1.6rem;
    background: var(--alice-blue);
    border-radius: 0.8rem;

    &:hover {
      background: var(--primary);
      color: #ffffff;
      
      .treatment-card__arrow-icon {
        transform: translateX(4px);
      }
    }
  }

  &__arrow-icon {
    width: 1.6rem;
    height: 1.6rem;
    transition: transform 0.3s ease;
  }
}

// Modal Styles
.treatment-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.treatment-modal {
  background: #ffffff;
  border-radius: 2rem;
  max-width: 90rem;
  width: 100%;
  height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  &__close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--secondary);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    flex: 1;
    overflow-y: auto;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1.2fr;
    }
  }

  &__images {
    position: relative;
    background: var(--alice-blue);
  }

  &__main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__info {
    padding: 4rem;
    overflow-y: auto;
  }

  &__title {
    font-size: 3.2rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 1rem;
  }

  &__provider {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }

  &__provider-name {
    color: var(--primary);
    font-weight: 700;
  }

  &__agency-badge {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: #5856d6;
    background: #e8e8f5;
    padding: 0.8rem 1.5rem;
    border-radius: 0.8rem;
    width: fit-content;
    margin-top: 1rem;
  }

  &__agency-icon {
    width: 1.8rem;
    height: 1.8rem;
    flex-shrink: 0;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  &__star {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--border-line);
    fill: currentColor;

    &--filled {
      color: #ff9500;
    }
  }

  &__price-section {
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--border-line);
  }

  &__price-amount {
    font-size: 3.6rem;
    font-weight: 700;
    color: var(--secondary);
  }

  &__description,
  &__services,
  &__preparation,
  &__recovery,
  &__location {
    margin-bottom: 3rem;

    h3 {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 1.5rem;
    }

    p, li {
      color: var(--slate-blue);
      line-height: 1.7;
      font-size: 1.5rem;
    }
  }

  &__actions {
    display: flex;
    gap: 2rem;
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid var(--border-line);
  }

  &__book-button {
    flex: 1;
  }

  &__profile-button {
    flex: 1;
  }
}
</style>

