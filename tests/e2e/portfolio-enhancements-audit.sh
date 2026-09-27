#!/usr/bin/env bash
set -euo pipefail

echo "=== 1. Verify Back-to-Top Interaction in Playwright CLI ==="
playwright-cli open http://localhost:3000
playwright-cli resize 1440 900
# Scroll down
playwright-cli eval "window.scrollTo(0, 1500)"
sleep 1
# Click Back to Top button
playwright-cli click 'button:has-text("Back to top")'
sleep 2
# Check scrollY
SCROLL_Y=$(playwright-cli eval "window.scrollY")
echo "Scroll position after click: $SCROLL_Y"

echo "=== 2. Verify Primary Button Computed Color ==="
BTN_OUTPUT=$(playwright-cli eval "window.getComputedStyle(document.querySelector('button[type=\"submit\"]')).color")
echo "$BTN_OUTPUT"
if ! echo "$BTN_OUTPUT" | grep -q "255, 255, 255"; then
  echo "FAIL: Button text is not white!"
  exit 1
fi
echo "PASS: Button text is white (rgb(255, 255, 255))."

echo "=== 3. Verify No Percentage in Tools Section ==="
TOOLS_TEXT=$(playwright-cli eval "Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Tools'))?.closest('section')?.textContent || ''")
echo "$TOOLS_TEXT"
if echo "$TOOLS_TEXT" | grep -q "%"; then
  echo "FAIL: Percentage found in tools section!"
  exit 1
fi
echo "PASS: No percentages in skills section."

echo "=== 4. Capture Desktop & Mobile Screenshots ==="
playwright-cli screenshot --filename .playwright-cli/great-portfolio-desktop.png
playwright-cli resize 390 844
playwright-cli goto http://localhost:3000
playwright-cli screenshot --filename .playwright-cli/great-portfolio-mobile.png

echo "=== 5. Run All Unit Tests ==="
bun test

echo "=== 6. Production Build Verification ==="
bun run build

echo "Portfolio enhancements audit complete."
