// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-svgo',
    '@nuxt/eslint',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-aos',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/i18n',
  ],

  icon: {
    provider: 'iconify', // Use external Iconify API instead of local server
    serverBundle: false, // Disable server bundle completely
    clientBundle: {
      icons: [
        'mdi:file-document-multiple',
        'mdi:test-tube', 
        'mdi:radioactive',
        'mdi:shield-account',
        'mdi:upload',
        'mdi:folder-open',
        'mdi:plus',
        'mdi:check-circle',
        'mdi:magnify',
        'mdi:arrow-forward',
        'mdi:information-outline',
        'mdi:video',
        'mdi:file-document-outline',
        'mdi:calendar',
        'mdi:airplane'
      ]
    }
  },

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      ipInfo: process.env.IP_INFO, //   abf1430f6f24fd'
      baseUrl: process.env.BASE_URL || 'http://localhost:3030', // Backend API URL
      
      siteUrl: process.env.SITE_URL || 'http://localhost:3000', // Production: https://bulgardocs.com

      corsOrigins: [
        process.env.BASE_URL ?? '',
        process.env.SITE_URL ?? '',
        ...(process.env.NODE_ENV === 'development'
          ? ['http://localhost:3000', 'http://localhost:8000', 'http://localhost:8888']
          : []),
      ],
    }
  },

  app: {
    buildAssetsDir: '/_nuxt/',
    cdnURL: process.env.SITE_URL,
    baseURL: '/',
    head: {
      // No scripts
    }
  },


  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/scss/_global.scss" as *;',
        },
      },
    },
    build: {
      cssMinify: true,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@vue') || id.includes('vue-router') || id.includes('pinia')) {
                return 'vue-framework';
              }
              if (id.includes('@nuxt') || id.includes('nuxt')) {
                return 'nuxt-framework';
              }
              if (id.includes('i18n') || id.includes('intl')) {
                return 'i18n';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ['fsevents'],
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
  },

  css: ['~/assets/scss/main.scss'],

  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
  },


  nitro: {
    preset: 'netlify',
    devProxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        prependPath: true,
        secure: false,
        ws: true,
      }
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
    timing: false,
    publicAssets: [
      {
        dir: 'public',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        baseURL: '/',
      },
    ],
    // prerender: {
    //   crawlLinks: false,
    //   routes: [
    //     '/',
    //     '/about',
    //     '/pricing',
    //     '/contact',
    //     '/faq',
    //     '/terms-and-conditions',
    //     '/privacy-policy',
    //     '/legal-notice',
    //     '/shippers',
    //     '/forwarders',
    //     '/carriers',
    //     '/managers',
    //     '/feedback',
    //   ],
    // },
    // Increase cache effectiveness for navigation
    // storage: {
    //   cache: {
    //     driver: 'memory',
    //     max: 200, // Increase cache size
    //   },
    // },

    // Configure logging based on environment
    logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'info',
    logging:
      process.env.NODE_ENV === 'production'
        ? {
            compressedSizes: false,
            buildSuccess: false,
          }
        : {
            compressedSizes: true,
            buildSuccess: true,
          },

    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Accept-Language',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
          'Access-Control-Allow-Origin':
            process.env.NODE_ENV === 'development'
              ? '*'
              : 'https://telemedker.com',
        },
      },
      // Special rule for SSR requests
      '/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Accept, Accept-Language',
        },
      },
    },
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    viewTransition: false,
    componentIslands: false,
    treeshakeClientOnly: true,
    asyncContext: true,
    crossOriginPrefetch: true,
  },

  // Sitemap configuration - temporarily commented out due to type issues
  /*
  sitemap: {
    siteUrl: 'https://telemedker.com',
    gzip: true,
    exclude: ['/dashboard/**', '/user-profile/**', '/admin/**'],
    urls: ['/', '/pricing', '/services', '/about', '/contact'],
  } as any,
  */

  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          quality: '80',
          loading: 'lazy',
        },
      },
      blog: {
        modifiers: {
          format: 'webp',
          quality: '90',
          loading: 'eager',
        },
      },
    },
    densities: [1, 2],
    format: ['webp'],
    provider: 'ipx',
    ipx: {
      maxAge: 60 * 60 * 24 * 7,
    },
  },

  i18n: {
    langDir: 'locales/',
    restructureDir: false, 
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
      redirectOn: 'root',
    },
    defaultLocale: 'en',
    lazy: true,
    strategy: 'prefix_and_default',
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.ts' },

      { code: 'de', language: 'de', name: 'Deutsch', file: 'de.ts' },

      { code: 'bg', language: 'bg', name: 'Български', file: 'bg.ts' },

      { code: 'tr', language: 'tr', name: 'Türkçe', file: 'tr.ts' },
    ],
  },

  plugins: [
    '~/plugins/auth.ts', 
    '~/plugins/auth-modal.ts',
    '~/plugins/api.ts'
  ],
  sourcemap: {
    server: false,
    client: false,
  },

  compatibilityDate: '2025-02-15',
});