#!/bin/bash
if [ -z $PROJECT_ROOT_PATH ]; then echo "PROJECT_ROOT_PATH not provided"; exit 1; fi
if [ -z $S_BASE_NAME ]; then echo "S_BASE_NAME not provided"; exit 1; fi

# required folders and files
mkdir ${PROJECT_ROOT_PATH}/src 2> /dev/null
mkdir ${PROJECT_ROOT_PATH}/dist 2> /dev/null
mkdir ${PROJECT_ROOT_PATH}/.webpack-cache 2> /dev/null

# link to self
cp ./${S_BASE_NAME}/templates/${S_BASE_NAME}.sh ${PROJECT_ROOT_PATH}

DATE=`date '+%Y-%m-%d_%H%M%S'`
STASH_DIR=_stash_${DATE}
mkdir $STASH_DIR

# scripts
mv ${PROJECT_ROOT_PATH}/scripts $STASH_DIR 2> /dev/null
cp -a ./${S_BASE_NAME}/templates/scripts ${PROJECT_ROOT_PATH}/scripts

# .gitignore skel
mv ${PROJECT_ROOT_PATH}/.gitignore $STASH_DIR 2> /dev/null
cp ./${S_BASE_NAME}/templates/gitignore ${PROJECT_ROOT_PATH}/.gitignore

# .nowignore skel
mv ${PROJECT_ROOT_PATH}/.nowignore $STASH_DIR 2> /dev/null
cp ./${S_BASE_NAME}/templates/nowignore ${PROJECT_ROOT_PATH}/.nowignore

# env-development skel
if [ ! -f ${PROJECT_ROOT_PATH}/env-development ]; then
  cp ./${S_BASE_NAME}/templates/env-development ${PROJECT_ROOT_PATH}/env-development
fi
# package_app.json skel
if [ ! -f ${PROJECT_ROOT_PATH}/package_app.json ]; then
  echo "{}" > ${PROJECT_ROOT_PATH}/package_app.json
fi
