import type { AnnotationLinkOptions, AnnotationTextLinkOption } from "@/types";
import type jsPDF from "jspdf";
import type { Annotation } from "jspdf";

/**
 * @description This function creates an annotation on the pdf
 * @param pdf - The pdf object
 * @param options - The options for the annotation
 * @options_list
 * -  type: "text" | "freetext" | "link";
 * - title?: string;
 * - bounds: {
   x: number;
   y: number;
   w: number;
   h: number;
 };
 * - contents: string;
 * - open?: boolean;
 * - color?: string;
 * - name?: string;
 * - top?: number;
 * - pageNumber?: number;
 */

export const createAnnotationFunction = (pdf: jsPDF, options: Annotation) => {
  pdf.createAnnotation(options);
};

export const createAnnotationLink = (
  pdf: jsPDF,
  options: AnnotationLinkOptions,
) => {
  pdf.link(options.x, options.y, options.w, options.h, options?.options ?? {});
};

export const createAnnotationTextLink = (
  pdf: jsPDF,
  options: AnnotationTextLinkOption,
) => {
  pdf.textWithLink(options.text, options.x, options.y, options?.options ?? {});
};
