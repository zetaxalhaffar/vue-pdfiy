<template>
  <div class="flex gap-4">
    <div>
      <button @click="saveAutoTable">Save Auto Table</button>
      <button @click="renderAutoTable">Render Auto Table</button>
    </div>
    <div v-if="pdfUrl" class="pdf-style">
      <VuePDF :pdf="pdf" v-if="pdfUrl" :page="page" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useJsPdf } from '@/composables'
import { VuePDF, usePDF, type PDFSrc } from '@tato30/vue-pdf'
import { ref } from 'vue'

const { pdf: pdfJsPdf, outputAsArrayBuffer, createTable } = useJsPdf({})

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const { pdf } = usePDF(pdfUrl as PDFSrc)

const saveAutoTable = () => {
  pdfJsPdf.save('auto-table.pdf')
}

const renderAutoTable = () => {
  createTable({
    body: [[{ content: 'Hello' }, { content: 'World' }]],
  })
  const arrayBuffer = outputAsArrayBuffer()
  pdfUrl.value = arrayBuffer
}


</script>

<style></style>
