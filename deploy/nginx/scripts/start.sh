#!/usr/bin/env sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$script_dir/../app"

if [ ! -d node_modules ]; then
  npm ci --omit=dev
fi

exec npx --no-install vinext start --hostname 127.0.0.1 --port "${PORT:-8787}"
