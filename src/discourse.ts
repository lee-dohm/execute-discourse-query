import fetch from 'node-fetch'

interface Colrender {
  [key: string]: string
}

interface Params {
  [key: string]: string
}

interface Relations {
  [key: string]: object[]
}

/**
 * Response returned from a successful call to the Discourse query API.
 */
export interface QueryResults {
  colrender: Colrender

  /** List of column names */
  columns: string[]

  /** Default limit on number of rows returned */
  default_limit: number

  /** Length of time it took to execute the query in milliseconds */
  duration: number

  /** Errors returned when parsing or executing the query */
  errors: string[]

  /** Params passed in to the query */
  params: Params

  relations: Relations

  /** Number of rows returned */
  result_count: number

  /** Contents of the rows */
  rows: Array<Array<any>>

  /** Flag indicating whether the query executed successfully */
  success: boolean
}

/**
 * Executes a Discourse query.
 *
 * @param hostname Hostname of the Discourse instance to submit the query to
 * @param id ID of the query to execute
 * @param params Parameters to the query
 * @param key API key to use to execute the query
 */
export async function executeQuery(
  hostname: string,
  id: string | number,
  params: object,
  key: string
): Promise<QueryResults> {
  const url = `https://${hostname}/admin/plugins/explorer/queries/${id}/run`
  const body = JSON.stringify({ params: JSON.stringify(params) })

  const response = await fetch(url, {
    body: body,
    headers: {
      'api-key': key,
      'api-username': 'system',
      'content-type': 'application/json; charset=UTF-8'
    },
    method: 'POST'
  })

  if (response.status != 200) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<QueryResults>
}

/**
 * Converts the Discourse query results JSON into a Markdown table representation.
 *
 * @param results Results of the Discourse query
 */
export async function resultsToTable(results: QueryResults): Promise<string> {
  let text = results.columns.join(' | ').concat('\n', buildSeparator(results.columns.length))

  results.rows.forEach((row) => {
    const fields = row
      .map((value) => {
        return value.toString()
      })
      .join(' | ')

    text = text.concat(fields, '\n')
  })

  return text
}

function buildSeparator(count: number) {
  let separators: string[] = []

  for (let i = 0; i < count; i++) {
    separators.push('---')
  }

  return separators.join('|').concat('\n')
}
