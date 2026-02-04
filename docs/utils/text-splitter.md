# Text Splitter Utilities

## Overview

The text splitter utilities are thin wrappers around jsPDF’s text measurement and splitting helpers.  
They are useful when you need to:

- Wrap long text into multiple lines that fit a specific width.
- Measure how wide a piece of text is in the current font/size.
- Inspect character–level widths for advanced layout logic.

You access them from `useJsPdf`:

```ts
import { useJsPdf } from 'vue-pdfiy'

const { splitTextToSize, getStringUnitWidth, getCharWidthsArray } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})
```

Underlying types:

```ts
type TextSplitterOptions = {
  text: string
  size: number
  extraOptions?: any
}

type textSplitterGetOptions = {
  text: string
  extraOptions?: any
}
```


## `splitTextToSize`

Splits a long string into multiple lines so that each line fits within a given width.

**Signature**

```ts
function splitTextToSize(options: TextSplitterOptions): string[]
```

- `text`: The full string you want to wrap.
- `size`: Maximum line width (in the current unit, e.g. `mm`).
- `extraOptions` (optional): Extra jsPDF text options.

### Example: Wrap a long paragraph

```ts
import { useJsPdf } from 'vue-pdfiy'

const { splitTextToSize, addText, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

const paragraph =
  'Thank you for your purchase! If you have any questions about your order, ' +
  'please contact our support team at support@example.com within 30 days.'

// Split paragraph so each line fits within 80 mm
const lines = splitTextToSize({ text: paragraph, size: 80 })

let y = 20
lines.forEach((line) => {
  addText(line, { x: 20, y })
  y += 8 // move down for the next line
})

savePdf('wrapped-text.pdf')
```

---

## `getStringUnitWidth`

Returns the width of a string in “text units” for the current font and font size.

**Signature**

```ts
function getStringUnitWidth(options: textSplitterGetOptions): number
```

- `text`: The string to measure.
- `extraOptions` (optional): Extra jsPDF text options.

### Example: Measure text before placing it

```ts
import { useJsPdf } from 'vue-pdfiy'

const { getStringUnitWidth, addText, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

const title = 'Invoice #12345'

const widthUnits = getStringUnitWidth({ text: title })
console.log('Title width (units):', widthUnits)

addText(title, { x: 20, y: 20 })
savePdf('measured-text.pdf')
```

---

## `getCharWidthsArray`

Returns an array with the width of each character in the string.

**Signature**

```ts
function getCharWidthsArray(options: textSplitterGetOptions): any[]
```

- `text`: The string to measure character by character.
- `extraOptions` (optional): Extra jsPDF text options.

### Example: Inspect character widths

```ts
import { useJsPdf } from 'vue-pdfiy'

const { getCharWidthsArray, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

const sample = 'Hello vue-pdfiy'

const charWidths = getCharWidthsArray({ text: sample })
console.log('Character widths:', charWidths)

savePdf('char-widths.pdf')
```

---

## Real-world Example: Auto-wrapping a customer note

This example is similar to `example1_SimpleTable` and shows how you might wrap a customer note at the bottom of an invoice.

```ts
import { useJsPdf } from 'vue-pdfiy'

export function example_CustomerNote() {
  const { splitTextToSize, addText, savePdf } = useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  const customerNote =
    'Thank you for your purchase! If you have any questions about your order, ' +
    'please contact our support team at support@example.com within 30 days.'

  // Allow up to 160 mm of width for the note text
  const wrappedNoteLines = splitTextToSize({ text: customerNote, size: 160 })

  let y = 250 // near bottom of A4 in mm
  wrappedNoteLines.forEach((line) => {
    addText(line, { x: 20, y })
    y += 6
  })

  savePdf('invoice-with-note.pdf')
}
```

