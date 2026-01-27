import type { AutoTableContent, AutoTableOptions } from "@/plugins/AutoTable"
import type jsPDF from "jspdf"
import type { CellDef, ColumnInput, MarginPadding, Styles, TableWidthType, ThemeType } from "jspdf-autotable"

// src/composables/useTableBuilder.ts
class TableBuilder {
  private header: CellDef[][] = []
  private body: CellDef[][] = []
  private footer: CellDef[][] = []
  private columns?: ColumnInput[]
  private options: AutoTableOptions = {}

  // Header methods
  addHeader(row: CellDef[]): this
  setHeader(rows: CellDef[][]): this
  clearHeader(): this

  // Body methods
  addRow(row: CellDef[]): this
  addRows(rows: CellDef[][]): this
  setBody(rows: CellDef[][]): this
  clearBody(): this

  // Footer methods
  addFooter(row: CellDef[]): this
  setFooter(rows: CellDef[][]): this
  clearFooter(): this

  // Column configuration
  setColumns(columns: ColumnInput[]): this

  // Style methods
  setTheme(theme: ThemeType): this
  setHeaderStyles(styles: Styles): this
  setBodyStyles(styles: Styles): this
  setFooterStyles(styles: Styles): this
  setAlternateRowStyles(styles: Styles): this
  setColumnStyles(columnIndex: number | string, styles: Styles): this

  // Layout methods
  setMargin(margin: MarginPadding): this
  setStartY(y: number): this
  setTableWidth(width: TableWidthType): this

  // Build method
  build(pdf: jsPDF): void
  getContent(): AutoTableContent
  getOptions(): AutoTableOptions
}
