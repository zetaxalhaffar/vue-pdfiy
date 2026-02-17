# vue-pdfiy

A powerful Vue 3 composable for creating PDF documents with jsPDF and jsPDF-AutoTable. Build PDFs programmatically with a clean, fluent API.

> [!WARNING]
> **⚠️ Under Active Development**
> 
> This package is currently under active maintenance and development. While it's functional, the API may change and some features may not be fully stable yet. We recommend:
> - Use with caution in production environments
> - Pin to a specific version in your `package.json`
> - Report any issues you encounter on [GitHub Issues](https://github.com/zetaxalhaffar/vue-pdfiy/issues)
> 
> We're working hard to stabilize the package and appreciate your patience and feedback!

[![npm](https://img.shields.io/npm/v/vue-pdfiy)](https://www.npmjs.com/package/vue-pdfiy)
[![npm downloads](https://img.shields.io/npm/dm/vue-pdfiy)](https://www.npmjs.com/package/vue-pdfiy)

## Features

- 📄 **Simple PDF Creation** - Create PDFs with ease using Vue 3 composables
- 📊 **Table Builder** - Fluent API for dynamic table generation
- 🎨 **Rich Styling** - Comprehensive styling options for tables and content
- 🔧 **TypeScript Support** - Full TypeScript definitions included
- 🚀 **Performant** - Built on top of jsPDF and jsPDF-AutoTable
- 💪 **Flexible** - Both declarative and programmatic APIs available

## Installation

```bash
npm install vue-pdfiy
# or
yarn add vue-pdfiy
# or
bun add vue-pdfiy
```

## Quick Start

### Basic PDF Creation

```typescript
import { useJsPdf } from 'vue-pdfiy'

const { addText, setFontSize, savePdf } = useJsPdf({ 
  orientation: 'p', 
  unit: 'mm', 
  format: 'a4' 
})

setFontSize(20)
addText('Hello, PDF!', 20, 20)
savePdf('hello.pdf')
```

### Simple Table

```typescript
import { useJsPdf } from 'vue-pdfiy'

const { createTable, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

createTable({
  header: [['Name', 'Age', 'City']],
  body: [
    ['John', 30, 'NYC'],
    ['Jane', 25, 'LA']
  ]
}, { theme: 'grid' })

savePdf('table.pdf')
```

## TableBuilder API

For dynamic, programmatic table creation, use the TableBuilder:

### Basic Example

```typescript
import { useJsPdf } from 'vue-pdfiy'

const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

createTableBuilder()
  .addHeader(['Product', 'Price', 'Stock'])
  .addRow(['Laptop', '$999', 50])
  .addRow(['Mouse', '$29', 200])
  .setTheme('striped')
  .setHeaderStyles({ fillColor: '#4CAF50', textColor: '#fff' })
  .build()

savePdf('products.pdf')
```

### Dynamic Generation

```typescript
const builder = createTableBuilder()
  .addHeader(['Name', 'Score'])

for (const student of students) {
  builder.addRow([student.name, student.score])
}

builder
  .setTheme('grid')
  .setAlternateRowStyles({ fillColor: '#f5f5f5' })
  .build()
```

### With Helper Utilities

```typescript
import { useJsPdf, fromObjects, formatCurrency } from 'vue-pdfiy'

const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

const data = [
  { product: 'Laptop', price: 999, quantity: 5 },
  { product: 'Mouse', price: 29, quantity: 10 }
]

const { header, body } = fromObjects(data)

createTableBuilder()
  .setHeader(header)
  .addRows(body)
  .build()

savePdf('report.pdf')
```

## Documentation

- [TableBuilder API Documentation](./docs/TABLE_BUILDER.md) - Comprehensive API reference
- [Examples](./examples/tableBuilderExample.ts) - Real-world usage examples

## API Overview

### useJsPdf Composable

The main composable provides methods for PDF creation:

#### PDF Methods
- `pdf` - Access to the underlying jsPDF instance
- `fileId(id)` - Set PDF file ID
- `savePdf(filename)` - Save PDF to file

#### Text Methods
- `addText(text, x, y)` - Add text to PDF
- `setFont(name, style, weight)` - Set font
- `setFontSize(size)` - Set font size
- `textColor(r, g, b, alpha)` - Set text color
- `loadCustomFontFn(path, name, family, style)` - Load custom font

#### Page Methods
- `addPage(format, orientation)` - Add new page
- `setPage(pageNumber)` - Set active page
- `movePage(target, before)` - Move page
- `deletePage(pageNumber)` - Delete page

#### Drawing Methods
- `drawLine(x1, y1, x2, y2, style)` - Draw line
- `createCircle(x, y, r, style)` - Draw circle
- `lineCap(cap)` - Set line cap style
- `lineDashPattern(pattern, phase)` - Set dash pattern
- `lineWidth(width)` - Set line width
- `drawColor(r, g, b, alpha)` - Set draw color
- `fillColor(r, g, b, alpha)` - Set fill color

#### Table Methods
- `createTable(content, options)` - Create table (declarative)
- `createTableBuilder(config)` - Create table builder (programmatic)

### Helper Utilities

- `fromObjects(data)` - Convert object array to table data
- `fromKeys(obj)` - Extract keys from object
- `formatCurrency(value, currency)` - Format number as currency
- `formatDate(date, format)` - Format date
- `createTotalRow(label, data, columnIndices)` - Create total row

## TableBuilder Methods

### Header
- `addHeader(row)` - Add header row
- `setHeader(rows)` - Set entire header
- `clearHeader()` - Clear header

### Body
- `addRow(row)` - Add single row
- `addRows(rows)` - Add multiple rows
- `setBody(rows)` - Set entire body
- `clearBody()` - Clear body

### Footer
- `addFooter(row)` - Add footer row
- `setFooter(rows)` - Set entire footer
- `clearFooter()` - Clear footer

### Styling
- `setTheme(theme)` - Set table theme
- `setHeaderStyles(styles)` - Style header
- `setBodyStyles(styles)` - Style body
- `setFooterStyles(styles)` - Style footer
- `setAlternateRowStyles(styles)` - Style alternate rows
- `setColumnStyles(index, styles)` - Style specific column

### Layout
- `setMargin(margin)` - Set table margins
- `setStartY(y)` - Set starting Y position
- `setTableWidth(width)` - Set table width

### Build
- `build(pdf?)` - Build and render table
- `getContent()` - Get content configuration
- `getOptions()` - Get options configuration
- `reset()` - Reset builder
- `clone()` - Clone builder

## When to Use What

### Use `createTable` when:
- ✓ You have all data upfront
- ✓ Simple table structure
- ✓ One-time generation

### Use `createTableBuilder` when:
- ✓ Building tables dynamically
- ✓ Conditional rows/styling
- ✓ Programmatic generation in loops
- ✓ Complex styling requirements

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type { 
  TableBuilder, 
  TableBuilderConfig,
  TableHelpers,
  AutoTableContent,
  AutoTableOptions 
} from 'vue-pdfiy'
```

## Examples

Check out the [examples directory](./examples) for comprehensive usage examples:
- Simple tables
- Styled tables
- Dynamic generation
- Multi-page reports
- Invoice generation
- And more...

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
