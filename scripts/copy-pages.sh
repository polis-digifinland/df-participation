#!/bin/bash

# chmod +x ./scripts/copy-pages.sh
# Usage: ./scripts/copy-pages.sh

BASE_PATH="src/app/[id]"
BASE_THEME="$BASE_PATH/df/page.tsx"

cp $BASE_THEME $BASE_PATH/aqua/page.tsx
cp $BASE_THEME $BASE_PATH/basic/page.tsx
cp $BASE_THEME $BASE_PATH/cappuccino/page.tsx
cp $BASE_THEME $BASE_PATH/dark/page.tsx

