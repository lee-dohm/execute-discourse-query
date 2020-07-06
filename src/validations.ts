import { Format } from './format'

/**
 * Thrown when an invalid output format is selected.
 */
export class InvalidFormatError extends Error {
  constructor(format: string) {
    super(
      `'${format}' is not a valid output format, please select one of: ${Object.values(Format).join(
        ', '
      )}`
    )
    this.name = this.constructor.name
  }
}

/**
 * Validates that the format text is an option.
 *
 * @param format Format name to validate
 */
export function validateFormat(f: string): Format {
  const format = f.toUpperCase()

  if (!(format in Format)) {
    throw new InvalidFormatError(f)
  }

  return format.toLowerCase() as Format
}
