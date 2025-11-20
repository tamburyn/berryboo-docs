# CLI Reference - Complete Command Guide

**BerryBoo AI Command Line Interface**

> **Prerequisites**: Read [Start Here](/start-here) and [System Overview](/system-overview) first.

---

This document provides a complete reference for all CLI commands in the BerryBoo AI system. Commands are organized by category for easy navigation.

## Quick Start

```bash
cd backend/src/ai
python main.py --help
```

---

# BerrybooAI CLI - Command Line Interface

## 🎯 Overview

Complete Command Line Interface (CLI) for testing, managing, and monitoring BerrybooAI agents based on AutoGen 0.7.4. The CLI enables Master Agent testing, PostgreSQL database access, and system configuration management.

## 🚀 Launch

cd /Users/adrianlewtak/Documents/GitHub/beryboo-app/backend/src/ai
python main.py 

**Interactive Shop Selection**: When you launch the CLI, you'll be prompted to select a shop for testing. The system now supports multi-shop testing with the following shops:
- mitko
- ekogram
- frsc
- kambukka
- neonail
- foodsbyann
- runcolors
- acusmed (default)

All shop configurations (shop_id, property_id, account IDs) are automatically loaded from `config/shops.json`.

### Basic setup
```bash
# Activate environment
source venv/bin/activate

# CLI
python main.py 

# Main help
python main.py --help





## 📋 Available Commands

### 🚀 **New Production Commands** - **PRODUCTION RECOMMENDATION PIPELINE**

#### 🎯 `preprocess-and-route` - Complete Production Workflow ✅ **NEW**

**Description:** Complete workflow: Master Agent preprocessing → Specialist Teams → Recommendation Formatter → Production Database Save + Terminal Display

```bash
python main.py preprocess-and-route
```

**Auto Configuration (Interactive Mode):**
- **Shop**: Selected from interactive menu (8 available shops)
- **Property ID**: Automatically loaded from shop configuration
- **Anomaly Count**: Maximum 15 anomalies from last 3 days
- **Real Data**: Uses real anomalies from database (default: true)

**Production Pipeline Flow:**
1. **Master Agent** → Fetches and preprocesses up to 15 anomalies from last 3 days
2. **Specialist Teams** → Performance Marketing + SEO + UX analysis (12 agents total)
3. **Recommendation Formatter** → Converts technical analysis to Polish business format
4. **Final Validator** → Validates, saves to ai_recommendations table, displays in terminal

**Expected Output per Anomaly:**
```
🎯 PRODUCTION RECOMMENDATION
================================================================================

📋 Optymalizacja kampanii Google Ads

💰 BUSINESS IMPACT:
Szacowany ROI +25%

📝 RECOMMENDATION:
Zwiększ budżet na najlepiej konwertujące kampanie i dodaj negative keywords. 
Przewidywany wzrost konwersji o 25%.

📊 DETAILED ANALYSIS:
Analiza pokazuje, że kampanie z CPC poniżej 2.50 PLN generują 40% więcej konwersji.
Rekomendujemy zwiększenie budżetu o 30% dla kampanii 'Brand Keywords' i 'Product Categories'...

📊 METADATA:
• Domain: PERFORMANCE_MARKETING
• Confidence: 85%
• Priority: HIGH
• Database ID: abc12345...

SUCCESS: Saved recommendation to database
FINAL_APPROVED
```

---

### 🤖 **Proactive MCP Insights Pipeline** - **NEW DUAL-TRACK SYSTEM**

BerrybooAI now operates with **two parallel recommendation pipelines**:

1. **Reactive Pipeline** (Existing): Responds to detected anomalies
2. **Proactive Pipeline** (New): Analyzes comprehensive MCP reports for opportunities

Both pipelines converge at specialist teams and produce identical Polish `ProductionRecommendation` output.

#### 🎯 `run-daily-insights` - Complete Proactive Pipeline ✅ **RECOMMENDED**

**Description:** Complete daily proactive pipeline - generates MCP reports (48 agents) and analyzes them through ProactiveMasterAgent.

```bash
python main.py run-daily-insights
```

**Shop Selection:**
- **Interactive Mode**: Uses shop selected at start of CLI session
- **Command Line Mode**: Specify with `--shop-id` and `--property-id` flags

**Auto Configuration (Interactive Mode):**
- **Shop**: Selected from interactive menu (8 available shops)
- **Duration**: ~60 minutes (all 48 agents + analysis)
- **Frequency**: Recommended daily (cron at 6:00 AM)

**Pipeline Flow:**
1. **Step 1/2**: `generate-mcp-reports` (all sources) → 48 specialized agents → ai_insights table (~45 min)
2. **Step 2/2**: `analyze-insights` → ProactiveMasterAgent → Specialist Teams → Polish recommendations (~15 min)

**Cron Setup:**
```bash
# Add to crontab for daily execution
0 6 * * * cd /path/to/beryboo-app/backend/src/ai && python main.py run-daily-insights >> /var/log/insights.log 2>&1
```

**Output:**
```
📅 Daily Proactive Insights Pipeline
Shop: cac9d883-015f-478e-a93f-32ef401582a3
Property: 326784853
Estimated time: 60 minutes

Step 1/2: Generating MCP reports...

━━━ GA4 Agents ━━━
Running 10 specialized agents sequentially...
  → ConversionFunnelAnalyst... ✓
  → CustomerLifetimeValueStrategist... ✓
  → ProductPerformanceOptimizer... ✓
  ...
✓ GA4: 10 insights saved

━━━ GSC Agents ━━━
...
✓ GSC: 10 insights saved

[Total: 48 insights generated]

Step 2/2: Analyzing insights...
🧠 ProactiveMasterAgent
✓ Generated 48 InsightPackages
✓ Routed to specialist teams
✓ Saved 48 Polish recommendations

🎉 Daily pipeline complete!
```

---

#### 🎯 `preprocess-batch-all-shops` - Multi-Shop Batch Preprocessing ✅ **NEW**

**Description:** Processes anomalies from the last 3 days for all configured shops with parallel processing (2 shops concurrently) and saves production recommendations to PostgreSQL.

```bash
python main.py preprocess-batch-all-shops
```

**Auto Configuration:**
- **Shops**: 8 configured shops (hardcoded list)
- **Days**: 3 days (hardcoded, not configurable)
- **Mode**: Parallel processing (2 shops concurrently)
- **Anomaly Limit**: Top 20 anomalies per shop (ordered by business_impact DESC)
- **OAuth**: Dynamic per-shop credentials
- **Database**: Production recommendations saved per shop to ai_recommendations table
- **Speedup**: ~10x faster than sequential processing

**Shop/Property Mapping:**
- Shop 1: `a31fa347-0e95-44b0-a741-b6c202e14f09` → Property `252624238`
- Shop 2: `0ebee141-0365-4a39-9310-d4f2796549a6` → Property `326166860`
- Shop 3: `8d88dc99-8b6d-4db5-acd1-ecacf51b3cdb` → Property `314733767`
- Shop 4: `71dd37c3-e828-4447-9e0b-9f8e0594ab9d` → Property `273632523`
- Shop 5: `4f3c00c3-2399-42af-a38a-e632a5175836` → Property `297597365`
- Shop 6: `e140cbe0-2245-41e4-bf91-4577b007192e` → Property `337916499`
- Shop 7: `5596eabe-bc8c-4fe9-8613-b20d4167b2e6` → Property `338625884`
- Shop 8: `cac9d883-015f-478e-a93f-32ef401582a3` → Property `326784853`

**Pipeline Flow per Shop:**
1. Fetch top 20 anomalies from last 3 days (ordered by business_impact DESC)
2. Master Agent preprocessing → AnomalyPackage
3. Specialist Teams → Production recommendations
4. Save to ai_recommendations table (same as single-shop flow)

**Performance:**
- **Before**: 8 shops × 100 anomalies × 5 min = ~40 hours sequential
- **After**: 8 shops ÷ 2 concurrent × 20 anomalies × 5 min = ~4 hours
- **Resource Management**: Uses `asyncio.Semaphore(2)` to limit concurrent shops

**Output:**
- Per-shop progress indicators (shows concurrent shops)
- Final summary with totals (processed, successes, failures, recommendations saved)
- Error handling per shop (continues on failure, one shop failure doesn't stop others)

---

#### 🎯 `run-daily-insights-all-shops` - Multi-Shop Daily Insights Pipeline ✅ **NEW**

**Description:** Complete daily proactive pipeline for all configured shops with parallel processing (2 shops concurrently) and saves production recommendations to PostgreSQL.

```bash
python main.py run-daily-insights-all-shops
```

**Auto Configuration:**
- **Shops**: 8 configured shops
- **Duration**: ~4 hours total (~60 min per shop, 2 concurrent)
- **Mode**: Parallel execution (2 shops concurrently)
- **OAuth**: Dynamic per-shop credentials
- **Database**: Production recommendations saved per shop to ai_recommendations table
- **Speedup**: ~2x faster than sequential processing

**Pipeline Flow per Shop:**
1. Generate MCP reports (all sources) → 48 specialized agents → ai_insights table
2. Analyze insights → ProactiveMasterAgent → Specialist Teams → ai_recommendations table

**Performance:**
- **Before**: 8 shops × 60 min = ~8 hours sequential
- **After**: 8 shops ÷ 2 concurrent × 60 min = ~4 hours
- **Resource Management**: Uses `asyncio.Semaphore(2)` to limit concurrent shops

**Cron Setup:**
```bash
# Run nightly for all shops (parallel processing)
0 2 * * * cd /path/to/beryboo-app/backend/src/ai && python main.py run-daily-insights-all-shops >> /var/log/multi_shop_insights.log 2>&1
```

---

#### 🔍 `generate-mcp-reports` - Run MCP Specialized Agents

**Description:** Runs 48 specialized MCP agents across 5 data sources and saves structural reports to the `ai_insights` table.

```bash
# All sources (recommended daily)
python main.py generate-mcp-reports

# Only selected sources
python main.py generate-mcp-reports --sources ga4,gsc
python main.py generate-mcp-reports --sources google_ads,meta_ads

# Custom shop/property
python main.py generate-mcp-reports --shop-id UUID --property-id ID
```

**Options:**
- `--shop-id TEXT` - Shop ID (defaults to DEFAULT_SHOP_ID)
- `--property-id TEXT` - Property ID (defaults to DEFAULT_PROPERTY_ID)
- `--sources TEXT` - MCP sources: `ga4,gsc,pagespeed,google_ads,meta_ads` or `all` (default: all)

**MCP Sources Breakdown:**

| Source | Agents | Focus Area |
|--------|--------|------------|
| **GA4** | 10 | Conversion funnels, customer LTV, product performance, engagement, mobile, geo expansion, attribution, seasonal trends, checkout, data quality |
| **GSC** | 10 | Search performance, technical SEO, content gaps, keywords, page experience, mobile SEO, indexing, SERP features, site structure, competitive intelligence |
| **PageSpeed** | 8 | Core Web Vitals, mobile performance, page load, SEO audit, images, JavaScript, CSS, caching |
| **Google Ads** | 10 | Campaign optimization, creative performance, keyword strategy, audience targeting, bidding, landing pages, ad copy, video, shopping, account structure |
| **Meta Ads** | 10 | Campaign analysis, creative optimization, audience targeting, ad copy, bidding, landing pages, geographic targeting, video, funnel optimization, account structure |

**What it does:**
1. Sequential execution per MCP source (prevents rate limiting)
2. Each agent runs analysis and generates structured JSONB report
3. Reports saved to `ai_insights` table with metadata:
   - `mcp_source`: Source identifier (ga4, gsc, etc.)
   - `agent_name`: Specialized agent name
   - `report_data`: Structured JSONB with executive_summary, insights, opportunities, risks
   - `insight_priority`: Calculated priority (critical, high, medium, low)
   - `confidence_score`: Analysis confidence (0.0-1.0)
   - `business_impact`: Impact assessment
4. Status set to `generated`, ready for ProactiveMasterAgent

**Execution Time:**
- GA4: ~10 min (10 agents)
- GSC: ~10 min (10 agents)
- PageSpeed: ~8 min (8 agents)
- Google Ads: ~10 min (10 agents)
- Meta Ads: ~10 min (10 agents)
- **Total: 30-60 minutes** (sequential execution)

**Output Example:**
```
🤖 MCP Report Generation
Shop: cac9d883-015f-478e-a93f-32ef401582a3
Property: 326784853
Sources: ga4, gsc, pagespeed, google_ads, meta_ads
Agents: 48 total

