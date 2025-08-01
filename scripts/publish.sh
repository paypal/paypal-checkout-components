#!/bin/sh

# This script will determine the type of release based on the git branch.
# When the default branch is used, it will be a `patch` that's published to npm
# under the `latest` dist-tag. Any other branch will be a `prelease` that's
# published to npm under the `alpha-$SHA` dist-tag.
bump='patch'
tag='latest'

current_branch=$(git rev-parse --abbrev-ref HEAD)
default_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
current_sha=$(git rev-parse --short HEAD)

echo "=== Publish Info ==="
echo "Current branch: $current_branch"
echo "Default branch: $default_branch"

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

echo "Current version: $current_version"
echo "Future version: $future_version"
echo "Release tag: $tag"

# Create release branch before version bump
release_branch="release/$future_version"
echo "Creating release branch: $release_branch"
git checkout -b "$release_branch"

# Now run version bump on the release branch
if [ "$current_branch" != "$default_branch" ]; then
  npm --no-git-tag-version version $bump --preid=$tag
else
  npm version $bump
fi
