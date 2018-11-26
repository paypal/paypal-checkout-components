#!/bin/sh

# Running `npm version` will run through the other version lifecycle scripts
npm version ${1-patch};