━━━ GA4 Agents ━━━
Running 10 specialized agents sequentially...

  → ConversionFunnelAnalyst... ✓
  → CustomerLifetimeValueStrategist... ✓
  → ProductPerformanceOptimizer... ✓
  → UserEngagementAnalyst... ✓
  → MobileCommerceSpecialist... ✓
  → GeographicExpansionAnalyst... ✓
  → MarketingAttributionSpecialist... ✓
  → SeasonalTrendsForecaster... ✓
  → CheckoutOptimizationSpecialist... ✓
  → DataQualityAuditor... ✓

✓ GA4: 10 insights saved

━━━ GSC Agents ━━━
...

🎉 Complete!
Total insights generated: 48
Next step: run 'analyze-insights' to process these reports
```

---

#### 🧠 `analyze-insights` - Process MCP Reports with ProactiveMasterAgent

**Description:** Analyzes unprocessed insights from `ai_insights` using ProactiveMasterAgent, routes to specialist teams, and generates Polish recommendations.

```bash
# Analyze all unprocessed insights
python main.py analyze-insights

# Filter by MCP source
python main.py analyze-insights --source ga4
python main.py analyze-insights --source google_ads

# Custom limit
python main.py analyze-insights --limit 100
```

**Options:**
- `--shop-id TEXT` - Shop ID (defaults to DEFAULT_SHOP_ID)
- `--property-id TEXT` - Property ID (defaults to DEFAULT_PROPERTY_ID)
- `--source TEXT` - Filter by MCP source (ga4, gsc, pagespeed, google_ads, meta_ads)
- `--limit INTEGER` - Maximum insights to process (default: 50)

**Processing Flow:**
1. **Fetch**: Unprocessed insights from `ai_insights` (where `processed_by_master = false`)
2. **Preprocess**: ProactiveMasterAgent converts each insight to `InsightPackage`
   - o3-mini powered intelligent analysis
   - Priority assessment (URGENT, HIGH, MEDIUM, LOW)
   - Confidence scoring (0.0-1.0)
   - Specialist routing decision (Performance/SEO/UX)
3. **Route**: InsightPackage → Appropriate specialist team (shared with reactive pipeline)
4. **Generate**: Specialist Teams → Polish `ProductionRecommendation`
5. **Save**: Recommendations saved to `ai_recommendations` with:
   - `source_type = 'mcp_report'`
   - `insight_id` = reference to source insight
6. **Mark**: Insight marked as processed (`processed_by_master = true`)

**Output Example:**
```
🧠 Proactive Insights Analysis
Shop: cac9d883-015f-478e-a93f-32ef401582a3
Property: 326784853
Source filter: all
Limit: 50

Processing MCP insights...

✓ Generated 48 InsightPackages

[Routing to specialist teams and generating recommendations...]

✓ Complete! 48 Polish recommendations saved to ai_recommendations

Note: View recommendations with 'view-recommendations --source-type mcp_report'
```

**InsightPackage Schema:**

The universal schema used by both reactive and proactive pipelines:

```python
class InsightPackage:
    # Source identification
    source_type: str          # 'anomaly' or 'mcp_report'
    source_id: str            # anomaly_id or insight_id
    
    # MCP-specific fields (proactive only)
    mcp_source: str           # 'ga4', 'gsc', 'pagespeed', 'google_ads', 'meta_ads'
    agent_name: str           # 'conversion_funnel_analyst', etc.
    report_summary: Dict      # Executive summary from MCP report
    key_insights: List[Dict]  # Structured insights array
    
    # Shared analysis (both reactive and proactive)
    priority_level: str       # URGENT, HIGH, MEDIUM, LOW
    business_impact_score: float
    confidence_score: float
    suggested_specialists: SpecialistRouting
```

---

#### 📊 `view-insights` - View ai_insights Table

**Description:** Browse and filter insights from the `ai_insights` table.

```bash
# View recent unprocessed insights
python main.py view-insights

# Filter by status
python main.py view-insights --status generated
python main.py view-insights --status processed

# Filter by MCP source
python main.py view-insights --source ga4
python main.py view-insights --source google_ads --limit 50

# Combined filters
python main.py view-insights --source gsc --status generated --limit 10
```

**Options:**
- `--shop-id TEXT` - Shop ID (defaults to DEFAULT_SHOP_ID)
- `--property-id TEXT` - Property ID (defaults to DEFAULT_PROPERTY_ID)
- `--status TEXT` - Status filter: `generated`, `processed`, or `all` (default: generated)
- `--source TEXT` - MCP source filter (ga4, gsc, pagespeed, google_ads, meta_ads)
- `--limit INTEGER` - Maximum results (default: 20)

**Output:**
```
┏━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━┓
┃ ID       ┃ MCP Source  ┃ Agent                         ┃ Priority ┃ Confidence ┃ Impact    ┃ Processed ┃ Created         ┃
┡━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━┩
│ a1b2c3d4 │ ga4         │ conversion_funnel_analyst     │ high     │ 0.87       │ high      │ ○         │ 2025-01-21 10:30│
│ e5f6g7h8 │ gsc         │ technical_seo_auditor         │ critical │ 0.92       │ critical  │ ○         │ 2025-01-21 10:32│
│ i9j0k1l2 │ pagespeed   │ core_web_vitals_analyst       │ high     │ 0.85       │ high      │ ○         │ 2025-01-21 10:35│
│ m3n4o5p6 │ google_ads  │ campaign_performance_analyst  │ medium   │ 0.78       │ medium    │ ✓         │ 2025-01-21 09:15│
│ q7r8s9t0 │ meta_ads    │ creative_performance_optimize │ high     │ 0.81       │ high      │ ○         │ 2025-01-21 10:40│
└──────────┴─────────────┴───────────────────────────────┴──────────┴────────────┴───────────┴───────────┴─────────────────┘

MCP Insights (5 results)
```

---

#### 📋 Updated: `view-recommendations` - View All Recommendations

Now supports filtering by `source_type` to separate reactive (anomaly-based) and proactive (MCP report-based) recommendations.

```bash
# View all recommendations (both types)
python main.py view-recommendations

# Filter by source type
python main.py view-recommendations --source-type anomaly
python main.py view-recommendations --source-type mcp_report

# Combine with other filters
python main.py view-recommendations --source-type mcp_report --priority high
```

**New Option:**
- `--source-type TEXT` - Filter by source: `anomaly` (reactive) or `mcp_report` (proactive)

**Database Schema:**
```sql
ai_recommendations:
  - source_type VARCHAR(32)  -- 'anomaly' or 'mcp_report'
  - insight_id UUID          -- FK to ai_insights (NULL for anomaly source)
  - anomaly_id UUID          -- FK to ai_general_anomalies (NULL for mcp_report source)
```

---

### 🏗️ Architecture Comparison: Reactive vs Proactive

| Aspect | **Reactive Pipeline** (Existing) | **Proactive Pipeline** (New) |
|--------|----------------------------------|------------------------------|
| **Trigger** | Anomaly detection | Daily scheduled MCP analysis |
| **Source Data** | `ai_general_anomalies` table | `ai_insights` table (MCP reports) |
| **Input Type** | Statistical anomalies | Comprehensive MCP reports (48 agents) |
| **Frequency** | Real-time / Hourly | Daily batch (cron) |
| **Coverage** | Problem detection | Opportunity discovery |
| **Agent** | ReactiveMasterAgent | ProactiveMasterAgent |
| **Preprocessing** | Anomaly statistical analysis | MCP report intelligent analysis |
| **Model** | o3-mini | o3-mini |
| **Output** | InsightPackage (source_type='anomaly') | InsightPackage (source_type='mcp_report') |
| **Routing** | → Specialist Teams (shared) | → Specialist Teams (shared) |
| **Final Output** | Polish ProductionRecommendation | Polish ProductionRecommendation |
| **Database** | `ai_recommendations` (source_type='anomaly') | `ai_recommendations` (source_type='mcp_report') |

**Unified Specialist Teams:**

Both pipelines converge at the same specialist teams, ensuring consistent recommendation quality:
- **Performance Marketing Team**: Campaign optimization, ROAS, conversions
- **SEO Technical Team**: Organic search, rankings, technical SEO
- **UX/Conversion Team**: Page speed, user experience, checkout optimization

**Complete Flow Diagram:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     DUAL-TRACK RECOMMENDATION SYSTEM                     │
└─────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────┐        ┌────────────────────────────────────┐
│   REACTIVE PIPELINE        │        │    PROACTIVE PIPELINE              │
│   (Problem Detection)      │        │    (Opportunity Discovery)         │
└────────────────────────────┘        └────────────────────────────────────┘
             │                                         │
             │                                         │
    ┌────────▼─────────┐                  ┌───────────▼────────────┐
    │   Anomaly        │                  │   MCP Specialized      │
    │   Detection      │                  │   Agents (48)          │
    └────────┬─────────┘                  └───────────┬────────────┘
             │                                         │
             │                                         │
  ┌──────────▼──────────────┐              ┌──────────▼─────────────────┐
  │ ai_general_anomalies    │              │ ai_insights                │
  │ (Statistical anomalies) │              │ (Structured MCP reports)   │
  └──────────┬──────────────┘              └──────────┬─────────────────┘
             │                                         │
             │                                         │
   ┌─────────▼──────────┐                  ┌──────────▼──────────────┐
   │ ReactiveMasterAgent│                  │ ProactiveMasterAgent    │
   │ (o3-mini)          │                  │ (o3-mini)               │
   └─────────┬──────────┘                  └──────────┬──────────────┘
             │                                         │
             │                                         │
             └─────────────┬───────────────────────────┘
                           │
                  ┌────────▼─────────┐
                  │  InsightPackage  │
                  │  (Universal)     │
                  └────────┬─────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
   ┌────────▼────────┐ ┌──▼───────┐ ┌───▼──────────┐
   │ Performance     │ │ SEO      │ │ UX/Conv      │
   │ Marketing Team  │ │ Tech Team│ │ Team         │
   └────────┬────────┘ └──┬───────┘ └───┬──────────┘
            │              │              │
            └──────────────┼──────────────┘
                           │
                  ┌────────▼──────────┐
                  │ Recommendation    │
                  │ Formatter         │
                  └────────┬──────────┘
                           │
                  ┌────────▼──────────┐
                  │ Final Validator   │
                  └────────┬──────────┘
                           │
                  ┌────────▼──────────────────┐
                  │ ai_recommendations        │
                  │ (Polish Production Recs)  │
                  │ - source_type: anomaly /  │
                  │   mcp_report              │
                  └───────────────────────────┘
```

---

## 🌐 MCP Services - **Available Integrations**

○ → 📊 **Google Analytics 4** – Ecommerce analytics and insights
○ → 🎯 **Google Ads** – Campaign performance and PPC optimization  
○ → 💎 **Meta Ads** – Facebook & Instagram advertising
○ → 🔍 **Google Search Console** – SEO performance and organic search optimization
○ → 🚀 **Google PageSpeed Insights** – Website performance and Core Web Vitals optimization

---

## 🌐 MCP Server Integration - **MODEL CONTEXT PROTOCOL**

Model Context Protocol (MCP) enables BerrybooAI agents to access real-time external data sources through standardized tool interfaces. Unlike PostgreSQL (historical data), MCP provides live, conversational access to third-party APIs.

### **What is MCP?**
- **Real-time Data Access**: Query live APIs conversationally instead of SQL
- **Standardized Tools**: Universal protocol for AI tool integration
- **AutoGen Native**: Built-in support via `McpWorkbench` and `StdioServerParams`
- **External Services**: Google Analytics, web browsing, file systems, and more

### **When to Use MCP vs PostgreSQL:**
| Use Case | MCP Servers | PostgreSQL |
|----------|-------------|------------|
| Real-time queries | ✅ Perfect | ❌ Historical only |
| Ad-hoc exploration | ✅ Conversational | ⚠️ Requires SQL |
| Production pipelines | ⚠️ API limits | ✅ Optimized |
| Historical analysis | ❌ Limited | ✅ Perfect |
| Anomaly processing | ❌ No storage | ✅ Optimized |

---

### 🎯 `chat-ga4` - Google Analytics 4 Conversational Assistant ✅ **PRODUCTION-READY**

**Description:** Conversational GA4 assistant with access to real-time data through Model Context Protocol. Ask questions in natural language instead of writing API queries.

```bash
python main.py chat-ga4
```

