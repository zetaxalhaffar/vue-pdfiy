import type { AutoTableContent, AutoTableOptions } from '@/plugins/AutoTable'
import useAutoTable from '@/plugins/AutoTable'
import type { TableBuilderEvent } from '@/plugins/table'
import type { CellDefAutoTable } from '@/types/table'
import type jsPDF from 'jspdf'
import type {
  ColumnInput,
  CellHookData,
  MarginPadding,
  Styles,
  TableWidthType,
  ThemeType,
  HookData,
} from 'jspdf-autotable'

export interface TableBuilderConfig {
  autoStyle?: boolean
  defaultTheme?: ThemeType
  defaultMargin?: MarginPadding | number
}

/**
 * TableBuilder - A fluent API for building PDF tables programmatically
 * @example
 * useTableBuilder()
 *   .addHeader(['Name', 'Age', 'City'])
 *   .addRow(['John', 30, 'NYC'])
 *   .addRow(['Jane', 25, 'LA'])
 *   .build(pdf)
 */
export class TableBuilder {
  private header: CellDefAutoTable[][] = []
  private body: CellDefAutoTable[][] = []
  private footer: CellDefAutoTable[][] = []
  private columns?: ColumnInput[]
  private options: AutoTableOptions = {}
  private pdf?: jsPDF
  private config: TableBuilderConfig

  // Event hooks (wired into jsPDF-AutoTable options)
  private didParseCell?: (data: CellHookData) => void
  private willDrawCell?: (data: CellHookData) => void
  private didDrawCell?: (data: CellHookData) => void
  private willDrawPage?: (data: HookData) => void
  private didDrawPage?: (data: HookData) => void

  constructor(pdf?: jsPDF, config?: TableBuilderConfig) {
    this.pdf = pdf
    this.config = config || {}

    // Apply default configuration
    if (this.config.defaultTheme) {
      this.options.theme = this.config.defaultTheme
    }
    if (this.config.defaultMargin) {
      this.options.margin =
        typeof this.config.defaultMargin === 'number'
          ? {
              top: this.config.defaultMargin,
              right: this.config.defaultMargin,
              bottom: this.config.defaultMargin,
              left: this.config.defaultMargin,
            }
          : this.config.defaultMargin
    }
  }

  // ============ Header Methods ============

  /**
   * Add a single header row to the table
   * @param row - Array of cell definitions for the header row
   * @returns this - For method chaining
   */
  addHeader(row: CellDefAutoTable[]): this {
    this.header.push(row)
    return this
  }

  /**
   * Set the entire header (replaces existing header)
   * @param rows - Array of header rows
   * @returns this - For method chaining
   */
  setHeader(rows: CellDefAutoTable[][]): this {
    this.header = rows
    return this
  }

  /**
   * Clear all header rows
   * @returns this - For method chaining
   */
  clearHeader(): this {
    this.header = []
    return this
  }

  // ============ Body Methods ============

  /**
   * Add a single row to the table body
   * @param row - Array of cell definitions for the body row
   * @returns this - For method chaining
   */
  addRow(row: CellDefAutoTable[]): this {
    this.body.push(row)
    return this
  }

  /**
   * Add multiple rows to the table body
   * @param rows - Array of body rows
   * @returns this - For method chaining
   */
  addRows(rows: CellDefAutoTable[][]): this {
    this.body.push(...rows)
    return this
  }

  /**
   * Set the entire body (replaces existing body)
   * @param rows - Array of body rows
   * @returns this - For method chaining
   */
  setBody(rows: CellDefAutoTable[][]): this {
    this.body = rows
    return this
  }

  /**
   * Clear all body rows
   * @returns this - For method chaining
   */
  clearBody(): this {
    this.body = []
    return this
  }

  // ============ Footer Methods ============

