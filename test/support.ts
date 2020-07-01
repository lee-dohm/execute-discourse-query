import fs from 'fs'
import path from 'path'
import util from 'util'

const readFile = util.promisify(fs.readFile)

/**
 * Reads in a test fixture by name.
 *
 * Because a fixture can be potentially of any type, the result should be cast to the appropriate
 * type using `as`.
 *
 * @param filename Name of the file within the `fixtures` directory
 */
export async function readFixture(filename: string): Promise<any> {
  const text = (await readFile(path.join(__dirname, 'fixtures', filename), 'utf8')).toString()
  const obj = JSON.parse(text)

  return obj
}
