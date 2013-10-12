#!/usr/bin/env bash

cd src/$1
cd test
node ../../../r.js -o build.js optimize=none
