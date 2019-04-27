#!/bin/bash
set -e

if [ -z $S_BASE_NAME ]; then echo "S_BASE_NAME not provided"; exit 1; fi
if [ -z $PROJECT_ROOT_PATH ]; then echo "PROJECT_ROOT_PATH not provided"; exit 1; fi

# remove previous build if exists
rm -rf $PROJECT_ROOT_PATH/node_modules*
rm -f $PROJECT_ROOT_PATH/.ejected

$PROJECT_ROOT_PATH/scripts/build.sh

echo
echo "To start with an example base, run:"
echo "cp -a ./s_base/${S_BASE_NAME}/example/src/* ./src"
echo "./${S_BASE_NAME}.sh yarn add axios"
echo
