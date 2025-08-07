# Building and Deploying

This document outlines the build and deployment process for the PayPal Checkout Components.

## Overview

The release process uses an automated GitHub Actions workflow that handles version bumping, building, publishing to npm, and creating pull requests for review.

## Release Types

### Main Releases (Latest)

- **Trigger**: Manual workflow dispatch from `main` branch
- **Version**: Patch increment (e.g., 5.0.375 → 5.0.376)
- **Tag**: `latest` on npm
- **Git Tag**: `v{version}` (e.g., `v5.0.376`)
- **PR**: Always created targeting `main` branch

### Alpha Releases

- **Trigger**: Manual workflow dispatch from feature branches
- **Version**: Prerelease increment (e.g., 5.0.375 → 5.0.375-alpha-abc123.0)
- **Tag**: `alpha-{sha}` on npm (e.g., `alpha-abc123`)
- **Git Tag**: None (alpha releases don't create git tags)
- **PR**: Only created if `CREATE_ALPHA_PR=true` in `scripts/publish.sh`

## Release Workflow

### 1. GitHub Actions Trigger

The release is triggered manually via the "publish to npm" workflow in GitHub Actions.

### 2. Script Execution Flow

```
npm run release
    ↓
./scripts/publish.sh
    ↓
npm version [patch|prerelease] (triggers npm lifecycle hooks)
    ↓
preversion: ./scripts/preversion.sh
    ↓
version: ./scripts/version.sh
    ↓
postversion: ./scripts/postversion.sh
```

### 3. Script Details

#### `preversion.sh`

- Ensures clean working directory
- Runs `npm run build` to create fresh distribution files
- Reinstalls critical dependencies for consistency

#### `version.sh`

- Stages distribution files (`./dist`)
- Stages test images (`./test/screenshot/images`)
- Generates conventional changelog
- Stages `CHANGELOG.md`

#### `postversion.sh`

- Creates pull request (if configured)
- Publishes to npm with appropriate tag
- Creates and pushes git tag (main releases only)

## Key Features

### Automated PR Creation

- **Main releases**: PR always created targeting `main` branch
- **Alpha releases**: PR created only if `CREATE_ALPHA_PR=true`
- PRs include version bump, changelog, and built distribution files

### Branch Strategy

- Release performed on dedicated `release/{version}` branches
- Main branch remains protected with review requirements
- Alpha releases target original feature branch

### Distribution File Handling

- Built during `preversion` hook
- Staged during `version` hook
- Included in version commit and npm package

### Git Tag Management

- Main releases: Git tags created and pushed after successful npm publish
- Alpha releases: No git tags (keeps tag history clean)

## Configuration

### Environment Variables

- `CREATE_ALPHA_PR`: Controls PR creation for alpha releases (default: `false`)
- `NPM_TOKEN`: npm authentication (GitHub secret)
- `GITHUB_TOKEN`: GitHub API access (GitHub secret)

### Release Branch Naming

- Format: `release/{version}`
- Examples: `release/5.0.376`, `release/5.0.375-alpha-abc123.0`

## Manual Operations

### Emergency Tag Creation

If git tag creation fails during release:

```bash
# Create tag pointing to specific commit
git tag v{version} {commit-sha}

# Push tag to remote
git push origin v{version}
```

### Alpha Release with PR

To enable PR creation for alpha releases:

1. Edit `scripts/publish.sh`
2. Set `CREATE_ALPHA_PR=true`
3. Run release workflow

## Troubleshooting

### "Tag already exists" Error

This was resolved by using `--no-git-tag-version` flag in `npm version` commands, allowing manual git tag creation in postversion script.

### Version Mismatch

If version calculation seems incorrect, verify:

- `package.json` version before release
- Branch type detection in `publish.sh`
- npm version command flags

### Build Failures

If preversion build fails:

- Check for uncommitted changes
- Verify dependencies are correctly installed
- Review webpack configuration

## Security

- npm publish requires `NPM_TOKEN` secret
- PR creation requires `GITHUB_TOKEN` with appropriate permissions
- No secrets are logged or exposed in script output
- Git operations use bot account for automation

## Dependencies

The release process reinstalls these critical dependencies for consistency:

- `@krakenjs/zoid`
- `@krakenjs/post-robot`
- `@krakenjs/zalgo-promise`
- `@krakenjs/beaver-logger`
- `@krakenjs/cross-domain-safe-weakmap`
- `@krakenjs/cross-domain-utils`
- `@krakenjs/belter`
- `paypal-braintree-web-client`
- `@krakenjs/grumbler-scripts`
- `@paypal/sdk-constants`
