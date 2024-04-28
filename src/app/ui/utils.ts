export const roundAndTruncate = (num: number, maxDecimalDigits: number): number => {
  return Number(num.toFixed(maxDecimalDigits))
}

export const addLeadingZeros = (num: number, size: number): string => {
  return num.toString().padStart(size, '0')
}