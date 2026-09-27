#!/usr/bin/env bash
set -e

echo "=== Running Full Audit with Playwright CLI ==="

# 1. Desktop Audit (1280x800)
playwright-cli open http://localhost:3000
playwright-cli resize 1280 800
playwright-cli snapshot

# Check key portfolio sections on home page
playwright-cli find "Good design is invisible"
playwright-cli find "Proudly worked with"
playwright-cli find "My journey through design"
playwright-cli find "Awards"
playwright-cli find "My work"
playwright-cli find "Tools"
playwright-cli find "Certification"

# 2. Test Contact Form Interactive State
playwright-cli fill "input[name='name']" "John Doe"
playwright-cli fill "input[name='email']" "john@example.com"
playwright-cli fill "textarea[name='message']" "Looking forward to collaborating on our upcoming UI/UX project!"
playwright-cli click "button[type='submit']"
sleep 1
playwright-cli find "Thank you for reaching out!"

# 3. Projects Page Audit
playwright-cli goto http://localhost:3000/projects
playwright-cli snapshot
playwright-cli find "My work"
playwright-cli find "All"

# 4. Detail Page Audit
playwright-cli goto http://localhost:3000/projects/rorojonggrang
playwright-cli snapshot
playwright-cli find "Kisah Roro Jonggrang"
playwright-cli find "IPB University"
playwright-cli find "Augmented Reality"

# 5. Mobile Responsiveness Audit (390x844)
playwright-cli resize 390 844
playwright-cli snapshot
playwright-cli goto http://localhost:3000
playwright-cli snapshot

playwright-cli close

# 6. Run all unit suites
bun test

echo "=== Full Audit Completed Successfully ==="
