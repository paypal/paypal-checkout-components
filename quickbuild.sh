#!/bin/bash

cp -r ~/nfra/@krakenjs/sync-browser-mocks/src/* node_modules/@krakenjs/sync-browser-mocks/src/ \
  && cp -r ~/nfra/@krakenjs/post-robot/src/* node_modules/@krakenjs/post-robot/src/ \
  && cp -r ~/nfra/@krakenjs/zoid/src/* node_modules/@krakenjs/zoid/src/ \
  && cp -r ~/nfra/beaver-logger/src/* node_modules/beaver-logger/src/ \
  && cp -r ~/nfra/@krakenjs/cross-domain-utils/src/* node_modules/@krakenjs/cross-domain-utils/src/ \
  && cp -r ~/nfra/@krakenjs/belter/src/* node_modules/@krakenjs/belter/src/ \
  && cp -r ~/nfra/@krakenjs/zalgo-promise/src/* node_modules/@krakenjs/zalgo-promise/src/ \
  && cp -r ~/paypal-braintree-web-client/src/* node_modules/paypal-braintree-web-client/src/ \
  && npm run webpack-base \
  && rsync -avz dist/* root@bluesuncorp.co.uk:/var/www/html/icv4/dist/ \
  && git checkout dist
