import { defineConfig } from 'vitepress'

// Define sidebars separately to reuse them
const docSidebar = [
  {
    text: 'Understanding the System',
    items: [
      { text: 'Start Here', link: '/start-here' },
      { text: 'System Overview', link: '/system-overview' }
    ]
  },
  {
    text: 'Core Infrastructure',
    items: [
      { text: 'Database Schema', link: '/database-schema' },
      { text: 'Multi-Tenant Architecture', link: '/multi-tenant' }
    ]
  },
  {
    text: 'MCP Integration',
    items: [
      { text: 'MCP Integration', link: '/mcp-integration' },
      { text: 'MCP Integration Guide', link: '/mcp-integration-guide' },
      { text: 'MCP Naming Structure', link: '/mcp-naming-structure' }
    ]
  },
  {
    text: 'AI Agents Architecture',
    items: [
      { text: 'Master Agents', link: '/agents-master' },
      { text: 'Specialist Teams', link: '/agents-specialist-teams' },
      { text: 'Specialized Agents', link: '/agents-specialized' }
    ]
  },
  {
    text: 'Development & Usage',
    items: [
      { text: 'CLI Reference', link: '/cli-reference' },
      { text: 'Development Guide', link: '/development-guide' },
      { text: 'Docker', link: '/docker' }
    ]
  }
]

const plDocSidebar = [
  {
    text: 'Zrozumienie systemu',
    items: [
      { text: 'Zacznij tutaj', link: '/pl/start-here' },
      { text: 'Przegląd systemu', link: '/pl/system-overview' }
    ]
  },
  {
    text: 'Infrastruktura podstawowa',
    items: [
      { text: 'Schemat bazy danych', link: '/pl/database-schema' },
      { text: 'Architektura wielodostępowa', link: '/pl/multi-tenant' }
    ]
  },
  {
    text: 'Integracja MCP',
    items: [
      { text: 'Integracja MCP', link: '/pl/mcp-integration' },
      { text: 'Przewodnik integracji MCP', link: '/pl/mcp-integration-guide' },
      { text: 'Struktura nazewnictwa MCP', link: '/pl/mcp-naming-structure' }
    ]
  },
  {
    text: 'Architektura agentów AI',
    items: [
      { text: 'Agenci główni', link: '/pl/agents-master' },
      { text: 'Zespoły specjalistów', link: '/pl/agents-specialist-teams' },
      { text: 'Agenci wyspecjalizowani', link: '/pl/agents-specialized' }
    ]
  },
  {
    text: 'Rozwój i użycie',
    items: [
      { text: 'Referencja CLI', link: '/pl/cli-reference' },
      { text: 'Przewodnik rozwoju', link: '/pl/development-guide' },
      { text: 'Docker', link: '/pl/docker' }
    ]
  }
]

const gettingStartedSidebar = [
  {
    text: 'Getting Started',
    items: [
      { text: 'Introduction', link: '/intro' },
      { text: 'Business Context', link: '/business-context' },
      { text: 'Getting Started Guide', link: '/getting-started' }
    ]
  }
]

const plGettingStartedSidebar = [
  {
    text: 'Pierwsze kroki',
    items: [
      { text: 'Wprowadzenie', link: '/pl/intro' },
      { text: 'Kontekst biznesowy', link: '/pl/business-context' },
      { text: 'Przewodnik startowy', link: '/pl/getting-started' }
    ]
  }
]

export default defineConfig({
  title: 'BerryBoo AI',
  description: 'Advanced multi-agent AI system for e-commerce analytics and recommendations',
  
  // Build configuration for GitHub Pages
  // Base path will be overridden by CLI flag in build script
  // Default to empty for dev mode (can be overridden with --base flag)
  base: process.env.VITEPRESS_BASE || '/',
  outDir: './dist',
  
  // Ignore dead links for now (some files don't exist yet)
  ignoreDeadLinks: true,

  // Source directory - English content (root locale)
  // Note: VitePress locales share the same srcDir, Polish content accessed via /pl/ paths
  srcDir: './en',

  // Internationalization - proper setup for bilingual support
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        // Navigation - Documentation links to Start Here page
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Introduction', link: '/intro' },
          { text: 'Documentation', link: '/start-here' }
        ]
      }
    },
    pl: {
      label: 'Polski',
      lang: 'pl',
      themeConfig: {
        nav: [
          { text: 'Strona główna', link: '/pl/' },
          { text: 'Wprowadzenie', link: '/pl/intro' },
          { text: 'Dokumentacja', link: '/pl/start-here' }
        ]
      }
    }
  },

  // Theme configuration
  themeConfig: {
    // Show outline (TOC) in sidebar
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    
    // Sidebar configuration - comprehensive for all pages
    // Using explicit arrays for all paths to ensure reliability
    sidebar: {
      // English Documentation Pages
      '/start-here': docSidebar,
      '/system-overview': docSidebar,
      '/database-schema': docSidebar,
      '/multi-tenant': docSidebar,
      '/mcp-integration': docSidebar,
      '/mcp-integration-guide': docSidebar,
      '/mcp-naming-structure': docSidebar,
      '/agents-master': docSidebar,
      '/agents-specialist-teams': docSidebar,
      '/agents-specialized': docSidebar,
      '/cli-reference': docSidebar,
      '/development-guide': docSidebar,
      '/docker': docSidebar,

      // Polish Documentation Pages
      '/pl/start-here': plDocSidebar,
      '/pl/system-overview': plDocSidebar,
      '/pl/database-schema': plDocSidebar,
      '/pl/multi-tenant': plDocSidebar,
      '/pl/mcp-integration': plDocSidebar,
      '/pl/mcp-integration-guide': plDocSidebar,
      '/pl/mcp-naming-structure': plDocSidebar,
      '/pl/agents-master': plDocSidebar,
      '/pl/agents-specialist-teams': plDocSidebar,
      '/pl/agents-specialized': plDocSidebar,
      '/pl/cli-reference': plDocSidebar,
      '/pl/development-guide': plDocSidebar,
      '/pl/docker': plDocSidebar,

      // Home Pages / Getting Started
      // Polish Home
      '/pl/': plGettingStartedSidebar,
      // Root Home (must be last to avoid overriding specific routes)
      '/': gettingStartedSidebar
    },

    // Search
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search documentation'
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Reset search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    },

    // Social links - removed GitHub icon
    socialLinks: [],

    // Footer
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2025 BerryBoo AI'
    }
  }
})
