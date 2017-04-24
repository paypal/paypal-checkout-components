#!/bin/sh

set -e;

if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

rm -rf node_modules/xcomponent node_modules/post-robot node_modules/sync-browser-mocks node_modules/beaver-logger node_modules/cross-domain-safe-weakmap
npm install xcomponent post-robot sync-browser-mocks beaver-logger cross-domain-safe-weakmap

npm run postinstall

rm dist/*;

gulp build;

git add dist --all;
git add demo/app/build --all;

git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
