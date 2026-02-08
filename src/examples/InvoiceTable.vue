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
import { formatCurrency, fromObjects, useJsPdf } from '@/composables'
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

const preparePdf = () => {
  // Invoice header
  setFontSize(24)
  textColor('#1a237e')
  addText('INVOICE', { x: 105, y: 20, isCentered: true })
  setFontSize(10)
  addText('Invoice #: INV-2024-001', { x: 20, y: 35 })
  addText('Date: January 28, 2024', { x: 20, y: 40 })

  // Invoice items
  const items = [
    ['Web Development', 40, 150, 6000],
    ['UI/UX Design', 20, 120, 2400],
    ['Consulting', 10, 200, 2000],
  ]

  const subtotal = items.reduce((sum, item) => sum + (item[3] as number), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  // Create total rows
  const bodyRows = items.map((item) => [
    item[0] as string,
    item[1] as number,
    formatCurrency(item[2] as number),
    formatCurrency(item[3] as number),
  ])

  createTableBuilder()
    .addHeader(['Description', 'Hours', 'Rate', 'Amount'])
    .addRows(bodyRows as CellDefAutoTable[][])
    .addRow(['', '', 'Subtotal:', formatCurrency(subtotal)])
    .addRow(['', '', 'Tax (10%):', formatCurrency(tax)])
    .addRow(['', '', 'Total:', formatCurrency(total)])
    .setStartY(50)
    .setTheme('grid')
    .setHeaderStyles({
      fillColor: '#1a237e',
      textColor: '#fff',
      fontSize: 11,
      fontStyle: 'bold',
    })
    .setColumnStyles(3, { halign: 'right', fontStyle: 'bold' })
    .setMargin({ top: 50, right: 20, bottom: 20, left: 20 })
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
  savePdf('invoice-table.pdf')
}
</script>

<style></style>
