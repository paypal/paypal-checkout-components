#!/bin/sh

echo "Preparing distribution files and changelog..."

# Stage distribution files
git add ./dist --all
git add ./test/screenshot/images --all

# Generate and stage changelog
echo "Generating changelog..."
./node_modules/.bin/conventional-changelog -i CHANGELOG.md -s || {
  echo "ERROR: Failed to generate changelog"
  exit 1
}
git add CHANGELOG.md

echo "✅ Files prepared for version commit"
