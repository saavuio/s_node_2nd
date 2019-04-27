#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR

# The reason for this complexity is that we want the container to be running
# with the exact same user id than the host. That way, when stuff gets created
# inside the container, the host user will own them.
docker build -t saavu-local/now --build-arg container_user_id=$(id -u) -f now-dockerfile .
touch .docker-build-done
