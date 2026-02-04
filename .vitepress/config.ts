import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  title: 'vue-pdfiy',
  description: 'vue-pdf-render-maker',
  base: '/vue-pdfiy/',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
        '~': fileURLToPath(new URL('../public', import.meta.url)),
      },
    },
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: '/assets/logo.svg',
    search: {
      provider: 'local',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          // { text: 'Markdown Examples', link: '/markdown-examples' },
        ],
      },
      {
        text: 'Plugins',
        items: [
          // { text: 'AutoTable', link: '/plugins/auto-table' },
          { text: 'Table Builder', link: '/plugins/table-builder' },
          { text: 'Table Builder API Reference', link: '/plugins/table-builder-api-refrences' },
          { text: 'Table Builder Events', link: '/plugins/table-builder-hooks' },
          { text: 'VFS', link: '/plugins/vfs' },
        ],
      },
      {
        text: 'Utils',
        items: [
          { text: 'containsArabic', link: '/utils/is-arabic-text' },
          { text: 'textSplitter', link: '/utils/text-splitter' },
          { text: 'arrayBufferToBase64', link: '/utils/array-buffer-to-base64' },
          { text: 'LoadCustomFont', link: '/utils/load-custom-font' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/zetaxalhaffar/vue-pdfiy' }],
  },
})
