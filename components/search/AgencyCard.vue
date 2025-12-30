<template>
  <NuxtLink :to="`/profile/agency/${agency._id}`" class="agency-card-link">
    <div class="agency-card card-apple">
      <div class="agency-card__header">
        <div class="agency-card__image-wrapper">
          <img
            v-if="agency.photoUrl"
            :src="agency.photoUrl"
            :alt="agency.name"
            class="agency-card__image"
          />
          <div v-else class="agency-card__placeholder">
            <span class="agency-card__emoji">🏢</span>
          </div>
          <div v-if="agency.subscriptionStatus === 'active'" class="agency-card__badge"></div>
        </div>

        <div class="agency-card__content">
          <h3 class="agency-card__name">
            {{ agency.name }}
            <span v-if="agency.belongsToAgency" class="agency-card__agency-badge">Agency</span>
          </h3>
          
          <div v-if="agency.rating" class="agency-card__rating">
            <div class="agency-card__rating-stars">
              <svg class="agency-card__star-icon" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span class="agency-card__rating-value">{{ agency.rating.average?.toFixed(1) || 0 }}</span>
            </div>
            <span class="agency-card__rating-count">
              ({{ agency.rating.count || 0 }})
            </span>
          </div>

          <div v-if="agency.address" class="agency-card__location">
            <svg class="agency-card__location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>{{ [agency.address.city, agency.address.country?.name].filter(Boolean).join(', ') }}</span>
          </div>

          <div v-if="(agency.doctors && agency.doctors.length > 0) || (agency.clinics && agency.clinics.length > 0)" class="agency-card__providers">
            <span v-if="agency.doctors && agency.doctors.length > 0" class="agency-card__provider-count">
              {{ agency.doctors.length }} doctor{{ agency.doctors.length !== 1 ? 's' : '' }}
            </span>
            <span v-if="agency.clinics && agency.clinics.length > 0" class="agency-card__provider-count">
              {{ agency.clinics.length }} clinic{{ agency.clinics.length !== 1 ? 's' : '' }}
            </span>
          </div>

          <div v-if="agency.treatments && agency.treatments.length > 0" class="agency-card__treatments">
            <span class="agency-card__treatments-count">{{ agency.treatments.length }}</span> treatment{{ agency.treatments.length !== 1 ? 's' : '' }} available
          </div>
        </div>
      </div>

      <div v-if="agency.bio" class="agency-card__bio">
        <p class="agency-card__bio-text">
          {{ agency.bio }}
        </p>
      </div>

      <div class="agency-card__footer">
        <div class="agency-card__pricing">
          <span v-if="minPrice" class="agency-card__price">
            From €{{ minPrice }}
          </span>
          <span v-else class="agency-card__price-placeholder">View profile for pricing</span>
        </div>

        <div class="agency-card__actions">
          <span
            v-if="agency.subscriptionStatus !== 'active'"
            class="agency-card__badge-text"
          >
            Limited
          </span>
          <div class="agency-card__view-button">
            View Profile
            <svg class="agency-card__arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  agency: any
}>()

const minPrice = computed(() => {
  if (!props.agency?.treatments || props.agency.treatments.length === 0) {
    return null
  }
  const prices = props.agency.treatments
    .map((t: any) => t.price)
    .filter((p: any) => p && !isNaN(p))
  return prices.length > 0 ? Math.min(...prices) : null
})
</script>

<style lang="scss" scoped>
.agency-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.agency-card {
  height: 480px;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  &__image-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 1rem;
    overflow: hidden;
    background: #f5f5f7;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f7;
  }

  &__emoji {
    font-size: 2rem;
  }

  &__badge {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    width: 1rem;
    height: 1rem;
    background: #34c759;
    border-radius: 50%;
    border: 2px solid white;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__name {
    font-size: 1.4rem;
    font-weight: 600;
    color: #1d1d1f;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__agency-badge {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    background: #5856d6;
    color: white;
    border-radius: 0.4rem;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__rating-stars {
    display: flex;
    align-items: center;
    background: #fff9e6;
    padding: 0.2rem 0.6rem;
    border-radius: 0.5rem;
  }

  &__star-icon {
    width: 0.875rem;
    height: 0.875rem;
    fill: #ff9500;
  }

  &__rating-value {
    font-weight: 700;
    color: #1d1d1f;
    font-size: 0.875rem;
    margin-left: 0.25rem;
  }

  &__rating-count {
    font-size: 0.875rem;
    color: #86868b;
  }

  &__location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #86868b;
    margin-bottom: 1rem;
  }

  &__location-icon {
    width: 1rem;
    height: 1rem;
    color: #86868b;
  }

  &__providers {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  &__provider-count {
    font-size: 0.75rem;
    color: #1d1d1f;
    background: #f5f5f7;
    padding: 0.25rem 0.75rem;
    border-radius: 980px;
  }

  &__treatments {
    font-size: 0.875rem;
    color: #86868b;
  }

  &__treatments-count {
    font-weight: 600;
    color: #1d1d1f;
  }

  &__bio {
    padding: 0 1.5rem;
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid #f5f5f7;
  }

  &__bio-text {
    font-size: 0.875rem;
    color: #424245;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__footer {
    margin-top: auto;
    padding: 1.25rem 1.5rem;
    border-top: 1px solid #f5f5f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1d1d1f;
  }

  &__price-placeholder {
    font-size: 0.875rem;
    color: #86868b;
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
      
      .agency-card__arrow-icon {
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

