import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'

// Copy Polish files to en/pl/ for VitePress locale support
const plDir = './pl'
const targetDir = './en/pl'

if (existsSync(plDir)) {
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true })
  }
  
  const files = readdirSync(plDir)
  files.forEach(file => {
    const srcPath = join(plDir, file)
    const destPath = join(targetDir, file)
    if (statSync(srcPath).isFile() && file.endsWith('.md')) {
      copyFileSync(srcPath, destPath)
      console.log(`Copied ${file} to en/pl/`)
    }
  })
  console.log('Polish files copied successfully!')
}

