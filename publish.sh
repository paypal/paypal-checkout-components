#!/bin/bash

set -e;

npm run build;

npm version ${1-patch};

git push;
git push --tags;
npm publish;
