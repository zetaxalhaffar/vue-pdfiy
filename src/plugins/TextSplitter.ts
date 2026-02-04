import type { textSplitterGetOptions, TextSplitterOptions } from '@/types'
import type jsPDF from 'jspdf'

export const STTS = (pdf: jsPDF, options: TextSplitterOptions): string[] => {
  return pdf.splitTextToSize(options.text, options.size, options.extraOptions)
}

export const GSUW = (pdf: jsPDF, options: textSplitterGetOptions): number => {
  return pdf.getStringUnitWidth(options.text, options.extraOptions)
}

export const GCAWA = (pdf: jsPDF, options: textSplitterGetOptions): any[] => {
  return pdf.getCharWidthsArray(options.text, options.extraOptions)
}
