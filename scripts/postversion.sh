#/bin/sh

# Push and publish!
git push;
git push --tags;

if [ "$release" = 'alpha' ]
then
  npm publish --tag $release
else
  npm publish
fi
