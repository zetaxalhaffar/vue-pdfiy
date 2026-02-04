import type { CellHookData, HookData, MarginPadding, ThemeType } from 'jspdf-autotable'

// src/types/table.ts
export interface TableBuilderConfig {
  autoStyle?: boolean
  defaultTheme?: ThemeType
  defaultMargin?: MarginPadding
}

/**
 * Table builder event callbacks.
 * The library (jspdf-autotable) invokes these callbacks and passes the data;
 * you only provide the callback function. The `data` argument is supplied by
 * the library when the hook runs.
 */
export interface TableBuilderEvent {
  /** Called after a cell is parsed. Library passes CellHookData to your callback. */
  didParseCell: (data: CellHookData) => void
  /** Called before a cell is drawn. Library passes CellHookData to your callback. */
  willDrawCell: (data: CellHookData) => void
  /** Called after a cell is drawn. Library passes CellHookData to your callback. */
  didDrawCell: (data: CellHookData) => void
  /** Called before a page is drawn. Library passes HookData to your callback. */
  willDrawPage: (data: HookData) => void
  /** Called after a page is drawn. Library passes HookData to your callback. */
  didDrawPage: (data: HookData) => void
}

/** Event names that receive CellHookData when the library invokes the callback */
export type CellHookEventName = 'didParseCell' | 'willDrawCell' | 'didDrawCell'

/** Event names that receive HookData when the library invokes the callback */
export type PageHookEventName = 'willDrawPage' | 'didDrawPage'
