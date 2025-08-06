#!/bin/sh

# This script will determine the type of release based on the git branch.
# When the default branch is used, it will be a `patch` that's published to npm
# under the `latest` dist-tag. Any other branch will be a `prelease` that's
# published to npm under the `alpha-$SHA` dist-tag.

# Configuration flags
CREATE_ALPHA_PR=false # Set to false to skip PRs for alpha releases
export CREATE_ALPHA_PR

bump='patch'
tag='latest'

current_branch=$(git rev-parse --abbrev-ref HEAD)
default_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
current_sha=$(git rev-parse --short HEAD)

echo "Starting release from branch: $current_branch"

# Store original branch for postversion script
export ORIGINAL_BRANCH="$current_branch"

# Determine release type and calculate future version
current_version=$(node -p "require('./package.json').version")
if [ "$current_branch" != "$default_branch" ]; then
  bump='prerelease'
  tag="alpha-$current_sha"
  future_version="$current_version-$tag.0"
else
  # Calculate patch version bump
  future_version=$(echo $current_version | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
fi

export tag
export FUTURE_VERSION="$future_version"

echo "Releasing: $current_version → $future_version (tag: $tag)"

# Create release branch before version bump
release_branch="release/$future_version"
echo "Creating release branch: $release_branch"
git checkout -b "$release_branch" || {
  echo "ERROR: Failed to create release branch"
  exit 1
}

# Now run version bump on the release branch
# Use git commits only when creating PRs
echo "Running version bump..."

if [ "$current_branch" != "$default_branch" ]; then
  # Alpha release - check if we need PR (and thus git commit)
  if [ "${CREATE_ALPHA_PR:-false}" = "true" ]; then
    echo "Running: npm version $bump --preid=$tag (with git commit)"
    npm version $bump --preid=$tag
  else
    echo "Running: npm --no-git-tag-version version $bump --preid=$tag (no git commit)"
    npm --no-git-tag-version version $bump --preid=$tag
  fi
else
  # Main release - always needs PR, so always use git commit
  echo "Running: npm --no-git-tag-version version $bump (with git commit)"
  npm --no-git-tag-version version $bump
fi

# Ensure version bump created a commit
if git diff --cached --quiet; then
  echo "✅ Version bump completed"
else
  echo "Creating version commit..."
  new_version=$(node -p "require('./package.json').version")
  git commit -m "$new_version" || {
    echo "ERROR: Failed to create version commit"
    exit 1
  }
  echo "✅ Version commit created"
fi
