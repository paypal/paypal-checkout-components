#!/bin/sh

# determine patch or alpha release based on current branch, then run through the other version lifecycle scripts
release=${1-'patch'};

current_branch=$( git rev-parse --abbrev-ref HEAD );
default_branch=$( git remote show origin | sed -n '/HEAD branch/s/.*: //p' );

if [ "$current_branch" != "$default_branch" ]
then
  release='alpha';
  npm --no-git-tag-version version prerelease --preid=$release;
else
  npm version $release;
fi

export release;
