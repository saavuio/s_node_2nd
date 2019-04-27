#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

ENVIRONMENT=production
if [ ! -z $1 ]; then ENVIRONMENT=$1; fi
echo "Bundling for $ENVIRONMENT"

if [ "$ENVIRONMENT" = "development" ]; then
  NODE_ENV=$ENVIRONMENT ./s_node_2nd.sh yarn run build
else
  NODE_ENV=$ENVIRONMENT ./s_node_2nd.sh yarn run build
fi
