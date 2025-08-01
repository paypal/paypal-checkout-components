#!/bin/sh

# Create PR and auto-merge instead of direct push!

# Configuration flags
CREATE_ALPHA_PR=true # Set to true to create PRs for alpha releases

# Get the current version from package.json
NEW_VERSION=$(node -p "require('./package.json').version")
current_branch=$(git rev-parse --abbrev-ref HEAD)
current_sha=$(git rev-parse --short HEAD)

echo "=== Release Info ==="
echo "Version: $NEW_VERSION"
echo "Current branch: $current_branch"
echo "Tag: $tag"
echo "Create alpha PR: $CREATE_ALPHA_PR"

# Determine if we're on main branch (for tagging logic later)
default_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
is_main_branch=false
if [ "$current_branch" = "$default_branch" ]; then
  is_main_branch=true
fi

# Alpha releases: Skip PR workflow by default, unless flag is set
if [ "$tag" != "latest" ] && [ "$CREATE_ALPHA_PR" != "true" ]; then
  echo "Alpha release detected (tag: $tag) - publishing directly without PR"
  echo "Set CREATE_ALPHA_PR=true to test PR workflow for alpha releases"
  # For alpha releases, just publish directly from current commit
  # No need for PR workflow since this is a test release
else
  if [ "$tag" = "latest" ]; then
    echo "=== Main release detected - creating PR workflow ==="
    target_branch="$default_branch"
    pr_description="### Status
✅ Package has already been published to npm with \`latest\` tag"
  else
    echo "=== Alpha release detected with CREATE_ALPHA_PR=true - creating PR workflow ==="
    target_branch="$ORIGINAL_BRANCH"
    pr_description="### Status
✅ Package has already been published to npm with \`$tag\` tag

**Note**: This is an alpha release for testing purposes."
  fi

  echo "Target branch: $target_branch"

  # We're already on the release branch created by publish.sh
  release_branch=$(git rev-parse --abbrev-ref HEAD)
  echo "Already on release branch: $release_branch"

  # Push the release branch
  echo "Pushing release branch to origin..."
  git push origin "$release_branch" || {
    echo "ERROR: Failed to push release branch"
    exit 1
  }

  # Create Pull Request
  echo "Creating pull request..."
  PR_URL=$(gh pr create \
    --title "chore(release): $NEW_VERSION" \
    --body "## Automated Release: $NEW_VERSION

This is an automated release prepared by the npm version workflow.

### Changes
- Version bump to $NEW_VERSION
- Updated CHANGELOG.md with latest commits
- Built latest distribution files

$pr_description

---
🤖 This PR was created automatically by the release workflow" \
    --base "$target_branch" \
    --head "$release_branch") || {
    echo "ERROR: Failed to create PR"
    exit 1
  }

  echo "✅ Created PR: $PR_URL"

  # Add debugging for approval
  echo "Attempting to approve PR..."
  approval_result=$(gh pr review "$PR_URL" --approve --body "🤖 Auto-approved by release workflow" 2>&1)
  approval_status=$?

  if [ $approval_status -eq 0 ]; then
    echo "✅ PR approved successfully"
  else
    echo "❌ PR approval failed with status: $approval_status"
    echo "Approval output: $approval_result"
  fi

  # Add small delay before merge
  echo "Waiting 2 seconds before merge..."
  sleep 2

  # Auto-merge the PR
  echo "Attempting to merge PR..."
  merge_result=$(gh pr merge "$PR_URL" --squash --delete-branch 2>&1)
  merge_status=$?

  if [ $merge_status -eq 0 ]; then
    echo "✅ PR merged successfully"
  else
    echo "❌ PR merge failed with status: $merge_status"
    echo "Merge output: $merge_result"
    exit 1
  fi

  # Switch back to target branch and pull the merged changes
  echo "Switching back to $target_branch..."
  git checkout "$target_branch"
  git pull origin "$target_branch"
fi

# Create and push git tag (for main branch releases only)
if [ "$tag" = "latest" ]; then
  git tag "v$NEW_VERSION"
  git push origin "v$NEW_VERSION"
fi

# Publish to npm
npm publish --tag $tag
