<template>
  <div class="flex gap-4">
    <button class="button-style mb-4" @click="downloadPdf">
      <span> Download </span>
    </button>

    <button class="button-style mb-4" @click="renderPdf">
      <span> Render PDF </span>
    </button>
  </div>
  <div v-if="pdfUrl" class="pdf-style">
    <VuePDF :pdf="pdf" v-if="pdfUrl" :page="page" />
  </div>
</template>

<script lang="ts" setup>
import { useJsPdf } from '@/composables'
import { usePDF, VuePDF, type PDFSrc } from '@tato30/vue-pdf'
import { nextTick, ref } from 'vue'
const {
  pdf: doc,
  createTableBuilder,
  savePdf,
  outputAsArrayBuffer,
} = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const { pdf } = usePDF(pdfUrl as PDFSrc)

const preparePdf = () => {
  // Create a styled builder
  const styledBuilder = createTableBuilder({
    defaultTheme: 'striped',
    defaultMargin: 20,
  }).setHeaderStyles({
    fillColor: '#3F51B5',
    textColor: '#fff',
    fontStyle: 'bold',
  })

  // Clone and use for first table
  const table1 = styledBuilder
    .clone()
    .addHeader(['Column 1', 'Column 2', 'Column 3'])
    .addRows([
      ['Data A1', 'Data B1', 'Data C1'],
      ['Data A2', 'Data B2', 'Data C2'],
    ])

  table1.build()

  // Clone and use for second table
  const table2 = styledBuilder
    .clone()
    .addHeader(['Name', 'Value', 'Status'])
    .addRows([
      ['Item 1', '100', 'Active'],
      ['Item 2', '200', 'Pending'],
    ])
    .setStartY((doc as any).lastAutoTable.finalY + 10) // Start after first table

  table2.build()
}

const renderPdf = () => {
  preparePdf()
  nextTick(() => {
    const arrayBuffer = outputAsArrayBuffer()
    pdfUrl.value = arrayBuffer
  })
}

const downloadPdf = () => {
  preparePdf()
  savePdf('simple-table.pdf')
}
</script>

<style></style>
