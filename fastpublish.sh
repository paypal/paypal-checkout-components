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

rm dist/*;

gulp typecheck;
gulp webpack;

git add ./dist --all;
git add ./test/screenshot/images --all;

git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
