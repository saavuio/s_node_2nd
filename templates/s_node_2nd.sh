#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR

NAME=s_node_2nd
VERSION=v3

if [ ! -d ./s_base/${NAME} ]; then
  mkdir -p s_base/${NAME}
  curl -Lso ./s_base/${NAME}/init.sh https://github.com/saavuio/${NAME}/raw/${VERSION}/init.sh
  chmod +x ./s_base/${NAME}/init.sh
fi

# NOTE: this file will get a local copy in the target project. Change the
# following line to automatically trigger updates to a specific target SHA for
# all users if the base has been updated. Use the 7 digit short format for the
# git SHA.
GIT_SHA_SHOULD_BE="LATEST"
GIT_SHA_IS=$(cd s_base/$NAME && git log --pretty=format:'%h' -n 1)

if [ "$GIT_SHA_SHOULD_BE" != "LATEST" ]; then
  if [ "$GIT_SHA_IS" != "$GIT_SHA_SHOULD_BE" ]; then
    echo "Base updated. Running ./s_base/${NAME}/init.sh"
    echo "..."
    sleep 3
    ./s_base/${NAME}/init.sh $GIT_SHA_SHOULD_BE
  fi
fi

S_BASE_NAME=$NAME S_BASE_VERSION=$VERSION \
  ./s_base/${NAME}/scripts/base_run.sh ${@:1}
