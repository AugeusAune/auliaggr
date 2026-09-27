#!/usr/bin/env bash
set -euo pipefail

echo "=== 1. Checking DOM for removed footer attribution ==="
CONTENT=$(curl -s http://localhost:3000)
if echo "$CONTENT" | grep -q "Crafted with Nuxt 4 & Atomic Design"; then
  echo "FAIL: 'Crafted with Nuxt 4 & Atomic Design' is still present in DOM!"
  exit 1
fi
echo "PASS: Footer attribution removed from SSR output."

echo "=== 2. Playwright CLI Visual Inspection ==="
playwright-cli open http://localhost:3000
playwright-cli resize 1440 900
playwright-cli snapshot
playwright-cli screenshot --filename .playwright-cli/coral-theme-desktop.png

echo "=== 3. Verify Projects Page and Active Filter Theme ==="
playwright-cli goto http://localhost:3000/projects
playwright-cli snapshot
playwright-cli screenshot --filename .playwright-cli/coral-theme-projects.png

echo "=== 4. Playwright CLI Mobile Inspection ==="
playwright-cli resize 390 844
playwright-cli goto http://localhost:3000
playwright-cli screenshot --filename .playwright-cli/coral-theme-mobile.png

echo "=== 5. Run All Unit Tests ==="
bun test

echo "Theme audit complete."
