# Deployment Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Test locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## GitHub Pages Deployment

The site is automatically deployed via GitHub Actions when you push to the `main` branch.

### Manual Deployment Steps

1. Ensure GitHub Pages is enabled in repository settings
2. Set source to "GitHub Actions" (not "Deploy from a branch")
3. Push changes to `main` branch
4. GitHub Actions will automatically build and deploy
5. Site will be available at: `https://[username].github.io/berryboo-docs/`

### Configuration

- **Base Path**: Set in `.vitepress/config.ts` - currently `/berryboo-docs/`
- **Output Directory**: `./dist` (relative to project root)
- **Source Directory**: `./en` (English content)

## Language Support

### Current Setup

- **English**: Primary language, served from root (`/`)
- **Polish**: Available content in `/pl/` directory
- **Language Switcher**: Component added to navbar

### Accessing Polish Content

Polish content is available but requires proper routing. Options:

1. **Manual links**: Link directly to `/pl/[page-name]`
2. **Language switcher**: Use the language switcher component in navbar
3. **Future enhancement**: Configure VitePress locales for full i18n support

## Troubleshooting

### Build Errors

- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Check that all markdown files are valid

### Deployment Issues

- Verify GitHub Pages is enabled
- Check GitHub Actions workflow runs successfully
- Ensure `base` path in config matches repository name

### Language Switching

- Language switcher appears in navbar
- Clicking switches between English and Polish versions
- Polish pages should be accessible at `/pl/[page-name]`

## File Structure

```
berryboo-docs/
├── .vitepress/          # VitePress config and theme
├── en/                  # English content (source)
├── pl/                  # Polish content
├── dist/                # Build output (generated)
├── .github/workflows/   # GitHub Actions
└── package.json         # Dependencies
```

## Customization

- **Theme**: Edit `.vitepress/theme/styles/custom.css`
- **Navigation**: Edit `.vitepress/config.ts`
- **Colors**: Edit `.vitepress/theme/styles/vars.css`

