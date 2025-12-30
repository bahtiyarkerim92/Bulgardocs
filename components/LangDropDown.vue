<template>
  <ClientOnly>
    <div
      ref="customSelect"
      class="custom-select"
      :class="{ 'custom-select--active': isDropdownOpen }"
    >
      <button
        ref="selectBtn"
        class="custom-select__button"
        :class="{ 'custom-select__dropdown--active': isDropdownOpen }"
        role="combobox"
        :aria-expanded="isDropdownOpen"
        aria-haspopup="listbox"
        :aria-controls="'select-dropdown'"
        :aria-activedescendant="isDropdownOpen ? `option-${highlightedIndex}` : undefined"
        @click.stop="toggleDropdown"
      >
        <img
          class="custom-select__img"
          :src="`/img/flags/${(selectedLocale === 'en'
            ? 'gb'
            : selectedLocale
          )?.toLocaleLowerCase()}.svg`"
          :alt="selectedLocale"
          aria-hidden="true"
        />
        <span class="custom-select__value">{{ selectedLocale.toLocaleUpperCase() }}</span>
        <arrowDown class="custom-select__arrow" aria-hidden="true" />
      </button>

      <ul
        v-show="isDropdownOpen"
        id="select-dropdown"
        ref="listContainer"
        class="custom-select__dropdown"
        role="listbox"
        tabindex="-1"
      >
        <li
          v-for="(lang, index) in locales"
          :key="lang.code"
          ref="listItems"
          role="option"
          :aria-selected="lang.code === selectedLocale"
          :class="{
            'custom-select__element--highlighted': highlightedIndex === index,
          }"
          class="custom-select__element"
          @click.stop="selectOption(lang, index)"
        >
          <NuxtLink class="custom-select__link" :to="switchLocalePath(lang.code)" tabindex="-1">
            <input
              :id="lang.code"
              type="radio"
              name="country-code"
              :checked="lang.dialCode === selectedLocaleCode"
              :aria-label="`Select ${lang.name}`"
              class="custom-select__input"
            />
            <label :for="lang.code" class="custom-select__label">
              <img
                class="custom-select__img"
                :src="`/img/flags/${(lang.code === 'en'
                  ? 'gb'
                  : lang.code
                ).toLocaleLowerCase()}.svg`"
                :alt="lang?.name"
                aria-hidden="true"
              />

              <i class="custom-select__icon" />
              {{ lang.name }}
            </label>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import arrowDown from './public/svg/arrowDown.svg';
  const { locale, locales, t, setLocale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const listItems = ref<HTMLElement[]>();
  const listContainer = ref<HTMLElement>();

  const scrollPosition = (direction: number): void => {
    nextTick(() => {
      const items = listItems.value as HTMLElement[];
      highlightedIndex.value = Math.min(
        Math.max(0, highlightedIndex.value + direction),
        locales.value.length - 1
      );
      const top = items[highlightedIndex.value].offsetTop;
      listContainer.value?.scrollTo({ top, behavior: 'smooth' });
    });
  };
  const selectedLocale = ref(locale);
  const selectedLocaleCode = ref('');
  const highlightedIndex = ref(0);

  const findLocaleIndex = () => {
    const index = locales.value.findIndex((l) => l.code === locale.value);
    highlightedIndex.value = index !== -1 ? index : 0;
  };

  const customSelect = ref<HTMLElement | null>(null);
  const isDropdownOpen = ref(false);

  const toggleDropdown = (event: Event) => {
    event.preventDefault();
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const selectOption = async (currentSelectedLocale: any, index: number) => {
    await setLocale(currentSelectedLocale.code);
    selectedLocale.value = currentSelectedLocale.code;
    selectedLocaleCode.value = currentSelectedLocale.name;
    isDropdownOpen.value = false;
    highlightedIndex.value = index;
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (['Escape', 'ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
      event.preventDefault(); // Prevent default form submission
      event.stopPropagation();
    }

    switch (event.key) {
      case 'Escape':
        isDropdownOpen.value = false;
        break;
      case 'ArrowDown':
        if (isDropdownOpen.value) {
          highlightedIndex.value = (highlightedIndex.value + 1) % locales.value.length;
          scrollPosition(0);
        }
        break;
      case 'ArrowUp':
        if (isDropdownOpen.value) {
          if (highlightedIndex.value > 0) {
            highlightedIndex.value =
              (highlightedIndex.value - 1 + locales.value.length) % locales.value.length;
            scrollPosition(0);
          }
        }
        break;
      case 'Enter':
        if (isDropdownOpen.value && highlightedIndex.value >= 0) {
          selectOption(locales.value[highlightedIndex.value], highlightedIndex.value);
        }
        break;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      customSelect.value &&
      !customSelect.value.contains(event.target as Node) &&
      isDropdownOpen.value
    ) {
      isDropdownOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClickOutside);
    findLocaleIndex();
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<style lang="scss" scoped>
  .custom-select {
    position: relative;

    &__button {
      height: 3.6rem;
      padding: 0 1.2rem;
      border-radius: 0.6rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: #ffffff;
      }

      &:focus {
        outline: none;
        border-color: var(--accent);
      }
    }

    &__img {
      width: 1.6rem;
      height: 1.6rem;
      object-fit: contain;
      border-radius: 2px;
    }

    &__value {
      font-weight: 600;
      margin: 0 0.6rem;
      font-size: 1.4rem;
      color: #ffffff;
    }

    &__arrow {
      transition: transform 0.3s ease;
      width: 1rem;
      color: #ffffff;
    }

    &__dropdown {
      position: absolute;
      list-style: none;
      background: #ffffff;
      border-radius: 1.2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      max-height: 30rem;
      width: 16rem;
      overflow-y: auto;
      z-index: 100;
      top: calc(100% + 1.5rem);
      right: 0;
      padding: 0.8rem;
      border: 1px solid var(--border-line);
    }

    &__element {
      border-radius: 0.8rem;
      transition: all 0.3s ease;

      &:hover {
        background: var(--alice-blue);
        
        .custom-select__label {
          color: var(--primary);
        }
      }
    }

    &__element--highlighted {
      background: var(--alice-blue);
      
      .custom-select__label {
        color: var(--primary);
      }
    }

    &__label {
      width: 100%;
      cursor: pointer;
      display: flex;
      gap: 1rem;
      align-items: center;
      padding: 1rem 1.2rem;
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--secondary);
      transition: all 0.3s ease;
    }

    &__link {
      color: inherit;
      text-decoration: none;
      display: block;
      width: 100%;
    }

    &__input {
      position: absolute;
      opacity: 0;
    }

    &--active &__arrow {
      transform: rotate(180deg);
    }
  }
</style>

<style lang="scss">
// Global styles for language switcher when header is transparent
// This needs to be outside scoped to work with parent selectors
.transparent-header .custom-select {
  &__button {
    background: rgba(16, 44, 70, 0.05) !important;
    border: 1px solid rgba(16, 44, 70, 0.2) !important;

    &:hover {
      background: rgba(16, 44, 70, 0.1) !important;
      border-color: var(--secondary) !important;
    }
  }

  &__value {
    color: var(--secondary) !important;
  }

  &__arrow {
    color: var(--secondary) !important;
  }
}
</style>

