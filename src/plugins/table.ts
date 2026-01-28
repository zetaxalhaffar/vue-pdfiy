import type { CellHookData, HookData, MarginPadding, ThemeType } from 'jspdf-autotable'

// src/types/table.ts
export interface TableBuilderConfig {
  autoStyle?: boolean
  defaultTheme?: ThemeType
  defaultMargin?: MarginPadding
}

export interface TableBuilderEvent {
  didParseCell: (data: CellHookData) => void
  willDrawCell: (data: CellHookData) => void
  didDrawCell: (data: CellHookData) => void
  willDrawPage: (data: HookData) => void
  didDrawPage: (data: HookData) => void
}
