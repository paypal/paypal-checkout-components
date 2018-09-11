#!/bin/bash

cp -r ~/nfra/sync-browser-mocks/src/* node_modules/sync-browser-mocks/src/ &&
cp -r ~/nfra/post-robot/src/* node_modules/post-robot/src/ &&
cp -r ~/nfra/zoid/src/* node_modules/zoid/src/ &&
cp -r ~/nfra/beaver-logger/src/* node_modules/beaver-logger/src/ &&
cp -r ~/nfra/cross-domain-utils/src/* node_modules/cross-domain-utils/src/ &&
cp -r ~/nfra/belter/src/* node_modules/belter/src/ &&
cp -r ~/nfra/zalgo-promise/src/* node_modules/zalgo-promise/src/ &&
cp -r ~/paypal-braintree-web-client/src/* node_modules/paypal-braintree-web-client/src/ &&
npm run webpack-base &&
rsync -avz dist/* root@bluesuncorp.co.uk:/var/www/html/icv4/dist/ &&
git checkout dist
