import fs from 'fs'
import util from 'util'

import * as core from '@actions/core'

import { executeQuery, resultsToTable } from './discourse'
import { fstat } from 'fs'

const writeFile = util.promisify(fs.writeFile)

enum Format {
  JSON = 'json',
  MARKDOWN = 'markdown'
}

async function run(): Promise<void> {
  try {
    const discourseKey = core.getInput('discourseKey', { required: true })
    const format = validateFormat(core.getInput('format') ?? 'json')
    const hostname = core.getInput('hostname', { required: true })
    const id = core.getInput('id', { required: true })
    const rawParams = core.getInput('params')
    const params = rawParams ? JSON.parse(rawParams) : {}
    const path = core.getInput('path', { required: true })

    const json = await executeQuery(hostname, id, params, discourseKey)

    switch (format) {
      case Format.JSON:
        await writeFile(path, json)
        break

      case Format.MARKDOWN:
        const table = await resultsToTable(json)
        await writeFile(path, table)
        break
    }

    core.setOutput('path', path)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function validateFormat(format: string): Format {
  if (!(format in Format)) {
    throw new Error(
      `'${format}' is not a valid output format, please select one of: ${Object.values(Format).join(
        ', '
      )}`
    )
  }

  return format as Format
}

run()
