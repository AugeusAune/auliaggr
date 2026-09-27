#!/usr/bin/env bash
set -e

playwright-cli open http://localhost:3000
title=$(playwright-cli eval "document.title")
echo "Home title: $title"

playwright-cli goto http://localhost:3000/projects
res1=$(playwright-cli find "My work")
echo "$res1"
if [[ "$res1" == *"No matches"* ]]; then
  echo "Error: 'My work' not found on /projects"
  playwright-cli close
  exit 1
fi

playwright-cli goto http://localhost:3000/projects/rorojonggrang
res2=$(playwright-cli find "Kisah Roro Jonggrang")
echo "$res2"
if [[ "$res2" == *"No matches"* ]]; then
  echo "Error: 'Kisah Roro Jonggrang' not found on /projects/rorojonggrang"
  playwright-cli close
  exit 1
fi

res3=$(playwright-cli find "IPB University")
echo "$res3"
if [[ "$res3" == *"No matches"* ]]; then
  echo "Error: 'IPB University' not found on /projects/rorojonggrang"
  playwright-cli close
  exit 1
fi

playwright-cli close
echo "All routes and SEO tags verified successfully."
