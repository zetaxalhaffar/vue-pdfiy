# Examples

Discover the power of **VuePDFIY** through practical examples. From simple text to complex dynamic tables, these snippets show you how to build professional PDFs directly in your Vue 3 applications.

::: tip Note
The demos below use `vue-pdf` to render the generated PDF buffer directly in your browser. This allows for a smooth, seamless transition from generation to preview.
:::

## Simple Table

The `SimpleTable` example demonstrates the core functionality of the `TableBuilder` API. It shows how to define headers and rows programmatically with a fluent interface.

::: details View Source Code
::: code-group

```vue [template.vue]
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
```

```ts [script.ts]
<script lang="ts" setup>
import { useJsPdf } from 'vue-pdfiy'
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
```

:::

### Interactive Demo

<SimpleTable />

## Multi-Page Multi-Table

The `MultiTablesWithHeaderFooter` example demonstrates the core functionality of the `TableBuilder` API. It shows how to define headers and rows programmatically with a fluent interface.

::: details View Source Code
::: code-group

```vue [template.vue]
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
```

```ts [script.ts]
<script lang="ts" setup>
import { useJsPdf } from 'vue-pdfiy'
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
```

:::

### Interactive Demo

<MultiTablesWithHeaderFooter />

### Table From Objects

The `TableFromObjects` example demonstrates the core functionality of the `TableBuilder` API.
It shows how to define headers and rows programmatically with a fluent interface.

::: details View Source Code
::: code-group

```vue [template.vue]
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
```

```ts [script.ts]
<script lang="ts" setup>
import { fromObjects, useJsPdf } from '@/composables'
import type { CellDefAutoTable } from '@/types/table'
import { usePDF, VuePDF, type PDFSrc } from '@tato30/vue-pdf'
import { ref } from 'vue'
const { createTableBuilder, savePdf, outputAsArrayBuffer } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const { pdf } = usePDF(pdfUrl as PDFSrc)

const preparePdf = () => {
  // Data as array of objects
  const employees = [
    { name: 'John Doe', department: 'Engineering', salary: 75000 },
    { name: 'Jane Smith', department: 'Marketing', salary: 65000 },
    { name: 'Bob Johnson', department: 'Sales', salary: 70000 },
  ]

  // Convert objects to table data
  const { header, body } = fromObjects(employees)

  createTableBuilder()
    .setHeader(header as CellDefAutoTable[][])
    .addRows(body as CellDefAutoTable[][])
    .setTheme('grid')
    .setHeaderStyles({ fillColor: '#673AB7', textColor: '#fff' })
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
```

:::

<TableFromObjects />

## Invoice Table

The `InvoiceTable` example demonstrates the core functionality of the `TableBuilder` API.
It shows how to create an invoice table with header, rows, and totals.

::: details View Source Code
::: code-group

```vue [template.vue]
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
```

```vue [script.ts]
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
  addText('INVOICE', { x: 105, y: 20 })
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
```

:::

<InvoiceTable />

## Reusable Table Builder

The `ReusableTableBuilder` example demonstrates how to create a reusable table builder that can be used to create multiple tables with the same styles and settings.

::: details View Source Code
::: code-group

```vue [template.vue]
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
```

```vue [script.ts]
<script lang="ts" setup>
import { useJsPdf } from '@/composables'
import { usePDF, VuePDF, type PDFSrc } from '@tato30/vue-pdf'
import { nextTick, ref } from 'vue'
const { createTableBuilder, savePdf, outputAsArrayBuffer } = useJsPdf({
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
    .setStartY(table1.build() as unknown as number) // Start after first table

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
  savePdf('reusable-table-builder.pdf')
}
</script>
```

:::

<ReusableTableBuilder />

## Dynamic Table

The `DynamicTable` example demonstrates how to create a dynamic table with a loop.

::: details View Source Code
::: code-group

```vue [template.vue]
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
```

```vue [script.ts]
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

  builder.addFooter(['Total', '', '', formatCurrency(grandTotal)]).build()
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
```

:::

<DynamicTable />
