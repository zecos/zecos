#!/bin/bash

yarn build
cd build
git init
git remote add origin git@github.com:zecos/zecos.github.io
git add . -A
git commit -m "website"
git push -f -u origin master