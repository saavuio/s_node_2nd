#!/bin/bash
set -e

if [ -z $S_BASE_NAME ]; then echo "S_BASE_NAME not provided"; exit 1; fi
if [ -z $S_BASE_VERSION ]; then echo "S_BASE_VERSION not provided"; exit 1; fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

echo
echo
echo "-------------------------------------------------------------------------------------------------------"
echo "-------------------------------------------------------------------------------------------------------"
echo "NOTE: this might take a while and pause for long periods without any output while downloading packages."
echo "-------------------------------------------------------------------------------------------------------"
echo "-------------------------------------------------------------------------------------------------------"
echo
echo

# The reason for this complexity is that we want the container to be running
# with the exact same user id than the host. That way, when stuff gets created
# inside the container, the host user will own them.
docker build -t saavu-local/${S_BASE_NAME}_${S_BASE_VERSION} \
  --build-arg s_base_name=${S_BASE_NAME} \
  --build-arg container_user_id=$(id -u) \
  .
