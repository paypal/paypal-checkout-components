#!/bin/sh

# Push and publish!
git push;

if [ "$release" = 'alpha' ]
then
  npm publish --tag $release;
else
  git push --tags;
  npm publish;
fi;
