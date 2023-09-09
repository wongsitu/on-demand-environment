import github from '@actions/github'

async function run() {
  const { ISSUE_NUMBER, GITHUB_TOKEN, OWNER, REPO, WEBSITE_LINK } = process.env

  const octokit = github.getOctokit(GITHUB_TOKEN)

  try {
    const { data } = await octokit.rest.issues.createComment({
      owner: OWNER,
      repo: REPO,
      issue_number: ISSUE_NUMBER,
      // We unfortunately need to use replace to get rid
      // of extraneous double quotes
      body: `[${WEBSITE_LINK}](${WEBSITE_LINK.replace(/"/gs, '')})`
    });

    // for debugging, lets log the created comment
    console.log('created comment', data);
  } catch (err) {
    throw err
  }
}

run();