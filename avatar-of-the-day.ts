import * as core from '@actions/core'
import * as github from '@actions/github'
import {GravatarClient} from 'grav.client'

const run = async (): Promise<void> => {
  try {
    // Our action will need to API access to gravatar so we require a password and email
    // This can be set in the secrets of the containing repository
    const password = process.env['GRAVATAR_PASSWORD']
    if (!password || password === '') return

    const email = process.env['GRAVATAR_EMAIL']
    if (!email || email === '') return

    const client = new GravatarClient(email, password)
    // client.test().then(data => ... );

    // Our action will need to API access the repository so we require a token
    // This can be set in the calling workflow or it can use the default
    const token = process.env['GITHUB_TOKEN'] || core.getInput('token')
    if (!token || token === '') return

    // Create the octokit client
    const octokit: github.GitHub = new github.GitHub(token)

    console.log(octokit)
  } catch (error) {
    // If there is any error we'll fail the action with the error message
    console.error(error.message)
    core.setFailed(`Honk-action failure: ${error}`)
  }
}

// Don't auto-execute in the test environment
if (process.env['NODE_ENV'] !== 'test') {
  run()
}

export default run
