import * as core from '@actions/core'

import { executeQuery } from './discourse'

async function run(): Promise<void> {
  try {
    const discourseKey = core.getInput('discourseKey', { required: true })
    const hostname = core.getInput('hostname', { required: true })
    const id = core.getInput('id', { required: true })
    const rawParams = core.getInput('params')
    const params = rawParams ? JSON.parse(rawParams) : {}

    const json = await executeQuery(hostname, id, params, discourseKey)

    core.setOutput('results', JSON.stringify(json))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
