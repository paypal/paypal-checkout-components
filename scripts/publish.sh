#!/bin/sh

# Determine the type of release, then run through the other version lifecycle scripts
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
