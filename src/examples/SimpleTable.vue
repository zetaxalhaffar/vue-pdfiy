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
import { useJsPdf } from '@/composables/index'
import { ref } from 'vue'
import { VuePDF, usePDF, type PDFSrc } from '@tato30/vue-pdf'

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const { pdf } = usePDF(pdfUrl as PDFSrc)
const { addText, outputAsArrayBuffer, setFontSize, textColor, savePdf, createTableBuilder } =
  useJsPdf({})

const HEADER_HEIGHT = 30

const preparePdf = () => {
  setFontSize(60)
  textColor('#000000')
  addText('Simple Table', { x: 0, y: HEADER_HEIGHT, isCentered: true })
  createTableBuilder()
    .setStartY(HEADER_HEIGHT + 20)
    .addHeader(['Header 1', 'Header 2', 'Header 3'])
    .addRow(['Cell 1', 'Cell 2', 'Cell 3'])
    .addRow(['Cell 4', 'Cell 5', 'Cell 6'])
    .build()
}

const renderPdf = () => {
  preparePdf()
  const arrayBuffer = outputAsArrayBuffer()
  pdfUrl.value = arrayBuffer
}

const downloadPdf = () => {
  preparePdf()
  savePdf('simple-table.pdf')
}
</script>
