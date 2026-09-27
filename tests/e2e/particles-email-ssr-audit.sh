#!/usr/bin/env bash
set -euo pipefail

echo "======================================================="
echo "  1. Test Nitro Server API (/api/contact) with curl    "
echo "======================================================="

# Valid POST request
RESPONSE_VALID=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Farhan","email":"farhan@example.com","message":"Hello from automated audit!"}')

echo "API Response (Valid): $RESPONSE_VALID"
if ! echo "$RESPONSE_VALID" | grep -Eq '"success":\s*true'; then
  echo "FAIL: Expected success:true from /api/contact"
  exit 1
fi
echo "PASS: /api/contact valid payload accepted."

# Invalid email POST request
HTTP_STATUS_INVALID=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Farhan","email":"invalid-email","message":"Hello"}')

echo "API HTTP Status (Invalid Email): $HTTP_STATUS_INVALID"
if [ "$HTTP_STATUS_INVALID" != "400" ]; then
  echo "FAIL: Expected HTTP 400 for invalid email, got $HTTP_STATUS_INVALID"
  exit 1
fi
echo "PASS: /api/contact invalid email rejected with HTTP 400."

echo "======================================================="
echo "  2. Test Particle Canvas in Browser                   "
echo "======================================================="
playwright-cli open http://localhost:3000
playwright-cli resize 1440 900
sleep 2

CANVAS_EXISTS=$(playwright-cli eval --raw "document.querySelector('header canvas') !== null")
echo "Canvas exists in header: $CANVAS_EXISTS"
if [ "$CANVAS_EXISTS" != "true" ]; then
  echo "FAIL: Particle canvas not found in hero header!"
  exit 1
fi
echo "PASS: Particle canvas successfully rendered inside header."

# Capture hero particles screenshot
playwright-cli screenshot --filename .playwright-cli/particles-hero-desktop.png

echo "======================================================="
echo "  3. Test Contact Form Client Integration              "
echo "======================================================="
# Fill form inputs
playwright-cli fill 'input#name' 'Farhan QA'
playwright-cli fill 'input#email' 'farhan.qa@example.com'
playwright-cli fill 'textarea#message' 'Testing client form submission to Nitro backend.'
playwright-cli click 'button[type="submit"]:has-text("Send message")'
sleep 2

SUCCESS_VISIBLE=$(playwright-cli eval --raw "document.body.innerText.includes('Thank you for reaching out!')")
echo "Contact form submission success: $SUCCESS_VISIBLE"
if [ "$SUCCESS_VISIBLE" != "true" ]; then
  echo "FAIL: Success message did not appear after submitting contact form!"
  exit 1
fi
echo "PASS: Contact form successfully submitted and displayed confirmation."

echo "======================================================="
echo "  4. Test Certificate Modal & Navigation (< and >)     "
echo "======================================================="
# Click first certificate item
playwright-cli click '[role="button"]:has-text("Verified") >> nth=0'
sleep 1

MODAL_VISIBLE=$(playwright-cli eval --raw "document.querySelector('[role=\"dialog\"]') !== null")
echo "Modal visible: $MODAL_VISIBLE"
if [ "$MODAL_VISIBLE" != "true" ]; then
  echo "FAIL: Certificate modal did not open on click!"
  exit 1
fi

INITIAL_INDEX=$(playwright-cli eval --raw "document.querySelector('[role=\"dialog\"] span.font-mono')?.textContent?.trim()")
echo "Initial modal index: $INITIAL_INDEX"
if ! echo "$INITIAL_INDEX" | grep -q "1 /"; then
  echo "FAIL: Expected initial certificate index to be 1 / 16!"
  exit 1
fi

# Screenshot open modal
playwright-cli screenshot --filename .playwright-cli/certificate-modal-desktop.png

# Click next button (>)
playwright-cli click '.next-button'
sleep 1
NEXT_INDEX=$(playwright-cli eval --raw "document.querySelector('[role=\"dialog\"] span.font-mono')?.textContent?.trim()")
echo "Index after next button: $NEXT_INDEX"
if ! echo "$NEXT_INDEX" | grep -q "2 /"; then
  echo "FAIL: Expected index 2 / 16 after clicking next button!"
  exit 1
fi
echo "PASS: Next button (>) navigated to next certificate."

# Click prev button (<)
playwright-cli click '.prev-button'
sleep 1
PREV_INDEX=$(playwright-cli eval --raw "document.querySelector('[role=\"dialog\"] span.font-mono')?.textContent?.trim()")
echo "Index after prev button: $PREV_INDEX"
if ! echo "$PREV_INDEX" | grep -q "1 /"; then
  echo "FAIL: Expected index 1 / 16 after clicking prev button!"
  exit 1
fi
echo "PASS: Prev button (<) navigated to previous certificate."

# Close modal via Escape key
playwright-cli press Escape
sleep 1
MODAL_CLOSED=$(playwright-cli eval --raw "document.querySelector('[role=\"dialog\"]') === null")
echo "Modal closed via Escape: $MODAL_CLOSED"
if [ "$MODAL_CLOSED" != "true" ]; then
  echo "FAIL: Modal did not close on Escape key!"
  exit 1
fi
echo "PASS: Certificate modal successfully navigated and closed via Escape."

echo "======================================================="
echo "  5. Run Full Unit Test Suite                          "
echo "======================================================="
bun test

echo "======================================================="
echo "  6. Production SSR Build Verification                 "
echo "======================================================="
bun run build

echo "======================================================="
echo "  ALL VERIFICATIONS PASSED CLEANLY!                    "
echo "======================================================="
