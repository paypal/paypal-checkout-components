#!/bin/sh

# Create PR for manual review after publishing to npm

# Configuration flags inherited from publish.sh

# Get the current version from package.json
NEW_VERSION=$(node -p "require('./package.json').version")
current_branch=$(git rev-parse --abbrev-ref HEAD)
current_sha=$(git rev-parse --short HEAD)

echo "Preparing release: $NEW_VERSION (tag: $tag)"

default_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

# Determine if PR should be created based on release type and configuration
if [ "$tag" = "latest" ]; then
  # Main releases: Always create PR
  echo "Main release detected (tag: latest) - creating PR for review"
  CREATE_PR=true
elif [ "$CREATE_ALPHA_PR" = "true" ]; then
  # Alpha releases: Only create PR if explicitly enabled in publish.sh
  echo "Alpha release with PR enabled (tag: $tag) - creating PR for review"
  CREATE_PR=true
else
  # Alpha releases: Skip PR workflow by default
  echo "Alpha release detected (tag: $tag) - publishing directly without PR"
  echo "Set CREATE_ALPHA_PR=true in publish.sh to enable PR workflow for alpha releases"
  CREATE_PR=false
fi

# Create PR workflow if needed
if [ "$CREATE_PR" = "true" ]; then
  if [ "$tag" = "latest" ]; then
    target_branch="$default_branch"
    pr_description="### Status
✅ Package has already been published to npm with \`latest\` tag"
  else
    target_branch="$ORIGINAL_BRANCH"
    pr_description="### Status
✅ Package has already been published to npm with \`$tag\` tag

**Note**: This is an alpha release for testing purposes."
  fi

  release_branch=$(git rev-parse --abbrev-ref HEAD)
  echo "Pushing release branch: $release_branch"
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
  echo "📋 Ready for team review and manual merge"
fi

# Single npm publish command for all releases
echo "🚀 Publishing to npm (tag: $tag)..."
npm publish --tag $tag || {
  echo "ERROR: Failed to publish to npm"
  exit 1
}
echo "✅ Package published to npm successfully"

# Create and push git tag (for main branch releases only)
if [ "$tag" = "latest" ]; then
  echo "Creating git tag: v$NEW_VERSION"
  git tag "v$NEW_VERSION" || {
    echo "ERROR: Failed to create git tag"
    exit 1
  }
  git push origin "v$NEW_VERSION" || {
    echo "ERROR: Failed to push git tag"
    exit 1
  }
  echo "✅ Git tag created and pushed"
fi
