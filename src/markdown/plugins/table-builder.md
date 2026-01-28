# TableBuilder API Documentation

## Overview

The TableBuilder provides a fluent, chainable API for creating PDF tables programmatically. It's designed for scenarios where you need to build tables dynamically, apply conditional styling, or generate tables in loops.

## Installation

The TableBuilder is included in `vue-pdfiy`. Simply import it from the composables:

```typescript
import { useJsPdf } from 'vue-pdfiy'

const { createTableBuilder } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })
```

## Quick Start

### Basic Example

```typescript
import { useJsPdf } from 'vue-pdfiy'

const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

createTableBuilder()
  .addHeader(['Name', 'Age', 'City'])
  .addRow(['John', 30, 'NYC'])
  .addRow(['Jane', 25, 'LA'])
  .build()

savePdf('my-table.pdf')
```

## API Reference

### Creating a Builder

#### `createTableBuilder(config?: TableBuilderConfig): TableBuilder`

Creates a new TableBuilder instance.

**Parameters:**
- `config` (optional): Configuration object
  - `autoStyle?: boolean` - Whether to automatically apply styling
  - `defaultTheme?: ThemeType` - Default theme ('striped', 'grid', 'plain')
  - `defaultMargin?: MarginPadding` - Default margin configuration

**Example:**
```typescript
const builder = createTableBuilder({
  defaultTheme: 'striped',
  defaultMargin: 20
})
```

### Header Methods

#### `addHeader(row: CellDef[]): this`

Adds a single header row to the table.

**Example:**
```typescript
builder.addHeader(['Column 1', 'Column 2', 'Column 3'])
```

#### `setHeader(rows: CellDef[][]): this`

Sets the entire header (replaces existing header).

**Example:**
```typescript
builder.setHeader([
  ['Main Header'],
  ['Sub Header 1', 'Sub Header 2', 'Sub Header 3']
])
```

#### `clearHeader(): this`

Clears all header rows.

**Example:**
```typescript
builder.clearHeader()
```

### Body Methods

#### `addRow(row: CellDef[]): this`

Adds a single row to the table body.

**Example:**
```typescript
builder.addRow(['Value 1', 'Value 2', 'Value 3'])
```

#### `addRows(rows: CellDef[][]): this`

Adds multiple rows to the table body.

**Example:**
```typescript
builder.addRows([
  ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
  ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3']
])
```

#### `setBody(rows: CellDef[][]): this`

Sets the entire body (replaces existing body).

**Example:**
```typescript
builder.setBody([
  ['Data 1', 'Data 2', 'Data 3'],
  ['Data 4', 'Data 5', 'Data 6']
])
```

#### `clearBody(): this`

Clears all body rows.

**Example:**
```typescript
builder.clearBody()
```

### Footer Methods

#### `addFooter(row: CellDef[]): this`

Adds a single footer row to the table.

**Example:**
```typescript
builder.addFooter(['Total', '', '$1,234.56'])
```

#### `setFooter(rows: CellDef[][]): this`

Sets the entire footer (replaces existing footer).

**Example:**
```typescript
builder.setFooter([
  ['Subtotal', '', '$1,000.00'],
  ['Tax', '', '$234.56'],
  ['Total', '', '$1,234.56']
])
```

#### `clearFooter(): this`

Clears all footer rows.

**Example:**
```typescript
builder.clearFooter()
```

### Column Configuration

#### `setColumns(columns: ColumnInput[]): this`

Sets column definitions for the table.

**Example:**
```typescript
builder.setColumns([
  { header: 'Name', dataKey: 'name' },
  { header: 'Age', dataKey: 'age' },
  { header: 'City', dataKey: 'city' }
])
```

### Style Methods

#### `setTheme(theme: ThemeType): this`

Sets the table theme.

**Available themes:**
- `'striped'` - Alternating row colors
- `'grid'` - Grid with borders
- `'plain'` - Minimal styling

**Example:**
```typescript
builder.setTheme('grid')
```

#### `setHeaderStyles(styles: Styles): this`

Sets styles for the header section.

**Example:**
```typescript
builder.setHeaderStyles({ 
  fillColor: '#4CAF50', 
  textColor: '#ffffff',
  fontStyle: 'bold',
  fontSize: 12
})
```

#### `setBodyStyles(styles: Styles): this`

Sets styles for the body section.

**Example:**
```typescript
builder.setBodyStyles({ 
  fontSize: 10,
  textColor: '#333333'
})
```

#### `setFooterStyles(styles: Styles): this`

Sets styles for the footer section.

**Example:**
```typescript
builder.setFooterStyles({ 
  fillColor: '#2196F3', 
  textColor: '#ffffff',
  fontStyle: 'bold'
})
```

#### `setAlternateRowStyles(styles: Styles): this`

Sets styles for alternate rows.

**Example:**
```typescript
builder.setAlternateRowStyles({ fillColor: '#f5f5f5' })
```

