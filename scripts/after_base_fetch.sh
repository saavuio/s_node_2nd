#!/bin/bash
if [ -z $PROJECT_ROOT_PATH ]; then echo "PROJECT_ROOT_PATH not provided"; exit 1; fi
if [ -z $S_BASE_NAME ]; then echo "S_BASE_NAME not provided"; exit 1; fi

# required folders and files
mkdir ${PROJECT_ROOT_PATH}/src 2> /dev/null
mkdir ${PROJECT_ROOT_PATH}/dist 2> /dev/null
mkdir ${PROJECT_ROOT_PATH}/.webpack-cache 2> /dev/null

# link to self
if [ ! -f ${PROJECT_ROOT_PATH}/${S_BASE_NAME}.sh ]; then
  cp ./${S_BASE_NAME}/templates/${S_BASE_NAME}.sh ${PROJECT_ROOT_PATH}
fi

DATE=`date '+%Y-%m-%d_%H%M%S'`
STASH_DIR=_stash_${DATE}
mkdir $STASH_DIR

# scripts
if [ ! -d ${PROJECT_ROOT_PATH}/scripts ]; then
  cp -a ./${S_BASE_NAME}/templates/scripts ${PROJECT_ROOT_PATH}/scripts
fi

# .gitignore skel
if [ ! -f ${PROJECT_ROOT_PATH}/.gitignore ]; then
  cp ./${S_BASE_NAME}/templates/gitignore ${PROJECT_ROOT_PATH}/.gitignore
fi

# .nowignore skel
if [ ! -f ${PROJECT_ROOT_PATH}/.nowignore ]; then
  cp ./${S_BASE_NAME}/templates/nowignore ${PROJECT_ROOT_PATH}/.nowignore
fi

# now.staging.json skel
if [ ! -f ${PROJECT_ROOT_PATH}/now.staging.json ]; then
  cp ./${S_BASE_NAME}/templates/now.staging.json ${PROJECT_ROOT_PATH}/now.staging.json
fi

# env-development skel
if [ ! -f ${PROJECT_ROOT_PATH}/env-development ]; then
  cp ./${S_BASE_NAME}/templates/env-development ${PROJECT_ROOT_PATH}/env-development
fi
# package_app.json skel
if [ ! -f ${PROJECT_ROOT_PATH}/package_app.json ]; then
  echo "{}" > ${PROJECT_ROOT_PATH}/package_app.json
fi
