# TableBuilder Hooks

## Overview

The TableBuilder hooks API lets you tap into the **jsPDF-AutoTable** rendering lifecycle to:

- **Inspect and modify cells** before they are drawn
- **Apply conditional styling** (e.g. highlight negative values, bold totals)
- **Draw custom content** around the table (page headers/footers, watermarks, etc.)

Hooks are configured via the fluent `on()` method on `TableBuilder`, and are wired into the underlying `jspdf-autotable` `CellHookData` (cell events) and `HookData` (page events) objects.

## Setup

The hooks API is available on any `TableBuilder` instance created via `useJsPdf`:

```ts
import { useJsPdf } from 'vue-pdfiy'

const { createTableBuilder, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

const builder = createTableBuilder()
```

You can now attach hooks using `builder.on(...)` before calling `.build()`.

## Hook API

### `on<K extends keyof TableBuilderEvent>(event: K, callback: TableBuilderEvent[K]): this`

Registers a callback for a specific table lifecycle event.

**Parameters:**

- `event`:
  - `'didParseCell'` → callback receives `CellHookData`
  - `'willDrawCell'` → callback receives `CellHookData`
  - `'didDrawCell'` → callback receives `CellHookData`
  - `'willDrawPage'` → callback receives `HookData`
  - `'didDrawPage'` → callback receives `HookData`
- `callback`:
  - For **cell events** (`didParseCell`, `willDrawCell`, `didDrawCell`): `(data: CellHookData) => void`
  - For **page events** (`willDrawPage`, `didDrawPage`): `(data: HookData) => void`

**Returns:** the same `TableBuilder` instance (for method chaining).

**Example (basic usage):**

```ts
builder
  .addHeader(['Name', 'Amount'])
  .addRow(['Order #1', 100])
  .on('didParseCell', (data) => {
    // inspect/modify cell before layout is finalized
  })
  .build()
```

## Events

### 1. `didParseCell`

**When it fires:**  
After the table has parsed cell content and styles, but **before** layout is finalized and drawing starts.

**Use it for:**

- Adjusting styles based on cell/row/column values
- Changing text, alignment, padding, etc.
- Preparing per-cell state before drawing

**Typical `CellHookData` properties for cell events (from `jspdf-autotable`):**

- `data.cell` – current cell (content, styles, etc.)
- `data.row` – current row (index, section)
- `data.column` – current column (index, dataKey)
- `data.section` – `'head' | 'body' | 'foot'`
- `data.doc` – current `jsPDF` instance

**Example – highlight negative numbers in red:**

```ts
builder
  .addHeader(['Item', 'Amount'])
  .addRows([
    ['Revenue', 1200],
    ['Expenses', -500],
  ])
  .on('didParseCell', (data) => {
    if (data.section === 'body' && data.column.index === 1) {
      const value = Number(data.cell.raw)
      if (!Number.isNaN(value) && value < 0) {
        data.cell.styles.textColor = '#f44336'
      }
    }
  })
  .build()
```

### 2. `willDrawCell`

**When it fires:**  
Right **before** a cell is drawn on the page.

**Use it for:**

- Fine-grained drawing (e.g. custom borders, background)
- Overriding or augmenting the automatic drawing
- Using low-level `jsPDF` APIs at the cell position

**Example – add a left border only for the first column:**

```ts
builder
  .addHeader(['Name', 'Age'])
  .addRows([
    ['John', 30],
    ['Jane', 25],
  ])
  .on('willDrawCell', (data) => {
    const { doc, cell, column } = data

    if (column.index === 0 && data.section === 'body') {
      const { x, y, height } = cell
      doc.setDrawColor('#9e9e9e')
      doc.setLineWidth(0.3)
      doc.line(x, y, x, y + height)
    }
  })
  .build()
```

### 3. `didDrawCell`

**When it fires:**  
Right **after** a cell has been drawn.

**Use it for:**

- Overlaying annotations or icons on top of cell content
- Drawing borders or decorations that must appear above the text
- Adding debug markers while developing layouts

