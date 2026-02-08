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
import { formatCurrency, useJsPdf } from '@/composables'
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
  setFontSize(60)
  textColor('#000000')
  addText('Dynamic Table', { x: 0, y: HEADER_HEIGHT, isCentered: true })
  // Sample data - could come from API or database
  const products = [
    { name: 'Product A', price: 100, quantity: 5 },
    { name: 'Product B', price: 200, quantity: 3 },
    { name: 'Product C', price: 150, quantity: 7 },
  ]

  const builder = createTableBuilder().addHeader(['Product', 'Price', 'Quantity', 'Total'])

  // Add rows dynamically
  for (const product of products) {
    const total = product.price * product.quantity
    builder.addRow([
      product.name,
      formatCurrency(product.price),
      product.quantity.toString(),
      formatCurrency(total),
    ])
  }

  // Add footer with totals
  const grandTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  builder
    .addFooter(['Total', '', '', formatCurrency(grandTotal)])
    .setStartY(HEADER_HEIGHT + 20)
    .setFooterStyles({
      fillColor: '#2196F3',
      textColor: '#ffffff',
      fontStyle: 'bold',
    })
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
  savePdf('dynamic-table.pdf')
}
</script>

<style></style>
