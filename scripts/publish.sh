#!/bin/sh

# This script will determine the type of release based on the git branch. When the default branch is used, it will be a `patch` that's published to npm under the `latest` dist-tag. Any other branch will be a `prelease` that's published to npm under the `alpha` dist-tag.
bump='patch';
tag='latest';

current_branch=$( git rev-parse --abbrev-ref HEAD );
default_branch=$( git remote show origin | sed -n '/HEAD branch/s/.*: //p' );

if [ "$current_branch" != "$default_branch" ]
then
  bump='prerelease';
  tag='alpha';
  npm --no-git-tag-version version $bump --preid=$tag;
else
  npm version $bump;
fi;

export tag;
