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
  themeConfig: {
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
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
