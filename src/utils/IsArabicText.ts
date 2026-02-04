/**
 * @description Check if text contains Arabic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Arabic characters
 */
export default function containsArabic(text: string): boolean {
  const arabicRegex = /[\u0600-\u06FF]/
  return arabicRegex.test(text)
}
