<template>
  <NuxtLink :to="`/profile/doctor/${doctor._id}`" class="doctor-card-link">
    <div class="doctor-card card-apple">
      <div class="doctor-card__header">
        <div class="doctor-card__image-wrapper">
          <!-- Gallery or Profile Image -->
          <img
            v-if="primaryImage"
            :src="primaryImage"
            :alt="doctor.name"
            class="doctor-card__image"
            @error="handleImageError"
          />
          <div v-else class="doctor-card__placeholder">
            <span class="doctor-card__emoji">👨‍⚕️</span>
          </div>
          
          <!-- Gallery indicator -->
          <div v-if="hasGallery" class="doctor-card__gallery-badge">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ doctor.gallery?.length || 0 }}</span>
          </div>
          
          <div v-if="doctor.subscriptionStatus === 'active'" class="doctor-card__badge"></div>
        </div>

        <div class="doctor-card__content">
          <h3 class="doctor-card__name">
            {{ doctor.name }}
          </h3>
          
          <div v-if="doctor.specialties && doctor.specialties.length > 0" class="doctor-card__specialties">
            <span
              v-for="(specialty, idx) in doctor.specialties.slice(0, 2)"
              :key="idx"
              class="doctor-card__specialty"
            >
              {{ specialty }}
            </span>
            <span
              v-if="doctor.specialties.length > 2"
              class="doctor-card__specialty doctor-card__specialty--more"
            >
              +{{ doctor.specialties.length - 2 }}
            </span>
          </div>

          <div v-if="doctor.rating" class="doctor-card__rating">
            <div class="doctor-card__rating-stars">
              <svg class="doctor-card__star-icon" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span class="doctor-card__rating-value">{{ doctor.rating.average?.toFixed(1) || 0 }}</span>
            </div>
            <span class="doctor-card__rating-count">
              ({{ doctor.rating.count || 0 }})
            </span>
          </div>

          <div v-if="doctor.address" class="doctor-card__location">
            <svg class="doctor-card__location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>{{ [doctor.address.city, doctor.address.country?.name].filter(Boolean).join(', ') }}</span>
          </div>

          <div v-if="doctor.treatments && doctor.treatments.length > 0" class="doctor-card__treatments">
            <span class="doctor-card__treatments-count">{{ doctor.treatments.length }}</span> {{ $tc('cards.treatmentsAvailable', doctor.treatments.length) }}
          </div>

          <div v-if="doctor.belongsToAgency || doctor.agencyId" class="doctor-card__agency-badge">
            <svg class="doctor-card__agency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{{ $t('cards.managedBy') }} {{ doctor.agencyName || $t('cards.agency') }}</span>
          </div>
        </div>
      </div>

      <div v-if="doctor.bio" class="doctor-card__bio">
        <p class="doctor-card__bio-text">
          {{ doctor.bio }}
        </p>
      </div>

      <div class="doctor-card__footer">
        <div class="doctor-card__pricing">
          <span v-if="minPrice" class="doctor-card__price">
            {{ $t('cards.fromPrice', { price: minPrice }) }}
          </span>
          <span v-else class="doctor-card__price-placeholder">{{ $t('cards.viewProfileForPricing') }}</span>
        </div>

        <div class="doctor-card__actions">
          <span
            v-if="doctor.subscriptionStatus !== 'active'"
            class="doctor-card__badge-text"
          >
            {{ $t('cards.limited') }}
          </span>
          <div class="doctor-card__view-button">
            {{ $t('cards.viewProfile') }}
            <svg class="doctor-card__arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  doctor: any
}>()

const minPrice = computed(() => {
  if (!props.doctor.treatments || props.doctor.treatments.length === 0) {
    return null
  }
  const prices = props.doctor.treatments
    .map((t: any) => t.price)
    .filter((p: any) => p > 0)
  return prices.length > 0 ? Math.min(...prices) : null
})

const currency = computed(() => {
  if (!props.doctor.treatments || props.doctor.treatments.length === 0) {
    return 'EUR'
  }
  return props.doctor.treatments[0]?.currency || 'EUR'
})

// Use primary gallery image if available, otherwise use photoUrl
const primaryImage = computed(() => {
  if (props.doctor.gallery && props.doctor.gallery.length > 0) {
    const primary = props.doctor.gallery.find((img: any) => img.isPrimary)
    return primary?.url || props.doctor.gallery[0]?.url || props.doctor.photoUrl
  }
  return props.doctor.photoUrl
})

const hasGallery = computed(() => {
  return props.doctor.gallery && props.doctor.gallery.length > 0
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  // Use placeholder on error
  target.style.display = 'none'
}
</script>

<style lang="scss" scoped>
.doctor-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.doctor-card {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 480px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  &__image-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  &__image {
    width: 8rem;
    height: 8rem;
    border-radius: 1.2rem;
    object-fit: cover;
    background: var(--alice-blue);
  }

  &__placeholder {
    width: 8rem;
    height: 8rem;
    border-radius: 1.2rem;
    background: var(--alice-blue);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__emoji {
    font-size: 3rem;
  }

  &__badge {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    width: 1.4rem;
    height: 1.4rem;
    background: #34c759;
    border-radius: 50%;
    border: 3px solid white;
  }

  &__gallery-badge {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1.1rem;
    font-weight: 700;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__name {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: var(--secondary);
  }

  &__specialties {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  &__specialty {
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    background: var(--alice-blue);
    color: var(--primary);
    border-radius: 0.8rem;

    &--more {
      background: transparent;
      border: 1px solid var(--border-line);
      color: var(--slate-blue);
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  &__rating-stars {
    display: flex;
    align-items: center;
    background: #fff9e6;
    padding: 0.4rem 1rem;
    border-radius: 0.8rem;
  }

  &__star-icon {
    width: 1.4rem;
    height: 1.4rem;
    color: #ff9500;
    fill: currentColor;
  }

  &__rating-value {
    margin-left: 0.4rem;
    font-weight: 700;
    color: var(--secondary);
    font-size: 1.4rem;
  }

  &__rating-count {
    font-size: 1.4rem;
    color: var(--slate-blue);
  }

  &__location {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    color: var(--slate-blue);
    margin-bottom: 1.5rem;
  }

  &__location-icon {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--slate-blue);
  }

  &__treatments {
    font-size: 1.4rem;
    color: var(--slate-blue);
    margin-bottom: 1.5rem;
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
    margin-top: 0.5rem;
  }

  &__agency-icon {
    width: 1.6rem;
    height: 1.6rem;
    flex-shrink: 0;
  }

  &__bio {
    margin-top: auto;
    padding-top: 2rem;
    border-top: 1px solid var(--border-line);
  }

  &__bio-text {
    font-size: 1.4rem;
    color: var(--slate-blue);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__footer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-line);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--secondary);
  }

  &__price-placeholder {
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
      
      .doctor-card__arrow-icon {
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
</style>

