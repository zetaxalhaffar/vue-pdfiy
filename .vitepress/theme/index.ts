// https://vitepress.dev/guide/custom-theme
import { h, defineAsyncComponent } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Use dynamic import to avoid SSR issues with pdfjs-dist
    if (typeof window !== 'undefined') {
      const SimpleText = defineAsyncComponent(() => import('../../src/examples/simple-text.vue'))
      app.component('SimpleText', SimpleText)
    }
  }
} satisfies Theme
