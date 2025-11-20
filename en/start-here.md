# 🚀 START HERE - BerryBoo AI Developer Onboarding

**Welcome to the BerryBoo AI System!**

This is your starting point for understanding the entire AI-powered e-commerce analytics and recommendation system.

---

## 📖 **What is BerryBoo AI?**

BerryBoo AI is an **advanced multi-agent AI system** that provides intelligent e-commerce analytics and actionable recommendations for online stores. It combines:

- **Real-time anomaly detection** from multiple data sources
- **48 specialized MCP agents** that analyze Google Analytics, Search Console, Meta Ads, Google Ads, and PageSpeed
- **Multi-agent specialist teams** (Performance Marketing, SEO, UX, GSC) that provide expert consultancy
- **Automated recommendation generation** in Polish business language
- **Multi-tenant architecture** supporting unlimited client shops

---

## 🗺️ **Documentation Reading Order**

Follow this sequence to understand the system from ground up:

### **1. Understanding the System** (Start Here)
1. **[Start Here](/start-here)** ← You are here
2. **[System Overview](/system-overview)** - Architecture, data flow, and key concepts

### **2. Core Infrastructure**
3. **[Database Schema](/database-schema)** - Database structure and relationships
4. **[Multi-Tenant Architecture](/multi-tenant)** - Multi-tenant architecture and shop isolation

### **3. MCP Integration** (Model Context Protocol)
5. **[MCP Integration](/mcp-integration)** - Complete MCP guide, servers, and code execution
6. **[MCP Integration Guide](/mcp-integration-guide)** - Integration details
7. **[MCP Naming Structure](/mcp-naming-structure)** - Naming conventions

### **4. AI Agents Architecture**
8. **[Master Agents](/agents-master)** - Reactive and Proactive Master Agents
9. **[Specialist Teams](/agents-specialist-teams)** - 4 domain expert teams
10. **[Specialized Agents](/agents-specialized)** - 48 MCP specialized agents

### **5. Development & Usage**
11. **[CLI Reference](/cli-reference)** - All CLI commands and usage
12. **[Development Guide](/development-guide)** - How to add features and extend the system
13. **[Docker](/docker)** - Docker setup and configuration

---

## 🏗️ **System Architecture (Quick Overview)**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BERYBOO AI SYSTEM                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │           INPUT LAYER (Data Sources)                       │    │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐   │    │
│  │  │Anomalies │  │  GA4     │  │   GSC   │  │Meta/Ads  │   │    │
│  │  │ Database │  │ MCP      │  │  MCP    │  │   MCP    │   │    │
│  │  └────┬─────┘  └────┬─────┘  └────┬────┘  └────┬─────┘   │    │
│  └───────┼─────────────┼─────────────┼────────────┼──────────┘    │
│          │             │             │            │                │
│  ┌───────▼─────────────▼─────────────▼────────────▼──────────┐    │
│  │        PREPROCESSING LAYER (Master Agents)                 │    │
│  │  ┌─────────────────┐        ┌──────────────────────┐      │    │
│  │  │ Reactive Master │        │ Proactive Master     │      │    │
│  │  │ (Anomaly-based) │        │ (MCP Insights-based) │      │    │
│  │  └────────┬────────┘        └──────────┬───────────┘      │    │
│  └───────────┼────────────────────────────┼──────────────────┘    │
│              │                             │                       │
│  ┌───────────▼─────────────────────────────▼──────────────────┐   │
│  │         ROUTING LAYER (Selector Group Chat)               │   │
│  │  Intelligent routing to appropriate specialist teams      │   │
│  └───────────┬──────────────────────────────────────────────┘   │
│              │                                                    │
│  ┌───────────▼───────────────────────────────────────────────┐   │
│  │        SPECIALIST TEAMS (4-Agent Consultancy)             │   │
│  │  ┌────────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐  │   │
│  │  │Performance │  │   SEO   │  │   UX    │  │   GSC    │  │   │
│  │  │ Marketing  │  │Specialist│  │Specialist│ │Specialist│  │   │
│  │  └────────────┘  └─────────┘  └─────────┘  └──────────┘  │   │
│  │  Each team: Schema → Research → Strategy → Validator      │   │
│  └───────────┬──────────────────────────────────────────────┘   │
│              │                                                    │
│  ┌───────────▼───────────────────────────────────────────────┐   │
│  │       OUTPUT LAYER (Production Recommendations)            │   │
│  │  1. Recommendation Formatter (Polish business language)    │   │
│  │  2. Final Validator (Database persistence)                 │   │
│  │  3. Terminal Display                                       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🔑 **Key Concepts**

