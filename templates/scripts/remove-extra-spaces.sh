#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd $SCRIPT_DIR
cd ..
cd src

# remove leading spaces
find . -type f -not -path "*static/*" -and -not -path "*assets/*" -print0 | xargs -0 perl -pi -e 's/ +$//'
# remove non-breaking spaces
find . -type f -not -path "*static/*" -and -not -path "*assets/*" -print0 | xargs -0 perl -pi -e 's/ / /g'

echo "removed extra spaces."
