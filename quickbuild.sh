#!/bin/bash

cp -r ~/nfra/sync-browser-mocks/src/* node_modules/sync-browser-mocks/src/ &&
cp -r ~/nfra/post-robot/src/* node_modules/post-robot/src/ &&
cp -r ~/nfra/xcomponent/src/* node_modules/xcomponent/src/ &&
cp -r ~/nfra/beaver-logger/client/* node_modules/beaver-logger/client/ &&
cp -r ~/nfra/cross-domain-utils/src/* node_modules/cross-domain-utils/src/ &&
cp -r ~/nfra/zalgo-promise/src/* node_modules/zalgo-promise/src/ &&
npm run webpack-base &&
rsync -avz dist/* root@bluesuncorp.co.uk:/var/www/html/icv4/dist/ &&
git checkout dist
