import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'

const targetDir = resolve(process.cwd(), 'public/images/framer')
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true })
}

console.log('Fetching Framer homepage HTML...')
const res = await fetch('https://auliaggr.framer.ai/')
const html = await res.text()

const matches = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|svg|webp))/g)]
const uniqueMap = new Map<string, string>()

for (const m of matches) {
  uniqueMap.set(m[1], m[0])
}

console.log(`Found ${uniqueMap.size} unique image assets from Framer.`)

for (const [filename, url] of uniqueMap.entries()) {
  const filePath = join(targetDir, filename)
  if (existsSync(filePath)) {
    continue
  }
  try {
    const assetRes = await fetch(url)
    if (!assetRes.ok) {
      console.warn(`Failed to fetch ${url}: ${assetRes.status}`)
      continue
    }
    const buffer = await assetRes.arrayBuffer()
    writeFileSync(filePath, Buffer.from(buffer))
    console.log(`Downloaded ${filename} (${buffer.byteLength} bytes)`)
  } catch (err) {
    console.error(`Error downloading ${url}:`, err)
  }
}

console.log('All Framer image assets downloaded successfully to public/images/framer/')
