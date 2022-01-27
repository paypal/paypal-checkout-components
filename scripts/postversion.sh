#/bin/sh

# Publish and push!
git push;
git push --tags;
git push https://github.com/paypal/paypal-checkout-components.git v4;
npm publish;

# publish to cdnx after verifying a successful publish to the public npm registry
local_version=$(node --eval "
    const PACKAGE = './package.json';
    let pkg = require(PACKAGE);
    console.log(pkg.version);
")
npx grabthar-verify-npm-publish "$local_version" "latest"
npm run cdnify
