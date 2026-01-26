import loadCustomFont from '@/utils/LoadCustomFont'
import jsPDF, { type jsPDFOptions } from 'jspdf'

export function useJsPdf(options: jsPDFOptions) {
  const pdf = new jsPDF(options)
  return {
    pdf,
    loadCustomFont,
  }
}
