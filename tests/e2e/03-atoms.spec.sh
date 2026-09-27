#!/usr/bin/env bash
set -e

bun test tests/unit/atoms.test.ts
echo "Atoms verification passed."
