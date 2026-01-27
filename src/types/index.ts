export type Orientation = 'p' | 'portrait' | 'l' | 'landscape'

/**
 * @description Page formats
 * @type {Formats}
 */
export type Formats =
  | 'a0'
  | 'a1'
  | 'a2'
  | 'a3'
  | 'a4'
  | 'a5'
  | 'a6'
  | 'a7'
  | 'a8'
  | 'a9'
  | 'a10'
  | 'b0'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'b4'
  | 'b5'
  | 'b6'
  | 'b7'
  | 'b8'
  | 'b9'
  | 'b10'
  | 'c0'
  | 'c1'
  | 'c2'
  | 'c3'
  | 'c4'
  | 'c5'
  | 'c6'
  | 'c7'
  | 'c8'
  | 'c9'
  | 'c10'
  | 'dl'
  | 'letter'
  | 'government-letter'
  | 'legal'
  | 'junior-legal'
  | 'ledger'
  | 'tabloid'
  | 'credit-card'

export type PageFormat = Formats | [number, number]

/**
 * @description Line cap styles for setLineCap
 * Valid values: 'butt' (or 0) for flat edge, 'round' (or 1) for rounded cap, 'square' (or 2) for square cap
 */
export type LineCapStyle = 'butt' | 'round' | 'square' | 0 | 1 | 2

/**
 * @description Options for output methods that support filename parameter
 */
export type OutputOptions = {
  filename?: string
}

/**
 * @description Output types that return ArrayBuffer
 */
export type OutputArrayBufferType = 'arraybuffer'

/**
 * @description Output types that return Blob
 */
export type OutputBlobType = 'blob'

/**
 * @description Output types that return URL
 */
export type OutputUrlTypes = 'bloburi' | 'bloburl'

/**
 * @description Output types that return string (with optional options)
 */
export type OutputStringTypes = 'datauristring' | 'dataurlstring'

/**
 * @description Output types that return Window (with optional options)
 */
export type OutputWindowTypes =
  | 'pdfobjectnewwindow'
  | 'pdfjsnewwindow'
  | 'dataurlnewwindow'

/**
 * @description Output types that return boolean (with optional options)
 */
export type OutputBooleanTypes = 'dataurl' | 'datauri'

/**
 * @description All blob-related output types
 */
export type OutputBlobsTypes =
  | OutputArrayBufferType
  | OutputBlobType
  | OutputUrlTypes

/**
 * @description All data-related output types
 */
export type OutputDataTypes =
  | OutputStringTypes
  | OutputBooleanTypes
  | OutputWindowTypes



