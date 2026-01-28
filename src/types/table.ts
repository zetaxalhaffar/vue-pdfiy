import type { AutoTableContent, AutoTableOptions } from '@/plugins/AutoTable'
import type { jsPDF } from 'jspdf'
import type {
  CellDef,
  ColumnInput,
  MarginPadding,
  Styles,
  TableWidthType,
  ThemeType,
} from 'jspdf-autotable'

export type CellDefAutoTable = string | CellDef

/**
 * Configuration options for TableBuilder
 */
export interface TableBuilderConfig {
  /**
   * Whether to automatically apply styling
   * @default true
   */
  autoStyle?: boolean

  /**
   * Default theme to apply to all tables
   * @default undefined
   */
  defaultTheme?: ThemeType

  /**
   * Default margin to apply to all tables
   * @default undefined
   */
  defaultMargin?: MarginPadding
}

/**
 * Interface for the TableBuilder class
 */
export interface ITableBuilder {
  // Header methods
  addHeader(row: CellDefAutoTable[]): this
  setHeader(rows: CellDefAutoTable[][]): this
  clearHeader(): this

  // Body methods
  addRow(row: CellDefAutoTable[]): this
  addRows(rows: CellDefAutoTable[][]): this
  setBody(rows: CellDefAutoTable[][]): this
  clearBody(): this

  // Footer methods
  addFooter(row: CellDefAutoTable[]): this
  setFooter(rows: CellDefAutoTable[][]): this
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
  setMargin(margin: MarginPadding | number): this
  setStartY(y: number): this
  setTableWidth(width: TableWidthType): this

  // Build methods
  build(pdf?: jsPDF): void
  getContent(): AutoTableContent
  getOptions(): AutoTableOptions

  // Utility methods
  reset(): this
  clone(): this
}

/**
 * Helper utilities for table building
 */
export interface TableHelpers {
  /**
   * Convert an array of objects to table data
   * @param data - Array of objects
   * @returns Object with header and body arrays
   * @example
   * const data = [{name: 'John', age: 30}, {name: 'Jane', age: 25}]
   * const {header, body} = fromObjects(data)
   * // header: [['name', 'age']]
   * // body: [['John', 30], ['Jane', 25]]
   */
  fromObjects: (data: Record<string, unknown>[]) => { header: unknown[][]; body: unknown[][] }

  /**
   * Extract header from object keys
   * @param obj - Object to extract keys from
   * @returns Array of keys
   */
  fromKeys: (obj: Record<string, unknown>) => string[]

  /**
   * Format a number as currency
   * @param value - Number to format
   * @param currency - Currency symbol (default: '$')
   * @returns Formatted currency string
   */
  formatCurrency: (value: number, currency?: string) => string

  /**
   * Format a date
   * @param date - Date to format
   * @param format - Date format string (default: 'YYYY-MM-DD')
   * @returns Formatted date string
   */
  formatDate: (date: Date | string, format?: string) => string

  /**
   * Create a total row from column data
   * @param label - Label for the total row
   * @param data - Array of rows
   * @param columnIndices - Indices of columns to sum
   * @returns Total row array
   */
  createTotalRow: (label: string, data: unknown[][], columnIndices: number[]) => unknown[]
}
