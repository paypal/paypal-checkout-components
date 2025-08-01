#!/bin/sh

echo "=== version.sh: Starting version script ==="
echo "Git status at start of version.sh:"
git status --porcelain

git add ./dist --all
git add ./test/screenshot/images --all

echo "Git status after adding dist and test files:"
git status --porcelain

# Generate the changelog; adding the latest commits
echo "Generating changelog..."
./node_modules/.bin/conventional-changelog -i CHANGELOG.md -s
git add CHANGELOG.md

echo "Git status after adding changelog:"
git status --porcelain
echo "=== version.sh: End of version script ==="
