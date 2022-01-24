#!/bin/sh

# determine patch or alpha release based on current branch
release=patch
default_branch=$( git remote show origin | sed -n '/HEAD branch/s/.*: //p' )
current_branch=$( git rev-parse --abbrev-ref HEAD )

if [ "$current_branch" != "$default_branch" ]
then
  release=prerelease
fi

# Running `npm version` will run through the other version lifecycle scripts
# npm version $release;
