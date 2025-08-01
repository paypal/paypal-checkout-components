#!/bin/sh

# Create PR and auto-merge instead of direct push!

# Get the current version from package.json
NEW_VERSION=$(node -p "require('./package.json').version")
current_branch=$(git rev-parse --abbrev-ref HEAD)
current_sha=$(git rev-parse --short HEAD)

# Determine if we're on main branch (for tagging logic later)
default_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
is_main_branch=false
if [ "$current_branch" = "$default_branch" ]; then
  is_main_branch=true
fi

# Create release branch and move commit there
release_branch="release/$NEW_VERSION"
git checkout -b "$release_branch"

# Push the release branch
git push origin "$release_branch"

# Create Pull Request
PR_URL=$(gh pr create \
  --title "chore(release): $NEW_VERSION" \
  --body "$(
    cat << 'EOF'
## Automated Release: $NEW_VERSION

This is an automated release prepared by the npm version workflow.

### Changes
- Version bump to $NEW_VERSION
- Updated CHANGELOG.md with latest commits
- Built latest distribution files

### Next Steps
Once this PR is merged, the package will be automatically published to npm.

---
🤖 This PR was created automatically by the release workflow
EOF
  )" \
  --base "$default_branch" \
  --head "$release_branch")

echo "Created PR: $PR_URL"

# Auto-approve the PR
gh pr review "$PR_URL" --approve --body "🤖 Auto-approved by release workflow"

# Auto-merge the PR
gh pr merge "$PR_URL" --squash --delete-branch

# Switch back to main and pull the merged changes
git checkout "$default_branch"
git pull origin "$default_branch"

# Create and push git tag (for main branch releases only)
if [ "$is_main_branch" = "true" ] && [ "$tag" != "alpha" ]; then
  git tag "v$NEW_VERSION"
  git push origin "v$NEW_VERSION"
fi

# Publish to npm
if [ "$tag" = 'alpha' ]; then
  npm publish --tag $tag
else
  npm publish --tag $tag
fi
