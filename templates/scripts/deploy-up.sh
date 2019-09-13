#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

ENVIRONMENT=$1
ZEIT_TOKEN=$2
ZEIT_TEAM=$3

# NOTE:
# Now v2 is having problems with typescript "paths" (see: https://github.com/zeit/now/issues/2832)
# Converting each "@" to relative path.
rm -rf src-to-deploy
cp -a src/ src-to-deploy/

A_FROM=" from '@/"
find ./src-to-deploy -type f | while read LINE; do
  RELDIR=$(realpath --relative-to=$(dirname $LINE) src-to-deploy)/
  B_FROM=" from '$RELDIR"
  sed -i'' "s!$A_FROM!$B_FROM!g" $LINE
done

# NOTE: recent change in now-cli now requires the "--target production" to
# automatically follow the alias defined in now.json. So this isn't actually
# going to production.
./scripts/cbin/now \
  -t $ZEIT_TOKEN \
  $([ ! -z $ZEIT_TEAM ] && echo "-S $ZEIT_TEAM") \
  -A now.$ENVIRONMENT.json \
  --target production \
  deploy
