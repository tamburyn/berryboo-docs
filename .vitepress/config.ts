import { defineConfig } from 'vitepress'

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
    // Using function to have precise control over matching
    sidebar: {
      // Documentation pages - full navigation
      '/start-here': [
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
      ],
      // Home page - Getting Started section
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/intro' },
            { text: 'Business Context', link: '/business-context' },
            { text: 'Getting Started Guide', link: '/getting-started' }
          ]
        }
      ],
      // Polish documentation pages
      '/pl/start-here': [
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
      ],
      // Polish home page
      '/pl/': [
        {
          text: 'Pierwsze kroki',
          items: [
            { text: 'Wprowadzenie', link: '/pl/intro' },
            { text: 'Kontekst biznesowy', link: '/pl/business-context' },
            { text: 'Przewodnik startowy', link: '/pl/getting-started' }
          ]
        }
      ],
      // Add all other documentation pages with same sidebar
      '/system-overview': '/start-here',
      '/database-schema': '/start-here',
      '/multi-tenant': '/start-here',
      '/mcp-integration': '/start-here',
      '/mcp-integration-guide': '/start-here',
      '/mcp-naming-structure': '/start-here',
      '/agents-master': '/start-here',
      '/agents-specialist-teams': '/start-here',
      '/agents-specialized': '/start-here',
      '/cli-reference': '/start-here',
      '/development-guide': '/start-here',
      '/docker': '/start-here',
      // Polish pages
      '/pl/system-overview': '/pl/start-here',
      '/pl/database-schema': '/pl/start-here',
      '/pl/multi-tenant': '/pl/start-here',
      '/pl/mcp-integration': '/pl/start-here',
      '/pl/mcp-integration-guide': '/pl/start-here',
      '/pl/mcp-naming-structure': '/pl/start-here',
      '/pl/agents-master': '/pl/start-here',
      '/pl/agents-specialist-teams': '/pl/start-here',
      '/pl/agents-specialized': '/pl/start-here',
      '/pl/cli-reference': '/pl/start-here',
      '/pl/development-guide': '/pl/start-here',
      '/pl/docker': '/pl/start-here'
    },
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
