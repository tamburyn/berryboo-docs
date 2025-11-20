# Pre-Deployment Checklist

## ✅ Setup Complete

- [x] VitePress installed and configured
- [x] Package.json with correct dependencies
- [x] Git ignore configured
- [x] GitHub Actions workflow created

## ✅ Content

- [x] All English files copied from `/ai/` to `/en/`
- [x] All files renamed to kebab-case
- [x] All Polish files copied to `/pl/`
- [x] Main pages translated to Polish:
  - [x] index.md
  - [x] intro.md
  - [x] business-context.md
  - [x] getting-started.md
  - [x] start-here.md
- [x] Internal links updated (no .md extensions)
- [x] Broken links fixed

## ✅ Design & Theme

- [x] Notion-inspired theme implemented
- [x] Light mode styling
- [x] Dark mode styling
- [x] Custom CSS variables
- [x] Responsive design
- [x] Typography configured

## ✅ Navigation

- [x] Sidebar navigation configured
- [x] Main navigation menu
- [x] Language switcher component
- [x] Mobile-responsive navigation

## ✅ Features

- [x] Search functionality configured
- [x] Language switching (English/Polish)
- [x] Dark mode toggle (VitePress built-in)
- [x] Responsive layout

## ✅ Deployment

- [x] GitHub Actions workflow configured
- [x] Base path set (`/berryboo-docs/`)
- [x] Output directory configured
- [x] Build script ready

## 🚀 Ready to Deploy

### Before First Deployment

1. **Verify Repository Name**
   - Check if your GitHub repo is named `berryboo-docs`
   - If not, update `base` in `.vitepress/config.ts`

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions" (not "Deploy from a branch")

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Test Locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173 and verify:
   - English content loads
   - Language switcher works
   - Navigation works
   - Dark mode works

5. **Build Test**
   ```bash
   npm run build
   ```
   Verify `dist/` folder is created

6. **Deploy**
   ```bash
   git add .
   git commit -m "Initial VitePress documentation site"
   git push origin main
   ```

7. **Verify Deployment**
   - Check GitHub Actions tab for successful build
   - Visit `https://[username].github.io/berryboo-docs/`
   - Test language switching
   - Test navigation
   - Test search

## 📝 Post-Deployment

- [ ] Verify all pages load correctly
- [ ] Test language switching
- [ ] Test search functionality
- [ ] Test on mobile devices
- [ ] Verify dark mode works
- [ ] Check all internal links
- [ ] Test Polish content accessibility

## 🔧 Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Run `npm install` again
- Check for syntax errors in config files

### Pages Not Loading
- Verify base path matches repo name
- Check GitHub Pages settings
- Verify GitHub Actions workflow succeeded

### Language Switcher Not Working
- Check browser console for errors
- Verify LanguageSwitcher.vue component exists
- Check theme/index.ts includes the component

### Polish Content Not Accessible
- Verify `/pl/` directory exists
- Check file permissions
- Verify Polish files are in repository

---

**Status**: ✅ All checks complete - Ready for deployment!

