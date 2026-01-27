# Table Builder Pattern - Implementation Plan

## Overview
This document outlines the implementation plan for adding a builder pattern API to vue-pdfiy for creating PDF tables programmatically.

## 1. File Structure

```
src/
  composables/
    useTableBuilder.ts  (new)
    index.ts            (export the builder)
  plugins/
    AutoTable.ts        (keep existing)
  types/
    table.ts            (new - builder types)
```

## 2. Core Builder Architecture

```typescript
// src/composables/useTableBuilder.ts
class TableBuilder {
  private header: CellDef[][] = []
  private body: CellDef[][] = []
  private footer: CellDef[][] = []
  private columns?: ColumnInput[]
  private options: AutoTableOptions = {}

  // Header methods
  addHeader(row: CellDef[]): this
  setHeader(rows: CellDef[][]): this
  clearHeader(): this

  // Body methods
  addRow(row: CellDef[]): this
  addRows(rows: CellDef[][]): this
  setBody(rows: CellDef[][]): this
  clearBody(): this

  // Footer methods
  addFooter(row: CellDef[]): this
  setFooter(rows: CellDef[][]): this
  clearFooter(): this

  // Column configuration
  setColumns(columns: ColumnInput[]): this

  // Style methods
  setTheme(theme: ThemeType): this
  setHeaderStyles(styles: Styles): this
  setBodyStyles(styles: Styles): this
  setFooterStyles(styles: Styles): this
  setAlternateRowStyles(styles: Styles): this
  setColumnStyles(columnIndex: number | string, styles: Styles): this

  // Layout methods
  setMargin(margin: MarginPadding): this
  setStartY(y: number): this
  setTableWidth(width: TableWidthType): this

  // Build method
  build(pdf: jsPDF): void
  getContent(): AutoTableContent
  getOptions(): AutoTableOptions
}
```

## 3. API Design Examples

### Example 1: Simple usage
```typescript
useTableBuilder()
  .addHeader(['Name', 'Age', 'City'])
  .addRow(['John', 30, 'NYC'])
  .addRow(['Jane', 25, 'LA'])
  .build(pdf)
```

### Example 2: With styling
```typescript
useTableBuilder()
  .setHeader([['Name', 'Age', 'City']])
  .addRows([
    ['John', 30, 'NYC'],
    ['Jane', 25, 'LA']
  ])
  .setTheme('striped')
  .setHeaderStyles({ fillColor: '#4CAF50', textColor: '#fff' })
  .setAlternateRowStyles({ fillColor: '#f5f5f5' })
  .build(pdf)
```

### Example 3: Programmatic generation
```typescript
const builder = useTableBuilder()
  .addHeader(['Product', 'Price', 'Stock'])

for (const product of products) {
  builder.addRow([product.name, product.price, product.stock])
}

builder
  .addFooter([`Total: ${products.length} items`])
  .setMargin({ top: 40, right: 40, bottom: 40, left: 40 })
  .build(pdf)
```

### Example 4: Get content without building (for reuse)
```typescript
const content = builder.getContent()
const options = builder.getOptions()
createTable(content, options) // Use with existing API
```

## 4. Type Definitions

```typescript
// src/types/table.ts
export interface TableBuilderConfig {
  autoStyle?: boolean
  defaultTheme?: ThemeType
  defaultMargin?: MarginPadding
}

export interface ITableBuilder {
  // All the method signatures
}
```

## 5. Integration with Existing API

```typescript
// src/composables/index.ts
export function useJsPdf(options: jsPDFOptions) {
  // ... existing code ...
  
  // Add builder method
  const createTableBuilder = (config?: TableBuilderConfig) => {
    return new TableBuilder(pdf, config)
  }

  return {
    // ... existing exports ...
    createTable,           // Keep existing simple API
    createTableBuilder,    // New builder API
  }
}
```

## 6. Helper Utilities

```typescript
// Optional helper functions
export const tableHelpers = {
  // Convert object array to table data
  fromObjects: (data: Record<string, any>[]) => {
    const header = Object.keys(data[0])
    const body = data.map(row => Object.values(row))
    return { header: [header], body }
  },

  // Create header from keys
  fromKeys: (obj: Record<string, any>) => {
    return Object.keys(obj)
  },

  // Format currency column
  formatCurrency: (value: number, currency = '$') => {
    return `${currency}${value.toFixed(2)}`
  }
}
```

## 7. Implementation Priority

### Phase 1 - Core Builder
1. Basic TableBuilder class
2. Header/Body/Footer methods (add, set, clear)
3. Build method
4. Integration with existing createTable

### Phase 2 - Styling
1. Theme methods
2. Style methods (header, body, footer)
3. Column-specific styles

### Phase 3 - Advanced
1. Column configuration
2. Helper utilities
3. Validation methods
4. Clone/reset methods

## 8. Key Features to Include

- **Method Chaining**: All methods return `this`
- **Type Safety**: Full TypeScript support
- **Validation**: Warn about empty tables, mismatched columns
- **Flexibility**: Can extract content/options without building
- **Compatibility**: Works alongside existing `createTable` API

## 9. Example Integration in Component

```typescript
// In a Vue component
const { createTableBuilder, savePdf } = useJsPdf({})

const generateReport = () => {
  createTableBuilder()
    .addHeader(['Month', 'Revenue', 'Expenses'])
    .addRows([
      ['Jan', '$10,000', '$8,000'],
      ['Feb', '$12,000', '$9,000'],
      ['Mar', '$15,000', '$10,000']
    ])
    .addFooter(['Total', '$37,000', '$27,000'])
    .setTheme('grid')
    .setHeaderStyles({ fillColor: '#2196F3', textColor: '#fff' })
    .setMargin(20)
    .build()
    
  savePdf('report.pdf')
}
```

## 10. API Strategy

### Keep Both APIs

- ✅ **createTable**: For simple, declarative usage
- ✅ **createTableBuilder**: For dynamic, programmatic usage

### When to Use Each

**Use `createTable` when:**
- You have all data upfront
- Simple table structure
- One-time table generation
- Prefer declarative style

**Use `createTableBuilder` when:**
- Building tables dynamically
- Conditional rows/styling
- Programmatic generation in loops
- Need to reuse table configuration
- Complex styling requirements

## 11. Testing Strategy

1. Unit tests for TableBuilder class
2. Integration tests with jsPDF
3. Example components demonstrating usage
4. Documentation with live examples

## 12. Documentation Requirements

- API reference for all methods
- Migration guide for existing users
- Comparison guide (when to use each API)
- Recipe examples for common patterns
- TypeScript type documentation

## 13. Implementation Checklist

- [ ] Create `src/types/table.ts` with builder types
- [ ] Implement `TableBuilder` class in `src/composables/useTableBuilder.ts`
- [ ] Add header manipulation methods
- [ ] Add body manipulation methods
- [ ] Add footer manipulation methods
- [ ] Add styling methods
- [ ] Add layout configuration methods
- [ ] Implement `build()` method
- [ ] Implement `getContent()` and `getOptions()` methods
- [ ] Export builder from `src/composables/index.ts`
- [ ] Create helper utilities
- [ ] Write unit tests
- [ ] Create example components
- [ ] Write documentation
- [ ] Update README with builder examples
