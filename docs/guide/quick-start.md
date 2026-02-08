# Quick Start

## Installation

::: code-group

```bash [bun]
bun add vuepdfiy
```

```bash [npm]
npm install vuepdfiy
```

```bash [pnpm]
pnpm add vuepdfiy
```

```bash [yarn]
yarn add vuepdfiy
```

:::

## Basic Usage

Here You Can Check [vue-pdf](https://tato30.github.io/vue-pdf/) documentation for more details.

## Use Vue-PDFIFY As Combosable

Basically vue-pdfiy warps `pdf.js` library so all main features of pdf.js are supported by vue-pdfiy as well.

## Simple Text Example

```ts
import { useJsPdf } from 'vuepdfiy'
import { ref } from 'vue'
import { VuePDF, usePDF, type PDFSrc } from '@tato30/vue-pdf'

const pdfUrl = ref(null)
const page = ref(1)
const { pdf } = usePDF(pdfUrl)
/*  Use the Composable as a Combo */
const { addText, outputAsArrayBuffer, setFontSize, textColor, savePdf } = useJsPdf({})

/**
 * Prepare the pdf
 */

const preparePdf = () => {
  setFontSize(60)
  textColor('#000000')
  addText('Hello World', { x: 20, y: 20 })
}

/**
 * Render the pdf
 */

const renderPdf = () => {
  preparePdf()
  const arrayBuffer = outputAsArrayBuffer()
  pdfUrl.value = arrayBuffer
}

/**
 * Download the pdf
 */

const downloadPdf = () => {
  preparePdf()
  savePdf('simple-text.pdf')
}
```

<SimpleTable />