**Example – draw a check icon for completed tasks:**

```ts
builder
  .addHeader(['Task', 'Status'])
  .addRows([
    ['Build docs', 'done'],
    ['Ship release', 'pending'],
  ])
  .on('didDrawCell', (data) => {
    if (data.section !== 'body' || data.column.index !== 1) return

    if (String(data.cell.raw).toLowerCase() === 'done') {
      const { doc, cell } = data
      const x = cell.textPos.x + 2
      const y = cell.textPos.y - 2

      doc.setTextColor('#4caf50')
      doc.setFontSize(8)
      doc.text('✔', x, y)
    }
  })
  .build()
```

### 4. `willDrawPage`

**When it fires:**  
Right **before** a page with a table is drawn.

**Hook payload type:**  
`HookData` (page-level hook data from `jspdf-autotable`).

**Use it for:**

- Drawing page headers (title, logo, report name)
- Adding watermarks or background elements
- Reserving space at the top of each page

**Example – add a page header:**

```ts
builder
  .addHeader(['Product', 'Price'])
  .addRows(products)
  .on('willDrawPage', (data) => {
    const { doc } = data

    doc.setFontSize(14)
    doc.setTextColor('#333333')
    doc.text('Monthly Sales Report', doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })

    // Move table start below header
    data.settings.startY = 25
  })
  .build()
```

### 5. `didDrawPage`

**When it fires:**  
Right **after** a page with a table has been drawn.

**Hook payload type:**  
`HookData` (page-level hook data from `jspdf-autotable`).

**Use it for:**

- Page footers (page numbers, dates, copyright)
- Drawing content that must appear on top of the table
- Final page decorations

**Example – add page numbers:**

```ts
builder
  .addHeader(['Name', 'Amount'])
  .addRows(rows)
  .on('didDrawPage', (data) => {
    const { doc } = data
    const pageNumber = doc.getNumberOfPages()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    doc.setFontSize(10)
    doc.setTextColor('#9e9e9e')
    doc.text(`Page ${pageNumber}`, pageWidth - 20, pageHeight - 10)
  })
  .build()
```

## Combining Multiple Hooks

You can register **multiple hooks** on the same builder. They will be applied together when the table is built.

```ts
builder
  .addHeader(['Item', 'Qty', 'Total'])
  .addRows(orderItems)
  .on('didParseCell', (data) => {
    // Highlight totals row
    if (data.section === 'foot') {
      data.cell.styles.fontStyle = 'bold'
    }
  })
  .on('willDrawPage', (data) => {
    // Header on each page
    const { doc } = data
    doc.setFontSize(12)
    doc.text('Order Summary', 20, 15)
    data.settings.startY = 25
  })
  .on('didDrawPage', (data) => {
    // Footer on each page
    const { doc } = data
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    doc.setFontSize(9)
    doc.text('Confidential', pageWidth / 2, pageHeight - 8, { align: 'center' })
  })
  .build()
```

## Best Practices

1. **Keep hooks focused**
   - Use small, single-responsibility callbacks for clearer logic.
   - Prefer multiple `on(...)` calls instead of one huge callback.

2. **Use sections wisely**
   - Check `data.section === 'head' | 'body' | 'foot'` before applying changes.
   - This avoids accidentally styling headers/footers when you only mean body rows.

3. **Avoid heavy work inside hooks**
   - Hooks run for **every cell** (for cell events), so keep them fast.
   - Pre-compute configuration outside of hooks when possible.

4. **Debug visually**
   - While building layouts, temporarily draw debug markers (lines, small texts) in hooks to verify positions.

5. **Leverage TypeScript types**
   - Import `CellHookData`, `HookData`, and `TableBuilderEvent` types from `vue-pdfiy` (re-exported from `jspdf-autotable`) for full typing support in your callbacks.

With hooks, `TableBuilder` becomes a powerful way to create **highly customized**, **data-driven** tables while still enjoying a clean, fluent API.
