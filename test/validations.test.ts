import { Format } from '../src/format'
import { validateFormat } from '../src/validations'

describe('validateFormat', () => {
  it('accepts JSON as an option', () => {
    expect(validateFormat('Json')).toEqual(Format.JSON)
  })

  it('accepts MARKDOWN as an option', () => {
    expect(validateFormat('mArKdOwN')).toEqual(Format.MARKDOWN)
  })

  it('rejects foo as an option', () => {
    expect(() => { validateFormat('foo') }).toThrow()
  })

  it('rejects an empty string as an option', () => {
    expect(() => { validateFormat('') }).toThrow()
  })
})
