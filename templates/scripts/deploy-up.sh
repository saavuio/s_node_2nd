#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

ENVIRONMENT=$1
ENV_FILE=env-$ENVIRONMENT
ZEIT_TOKEN=$2
ZEIT_TEAM=$3
ZEIT_ENV=$(cat $ENV_FILE | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/ -e /g')

# NOTE: recent change in now-cli now requires the "--target production" to
# automatically follow the alias defined in now.json. So this isn't actually
# going to production.

./scripts/cbin/now \
  -t $ZEIT_TOKEN \
  $([ ! -z $ZEIT_TEAM ] && echo '-S $ZEIT_TEAM') \
  -e $ZEIT_ENV \
  -A now.$ENVIRONMENT.json \
  --target production \
  deploy
