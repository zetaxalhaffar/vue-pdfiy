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
  <Pagination v-if="pdfUrl" :page="page" :pages="pages" @prev="prevPage" @next="nextPage" />
</template>

<script lang="ts" setup>
import { useJsPdf } from '@/composables/index'
import { ref } from 'vue'
import { VuePDF, usePDF, type PDFSrc } from '@tato30/vue-pdf'
import Pagination from '@/components/Pagination.vue'

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const { pdf, pages } = usePDF(pdfUrl as PDFSrc)
const { addText, outputAsArrayBuffer, setFontSize, textColor, savePdf, createTableBuilder } =
  useJsPdf({})

const HEADER_HEIGHT = 30
const MARGIN = 20
const dummyData = [
  [
    ['Employee Name', 'Department', 'Position'],
    ['Sarah Jenkins', 'Engineering', 'Senior Developer'],
    ['Michael Chen', 'Design', 'UI/UX Lead'],
    ['Emma Wilson', 'Product', 'Product Manager'],
  ],
  [
    ['Product SKU', 'Stock Level', 'Reorder Point', 'Status'],
    ['WLP-100-B', '45 Units', '20 Units', 'Healthy'],
    ['MOU-250-W', '12 Units', '15 Units', 'Low Stock'],
    ['KBD-400-M', '156 Units', '50 Units', 'In Stock'],
    ['MON-800-4K', '5 Units', '10 Units', 'Critical'],
    ['SSD-2TB-P', '89 Units', '30 Units', 'In Stock'],
    ['CAB-USB-C', '450 Units', '100 Units', 'In Stock'],
  ],
  [
    ['Order ID', 'Customer Name', 'Amount', 'Date', 'Status'],
    ['#ORD-001', 'Alice Johnson', '$1,250.00', '2024-02-01', 'Paid'],
    ['#ORD-002', 'Bob Smith', '$450.25', '2024-02-01', 'Processing'],
    ['#ORD-003', 'Charlie Brown', '$2,100.00', '2024-02-02', 'Shipped'],
    ...Array.from({ length: 30 }, (_, i) => [
      `#ORD-00${i + 4}`,
      'Enterprise Client',
      `$${(Math.random() * 5000 + 100).toFixed(2)}`,
      '2024-02-05',
      'Pending',
    ]),
  ],
]

const preparePdf = () => {
  setFontSize(60)
  textColor('#000000')
  addText('Simple Table', { x: 0, y: HEADER_HEIGHT, isCentered: true })
  let currentY = MARGIN + HEADER_HEIGHT
  dummyData.forEach((table) => {
    createTableBuilder().setStartY(currentY).addHeader(table[0]!).addRows(table.slice(1)).build()
    currentY += table.length * 10
  })
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

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const nextPage = () => {
  if (page.value < pages.value) {
    page.value++
  }
}
</script>
