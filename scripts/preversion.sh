#!/bin/sh

set -e;

# Remove the `dist/` folder; we will re-generate later on
rm dist/*;
git checkout dist/;

# Make sure the HEAD is clean
if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

# Re-install just the basics
rm -rf node_modules/zoid node_modules/post-robot node_modules/zalgo-promise node_modules/beaver-logger node_modules/cross-domain-safe-weakmap node_modules/cross-domain-utils node_modules/grumbler-scripts
npm install zoid post-robot zalgo-promise beaver-logger cross-domain-safe-weakmap cross-domain-utils grumbler-scripts

rm dist/*;
npm run build;
