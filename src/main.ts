import * as core from '@actions/core'

import fetch from 'node-fetch'

async function run(): Promise<void> {
  try {
    const discourseKey = core.getInput('discourseKey', { required: true })
    const hostname = core.getInput('hostname', { required: true })
    const id = core.getInput('id', { required: true })
    const rawParams = core.getInput('params')
    const params = rawParams ? JSON.parse(rawParams) : {}

    const url = `https://${hostname}/admin/plugins/explorer/queries/${id}/run`
    const body = JSON.stringify({ params: JSON.stringify(params) })

    const response = await fetch(url, {
      body: body,
      headers: {
        'api-key': discourseKey,
        'api-username': 'system',
        'content-type': 'application/json; charset=UTF-8'
      },
      method: 'POST'
    })

    if (response.status != 200) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    const json = await response.json()

    core.setOutput('results', JSON.stringify(json))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
