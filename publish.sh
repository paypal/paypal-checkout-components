#!/bin/sh

set -e;

rm dist/*;
git checkout dist/;

if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

modules='zoid post-robot zalgo-promise beaver-logger cross-domain-safe-weakmap cross-domain-utils belter paypal-braintree-web-client grumbler-scripts paypal-sdk-constants';

for module in $modules; do
    rm -rf "node_modules/$module";
done;

npm install $modules;

npm run build;

git add dist/;
git add ./test/screenshot/images --all;
git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
