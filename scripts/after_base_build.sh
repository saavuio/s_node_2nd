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
echo "git clone https://github.com/saavuio/${S_BASE_NAME}_example.git ./"
echo "cp -a ./${S_BASE_NAME}_example/* ./"
echo "./${S_BASE_NAME}.sh yarn install"
echo
echo "NOTE: the example repository is private. Ask for permission to access it."
