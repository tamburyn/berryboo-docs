# Getting Started with BerryBoo AI

**Quick start guide for new users**

---

## Welcome!

This guide will help you get started with BerryBoo AI quickly. Whether you're a business owner, marketing manager, or developer, you'll find everything you need here.

---

## For Business Users

### Step 1: Understand What BerryBoo AI Does

BerryBoo AI automatically analyzes your e-commerce data and provides expert recommendations. Learn more:
- **[Introduction](/intro)** - What is BerryBoo AI?
- **[Business Context](/business-context)** - Value and ROI

### Step 2: Connect Your Analytics

BerryBoo AI connects to your existing analytics tools:
- Google Analytics 4
- Google Search Console
- Google Ads
- Meta Ads
- PageSpeed Insights

**Note**: You'll need OAuth access to these services. The system guides you through the connection process.

### Step 3: Review Recommendations

Once connected, BerryBoo AI will:
1. Analyze your data automatically
2. Detect anomalies and opportunities
3. Generate expert recommendations
4. Deliver insights in clear Polish business language

### Step 4: Implement Recommendations

Each recommendation includes:
- Clear action plan
- Expected impact
- Time estimate
- Priority level

---

## For Developers

### Prerequisites

- Python 3.10+
- PostgreSQL 14+
- Access to OpenAI API
- OAuth credentials for analytics services

### Quick Setup

#### 1. Install Dependencies

```bash
cd backend/src/ai
pip install -r requirements.txt
pip install RestrictedPython  # For code execution sandbox
```

#### 2. Configure Environment

```bash
cp env_example .env
# Edit .env with your credentials:
# - OPENAI_API_KEY
# - Database credentials
# - Default shop ID
```

#### 3. Test Installation

```bash
# Test database connection
python test_db_connection.py

# Test basic CLI
python main.py --help

# Test with default shop
python main.py chat-ga4
```

### Next Steps

- **[Start Here](/start-here)** - Complete developer onboarding
- **[System Overview](/system-overview)** - Architecture documentation
- **[CLI Reference](/cli-reference)** - All available commands
- **[Development Guide](/development-guide)** - How to extend the system

---

## Documentation Structure

### Understanding the System
1. **[Start Here](/start-here)** - Developer onboarding
2. **[System Overview](/system-overview)** - Architecture and data flow

### Core Infrastructure
3. **[Database Schema](/database-schema)** - Database structure
4. **[Multi-Tenant Architecture](/multi-tenant)** - Multi-shop isolation

### MCP Integration
5. **[MCP Integration](/mcp-integration)** - Complete MCP guide
6. **[MCP Integration Guide](/mcp-integration-guide)** - Integration details
7. **[MCP Naming Structure](/mcp-naming-structure)** - Naming conventions

### AI Agents Architecture
8. **[Master Agents](/agents-master)** - Reactive and Proactive Master Agents
9. **[Specialist Teams](/agents-specialist-teams)** - 4 domain expert teams
10. **[Specialized Agents](/agents-specialized)** - 48 MCP specialized agents

### Development & Usage
11. **[CLI Reference](/cli-reference)** - All CLI commands
12. **[Development Guide](/development-guide)** - Extend the system
13. **[Docker](/docker)** - Docker setup

---

## Key Concepts

### Dual-Track System

BerryBoo AI operates with two parallel pipelines:

- **Reactive Pipeline**: Responds to detected anomalies (problems)
- **Proactive Pipeline**: Discovers opportunities through daily analysis

### Multi-Agent Architecture

- **Master Agents**: Preprocess and route tasks
- **Specialist Teams**: 4-agent consultancy teams
- **Specialized Agents**: 48 MCP agents for data collection

### Multi-Tenant Support

Each client shop has:
- Isolated data and credentials
- Independent OAuth tokens
- Secure sandbox execution

---

## Common Tasks

### Running Analysis

```bash
# Analyze anomalies
python main.py process-anomalies --shop-id <shop-id>

# Process MCP insights
python main.py process-insights --shop-id <shop-id>

# Get recommendations
python main.py get-recommendations --shop-id <shop-id>
```

### Connecting a New Shop

1. Client authorizes via dashboard
2. OAuth tokens stored in database
3. Use `--shop-id` parameter in CLI
4. System automatically uses correct credentials

### Viewing Recommendations

Recommendations are stored in the `ai_recommendations` table and can be:
- Viewed in dashboard
- Exported via API
- Accessed via CLI

---

## Troubleshooting

### Connection Issues

- Verify OAuth tokens are valid
- Check database connectivity
- Ensure API keys are configured

### Performance Issues

- Check system optimization settings
- Review processing logs
- Verify database indexes

### Recommendation Quality

- Review specialist team configurations
- Check data quality in source tables
- Verify MCP agent outputs

---

## Support

For more detailed information:
- See [System Overview](/system-overview) for architecture details
- Check [CLI Reference](/cli-reference) for command options
- Review [Development Guide](/development-guide) for extending the system

---

## Next Steps

1. **Business Users**: Review [Introduction](/intro) and [Business Context](/business-context)
2. **Developers**: Start with [Start Here](/start-here) for complete onboarding
3. **Everyone**: Explore the documentation structure above

Welcome to BerryBoo AI! 🚀

