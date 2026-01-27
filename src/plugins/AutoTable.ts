import type jsPDF from 'jspdf'
import {
  autoTable,
  type CellDef,
  type Color,
  type ColumnInput,
  type HorizontalPageBreakBehaviourType,
  type MarginPadding,
  type PageBreakType,
  type RowPageBreakType,
  type ShowFootType,
  type ShowHeadType,
  type Styles,
  type TableWidthType,
  type ThemeType,
} from 'jspdf-autotable'

export interface AutoTableOptions {
  theme?: ThemeType
  headStyles?: Styles
  bodyStyles?: Styles
  footStyles?: Styles
  alternateRowStyles?: Styles
  columnStyles?: Record<string, Styles>
  styles?: Styles
  margin?: MarginPadding
  startY?: number
  useCss?: boolean
  pageBreak?: PageBreakType
  rowPageBreak?: RowPageBreakType
  tableWidth?: TableWidthType
  showHead?: ShowHeadType
  showFoot?: ShowFootType
  tableLineWidth?: number
  tableLineColor?: Color
  horizontalPageBreak?: boolean
  horizontalPageBreakRepeat?: string | number | string[] | number[]
  horizontalPageBreakBehaviour?: HorizontalPageBreakBehaviourType
  includeHiddenHtml?: boolean
}

export interface AutoTableContent {
  header?: CellDef[][]
  body: CellDef[][]
  footer?: CellDef[][]
  columns?: ColumnInput[]
  html?: string | HTMLTableElement
}



export default (
  pdf: jsPDF,
  options: AutoTableOptions,
  content: AutoTableContent,
) => {
  return autoTable(pdf, {
    ...options,
    head: content.header,
    body: content.body,
    foot: content.footer,
    columns: content.columns,
    html: content.html,
  })
}
