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
    sidebar: {
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
      // Documentation pages - full documentation navigation
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
      // Home page - Getting Started section (only for root /)
      // Must come AFTER specific routes to avoid matching
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
      '/system-overview': [
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
      '/database-schema': [
        {
          text: 'Core Infrastructure',
          items: [
            { text: 'Database Schema', link: '/database-schema' },
            { text: 'Multi-Tenant Architecture', link: '/multi-tenant' }
          ]
        },
        {
          text: 'Understanding the System',
          items: [
            { text: 'Start Here', link: '/start-here' },
            { text: 'System Overview', link: '/system-overview' }
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
        }
      ],
      '/multi-tenant': [
        {
          text: 'Core Infrastructure',
          items: [
            { text: 'Database Schema', link: '/database-schema' },
            { text: 'Multi-Tenant Architecture', link: '/multi-tenant' }
          ]
        },
        {
          text: 'Understanding the System',
          items: [
            { text: 'Start Here', link: '/start-here' },
            { text: 'System Overview', link: '/system-overview' }
          ]
        }
      ],
      '/mcp-integration': [
        {
          text: 'MCP Integration',
          items: [
            { text: 'MCP Integration', link: '/mcp-integration' },
            { text: 'MCP Integration Guide', link: '/mcp-integration-guide' },
            { text: 'MCP Naming Structure', link: '/mcp-naming-structure' }
          ]
        },
        {
          text: 'Understanding the System',
          items: [
            { text: 'Start Here', link: '/start-here' },
            { text: 'System Overview', link: '/system-overview' }
          ]
        },
        {
          text: 'AI Agents Architecture',
          items: [
            { text: 'Master Agents', link: '/agents-master' },
            { text: 'Specialist Teams', link: '/agents-specialist-teams' },
            { text: 'Specialized Agents', link: '/agents-specialized' }
          ]
        }
      ],
      '/mcp-integration-guide': [
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
      '/mcp-naming-structure': [
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
      '/agents-master': [
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
      '/agents-specialist-teams': [
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
      '/agents-specialized': [
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
      '/cli-reference': [
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
      '/development-guide': [
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
      '/docker': [
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
      // Polish versions
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
      '/pl/system-overview': [
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
      '/pl/database-schema': [
        {
          text: 'Infrastruktura podstawowa',
          items: [
            { text: 'Schemat bazy danych', link: '/pl/database-schema' },
            { text: 'Architektura wielodostępowa', link: '/pl/multi-tenant' }
          ]
        },
        {
          text: 'Zrozumienie systemu',
          items: [
            { text: 'Zacznij tutaj', link: '/pl/start-here' },
            { text: 'Przegląd systemu', link: '/pl/system-overview' }
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
        }
      ],
      '/pl/multi-tenant': [
        {
          text: 'Infrastruktura podstawowa',
          items: [
            { text: 'Schemat bazy danych', link: '/pl/database-schema' },
            { text: 'Architektura wielodostępowa', link: '/pl/multi-tenant' }
          ]
        },
        {
          text: 'Zrozumienie systemu',
          items: [
            { text: 'Zacznij tutaj', link: '/pl/start-here' },
            { text: 'Przegląd systemu', link: '/pl/system-overview' }
          ]
        }
      ],
      '/pl/mcp-integration': [
        {
          text: 'Integracja MCP',
          items: [
            { text: 'Integracja MCP', link: '/pl/mcp-integration' },
            { text: 'Przewodnik integracji MCP', link: '/pl/mcp-integration-guide' },
            { text: 'Struktura nazewnictwa MCP', link: '/pl/mcp-naming-structure' }
          ]
        },
        {
          text: 'Zrozumienie systemu',
          items: [
            { text: 'Zacznij tutaj', link: '/pl/start-here' },
            { text: 'Przegląd systemu', link: '/pl/system-overview' }
          ]
        },
        {
          text: 'Architektura agentów AI',
          items: [
            { text: 'Agenci główni', link: '/pl/agents-master' },
            { text: 'Zespoły specjalistów', link: '/pl/agents-specialist-teams' },
            { text: 'Agenci wyspecjalizowani', link: '/pl/agents-specialized' }
          ]
        }
      ],
      '/pl/mcp-integration-guide': [
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
      '/pl/mcp-naming-structure': [
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
      '/pl/agents-master': [
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
      '/pl/agents-specialist-teams': [
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
      '/pl/agents-specialized': [
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
      '/pl/cli-reference': [
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
      '/pl/development-guide': [
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
      '/pl/docker': [
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
