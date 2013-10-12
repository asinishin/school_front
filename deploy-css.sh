#!/usr/bin/env bash

cd src/$1
cp css/*.css ../../css
cd ../../css
node ../r.js -o css.build.js
