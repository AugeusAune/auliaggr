#!/bin/bash
# Batch convert PNG/JPG images to WebP with quality and resize constraints.
# Requires: ImageMagick (convert) or cwebp
# Usage: bash scripts/optimize-images.sh

set -euo pipefail

IMG_DIR="public/images/framer"
MAX_WIDTH=1920
QUALITY=80

echo "=== Image Optimization ==="
echo "Source: $IMG_DIR"
echo "Max width: ${MAX_WIDTH}px, Quality: ${QUALITY}%"
echo ""

converted=0
skipped=0
total_before=0
total_after=0

find "$IMG_DIR" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | sort | while read -r file; do
  ext="${file##*.}"
  base="${file%.*}"
  webp_file="${base}.webp"

  # Skip tiny files (<10KB) — logos, icons
  file_size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
  if [ "$file_size" -lt 10240 ]; then
    echo "SKIP (tiny): $(basename "$file") ($(numfmt --to=iec "$file_size"))"
    skipped=$((skipped + 1))
    continue
  fi

  total_before=$((total_before + file_size))

  echo -n "Converting: $(basename "$file") ($(numfmt --to=iec "$file_size")) → "

  # Use ImageMagick convert to resize + convert to WebP
  convert "$file" -resize "${MAX_WIDTH}x${MAX_WIDTH}>" -quality "$QUALITY" "$webp_file"

  webp_size=$(stat -c%s "$webp_file" 2>/dev/null || stat -f%z "$webp_file" 2>/dev/null)
  total_after=$((total_after + webp_size))

  echo "$(basename "$webp_file") ($(numfmt --to=iec "$webp_size"))"

  # Remove original after successful conversion
  rm "$file"
  converted=$((converted + 1))
done

echo ""
echo "=== Results ==="
echo "Converted: $converted files"
echo "Skipped: $skipped files"
if [ "$total_before" -gt 0 ]; then
  echo "Before: $(numfmt --to=iec "$total_before")"
  echo "After:  $(numfmt --to=iec "$total_after")"
  savings=$(( (total_before - total_after) * 100 / total_before ))
  echo "Saved:  ${savings}%"
fi
