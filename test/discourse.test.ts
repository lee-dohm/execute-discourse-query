import { resultsToTable, QueryResults } from '../src/discourse'
import { readFixture } from './support'

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
