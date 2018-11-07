#/bin/sh

# Publish and push!
git push git@github.com:paypal/paypal-checkout.git;
git push git@github.com:paypal/paypal-checkout.git --tags;
npm publish;
