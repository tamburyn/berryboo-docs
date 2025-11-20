import { build } from 'vitepress'
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'

// Build English site
console.log('Building English site...')
await build({
  root: '.',
  outDir: './dist',
  srcDir: './en'
})

// Copy Polish content to dist/pl
console.log('Copying Polish content...')
const plDir = './pl'
const distPlDir = './dist/pl'

if (existsSync(plDir)) {
  if (!existsSync(distPlDir)) {
    mkdirSync(distPlDir, { recursive: true })
  }
  
  const files = readdirSync(plDir)
  files.forEach(file => {
    const srcPath = join(plDir, file)
    const destPath = join(distPlDir, file)
    if (statSync(srcPath).isFile() && file.endsWith('.md')) {
      copyFileSync(srcPath, destPath)
      console.log(`Copied ${file} to dist/pl/`)
    }
  })
}

console.log('Build complete!')