#### `setColumnStyles(columnIndex: number | string, styles: Styles): this`

Sets styles for a specific column.

**Example:**
```typescript
builder
  .setColumnStyles(0, { halign: 'left' })
  .setColumnStyles(2, { halign: 'right', fontStyle: 'bold' })
```

### Layout Methods

#### `setMargin(margin: MarginPadding | number): this`

Sets the table margins.

**Example:**
```typescript
// Single number for all sides
builder.setMargin(20)

// Object for individual sides
builder.setMargin({ top: 40, right: 20, bottom: 20, left: 20 })
```

#### `setStartY(y: number): this`

Sets the starting Y position for the table.

**Example:**
```typescript
builder.setStartY(50)
```

#### `setTableWidth(width: TableWidthType): this`

Sets the table width.

**Example:**
```typescript
builder.setTableWidth('auto')
// or
builder.setTableWidth(180)
```

### Build Methods

#### `build(pdf?: jsPDF): void`

Builds and renders the table to the PDF.

**Example:**
```typescript
builder.build()
// or with explicit PDF instance
builder.build(pdfInstance)
```

#### `getContent(): AutoTableContent`

Gets the table content configuration without building.

**Returns:**
```typescript
{
  header?: CellDef[][],
  body: CellDef[][],
  footer?: CellDef[][],
  columns?: ColumnInput[]
}
```

**Example:**
```typescript
const content = builder.getContent()
createTable(content, options)
```

#### `getOptions(): AutoTableOptions`

Gets the table options configuration without building.

**Returns:**
```typescript
{
  theme?: ThemeType,
  headStyles?: Styles,
  bodyStyles?: Styles,
  // ... other options
}
```

**Example:**
```typescript
const options = builder.getOptions()
```

### Utility Methods

#### `reset(): this`

Resets the builder to initial state while preserving default configuration.

**Example:**
```typescript
builder
  .addHeader(['Col 1', 'Col 2'])
  .addRow(['Data 1', 'Data 2'])
  .build()
  .reset() // Clear all data
  .addHeader(['New Col 1', 'New Col 2'])
  .build()
```

#### `clone(): TableBuilder`

Creates a copy of the current builder with the same configuration.

**Example:**
```typescript
const template = createTableBuilder({ defaultTheme: 'grid' })
  .setHeaderStyles({ fillColor: '#4CAF50', textColor: '#fff' })

const table1 = template.clone()
  .addHeader(['Name', 'Age'])
  .addRows([['John', 30], ['Jane', 25]])

const table2 = template.clone()
  .addHeader(['Product', 'Price'])
  .addRows([['Laptop', '$999'], ['Phone', '$699']])
```

## Helper Utilities

### `fromObjects(data: Record<string, any>[])`

Converts an array of objects to table data.

**Example:**
```typescript
import { fromObjects } from 'vue-pdfiy'

const employees = [
  { name: 'John', age: 30, city: 'NYC' },
  { name: 'Jane', age: 25, city: 'LA' }
]

const { header, body } = fromObjects(employees)
builder.setHeader(header).addRows(body)
```

### `fromKeys(obj: Record<string, any>)`

Extracts keys from an object.

**Example:**
```typescript
import { fromKeys } from 'vue-pdfiy'

const data = { name: 'John', age: 30, city: 'NYC' }
const headers = fromKeys(data)
// ['name', 'age', 'city']
```

### `formatCurrency(value: number, currency?: string)`

Formats a number as currency.

**Example:**
```typescript
import { formatCurrency } from 'vue-pdfiy'

formatCurrency(1234.56) // '$1,234.56'
formatCurrency(1234.56, '€') // '€1,234.56'
```

### `formatDate(date: Date | string, format?: string)`

Formats a date.

**Example:**
```typescript
import { formatDate } from 'vue-pdfiy'

formatDate(new Date('2024-01-15')) // '2024-01-15'
formatDate('2024-01-15', 'MM/DD/YYYY') // '01/15/2024'
```

### `createTotalRow(label: string, data: any[][], columnIndices: number[])`

Creates a total row by summing specified columns.

**Example:**
```typescript
import { createTotalRow } from 'vue-pdfiy'

const data = [
  ['Product A', 100, 50],
  ['Product B', 200, 75]
]

const totalRow = createTotalRow('Total', data, [1, 2])
// ['Total', 300, 125]
```

## Common Patterns

### Pattern 1: Dynamic Table Generation

```typescript
const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

const products = await fetchProducts() // From API

const builder = createTableBuilder()
  .addHeader(['Product', 'Price', 'Stock'])

for (const product of products) {
  builder.addRow([product.name, formatCurrency(product.price), product.stock])
}

builder.build()
savePdf('products.pdf')
```

### Pattern 2: Conditional Styling