**🚀 Quick Start:**
```bash
# Terminal 1: Start MCP server (one-time setup)
cd /Users/adrianlewtak/Documents/GitHub/beryboo-app/backend/src/ai
./scripts/start-mcp-server.sh ~/.config/gcloud/application_default_credentials.json 8932

# Terminal 2: Start conversational chat
python main.py chat-ga4 --property-id 326784853
```

**Auto Configuration:**
- **Shop ID**: `cac9d883-015f-478e-a93f-32ef401582a3` (from settings)
- **Property ID**: Auto-detected from database or specify with `--property-id`
- **Credentials**: `~/.config/gcloud/application_default_credentials.json` (OAuth)
- **MCP Server**: Starts automatically in stdio mode

**Prerequisites (First-Time Setup):**
1. **Google Cloud Authentication**:
   ```bash
   gcloud auth application-default login \
     --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform \
     --client-id-file=./mcp-server/config/client-secrets-desktop.json
   ```
   
2. **Enable APIs** in Google Cloud Console:
   - Google Analytics Admin API
   - Google Analytics Data API

**📊 Interactive Session Example:**
```
🤖 GA4 Conversational Assistant
────────────────────────────────────────────────────────────
✓ Connected to GA4 property: 326784853
Shop: cac9d883-015f-478e-a93f-32ef401582a3
Credentials: /Users/.../.config/gcloud/application_default_credentials.json
Available tools: run_report, run_realtime_report, get_property_details, 
                get_account_summaries, get_custom_dimensions_and_metrics, 
                list_google_ads_links

Type 'exit', 'quit', or 'q' to end session

[You] How many users yesterday?

[Agent] Yesterday, there were 8,337 active users on your site. This indicates 
a healthy level of engagement, which is essential for maintaining your 
business momentum.

[You] Compare sessions this week vs last week

[Agent] This week (Oct 9-15): 8,421 sessions (+11.9% increase)
Last week (Oct 2-8): 7,523 sessions

The growth trend is positive. Traffic quality remains consistent with 
average session duration of 3m 42s.

[You] What's happening right now?

[Agent] Right now you have 23 active users on your site. Top pages:
1. /produkty/category-name (8 users)
2. / (homepage) (6 users)  
3. /koszyk (checkout) (4 users)

[You] exit

Cleaning up...
✓ Session ended
```

**Options:**
- `--shop-id TEXT` - Shop ID (defaults to settings)
- `--property-id TEXT` - GA4 Property ID (required if no database mapping)
- `--credentials-path TEXT` - Custom Google Cloud credentials path

**Usage examples:**
```bash
# Use default configuration
python main.py chat-ga4

# Specify property explicitly
python main.py chat-ga4 --property-id 326784853

# Use different shop
python main.py chat-ga4 --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853

# Custom credentials location
python main.py chat-ga4 --credentials-path /path/to/credentials.json
```

**💡 Sample Queries:**
- **Historical data**: "How many users yesterday?"
- **Comparisons**: "Compare sessions this week vs last week"
- **Metrics analysis**: "What's my bounce rate for mobile users?"
- **Segmentation**: "Show top 5 traffic sources by conversions"
- **Real-time**: "How many people are on my site right now?"
- **Property info**: "What custom dimensions do I have?"
- **Performance**: "Show me revenue by device category last 30 days"

**🛠️ Available MCP Tools (6 total):**

1. **`run_report`** - Core historical reports
   - Custom date ranges (yesterday, 7daysAgo, YYYY-MM-DD)
   - 50+ dimensions (date, source, device, country, page, etc.)
   - 100+ metrics (users, sessions, revenue, conversions, etc.)
   - Multiple date range comparisons
   - Filters and segments

2. **`run_realtime_report`** - Real-time data (last 30 min)
   - Active users right now
   - Live event tracking
   - Current page views
   - Real-time conversions

3. **`get_account_summaries`** - List GA4 accounts & properties
   - All accessible accounts
   - Properties per account
   - Property names and IDs

4. **`get_property_details`** - Property configuration
   - Property name, timezone, currency
   - Industry category
   - Service level

5. **`get_custom_dimensions_and_metrics`** - Custom fields
   - List all custom dimensions
   - List all custom metrics
   - Field scope and type

6. **`list_google_ads_links`** - Connected advertising accounts
   - Google Ads account links
   - Campaign integration status

**📚 Complete Documentation:**
- **Full Guide**: `.ai/mcp/README.md`
- **Installation**: `.ai/mcp/installation.md`
- **OAuth Setup**: `.ai/mcp/oauth_setup.md` ⭐ **Start here for first-time setup**
- **Query Examples**: `.ai/mcp/query_examples.md`
- **Agent Integration**: `.ai/mcp/agent_integration.md`
- **CLI Usage**: `.ai/mcp/cli_usage.md`
- **Troubleshooting**: `.ai/mcp/troubleshooting.md`
- **Implementation**: `.ai/mcp/IMPLEMENTATION_SUMMARY.md`

**🏗️ Technical Architecture:**
```
User Query
    ↓
chat-ga4 CLI Command
    ↓
GA4ConversationalAgent (AutoGen)
    ├─> OpenAIChatCompletionClient (model: gpt-4.1)
    ├─> Conversation History Management
    └─> McpWorkbench (MCP Client)
        ↓
    StdioServerParams (stdio mode)
        ↓
    Google Analytics MCP Server (Python subprocess)
        ├─> analytics_mcp.server
        └─> 6 registered tools
            ↓
    Google Analytics Data API v1 (REST)
        ↓
    GA4 Property Data (Real-time + Historical)
```

**🔄 Tool Calling Flow (WorkbenchAgent Pattern):**
1. User sends question → Added to conversation history
2. Model receives question + 6 MCP tool definitions
3. Model decides which tool(s) to call (e.g., `run_report`)
4. McpWorkbench executes tool via MCP server subprocess
5. Tool result returned to model
6. Model synthesizes natural language answer
7. Loop continues if model needs more data

**🔐 Security & Isolation:**
- **Shop-level isolation**: Each agent instance tied to specific shop_id
- **Property validation**: Verifies shop-property mapping in database
- **OAuth credentials**: User-level authentication (read-only scope)
- **Service accounts** (planned): Production deployment with per-shop isolation

**⚡ Performance:**
- **Startup time**: ~2-3 seconds (MCP server initialization)
- **Query latency**: 3-8 seconds (API call + model reasoning)
- **Concurrent sessions**: Supported (separate MCP server per session)
- **Rate limits**: Google Analytics API quotas apply

**🚨 Troubleshooting:**

| Issue | Solution |
|-------|----------|
| `No OAuth credentials` | Run `gcloud auth application-default login` (see `.ai/mcp/oauth_setup.md`) |
| `MCP server connection failed` | Check credentials path, ensure analytics APIs enabled |
| `Property not found` | Verify property ID with `--property-id`, check access permissions |
| `Tool execution timeout` | Large date ranges may be slow, try smaller ranges |

**✅ Production Status:**
- ✅ **OAuth Authentication**: Working with Desktop App credentials
- ✅ **MCP Server**: Python-based, stdio mode connection
- ✅ **Tool Integration**: All 6 tools tested and operational
- ✅ **Conversational Interface**: Natural language queries working
- ✅ **Real-time Data**: Live active users and events
- ✅ **Historical Reports**: Custom date ranges and dimensions
- 🔄 **Service Accounts**: Planned for production deployment
- 🔄 **Database Mapping**: Shop-property relationships (optional)

---

### 1. 🤖 `preprocess-console` — Streamed Single Anomaly Test (AssistantAgent)

Description: Runs new Master Agent (AssistantAgent) in streaming mode in console and prints final validated JSON (`AnomalyPackage`).

```bash
python main.py preprocess-console \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --use-real-data \
  --show-thinking \
  --model o3-mini
```

Options:
- `--shop-id TEXT` (required)
- `--property-id TEXT`
- `--use-real-data` (fetch 1 anomaly from database; without flag uses synthetic data)
- `--show-thinking` (show statistics in console with `Console`)
- `--openai-key TEXT` (optional key override for test)
- `--model TEXT` (optional model override, e.g. `o3-mini`)

---

### 2. 🤖 `test-master-agent` - Enhanced Master Agent Test (legacy)

**Opis:** Zaawansowany test Master Agent z rzeczywistymi danymi, szczegółowym logowaniem i verifikacją wszystkich narzędzi

```bash
python main.py test-master-agent [OPTIONS]
```

**Options:**
- `--shop-id TEXT` (required) - Shop ID for agent isolation
- `--property-id TEXT` - Property ID for data filtering
- `--openai-key TEXT` - OpenAI API key (override from .env)
- `--model TEXT` - OpenAI Model (o3-mini, gpt-4o-mini, gpt-4o, gpt-4-turbo)
- `--use-real-data` - Use real data from PostgreSQL database
- `--show-thinking` - Show detailed agent thinking
- `--test-tools` - Test all agent tools individually

**Usage examples:**
```bash
# Basic test with detailed logging
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --show-thinking

# Test with real data from database
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --use-real-data \
  --show-thinking

# Full test with tools and premium model
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --model o3-mini \
  --use-real-data \
  --show-thinking \
  --test-tools

# Debug mode for detailed logs
python main.py --debug test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --use-real-data \
  --show-thinking
```

**What it tests:**
- ✅ **Setup & Initialization** - OpenAI client, database connection, agent context & memory
- ✅ **Tools Testing** - individual testing of all 5 agent tools
- ✅ **Agent Reasoning** - detailed analysis with real or dummy data
- ✅ **Health Check** - agent status, active processes, resource tracking
- ✅ **Model Flexibility** - testing different OpenAI models
- ✅ **Database Integration** - fetching and analyzing real anomalies
- ✅ **Memory Management** - testing agent memory system
- ✅ **Langfuse Integration** - tracing and monitoring AI operations

**Example output:**
```
╭─────────────── BerrybooAI Enhanced Agent Test ───────────────╮
│ Enhanced Master Agent Test                                    │
│ Shop ID: cac9d883-015f-478e-a93f-32ef401582a3               │
│ Property ID: 326784853                                        │
│ Model: gpt-4o                                                │
│ Real Data: ✓                                                 │
│ Show Thinking: ✓                                             │
│ Test Tools: ✓                                               │
╰───────────────────────────────────────────────────────────────╯

🚀 Starting Enhanced Master Agent Test
✓ OpenAI client initialized
✓ Database connection successful
✓ Master Agent initialized

🛠️ Testing Agent Tools
Testing tool: fetch_anomalies_for_shop
✓ Result: Fetched anomalies data: 1247 characters

Testing tool: get_summary_for_shop  
✓ Result: Generated summary: 892 characters

Testing tool: safe_calculate
✓ Result: Calculation result: 681.0

Testing tool: calc_percentage_change
✓ Result: Percentage change: +45.4% (significant increase)

Testing tool: calc_financial_impact
✓ Result: Financial impact: +2,041.50 PLN over 3 days

🧠 Testing Agent Reasoning
Fetching real anomaly data from database...
✓ Found real anomaly: 8f2e4d91-2b7a-4c9f-8a3e-1d5c6b9a7e2f

Real Anomaly Data:
{
  "id": "8f2e4d91-2b7a-4c9f-8a3e-1d5c6b9a7e2f",
  "date": "2025-01-03T10:30:00Z",
  "metric": "total_revenue", 
  "z_score": 3.2,
  "pct_delta": 40.5,
  "impact_score": 5000.0,
  "business_impact_direction": "POSITIVE"
}

Running Master Agent analysis on real data...

🧠 Agent Analysis Result:
╭─ Master Agent Reasoning ─╮
│ Based on the anomaly     │
│ data analysis:           │
│                          │
│ 1. PRIORITY: HIGH        │
│ 2. IMPACT: +4,500 PLN    │ 
│ 3. TREND: 3 days up      │
│ 4. RECOMMENDATION:       │
│    - Increase budget     │
│    - Monitor closely     │
│    - Scale winning       │
│      campaigns           │
╰──────────────────────────╯

📊 Agent Status & Health Check
┏━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Metric             ┃ Value                                                     ┃
┡━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ status             │ healthy                                                   │
│ shop_id            │ cac9d883-015f-478e-a93f-32ef401582a3                     │
│ active_processes   │ 0                                                         │
│ model_client_ready │ True                                                      │
│ uptime             │ 2025-01-03T14:25:30.123456                              │
└────────────────────┴───────────────────────────────────────────────────────────┘

✓ Resources cleaned up
```

