import type jsPDF from "jspdf";

/**
 * AcroFormBuilder - A fluent API for building PDF Form programmatically
 * @example
 */
export class AcroFormBuilder {
  constructor(pdf?: jsPDF, fields?: any[]) {
    this.fields = fields || [];
  }

  // Create instance for acroForm from jsPDF
  static fromPDF(pdf: jsPDF) {
    return new AcroFormBuilder(pdf);
  }
}

/**
 * Create a new AcroFormBuilder instance
 * @param pdf - Optional jsPDF instance
 * @param config - Optional configuration
 * @returns new TableBuilder instance
 */
export function useAcroFormBuilder(
  pdf?: jsPDF,
  fields?: any[],
): AcroFormBuilder {
  return new AcroFormBuilder(pdf, fields);
}
