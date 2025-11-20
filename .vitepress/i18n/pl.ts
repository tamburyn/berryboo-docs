export const plConfig = {
  title: 'BerryBoo AI',
  description: 'Zaawansowany wieloagentowy system AI do analityki e-commerce i rekomendacji',
  
  themeConfig: {
    nav: [
      { text: 'Strona główna', link: '/pl/' },
      { text: 'Wprowadzenie', link: '/pl/intro' },
      { text: 'Pierwsze kroki', link: '/pl/getting-started' },
      { text: 'Dokumentacja', link: '/pl/start-here' }
    ],

    sidebar: {
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
      ]
    }
  }
}

