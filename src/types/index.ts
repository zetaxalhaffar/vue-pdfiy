export type Orientation = 'portrait' | 'landscape' | 'l' | 'o' // Orientation of the first page. Possible values are "portrait" or "landscape" (or shortcuts "p" or "l").

/**
 * @description
 * The default unit to be used for measurements.
 * Possible values are "pt" (points), "mm", "cm", "in", "px", "pc", "em" or "ex". Note that in order to get the correct scaling for "px"
 * units, you need to enable the hotfix "px_scaling" by setting options.hotfixes = ["px_scaling"].
 */
export type Unit = 'pt' | 'mm' | 'cm' | 'in' | 'px' | 'pc' | 'em' | 'ex'

/**
 *
 * The format of the first page. Can be:
 * a0 - a10
 * b0 - b10
 * c0 - c10
 * dl
 * letter
 * government-letter
 * legal
 * junior-legal
 * ledger
 * tabloid
 * credit-card
 * Default is "a4". If you want to use your own format just pass instead of one of the above predefined formats the size as an number-array, e.g. [595.28, 841.89]
 */
export type Format =
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

export interface Encryption {
  userPassword?: string // Password for the user bound by the given permissions list.
  ownerPassword?: string // Both userPassword and ownerPassword should be set for proper authentication.
  permissions?: string[] // Array of permissions "print", "modify", "copy", "annot-forms", accessible by the user.
}

export interface PDFiyOptions {
  orientation?: Orientation
  unit?: Unit
  format?: Format | [number, number]
  putOnlyUsedFonts?: boolean // Only put fonts into the PDF, which were used.
  compress?: boolean // Compress the generated PDF.
  precision?: number // Precision of the element-positions. default is 16.
  userUnit?: number // User defined unit to be used for measurements. default is 1.0.
  hotfixes?: string[] // Hotfixes to be applied to the PDF.
  encryption?: Encryption
  floatPrecision?: number | 'smart' // Precision of the floating point numbers. default is 16.
}