---

### 4. 🧪 **Nested Architecture Testing Commands** - **NEW**

#### 4.1 `test-performance-team` - Test Performance Marketing Sub-Team

**Description:** Tests 4-agent Performance Marketing consultancy team (Schema → Research → Strategy → Validation)

```bash
python main.py test-performance-team --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853 --test-mode
```

**What it tests:**
- ✅ **Performance Schema Agent** (`gpt-4o-mini`) - Database & ads data analysis
- ✅ **Performance Research Agent** (`gpt-4o-mini`) - Market & competitive intelligence
- ✅ **Performance Strategist Agent** (`gpt-4.1`) - Advanced campaign optimization
- ✅ **Performance Validator Agent** (`gpt-4.1`) - Quality control & validation
- ✅ **SelectorGroupChat workflow** - Sequential expert consultancy flow
- ✅ **Live logging** - Real-time API calls and agent events
- ✅ **Rate limit handling** - Automatic retry with fallback tasks

#### 4.2 `test-seo-team` - Test SEO Specialist Sub-Team ✅ **IMPLEMENTED**

**Description:** Tests 4-agent SEO Specialist consultancy team (Schema → Research → Strategy → Validation)

```bash
python main.py test-seo-team --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853 --test-mode
```

**What it tests:**
- ✅ **SEO Schema Agent** (`gpt-4o-mini`) - Organic traffic & GA4 data analysis
- ✅ **SEO Research Agent** (`gpt-4o-mini`) - Competitive & content intelligence
- ✅ **SEO Strategist Agent** (`gpt-4.1`) - Advanced SEO tactics & technical optimization
- ✅ **SEO Validator Agent** (`gpt-4.1`) - Quality control & SEO validation
- ✅ **SelectorGroupChat workflow** - Sequential expert consultancy flow
- ✅ **Live logging** - Real-time API calls and agent events
- ✅ **Rate limit handling** - Automatic retry with fallback tasks

#### 4.3 `test-ux-team` - Test UX Specialist Sub-Team ✅ **NEW**

**Description:** Tests 4-agent UX Specialist consultancy team with web browsing and screenshot analysis

```bash
python main.py test-ux-team --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853 --test-mode
```

**What it tests:**
- ✅ **UX Schema Agent** (`gpt-4o-mini`) - Conversion funnel & data analysis
- ✅ **UX Research Agent** (`gpt-4.1` + MultimodalWebSurfer) - Live website browsing & screenshot analysis
- ✅ **UX Strategist Agent** (`gpt-4.1`) - CRO tactics & design optimization
- ✅ **UX Validator Agent** (`gpt-4.1`) - Quality control & conversion impact validation
- ✅ **Web Browsing Integration** - Live website analysis with screenshot capture
- ✅ **Mobile Testing** - Responsive design and mobile UX analysis
- ✅ **Sequential workflow** - Schema → Research → Strategy → Validation

**Unique Features:**
- 🌐 **Live Website Analysis** - Real-time browsing and screenshot capture
- 📱 **Mobile Responsiveness Testing** - Device-specific UX analysis
- 🔍 **Visual Evidence Collection** - Screenshot-based UX insights
- 🏪 **Website Auto-Detection** - Automatic URL resolution from ai_shop_knowledge_base
- 🗑️ **Auto-Cleanup** - Temporary files automatically removed after analysis

**Model Configuration:**
- **Data Processing**: `gpt-4o-mini` (200k tokens/min) for Schema analysis
- **Strategic Reasoning**: `gpt-4.1` (30k tokens/min) for Research, Strategy & Validation
- **Web Browsing**: `gpt-4.1` (multimodal support) for MultimodalWebSurfer integration
- **Team Coordination**: `gpt-4.1` for SelectorGroupChat routing

**Test Data:**
- **Shop ID**: `cac9d883-015f-478e-a93f-32ef401582a3`
- **Property ID**: `326784853`
- **Website**: Auto-detected from knowledge base (acusmed.pl)
- **Scenario**: Mobile conversion optimization and checkout flow analysis

#### 4.4 `test-ux-nested-team` - Test UX Nested Architecture ✅ **NEW**

**Description:** Tests full 2-level hierarchical architecture (UX Specialist + Final Validator)

```bash
python main.py test-ux-nested-team --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853 --use-real-data
```

**Architecture:**
- **Level 1**: Master Coordination (UX Team + Final Validator)
- **Level 2**: UX Specialist sub-team (4-agent consultancy with web browsing)
- **Termination**: `UX_APPROVED` → `FINAL_APPROVED`

#### 4.5 `test-seo-nested-team` - Test SEO Nested Architecture ✅ **IMPLEMENTED**

**Description:** Tests full 2-level hierarchical architecture (SEO Specialist + Final Validator)

```bash
python main.py test-seo-nested-team --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853 --use-real-data
```

**Architecture:**
- **Level 1**: Master Coordination (SEO Team + Final Validator)
- **Level 2**: SEO Specialist sub-team (4-agent consultancy)
- **Termination**: `SEO_APPROVED` → `FINAL_APPROVED`

#### 4.6 `test-hierarchical-team` - Test Performance Nested Architecture ✅ **IMPLEMENTED**

**Description:** Tests full 2-level hierarchical architecture (Performance Marketing + Final Validator)

```bash
python main.py test-hierarchical-team --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853 --use-real-data
```

**Architecture:**
- **Level 1**: Master Coordination (Performance Team + Final Validator)
- **Level 2**: Performance Marketing sub-team (4-agent consultancy)
- **Termination**: `PERFORMANCE_APPROVED` → `FINAL_APPROVED`

#### 4.7 `test-multi-specialist-team` - Test Multi-Specialist Architecture ✅ **NEW**

**Description:** Tests complete multi-team architecture with Performance Marketing + SEO + UX teams

```bash
python main.py test-multi-specialist-team --shop-id cac9d883-015f-478e-a93f-32ef401582a3 --property-id 326784853 --use-real-data
```

**Architecture:**
- **Level 1**: Master Coordination (Performance + SEO + UX Teams + Final Validator)
- **Level 2**: 3 specialist sub-teams (12 agents total)
- **Intelligent Routing**: Content-based routing to appropriate specialist teams
- **Cross-Domain Coordination**: Multi-team collaboration and final consolidation
- **Termination**: `SPECIALIST_APPROVED` → `FINAL_APPROVED`

**Teams Included:**
- 🎯 **Performance Marketing Team** (4 agents) - Campaign optimization
- 🔍 **SEO Specialist Team** (4 agents) - Organic traffic optimization
- 🎨 **UX Specialist Team** (4 agents) - Conversion optimization with web browsing
- ✅ **Master Validator** - Cross-domain validation and consolidation

#### 4.8 `generate-anomaly-package` - Generate Test Data with Master Agent

**Description:** Generates multiple AnomalyPackage JSON files from real database anomalies using Master Agent

```bash
python main.py generate-anomaly-package
```

**Features:**
- ✅ **Real Database Data** - Fetches 5 real anomalies from database
- ✅ **Master Agent Processing** - Uses Master Agent for AnomalyPackage generation
- ✅ **Multiple Files** - Saves `anomaly_package_1.json` to `anomaly_package_5.json`
- ✅ **Test Data Ready** - Generated files ready for team testing

**Auto Configuration:**
- **Shop ID**: `cac9d883-015f-478e-a93f-32ef401582a3`
- **Property ID**: `326784853`
- **Count**: 5 anomaly packages
- **Output**: Main directory (`anomaly_package_*.json`)

#### 4.9 `test-production-recommendations` - Test Production Recommendation Flow ✅ **NEW**

**Description:** Tests complete production-ready recommendation flow with Polish formatting and database save

```bash
python main.py test-production-recommendations
```

**What it tests:**
- ✅ **Master Agent Preprocessing** - AnomalyPackage generation from real data
- ✅ **Multi-Specialist Teams** - Performance Marketing + SEO + UX teams (12 agents total)
- ✅ **Recommendation Formatter** - Technical analysis → Polish business-ready format
- ✅ **Enhanced Final Validator** - Context extraction + database save + terminal display
- ✅ **Complete Production Flow** - End-to-end workflow with Polish localization

**Production Flow:**
1. **Master Agent** → Enhanced anomaly preprocessing
2. **Specialist Teams** → Technical analysis and recommendations
3. **Recommendation Formatter** → Polish production-ready format (h1, impact, text, desc)
4. **Final Validator** → Context extraction + database save + formatted terminal display

**Auto Configuration:**
- **Shop ID**: `cac9d883-015f-478e-a93f-32ef401582a3`
- **Property ID**: `326784853`
- **Real Data**: Uses real anomalies from database
- **Language**: All output in Polish
- **Timeout**: 10 minutes for complete production test

**Expected Output:**
```
🎯 PRODUCTION RECOMMENDATION
================================================================================

📋 Optymalizacja kampanii Google Ads

💰 BUSINESS IMPACT:
Szacowany ROI +25%

📝 RECOMMENDATION:
Zwiększ budżet na najlepiej konwertujące kampanie i dodaj negative keywords. 
Przewidywany wzrost konwersji o 25%.

📊 DETAILED ANALYSIS:
Analiza pokazuje, że kampanie z CPC poniżej 2.50 PLN generują 40% więcej konwersji.
Rekomendujemy zwiększenie budżetu o 30% dla kampanii 'Brand Keywords' i 'Product Categories'...

📊 METADATA:
• Domain: PERFORMANCE_MARKETING
• Confidence: 85%
• Priority: HIGH
• Database ID: abc12345...

SUCCESS: Saved recommendation to database
FINAL_APPROVED
```

---

### 5. 💾 **Database Operations** - **NEW**

#### 5.1 `view-recommendations` - View Recent Production Recommendations ✅ **NEW**

**Description:** Displays recent Polish production recommendations from ai_recommendations table with statistics

```bash
python main.py view-recommendations
```

**Options (Auto-configured):**
- **Shop ID**: `cac9d883-015f-478e-a93f-32ef401582a3` (automatic)
- **Property ID**: `326784853` (automatic)
- **Limit**: 10 recommendations (automatic)
- **Language**: Polish business format display

**Features:**
- ✅ **Recent Polish Recommendations** - Last 10 production recommendations with Polish formatting
- ✅ **Statistics Summary** - Count by category, confidence averages, high impact count
- ✅ **User-Friendly Display** - Polish headlines, impact statements with mandatory prefixes
- ✅ **Category Breakdown** - Performance Marketing, SEO, UX recommendations analysis
- ✅ **Production Format** - h1, impact, text, desc fields displayed

**Expected Output:**
```
💾 VIEWING RECENT PRODUCTION RECOMMENDATIONS
================================================================================

📈 RECENT RECOMMENDATIONS (3 found)
================================================================================

1. [PERFORMANCE_MARKETING] Optymalizacja kampanii Google Ads
   💰 Szacowany ROI +25%
   📝 Zwiększ budżet na najlepiej konwertujące kampanie i dodaj negative keywords...
   📊 Priority: 2 | Confidence: 85% | Status: approved
   🕒 Created: 2025-01-03 14:30 | ID: abc12345...

2. [SEO] Poprawa wydajności strony dla użytkowników mobilnych
   💰 Przewidywany wzrost ruchu +40%
   📝 Zoptymalizuj mobile performance i dodaj structured data...
   📊 Priority: 3 | Confidence: 78% | Status: approved
   🕒 Created: 2025-01-03 12:15 | ID: def67890...

3. [UX] Optymalizacja procesu zakupowego
   💰 Możliwy wzrost konwersji +15,000 PLN
   📝 Uprość formularz checkout i dodaj trust signals...
   📊 Priority: 1 | Confidence: 92% | Status: approved
   🕒 Created: 2025-01-02 16:45 | ID: ghi11223...

================================================================================

📊 Recommendation Statistics:
  PERFORMANCE_MARKETING: 5 total | 5 approved | 2 high impact | 82% avg confidence
  SEO: 3 total | 3 approved | 1 high impact | 75% avg confidence
  UX: 4 total | 4 approved | 3 high impact | 88% avg confidence
```

---

### 6. 🗄️ `check-database` - Database Inspection

**Description:** Checks and displays recent anomalies from PostgreSQL table `ai_general_anomalies`

```bash
python main.py check-database [OPTIONS]
```

**Options:**
- `--shop-id TEXT` - Shop ID to filter results
- `--property-id TEXT` - Property ID for filtering
- `--days INTEGER` - Number of days back (default: 2)
- `--limit INTEGER` - Maximum number of records (default: 10)

