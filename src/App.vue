<script setup lang="ts">
import { useJsPdf } from './composables'

const { loadCustomFontFn, addText, savePdf, setFont, clearClip, createCircle } = useJsPdf({})

const downloadPdf = async () => {
  await loadCustomFontFn(
    '/PlaywriteGBJGuides-Regular.ttf',
    'PlaywriteGBJGuides',
    'PlaywriteGBJGuides',
  )
  setFont('PlaywriteGBJGuides', 'normal', 400)
  addText('Hello World', 20, 20)
  createCircle(100, 100, 50, null)
  clearClip()
  savePdf('hello-world.pdf')
}
</script>

<template>
  <div>
    <button @click="downloadPdf">Download PDF</button>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
