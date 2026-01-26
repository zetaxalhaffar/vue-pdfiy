import type { Orientation, PageFormat } from '@/types'
import loadCustomFont from '@/utils/LoadCustomFont'
import jsPDF, { type jsPDFOptions } from 'jspdf'

export function useJsPdf(options: jsPDFOptions) {
  /**
   * @description Create a new jsPDF instance
   * @param {jsPDFOptions} options - Options for the jsPDF instance
   * @returns {jsPDF} jsPDF instance
   */
  const pdf = new jsPDF(options)

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
   * @description Add text to the pdf
   * @param {string} text - Text to add
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @returns {void} Void
   */

  const addText = (text: string, x: number, y: number): void => {
    pdf.text(text, x, y)
  }

  /**
   * @description Create a circle
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} r - Radius
   * @param {string} style - Style of the circle
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
   * @description Save the pdf
   * @param {string} filename - Name of the file
   * @returns {void} Void
   */

  const savePdf = (filename: string): void => {
    pdf.save(filename)
  }

  return {
    pdf,
    loadCustomFontFn,
    addText,
    addPage,
    createCircle,
    savePdf,
    setFont,
    clearClip,
  }
}
