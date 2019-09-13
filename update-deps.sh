#!/bin/bash
RUN_DIR=$(pwd)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd $(realpath $SCRIPT_DIR)
cd base

CACHE_DIR=node_modules_cache

if [ -z "$SKIP_BUILD" ]; then
  echo "install dependencies"
  ./yarn.sh install

  echo
  echo "compress node_modules"
  tar cjf node_modules.tar.bz2 node_modules/

  if [ -d $CACHE_DIR ]; then
    rm -rf $CACHE_DIR
  fi

  mkdir $CACHE_DIR
  mv node_modules.tar.bz2 $CACHE_DIR
fi

if [ ! -z "$PUSH_TO_REMOTE" ]; then
  echo "upload to seperate github repo"
  CACHE_REPO=git@github.com:saavuio/s_nuxt_2nd_cache.git
  VERSION=v1

  if [ ! -z "$1" ]; then
    TARGET_BRANCH=main-repo-sha-$1
  else
    TARGET_BRANCH=$VERSION
  fi

  rm -rf $CACHE_DIR/.git
  cd $CACHE_DIR
  git init
  git remote add origin $CACHE_REPO
  git checkout -b $TARGET_BRANCH
  git add node_modules.tar.bz2
  git commit -m "Latest."
  git push -u -f origin $TARGET_BRANCH
fi
