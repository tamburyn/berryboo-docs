# BerryBoo AI - System Overview

**Complete Architecture & Data Flow Documentation**

> **Prerequisites**: Read [Start Here](/start-here) first for onboarding context.

> ⚡ **NEW (Nov 2025)**: System optimized for **83-90% faster processing** (30min → 3-6min per anomaly). See [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) for details on smart routing, parallel execution, and relaxed validation improvements.

---

## 📋 Table of Contents

1. [What is BerryBoo AI?](#what-is-berryboo-ai)
2. [System Architecture](#system-architecture)
3. [Dual-Track Pipeline](#dual-track-pipeline)
4. [Data Flow](#data-flow)
5. [Key Components](#key-components)
6. [Technology Stack](#technology-stack)
7. [Database Architecture](#database-architecture)
8. [Agent Hierarchy](#agent-hierarchy)
9. [Performance Characteristics](#performance-characteristics)

---

## 🎯 What is BerryBoo AI?

BerryBoo AI is an **autonomous e-commerce analytics and recommendation system** that:

- **Detects anomalies** in real-time from multiple data sources
- **Analyzes opportunities** proactively using 48 specialized MCP agents  
- **Provides expert recommendations** through multi-agent consultancy teams
- **Delivers actionable insights** in Polish business language
- **Supports unlimited clients** with secure multi-tenant architecture

### Core Value Proposition

```
┌────────────────────────────────────────────────────────────┐
│                     TRADITIONAL APPROACH                    │
├────────────────────────────────────────────────────────────┤
│  ❌ Manual data analysis (hours/days)                      │
│  ❌ Single-source insights (incomplete picture)            │
│  ❌ Generic recommendations (not actionable)               │
│  ❌ Technical jargon (business owners confused)            │
│  ❌ Reactive only (problems found too late)                │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                     BERRYBOO AI APPROACH                    │
├────────────────────────────────────────────────────────────┤
│  ✅ Automated analysis (real-time + daily batches)         │
│  ✅ Multi-source integration (GA4, GSC, Ads, PageSpeed)    │
│  ✅ Expert consultancy teams (4-agent specialist groups)   │
│  ✅ Business-ready Polish (clear action plans)             │
│  ✅ Dual-track (problems + opportunities)                  │
└────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          BERRYBOO AI SYSTEM                              │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    INPUT LAYER                                 │    │
│  │                                                                 │    │
│  │  REACTIVE INPUT          │          PROACTIVE INPUT            │    │
│  │  ┌─────────────┐        │        ┌──────────────────┐        │    │
│  │  │ ai_general_ │        │        │   ai_insights    │        │    │
│  │  │  anomalies  │        │        │  (48 MCP Agents) │        │    │
│  │  │  (Database) │        │        │                  │        │    │
│  │  └──────┬──────┘        │        └────────┬─────────┘        │    │
│  │         │  Anomaly       │        MCP      │                  │    │
│  │         │  detected      │        reports  │                  │    │
│  └─────────┼────────────────┼─────────────────┼──────────────────┘    │
│            │                │                 │                        │
│  ┌─────────▼────────────────┼─────────────────▼──────────────────┐    │
│  │              PREPROCESSING LAYER                              │    │
│  │                                                                │    │
│  │  ┌─────────────────┐                ┌──────────────────┐     │    │
│  │  │  Reactive       │                │   Proactive      │     │    │
│  │  │  Master Agent   │                │   Master Agent   │     │    │
│  │  │  (o3-mini)      │                │   (o3-mini)      │     │    │
│  │  └────────┬────────┘                └─────────┬────────┘     │    │
│  │           │ AnomalyPackage                    │ InsightPackage│    │
│  │           └──────────────┬────────────────────┘              │    │
│  └──────────────────────────┼──────────────────────────────────┘    │
│                             │                                        │
│  ┌──────────────────────────▼──────────────────────────────────┐    │
│  │              ROUTING LAYER                                   │    │
│  │         Master SelectorGroupChat (gpt-4.1)                   │    │
│  │     Intelligent routing to appropriate specialist teams      │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                             │                                        │
│  ┌──────────────────────────▼──────────────────────────────────┐    │
│  │           SPECIALIST TEAMS LAYER                             │    │
│  │                                                               │    │
│  │  ┌────────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐    │    │
│  │  │Performance │  │   SEO   │  │   UX    │  │   GSC    │    │    │
│  │  │ Marketing  │  │Technical│  │Conversion│  │Specialist│    │    │
│  │  │    Team    │  │  Team   │  │  Team   │  │   Team   │    │    │
│  │  └────────────┘  └─────────┘  └─────────┘  └──────────┘    │    │
│  │                                                               │    │
│  │  Each team: Schema → Research → Strategy → Validator         │    │
│  │             (gpt-4o-mini)  (gpt-4o-mini)  (gpt-4.1)  (gpt-4.1)│    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                             │                                        │
│  ┌──────────────────────────▼──────────────────────────────────┐    │
│  │           PRODUCTION PIPELINE LAYER                          │    │
│  │                                                               │    │
│  │  1. Recommendation Formatter Agent (gpt-4.1)                 │    │
│  │     - Converts technical analysis to Polish business format  │    │
│  │                                                               │    │
│  │  2. Final Master Validator (gpt-4.1)                         │    │
│  │     - Validates structure and quality                        │    │
│  │     - Persists to database                                   │    │
│  │                                                               │    │
│  │  3. Terminal Display & Logging                               │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                             │                                        │
│  ┌──────────────────────────▼──────────────────────────────────┐    │
│  │                     OUTPUT LAYER                             │    │
│  │                                                               │    │
│  │         ai_recommendations (Database)                        │    │
│  │         - Polish business-ready recommendations              │    │
│  │         - Actionable steps with priorities                   │    │
│  │         - Traceable to source (anomaly or insight)           │    │
│  └───────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Dual-Track Pipeline

The system operates with **two parallel recommendation pipelines** that converge at the specialist teams.

### Comparison Matrix

| Aspect | **Reactive Pipeline** | **Proactive Pipeline** |
|--------|----------------------|----------------------|
| **Trigger** | Anomaly detected | Daily scheduled analysis |
| **Source** | `ai_general_anomalies` table | `ai_insights` table |
| **Input** | Statistical deviations | Comprehensive MCP reports |
| **Focus** | Problem detection | Opportunity discovery |
| **Agent** | Reactive Master Agent | Proactive Master Agent |
| **Frequency** | Daily batch (morning) | Daily batch (morning) |
| **Data Volume** | Low (anomalies only) | High (full reports) |
| **Processing Time** | Fast (~2-5 min per anomaly) | Slow (~30-60 min for all) |
| **Output** | AnomalyPackage | InsightPackage |
| **Common Path** | → Specialist Teams → Production Pipeline |

### Reactive Pipeline (Anomaly-Based)

**Purpose**: Respond to problems as they occur

```
┌─────────────────────────────────────────────────────────┐
│              REACTIVE PIPELINE FLOW                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Anomaly Detection (External System)                 │
│     - Statistical analysis on metrics                   │
│     - Z-score > 2.5 triggers anomaly                    │
│     - Stored in ai_general_anomalies                    │
│          ↓                                               │
│  2. Reactive Master Agent                               │
│     - Fetches anomaly from database                     │
│     - Enriches with context (historical trends)         │
│     - Assesses priority and impact                      │
│     - Creates AnomalyPackage                            │
│          ↓                                               │
│  3. AnomalyPackage                                      │
│     {                                                    │
│       "source_type": "anomaly",                         │
│       "metric": "conversion_rate",                      │
│       "z_score": -3.2,                                  │
│       "pct_delta": -15.3,                               │
│       "priority_level": "URGENT",                       │
│       "suggested_specialists": ["performance_marketing"]│
│     }                                                    │
│          ↓                                               │
│  4. Routing to Specialist Teams                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Key Metrics Monitored**:
- Revenue & Transactions
- Conversion rates
- Traffic (organic, paid, direct)
- Bounce rate & engagement
- Cart abandonment
- Average order value

### Proactive Pipeline (MCP Insights-Based)

**Purpose**: Discover opportunities before they're obvious

```
┌──────────────────────────────────────────────────────────┐
│              PROACTIVE PIPELINE FLOW                      │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  1. 48 Specialized MCP Agents (Nightly)                  │
│     - GA4 Agents (10): Conversion, engagement, behavior  │
│     - GSC Agents (10): Rankings, content, technical SEO  │
│     - PageSpeed (8): Performance, Core Web Vitals        │
│     - Google Ads (10): Campaigns, keywords, creative     │
│     - Meta Ads (10): Targeting, creative, audiences      │
│          ↓                                                │
│  2. ai_insights Table                                    │
│     - Structured JSONB reports                           │
│     - Executive summaries                                │
│     - Metrics, opportunities, risks                      │
│     - processed_by_master: false                         │
│          ↓                                                │
│  3. Proactive Master Agent                               │
│     - Fetches unprocessed insights                       │
│     - Analyzes report_data                               │
│     - Prioritizes opportunities                          │
│     - Creates InsightPackage                             │
│          ↓                                                │
│  4. InsightPackage                                       │
│     {                                                     │
│       "source_type": "mcp_report",                       │
│       "mcp_source": "ga4",                               │
│       "agent_name": "conversion_funnel_analyst",         │
│       "report_summary": {...},                           │
│       "key_insights": [...],                             │
│       "priority_level": "HIGH",                          │
│       "suggested_specialists": ["ux_conversion"]         │
│     }                                                     │
│          ↓                                                │
│  5. Routing to Specialist Teams                          │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**48 Specialized Agents Breakdown**:
- **GA4** (10): Funnel, LTV, Product Performance, Attribution, Seasonality
- **GSC** (10): Search Performance, Keywords, Technical SEO, Content Gaps
- **PageSpeed** (8): Core Web Vitals, Mobile Performance, JS/CSS Optimization
- **Google Ads** (10): Campaign Performance, Bid Strategy, Creative, Landing Pages
- **Meta Ads** (10): Campaign Performance, Creative, Audiences, Conversion Optimization

---

## 🌊 Data Flow

### Complete End-to-End Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                       DATA FLOW DIAGRAM                             │
└────────────────────────────────────────────────────────────────────┘

INPUT SOURCES
├─ ai_general_anomalies (Reactive)
│  - Anomaly detection system writes here
│  - Statistical deviations (z-score > 2.5)
│
└─ ai_insights (Proactive)
   - 48 MCP agents write here
   - Comprehensive reports (JSONB)
        ↓
PREPROCESSING AGENTS
├─ Reactive Master Agent
│  - Reads: ai_general_anomalies
│  - Produces: AnomalyPackage
│
└─ Proactive Master Agent
   - Reads: ai_insights
   - Produces: InsightPackage
        ↓
ROUTING LAYER
└─ Master SelectorGroupChat
   - Receives: AnomalyPackage OR InsightPackage
   - Routes to: Appropriate specialist team
   - Logic: Metric/MCP source + priority
        ↓
SPECIALIST TEAMS (4-Agent Workflow)
├─ Performance Marketing Team
│  └─ Schema → Research → Strategy → Validator
│
├─ SEO Technical Team
│  └─ Schema → Research → Strategy → Validator
│
├─ UX Conversion Team
│  └─ Schema → Research → Strategy → Validator
│
└─ GSC Specialist Team
   └─ Schema → Research → Strategy → Validator
        ↓
PRODUCTION PIPELINE
├─ Recommendation Formatter
│  - Converts technical analysis to Polish business language
│  - Applies ProductionRecommendation schema
│
└─ Final Master Validator
   - Validates structure and quality
   - Enriches with metadata
        ↓
OUTPUT
└─ ai_recommendations (Database)
   - Polish business-ready recommendations
   - Linked to source (anomaly_id or insight_id)
   - Ready for dashboard display
```

### Data Transformation Example

```
INPUT (Anomaly):
{
  "metric": "conversion_rate",
  "z_score": -3.2,
  "baseline_change_pct": -15.3,
  "current_value": 2.1,
  "baseline_value": 2.5
}
        ↓
PREPROCESSING (AnomalyPackage):
{
  "source_type": "anomaly",
  "metric": "conversion_rate",
  "z_score": -3.2,
  "pct_delta": -15.3,
  "priority_level": "URGENT",
  "business_impact_score": 0.89,
  "suggested_specialists": ["performance_marketing", "ux_conversion"]
}
        ↓
SPECIALIST ANALYSIS (Technical):
{
  "root_cause": "Mobile checkout UX degradation",
  "supporting_data": "47% mobile conversion vs 55% desktop",
  "recommendations": [
    "Simplify mobile payment selection",
    "Add guest checkout option",
    "Optimize form autofill"
  ]
}
        ↓
PRODUCTION OUTPUT (Polish):
{
  "title": "Pilne: Spadek konwersji o 15% - problemy z mobilnym checkout",
  "priority": "URGENT",
  "impact": "Szacunkowa strata: 2,300 zł dziennie",
  "action_plan": {
    "immediate": [
      {
        "action": "Uproszczenie wyboru metody płatności na mobile",
        "time": "2-3 dni",
        "impact": "Wzrost konwersji o 5-8%"
      }
    ],
    "short_term": [...],
    "long_term": [...]
  }
}
```

---

## 🔧 Key Components

### 1. Master Agents (Preprocessing Layer)

#### Reactive Master Agent
- **Model**: o3-mini (OpenAI reasoning model)
- **Input**: Anomalies from `ai_general_anomalies`
- **Output**: `AnomalyPackage`
- **Processing**: Embedded data approach (no tool hanging)
- **Speed**: ~2-5 minutes per anomaly
- **Details**: See [AGENTS_MASTER.md](AGENTS_MASTER.md)

#### Proactive Master Agent
- **Model**: o3-mini
- **Input**: Reports from `ai_insights`
- **Output**: `InsightPackage`
- **Processing**: Batch processing (50 insights at once)
- **Speed**: ~30-60 minutes for full batch
- **Details**: See [AGENTS_MASTER.md](AGENTS_MASTER.md)

### 2. Specialist Teams (Analysis Layer)

Each team follows a **4-agent consultancy pattern**:

```
Schema Agent (gpt-4o-mini)
   ↓ Provides: Database queries, historical data
Research Agent (gpt-4o-mini)
   ↓ Provides: Market context, competitive intelligence
Strategy Agent (gpt-4.1)
   ↓ Provides: Tactical recommendations, growth hacks
Validator Agent (gpt-4.1)
   ↓ Provides: Quality control, final approval
```

**Teams**:
1. **Performance Marketing Team**: PPC, campaigns, ROI optimization
2. **SEO Technical Team**: Rankings, content, technical SEO
3. **UX Conversion Team**: Funnel optimization, CRO, usability
4. **GSC Specialist Team**: Search Console specific analysis

**Details**: See [AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md)

### 3. 48 Specialized MCP Agents (Data Collection Layer)

Automated agents that run daily to collect and analyze data:

- **GA4** (10 agents): Traffic, conversions, behavior
- **GSC** (10 agents): Search performance, rankings
- **PageSpeed** (8 agents): Performance, Core Web Vitals
- **Google Ads** (10 agents): Campaign optimization
- **Meta Ads** (10 agents): Social advertising

**Details**: See [AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)

### 4. Production Pipeline (Output Layer)

#### Recommendation Formatter Agent
- **Model**: gpt-4.1
- **Purpose**: Convert technical analysis to Polish business language
- **Schema**: `ProductionRecommendation`
- **Output**: Business-ready action plans

#### Final Master Validator
- **Model**: gpt-4.1
- **Purpose**: Quality control and database persistence
- **Actions**: Validation, enrichment, storage

---

## 🛠️ Technology Stack

### AI & Agents
- **Framework**: Microsoft AutoGen AgentChat
- **Models**: 
  - `o3-mini` (Master agents - reasoning)
  - `gpt-4.1` (Strategy, validation - advanced reasoning)
  - `gpt-4o-mini` (Schema, research - speed & efficiency)
- **Provider**: OpenAI API

### MCP Integration
- **Protocol**: Model Context Protocol (MCP)
- **Implementation**: AutoGen MCP Workbench
- **Approach**: Code execution in secure sandbox
- **Security**: RestrictedPython for sandboxing
- **Details**: See [MCP_INTEGRATION.md](MCP_INTEGRATION.md)

### Backend
- **Language**: Python 3.10+
- **Framework**: Django 4.2+
- **Async**: `asyncio` for concurrent operations
- **Database**: PostgreSQL 14+
- **ORM**: Django ORM

### Data Storage
- **Anomalies**: `ai_general_anomalies` table
- **Insights**: `ai_insights` table (JSONB)
- **Recommendations**: `ai_recommendations` table
- **OAuth**: `Integration` model
- **Details**: See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

### External APIs
- **Google Analytics 4**: Traffic and behavior data
- **Google Search Console**: Search performance
- **Google Ads**: PPC campaign data
- **Meta Ads**: Facebook/Instagram advertising
- **PageSpeed Insights**: Performance metrics
- **Details**: See [OAUTH_INTEGRATION.md](OAUTH_INTEGRATION.md)

---

## 🗄️ Database Architecture

### Core Tables

```
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE SCHEMA                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INPUT TABLES                                               │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │ai_general_       │         │  ai_insights     │         │
│  │  anomalies       │         │  (JSONB)         │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                             │                   │
│           └──────────┬──────────────────┘                   │
│                      │                                      │
│  OUTPUT TABLE        ▼                                      │
│  ┌────────────────────────────────┐                        │
│  │   ai_recommendations           │                        │
│  │   - source_type (anomaly/mcp)  │                        │
│  │   - anomaly_id (FK)            │                        │
│  │   - insight_id (FK)            │                        │
│  │   - Polish recommendations     │                        │
│  └────────────────────────────────┘                        │
│                                                              │
│  CREDENTIAL TABLE                                           │
│  ┌────────────────────────────────┐                        │
│  │   Integration                  │                        │
│  │   - shop_id (FK)               │                        │
│  │   - integration_type           │                        │
│  │   - data (JSONB OAuth tokens)  │                        │
│  └────────────────────────────────┘                        │
│                                                              │
│  SHOP TABLE                                                 │
│  ┌────────────────────────────────┐                        │
│  │   sources_shop                 │                        │
│  │   - id (UUID)                  │                        │
│  │   - name, domain, etc.         │                        │
│  └────────────────────────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Table Details

#### ai_general_anomalies
- **Purpose**: Stores detected anomalies (reactive input)
- **Key Fields**: `metric`, `z_score`, `baseline_change_pct`, `business_impact`
- **Source**: External anomaly detection system
- **Processing**: Reactive Master Agent

#### ai_insights
- **Purpose**: Stores MCP agent reports (proactive input)
- **Key Fields**: `mcp_source`, `agent_name`, `report_data` (JSONB), `processed_by_master`
- **Source**: 48 specialized MCP agents
- **Processing**: Proactive Master Agent

#### ai_recommendations
- **Purpose**: Stores final Polish recommendations (output)
- **Key Fields**: `source_type`, `anomaly_id`, `insight_id`, `recommendation_data` (JSONB)
- **Source**: Final Master Validator
- **Consumers**: Dashboard, reporting, email notifications

#### Integration
- **Purpose**: Stores OAuth credentials per shop
- **Key Fields**: `shop_id`, `integration_type`, `data` (JSONB with tokens)
- **Usage**: MCP credential resolution
- **Security**: Multi-tenant isolation

**Complete Schema**: See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

---

## 🧬 Agent Hierarchy

### Hierarchical Structure

```
┌────────────────────────────────────────────────────────────┐
│                    AGENT HIERARCHY                         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  LEVEL 0: PREPROCESSING (Master Agents)                    │
│  ┌─────────────────┐         ┌──────────────────┐         │
│  │  Reactive       │         │   Proactive      │         │
│  │  Master Agent   │         │   Master Agent   │         │
│  │  (o3-mini)      │         │   (o3-mini)      │         │
│  └────────┬────────┘         └─────────┬────────┘         │
│           │                             │                  │
│           └──────────┬──────────────────┘                  │
│                      │                                     │
│  LEVEL 1: ROUTING (Master SelectorGroupChat)              │
│  ┌──────────────────▼──────────────────┐                  │
│  │  Master Coordinator (gpt-4.1)       │                  │
│  │  - Intelligent team selection        │                  │
│  │  - Priority-based routing            │                  │
│  └──────────┬───────────────────────────┘                  │
│             │                                              │
│  LEVEL 2: SPECIALIST TEAMS (SelectorGroupChat)            │
│             │                                              │
│     ┌───────┴───────┬────────┬──────────┐                 │
│     ▼               ▼        ▼          ▼                 │
│  ┌──────┐      ┌──────┐  ┌─────┐   ┌──────┐              │
│  │Perf. │      │ SEO  │  │ UX  │   │ GSC  │              │
│  │Market│      │Tech  │  │Conv.│   │Spec. │              │
│  └──┬───┘      └──┬───┘  └──┬──┘   └──┬───┘              │
│     │             │         │          │                  │
│  Each team has 4 agents:                                  │
│  1. Schema Agent (gpt-4o-mini)                            │
│  2. Research Agent (gpt-4o-mini)                          │
│  3. Strategy Agent (gpt-4.1)                              │
│  4. Validator Agent (gpt-4.1)                             │
│             │                                              │
│  LEVEL 3: PRODUCTION PIPELINE                             │
│  ┌──────────▼──────────────────────┐                      │
│  │ Recommendation Formatter (gpt-4.1)│                    │
│  └──────────┬──────────────────────┘                      │
│  ┌──────────▼──────────────────────┐                      │
│  │ Final Master Validator (gpt-4.1) │                     │
│  └──────────────────────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Agent Count

- **Master Agents**: 2 (Reactive + Proactive)
- **Specialist Team Agents**: 16 (4 teams × 4 agents each)
- **Production Pipeline Agents**: 2 (Formatter + Validator)
- **Specialized MCP Agents**: 48 (data collection)

**Total Active Agents**: 68

---

## ⚡ Performance Characteristics

### Processing Times (Updated Nov 2025)

| Pipeline | Stage | Time (Before) | Time (After Optimization) |
|----------|-------|---------------|---------------------------|
| **Reactive** | Single anomaly end-to-end | 25-35 minutes | **3-6 minutes** ⚡ |
| **Reactive** | Master preprocessing | 60-90 seconds | 60-90 seconds |
| **Reactive** | Specialist team analysis (sequential) | 4-5 minutes | **2-3 minutes** (smart routing) |
| **Reactive** | Specialist team analysis (parallel) | N/A | **2 minutes** (new) ⚡ |
| **Reactive** | Recommendation formatter | 5-6 minutes | **1-2 minutes** (learning) |
| **Reactive** | Validation loop | 20-30 minutes | **0.5-2 minutes** (relaxed) ⚡ |
| **Proactive** | 48 MCP agents (all) | 30-60 minutes | 30-60 minutes |
| **Proactive** | Single insight processing | 25-35 minutes | **3-6 minutes** ⚡ |
| **Proactive** | Batch processing (50 insights) | 20-30 hours | **2.5-5 hours** ⚡ |

**Key Improvements**:
- ⚡ **83-90% faster** anomaly processing (30min → 3-6min)
- ⚡ **Smart routing** skips 1-2 unnecessary specialists (saves 1.5-3min)
- ⚡ **Parallel execution** runs specialists concurrently (saves 2-3min)
- ⚡ **Relaxed validation** reduces retries from 20+ to 1-3 (saves 20-25min)

### Token Consumption (Updated Nov 2025)

| Component | Tokens per Call | Cost (GPT-4.1) | Notes |
|-----------|----------------|----------------|-------|
| Master Agent | 2,000-5,000 | $0.01-0.03 | Unchanged |
| Schema Agent | 1,500-3,000 | $0.008-0.015 (gpt-4o-mini) | Unchanged |
| Research Agent | 2,000-4,000 | $0.010-0.020 (gpt-4o-mini) | Unchanged |
| Strategy Agent | 3,000-6,000 | $0.018-0.036 | Unchanged |
| Validator Agent | 2,000-4,000 | $0.012-0.024 | Unchanged |
| Formatter | 2,500-5,000 | $0.015-0.030 | 1-3 calls (was 20+) |
| Final Validator | 1,500-3,000 | $0.009-0.018 | 1-3 calls (was 20+) |
| **Total per recommendation (before)** | **40K-100K** | **$0.24-0.60** | With 20 retries |
| **Total per recommendation (after)** | **13K-27K** | **$0.074-0.158** | With 1-3 retries ⚡ |

**Cost Savings**: 60-75% reduction per recommendation through reduced validation retries

### Concurrency (Updated Nov 2025)

- **Specialist Teams**: Can process multiple packages in parallel ⚡ NEW
- **Within Specialists**: Teams now run concurrently with `asyncio.gather()` ⚡ NEW
- **MCP Agents**: Run concurrently (8 concurrent by default)
- **Multi-Shop**: Supports processing multiple shops simultaneously
- **Database**: PostgreSQL handles concurrent writes efficiently

### Scalability (Updated Nov 2025)

```
Current Capacity (Single Server) - AFTER OPTIMIZATION:
- 100 anomalies/day: ~0.5-1 hour processing (was 8-10 hours) ⚡ 90% faster
- 1,000 insights/day: ~3-5 hours processing (was 20-30 hours) ⚡ 80% faster
- 50 shops: Real-time processing during business hours (was overnight only)

Bottlenecks (Updated):
1. OpenAI API rate limits (TPM, RPM) - still main bottleneck
2. MCP agent execution time (48 agents × 30-60 min) - unchanged
3. Database write throughput (minimal impact) - unchanged
4. ✅ Validation loop - RESOLVED (was major bottleneck)
5. ✅ Sequential team execution - RESOLVED (now parallel)

Scaling Strategies:
1. Horizontal: Multiple servers for different shops
2. Vertical: Faster MCP execution with parallel processing
3. Caching: Reuse MCP reports for similar queries
4. Batch optimization: Process insights in larger batches
5. ✅ Smart routing: Skip low-value specialists (IMPLEMENTED)
6. ✅ Parallel execution: Run specialists concurrently (IMPLEMENTED)
```

**Optimization Impact**:
- **Before**: Could process 20-30 anomalies per day (overnight batch)
- **After**: Can process 100+ anomalies per day (real-time + batch)
- **Improvement**: 3-5x throughput increase

---

## 🔒 Security & Multi-Tenancy

### Shop Isolation

```
┌────────────────────────────────────────────────────────┐
│              MULTI-TENANT ISOLATION                     │
├────────────────────────────────────────────────────────┤
│                                                         │
│  1. Database Level                                     │
│     - All queries filtered by shop_id                  │
│     - Foreign key constraints enforce relationships    │
│     - Row-level security (planned)                     │
│                                                         │
│  2. OAuth Credentials                                  │
│     - Per-shop tokens in Integration table             │
│     - Automatic credential resolution                  │
│     - Temporary credential files (deleted after use)   │
│                                                         │
│  3. Code Execution Sandbox                             │
│     - SecurePythonSandbox per shop_id                  │
│     - RestrictedPython prevents cross-shop access      │
│     - Blocked patterns: os, subprocess, __import__     │
│                                                         │
│  4. MCP Workbench                                      │
│     - ShopLockedMCPModule enforces shop_id             │
│     - All MCP tool calls automatically scoped          │
│     - No cross-shop data leakage possible              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Details**: See [MULTI_TENANT.md](MULTI_TENANT.md) and [MCP_INTEGRATION.md](MCP_INTEGRATION.md)

---

## 📊 Success Metrics

### System Health

- **Anomaly Processing Success Rate**: Target > 95%
- **Insight Processing Success Rate**: Target > 90%
- **Recommendation Quality Score**: Target > 4.0/5.0 (manual review)
- **API Uptime**: Target > 99%

### Business Impact

- **Recommendations per Day**: 50-200 (depending on shop activity)
- **Action Taken Rate**: Track client implementation
- **Revenue Impact**: Track ROI of implemented recommendations

---

## 🔄 Next Steps

After understanding the system overview:

### Core Documentation
1. **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** - Understand data structure
2. **[MULTI_TENANT.md](MULTI_TENANT.md)** - Learn multi-tenant architecture
3. **[OAUTH_INTEGRATION.md](OAUTH_INTEGRATION.md)** - Setup OAuth integrations
4. **[MCP_INTEGRATION.md](MCP_INTEGRATION.md)** - Understand MCP approach

### Agent System
5. **[AGENTS_MASTER.md](AGENTS_MASTER.md)** - Deep dive into master agents
6. **[AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md)** - Understand specialist teams
7. **[AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)** - Learn about 48 MCP agents

### Performance & Optimization ⚡ NEW
8. **[OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)** - Complete optimization guide
9. **[BEFORE_AFTER_COMPARISON.md](BEFORE_AFTER_COMPARISON.md)** - Visual performance comparison

### Usage
10. **[CLI_REFERENCE.md](CLI_REFERENCE.md)** - Start using the system
11. **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Extend and customize

---







---

## 🔄 Next Steps

After understanding the system overview:

### Core Documentation
1. **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** - Understand data structure
2. **[MULTI_TENANT.md](MULTI_TENANT.md)** - Learn multi-tenant architecture
3. **[OAUTH_INTEGRATION.md](OAUTH_INTEGRATION.md)** - Setup OAuth integrations
4. **[MCP_INTEGRATION.md](MCP_INTEGRATION.md)** - Understand MCP approach

### Agent System
5. **[AGENTS_MASTER.md](AGENTS_MASTER.md)** - Deep dive into master agents
6. **[AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md)** - Understand specialist teams
7. **[AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)** - Learn about 48 MCP agents

### Performance & Optimization ⚡ NEW
8. **[OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)** - Complete optimization guide
9. **[BEFORE_AFTER_COMPARISON.md](BEFORE_AFTER_COMPARISON.md)** - Visual performance comparison

### Usage
10. **[CLI_REFERENCE.md](CLI_REFERENCE.md)** - Start using the system
11. **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Extend and customize

---





