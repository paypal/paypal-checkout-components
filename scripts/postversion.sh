#/bin/sh

# Publish and push!
git push;
git push --tags;
git push git@github.com:paypal/paypal-checkout.git v4;
npm publish;

# verify new version has been published and then publish to cdnx
local_version=$(node --eval "
    const PACKAGE = './package.json';
    let pkg = require(PACKAGE);
    console.log(pkg.version);
")
npx grabthar-verify-npm-publish "$local_version" "latest"
npm run cdnify