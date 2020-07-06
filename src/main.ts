import fs from 'fs'
import util from 'util'

import * as core from '@actions/core'

import * as discourse from './discourse'
import { Format } from './format'
import { validateFormat } from './validations'

const writeFile = util.promisify(fs.writeFile)

async function run(): Promise<void> {
  try {
    const discourseKey = core.getInput('discourseKey', { required: true })
    const format = validateFormat(core.getInput('format') ?? 'json')
    const hostname = core.getInput('hostname', { required: true })
    const id = core.getInput('id', { required: true })
    const rawParams = core.getInput('params')
    const params = rawParams ? JSON.parse(rawParams) : {}
    const path = core.getInput('path', { required: true })

    const results = await discourse.executeQuery(hostname, id, params, discourseKey)

    switch (format) {
      case Format.JSON:
        await writeFile(path, JSON.stringify(results))
        break

      case Format.MARKDOWN:
        const table = await discourse.resultsToTable(results)
        await writeFile(path, table)
        break
    }

    core.setOutput('path', path)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