**Usage examples:**
```bash
# Check recent anomalies for our shop
python main.py check-database \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853

# Check all anomalies from the last 20 days
python main.py check-database \
  --days 20 --limit 20

# Check specific shop without property filter
python main.py check-database \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --days 5
```

**Features:**
- 🔍 **Intelligent Querying** - sorting by priority and financial impact
- 🛡️ **Security Filtering** - automatic data isolation per shop
- 📊 **Rich Tables** - colorful tables with key metrics
- 💰 **Financial Summary** - financial impact summary
- ⚡ **Connection Testing** - PostgreSQL connection verification

**Example output:**
```
╭────────────── PostgreSQL Query ───────────────╮
│ Database Check                                │
│ Shop ID: cac9d883-015f-478e-a93f-32ef401582a3 │
│ Property ID: 326784853                        │
│ Days: 2                                       │
│ Limit: 10                                     │
╰───────────────────────────────────────────────╯
Testing database connection...
✓ Database connection successful

Fetching last 10 anomalies from 2 days...

                                    Last 5 Anomalies                                     
┏━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━┓
┃ Date       ┃ Priority ┃ Category   ┃ Metric        ┃ Campaign                     ┃ Impact (PLN)  ┃ Z-Score  ┃
┡━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━┩
│ 2025-01-03 │ HIGH     │ revenue    │ total_revenue │ [PMAX] / Test Campaign       │ 4,500.00      │ 3.20     │
│ 2025-01-02 │ MEDIUM   │ traffic    │ sessions      │ [Search] Brand Campaign      │ 1,200.00      │ 2.80     │
│ 2025-01-01 │ URGENT   │ conversion │ conversion    │ [Shopping] Product Feed      │ 8,900.00      │ 4.10     │
└────────────┴──────────┴────────────┴───────────────┴──────────────────────────────┴───────────────┴──────────┘

Summary:
• Total records: 5
• Total financial impact: 14,600.00 PLN
• Date range: Last 2 days
```

---

### 6. ⚕️ `health-check` - Status Check

**Description:** Checks system status, configuration, and service availability

```bash
python main.py health-check --shop-id SHOP_ID
```

**Options:**
- `--shop-id TEXT` (required) - Shop ID for agent check

**Usage examples:**
```bash
# Basic health check
python main.py health-check --shop-id test-shop-123

# Health check with debug info
python main.py --debug health-check --shop-id test-shop-123
```

**What it checks:**
- ✅ **OpenAI API Key** - if key is configured
- ✅ **Model Configuration** - OpenAI model check
- ✅ **Debug Mode** - debug mode status
- ✅ **Log Level** - logging level
- ✅ **Environment Variables** - configuration loading

**Example output:**
```
╭────────── Health Check ──────────╮
│ Shop ID: test-shop-123           │
╰──────────────────────────────────╯

✓ OpenAI API Key: Configured
✓ Model: gpt-4o-mini
✓ Debug: False
✓ Log Level: INFO

Health check completed successfully!
```

---

### 7. ℹ️ `version` - Version Information

**Description:** Displays BerrybooAI and AutoGen version information

```bash
python main.py version
```

**Example output:**
```
╭────────── Version Information ──────────╮
│ BerrybooAI                              │
│ Version: 0.1.0                          │
│ Author: Berryboo Team                   │
│ AutoGen: 0.7.4                          │
╰─────────────────────────────────────────╯
```

---

## 🎨 CLI Features

### Rich Formatting
- 🌈 **Kolorowe output** - błędy czerwone, sukces zielony, info niebieskie
- 📊 **Tabele** - czytelne tabele z danymi
- 🎭 **Panele** - eleganckie ramki dla ważnych informacji
- 📝 **Syntax highlighting** - JSON z kolorami i numerami linii
- 🧹 **Clean Logging** - AutoGen datetime serialization errors suppressed for professional output

### Live Agent Monitoring
- 🔴 **Real-time API calls** - Live preview of OpenAI requests and responses
- 📡 **Agent events logging** - EVENT_LOGGER_NAME and TRACE_LOGGER_NAME integration
- 📈 **Token usage statistics** - Real-time token consumption tracking
- 🎥 **AutoGen Console streaming** - Live agent conversations with output_stats
- ⚡ **Performance metrics** - Request timing and rate limit monitoring

### Error Handling
- 🛡️ **Graceful failures** - brak crashów, przyjazne komunikaty
- 📋 **Detailed error messages** - stack traces w debug mode
- 🔄 **Retry logic** - automatyczne ponowne próby dla połączeń
- 📝 **Comprehensive logging** - szczegółowe logi dla debugowania
- ⏰ **Rate limit recovery** - Automatic 10s wait + fallback task on 429 errors
- 🔧 **Model compatibility** - Smart model selection and error handling

### Configuration Support
- ⚙️ **Environment variables** - automatyczne ładowanie z .env
- 🔧 **CLI overrides** - możliwość nadpisania ustawień
- 🎯 **Parameter validation** - walidacja parametrów wejściowych
- 📁 **Multiple config sources** - .env, CLI args, defaults
 - 🧩 **Auto schema context** - podczas startu CLI automatycznie zapisywany jest aktualny schemat DB do `ai_agent_context` jako `agent_type=SchemaDocs`, `context_key=db_schema` (best‑effort)

## 🔧 Debug Mode

Włącz szczegółowe logowanie dla wszystkich komend:

```bash
# Debug mode dla każdej komendy
python main.py --debug [COMMAND] [OPTIONS]

# Przykłady
python main.py --debug version
python main.py --debug test-master-agent --shop-id test-123
python main.py --debug check-database --shop-id test-123
```

**Debug output zawiera:**
- 📋 **Detailed logs** - wszystkie operacje wewnętrzne
- 🔍 **SQL queries** - dokładne zapytania do bazy danych
- 🤖 **Agent communication** - message passing między agentami
- ⚡ **Performance metrics** - czasy wykonania operacji
- 🛠️ **Stack traces** - pełne ścieżki błędów

## 🚨 Troubleshooting

### 🎨 Co widzisz w szczegółowym myśleniu (--show-thinking)

#### **1. Test Anomaly Data (JSON z kolorami)**
```json
{
  "id": "8f2e4d91-2b7a-4c9f-8a3e-1d5c6b9a7e2f",
  "date": "2025-01-03T10:30:00Z",
  "metric": "total_revenue", 
  "z_score": 3.2,
  "pct_delta": 40.5,
  "impact_score": 5000.0,
  "business_impact_direction": "POSITIVE"
}
```

#### **2. Agent Reasoning Process**
- **Priority calculation:** Jak agent określa HIGH/MEDIUM/LOW
- **Financial impact analysis:** Kalkulacje wpływu w PLN
- **Strategic recommendations:** Konkretne akcje do podjęcia
- **Tool usage:** Jakie narzędzia użył i dlaczego

#### **3. Database Queries & Results**
- **Recent anomalies fetch:** Co agent znalazł w bazie
- **Summary generation:** Jak wygenerował insights
- **Calculations:** Dokładne obliczenia finansowe

#### **4. Enhanced Debugging (--debug)**
- **SQL queries:** Dokładne zapytania do bazy danych
- **Agent communication:** Message passing między komponentami
- **Performance metrics:** Czasy wykonania operacji
- **Stack traces:** Pełne ścieżki błędów

## 🐛 Debugging i Troubleshooting

### **Jeśli brak real data:**
```bash
# Test connection do bazy
python main.py check-database \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3

# Sprawdź czy są anomalie w bazie
python main.py check-database \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --days 7 --limit 20
```

### **Jeśli błędy z tools:**
```bash
# Test tylko bez tools
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --show-thinking
  
# Debug mode dla szczegółów
python main.py --debug test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --test-tools
```

### **Jeśli problemy z modelem:**
```bash
# Test z podstawowym modelem
python main.py test-master-agent \
  --shop-id test-shop-123 \
  --model o3-mini-mini

# Lub podaj custom API key
python main.py test-master-agent \
  --shop-id test-shop-123 \
  --openai-key sk-your-key-here
```

### **Jeśli chcesz podejrzeć schemat bazy (dla agentów)**
- Agenci mają dostęp do narzędzia: `get_db_schema(table: str|None=None, max_columns: int=12)`
- CLI podczas startu publikuje schemat do `ai_agent_context` (klucz `db_schema`) – agenci mogą korzystać z kontekstu lub narzędzia

### Częste problemy i rozwiązania

#### 1. Błąd połączenia z bazą danych
```bash
✗ Database connection failed!
```
**Rozwiązanie:**
1. Sprawdź czy PostgreSQL działa
2. Zweryfikuj zmienne w `.env`:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=berryboo
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your_password
   ```
3. Test połączenia: `python main.py check-database --shop-id test`

#### 2. Brak OpenAI API Key
```bash
OpenAI API key is required
```
**Rozwiązanie:**
1. Dodaj klucz do `.env`:
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```
2. Lub użyj CLI override:
   ```bash
   python main.py test-master-agent --shop-id test --openai-key sk-your-key
   ```

#### 3. Agent registration failed
**Rozwiązanie:**
1. Sprawdź logi z `--debug`
2. Zweryfikuj czy wszystkie dependencies są zainstalowane:
   ```bash
   pip install -r requirements-basic.txt
   ```
3. Test basic functionality:
   ```bash
   python main.py version
   python main.py --debug health-check --shop-id test
   ```

#### 4. Import errors
**Rozwiązanie:**
1. Sprawdź czy jesteś w głównym katalogu projektu
2. Aktywuj virtual environment:
   ```bash
   source venv/bin/activate
   ```
3. Sprawdź Python path:
   ```bash
   python -c "import sys; print(sys.path)"
   ```

## 📚 Usage Examples

### 🧠 Nested Architecture Testing Workflow

#### **Step 1: Test Performance Marketing Sub-Team**
```bash
python main.py test-performance-team
```
**Goal:** Check if 4-agent consultancy team works correctly

#### **Step 2: Test SEO Specialist Sub-Team**
```bash
python main.py test-seo-team
```
**Goal:** Check if 4-agent SEO consultancy team works correctly

#### **Step 3: Test UX Specialist Sub-Team** ✅ **NEW**
```bash
python main.py test-ux-team
```
**Goal:** Check if 4-agent UX consultancy team with web browsing works correctly

#### **Step 4: Test UX Nested Architecture** ✅ **NEW**
```bash
python main.py test-ux-nested-team
```
**Goal:** Check UX team + Master Validator coordination with web browsing

#### **Step 5: Test SEO Nested Architecture**
```bash
python main.py test-seo-nested-team
```
**Goal:** Check SEO team + Master Validator coordination

#### **Step 6: Test Performance Nested Architecture**
```bash
python main.py test-hierarchical-team
```
**Goal:** Check Performance team + Master Validator coordination

#### **Step 7: Test Multi-Specialist Architecture** ✅ **NEW**
```bash
python main.py test-multi-specialist-team
```
**Goal:** Check complete coordination of 3 teams (Performance + SEO + UX) + Master Validator

#### **Step 8: Generate test data**
```bash
python main.py generate-anomaly-package
```
**Goal:** Create AnomalyPackage files from real anomalies

### 🧠 Master Agent Testing Workflow (Enhanced)

#### **Step 1: Test basic logic with dummy data**
```bash
python main.py test-master-agent \
  --shop-id test-shop-123 \
  --show-thinking
```
**Goal:** Check if agent correctly analyzes data structure

#### **Step 2: Test with real data**
```bash
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --use-real-data \
  --show-thinking
```
**Goal:** Check how agent handles real anomalies

#### **Step 3: Test tools integration**
```bash
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --test-tools \
  --show-thinking
```
**Goal:** Verify all tools work correctly

#### **Step 4: Model comparison**
```bash
# Test with cheaper model
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --model o3-mini-mini \
  --use-real-data \
  --show-thinking

# Test with premium model  
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --model o3-mini \
  --use-real-data \
  --show-thinking
```
**Goal:** Compare reasoning quality between models (o3-mini recommended)

