name: "Close stale Issues and PRs"
on:
  schedule:
    - cron: "30 0 * * *"

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - name: No activity for 90 days
        uses: actions/stale@v3
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          days-before-stale: 90
          days-before-close: 7
          exempt-issue-labels: "awaiting-approval,work-in-progress"
          stale-issue-message: >
            This issue has been automatically marked as stale.
            **If this issue is still affecting you, please leave any comment** (for example, "bump"), and we'll keep it open.
            We are sorry that we haven't been able to prioritize it yet. If you have any new additional information, please include it with your comment!
          stale-pr-message: >
            This pull request has been automatically marked as stale.
            **If this pull request is still relevant, please leave any comment** (for example, "bump"), and we'll keep it open.
            We are sorry that we haven't been able to prioritize reviewing it yet. Your contribution is very much appreciated.
          close-issue-message: >
            Closing this issue after a prolonged period of inactivity. If this issue is still present in the latest release, please create a new issue with up-to-date information.
          close-pr-message: >
            Closing this pull request after a prolonged period of inactivity. If this issue is still present in the latest release, please ask for this pull request to be reopened.
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contac
