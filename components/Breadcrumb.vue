<template>
  <nav class="breadcrumb" aria-label="breadcrumb">
    <div class="breadcrumb__container">
      <ol class="breadcrumb__list">
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb__item">
          <nuxt-link v-if="crumb.url" :to="localePath(crumb.url)" class="breadcrumb__link">
            {{ crumb.name }}
          </nuxt-link>
          <span v-else class="breadcrumb__text">
            {{ crumb.name }}
          </span>
          <span v-if="index < breadcrumbs.length - 1" class="breadcrumb__divider">›</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  type Props = {
    customTitle?: string;
  };

  const props = defineProps<Props>();
  const localePath = useLocalePath();

  // Call composables at the top level
  const route = useRoute();
  const { locale, t } = useI18n();

  const getBreadcrumbs = (title?: string) => {
    const pathArray = route.path.split('/');
    const breadcrumbs: { name: string; url: string | null }[] = [];
    const filteredPath = pathArray.filter((segment) => segment);

    // Add home with just domain
    breadcrumbs.push({
      name: t('breadcrumb.home', 'Home'),
      url: `/${locale.value}`,
    });

    let buildPath = '';
    let isBlogPath = false;

    filteredPath.forEach((path, index) => {
      // Handle locale segment
      if (path === locale.value) {
        buildPath = `/${path}`;
        return;
      }

      buildPath += `/${path}`;

      // Handle blog path
      if (path.toLowerCase() === 'blog') {
        isBlogPath = true;
        breadcrumbs.push({
          name: t('breadcrumb.blog', 'Blog'),
          url: `/${locale.value}/blog`,
        });
        return;
      }

      // Handle article path with custom title
      if (isBlogPath && title) {
        breadcrumbs.push({
          name: title,
          url: null,
        });
      } else if (isBlogPath) {
        const name = formatPath(path);
        breadcrumbs.push({
          name,
          url: null,
        });
      } else {
        const translationKey = `breadcrumb.${path.toLowerCase()}`;
        const translation = t(translationKey);
        breadcrumbs.push({
          name: translation === translationKey ? formatPath(path) : translation,
          url: index === filteredPath.length - 1 ? null : buildPath,
        });
      }
    });

    return breadcrumbs;
  };

  const formatPath = (path: string): string => {
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const currentBreadcrumbs = ref(getBreadcrumbs(props.customTitle));

  watch([() => props.customTitle, () => route.path, () => locale.value], () => {
    currentBreadcrumbs.value = getBreadcrumbs(props.customTitle);
  });

  const breadcrumbs = computed(() => currentBreadcrumbs.value);
</script>

<style scoped lang="scss">
  .breadcrumb {
    font-size: 1.4rem;
    color: var(--text-grey);
    margin-top: 8rem; // Add space below navbar (navbar height is 6-8rem)
    padding: 0;

    &__container {
      max-width: 1350px;
      margin: 0 auto;
      padding: 1.6rem 1rem;
    }

    &__list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      margin: 0;
    }

    &__item {
      display: flex;
      align-items: center;
    }

    &__link {
      color: var(--main-orange);
      text-decoration: none;
      transition: color 0.3s ease;
      font-size: 1.2rem;
      @media (min-width: $breakpoint_small) {
        font-size: 1.4rem;
      }

      &:hover {
        color: var(--main-blue);
      }
    }

    &__text {
      color: var(--text-grey-light);
      font-size: 1.2rem;
      @media (min-width: $breakpoint_small) {
        font-size: 1.4rem;
      }
    }

    &__divider {
      margin: 0 0.8rem;
      color: var(--border);
    }
  }
</style>