### Daily Workflow
```bash
# 1. Check version and status
python main.py version
python main.py health-check --shop-id cac9d883-015f-478e-a93f-32ef401582a3

# 2. Check latest anomalies from database
python main.py check-database \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --days 1 --limit 5

# 3. Test Performance Marketing Team (IMPLEMENTED!)
python main.py test-performance-team

# 4. Test SEO Specialist Team (IMPLEMENTED!)
python main.py test-seo-team

# 5. Test UX Specialist Team (NEW!)
python main.py test-ux-team

# 6. Test UX Nested Architecture (NEW!)
python main.py test-ux-nested-team

# 7. Test SEO Nested Architecture (IMPLEMENTED!)
python main.py test-seo-nested-team

# 8. Test Performance Hierarchical Architecture (IMPLEMENTED!)
python main.py test-hierarchical-team

# 9. Test Multi-Specialist Architecture (NEW!)
python main.py test-multi-specialist-team

# 10. Test Production Recommendation Flow (NEW!) - Single anomaly test
python main.py test-production-recommendations

# 10b. Complete Production Workflow (NEW!) - ALL anomalies from last 3 days with Polish output
python main.py preprocess-and-route

# 11. View Recent Polish Production Recommendations (NEW!)
python main.py view-recommendations

# 12. Generate test data for development (IMPLEMENTED!)
python main.py generate-anomaly-package

# 6. Test Master Agent with real data (Legacy)
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --use-real-data \
  --show-thinking

# 7. In case of problems - debug mode
python main.py --debug test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --use-real-data
```

### Development Testing
```bash
# Test with different models on same data
for model in o3-mini gpt-4o-mini gpt-4o gpt-4-turbo; do
  echo "Testing with $model"
  python main.py test-master-agent \
    --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
    --model $model \
    --use-real-data \
    --show-thinking
done

# Check different timeframes
python main.py check-database --days 1 --limit 5    # Last day
python main.py check-database --days 20 --limit 20  # Last 20 days (default perspective in CLI for batch)
python main.py check-database --days 30 --limit 50  # Last month

# Full test with all options
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --use-real-data \
  --show-thinking \
  --test-tools \
  --model o3-mini
```

### Production Monitoring
```bash
# Check specific shop
python main.py check-database \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --days 1

# Monitor system health
python main.py health-check --shop-id cac9d883-015f-478e-a93f-32ef401582a3

# Test agents with production data
python main.py test-master-agent \
  --shop-id cac9d883-015f-478e-a93f-32ef401582a3 \
  --property-id 326784853 \
  --use-real-data \
  --test-tools
```

---

## 🌐 MCP Servers - **Google Analytics 4 Real-Time Data Access**

Model Context Protocol (MCP) enables BerrybooAI agents to access real-time Google Analytics 4 data through standardized tool interfaces. Unlike PostgreSQL (historical anomaly data), MCP provides live, conversational access to GA4 APIs.

### **What is MCP?**
- **Real-time Data Access**: Query live GA4 APIs conversationally
- **Standardized Tools**: Universal protocol for AI tool integration
- **AutoGen Native**: Built-in support via `McpWorkbench` and `StdioServerParams`
- **Official GA4 Server**: Google's Python-based analytics-mcp server

### **When to Use MCP vs PostgreSQL**
| Use Case | MCP (GA4) | PostgreSQL |
|----------|-----------|------------|
| Real-time queries | ✅ Perfect | ❌ Historical only |
| Ad-hoc exploration | ✅ Conversational | ⚠️ Requires SQL |
| Trend detection | ✅ Automated scanning | ⚠️ Manual queries |
| Anomaly processing | ⚠️ No anomaly storage | ✅ Optimized |
| Historical analysis | ⚠️ Limited to GA4 retention | ✅ Long-term storage |

---

### 💬 `chat-ga4` - Interactive GA4 Assistant

**Description:** Conversational GA4 assistant with access to real-time data. Ask questions in natural language.

**Quick start:**
```bash
python main.py chat-ga4
```

**Sample queries:**
```
> How many users yesterday?
> Compare sessions this week vs last week  
> What's my bounce rate?
> Show top 5 pages by pageviews
> Mobile vs desktop conversion rates
```

**Available MCP tools:**
- `get_account_summaries` - List of accounts and properties
- `get_property_details` - Property details
- `run_report` - GA4 Data API reports
- `run_realtime_report` - Real-time data
- `get_custom_dimensions_and_metrics` - Custom dimensions

**Architecture:**
```
User Query → OpenAI (gpt-4o) → MCP Workbench → Google Analytics API → Response
```

**Exit session:** `exit`, `quit`, or `q`

---

### 🔍 Specialized GA4 Analysts (10 Agents)

Each agent is a specialist in a specific domain of e-commerce analytics, automatically conducting deep analysis of GA4 data.

#### 1. **Conversion Funnel Analyst**
```bash
python main.py ga4-conversion-funnel
```
**Analysis:** Conversion path, drop-off points, funnel optimization  
**Period:** Last 90 days  
**Output:** Conversion rates, biggest bottlenecks, revenue impact

#### 2. **Customer Lifetime Value Strategist**
```bash
python main.py ga4-customer-ltv
```
**Analysis:** Customer cohorts, CLV per channel, retention, payback period  
**Period:** 6-month cohorts  
**Output:** Best acquisition channels, CLV recommendations

#### 3. **Product Performance Optimizer**
```bash
python main.py ga4-product-performance
```
**Analysis:** Top 50 products, cross-selling, underperformers  
**Period:** Last 90 days  
**Output:** Product recommendations, bundle opportunities

#### 4. **User Engagement Analyst**
```bash
python main.py ga4-user-engagement
```
**Analysis:** Bounce rate, session duration, exit pages, user flows  
**Period:** Last 90 days  
**Output:** Engagement optimization opportunities

#### 5. **Mobile Commerce Specialist**
```bash
python main.py ga4-mobile-commerce
```
**Analysis:** Mobile vs desktop, mobile friction points, mobile revenue gap  
**Period:** Last 90 days  
**Output:** Mobile optimization recommendations

#### 6. **Geographic Expansion Analyst**
```bash
python main.py ga4-geographic-expansion
```
**Analysis:** Performance per country/region, emerging markets, localization  
**Period:** Last 6 months  
**Output:** Market expansion opportunities

#### 7. **Marketing Attribution Specialist**
```bash
python main.py ga4-marketing-attribution
```
**Analysis:** Multi-touch attribution, channel value, ROAS  
**Period:** Last 90 days  
**Output:** Budget reallocation recommendations

#### 8. **Seasonal Trends Forecaster**
```bash
python main.py ga4-seasonal-trends
```
**Analysis:** Seasonal patterns, YoY comparisons, forecasting  
**Period:** 12+ months historical  
**Output:** Upcoming seasonal opportunities

#### 9. **Checkout Optimization Specialist**
```bash
python main.py ga4-checkout-optimization
```
**Analysis:** Cart abandonment, checkout funnel, friction points  
**Period:** Last 90 days  
**Output:** Revenue recovery opportunities

#### 10. **Data Quality Auditor**
```bash
python main.py ga4-data-quality
```
**Analysis:** Tracking validation, data integrity, implementation audit  
**Period:** Last 90 days  
**Output:** Critical tracking gaps, fixes

---

### 🚨 `ga4-anomalies-scanner` - Automated Pattern Detection ✅ **PRODUCTION-READY**

**Opis:** Automatyczny skaner GA4 wykrywający trendy, anomalie i możliwości wzrostu. Generuje rekomendacje w języku polskim i zapisuje do bazy danych.

**Szybki start:**
```bash
python main.py ga4-anomalies-scanner
```

**Co robi scanner:**
1. **Pobiera dane** z ostatnich 7 dni (dzień po dniu)
2. **Wykrywa wzorce:**
   - Trendy (3+ dni w tym samym kierunku)
   - Anomalie (nagłe zmiany >30%)
   - Możliwości wzrostu (low-hanging fruits)
   - Ryzyka (negative trends, drops)
3. **Generuje rekomendacje** w języku polskim
4. **Zapisuje do bazy** `ai_recommendations`

**Analizowane metryki:**
- Sessions, users, conversions, revenue
- Bounce rate, engagement rate
- Mobile vs desktop performance
- Top traffic sources
- Product trends

**Przykładowa rekomendacja:**
```
═══ RECOMMENDATION 1/3 ═══

📋 Wzrost konwersji mobilnych o 45% w ostatnich 3 dniach

💰 POTENCJALNY WPŁYW:
Możliwość zwiększenia przychodów o 5,000 PLN miesięcznie

📝 REKOMENDACJA:
Wykryliśmy znaczący wzrost konwersji mobilnych rozpoczynający się 3 dni temu.
Zalecamy zwiększenie budżetu kampanii mobilnych o 20-30% i przeanalizowanie
zmian w UX mobilnym z ostatnich 4 dni.

📊 METADATA:
• Domain: MOBILE_COMMERCE
• Confidence: 75%
• Priority: HIGH
• Implementation: low complexity
• Timeline: 1-2 days

✓ Saved to database
```

**Output:** 2-5 najważniejszych rekomendacji w języku polskim

**Czas wykonania:** 2-3 minuty

**Rekomendowane użycie:**
- **Daily**: Codziennie rano (najlepiej 9:00)
- **Weekly**: Minimum raz w tygodniu (poniedziałek)
- **After changes**: Po zmianach w kampaniach/stronie

**Cron example:**
```bash
# Codziennie o 9:00
0 9 * * * cd /path/to/backend/src/ai && python main.py ga4-anomalies-scanner
```

---

### **Prerequisites dla MCP Commands**

1. **Google Analytics MCP Server**
```bash
pip install analytics-mcp
```

2. **AutoGen MCP Extension**
```bash
pip install autogen-ext[mcp]
```

3. **Google Cloud Authentication**
```bash
# OAuth (Desktop App) for testing
gcloud auth application-default login --client-id-file=client-secrets-desktop.json

# Service Account for production (recommended)
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

4. **GA4 Property Access**
- Upewnij się że masz dostęp do GA4 property
- Weryfikuj property_id w Google Analytics

---

### **Technical Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    CLI Interactive Menu                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 🌐 MCP Servers (Yellow Section)                       │  │
│  │   └── 📊 Google Analytics                            │  │
│  │       ├── 💬 Chat (Interactive)                      │  │
│  │       ├── 🔍 10 Specialized Agents (Auto-run)        │  │
│  │       └── 🚨 Anomalies Scanner (7-day + save)        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│            GA4 Specialized Agent Base Class                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ - McpWorkbench (stdio mode)                          │  │
│  │ - OpenAI model client (gpt-4o)                       │  │
│  │ - Prompt execution with structured output            │  │
│  │ - Rich terminal formatting                           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                Google Analytics MCP Server                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ - Official Google analytics-mcp (Python)             │  │
│  │ - Stdio communication                                │  │
│  │ - GA4 Data API + Realtime API                        │  │
│  │ - OAuth/Service Account authentication              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### **Performance & Costs**

**Execution Time:**
- Chat: Real-time (seconds per query)
- Specialized Agents: 1-3 minutes per analysis
- Anomalies Scanner: 2-3 minutes per scan

**API Usage:**
- GA4 API: 5-20 calls per agent/scan
- OpenAI API: ~5,000-10,000 tokens per analysis

**Estimated Costs:**
- Chat: ~$0.01-0.05 per query
- Specialized Agent: ~$0.05-0.20 per analysis
- Anomalies Scanner: ~$0.10-0.30 per scan

---

### **Troubleshooting**

**"No module named 'mcp'"**
```bash
pip install autogen-ext[mcp]
```

**"Failed to start MCP server"**
```bash
# Verify installation
analytics-mcp --version

# Install if needed
pip install analytics-mcp
```

**"Authentication failed"**
```bash
# For testing (OAuth Desktop App)
gcloud auth application-default login --client-id-file=client-secrets-desktop.json

# For production (Service Account)
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

**"No data returned"**
- Verify property_id is correct
- Check date range (some analyses require historical data)
- Ensure GA4 property has data for the period

---

### **Documentation**

- 📘 [Specialized Agents Details](mcp/ga4_specialized_agents.md)
- 📘 [Anomalies Scanner Details](mcp/ga4_anomalies_scanner.md)
- 📘 [MCP Installation Guide](mcp/installation.md)
- 📘 [Available MCP Tools](mcp/available_tools.md)

---

## 🔍 **Google Search Console MCP Integration** - **SEO Data Access**

Model Context Protocol (MCP) integration for Google Search Console provides real-time access to organic search performance, technical SEO data, and indexing insights through conversational AI.

### **What is GSC MCP?**
- **Real-time SEO Data**: Query search performance, indexing status, and technical issues conversationally
- **Standardized Tools**: 5 GSC API tools exposed via FastMCP framework
- **AutoGen Native**: Built-in support via `McpWorkbench` and `StdioServerParams`
- **FastMCP Based**: Custom GSC MCP server (pattern from Google Ads integration)

