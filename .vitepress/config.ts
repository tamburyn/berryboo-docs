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
      ]
    },
      
      // Documentation sidebar - full navigation
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
      
      // Polish documentation sidebar
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
      
      // Check for documentation pages first
      // Use startsWith for better matching (handles /start-here.html, /start-here/, etc.)
      const isDocPage = path.startsWith('/start-here') || 
                       path.startsWith('/system-overview') ||
                       path.startsWith('/database-schema') ||
                       path.startsWith('/multi-tenant') ||
                       path.startsWith('/mcp-integration') ||
                       path.startsWith('/mcp-integration-guide') ||
                       path.startsWith('/mcp-naming-structure') ||
                       path.startsWith('/agents-master') ||
                       path.startsWith('/agents-specialist-teams') ||
                       path.startsWith('/agents-specialized') ||
                       path.startsWith('/cli-reference') ||
                       path.startsWith('/development-guide') ||
                       path.startsWith('/docker')
      
      const isPlDocPage = path.startsWith('/pl/start-here') ||
                          path.startsWith('/pl/system-overview') ||
                          path.startsWith('/pl/database-schema') ||
                          path.startsWith('/pl/multi-tenant') ||
                          path.startsWith('/pl/mcp-integration') ||
                          path.startsWith('/pl/mcp-integration-guide') ||
                          path.startsWith('/pl/mcp-naming-structure') ||
                          path.startsWith('/pl/agents-master') ||
                          path.startsWith('/pl/agents-specialist-teams') ||
                          path.startsWith('/pl/agents-specialized') ||
                          path.startsWith('/pl/cli-reference') ||
                          path.startsWith('/pl/development-guide') ||
                          path.startsWith('/pl/docker')
      
      if (isPlDocPage) {
        return plDocSidebar
      }
      
      if (isDocPage) {
        return docSidebar
      }
      
      // Home pages - Getting Started section
      if (path === '/' || path === '/index' || path === '/index.html') {
        return [
          {
            text: 'Getting Started',
            items: [
              { text: 'Introduction', link: '/intro' },
              { text: 'Business Context', link: '/business-context' },
              { text: 'Getting Started Guide', link: '/getting-started' }
            ]
          }
        ]
      }
      
      if (path === '/pl' || path === '/pl/' || path === '/pl/index' || path === '/pl/index.html') {
        return [
          {
            text: 'Pierwsze kroki',
            items: [
              { text: 'Wprowadzenie', link: '/pl/intro' },
              { text: 'Kontekst biznesowy', link: '/pl/business-context' },
              { text: 'Przewodnik startowy', link: '/pl/getting-started' }
            ]
          }
        ]
      }
      
      // Default: return documentation sidebar
      return docSidebar
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

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    // Footer
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2025 BerryBoo AI'
    }
  }
})
