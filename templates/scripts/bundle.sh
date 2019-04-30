#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

ENVIRONMENT=development
if [ ! -z $1 ]; then ENVIRONMENT=$1; fi
echo "Bundling for $ENVIRONMENT"

NODE_ENV=$ENVIRONMENT ./s_node_2nd.sh yarn run bundle
