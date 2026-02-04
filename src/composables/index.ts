import useAutoTable, { type AutoTableContent, type AutoTableOptions } from '@/plugins/AutoTable'
import type {
  LineCapStyle,
  Orientation,
  OutputBooleanTypes,
  OutputOptions,
  OutputStringTypes,
  OutputUrlTypes,
  OutputWindowTypes,
  PageFormat,
  SvgGenerateOptions,
  TextCustomOptions,
  textSplitterGetOptions,
  TextSplitterOptions,
  VFSOptions,
} from '@/types'
import loadCustomFont from '@/utils/LoadCustomFont'
import SetTextPosition from '@/utils/SetTextPosition'
import jsPDF, { type jsPDFOptions, type TextOptionsLight } from 'jspdf'
import { TableBuilder, type TableBuilderConfig } from './useTableBuilder'
import { addToVFS, getFromVFS, IsInVFS } from '@/plugins/VFS'
import { GCAWA, GSUW, STTS } from '@/plugins/TextSplitter'

export function useJsPdf(options: jsPDFOptions) {
  /**
   * @description Create a new jsPDF instance
   * @param {jsPDFOptions} options - Options for the jsPDF instance
   * @returns {jsPDF} jsPDF instance
   */
  const pdf = new jsPDF(options)

  /**
   * @description Set the file id
   * @param {string} id - File id
   * @returns {void} Void
   */
  const fileId = (id: string) => {
    return pdf.setFileId(id)
  }

  /**
   * @description Load a custom font
   * @param {string} fontPath - Path to the font file
   * @param {string} fontName - Name of the font
   * @param {string} fontFamily - Family of the font
   * @param {string} fontStyle - Style of the font
   * @returns {Promise<void>} Promise that resolves when the font is loaded
   */

  const loadCustomFontFn = async (
    fontPath: string,
    fontName: string,
    fontFamily: string,
    fontStyle: string = 'normal',
  ) => {
    await loadCustomFont(pdf, fontPath, fontName, fontFamily, fontStyle)
  }

  /**
   * @description Set the font
   * @param {string} fontName - Name of the font
   * @param {string} fontStyle - Style of the font
   * @param {string | number} fontWeight - Weight of the font
   * @returns {void} Void
   */

  const setFont = (fontName: string, fontStyle?: string, fontWeight?: string | number): void => {
    pdf.setFont(fontName, fontStyle, fontWeight)
  }

  /**
   * @description Set the font size
   * @param {number} size - Size of the font
   * @returns {void} Void
   */

  const setFontSize = (size: number): void => {
    pdf.setFontSize(size)
  }

  /**
   * @description Add text to the pdf
   * @param {string} text - Text to add
   * @param {options} TextCustomOptions - Text Options
   * @options { x: number, y: number, isCentered?: boolean } - Position of the text
   * @returns {void} Void
   */

  const addText = (
    text: string,
    options: TextCustomOptions,
    textOptions?: TextOptionsLight,
    transform?: number | unknown,
  ): void => {
    if (options.isCentered) {
      const { x, y } = SetTextPosition(pdf, text, options)
      pdf.text(text, x, y, textOptions)
      return
    }
    pdf.text(text, options.x || 0, options.y || 0, textOptions, transform)
  }

  /**
   * @description Set the text color
   * @param {number | string} ch1 - Red channel if it pass alone can the user pass it as hexadecimal color code like #000000
   * @param {number} ch2 - Green channel
   * @param {number} ch3 - Blue channel
   * @param {number} alpha - Alpha channel
   * @returns {void} Void
   */

  const textColor = (ch1: number | string, ch2?: number, ch3?: number, alpha?: number): void => {
    if (typeof ch1 === 'string') {
      pdf.setTextColor(ch1)
    } else if (ch2 && ch3 && alpha) {
      pdf.setTextColor(ch1, ch2, ch3, alpha)
    }
  }

  /**
   * @description Create a circle
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} r - Radius
   * @param {string} style -
   * A string specifying the painting style or null. Valid styles include: 'S' [default] - stroke, 'F' - fill, and 'DF' (or 'FD') - fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
   * [undefined, null, 'S', 'F', 'DF', 'FD', 'f', 'f*', 'B', 'B*'];
   * @returns {void} Void
   */
  const createCircle = (x: number, y: number, r: number, style?: string | null): void => {
    pdf.circle(x, y, r, style)
  }

  const clearClip = (rule?: 'evenodd'): void => {
    pdf.clip(rule)
  }

  /**
   * @description Add a new page to the pdf
   * @param {PageFormat} format - Format of the page
   * @param {Orientation} orientation - Orientation of the page
   * @returns {void} Void
   */
  const addPage = (format: PageFormat, orientation: Orientation = 'p'): void => {
    pdf.addPage(format, orientation)
  }

  /**
   * @description Set the active page
   * @param {number} pageNumber - Page number to set
   * @returns {void} Void
   */

  const setPage = (pageNumber: number): void => {
    pdf.setPage(pageNumber)
  }

  /**
   * @description Move a page to a new position
   * @param {number} targetPage - Page number to move
   * @param {number} beforePage - Page number to move before
   * @returns {void} Void
   */

  const movePage = (targetPage: number, beforePage: number): void => {
    pdf.movePage(targetPage, beforePage)
  }

  /**
   * @description Delete a page from the pdf
   * @param {number} targetPage - Page number to delete
   * @returns {void} Void
   */
  const deletePage = (targetPage: number): void => {
    pdf.deletePage(targetPage)
  }
  /**
   * @description Draw a line
   * @param {number} x1 - X coordinate of the start point
   * @param {number} y1 - Y coordinate of the start point
   * @param {number} x2 - X coordinate of the end point
   * @param {number} y2 - Y coordinate of the end point
   * @param {string} style - Line style. Valid values: 'S' [default] - stroke, 'F' - fill, and 'DF' (or 'FD') - fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
   * [undefined, null, 'S', 'F', 'DF', 'FD', 'f', 'f*', 'B', 'B*'];
   * @returns {void} Void
   */
  const drawLine = (x1: number, y1: number, x2: number, y2: number, style?: string): void => {
    pdf.line(x1, y1, x2, y2, style)
  }

  /**
   * @description Set the line cap style for lines and shapes
   * @param {string} cap - Line cap style. Valid values: 'butt' (default, flat edge), 'round' (rounded cap), 'square' (square cap)
   * @returns {void} Void
   * @example
   * setLineCap('round') // Sets rounded line caps
   * setLineCap('butt')  // Sets flat line caps (default)
   * setLineCap('square') // Sets square line caps
   *
   */
  const lineCap = (cap: LineCapStyle): void => {
    pdf.setLineCap(cap)
  }

  /**
   * @description Set the line dash pattern
   * @param {number[]} pattern - Pattern of the line dash
   * @param {number} phase - Phase of the line dash
   * @returns {void} Void
   */

  const lineDashPattern = (pattern: number[], phase: number): void => {
    pdf.setLineDashPattern(pattern, phase)
  }

  /**
   * @description Set the line height factor
   * @param {number} factor - Factor of the line height - default is 1.15
   * @returns {void} Void
   */
  const lineHeightFactor = (factor: number): void => {
    pdf.setLineHeightFactor(factor)
  }

  /**
   * @description Set the line width
   * @param {number} width - Width of the line
   * @returns {void} Void
   */

  const lineWidth = (width: number): void => {
    pdf.setLineWidth(width)
  }

  /**
   * @description Set the miter limit for line joins
   * @param {number} limit - Miter limit ratio (default: 10.0). Must be >= 1.0
   * @returns {void} Void
   * @example
   * setLineMiterLimit(5) // Sets miter limit to 5
   * @description
   *  What is miter limit?
   *  When two lines meet at an angle with lineJoin='miter', the miter limit controls
   *  how long the sharp corner point can be before it switches to a beveled join.
   *  This prevents extremely long spikes at very acute angles.
   *
   *  Formula: miterLimit = maximum miterLength / lineWidth
   *  - Lower values (e.g., 2-5) = bevel joins for sharp angles
   *  - Higher values (e.g., 10+) = sharper miter joins allowed
   *  - Only affects lines when lineJoin is set to 'miter'
   */
  const lineMiterLimit = (limit: number): void => {
    pdf.setLineMiterLimit(limit)
  }

  /**
   * @description Set the draw color
   * @param {number | string} ch1 - Red channel if it pass alone can the user pass it as hexadecimal color code like #000000
   * @param {number} ch2 - Green channel
   * @param {number} ch3 - Blue channel
   * @param {number} alpha - Alpha channel
   * @returns {void} Void
   */

  const drawColor = (ch1: number | string, ch2?: number, ch3?: number, alpha?: number): void => {
    if (typeof ch1 === 'string') {
      pdf.setDrawColor(ch1)
    } else if (ch2 && ch3 && alpha) {
      pdf.setDrawColor(ch1, ch2, ch3, alpha)
    }
  }

  /**
   * @description Set the fill color
   * @param {number | string} ch1 - Red channel if it pass alone can the user pass it as hexadecimal color code like #000000
   * @param {number} ch2 - Green channel
   * @param {number} ch3 - Blue channel
   * @param {number} alpha - Alpha channel
   * @returns {void} Void
   */
  const fillColor = (ch1: number | string, ch2?: number, ch3?: number, alpha?: number): void => {
    if (typeof ch1 === 'string') {
      pdf.setFillColor(ch1)
    } else if (ch2 && ch3 && alpha) {
      pdf.setFillColor(ch1, ch2, ch3, alpha)
    }
  }

  /**
   * @description Draw a line to a point
   * @param {number} x - X coordinate of the end point
   * @param {number} y - Y coordinate of the end point
   * @returns {void} Void
   */

  const lineTo = (x: number, y: number): void => {
    pdf.lineTo(x, y)
  }

  /**
   * @description Move to a point
   * @param {number} x - X coordinate of the point
   * @param {number} y - Y coordinate of the point
   * @returns {void} Void
   */

  const moveTo = (x: number, y: number): void => {
    pdf.moveTo(x, y)
  }

  /**
   * @description show total pages based on expression
   * @param {string} expression - Expression to evaluate
   * @returns {void} Void
   */
  const putTotalPages = (expression: string): void => {
    pdf.putTotalPages(expression)
  }

  /**
   * @description Get the page height
   * @returns {number} Total pages
   */
  const getPageHeight = (): number => {
    return pdf.internal.pageSize.getHeight()
  }

  /**
   * @description Get the page width
   * @returns {number} Page width
   */
  const getPageWidth = (): number => {
    return pdf.internal.pageSize.getWidth()
  }

  /**
   * @description Output the pdf as a string (default)
   * @returns {string} PDF as string
   */
  const output = (): string => {
    return pdf.output()
  }

  /**
   * @description Output the pdf as ArrayBuffer
   * @param {OutputArrayBufferType} type - Must be 'arraybuffer'
   * @returns {ArrayBuffer} PDF as ArrayBuffer
   */
  const outputAsArrayBuffer = (type: 'arraybuffer' = 'arraybuffer'): ArrayBuffer => {
    return pdf.output(type)
  }

  /**
   * @description Output the pdf as Blob
   * @param {OutputBlobType} type - Must be 'blob'
   * @returns {Blob} PDF as Blob
   */
  const outputAsBlob = (type: 'blob' = 'blob'): Blob => {
    return pdf.output(type)
  }

  /**
   * @description Output the pdf as URL (bloburi or bloburl)
   * @param {OutputUrlTypes} type - 'bloburi' or 'bloburl'
   * @returns {URL} PDF as URL
   */
  const outputAsUrl = (type: OutputUrlTypes): URL => {
    return pdf.output(type) as URL
  }

  /**
   * @description Output the pdf as data URI string
   * @param {OutputStringTypes} type - 'datauristring' or 'dataurlstring'
   * @param {OutputOptions} options - Optional options with filename
   * @returns {string} PDF as data URI string
   */
  const outputAsDataUriString = (type: OutputStringTypes, options?: OutputOptions): string => {
    return pdf.output(type, options)
  }

  /**
   * @description Output the pdf in a new window
   * @param {OutputWindowTypes} type - 'pdfobjectnewwindow', 'pdfjsnewwindow', or 'dataurlnewwindow'
   * @param {OutputOptions} options - Optional options with filename
   * @returns {Window} New window instance
   */
  const outputAsNewWindow = (type: OutputWindowTypes, options?: OutputOptions): Window => {
    return pdf.output(type, options)
  }

  /**
   * @description Output the pdf as data URI (returns boolean)
   * @param {OutputBooleanTypes} type - 'dataurl' or 'datauri'
   * @param {OutputOptions} options - Optional options with filename
   * @returns {boolean} Success status
   */
  const outputAsDataUri = (type: OutputBooleanTypes, options?: OutputOptions): boolean => {
    return pdf.output(type, options)
  }

  /**
   * @description Save the pdf
   * @param {string} filename - Name of the file
   * @returns {void} Void
   */

  const savePdf = (filename: string): void => {
    pdf.save(filename)
  }

  /**
   * @description Add a table to the pdf
   * @param {AutoTableOptions} options - Options for the table
   * @returns {void} Void
   */
  const createTable = (content: AutoTableContent, options?: AutoTableOptions): void => {
    useAutoTable(pdf, options || {}, { ...content })
  }

  /**
   * @description Create a new TableBuilder instance for programmatic table creation
   * @param {TableBuilderConfig} config - Optional configuration for the table builder
   * @returns {TableBuilder} TableBuilder instance
   * @example
   * const builder = createTableBuilder()
   * builder
   *   .addHeader(['Name', 'Age', 'City'])
   *   .addRow(['John', 30, 'NYC'])
   *   .addRow(['Jane', 25, 'LA'])
   *   .build()
   */
  const createTableBuilder = (config?: TableBuilderConfig): TableBuilder => {
    return new TableBuilder(pdf, config)
  }

  /**
   * @description Add a SVG to the pdf (parses SVG string from user into an SVGElement)
   * @param {SvgOptions} options - Options for the SVG (svg as string, plus optional x, y, width, height)
   * @returns {void} Void
   */
  const svg = (options: SvgGenerateOptions): void => {
    pdf.addSvgAsImage(
      options.svg,
      options.x || 0,
      options.y || 0,
      options.width || 0,
      options.height || 0,
      options.alias || undefined,
      false,
      options.rotation || 0,
    )
  }

  /**
   * @description Add a file to the VFS
   * @param {VFSOptions} options - Options for the file
   * @returns {void} Void
   */

  const addFileToVFS = (options: VFSOptions): void => {
    addToVFS(pdf, options)
  }

  /**
   * @description Get a file from the VFS
   * @param {string} name - Name of the file
   * @returns {string} File content
   */

  const getFileFromVFS = (name: string): string => {
    return getFromVFS(pdf, name)
  }

  /**
   * @description Check if a file is in the VFS
   * @param {string} name - Name of the file
   * @returns {boolean} True if the file is in the VFS
   */

  const isFileInVFS = (name: string): boolean => {
    return IsInVFS(pdf, name)
  }

  /**
   * @description Split text to size
   * @param {TextSplitterOptions} options - Options for the text splitter
   * @returns {string[]} Array of text strings
   */
  const splitTextToSize = (options: TextSplitterOptions): string[] => {
    return STTS(pdf, options)
  }

  /**
   * @description Get string unit width
   * @param {textSplitterGetOptions} options - Options for the text splitter
   * @returns {number} String unit width
   */
  const getStringUnitWidth = (options: textSplitterGetOptions): number => {
    return GSUW(pdf, options)
  }

  /**
   * @description Get char widths array
   * @param {textSplitterGetOptions} options - Options for the text splitter
   * @returns {any[]} Array of char widths
   */
  const getCharWidthsArray = (options: textSplitterGetOptions): any[] => {
    return GCAWA(pdf, options)
  }

  return {
    pdf,
    fileId,
    // * Table
    createTable,
    createTableBuilder,
    // * Font
    loadCustomFontFn,
    setFont,
    setFontSize,
    // * Text
    addText,
    textColor,
    // * Shape
    createCircle,
    // * Page
    addPage,
    deletePage,
    setPage,
    movePage,
    // * Output
    output,
    outputAsArrayBuffer,
    outputAsBlob,
    outputAsUrl,
    outputAsDataUriString,
    outputAsNewWindow,
    outputAsDataUri,
    // * Save
    savePdf,
    // * Clip
    clearClip,
    // * Line
    drawLine,
    lineCap,
    lineDashPattern,
    lineHeightFactor,
    lineWidth,
    lineMiterLimit,
    drawColor,
    // * Path
    lineTo,
    moveTo,
    fillColor,
    // * Total Pages
    putTotalPages,
    // * Page
    getPageHeight,
    getPageWidth,
    // * SVG
    svg,
    // * VFS
    addFileToVFS,
    getFileFromVFS,
    isFileInVFS,
    // * Text Splitter
    splitTextToSize,
    getStringUnitWidth,
    getCharWidthsArray,
  }
}

// Export TableBuilder and related utilities
export type { ITableBuilder, TableHelpers } from '@/types/table'
export {
  createTotalRow,
  formatCurrency,
  formatDate,
  fromKeys,
  fromObjects,
  tableHelpers,
} from '@/utils/tableHelpers'
export { TableBuilder, useTableBuilder, type TableBuilderConfig } from './useTableBuilder'
