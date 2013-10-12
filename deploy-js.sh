#!/usr/bin/env bash

cd src/$1
cd js
node ../../../r.js -o build.js optimize=none
