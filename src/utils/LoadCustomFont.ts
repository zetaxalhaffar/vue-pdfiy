import type jsPDF from 'jspdf'
import arrayBufferToBase64 from './ArrayBufferToBase64'

export default async function loadCustomFont(
  doc: jsPDF,
  fontPath: string,
  fontName: string,
  fontFamily: string,
  fontStyle: string = 'normal',
): Promise<void> {
  try {
    const fontResponse = await fetch(fontPath)
    const fontBytes = await fontResponse.arrayBuffer()
    // * Add font to jsPDF
    doc.addFileToVFS(fontName, arrayBufferToBase64(fontBytes))
    doc.addFont(fontName, fontFamily, fontStyle)
  } catch (error) {
    console.warn(`Failed to load ${fontName} font:`, error)
  }
}
