// Export main composable
export { useJsPdf } from "./composables";
// Export TableBuilder
export {
  TableBuilder,
  useTableBuilder,
  type TableBuilderConfig,
} from "./composables/useTableBuilder";

// Export utilities
export {
  createTotalRow,
  formatCurrency,
  formatDate,
  fromKeys,
  fromObjects,
  tableHelpers,
} from "./utils/tableHelpers";

// Export types
export type { AutoTableContent, AutoTableOptions } from "./plugins/AutoTable";
export type {
  LineCapStyle,
  Orientation,
  OutputOptions,
  PageFormat,
  SvgGenerateOptions,
  TextCustomOptions,
  TextSplitterOptions,
  VFSOptions,
} from "./types";
export type {
  CellDefAutoTable,
  ITableBuilder,
  TableHelpers,
} from "./types/table";
