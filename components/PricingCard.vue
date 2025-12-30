<template>
  <div class="pricing-card" :class="{ 'is-visible': isVisible }">
    <div class="pricing-card__content">
      <h3 class="pricing-card__title">{{ $t(title) }}</h3>
      <div class="pricing-card__price">
        <span class="pricing-card__currency">€</span>
        <span class="pricing-card__amount">{{ $t(price) }}</span>
        <span class="pricing-card__period"
          >/ {{ $t("components.pricing.period") }}</span
        >
      </div>
      <p class="pricing-card__description">{{ $t(description) }}</p>
      <ul class="pricing-card__features">
        <li
          v-for="(feature, index) in features"
          :key="index"
          class="pricing-card__feature"
          :style="{ '--animation-delay': `${index * 0.1}s` }"
        >
          <span class="pricing-card__check">
            <Icon name="material-symbols:check-circle-rounded" />
          </span>
          <span class="pricing-card__feature-text">{{ $t(feature) }}</span>
        </li>
      </ul>
      <button @click="selectPlan" class="pricing-card__button">
        {{ $t(buttonText) }}
        <Icon
          name="material-symbols:arrow-forward-rounded"
          class="pricing-card__button-icon"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  title: string;
  price: string;
  description: string;
  featureBase: string;
  buttonText: string;
  planType: string;
}

const props = defineProps<Props>();
const { te } = useI18n();

const isVisible = ref(false);

const features = computed(() => {
  const result = [];
  for (let i = 1; i <= 4; i++) {
    const key = `${props.featureBase}feature${i}`;
    if (te(key)) {
      result.push(key);
    }
  }
  return result;
});

const selectPlan = () => {
  const selectedPlan = useState("selectedPlan");
  selectedPlan.value = props.planType;
  navigateTo("/calendar");
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<style lang="scss" scoped>
.pricing-card {
  background: var(--white);
  border-radius: $border-default;
  padding: 3rem 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px);
  height: 100%;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__title {
    font-size: $font-medium;
    font-weight: $font-weight-boldest;
    color: var(--main-blue);
    margin-bottom: 1.5rem;
    text-align: center;

    @media (min-width: $breakpoint_small) {
      font-size: $font-almost-large;
    }
  }

  &__price {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--text-grey);
  }

  &__currency {
    font-size: $font-medium;
    font-weight: $extra-bold;
    vertical-align: top;
    margin-right: 0.2rem;
  }

  &__amount {
    font-size: $font-very-large;
    font-weight: $font-weight-boldest;
    line-height: 1;

    @media (min-width: $breakpoint_small) {
      font-size: $font-extra-large;
    }
  }

  &__period {
    font-size: $font-small;
    color: var(--text-grey-light);
    margin-left: 0.2rem;
  }

  &__description {
    text-align: center;
    font-size: $font-base-small;
    color: var(--text-grey);
    margin-bottom: 2rem;
    padding: 0 1rem;

    @media (min-width: $breakpoint_small) {
      font-size: $font-small;
    }
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem;
    flex-grow: 1;
  }

  &__feature {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem 0;
    opacity: 0;
    transform: translateX(-10px);
    animation: slideIn 0.4s ease-out forwards;
    animation-delay: var(--animation-delay, 0s);
  }

  &__check {
    flex-shrink: 0;
    color: var(--main-orange);
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;

    :deep(svg) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__feature:hover &__check {
    transform: scale(1.2);
  }

  &__feature-text {
    font-size: $font-base-small;
    line-height: $line-height-text;
    color: var(--text-grey);

    @media (min-width: $breakpoint_small) {
      font-size: $font-small;
    }
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 2rem;
    font-size: $font-small;
    font-weight: $extra-bold;
    color: var(--white);
    background: linear-gradient(
      135deg,
      var(--main-blue) 0%,
      var(--main-orange) 100%
    );
    border: none;
    border-radius: $button-border-medium;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

      .pricing-card__button-icon {
        transform: translateX(5px);
      }
    }
  }

  &__button-icon {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.3s ease;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