```typescript
const builder = createTableBuilder()
  .addHeader(['Status', 'Task', 'Priority'])

tasks.forEach((task, index) => {
  builder.addRow([task.status, task.name, task.priority])
  
  // Apply conditional styling
  if (task.priority === 'High') {
    builder.setColumnStyles(index, { fillColor: '#ffebee' })
  }
})

builder.build()
```

### Pattern 3: Multi-Section Report

```typescript
const { createTableBuilder, addText, setFontSize, savePdf } = useJsPdf({ 
  orientation: 'p', 
  unit: 'mm', 
  format: 'a4' 
})

// Title
setFontSize(20)
addText('Monthly Report', 105, 20)

// Section 1
createTableBuilder()
  .addHeader(['Region', 'Sales'])
  .addRows(salesData)
  .setStartY(40)
  .build()

// Section 2
createTableBuilder()
  .addHeader(['Product', 'Revenue'])
  .addRows(productData)
  .setStartY(100)
  .build()

savePdf('report.pdf')
```

### Pattern 4: Reusable Table Template

```typescript
// Create template with common styling
const createStandardTable = () => {
  return createTableBuilder({
    defaultTheme: 'grid',
    defaultMargin: 20
  })
    .setHeaderStyles({ 
      fillColor: '#4CAF50', 
      textColor: '#fff',
      fontStyle: 'bold'
    })
    .setAlternateRowStyles({ fillColor: '#f9f9f9' })
}

// Use template
const table1 = createStandardTable()
  .addHeader(['Col 1', 'Col 2'])
  .addRows(data1)
  .build()

const table2 = createStandardTable()
  .addHeader(['Col A', 'Col B'])
  .addRows(data2)
  .build()
```

## When to Use TableBuilder vs createTable

### Use `createTable` when:
- ✓ You have all data upfront
- ✓ Simple table structure
- ✓ One-time table generation
- ✓ Prefer declarative style

```typescript
createTable({
  header: [['Name', 'Age']],
  body: [['John', 30], ['Jane', 25]]
}, { theme: 'grid' })
```

### Use `createTableBuilder` when:
- ✓ Building tables dynamically
- ✓ Conditional rows/styling
- ✓ Programmatic generation in loops
- ✓ Need to reuse table configuration
- ✓ Complex styling requirements

```typescript
const builder = createTableBuilder()
for (const item of items) {
  if (item.isVisible) {
    builder.addRow([item.name, item.value])
  }
}
builder.build()
```

## Style Options

### Common Style Properties

```typescript
{
  fillColor: string | number[] // Background color
  textColor: string | number[]  // Text color
  fontStyle: 'normal' | 'bold' | 'italic' | 'bolditalic'
  fontSize: number
  halign: 'left' | 'center' | 'right'
  valign: 'top' | 'middle' | 'bottom'
  cellPadding: number | MarginPadding
  lineWidth: number
  lineColor: string | number[]
  minCellHeight: number
  minCellWidth: number
}
```

### Color Formats

Colors can be specified as:
- Hex string: `'#FF5722'`
- RGB array: `[255, 87, 34]`
- Gray value: `128`

## Best Practices

1. **Use method chaining** for cleaner code:
   ```typescript
   builder
     .addHeader(['Name', 'Age'])
     .addRow(['John', 30])
     .setTheme('grid')
     .build()
   ```

2. **Clone builders** for reusable configurations:
   ```typescript
   const template = createTableBuilder({ defaultTheme: 'grid' })
   const table1 = template.clone().addHeader(['A', 'B'])
   const table2 = template.clone().addHeader(['X', 'Y'])
   ```

3. **Use helper utilities** for data conversion:
   ```typescript
   const { header, body } = fromObjects(dataArray)
   builder.setHeader(header).addRows(body)
   ```

4. **Set startY** for proper spacing:
   ```typescript
   builder.setStartY(pdf.lastAutoTable.finalY + 10)
   ```

5. **Validate before building**:
   ```typescript
   if (dataArray.length > 0) {
     builder.addRows(dataArray).build()
   }
   ```

## TypeScript Support

The TableBuilder is fully typed with TypeScript:

```typescript
import type { 
  TableBuilder, 
  TableBuilderConfig,
  TableHelpers,
  ITableBuilder 
} from 'vue-pdfiy'

const config: TableBuilderConfig = {
  defaultTheme: 'striped',
  defaultMargin: 20
}

const builder: TableBuilder = createTableBuilder(config)
```

## Examples

See the [examples directory](../examples/tableBuilderExample.ts) for comprehensive usage examples including:
- Simple tables
- Styled tables
- Dynamic generation
- Multi-page reports
- Invoice generation
- And more...

## Troubleshooting

### Table not appearing
- Ensure you call `.build()` at the end
- Check that body has at least one row
- Verify PDF instance is available

### Styling not applying
- Check theme compatibility (some themes override styles)
- Ensure styles are set before calling `.build()`
- Verify color format is correct

### Layout issues
- Use `setStartY()` to position tables correctly
- Set appropriate margins with `setMargin()`
- Check table width doesn't exceed page width

## License

MIT
