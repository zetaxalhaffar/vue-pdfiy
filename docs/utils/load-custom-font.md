# `loadCustomFont` Utility

## Overview

The `loadCustomFont` utility helps you load a custom font into a jsPDF document at runtime.  
It fetches a font file, converts it to Base64, adds it to jsPDF’s VFS, and registers the font so you can use it in your PDF.

```ts
import loadCustomFont from '@/utils/LoadCustomFont'
```

Under the hood it uses:

- `fetch` to download the font file.
- `arrayBufferToBase64` to convert the font bytes.
- jsPDF’s `addFileToVFS` and `addFont` APIs to register the font.

## Signature

```ts
import type jsPDF from 'jspdf'

async function loadCustomFont(
  doc: jsPDF,
  fontPath: string,
  fontName: string,
  fontFamily: string,
  fontStyle: string = 'normal',
): Promise<void>
```

- **doc**: An existing jsPDF instance (when using `useJsPdf`, pass the returned `pdf`; or use the composable’s `loadCustomFontFn` and you won’t need this util).
- **fontPath**: URL or relative path to the font file (e.g. `.ttf`).
- **fontName**: The file name used inside jsPDF VFS (e.g. `'MyFont.ttf'`).
- **fontFamily**: The logical font family name you’ll use with `setFont` (e.g. `'MyFont'`).
- **fontStyle**: Font style (e.g. `'normal'`, `'bold'`, `'italic'`). Defaults to `'normal'`.

If loading fails, it logs a warning to the console instead of throwing.

## Basic Usage (with composable)

When using `useJsPdf`, you can use the composable’s `loadCustomFontFn` so you don’t need to pass the pdf instance or import the util:

```ts
import { useJsPdf } from 'vue-pdfiy'

const { loadCustomFontFn, setFont, setFontSize, addText, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

export async function example_CustomFont() {
  await loadCustomFontFn(
    '/fonts/PlaywriteGBJGuides-Regular.ttf', // path in your public/assets
    'PlaywriteGBJGuides-Regular.ttf',
    'PlaywriteGBJ',
    'normal',
  )

  setFont('PlaywriteGBJ', 'normal')
  setFontSize(16)

  addText('Hello with a custom font!', { x: 20, y: 30 })

  savePdf('custom-font.pdf')
}
```

## Using Multiple Styles (Regular & Italic)

```ts
import { useJsPdf } from 'vue-pdfiy'

const { loadCustomFontFn, setFont, addText, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

export async function example_MultipleFontStyles() {
  await loadCustomFontFn(
    '/fonts/PlaywriteGBJGuides-Regular.ttf',
    'PlaywriteGBJGuides-Regular.ttf',
    'PlaywriteGBJ',
    'normal',
  )

  await loadCustomFontFn(
    '/fonts/PlaywriteGBJGuides-Italic.ttf',
    'PlaywriteGBJGuides-Italic.ttf',
    'PlaywriteGBJ',
    'italic',
  )

  setFont('PlaywriteGBJ', 'normal')
  addText('Regular text', { x: 20, y: 30 })

  setFont('PlaywriteGBJ', 'italic')
  addText('Italic text', { x: 20, y: 40 })

  savePdf('custom-font-styles.pdf')
}
```