### **When to Use GSC MCP**
| Use Case | GSC MCP | PostgreSQL |
|----------|---------|------------|
| Search performance analysis | ✅ Real-time GSC data | ❌ No GSC data stored |
| Technical SEO audits | ✅ Crawl & index status | ❌ Not available |
| Keyword opportunity discovery | ✅ Live query data | ⚠️ Requires export |
| CTR optimization | ✅ Position & CTR metrics | ❌ Not available |
| Content gap analysis | ✅ Search appearance data | ❌ Not available |

---

### 🎯 `chat-gsc` - Interactive GSC Assistant ✅ **PRODUCTION-READY**

**Opis:** Konwersacyjny asystent GSC z dostępem do real-time danych organicznych. Zadawaj pytania SEO w języku naturalnym zamiast pisać zapytania API.

```bash
python main.py chat-gsc
```

**🚀 Quick Start:**
```bash
# Basic usage (default configuration)
python main.py chat-gsc

# Specify different property
python main.py chat-gsc --gsc-property "https://www.example.com/"

# Custom credentials
python main.py chat-gsc --credentials-path /path/to/credentials.json
```

**Auto Configuration:**
- **Shop ID**: `cac9d883-015f-478e-a93f-32ef401582a3` (from settings)
- **GSC Property**: `sc-domain:acusmed.pl` (default test property)
- **Credentials**: `~/.config/gcloud/application_default_credentials.json` (OAuth)

**Prerequisites (First-Time Setup):**
1. **Google Cloud Authentication** (reuse from GA4 if available):
   ```bash
   gcloud auth application-default login \
     --scopes https://www.googleapis.com/auth/webmasters.readonly
   ```
   
2. **Enable API** in Google Cloud Console:
   - Google Search Console API

**📊 Interactive Session Example:**
```
🔍 Google Search Console Conversational Assistant
────────────────────────────────────────────────────────────
✓ Connected to GSC property: sc-domain:acusmed.pl
Shop: cac9d883-015f-478e-a93f-32ef401582a3
Credentials: /Users/.../.config/gcloud/application_default_credentials.json
Available tools: list_properties, get_search_analytics, get_url_inspection,
                list_sitemaps, get_site_details

Type 'exit', 'quit', or 'q' to end session

[You] Show top 10 queries last 7 days

[Agent] Here are your top 10 search queries from the last 7 days:

1. "produkty ortopedyczne" - 450 clicks, 8,200 impressions, 5.5% CTR, pos 6.2
2. "opaski uciskowe" - 320 clicks, 5,100 impressions, 6.3% CTR, pos 5.8
...

Key insight: "produkty ortopedyczne" ranks position 6.2 - you're close to 
page 1. Consider optimizing title tags to include specific product benefits.

[You] Which pages have indexing errors?

[Agent] Checking index coverage...

Found 3 pages with indexing issues:
1. /produkty/nowy-produkt - Status: Crawled, currently not indexed
   Reason: Low quality content detected
   
2. /kategoria/archiwum - Status: Blocked by robots.txt
   Action: Review robots.txt configuration
...

[You] exit

Cleaning up...
✓ Session ended
```

**💡 Sample Queries:**
- **Performance**: "Show top 10 queries last 7 days", "What pages get most traffic?"
- **CTR Optimization**: "Which queries have high impressions but low CTR?"
- **Mobile Analysis**: "Compare mobile vs desktop CTR"
- **Technical SEO**: "Check if this page is indexed: https://...", "Show sitemap errors"
- **Opportunities**: "Find queries ranking on page 2", "Which keywords improved most?"

**🛠️ Available MCP Tools (5 total):**

1. **`list_properties`** - List accessible GSC properties
   - All properties user has access to
   - Permission levels

2. **`get_search_analytics`** - Core search performance data
   - Custom date ranges (last 16 months available)
   - Dimensions: query, page, country, device, date, searchAppearance
   - Metrics: clicks, impressions, ctr, position
   - Flexible row limits

3. **`get_url_inspection`** - URL indexing status
   - Index coverage state
   - Mobile usability
   - Last crawl time
   - Robots.txt status

4. **`list_sitemaps`** - Sitemap management
   - Submitted sitemaps
   - Processing status
   - Errors and warnings

5. **`get_site_details`** - Property information
   - Verification status
   - Permission levels

---

### 🔍 **10 Specialized GSC Agents** - **SEO Analysis Specialists**

Each agent conducts focused SEO analysis using GSC data via MCP. All agents use real-time GSC API data.

#### 1. **gsc-search-performance** - Search Performance Analyst

```bash
python main.py gsc-search-performance
```

**Analyzes:**
- Clicks, impressions, CTR, and position trends
- High-impression, low-CTR opportunities
- Top performing queries and pages
- CTR optimization potential

**Output:** JSON analysis with specific optimization recommendations

#### 2. **gsc-technical-seo** - Technical SEO Auditor

```bash
python main.py gsc-technical-seo
```

**Audits:**
- Index coverage issues
- Crawl errors
- Mobile usability problems
- Sitemap errors

**Output:** Prioritized technical fixes with business impact

#### 3. **gsc-content-gap** - Content Gap Analyzer

```bash
python main.py gsc-content-gap
```

**Identifies:**
- Underperforming content
- Missing keyword opportunities
- Content optimization needs
- Search intent gaps

**Output:** Content strategy with traffic potential estimates

#### 4. **gsc-keyword-opportunities** - Keyword Opportunity Hunter

```bash
python main.py gsc-keyword-opportunities
```

**Discovers:**
- Position 11-30 keywords (page 2-3)
- Quick-win ranking improvements
- Featured snippet opportunities
- Keyword cannibalization

**Output:** Keyword targeting strategy with traffic projections

#### 5. **gsc-page-experience** - Page Experience Optimizer

```bash
python main.py gsc-page-experience
```

**Evaluates:**
- Core Web Vitals (LCP, FID, CLS)
- Mobile usability
- Page experience signals
- HTTPS status

**Output:** Technical improvements for better rankings

#### 6. **gsc-mobile-seo** - Mobile SEO Specialist

```bash
python main.py gsc-mobile-seo
```

**Compares:**
- Mobile vs desktop performance
- Mobile usability issues
- Mobile-first indexing status
- Device-specific CTR gaps

**Output:** Mobile optimization strategy

#### 7. **gsc-indexing-crawl** - Indexing & Crawl Optimizer

```bash
python main.py gsc-indexing-crawl
```

**Analyzes:**
- Crawl statistics
- Index coverage
- Crawl budget utilization
- Indexing efficiency

**Output:** Crawl optimization recommendations

#### 8. **gsc-serp-features** - SERP Features Optimizer

```bash
python main.py gsc-serp-features
```

**Identifies:**
- Featured snippet opportunities
- Rich results potential
- Structured data gaps
- SERP feature performance

**Output:** Schema markup recommendations

#### 9. **gsc-site-structure** - Site Structure Analyzer

```bash
python main.py gsc-site-structure
```

**Reviews:**
- Internal linking patterns
- Site architecture
- Orphaned pages
- Link equity distribution

**Output:** Site structure improvements

#### 10. **gsc-competitive-intelligence** - Competitive Search Intelligence

```bash
python main.py gsc-competitive-intelligence
```

**Discovers:**
- Declining keyword performance
- Competitive gaps
- Market positioning
- Seasonal patterns

**Output:** Competitive strategy recommendations

---

### 📚 Complete GSC MCP Documentation:

- **Full Guide**: `.ai/mcp-gsc/README.md`
- **Installation**: `.ai/mcp-gsc/installation.md`
- **OAuth Setup**: `.ai/mcp-gsc/oauth_setup.md` ⭐ **Start here for first-time setup**
- **Available Tools**: `.ai/mcp-gsc/available_tools.md`
- **Query Examples**: `.ai/mcp-gsc/query_examples.md`
- **CLI Usage**: `.ai/mcp-gsc/cli_usage.md`
- **Agent Integration**: `.ai/mcp-gsc/agent_integration.md`
- **Troubleshooting**: `.ai/mcp-gsc/troubleshooting.md`

---

### 🏗️ Technical Architecture:

```
User Query
    ↓
chat-gsc CLI Command
    ↓
GSCConversationalAgent (AutoGen)
    ├─> OpenAIChatCompletionClient (model: gpt-4o)
    ├─> Conversation History Management
    └─> McpWorkbench (MCP Client)
        ↓
    StdioServerParams (stdio mode)
        ↓
    Google Search Console MCP Server (FastMCP)
        ├─> gsc_server.py
        └─> 5 registered tools
            ↓
    Google Search Console API v1 (REST)
        ↓
    GSC Property Data (Search Performance + Technical SEO)
```

---

### 🔐 Security & Isolation:

- **Shop-level isolation**: Each agent instance tied to specific shop_id
- **Property validation**: Verifies shop-property access
- **OAuth credentials**: User-level authentication (read-only scope)
- **Read-only access**: `webmasters.readonly` scope enforced

---

### ⚡ Performance:

- **Startup time**: ~2-3 seconds (MCP server initialization)
- **Query latency**: 3-8 seconds (API call + model reasoning)
- **Concurrent sessions**: Supported (separate MCP server per session)
- **Rate limits**: GSC API quotas apply (1,200 req/min/user)

---

### 🚨 Troubleshooting:

