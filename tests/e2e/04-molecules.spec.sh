#!/usr/bin/env bash
set -e

bun test tests/unit/molecules.test.ts
echo "Molecules verification passed."
