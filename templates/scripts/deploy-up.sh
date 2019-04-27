#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

ENVIRONMENT=$1
ENV_FILE=env-$ENVIRONMENT
ZEIT_TOKEN=$2
ZEIT_TEAM=$3
ZEIT_ENV=$(cat $ENV_FILE | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/ -e /g') # previous $(cat env-$1 | sed -z 's/\n/ -e /g') PLACEHOLDER_VAR=test

./scripts/cbin/now \
  -t $ZEIT_TOKEN \
  $([ ! -z $ZEIT_TEAM ] && echo "-T $ZEIT_TEAM") \
  -e $ZEIT_ENV \
  -f \
  -A now.$ENVIRONMENT.json \
  deploy

./scripts/cbin/now \
  -t $ZEIT_TOKEN \
  $([ ! -z $ZEIT_TEAM ] && echo "-T $ZEIT_TEAM") \
  -A now.$ENVIRONMENT.json \
  alias
