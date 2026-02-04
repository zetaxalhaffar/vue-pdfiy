import type { SvgGenerateOptions } from '@/types'
import type jsPDF from 'jspdf'

export const addSvg = async (pdf: jsPDF, options: SvgGenerateOptions): Promise<void> => {
  pdf.addSvgAsImage(options.svg, options.x || 0, options.y || 0, options.width || 0, options.height || 0, options.alias || undefined, false, options.rotation || 0)
}
