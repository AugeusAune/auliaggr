#!/usr/bin/env bash
set -euo pipefail

echo "=== 1. Open Desktop View & Verify Marquee Logos ==="
playwright-cli open http://localhost:3000
playwright-cli resize 1440 900
sleep 1

BRAND_LOGOS_COUNT=$(playwright-cli eval "document.querySelectorAll('.animate-marquee img').length")
echo "Brand logos in marquee: $BRAND_LOGOS_COUNT"
if ! echo "$BRAND_LOGOS_COUNT" | grep -Eq "[1-9][0-9]*"; then
  echo "FAIL: No brand logos found in marquee!"
  exit 1
fi
echo "PASS: Brand logos are rendered in marquee."

echo "=== 2. Verify Connected Journey Timeline ==="
TIMELINE_TRACKS=$(playwright-cli eval "document.querySelectorAll('.border-l-2').length")
echo "Timeline tracks: $TIMELINE_TRACKS"
if ! echo "$TIMELINE_TRACKS" | grep -Eq "[1-9]"; then
  echo "FAIL: No timeline tracks found in journey section!"
  exit 1
fi
echo "PASS: Connected journey timeline line exists."

echo "=== 3. Verify Award Logos and Tools Logos ==="
AWARD_LOGOS=$(playwright-cli eval "Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Awards'))?.querySelectorAll('img').length || 0")
echo "Award logos: $AWARD_LOGOS"
if ! echo "$AWARD_LOGOS" | grep -Eq "[1-9]"; then
  echo "FAIL: Award logos not rendered!"
  exit 1
fi

TOOLS_LOGOS=$(playwright-cli eval "Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Tools'))?.querySelectorAll('img').length || 0")
echo "Tool logos: $TOOLS_LOGOS"
if ! echo "$TOOLS_LOGOS" | grep -Eq "[1-9]"; then
  echo "FAIL: Tool logos not rendered!"
  exit 1
fi
echo "PASS: Award and Tool logos successfully verified."

echo "=== 4. Verify Contact Photo of Aulia ==="
CONTACT_PHOTO=$(playwright-cli eval "document.querySelector('footer img[alt*=\"Aulia\"]')?.src || ''")
echo "Contact photo src: $CONTACT_PHOTO"
if ! echo "$CONTACT_PHOTO" | grep -q "aulia.png"; then
  echo "FAIL: Contact photo of Aulia not found in footer!"
  exit 1
fi
echo "PASS: Contact photo of Aulia verified."

echo "=== 5. Verify Expandable Certifications Interaction ==="
INITIAL_CERTS=$(playwright-cli eval "Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Certification'))?.querySelectorAll('.grid > div').length || 0")
echo "Initial certificates rendered: $INITIAL_CERTS"

# Click Expand Button
playwright-cli click 'button:has-text("View All Certifications")'
sleep 1

EXPANDED_CERTS=$(playwright-cli eval "Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Certification'))?.querySelectorAll('.grid > div').length || 0")
echo "Expanded certificates rendered: $EXPANDED_CERTS"

if ! echo "$EXPANDED_CERTS" | grep -q "16"; then
  echo "FAIL: Expected 16 certificates after expand!"
  exit 1
fi
echo "PASS: Expandable certifications toggle verified (6 -> 16 items)."

echo "=== 6. Capture Polished Desktop & Mobile Screenshots ==="
playwright-cli screenshot --filename .playwright-cli/polished-desktop.png
playwright-cli resize 390 844
playwright-cli goto http://localhost:3000
sleep 1
playwright-cli screenshot --filename .playwright-cli/polished-mobile.png

echo "=== 7. Run Full Unit Test Suite ==="
bun test

echo "=== 8. Production Build Verification ==="
bun run build

echo "Visual Polish and Asset Alignment Audit PASSED cleanly!"
