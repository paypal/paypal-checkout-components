#!/bin/bash

cp -r ~/nfra/sync-browser-mocks/src/* node_modules/sync-browser-mocks/src/ &&
cp -r ~/nfra/post-robot/src/* node_modules/post-robot/src/ &&
cp -r ~/nfra/xcomponent/src/* node_modules/xcomponent/src/ &&
cp -r ~/nfra/beaver-logger/client/* node_modules/beaver-logger/client/ &&
gulp webpack && 
scp -r {dist,demo,live_demo} xotools:public_html/icv4
scp -r {dist,demo,live_demo} root@bluesuncorp.co.uk:/var/www/html/icv4
