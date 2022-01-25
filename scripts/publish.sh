#!/bin/sh

# determine patch or alpha release based on current branch
release='patch';
default_branch=$( git remote show origin | sed -n '/HEAD branch/s/.*: //p' );
current_branch=$( git rev-parse --abbrev-ref HEAD );

if [ "$current_branch" != "$default_branch" ]
then
  release='alpha';
  npm --no-git-tag-version version prerelease --preid=$release;
else
  npm version $release;
fi

export release;
