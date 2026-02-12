# TableBuilder Documentation

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

For the complete API (all methods, parameters, and helper utilities), see **[TableBuilder API Reference](./table-builder-api-refrences.md)**.

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

See the [TableBuilder API Reference](./table-builder-api-refrences.md) for method details and the [examples](../examples.md) for comprehensive usage including:
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
