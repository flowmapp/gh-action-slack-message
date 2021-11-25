const https = require('https')
const users = require('./users.json')

module.exports = () => {
  const {
    GITHUB_ACTOR: author,
    GITHUB_REF_NAME: branch,
    GITHUB_REPOSITORY: repo,
    GITHUB_RUN_ID: runId,
    GITHUB_RUN_NUMBER: runNumber,
    SLACK_WEBHOOK_URL: url,
    INPUT_STATUS: status,
    INPUT_CYPRESSDASHBOARDURL: cypressDashboardURL,
  } = process.env

  const color = status === 'success' ? 'good' : 'danger'

  const { name, slackId } = users[author]

  const userMention = status === 'success' ? name : `<@${slackId}>`
  const statusText = status === 'success' ? 'succeeded' : 'failed'
  const jobLink = `<https://github.com/${repo}/actions/runs/${runId} | Pipeline #${runNumber}>`

  const testResultsText = cypressDashboardURL ? `\nSee results at ${cypressDashboardURL}` : ''
  const postData = JSON.stringify({
    text: `Pipeline ${statusText} by ${userMention}${testResultsText}`,
    mrkdwn: true,
    link_names: 1,
    attachments: [
      {
        blocks: [],
        color,
        text: `${jobLink} [${repo.replace('flowmapp/', '')}] (${branch})`,
      },
    ],
  })

  const req = https.request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  req.write(postData)
  req.end()
}
