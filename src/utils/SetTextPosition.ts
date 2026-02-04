import type { TextCustomOptions } from '@/types'
import type jsPDF from 'jspdf'

export default function SetTextPosition(
  doc: jsPDF,
  text: string,
  options: TextCustomOptions = { x: 0, y: 0 },
): { x: number; y: number } {
  if (options.isCentered) {
    const textWidth = doc.getTextWidth(text)
    const pageWidth = doc.internal.pageSize.getWidth()
    const x = (pageWidth - textWidth) / 2
    return { x, y: options.y || 0 }
  }
  return { x: options.x || 0, y: options.y || 0 }
}
