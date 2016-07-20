#!/bin/bash

cp -r ~/nfra/sync-browser-mocks/src/* node_modules/sync-browser-mocks/src/ &&
cp -r ~/nfra/post-robot/src/* node_modules/post-robot/src/ &&
cp -r ~/nfra/xcomponent/src/* node_modules/xcomponent/src/ &&
gulp webpack && 
scp -r {dist,demo} xotools:public_html/icv4
