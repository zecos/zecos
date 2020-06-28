#!/bin/bash

# note, this is a work in progress

cd app
yarn
cd ../docs
yarn
cd ../input
yarn
yarn link
cd ../input-basic
yarn
yarn link
cd ../input-mui
yarn
yarn link
cd ../app
yarn link @zecos/input
yarn link @zecos/input-basic
yarn link @zecos/input-mui