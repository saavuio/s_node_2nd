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
echo "git clone git@gitlab.com:saavuio/s_bases/${S_BASE_NAME}_example.git"
echo "cp -a ./${S_BASE_NAME}_example/* ./"
echo "./${S_BASE_NAME}.sh yarn install"
echo "./scripts/dev.sh"
echo
echo "Then you should be able to run for example:"
echo "curl -XPOST http://0.0.0.0:34601/action/example-feature-v1/exampleAction -H 'Content-Type: application/json;charset=UTF-8' --data-binary '{\"userId\": 1, \"name\": \"test\"}'"
echo
echo "NOTE: the example repository is private. Ask for permission to access it."
