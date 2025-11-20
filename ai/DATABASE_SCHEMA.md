# Database Schema - Complete Reference

**PostgreSQL Database Structure for BerryBoo AI**

> **Prerequisites**: Read [START_HERE.md](START_HERE.md) and [SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md) first.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [AI Core Tables](#ai-core-tables)
3. [Analytics Tables](#analytics-tables)
4. [Integration Tables](#integration-tables)
5. [Indexes & Performance](#indexes--performance)
6. [Relationships](#relationships)

---

## 🎯 Overview

The BerryBoo AI system uses PostgreSQL with multiple databases. The AI system primarily interacts with:

### Database Configuration

```
┌─────────────────────────────────────────────────────┐
│             DATABASE ARCHITECTURE                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  PRIMARY DATABASE (beryboo)                         │
│  ├─ AI Tables (ai_*)                                │
│  ├─ Integration Tables (importers_integration)      │
│  ├─ Shop Tables (sources_shop)                      │
│  └─ Analytics Tables (analytics_stats*)             │
│                                                      │
│  ANALYTICS DATABASE (beryboo_analytics)             │
│  └─ Time-series analytics data                      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Table Categories

| Category | Count | Purpose |
|----------|-------|---------|
| **AI Core** | 11 | Agent operations, insights, recommendations |
| **Analytics** | 10+ | Historical metrics, trends, anomalies |
| **Integration** | 1 | OAuth credentials per shop |
| **Shop** | 1 | Client shop information |

---

## 🤖 AI Core Tables

### 1. ai_general_anomalies

**Purpose**: Stores detected anomalies (reactive pipeline input)

```sql
CREATE TABLE ai_general_anomalies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL,
    property_id VARCHAR(64),
    metric VARCHAR(128) NOT NULL,
    z_score NUMERIC(10,4),
    baseline_change_pct NUMERIC(10,4),
    current_value NUMERIC,
    baseline_value NUMERIC,
    business_impact NUMERIC(10,4),
    detected_at TIMESTAMPTZ DEFAULT now(),
    processed BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_anomalies_processed ON ai_general_anomalies(processed, detected_at DESC);
CREATE INDEX idx_anomalies_shop ON ai_general_anomalies(shop_id, detected_at DESC);
CREATE INDEX idx_anomalies_metric ON ai_general_anomalies(metric);
```

**Key Fields**:
- `metric`: Type of anomaly (revenue, conversion_rate, traffic, etc.)
- `z_score`: Statistical significance (typically > 2.5 triggers alert)
- `baseline_change_pct`: Percentage change from baseline
- `business_impact`: Impact score (0.0-1.0)
- `processed`: Whether Reactive Master Agent has processed it

**Example**:
```json
{
  "id": "uuid-123",
  "shop_id": "shop-abc",
  "metric": "conversion_rate",
  "z_score": -3.2,
  "baseline_change_pct": -15.3,
  "current_value": 0.021,
  "baseline_value": 0.025,
  "business_impact": 0.89,
  "processed": false
}
```

### 2. ai_insights

**Purpose**: Stores MCP agent reports (proactive pipeline input)

```sql
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL,
    property_id VARCHAR(64),
    mcp_source VARCHAR(32) NOT NULL,  -- 'ga4', 'gsc', 'pagespeed', 'google_ads', 'meta_ads'
    agent_name VARCHAR(128) NOT NULL,
    report_data JSONB NOT NULL,
    analysis_period_start TIMESTAMPTZ,
    analysis_period_end TIMESTAMPTZ,
    metrics_analyzed TEXT[],
    status VARCHAR(32) DEFAULT 'generated',
    processed_by_master BOOLEAN DEFAULT FALSE,
    insight_priority VARCHAR(32),
    confidence_score NUMERIC(5,4),
    business_impact VARCHAR(32),
    trace_id VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_ai_insights_processed ON ai_insights(processed_by_master, created_at DESC);
CREATE INDEX idx_ai_insights_mcp_source ON ai_insights(mcp_source);
CREATE INDEX idx_ai_insights_shop ON ai_insights(shop_id, created_at DESC);
CREATE INDEX idx_ai_insights_report_data ON ai_insights USING GIN(report_data);
```

**Key Fields**:
- `mcp_source`: Which MCP server generated the insight
- `agent_name`: Specific specialized agent (e.g., "conversion_funnel_analyst")
- `report_data`: Full JSONB report with executive_summary, metrics, opportunities
- `processed_by_master`: Whether Proactive Master Agent has processed it
- `insight_priority`: Priority set by Proactive Master (URGENT/HIGH/MEDIUM/LOW)

**Example**:
```json
{
  "id": "insight-456",
  "shop_id": "shop-abc",
  "mcp_source": "ga4",
  "agent_name": "conversion_funnel_analyst",
  "report_data": {
    "executive_summary": {...},
    "metrics": [...],
    "opportunities": [...]
  },
  "processed_by_master": false
}
```

### 3. ai_recommendations

**Purpose**: Final production recommendations (output)

```sql
CREATE TABLE ai_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL,
    property_id VARCHAR(64),
    source_type VARCHAR(32) NOT NULL,  -- 'anomaly' or 'mcp_report'
    anomaly_id UUID,
    insight_id UUID,
    domain VARCHAR(32),  -- 'performance_marketing', 'seo', 'ux', 'gsc'
    priority VARCHAR(32),  -- 'URGENT', 'HIGH', 'MEDIUM', 'LOW'
    recommendation_data JSONB NOT NULL,  -- Polish ProductionRecommendation
    status VARCHAR(32) DEFAULT 'active',
    implemented BOOLEAN DEFAULT FALSE,
    implementation_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE,
    FOREIGN KEY (anomaly_id) REFERENCES ai_general_anomalies(id) ON DELETE SET NULL,
    FOREIGN KEY (insight_id) REFERENCES ai_insights(id) ON DELETE SET NULL
);

CREATE INDEX idx_recommendations_shop ON ai_recommendations(shop_id, created_at DESC);
CREATE INDEX idx_recommendations_source ON ai_recommendations(source_type, priority);
CREATE INDEX idx_recommendations_status ON ai_recommendations(status, implemented);
CREATE INDEX idx_recommendations_data ON ai_recommendations USING GIN(recommendation_data);
```

**Key Fields**:
- `source_type`: Origin (anomaly-based or mcp_report-based)
- `anomaly_id` or `insight_id`: Links back to input source
- `domain`: Which specialist team generated it
- `recommendation_data`: Polish business-ready recommendation (h1, impact, text, desc)
- `implemented`: Whether client acted on recommendation

**Example**:
```json
{
  "id": "rec-789",
  "shop_id": "shop-abc",
  "source_type": "mcp_report",
  "insight_id": "insight-456",
  "domain": "ux_conversion",
  "priority": "HIGH",
  "recommendation_data": {
    "h1": "Opcja zakupu bez rejestracji",
    "impact": "Szacowany wzrost konwersji o 10%",
    "text": "Dodanie opcji zakupu jako gość...",
    "desc": "Szczegółowy opis..."
  },
  "implemented": false
}
```

### 4. ai_agent_execution_log

**Purpose**: Agent execution tracking and debugging

```sql
CREATE TABLE ai_agent_execution_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID,
    agent_name VARCHAR(128) NOT NULL,
    agent_role VARCHAR(64),  -- 'schema', 'research', 'strategy', 'validator'
    execution_status VARCHAR(32),  -- 'started', 'completed', 'failed'
    input_data JSONB,
    output_data JSONB,
    error_message TEXT,
    execution_time_ms INTEGER,
    tokens_used INTEGER,
    cost_usd NUMERIC(10,6),
    trace_id VARCHAR(128),
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_agent_log_shop ON ai_agent_execution_log(shop_id, started_at DESC);
CREATE INDEX idx_agent_log_status ON ai_agent_execution_log(execution_status);
CREATE INDEX idx_agent_log_trace ON ai_agent_execution_log(trace_id);
```

### 5. ai_shop_knowledge_base

**Purpose**: Persistent shop-specific knowledge (competitive intel, website details)

```sql
CREATE TABLE ai_shop_knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL,
    knowledge_type VARCHAR(64) NOT NULL,  -- 'website_analysis', 'competitor_analysis', etc.
    knowledge_data JSONB NOT NULL,
    last_updated TIMESTAMPTZ DEFAULT now(),
    valid_until TIMESTAMPTZ,
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE,
    UNIQUE(shop_id, knowledge_type)
);

CREATE INDEX idx_knowledge_shop ON ai_shop_knowledge_base(shop_id);
CREATE INDEX idx_knowledge_type ON ai_shop_knowledge_base(knowledge_type);
```

### 6. ai_recommendation_feedback

**Purpose**: Track client feedback on recommendations

```sql
CREATE TABLE ai_recommendation_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recommendation_id UUID NOT NULL,
    shop_id UUID NOT NULL,
    feedback_type VARCHAR(32),  -- 'helpful', 'not_helpful', 'implemented'
    feedback_text TEXT,
    rating INTEGER,  -- 1-5
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (recommendation_id) REFERENCES ai_recommendations(id) ON DELETE CASCADE,
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_feedback_recommendation ON ai_recommendation_feedback(recommendation_id);
CREATE INDEX idx_feedback_shop ON ai_recommendation_feedback(shop_id, created_at DESC);
```

### 7. ai_property_shop_mapping

**Purpose**: Map GA4 properties to shops

```sql
CREATE TABLE ai_property_shop_mapping (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL,
    property_id VARCHAR(64) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE,
    UNIQUE(shop_id, property_id)
);

CREATE INDEX idx_property_mapping_shop ON ai_property_shop_mapping(shop_id);
CREATE INDEX idx_property_mapping_property ON ai_property_shop_mapping(property_id);
```

### 8. ai_domain_recommendations

**Purpose**: Store domain-specific recommendation templates

```sql
CREATE TABLE ai_domain_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(32) NOT NULL,  -- 'seo', 'performance_marketing', 'ux', 'gsc'
    recommendation_type VARCHAR(64) NOT NULL,
    template_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_domain_rec_domain ON ai_domain_recommendations(domain);
```

### 9-11. Supporting Tables

- `ai_agent_context`: Shared context between agents
- `ai_conversation_log`: Chat logs for interactive agents
- `ai_shared_memory`: Persistent memory across sessions
- `ai_specialist_performance`: Track specialist team performance metrics

---

## 📊 Analytics Tables

### analytics_statsgaacquisition

**Purpose**: GA4 acquisition data (used by Schema agents)

```sql
CREATE TABLE analytics_statsgaacquisition (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    date DATE NOT NULL,
    source VARCHAR(255),
    medium VARCHAR(255),
    campaign VARCHAR(255),
    sessions INTEGER,
    users INTEGER,
    new_users INTEGER,
    engaged_sessions INTEGER,
    engagement_rate NUMERIC(10,6),
    bounce_rate NUMERIC(10,6),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE,
    UNIQUE(shop_id, date, source, medium, campaign)
);

CREATE INDEX idx_ga_acquisition_shop_date ON analytics_statsgaacquisition(shop_id, date DESC);
CREATE INDEX idx_ga_acquisition_source ON analytics_statsgaacquisition(source, medium);
```

### analytics_statsgaproductperformance

**Purpose**: Product-level GA4 data

```sql
CREATE TABLE analytics_statsgaproductperformance (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    date DATE NOT NULL,
    item_name VARCHAR(512),
    item_id VARCHAR(255),
    item_category VARCHAR(255),
    item_views INTEGER,
    add_to_carts INTEGER,
    checkouts INTEGER,
    purchases INTEGER,
    item_revenue NUMERIC(15,2),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_ga_product_shop_date ON analytics_statsgaproductperformance(shop_id, date DESC);
CREATE INDEX idx_ga_product_item ON analytics_statsgaproductperformance(item_id);
```

### analytics_statsordersanalytics

**Purpose**: Order and conversion analytics

```sql
CREATE TABLE analytics_statsordersanalytics (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    date DATE NOT NULL,
    transactions INTEGER,
    revenue NUMERIC(15,2),
    avg_order_value NUMERIC(10,2),
    conversion_rate NUMERIC(10,6),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE,
    UNIQUE(shop_id, date)
);

CREATE INDEX idx_orders_shop_date ON analytics_statsordersanalytics(shop_id, date DESC);
```

### analytics_statsadscampaignperformance

**Purpose**: PPC campaign performance

```sql
CREATE TABLE analytics_statsadscampaignperformance (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    date DATE NOT NULL,
    platform VARCHAR(32),  -- 'google_ads', 'meta_ads'
    campaign_id VARCHAR(255),
    campaign_name VARCHAR(512),
    impressions INTEGER,
    clicks INTEGER,
    spend NUMERIC(15,2),
    conversions INTEGER,
    revenue NUMERIC(15,2),
    ctr NUMERIC(10,6),
    cpc NUMERIC(10,2),
    roas NUMERIC(10,2),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_ads_shop_date ON analytics_statsadscampaignperformance(shop_id, date DESC);
CREATE INDEX idx_ads_platform ON analytics_statsadscampaignperformance(platform, campaign_id);
```

### analytics_statsdailyanomalies

**Purpose**: Pre-detected anomalies (feeds into ai_general_anomalies)

```sql
CREATE TABLE analytics_statsdailyanomalies (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    date DATE NOT NULL,
    metric VARCHAR(128),
    z_score NUMERIC(10,4),
    current_value NUMERIC,
    baseline_value NUMERIC,
    change_pct NUMERIC(10,4),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_daily_anomalies_shop ON analytics_statsdailyanomalies(shop_id, date DESC);
```

---

## 🔗 Integration Tables

### importers_integration

**Purpose**: OAuth credentials per shop (multi-tenant)

```sql
CREATE TABLE importers_integration (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    integration_type SMALLINT NOT NULL,  -- 201=GA4, 202=Google Ads, 203=Meta Ads, 204=GSC
    data JSONB NOT NULL,  -- OAuth tokens
    active BOOLEAN DEFAULT TRUE,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    FOREIGN KEY (shop_id) REFERENCES sources_shop(id) ON DELETE CASCADE
);

CREATE INDEX idx_integration_shop ON importers_integration(shop_id, integration_type);
CREATE INDEX idx_integration_active ON importers_integration(active, deleted);
```

**data JSONB Structure** (GA4 example):
```json
{
  "token": "ya29.a0AfH6SMBx...",
  "refresh_token": "1//0gVyT8pqLx...",
  "property_id": "326784853",
  "token_uri": "https://oauth2.googleapis.com/token",
  "client_id": "123456789.apps.googleusercontent.com",
  "client_secret": "GOCSPX-...",
  "granted_scopes": ["https://www.googleapis.com/auth/analytics.readonly"]
}
```

### sources_shop

**Purpose**: Client shop information

```sql
CREATE TABLE sources_shop (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(512),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_shop_active ON sources_shop(active);
CREATE INDEX idx_shop_domain ON sources_shop(domain);
```

---

## ⚡ Indexes & Performance

### Index Strategy

```sql
-- Time-series queries (most common)
CREATE INDEX idx_recommendations_shop_created ON ai_recommendations(shop_id, created_at DESC);
CREATE INDEX idx_insights_shop_created ON ai_insights(shop_id, created_at DESC);
CREATE INDEX idx_anomalies_shop_detected ON ai_general_anomalies(shop_id, detected_at DESC);

-- Status-based queries
CREATE INDEX idx_insights_processed ON ai_insights(processed_by_master) WHERE processed_by_master = false;
CREATE INDEX idx_anomalies_processed ON ai_general_anomalies(processed) WHERE processed = false;

-- JSONB queries (GIN index)
CREATE INDEX idx_insights_report_data ON ai_insights USING GIN(report_data);
CREATE INDEX idx_recommendations_data ON ai_recommendations USING GIN(recommendation_data);

-- Foreign key performance
CREATE INDEX idx_recommendations_anomaly ON ai_recommendations(anomaly_id);
CREATE INDEX idx_recommendations_insight ON ai_recommendations(insight_id);
```

### Query Optimization

```sql
-- Efficient unprocessed insights query
SELECT * FROM ai_insights 
WHERE processed_by_master = false 
  AND shop_id = 'shop-uuid'
ORDER BY created_at DESC 
LIMIT 50;
-- Uses: idx_insights_processed + idx_insights_shop_created

-- Efficient recommendation retrieval
SELECT * FROM ai_recommendations
WHERE shop_id = 'shop-uuid'
  AND status = 'active'
ORDER BY created_at DESC
LIMIT 20;
-- Uses: idx_recommendations_shop_created + idx_recommendations_status
```

---

## 🔄 Relationships

### Entity Relationship Diagram

```
┌──────────────────┐
│  sources_shop    │
└────────┬─────────┘
         │ 1:N
         ├───────────────────────────────────┐
         │                                   │
┌────────▼──────────┐         ┌──────────────▼───────────┐
│ importers_        │         │ ai_property_shop_        │
│   integration     │         │   mapping                │
└───────────────────┘         └──────────────────────────┘
         │                                   │
         │ OAuth                             │ Maps
         │ Credentials                       │ Properties
         ▼                                   ▼
┌───────────────────────────────────────────────────┐
│           MCP Servers (Use Credentials)           │
└───────────────────────────────────────────────────┘
         │
         │ Generate
         ▼
┌──────────────────────┐
│   ai_insights        │  (Proactive Input)
└─────────┬────────────┘
          │
          │ Processed by
          │ Proactive Master
          ▼
┌──────────────────────┐         ┌───────────────────────┐
│ ai_general_          │         │                       │
│   anomalies          │────────▶│  ai_recommendations   │
└──────────────────────┘         │                       │
  (Reactive Input)               │  (Final Output)       │
          │                      │                       │
          │ Processed by         └──────────┬────────────┘
          │ Reactive Master                 │
          │                                 │ Feedback
          │                                 ▼
          │                      ┌───────────────────────┐
          └─────────────────────▶│ ai_recommendation_    │
                                 │    feedback           │
                                 └───────────────────────┘
```

### Data Flow

```
1. Client Shop (sources_shop)
   └─ Has OAuth credentials (importers_integration)
   └─ Has property mapping (ai_property_shop_mapping)

2. MCP Servers use OAuth credentials
   └─ Generate insights (ai_insights)

3. Anomaly Detection System
   └─ Generates anomalies (ai_general_anomalies)

4. Master Agents process inputs
   └─ Reactive: anomalies → InsightPackage
   └─ Proactive: insights → InsightPackage

5. Specialist Teams analyze
   └─ Generate technical recommendations

6. Production Pipeline
   └─ Format to Polish (ProductionRecommendation)
   └─ Save to ai_recommendations

7. Client provides feedback
   └─ Stored in ai_recommendation_feedback
```

---

## 📚 Related Documentation

- **[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)**: How these tables fit into the system
- **[AGENTS_MASTER.md](AGENTS_MASTER.md)**: How anomalies and insights are processed
- **[AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)**: How ai_insights are generated
- **[MULTI_TENANT.md](MULTI_TENANT.md)**: Shop isolation and security
- **[OAUTH_INTEGRATION.md](OAUTH_INTEGRATION.md)**: Integration table usage





