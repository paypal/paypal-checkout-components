#!/bin/sh

# Push and publish!
git push;

if [ "$tag" = 'alpha' ]
then
  npm publish --tag $tag;
else
  git push --tags;
  npm publish --tag $tag;
fi;
