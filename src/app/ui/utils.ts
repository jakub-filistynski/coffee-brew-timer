export const roundAndTruncate = (num: number, maxDecimalDigits: number): number => {
  return Number(num.toFixed(maxDecimalDigits))
}