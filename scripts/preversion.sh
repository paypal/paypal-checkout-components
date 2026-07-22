#!/bin/sh

set -e

# Remove the `dist/` folder; we will re-generate later on
rm -rf dist/*
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
modules='@krakenjs/post-robot @krakenjs/zalgo-promise @krakenjs/beaver-logger @krakenjs/cross-domain-safe-weakmap @krakenjs/cross-domain-utils @krakenjs/belter paypal-braintree-web-client @krakenjs/grumbler-scripts @paypal/sdk-constants'

for module in $modules @krakenjs/zoid; do
  rm -rf "node_modules/$module"
done

npm install $modules
# pinned to the bfcache alpha build for test-env purposes (DTPPCPSDK-5875)
npm install @krakenjs/zoid@10.6.0-alpha.2
npm run build
