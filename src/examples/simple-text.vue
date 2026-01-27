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
const { addText, outputAsArrayBuffer, setFontSize, textColor, savePdf } = useJsPdf({})
const preparePdf = () => {
  setFontSize(60)
  textColor('#000000')
  addText('Hello World', 20, 20)
}

const renderPdf = () => {
  preparePdf()
  const arrayBuffer = outputAsArrayBuffer()
  pdfUrl.value = arrayBuffer
}

const downloadPdf = () => {
  preparePdf()
  savePdf('simple-text.pdf')
}
</script>
