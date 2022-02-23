#!/bin/sh

set -e

# Remove the `dist/` folder; we will re-generate later on
rm dist/*
git checkout dist/

# Make sure the HEAD is clean
if ! git diff-files --quiet; then
  echo "Can not publish with unstaged uncommited changes"
  exit 1
fi

if ! git diff-index --quiet --cached HEAD; then
  echo "Can not publish with staged uncommited changes"
  exit 1
fi

# Re-install just the basics
modules='zoid post-robot zalgo-promise beaver-logger cross-domain-safe-weakmap cross-domain-utils belter paypal-braintree-web-client grumbler-scripts paypal-sdk-constants'

for module in $modules; do
  rm -rf "node_modules/$module"
done

npm install $modules
npm run build
