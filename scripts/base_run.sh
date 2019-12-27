#!/bin/bash
if [ -z $S_BASE_NAME ]; then echo "S_BASE_NAME not provided"; exit 1; fi
if [ -z $S_BASE_VERSION ]; then echo "S_BASE_VERSION not provided"; exit 1; fi

RUN_DIR=$(pwd)
cd $RUN_DIR

IMAGE=saavu-local/${S_BASE_NAME}_${S_BASE_VERSION}

if [ ! -z $CONTAINER_NAME ]; then
  DOCKER_PARAM_NAME=--name=$CONTAINER_NAME
fi

if [ ! -z $PTO ]; then
  PORT_TO_OPEN=$PTO
fi

if [ ! -z $NET_NAME ]; then
 docker network create $NET_NAME 2> /dev/null
 DOCKER_PARAM_NET=--net=$NET_NAME
fi

if [ ! -f $RUN_DIR/package_app.json ]; then
  echo "No package_app.json found."
  exit 1
fi

dockerstop() {
  if [ ! -z $CONTAINER_NAME ]; then
    docker stop -t 0 $(docker ps | grep $CONTAINER_NAME | cut -d' ' -f1) > /dev/null 2>&1
  fi
}
if [ -z $RUN_IN_BG ]; then
  trap 'dockerstop' SIGINT SIGTERM EXIT
fi

# Create placeholders for folders that should exist so that
# permissions will be correct when they are mounted to the
# container.
mkdir -p $RUN_DIR/dist
mkdir -p $RUN_DIR/node_modules_app/saavu-cbin-placeholder

ARGS=${@:1}
TWO="$1 $2"
if [ "$TWO" = "yarn add" -o "$TWO" = "yarn install" ]; then
  # working with local packages (installing deps)
  WORKDIR="/ext";
  CMD="$ARGS"
else
  # working with packages already in the container
  WORKDIR="/${S_BASE_NAME}";
  CMD="/entry.sh $ARGS"
fi

docker run \
  -u $UID:$(id -g $USER) \
  -e NODE_ENV=$NODE_ENV \
  $([ -z $RUN_IN_BG ] && echo '--rm' || echo '-d') \
  $([ ! -z $NO_TTY ] && echo '' || echo '-it') \
  $DOCKER_PARAM_NAME \
  $DOCKER_PARAM_NET \
  $([ ! -z $PORT_TO_OPEN ] && echo "-p $PORT_TO_OPEN:$PORT_TO_OPEN") \
  $([ -d $RUN_DIR/src ] && echo "--volume $RUN_DIR/src:/${S_BASE_NAME}/src") \
  $([ -d $RUN_DIR/dist ] && echo "--volume $RUN_DIR/dist:/${S_BASE_NAME}/dist") \
  $([ -d $RUN_DIR/public ] && echo "--volume $RUN_DIR/public:/${S_BASE_NAME}/public") \
  $([ -f $RUN_DIR/package_app.json ] && echo "--volume $RUN_DIR/package_app.json:/ext/package.json") \
  $([ -d $RUN_DIR/.webpack-cache ] && echo "--volume $RUN_DIR/.webpack-cache:/${S_BASE_NAME}/.webpack-cache") \
  $([ -d $RUN_DIR/node_modules_app ] && echo "--volume $RUN_DIR/node_modules_app:/ext/node_modules") \
  $([ -f $RUN_DIR/env-development ] && echo "--volume $RUN_DIR/env-development:/${S_BASE_NAME}/env-development") \
  $([ -f $RUN_DIR/jest.config.js ] && echo "--volume $RUN_DIR/jest.config.js:/${S_BASE_NAME}/jest.config.js") \
  $([ -f $RUN_DIR/now.json ] && echo "--volume $RUN_DIR/now.json:/${S_BASE_NAME}/now.json") \
  $([ -f $RUN_DIR/.gitignore ] && echo "--volume $RUN_DIR/.gitignore:/${S_BASE_NAME}/.gitignore") \
  $([ -f $RUN_DIR/.npmignore ] && echo "--volume $RUN_DIR/.npmignore:/${S_BASE_NAME}/.npmignore") \
  $([ -f $RUN_DIR/.eslintignore ] && echo "--volume $RUN_DIR/.eslintignore:/${S_BASE_NAME}/.eslintignore") \
  --workdir $WORKDIR \
  --entrypoint sh \
  $IMAGE \
  -c "$CMD"
