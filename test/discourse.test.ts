import fs from 'fs'
import path from 'path'
import util from 'util'

import { resultsToTable, QueryResults } from '../src/discourse'

const readFile = util.promisify(fs.readFile)

async function readFixture(filename: string) {
  const text = (await readFile(path.join(__dirname, 'fixtures', filename), 'utf8')).toString()
  const obj = JSON.parse(text)

  return obj
}

describe('resultsToTable', () => {
  let results: QueryResults

  beforeEach(async () => {
    results = (await readFixture('query-results-with-parameters.json')) as QueryResults
  })

  it('converts a result into a Markdown table', async () => {
    const table = await resultsToTable(results)
    const rows = table.split('\n')

    expect(rows.length).toEqual(10)
    expect(rows[0]).toEqual(
      'name | topic_count | avg_time_to_response | response_rate | avg_time_to_solve | solve_rate'
    )
    expect(rows[1]).toEqual('---|---|---|---|---|---')
    expect(rows[2]).toEqual(
      'How to use Git and GitHub | 91 | 2 days 16:17:11.427824 | 78.0 | 1 day 21:56:22.523508 | 34.0'
    )
  })
})
