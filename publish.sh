#!/bin/bash

set -e;

npm run build;
git add dist;
git commit -m "Dist";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
