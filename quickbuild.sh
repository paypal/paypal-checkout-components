#!/bin/bash

npm run webpack-base &&
rsync -avz dist/* root@bluesuncorp.co.uk:/var/www/html/icv4/dist/ &&
git checkout dist
