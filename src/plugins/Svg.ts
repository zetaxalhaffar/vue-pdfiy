import type { SvgGenerateOptions } from '@/types'
import type jsPDF from 'jspdf'
import 'svg2pdf.js'

export const addSvg = (pdf: jsPDF, options: SvgGenerateOptions): void => {
  console.log('==================')
  console.log(options)
  console.log('==================')
  pdf.svg(options.svg, {
    x: options.x || 0,
    y: options.y || 0,
    width: options.width || 0,
    height: options.height || 0,
  })
}
