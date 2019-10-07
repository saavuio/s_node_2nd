#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

set -e

# remove extra spaces
./scripts/remove-extra-spaces.sh

# check for lint errors
./s_node_2nd.sh yarn run lint-code

# check for build or type errors
./s_node_2nd.sh yarn run lint-type
