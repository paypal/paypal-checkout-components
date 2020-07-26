#!/bin/bash

set -e;

npm run build;
git add dist;
git commit -m 'Dist' || echo 'Nothing to distribute';

npm version ${1-patch};

if [ -z "$DIST_TAG" ]; then
    DIST_TAG="latest";
fi;

git push;
git push --tags;
npm publish --tag "$DIST_TAG";

sleep 3;
npm run cdnify;