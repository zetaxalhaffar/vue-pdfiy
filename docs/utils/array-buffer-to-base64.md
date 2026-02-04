# `arrayBufferToBase64` Utility

## Overview

The `arrayBufferToBase64` utility converts an `ArrayBuffer` into a Base64-encoded string.  
This is especially useful when you need to embed binary data (like fonts or images) into jsPDF’s virtual file system (VFS) or send it over the network as text.

```ts
import arrayBufferToBase64 from '@/utils/ArrayBufferToBase64'
```

## Signature

```ts
function arrayBufferToBase64(buffer: ArrayBuffer): string
```

- **buffer**: The binary data you want to convert.
- **returns**: A Base64 string representation of the buffer.

## Basic Usage

```ts
const response = await fetch('/path/to/file.bin')
const data = await response.arrayBuffer()

const base64 = arrayBufferToBase64(data)
console.log('Base64 data:', base64)
```

## With jsPDF VFS

You’ll typically use `arrayBufferToBase64` indirectly via higher-level helpers (like `loadCustomFont`), but you can also use it directly:

```ts
import { useJsPdf } from 'vue-pdfiy'
import arrayBufferToBase64 from '@/utils/ArrayBufferToBase64'

const { addFileToVFS, addText, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

export async function example_AddBinaryToVfs() {
  const response = await fetch('/assets/custom-icon.ttf')
  const buffer = await response.arrayBuffer()

  const base64 = arrayBufferToBase64(buffer)

  // Store in jsPDF VFS (for fonts or other binary resources)
  addFileToVFS({ name: 'custom-icon.ttf', content: base64 })

  // Draw something just to produce a PDF
  addText('Binary added to VFS', { x: 20, y: 30 })

  savePdf('vfs-binary-example.pdf')
}
```

