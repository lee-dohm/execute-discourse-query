# Execute Discourse Query

A GitHub Action to execute a Discourse query and return the results.

## Use

### Inputs

- `discourseKey` &mdash; **required** API key used to execute the query
- `format` &mdash; The format to store the results in: either `json` or `markdown` (_default:_ `json`)
- `hostname` &mdash; **required** Hostname of the Discourse instance to submit the query to
- `id` &mdash; **required** ID of the query to execute
- `params` &mdash; JSON object containing the parameters for the query
- `path` &mdash; **required** File path to store the results in

### Outputs

- `path` &mdash; File path where the results of the query were stored

## License

[MIT](LICENSE.md)
