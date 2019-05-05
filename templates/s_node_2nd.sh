#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR

NAME=s_node_2nd
VERSION=v1

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
