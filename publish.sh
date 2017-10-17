#!/bin/bash

set -i

npm run test

npm version ${1-patch};

git push;
git push --tags;
npm publish;
