#!/bin/bash

# Set up ci server with dependencies
sudo apt-get update
sudo apt-get --assume-yes install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# Set up NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
. $NVM_DIR/nvm.sh

# Set up Node
nvm install 8
nvm use 8

# Install node modules
if [[ $CLEAR_NODE_MODULES == 'true' ]]; then
  rm -rf node_modules
fi
npm install

# Run end to end tests
npm run jest-e2e
