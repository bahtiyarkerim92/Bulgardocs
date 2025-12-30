import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

export interface Breadcrumb {
  name: string;
  url: string | null;
}

export const useBreadcrumb = (customTitle?: string) => {
  const route = useRoute();
  const { locale, t } = useI18n();

  const safeTranslate = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const formatPath = (path: string): string => {
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const pathArray = route?.path?.split('/');
    const breadcrumbs: Breadcrumb[] = [];
    const filteredPath = pathArray?.filter((segment) => segment);

    // Add home with just domain
    breadcrumbs.push({
      name: safeTranslate('breadcrumb.home', 'Home'),
      url: `/${locale.value}`,
    });

    let buildPath = '';
    let isBlogPath = false;

    filteredPath?.forEach((path, index) => {
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
          name: safeTranslate('breadcrumb.blog', 'Blog'),
          url: `/${locale.value}/blog`,
        });
        return;
      }

      // Handle article path with custom title
      if (isBlogPath && customTitle) {
        breadcrumbs.push({
          name: customTitle,
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
        breadcrumbs.push({
          name: safeTranslate(translationKey, formatPath(path)),
          url: index === filteredPath.length - 1 ? null : buildPath,
        });
      }
    });

    return breadcrumbs;
  });

  return {
    breadcrumbs,
  };
};