| Issue | Solution |
|-------|----------|
| `No OAuth credentials` | Run `gcloud auth application-default login --scopes ...` (see `.ai/mcp-gsc/oauth_setup.md`) |
| `MCP server connection failed` | Check credentials path, ensure Search Console API enabled |
| `Property not found` | Verify property URL format (sc-domain: or https://), check access permissions |
| `API quota exceeded` | Wait before retrying, optimize query frequency |

---

### ✅ Production Status:

- ✅ **OAuth Authentication**: Working with Desktop App credentials
- ✅ **MCP Server**: FastMCP-based, stdio mode connection
- ✅ **Tool Integration**: All 5 tools tested and operational
- ✅ **Conversational Interface**: Natural language SEO queries working
- ✅ **10 Specialized Agents**: Production-ready SEO analysts
- ✅ **Documentation**: Complete guides and troubleshooting
- 🔄 **Database Mapping**: Shop-property relationships (planned)
- 🔄 **Anomaly Scanner**: Automated SEO opportunity detection (planned)

---

## 🚀 **Google PageSpeed Insights MCP Integration** - **PERFORMANCE OPTIMIZATION**

Model Context Protocol (MCP) integration for Google PageSpeed Insights provides real-time access to website performance metrics, Core Web Vitals, and optimization recommendations through conversational AI.

### **What is PageSpeed MCP?**
- **Real-time Performance Data**: Query Core Web Vitals and performance metrics conversationally
- **Standardized Tool**: 1 MCP tool exposing PageSpeed Insights API
- **AutoGen Native**: Built-in support via `McpWorkbench` and `StdioServerParams`
- **Node.js Based**: Custom MCP server from GitHub (no authentication required)

### **When to Use PageSpeed MCP**
| Use Case | PageSpeed MCP | PostgreSQL |
|----------|--------------|------------|
| Performance analysis | ✅ Real-time PageSpeed data | ❌ No performance data stored |
| Core Web Vitals check | ✅ Live LCP, FID, CLS metrics | ❌ Not available |
| Optimization guidance | ✅ Actionable recommendations | ❌ No optimization data |
| SEO performance impact | ✅ Performance as ranking factor | ❌ Not available |
| Mobile optimization | ✅ Mobile-first analysis | ❌ Not available |

---

### 🎯 `chat-pagespeed` - PageSpeed Insights Conversational Assistant ✅ **PRODUCTION-READY**

**Opis:** Konwersacyjny asystent Google PageSpeed Insights z dostępem do real-time performance data przez Model Context Protocol. Zadawaj pytania o wydajność strony w języku naturalnym zamiast analizować API.

```bash
python main.py chat-pagespeed
```

**🚀 Quick Start:**
```bash
# Basic usage (default: acusmed.pl)
python main.py chat-pagespeed

# Specify different website
python main.py chat-pagespeed --website-url https://example.com

# Custom shop
python main.py chat-pagespeed --shop-id cac9d883-015f-478e-a93f-32ef401582a3
```

**Auto Configuration:**
- **Shop ID**: `cac9d883-015f-478e-a93f-32ef401582a3` (from settings)
- **Website URL**: Auto-detected from `ai_shop_knowledge_base` or defaults to `https://acusmed.pl`
- **No Authentication**: PageSpeed Insights API is public

**Prerequisites (First-Time Setup):**
1. **Install MCP Server**:
   ```bash
   cd backend/src/ai
   git clone https://github.com/enemyrr/mcp_server_pagespeed.git
   cd mcp_server_pagespeed
   npm install
   npm run build
   ```
   
2. **Verify Node.js** installed:
   ```bash
   node --version  # Should be 18+
   ```

**📊 Interactive Session Example:**
```
🚀 PageSpeed Insights Conversational Assistant
────────────────────────────────────────────────────────────
✓ Website: https://acusmed.pl
✓ Shop: cac9d883-015f-478e-a93f-32ef401582a3
✓ Available tools: analyze_pagespeed

Type 'exit', 'quit', or 'q' to end session

[You] What's the performance score?

[Agent] The current performance score for acusmed.pl is 78 out of 100, 
which falls in the "Needs Improvement" range. 

Key Core Web Vitals:
- LCP: 2.8s (Needs Improvement - target < 2.5s)
- FID: 65ms (Good)
- CLS: 0.08 (Good)

Top optimization opportunities:
1. Eliminate render-blocking resources (High impact)
2. Reduce unused JavaScript (250 KB savings)
3. Properly size images (450 KB potential savings)

[You] What should I prioritize?

[Agent] Based on impact analysis, focus on:

1. **Eliminate render-blocking resources** (Highest ROI)
   - Will improve LCP by ~0.5s
   - Each 100ms improvement = ~1% conversion increase
   - Implementation: Defer non-critical CSS/JS

2. **Reduce unused JavaScript** (Quick win)
   - Remove 250 KB of unused code
   - Improves interactivity metrics
   - Use code splitting

[You] exit

Cleaning up...
✓ Session ended
```

**Opcje:**
- `--shop-id TEXT` - Shop ID (defaults to settings)
- `--website-url TEXT` - Website URL (auto-detected or defaults to acusmed.pl)

**Przykłady użycia:**
```bash
# Use default configuration
python main.py chat-pagespeed

# Analyze specific website
python main.py chat-pagespeed --website-url https://competitor.com

# Custom shop with URL
python main.py chat-pagespeed --shop-id abc123 --website-url https://shop.com
```

**💡 Sample Queries:**
- **Performance Overview**: "What's the performance score?", "How is website performing?"
- **Core Web Vitals**: "How are Core Web Vitals?", "Check LCP performance"
- **Optimization**: "What are biggest performance issues?", "What should I optimize first?"
- **Specific Areas**: "What image optimizations needed?", "Are there JS issues?"
- **Mobile**: "How's mobile performance?", "Mobile optimization priorities?"

**🛠️ Available MCP Tool (1 total):**

1. **`analyze_pagespeed`** - Complete performance analysis
   - Overall performance score (0-100)
   - Core Web Vitals (LCP, FID, CLS)
   - Loading experience metrics (FCP, FID)
   - Top 5 improvement suggestions with:
     * Title and description
     * Potential impact (High/Medium/Low)
     * Current values and savings

**📚 Complete Documentation:**
- **Full Guide**: `.ai/mcp-pagespeed/README.md`
- **Installation**: `.ai/mcp-pagespeed/installation.md` ⭐ **Start here for first-time setup**
- **Available Tools**: `.ai/mcp-pagespeed/available_tools.md`
- **CLI Usage**: `.ai/mcp-pagespeed/cli_usage.md`

**🏗️ Technical Architecture:**
```
User Query
    ↓
chat-pagespeed CLI Command
    ↓
PageSpeedMcpAgent (AutoGen)
    ├─> OpenAIChatCompletionClient (model: gpt-4o)
    ├─> Conversation History Management
    └─> McpWorkbench (MCP Client)
        ↓
    StdioServerParams (stdio mode)
        ↓
    PageSpeed MCP Server (Node.js subprocess)
        ├─> mcp_server_pagespeed
        └─> 1 registered tool
            ↓
    Google PageSpeed Insights API (REST)
        ↓
    Performance Metrics + Core Web Vitals
```

**🔄 Tool Calling Flow:**
1. User sends question → Added to conversation history
2. Model receives question + analyze_pagespeed tool definition
3. Model decides to call tool with website URL
4. McpWorkbench executes tool via MCP server subprocess
5. PageSpeed API returns performance data
6. Model synthesizes natural language answer with recommendations
7. Loop continues if model needs more context

**🔐 Security & Isolation:**
- **Shop-level isolation**: Each agent instance tied to specific shop_id
- **Website validation**: Verifies shop-website mapping in database
- **No authentication required**: PageSpeed Insights API is public
- **Read-only access**: Performance analysis only, no modifications

**⚡ Performance:**
- **Startup time**: ~2-3 seconds (MCP server initialization)
- **Query latency**: 10-30 seconds (PageSpeed API analysis + model reasoning)
- **Concurrent sessions**: Supported (separate MCP server per session)
- **Rate limits**: Public API, no strict limits (recommended 1-2s between calls)

**🚨 Troubleshooting:**

| Issue | Solution |
|-------|----------|
| `MCP server not found` | Run `cd mcp_server_pagespeed && npm install && npm run build` |
| `Node.js not installed` | Install Node.js 18+ from nodejs.org or via Homebrew |
| `Build failed` | Check Node.js version with `node --version`, rebuild with `npm run build` |
| `Website not accessible` | Verify URL format includes `https://` protocol |

---

### 🔍 **8 Specialized PageSpeed Analysts** - **PERFORMANCE OPTIMIZATION EXPERTS**

Each agent conducts focused performance analysis using PageSpeed data via MCP. All agents use real-time PageSpeed Insights API.

#### 1. **pagespeed-core-vitals** - Core Web Vitals Analyst

```bash
python main.py pagespeed-core-vitals
```

**Analyzes:**
- LCP (Largest Contentful Paint) - Loading performance
- FID (First Input Delay) - Interactivity
- CLS (Cumulative Layout Shift) - Visual stability
- Comparison against Google thresholds
- Business impact on conversion and SEO

**Output:** JSON analysis with threshold comparison and prioritized recommendations

#### 2. **pagespeed-mobile-performance** - Mobile Performance Specialist

```bash
python main.py pagespeed-mobile-performance
```

**Analyzes:**
- Mobile vs desktop performance differences
- Mobile-specific bottlenecks
- Mobile revenue opportunity gaps
- Mobile-first optimization priorities

**Output:** Mobile optimization strategy with revenue impact

#### 3. **pagespeed-load-optimizer** - Page Load Optimizer

```bash
python main.py pagespeed-load-optimizer
```

**Analyzes:**
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Render-blocking resources
- Quick win optimizations

**Output:** Loading performance improvements prioritized by impact vs effort

#### 4. **pagespeed-seo-audit** - SEO Technical Auditor

```bash
python main.py pagespeed-seo-audit
```

**Analyzes:**
- Performance impact on SEO rankings
- Core Web Vitals as ranking factor
- Mobile-first indexing compatibility
- Technical SEO through performance lens

**Output:** SEO-focused technical fixes with ranking impact

#### 5. **pagespeed-image-optimization** - Image Optimization Specialist

```bash
python main.py pagespeed-image-optimization
```

**Analyzes:**
- Unoptimized images and potential savings
- Modern format opportunities (WebP, AVIF)
- Lazy loading implementation
- LCP improvement from image optimization

**Output:** Image optimization strategy with data savings estimates

#### 6. **pagespeed-javascript-performance** - JavaScript Performance Analyst

```bash
python main.py pagespeed-javascript-performance
```

**Analyzes:**
- JavaScript execution time
- Unused JavaScript (dead code)
- Main thread blocking
- Bundle optimization opportunities

**Output:** JS optimization priorities with interactivity improvements

#### 7. **pagespeed-css-optimization** - CSS Optimization Expert

```bash
python main.py pagespeed-css-optimization
```

**Analyzes:**
- Render-blocking CSS
- Unused CSS rules
- Critical CSS extraction
- Font loading optimization

**Output:** CSS performance fixes with rendering improvements

#### 8. **pagespeed-caching-strategy** - Caching Strategy Advisor

```bash
python main.py pagespeed-caching-strategy
```

**Analyzes:**
- Browser caching configuration
- CDN implementation opportunities
- Service worker/PWA potential
- Repeat visitor performance gains

**Output:** Caching implementation strategy

---

### 📚 Complete PageSpeed MCP Documentation:

- **Full Guide**: `.ai/mcp-pagespeed/README.md`
- **Installation**: `.ai/mcp-pagespeed/installation.md` ⭐ **Start here**
- **Available Tools**: `.ai/mcp-pagespeed/available_tools.md`
- **CLI Usage**: `.ai/mcp-pagespeed/cli_usage.md`

---

### 🏗️ Technical Architecture:

```
User Query
    ↓
chat-pagespeed CLI Command
    ↓
PageSpeedMcpAgent (AutoGen)
    ├─> OpenAIChatCompletionClient (model: gpt-4o)
    ├─> Conversation History Management
    └─> McpWorkbench (MCP Client)
        ↓
    StdioServerParams (stdio mode)
        ↓
    PageSpeed MCP Server (Node.js)
        ├─> mcp_server_pagespeed
        └─> 1 registered tool
            ↓
    Google PageSpeed Insights API (REST)
        ↓
    Performance Data (Core Web Vitals + Recommendations)
```

---

### 🔐 Security & Isolation:

- **Shop-level isolation**: Each agent instance tied to specific shop_id
- **Website validation**: Verifies shop-website access
- **No authentication**: Public PageSpeed Insights API
- **Read-only access**: Analysis only, no modifications

---

### ⚡ Performance:

- **Startup time**: ~2-3 seconds (MCP server initialization)
- **Analysis latency**: 10-30 seconds (PageSpeed API analysis time)
- **Concurrent sessions**: Supported (separate MCP server per session)
- **Rate limits**: Public API, no strict quotas (recommended: wait 1-2s between calls)

---

### 🚨 Troubleshooting:

| Issue | Solution |
|-------|----------|
| `MCP server not found` | Build server: `cd mcp_server_pagespeed && npm run build` |
| `Node.js not installed` | Install Node.js 18+: `brew install node` or from nodejs.org |
| `Build failed` | Check Node.js version: `node --version`, then `npm install && npm run build` |
| `Slow analysis` | Normal - PageSpeed API takes 10-30s per analysis |

---

### ✅ Production Status:

- ✅ **MCP Server**: Node.js-based, stdio mode connection (github.com/enemyrr/mcp_server_pagespeed)
- ✅ **Tool Integration**: analyze_pagespeed tool tested and operational
- ✅ **Conversational Interface**: Natural language performance queries working
- ✅ **8 Specialized Agents**: Production-ready performance analysts
- ✅ **Documentation**: Complete guides and CLI usage
- ✅ **No Authentication Required**: Public PageSpeed Insights API
- ✅ **Website Auto-Detection**: Resolves from ai_shop_knowledge_base or defaults to acusmed.pl

---

**Status**: ✅ **Production-Ready CLI with Complete Polish Recommendation Pipeline**  
**Framework**: 🔥 **AutoGen 0.7.4 + Rich UI + Live Logging**  
**Database**: 🗄️ **PostgreSQL with Polish Production Recommendation Storage**  
**Models**: 🧠 **Strategic Model Assignment (o3-mini + gpt-4.1 + gpt-4o-mini)**  
**Architecture**: 🤖 **2-Level Hierarchical Specialist Teams + Polish Recommendation Formatter**  
**Teams**: 🎯 **Performance Marketing + SEO + UX (4-agent consultancies) + Production Pipeline**  
**Localization**: 🇵🇱 **Polish Business Format with Mandatory Impact Prefixes**  
**Web Research**: 🌐 **MultimodalWebSurfer + Screenshot Analysis**  
**MCP Integration**: 🌐 **GA4 + GSC + PageSpeed via MCP (30+ commands: 3 chat interfaces + 28 specialists + anomaly scanners)**  
**Output**: 📊 **Polish Production Recommendations (h1, impact, text, desc) + Database Persistence**  
**Batch Processing**: 🚀 **10-Anomaly Batch Workflow with Quick Test Configuration**  
**Monitoring**: 📡 **Real-time API calls + Token usage + Rate limit handling**  
**Production**: 🎯 **Polish Business-Ready Recommendations with Terminal Display + Context Extraction + Database Save**
