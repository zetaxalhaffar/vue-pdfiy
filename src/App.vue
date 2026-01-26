<script setup lang="ts">
import { useJsPdf } from './composables'

const { pdf, loadCustomFont } = useJsPdf({})

const downloadPdf = () => {
  pdf.text('Hello World', 10, 10)
  loadCustomFont(
    pdf,
    '/PlaywriteGBJGuides-Regular.ttf',
    'PlaywriteGBJGuides',
    'PlaywriteGBJGuides',
    'normal',
  )
  pdf.setFont('PlaywriteGBJGuides')
  console.log(pdf.getFontList())
  pdf.save('hello-world.pdf')
}
</script>

<template>
  <div>
    <div>Hello World</div>
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
