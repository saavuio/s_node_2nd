#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..

./scripts/shared.sh import s_node_2nd-shared-scripts

cp -a ./src/shared/s_node_2nd-shared-scripts/* ./scripts
rm -r ./src/shared/s_node_2nd-shared-scripts
