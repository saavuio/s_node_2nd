#!/bin/bash
RUN_DIR=$(pwd)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd $(realpath $SCRIPT_DIR)
cd base

echo "install dependencies"
./yarn.sh install

echo
echo "compress node_modules"
tar cjf node_modules.tar.bz2 node_modules/

echo "upload to seperate github repo"
CACHE_DIR=node_modules_cache
CACHE_REPO=git@github.com:saavuio/s_node_2nd_cache.git
VERSION=v1

if [ -d $CACHE_DIR ]; then
  rm -rf $CACHE_DIR
fi

mkdir $CACHE_DIR
mv node_modules.tar.bz2 $CACHE_DIR

# UNCOMMENT TO PUSH TO GITHUB

if [ ! -z "$1" ]; then
  TARGET_BRANCH=main-repo-sha-$1
else
  TARGET_BRANCH=$VERSION
fi

cd $CACHE_DIR
git init
git remote add origin $CACHE_REPO
git checkout -b $TARGET_BRANCH
git add node_modules.tar.bz2
git commit -m "Latest."
git push -u -f origin $TARGET_BRANCH
