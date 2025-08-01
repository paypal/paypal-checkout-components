#!/bin/sh

# Create PR and auto-merge instead of direct push!

# Configuration flags inherited from publish.sh

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

  # Publish to npm immediately for alpha releases without PR
  echo "🚀 Publishing to npm (tag: $tag)..."
  npm publish --tag $tag || {
    echo "ERROR: Failed to publish to npm"
    exit 1
  }
  echo "✅ Package published to npm successfully"
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

  # Check branch states before pushing
  echo "=== Branch comparison before push ==="
  echo "Target branch ($target_branch) latest commit:"
  git log --oneline -1 origin/$target_branch 2> /dev/null || echo "Target branch not found on remote"
  echo "Release branch ($release_branch) latest commit:"
  git log --oneline -1 $release_branch

  # Push the release branch
  echo "Pushing release branch to origin..."
  git push origin "$release_branch" || {
    echo "ERROR: Failed to push release branch"
    exit 1
  }

  # Check branch states after pushing
  echo "=== Branch comparison after push ==="
  echo "Target branch on remote:"
  git ls-remote origin $target_branch
  echo "Release branch on remote:"
  git ls-remote origin $release_branch

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

  echo ""
  echo "📋 PR created for manual review and approval"
  echo "   → The team can review and merge when ready"
  echo "   → This PR contains changelog and version updates for repository history"
  echo ""

  # Publish to npm immediately
  echo "🚀 Publishing to npm (tag: $tag)..."
  npm publish --tag $tag || {
    echo "ERROR: Failed to publish to npm"
    exit 1
  }
  echo "✅ Package published to npm successfully"
fi

# Create and push git tag (for main branch releases only)
if [ "$tag" = "latest" ]; then
  git tag "v$NEW_VERSION"
  git push origin "v$NEW_VERSION"
fi
