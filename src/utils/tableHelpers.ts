import type { TableHelpers } from '@/types/table'

/**
 * Helper utilities for table building
 */
export const tableHelpers: TableHelpers = {
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
  fromObjects: (data: Record<string, unknown>[]) => {
    if (!data || data.length === 0) {
      return { header: [], body: [] }
    }

    const header = Object.keys(data[0] as Record<string, unknown>)
    const body = data.map((row) => Object.values(row))

    return {
      header: [header],
      body,
    }
  },

  /**
   * Extract header from object keys
   * @param obj - Object to extract keys from
   * @returns Array of keys
   * @example
   * const obj = {name: 'John', age: 30, city: 'NYC'}
   * const keys = fromKeys(obj)
   * // ['name', 'age', 'city']
   */
  fromKeys: (obj: Record<string, unknown>) => {
    return Object.keys(obj)
  },

  /**
   * Format a number as currency
   * @param value - Number to format
   * @param currency - Currency symbol (default: '$')
   * @returns Formatted currency string
   * @example
   * formatCurrency(1234.56) // '$1,234.56'
   * formatCurrency(1234.56, '€') // '€1,234.56'
   */
  formatCurrency: (value: number, currency: string = '$') => {
    const formatted = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${currency}${formatted}`
  },

  /**
   * Format a date
   * @param date - Date to format
   * @param format - Date format string (default: 'YYYY-MM-DD')
   * @returns Formatted date string
   * @example
   * formatDate(new Date('2024-01-15')) // '2024-01-15'
   * formatDate('2024-01-15', 'MM/DD/YYYY') // '01/15/2024'
   */
  formatDate: (date: Date | string, format: string = 'YYYY-MM-DD') => {
    const d = typeof date === 'string' ? new Date(date) : date

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day)
  },

  /**
   * Create a total row from column data
   * @param label - Label for the total row
   * @param data - Array of rows
   * @param columnIndices - Indices of columns to sum
   * @returns Total row array
   * @example
   * const data = [
   *   ['Product A', 100, 50],
   *   ['Product B', 200, 75]
   * ]
   * const totalRow = createTotalRow('Total', data, [1, 2])
   * // ['Total', 300, 125]
   */
  createTotalRow: (label: string, data: unknown[][], columnIndices: number[]) => {
    if (!data || data.length === 0) {
      return []
    }

    const maxColumns = Math.max(...data.map((row) => row.length))
    const totalRow: unknown[] = Array.from({ length: maxColumns }, () => '')

    // Set the label in the first column
    totalRow[0] = label

    // Sum the specified columns
    columnIndices.forEach((colIndex) => {
      const sum = data.reduce((acc, row) => {
        const value = row[colIndex]
        const numValue = typeof value === 'number' ? value : parseFloat(value as string) || 0
        return acc + numValue
      }, 0)
      totalRow[colIndex] = sum
    })

    return totalRow
  },
}

/**
 * Create a builder from an array of objects
 * @param data - Array of objects
 * @returns Object with header and body for use with builder
 * @example
 * const data = [{name: 'John', age: 30}, {name: 'Jane', age: 25}]
 * const {header, body} = fromObjects(data)
 * builder.setHeader(header).addRows(body)
 */
export const fromObjects = tableHelpers.fromObjects

/**
 * Export individual helper functions for convenience
 */
export const fromKeys = tableHelpers.fromKeys
export const formatCurrency = tableHelpers.formatCurrency
export const formatDate = tableHelpers.formatDate
export const createTotalRow = tableHelpers.createTotalRow