  /**
   * Add a single footer row to the table
   * @param row - Array of cell definitions for the footer row
   * @returns this - For method chaining
   */
  addFooter(row: CellDefAutoTable[]): this {
    this.footer.push(row)
    return this
  }

  /**
   * Set the entire footer (replaces existing footer)
   * @param rows - Array of footer rows
   * @returns this - For method chaining
   */
  setFooter(rows: CellDefAutoTable[][]): this {
    this.footer = rows
    return this
  }

  /**
   * Clear all footer rows
   * @returns this - For method chaining
   */
  clearFooter(): this {
    this.footer = []
    return this
  }

  // ============ Column Configuration ============

  /**
   * Set column definitions for the table
   * @param columns - Array of column configurations
   * @returns this - For method chaining
   */
  setColumns(columns: ColumnInput[]): this {
    this.columns = columns
    return this
  }

  // ============ Style Methods ============

  /**
   * Set the table theme
   * @param theme - Theme type ('striped', 'grid', 'plain')
   * @returns this - For method chaining
   */
  setTheme(theme: ThemeType): this {
    this.options.theme = theme
    return this
  }

  /**
   * Set styles for the header section
   * @param styles - Style configuration for header
   * @returns this - For method chaining
   */
  setHeaderStyles(styles: Partial<Styles>): this {
    this.options.headStyles = { ...this.options.headStyles, ...styles } as Styles
    return this
  }

  /**
   * Set styles for the body section
   * @param styles - Style configuration for body
   * @returns this - For method chaining
   */
  setBodyStyles(styles: Partial<Styles>): this {
    this.options.bodyStyles = { ...this.options.bodyStyles, ...styles } as Styles
    return this
  }

  /**
   * Set styles for the footer section
   * @param styles - Style configuration for footer
   * @returns this - For method chaining
   */
  setFooterStyles(styles: Partial<Styles>): this {
    this.options.footStyles = { ...this.options.footStyles, ...styles } as Styles
    return this
  }

  /**
   * Set styles for alternate rows
   * @param styles - Style configuration for alternate rows
   * @returns this - For method chaining
   */
  setAlternateRowStyles(styles: Partial<Styles>): this {
    this.options.alternateRowStyles = { ...this.options.alternateRowStyles, ...styles } as Styles
    return this
  }

  /**
   * Set styles for a specific column
   * @param columnIndex - Index or dataKey of the column
   * @param styles - Style configuration for the column
   * @returns this - For method chaining
   */
  setColumnStyles(columnIndex: number | string, styles: Partial<Styles>): this {
    if (!this.options.columnStyles) {
      this.options.columnStyles = {}
    }
    this.options.columnStyles[columnIndex] = {
      ...this.options.columnStyles[columnIndex],
      ...styles,
    } as Styles
    return this
  }

  // ============ Layout Methods ============

  /**
   * Set the table margins
   * @param margin - Margin configuration (number or object with top/right/bottom/left)
   * @returns this - For method chaining
   */
  setMargin(margin: MarginPadding | number): this {
    this.options.margin =
      typeof margin === 'number'
        ? { top: margin, right: margin, bottom: margin, left: margin }
        : margin
    return this
  }

  /**
   * Set the starting Y position for the table
   * @param y - Y coordinate
   * @returns this - For method chaining
   */
  setStartY(y: number): this {
    this.options.startY = y
    return this
  }

  /**
   * Set the table width
   * @param width - Table width ('auto', 'wrap', or specific number)
   * @returns this - For method chaining
   */
  setTableWidth(width: TableWidthType): this {
    this.options.tableWidth = width
    return this
  }

  // ============ Build Methods ============

  /**
   * Validate the table configuration
   * @throws Error if validation fails
   * @private
   */
  private validate(): void {
    if (this.body.length === 0) {
      console.warn('[TableBuilder] Warning: Table has no body rows')
    }

    if (this.header.length === 0 && this.body.length === 0 && this.footer.length === 0) {
      throw new Error(
        '[TableBuilder] Cannot build empty table. Add at least one row to header, body, or footer.',
      )
    }
  }