### **1. Dual-Track Recommendation System**

The system operates with **two parallel pipelines**:

| Aspect | Reactive Pipeline | Proactive Pipeline |
|--------|------------------|-------------------|
| **Trigger** | Anomaly detected | Daily scheduled analysis |
| **Source** | `ai_general_anomalies` table | `ai_insights` table (48 agents) |
| **Focus** | Problem detection | Opportunity discovery |
| **Agent** | Reactive Master Agent | Proactive Master Agent |
| **Frequency** | Real-time / Hourly | Daily batch |

### **2. Multi-Agent Architecture**

- **Master Agents**: Preprocess and route tasks
- **Specialist Teams**: 4-agent consultancy teams (Schema, Research, Strategy, Validator)
- **Specialized Agents**: 48 MCP agents for data collection and analysis
- **Production Pipeline**: Formatter → Validator → Database

### **3. Model Context Protocol (MCP)**

- **MCP Servers** (`mcp_server_*`): Connect to external APIs (GA4, GSC, Meta Ads, etc.)
- **MCP Tools** (`mcp_tools`): Python client library for agents to call servers
- **Code Execution**: Agents write Python code in secure sandbox to interact with MCPs

### **4. Multi-Tenant Architecture**

- Each client shop has isolated credentials and data
- OAuth tokens stored per shop in database
- Secure sandbox ensures no cross-shop data access
- CLI supports `--shop-id` parameter for any client

---

## 🛠️ **Quick Setup**

### **1. Install Dependencies**

```bash
cd backend/src/ai
pip install -r requirements.txt
pip install RestrictedPython  # For code execution sandbox
```

### **2. Configure Environment**

```bash
cp env_example .env
# Edit .env with your credentials:
# - OPENAI_API_KEY
# - Database credentials
# - Default shop ID
```

### **3. Test Installation**

```bash
# Test database connection
python test_db_connection.py

# Test basic CLI
python main.py --help

# Test with default shop
python main.py chat-ga4
```

---

## 📚 **Documentation Glossary**

### **Common Terms**

- **Anomaly**: Statistical deviation detected in metrics (traffic drop, conversion spike, etc.)
- **Shop**: A client's e-commerce store (multi-tenant unit)
- **Property ID**: Google Analytics 4 property identifier
- **Customer ID**: Google Ads account identifier
- **MCP**: Model Context Protocol - open standard for AI-tool integration
- **Workbench**: AutoGen's MCP client implementation
- **Sandbox**: Restricted Python environment for secure code execution
- **AnomalyPackage**: Structured data format for preprocessed anomalies
- **ProductionRecommendation**: Final formatted recommendation for clients

### **Agent Types**

- **Master Agent**: Routes and coordinates specialist teams
- **Schema Agent**: Database and data analysis expert
- **Research Agent**: Market and competitive intelligence
- **Strategy Agent**: Tactical recommendations and growth hacks
- **Validator Agent**: Quality control and validation
- **Specialized Agent**: Automated MCP data collection agent

### **Database Tables**

- `ai_general_anomalies`: Detected anomalies
- `ai_insights`: MCP agent analysis results
- `ai_recommendations`: Final production recommendations
- `Integration`: OAuth credentials per shop
- `sources_shop`: Client shop information


---

## 🔍 **Quick Reference**

### **Important Directories**

```
backend/src/ai/
├── src/berryboo_ai/           # Main AI package
│   ├── agents/                # All agents
│   │   ├── tools/             # Agent tools
│   │   ├── *_team.py          # Specialist teams
│   │   └── *_specialized_agents.py  # MCP agents
│   ├── services/              # Core services
│   │   ├── code_execution_sandbox.py
│   │   ├── mcp_credential_manager.py
│   │   └── oauth_credential_resolver.py
│   ├── database/              # Database connection
│   └── config/                # Configuration
├── mcp_server_ga4/            # GA4 MCP server
├── mcp_server_gsc/            # GSC MCP server
├── mcp_server_meta_ads/       # Meta Ads MCP server
├── mcp_server_google_ads/     # Google Ads MCP server
├── mcp_server_pagespeed/      # PageSpeed MCP server
├── mcp_tools/                 # MCP client wrappers
└── tests/                     # Test suite
```


**Welcome aboard! 🚀**




