#!/usr/bin/env bash
set -e

bun test tests/unit/organisms.test.ts
echo "Organisms and Layout verification passed."
