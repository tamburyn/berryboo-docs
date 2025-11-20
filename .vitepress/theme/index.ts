import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () => h(LanguageSwitcher)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components if needed
  }
}
