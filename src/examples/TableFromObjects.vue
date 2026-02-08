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
import { fromObjects, useJsPdf } from '@/composables'
import type { CellDefAutoTable } from '@/types/table'
import { usePDF, VuePDF, type PDFSrc } from '@tato30/vue-pdf'
import { nextTick, ref } from 'vue'
const { createTableBuilder, savePdf, outputAsArrayBuffer, setFontSize, textColor, addText } =
  useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const { pdf } = usePDF(pdfUrl as PDFSrc)

const HEADER_HEIGHT = 30

const preparePdf = () => {
  // Data as array of objects
  const employees = [
    { name: 'John Doe', department: 'Engineering', salary: 75000 },
    { name: 'Jane Smith', department: 'Marketing', salary: 65000 },
    { name: 'Bob Johnson', department: 'Sales', salary: 70000 },
  ]
  setFontSize(60)
  textColor('#000000')
  addText('Table From Objects', { x: 0, y: HEADER_HEIGHT, isCentered: true })

  // Convert objects to table data
  const { header, body } = fromObjects(employees)
  createTableBuilder()
    .setStartY(HEADER_HEIGHT + 20)
    .setHeader(header as CellDefAutoTable[][])
    .addRows(body as CellDefAutoTable[][])
    .setTheme('grid')
    .setHeaderStyles({ fillColor: '#673AB7', textColor: '#fff' })
    .build()
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
