import type { VFSOptions } from '@/types'
import type jsPDF from 'jspdf'

export const addToVFS = (pdf: jsPDF, options: VFSOptions) => {
  pdf.addFileToVFS(options.name, options.content)
}

export const getFromVFS = (pdf: jsPDF, name: string): string => {
  return pdf.getFileFromVFS(name)
}

export const IsInVFS = (pdf: jsPDF, name: string): boolean => {
  return pdf.existsFileInVFS(name)
}
