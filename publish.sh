#!/bin/sh

set -e;

rm -rf node_modules/xcomponent node_modules/post-robot node_modules/sync-browser-mocks node_modules/beaver-logger
npm install xcomponent post-robot sync-browser-mocks beaver-logger

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
