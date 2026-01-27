<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'

interface PDFRenderProps {
  pdfUrl: string
  page: number
}
const props = defineProps<PDFRenderProps>()

const { pdf, pages } = usePDF(props.pdfUrl)
</script>

<template>
  {{ pages }}
  <VuePDF v-if="pdf" :pdf="pdf" :page="props.page" />
</template>