  /**
   * Build and render the table to the PDF
   * @param pdf - jsPDF instance (optional if provided in constructor)
   * @returns void
   * @throws Error if no PDF instance is available
   */
  build(pdf?: jsPDF): void {
    const pdfInstance = pdf || this.pdf

    if (!pdfInstance) {
      throw new Error(
        '[TableBuilder] No PDF instance provided. Pass a PDF instance to build() or the constructor.',
      )
    }

    this.validate()

    const content = this.getContent()
    const options = this.getOptions()

    useAutoTable(pdfInstance, options, content)
  }

  /**
   * Set a callback for a specific event
   * @param event - Event name
   * @param callback - Callback function
   * @returns this - For method chaining
   */

  on(event: keyof TableBuilderEvent, callback: (data: CellHookData | HookData) => void): this {
    switch (event) {
      case 'didParseCell':
        this.didParseCell = callback
        break
      case 'willDrawCell':
        this.willDrawCell = callback
        break
      case 'didDrawCell':
        this.didDrawCell = callback
        break
      case 'willDrawPage':
        this.willDrawPage = callback
        break
      case 'didDrawPage':
        this.didDrawPage = callback
        break
    }
    return this
  }

  /**
   * Get the table content configuration
   * @returns AutoTableContent object
   */
  getContent(): AutoTableContent {
    return {
      header: this.header.length > 0 ? this.header : undefined,
      body: this.body,
      footer: this.footer.length > 0 ? this.footer : undefined,
      columns: this.columns,
    }
  }

  /**
   * Get the table options configuration
   * @returns AutoTableOptions object
   */
  getOptions(): AutoTableOptions {
    const optionsWithHooks: AutoTableOptions = { ...this.options }

    if (this.didParseCell) {
      optionsWithHooks.didParseCell = this.didParseCell
    }
    if (this.willDrawCell) {
      optionsWithHooks.willDrawCell = this.willDrawCell
    }
    if (this.didDrawCell) {
      optionsWithHooks.didDrawCell = this.didDrawCell
    }
    if (this.willDrawPage) {
      optionsWithHooks.willDrawPage = this.willDrawPage
    }
    if (this.didDrawPage) {
      optionsWithHooks.didDrawPage = this.didDrawPage
    }

    return optionsWithHooks
  }

  /**
   * Reset the builder to initial state
   * @returns this - For method chaining
   */
  reset(): this {
    this.header = []
    this.body = []
    this.footer = []
    this.columns = undefined
    this.options = {}

    // Reapply default configuration
    if (this.config.defaultTheme) {
      this.options.theme = this.config.defaultTheme
    }
    if (this.config.defaultMargin) {
      this.options.margin =
        typeof this.config.defaultMargin === 'number'
          ? {
              top: this.config.defaultMargin,
              right: this.config.defaultMargin,
              bottom: this.config.defaultMargin,
              left: this.config.defaultMargin,
            }
          : this.config.defaultMargin
    }

    return this
  }

  /**
   * Clone the current builder configuration
   * @returns new TableBuilder instance with the same configuration
   */
  clone(): TableBuilder {
    const cloned = new TableBuilder(this.pdf, this.config)
    cloned.header = this.header.map((row) => [...row])
    cloned.body = this.body.map((row) => [...row])
    cloned.footer = this.footer.map((row) => [...row])
    cloned.columns = this.columns ? [...this.columns] : undefined
    cloned.options = { ...this.options }
    return cloned
  }
}

/**
 * Create a new TableBuilder instance
 * @param pdf - Optional jsPDF instance
 * @param config - Optional configuration
 * @returns new TableBuilder instance
 */
export function useTableBuilder(pdf?: jsPDF, config?: TableBuilderConfig): TableBuilder {
  return new TableBuilder(pdf, config)
}
