# Specialized MCP Agents - 48 Data Collection Agents

**Automated Daily Analysis & Insight Generation**

> **Prerequisites**: Read [Start Here](/start-here), [System Overview](/system-overview), and [MCP Integration](/mcp-integration) first.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [GA4 Agents (10)](#ga4-agents)
3. [GSC Agents (10)](#gsc-agents)
4. [PageSpeed Agents (8)](#pagespeed-agents)
5. [Google Ads Agents (10)](#google-ads-agents)
6. [Meta Ads Agents (10)](#meta-ads-agents)
7. [Scheduling & Execution](#scheduling--execution)
8. [Insight Storage](#insight-storage)

---

## 🎯 Overview

The **48 specialized MCP agents** run automated daily analyses across 5 data sources. Each agent focuses on a specific aspect of e-commerce performance and generates structured insights stored in the `ai_insights` table.

### Purpose

```
┌──────────────────────────────────────────────────────────┐
│         SPECIALIZED MCP AGENTS ARCHITECTURE               │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Daily Schedule (Nightly)                                │
│  ┌─────────────────────────────────────────────────┐    │
│  │  48 Specialized Agents (Parallel Execution)     │    │
│  │                                                  │    │
│  │  GA4 (10) ─┐                                    │    │
│  │  GSC (10) ─┤                                    │    │
│  │  PageSpeed (8) ─┤  → Analyze Data              │    │
│  │  Google Ads (10) ─┤                            │    │
│  │  Meta Ads (10) ────┘                            │    │
│  └────────────┬─────────────────────────────────────┘    │
│               │                                          │
│  ┌────────────▼─────────────────────────────────────┐    │
│  │  ai_insights Table (JSONB)                      │    │
│  │  - Structured reports                            │    │
│  │  - Executive summaries                          │    │
│  │  - Metrics, opportunities, risks                │    │
│  └────────────┬─────────────────────────────────────┘    │
│               │                                          │
│  ┌────────────▼─────────────────────────────────────┐    │
│  │  Proactive Master Agent                          │    │
│  │  - Processes unprocessed insights                │    │
│  │  - Creates InsightPackage                        │    │
│  │  - Routes to specialist teams                    │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Key Characteristics

| Aspect | Details |
|--------|---------|
| **Total Count** | 48 agents |
| **Execution** | Daily (nightly batch) |
| **Runtime** | 30-60 minutes (parallel) |
| **Output** | JSONB reports in `ai_insights` |
| **Processing** | Proactive Master Agent |

---

## 📊 GA4 Agents (10)

### 1. Conversion Funnel Analyst

**Focus**: Analyze checkout and conversion paths  
**Data Sources**: GA4 e-commerce events, funnel exploration  
**Key Metrics**: Funnel drop-offs, conversion rates by stage, device performance

**Insight Example**:
```json
{
  "agent_name": "conversion_funnel_analyst",
  "executive_summary": {
    "key_finding": "Checkout conversion dropped from 55% to 47%",
    "business_impact": "Estimated 15% revenue loss",
    "urgency": "high"
  },
  "metrics": [
    {"stage": "product_view", "users": 15420},
    {"stage": "add_to_cart", "users": 3890, "conversion": 0.252},
    {"stage": "checkout", "users": 890, "conversion": 0.229},
    {"stage": "purchase", "users": 420, "conversion": 0.472}
  ],
  "opportunities": [
    {
      "opportunity": "Optimize cart-to-checkout step",
      "estimated_impact": "8-12% conversion increase",
      "priority": "high"
    }
  ]
}
```

### 2. Customer Lifetime Value Strategist

**Focus**: LTV optimization and retention  
**Data Sources**: GA4 user lifetime value, cohort analysis  
**Key Metrics**: LTV by cohort, retention rates, repeat purchase patterns

### 3. Product Performance Optimizer

**Focus**: Product-level performance analysis  
**Data Sources**: GA4 item performance, product views, add-to-cart rates  
**Key Metrics**: Product conversion rates, revenue per product, top performers

### 4. Checkout Optimization Specialist

**Focus**: Checkout flow optimization  
**Data Sources**: GA4 checkout events, payment selection, form interactions  
**Key Metrics**: Checkout abandonment, payment method performance, mobile vs desktop

### 5. User Engagement Analyst

**Focus**: Session quality and engagement metrics  
**Data Sources**: GA4 engagement metrics, session duration, pages per session  
**Key Metrics**: Engaged sessions, bounce rate, scroll depth

### 6. Mobile Commerce Specialist

**Focus**: Mobile-specific optimization  
**Data Sources**: GA4 device category reports, mobile user behavior  
**Key Metrics**: Mobile conversion gap, app vs mobile web, device-specific issues

### 7. Geographic Expansion Analyst

**Focus**: Geographic performance and expansion opportunities  
**Data Sources**: GA4 geographic reports, regional conversion rates  
**Key Metrics**: Revenue by region, untapped markets, regional trends

### 8. Marketing Attribution Specialist

**Focus**: Multi-channel attribution analysis  
**Data Sources**: GA4 attribution reports, channel performance  
**Key Metrics**: Assisted conversions, attribution paths, channel ROI

### 9. Seasonal Trends Forecaster

**Focus**: Seasonality and trend prediction  
**Data Sources**: GA4 historical trends, year-over-year comparisons  
**Key Metrics**: Seasonal patterns, growth forecasts, trend predictions

### 10. Data Quality Auditor

**Focus**: GA4 data quality and integrity  
**Data Sources**: GA4 data quality metrics, tracking implementation  
**Key Metrics**: Data completeness, tracking errors, configuration issues

---

## 🔍 GSC Agents (10)

### 1. Search Performance Analyst

**Focus**: Overall search performance analysis  
**Data Sources**: GSC search analytics, query performance  
**Key Metrics**: Total clicks, impressions, CTR, average position

**Insight Example**:
```json
{
  "agent_name": "search_performance_analyst",
  "executive_summary": {
    "key_finding": "Organic clicks declined 18% month-over-month",
    "business_impact": "12% reduction in organic revenue",
    "urgency": "high"
  },
  "metrics": [
    {"metric": "clicks", "current": 12340, "previous": 15000, "change": -17.7},
    {"metric": "impressions", "current": 456780, "previous": 489000, "change": -6.6},
    {"metric": "avg_position", "current": 14.2, "previous": 12.1, "change": 17.4}
  ],
  "opportunities": [
    {
      "opportunity": "Recover lost rankings for top 20 queries",
      "estimated_impact": "15% click recovery",
      "priority": "urgent"
    }
  ]
}
```

### 2. Keyword Opportunity Hunter

**Focus**: Keyword gap analysis and opportunities  
**Data Sources**: GSC query data, position distribution  
**Key Metrics**: Keywords ranked 11-20 (quick wins), new keyword opportunities

### 3. Competitive Search Intelligence

**Focus**: Competitive SERP analysis  
**Data Sources**: GSC query-level data, position changes  
**Key Metrics**: Lost vs gained keywords, competitive displacement

### 4. Technical SEO Auditor

**Focus**: Technical SEO health check  
**Data Sources**: GSC coverage reports, mobile usability, security issues  
**Key Metrics**: Index coverage, crawl errors, mobile usability issues

### 5. Page Experience Optimizer

**Focus**: Core Web Vitals and page experience  
**Data Sources**: GSC Page Experience report, Core Web Vitals  
**Key Metrics**: LCP, FID, CLS by page, mobile vs desktop scores

### 6. Mobile SEO Specialist

**Focus**: Mobile search optimization  
**Data Sources**: GSC mobile usability, mobile search performance  
**Key Metrics**: Mobile-specific ranking issues, mobile usability errors

### 7. Indexing Crawl Optimizer

**Focus**: Crawl budget and indexing optimization  
**Data Sources**: GSC crawl stats, index coverage  
**Key Metrics**: Crawl frequency, indexation rate, crawl budget waste

### 8. Content Gap Analyzer

**Focus**: Content opportunity identification  
**Data Sources**: GSC queries with high impressions but low clicks  
**Key Metrics**: High-impression low-CTR queries, content opportunities

### 9. SERP Features Optimizer

**Focus**: Featured snippets and rich results  
**Data Sources**: GSC search appearance data  
**Key Metrics**: Featured snippet opportunities, rich result eligibility

### 10. Site Structure Analyzer

**Focus**: Internal linking and architecture  
**Data Sources**: GSC page-level data, internal link analysis  
**Key Metrics**: Page authority distribution, orphan pages, internal linking gaps

---

## ⚡ PageSpeed Agents (8)

### 1. Core Web Vitals Analyst

**Focus**: LCP, FID, CLS optimization  
**Data Sources**: PageSpeed Insights API, Core Web Vitals metrics  
**Key Metrics**: LCP, FID, CLS scores, field data vs lab data

**Insight Example**:
```json
{
  "agent_name": "core_web_vitals_analyst",
  "executive_summary": {
    "key_finding": "LCP on mobile exceeds 3.5s (poor threshold)",
    "business_impact": "Potential 10-15% mobile conversion loss",
    "urgency": "high"
  },
  "metrics": [
    {"metric": "LCP", "value": 3.8, "threshold": "poor", "device": "mobile"},
    {"metric": "FID", "value": 180, "threshold": "needs_improvement", "device": "mobile"},
    {"metric": "CLS", "value": 0.15, "threshold": "good", "device": "mobile"}
  ],
  "opportunities": [
    {
      "opportunity": "Optimize image loading for hero section",
      "estimated_impact": "1.2s LCP improvement",
      "priority": "high"
    }
  ]
}
```

### 2. Mobile Performance Specialist

**Focus**: Mobile-specific performance  
**Data Sources**: PageSpeed mobile strategy analysis  
**Key Metrics**: Mobile performance score, mobile-specific bottlenecks

### 3. Page Load Optimizer

**Focus**: Overall load time optimization  
**Data Sources**: PageSpeed lab data, resource loading  
**Key Metrics**: First Contentful Paint, Time to Interactive, Total Blocking Time

### 4. JavaScript Performance Analyst

**Focus**: JS bundle size and execution  
**Data Sources**: PageSpeed diagnostics, JavaScript coverage  
**Key Metrics**: Main thread blocking time, unused JavaScript, execution time

### 5. CSS Optimization Expert

**Focus**: CSS delivery and optimization  
**Data Sources**: PageSpeed CSS diagnostics  
**Key Metrics**: Render-blocking CSS, unused CSS, CSS bundle size

### 6. Image Optimization Specialist

**Focus**: Image compression and formats  
**Data Sources**: PageSpeed image diagnostics  
**Key Metrics**: Image file sizes, next-gen formats adoption, lazy loading

### 7. Caching Strategy Advisor

**Focus**: Browser and server caching  
**Data Sources**: PageSpeed caching diagnostics  
**Key Metrics**: Cache hit rates, cache-control headers, static resource caching

### 8. SEO Technical Auditor

**Focus**: Performance impact on SEO  
**Data Sources**: PageSpeed + GSC correlation  
**Key Metrics**: Performance vs rankings correlation, mobile-first indexing readiness

---

## 📱 Google Ads Agents (10)

### 1. Campaign Performance Analyst

**Focus**: Campaign-level optimization  
**Data Sources**: Google Ads API, campaign metrics  
**Key Metrics**: ROAS, CPA, conversion rate by campaign

**Insight Example**:
```json
{
  "agent_name": "campaign_performance_analyst",
  "executive_summary": {
    "key_finding": "Shopping campaigns underperforming vs search (ROAS 2.1 vs 3.8)",
    "business_impact": "Potential budget reallocation opportunity",
    "urgency": "medium"
  },
  "metrics": [
    {"campaign_type": "search", "roas": 3.8, "spend": 12500},
    {"campaign_type": "shopping", "roas": 2.1, "spend": 8900}
  ],
  "opportunities": [
    {
      "opportunity": "Shift 20% budget from Shopping to Search",
      "estimated_impact": "15% overall ROAS increase",
      "priority": "high"
    }
  ]
}
```

### 2. Bid Strategy Optimizer

**Focus**: Bidding strategy and budget allocation  
**Data Sources**: Google Ads bid strategy performance  
**Key Metrics**: Target CPA vs actual CPA, budget utilization, bid strategy efficiency

### 3. Account Structure Auditor

**Focus**: Account organization and hygiene  
**Data Sources**: Google Ads account structure data  
**Key Metrics**: Campaign organization, ad group structure, quality score distribution

### 4. Creative Performance Optimizer

**Focus**: Ad creative testing and optimization  
**Data Sources**: Google Ads ad performance  
**Key Metrics**: CTR by creative, conversion rate by ad copy, creative fatigue

### 5. Keyword Strategy Specialist

**Focus**: Keyword strategy and negative keywords  
**Data Sources**: Google Ads search term reports  
**Key Metrics**: Wasted spend on irrelevant queries, keyword match type performance

### 6. Audience Targeting Expert

**Focus**: Audience segmentation and targeting  
**Data Sources**: Google Ads audience performance  
**Key Metrics**: Audience-level ROAS, remarketing performance, custom audience effectiveness

### 7. Ad Copy Testing Specialist

**Focus**: Ad copy A/B testing  
**Data Sources**: Google Ads ad variations  
**Key Metrics**: Headline performance, description effectiveness, call-to-action impact

### 8. Landing Page Performance Analyst

**Focus**: Landing page optimization  
**Data Sources**: Google Ads landing page reports  
**Key Metrics**: Landing page conversion rate, bounce rate by landing page

### 9. Video Creative Analyzer

**Focus**: Video ad performance  
**Data Sources**: Google Ads video campaign data  
**Key Metrics**: Video completion rate, VTR (View Through Rate), video creative effectiveness

### 10. Shopping Campaign Optimizer

**Focus**: Shopping feed and campaigns  
**Data Sources**: Google Ads Shopping performance  
**Key Metrics**: Product-level ROAS, feed optimization opportunities, bidding adjustments

---

## 📘 Meta Ads Agents (10)

### 1. Campaign Performance Analyst

**Focus**: Campaign-level Meta analysis  
**Data Sources**: Meta Ads API, campaign insights  
**Key Metrics**: ROAS, CPA, frequency, reach

### 2. Creative Performance Optimizer

**Focus**: Creative testing and fatigue analysis  
**Data Sources**: Meta Ads creative reports  
**Key Metrics**: Creative fatigue indicators, CTR decline, creative freshness

### 3. Bid Strategy Optimizer

**Focus**: Meta bidding and budget optimization  
**Data Sources**: Meta Ads bidding data  
**Key Metrics**: Bid cap performance, campaign budget optimization effectiveness

### 4. Audience Targeting Expert

**Focus**: Lookalike and custom audiences  
**Data Sources**: Meta Ads audience insights  
**Key Metrics**: Audience overlap, lookalike audience performance, custom audience effectiveness

### 5. Geographic Expansion Analyst

**Focus**: Geographic targeting opportunities  
**Data Sources**: Meta Ads geographic performance  
**Key Metrics**: Performance by region, expansion opportunities, regional saturation

### 6. Ad Copy Testing Specialist

**Focus**: Ad copy and messaging testing  
**Data Sources**: Meta Ads ad variations  
**Key Metrics**: Primary text performance, headline effectiveness, description impact

### 7. Conversion Funnel Specialist

**Focus**: Meta funnel optimization  
**Data Sources**: Meta Ads funnel reports  
**Key Metrics**: Top-of-funnel to bottom-of-funnel efficiency, retargeting performance

### 8. Landing Page Analyst

**Focus**: Landing page performance for Meta traffic  
**Data Sources**: Meta Ads landing page data  
**Key Metrics**: Landing page conversion rate, bounce rate by source

### 9. Video Creative Analyzer

**Focus**: Video and Reels creative optimization  
**Data Sources**: Meta Ads video performance  
**Key Metrics**: Video retention rate, ThruPlay rate, video creative engagement

### 10. Account Structure Auditor

**Focus**: Campaign structure and organization  
**Data Sources**: Meta Ads account structure  
**Key Metrics**: Campaign organization, ad set efficiency, campaign budget distribution

---

## ⏰ Scheduling & Execution

### Daily Schedule

```
┌──────────────────────────────────────────────────┐
│          NIGHTLY BATCH EXECUTION                 │
├──────────────────────────────────────────────────┤
│                                                   │
│  23:00 - Start MCP Agent Execution               │
│  ├─ GA4 Agents (10) → 30 min                     │
│  ├─ GSC Agents (10) → 25 min (parallel)          │
│  ├─ PageSpeed Agents (8) → 20 min               │
│  ├─ Google Ads Agents (10) → 30 min             │
│  └─ Meta Ads Agents (10) → 30 min               │
│                                                   │
│  00:30 - All Agents Complete                     │
│  00:45 - Proactive Master Agent Starts           │
│  02:00 - Complete Pipeline Finished              │
│                                                   │
└──────────────────────────────────────────────────┘
```

### Parallel Execution

```python
async def run_all_specialized_agents(shop_id: str, property_id: str):
    """
    Execute all 48 specialized agents in parallel batches.
    """
    tasks = []
    
    # GA4 agents (10)
    for agent in GA4_AGENTS:
        task = agent.analyze(shop_id, property_id)
        tasks.append(task)
    
    # GSC agents (10)
    for agent in GSC_AGENTS:
        task = agent.analyze(shop_id, property_id)
        tasks.append(task)
    
    # PageSpeed agents (8)
    for agent in PAGESPEED_AGENTS:
        task = agent.analyze(shop_id, property_id)
        tasks.append(task)
    
    # Google Ads agents (10)
    for agent in GOOGLE_ADS_AGENTS:
        task = agent.analyze(shop_id, property_id)
        tasks.append(task)
    
    # Meta Ads agents (10)
    for agent in META_ADS_AGENTS:
        task = agent.analyze(shop_id, property_id)
        tasks.append(task)
    
    # Execute all in parallel (with concurrency limit)
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    return results
```

### CLI Commands

```bash
# Run all 48 agents for single shop
python main.py generate-mcp-reports --shop-id SHOP_ID

# Run specific MCP source
python main.py generate-mcp-reports --sources ga4,gsc --shop-id SHOP_ID

# Run for all shops (multi-tenant)
python main.py generate-mcp-reports-all-shops

# Check generated insights
python main.py view-insights --status generated --shop-id SHOP_ID
```

---

## 💾 Insight Storage

### ai_insights Table Structure

```sql
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    property_id VARCHAR(64),
    mcp_source VARCHAR(32) NOT NULL,  -- 'ga4', 'gsc', 'pagespeed', 'google_ads', 'meta_ads'
    agent_name VARCHAR(128) NOT NULL,  -- e.g., 'conversion_funnel_analyst'
    report_data JSONB NOT NULL,
    analysis_period_start TIMESTAMPTZ,
    analysis_period_end TIMESTAMPTZ,
    metrics_analyzed TEXT[],
    status VARCHAR(32) DEFAULT 'generated',
    processed_by_master BOOLEAN DEFAULT FALSE,
    insight_priority VARCHAR(32),  -- Set by Proactive Master Agent
    confidence_score NUMERIC(5,4),  -- Set by Proactive Master Agent
    business_impact VARCHAR(32),
    trace_id VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_ai_insights_processed ON ai_insights(processed_by_master, created_at DESC);
CREATE INDEX idx_ai_insights_mcp_source ON ai_insights(mcp_source);
CREATE INDEX idx_ai_insights_shop ON ai_insights(shop_id, created_at DESC);
```

### Report Data JSONB Structure

```json
{
  "agent_metadata": {
    "agent_name": "conversion_funnel_analyst",
    "mcp_source": "ga4",
    "analysis_date": "2025-01-16T03:00:00",
    "analysis_period": {
      "start": "2025-01-01",
      "end": "2025-01-15"
    }
  },
  "executive_summary": {
    "key_finding": "Main finding description",
    "business_impact": "Impact description",
    "urgency": "high|medium|low",
    "confidence": 0.85
  },
  "metrics": [
    {
      "metric_name": "checkout_conversion_rate",
      "current_value": 0.47,
      "baseline_value": 0.55,
      "change_pct": -14.5,
      "trend": "declining"
    }
  ],
  "insights": [
    {
      "insight": "Specific insight description",
      "supporting_data": "Data that supports this insight",
      "trend": "declining|improving|stable",
      "severity": "high|medium|low"
    }
  ],
  "opportunities": [
    {
      "opportunity": "Opportunity description",
      "estimated_impact": "Impact estimate (%, revenue, etc.)",
      "implementation_effort": "low|medium|high",
      "priority": "high|medium|low"
    }
  ],
  "risks": [
    {
      "risk": "Risk description",
      "likelihood": "high|medium|low",
      "impact": "high|medium|low",
      "mitigation": "Suggested mitigation"
    }
  ],
  "raw_data_summary": {
    "total_records_analyzed": 15420,
    "date_range": "30 days",
    "data_sources": ["ga4_ecommerce_events"]
  }
}
```

---

## 📚 Related Documentation

- **[AGENTS_MASTER.md](AGENTS_MASTER.md)**: Proactive Master Agent that processes these insights
- **[AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md)**: Teams that receive routed insights
- **[MCP_INTEGRATION.md](MCP_INTEGRATION.md)**: MCP servers these agents use
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)**: ai_insights table details
- **[System Overview](/system-overview)**: Complete system architecture

