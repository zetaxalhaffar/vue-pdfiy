/**
 * TableBuilder Usage Examples
 *
 * This file demonstrates various ways to use the TableBuilder API
 * for creating PDF tables programmatically
 */

import { formatCurrency, fromObjects, useJsPdf } from '@/composables'
import type { CellDefAutoTable } from '@/types/table'

// ============================================
// Example 1: Simple Table
// ============================================
export function example1_SimpleTable() {
  const { savePdf, addText, createTableBuilder } = useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  addText('Hello, world!', { x: 10, y: 10 })
  createTableBuilder()
    .setHeader([['Name', 'Age', 'City']])
    .addRow(['John Doe', '30', 'New York'])
    .addRow(['Jane Smith', '25', 'Los Angeles'])
    .addRow(['Bob Johnson', '35', 'Chicago'])
    .on('willDrawCell', (data) => {
      console.log(data)
      if (data.section == 'body') return

      console.log(data)
      if (String(data.cell.raw).toLowerCase() === 'city') {
        const { doc, cell } = data
        const x = cell.x + 2
        const y = cell.y - 2

        doc.setTextColor('#4caf50')
        doc.setFontSize(8)
        doc.text('✔', x, y)
      }
    })
    .build()

  savePdf('simple-table.pdf')
}

// ============================================
// Example 2: Styled Table
// ============================================
export function example2_StyledTable() {
  const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

  createTableBuilder()
    .setHeader([['Product', 'Price', 'Stock']])
    .addRows([
      ['Laptop', '$999', '50'],
      ['Mouse', '$29', '200'],
      ['Keyboard', '$79', '150'],
      ['Monitor', '$299', '75'],
    ])
    .setTheme('striped')
    .setHeaderStyles({
      fillColor: '#4CAF50',
      textColor: '#ffffff',
      fontStyle: 'bold',
      fontSize: 22,
    })
    .setAlternateRowStyles({ fillColor: '#f5f5f5' })
    .setMargin(20)
    .build()

  savePdf('styled-table.pdf')
}

// ============================================
// Example 3: Dynamic Table with Loop
// ============================================
export function example3_DynamicTable() {
  const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

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

  // Add footer with totals
  const grandTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  builder
    .addFooter(['Total', '', '', formatCurrency(grandTotal)])
    .setFooterStyles({
      fillColor: '#2196F3',
      textColor: '#ffffff',
      fontStyle: 'bold',
    })
    .build()

  savePdf('dynamic-table.pdf')
}

// ============================================
// Example 4: Table from Objects
// ============================================
export function example4_TableFromObjects() {
  const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

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

  savePdf('table-from-objects.pdf')
}

// ============================================
// Example 5: Multi-Page Report
// ============================================
export function example5_MultiPageReport() {
  const { pdf, createTableBuilder, addText, setFontSize, savePdf } = useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  console.log(pdf.getCurrentPageInfo())
  // Title
  setFontSize(20)
  addText('Monthly Sales Report', { x: 105, y: 20 })

  setFontSize(12)
  addText('January 2024', { x: 105, y: 30 })

  // First table - Sales by region
  createTableBuilder()
    .addHeader(['Region', 'Sales', 'Growth'])
    .addRows([
      ['North', '$125,000', '+15%'],
      ['South', '$98,000', '+8%'],
      ['East', '$110,000', '+12%'],
      ['West', '$105,000', '+10%'],
    ])
    .setStartY(40)
    .setTheme('grid')
    .setHeaderStyles({ fillColor: '#FF5722', textColor: '#fff' })
    .build()

  // Second table - Top products
  createTableBuilder()
    .addHeader(['Product', 'Units Sold', 'Revenue'])
    .addRows([
      ['Product A', '1,200', '$60,000'],
      ['Product B', '850', '$42,500'],
      ['Product C', '1,050', '$52,500'],
    ])
    // @ts-expect-error - lastAutoTable is not available in jsPDF but it is there in the pdf object
    .setStartY(pdf?.lastAutoTable.finalY + 300)
    .setTheme('striped')
    .setHeaderStyles({ fillColor: '#009688', textColor: '#fff' })
    .build()

  savePdf('multi-page-report.pdf')
}

// ============================================
// Example 6: Column-Specific Styling
// ============================================
export function example6_ColumnStyling() {
  const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

  createTableBuilder()
    .addHeader(['Status', 'Task', 'Priority', 'Due Date'])
    .addRows([
      ['😂', 'Complete project', 'High', '2024-01-15'],
      ['😂', 'Review code', 'Medium', '2024-01-20'],
      ['😂', 'Write tests', 'High', '2024-01-18'],
      ['😂', 'Update docs', 'Low', '2024-01-25'],
    ])
    .setColumnStyles(0, { fillColor: '#E8F5E9', halign: 'center' }) // Status column
    .setColumnStyles(2, { fillColor: '#FFF3E0', fontStyle: 'bold' }) // Priority column
    .setTheme('grid')
    .build()

  savePdf('column-styling.pdf')
}

// ============================================
// Example 7: Reusing Builder Configuration
// ============================================
export function example7_ReusingBuilder() {
  const { createTableBuilder, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

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

  savePdf('reusing-builder.pdf')
}

// ============================================
// Example 8: Advanced - Invoice with Totals
// ============================================
export function example8_Invoice() {
  const { createTableBuilder, addText, setFontSize, savePdf } = useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

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

  savePdf('invoice.pdf')
}

// ============================================
// Example 9: Get Content Without Building
// ============================================
export function example9_GetContent() {
  const { createTableBuilder, createTable, savePdf } = useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  // Build table configuration
  const builder = createTableBuilder()
    .addHeader(['Column 1', 'Column 2', 'Column 3'])
    .addRows([
      ['Data A1', 'Data B1', 'Data C1'],
      ['Data A2', 'Data B2', 'Data C2'],
    ])
    .setTheme('grid')
    .setHeaderStyles({ fillColor: '#607D8B', textColor: '#fff' })

  // Get content and options without building
  const content = builder.getContent()
  const options = builder.getOptions()

  // Use with existing createTable API
  createTable(content, options)

  savePdf('get-content-example.pdf')
}

// ============================================
// Example 10: Reset and Rebuild
// ============================================
export function example10_ResetAndRebuild() {
  const { createTableBuilder, savePdf } = useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  const builder = createTableBuilder({ defaultTheme: 'grid' })

  // Build first table
  builder
    .addHeader(['Name', 'Age'])
    .addRows([
      ['John', '30'],
      ['Jane', '25'],
    ])
    .build()

  // Reset and build second table
  builder
    .reset()
    .addHeader(['Product', 'Price'])
    .addRows([
      ['Laptop', '$999'],
      ['Phone', '$699'],
    ])
    .setStartY(50)
    .build()

  savePdf('reset-rebuild.pdf')
}

// Export all examples
export const examples = {
  example1_SimpleTable,
  example2_StyledTable,
  example3_DynamicTable,
  example4_TableFromObjects,
  example5_MultiPageReport,
  example6_ColumnStyling,
  example7_ReusingBuilder,
  example8_Invoice,
  example9_GetContent,
  example10_ResetAndRebuild,
}

// Run all examples (for testing)
export function runAllExamples() {
  console.log('Running all TableBuilder examples...')

  Object.entries(examples).forEach(([name, fn]) => {
    try {
      console.log(`Running ${name}...`)
      fn()
      console.log(`✓ ${name} completed`)
    } catch (error) {
      console.error(`✗ ${name} failed:`, error)
    }
  })

  console.log('All examples completed!')
}
