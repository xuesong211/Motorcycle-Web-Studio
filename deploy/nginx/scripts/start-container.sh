#!/usr/bin/env sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
app_dir=$(CDPATH= cd -- "$script_dir/../app" && pwd)

docker rm -f motorcycle-web-studio >/dev/null 2>&1 || true

docker run -d \
  --name motorcycle-web-studio \
  --restart=always \
  --network host \
  --volume "$app_dir:/app" \
  --workdir /app \
  --env NODE_ENV=production \
  node:22-bookworm-slim \
  sh -c 'if [ ! -d node_modules ]; then npm ci --omit=dev; fi; exec npx --no-install vinext start --hostname 127.0.0.1 --port 8787'
