#!/usr/bin/env bash
set -e

# Test font family & background color
output=$(playwright-cli eval "window.getComputedStyle(document.body).fontFamily")
echo "Font family: $output"
if [[ "$output" == *"Manrope"* ]] || [[ "$output" == *"Inter"* ]]; then
  echo "Font loaded successfully: $output"
  exit 0
else
  echo "Error: Font did not contain expected Manrope/Inter"
  exit 1
fi
