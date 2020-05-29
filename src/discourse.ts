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

interface QueryResponse {
  success: boolean
  errors: string[]
  duration: number
  result_count: number
  params: Params
  columns: string[]
  default_limit: number
  relations: Relations
  colrender: Colrender
  rows: Array<Array<any>>
}

export async function executeQuery(
  hostname: string,
  id: string | number,
  params: object,
  key: string
): Promise<QueryResponse> {
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

  return response.json() as Promise<QueryResponse>
}
