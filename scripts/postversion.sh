#/bin/sh

# Publish and push!
git push;
git push --tags;
git push git@github.com:paypal/paypal-checkout.git master;
npm publish;
