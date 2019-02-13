#!/bin/sh

git add ./dist --all;
git add ./test/screenshot/images --all;

# Generate the changelog; adding the latest commits
./node_modules/.bin/conventional-changelog -i CHANGELOG.md -s
git add CHANGELOG.md
