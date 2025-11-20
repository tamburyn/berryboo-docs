export const enConfig = {
  title: 'BerryBoo AI',
  description: 'Advanced multi-agent AI system for e-commerce analytics and recommendations',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/intro' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Documentation', link: '/start-here' }
    ],

    sidebar: {
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
      ]
    }
  }
}

