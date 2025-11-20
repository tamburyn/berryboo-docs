# Specialist Teams - Expert Consultancy Groups

**4-Agent Nested Architecture + Production Pipeline**

> **Prerequisites**: Read [START_HERE.md](START_HERE.md), [SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md), and [AGENTS_MASTER.md](AGENTS_MASTER.md) first.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [4-Agent Consultancy Pattern](#4-agent-consultancy-pattern)
3. [Performance Marketing Team](#performance-marketing-team)
4. [SEO Technical Team](#seo-technical-team)
5. [UX Conversion Team](#ux-conversion-team)
6. [GSC Specialist Team](#gsc-specialist-team)
7. [Production Pipeline](#production-pipeline)
8. [Usage Examples](#usage-examples)

---

## 🎯 Overview

Each specialist domain uses a **4-agent consultancy pattern** where agents collaborate like a professional consulting team:

```
┌────────────────────────────────────────────────────────┐
│            SPECIALIST TEAM ARCHITECTURE                 │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Input: InsightPackage (from Master Agent)             │
│                                                         │
│  ┌──────────────────────────────────────────────┐     │
│  │         4-AGENT CONSULTANCY TEAM             │     │
│  │                                               │     │
│  │  1. Schema Agent (gpt-4o-mini)               │     │
│  │     └─ Database expert, data analysis        │     │
│  │              ↓                                │     │
│  │  2. Research Agent (gpt-4o-mini)             │     │
│  │     └─ Market intelligence, competitive      │     │
│  │              ↓                                │     │
│  │  3. Strategy Agent (gpt-4.1)                 │     │
│  │     └─ Tactical recommendations, growth hacks│     │
│  │              ↓                                │     │
│  │  4. Validator Agent (gpt-4.1)                │     │
│  │     └─ Quality control, synthesis            │     │
│  │              ↓                                │     │
│  │  Output: DOMAIN_APPROVED + Technical JSON    │     │
│  └──────────────────────────────────────────────┘     │
│                        ↓                               │
│  ┌──────────────────────────────────────────────┐     │
│  │       PRODUCTION PIPELINE                     │     │
│  │                                               │     │
│  │  5. Recommendation Formatter (gpt-4.1)       │     │
│  │     └─ Convert to Polish business language   │     │
│  │              ↓                                │     │
│  │  6. Final Master Validator (gpt-4.1)         │     │
│  │     └─ Save to database + display            │     │
│  │              ↓                                │     │
│  │  Output: FINAL_APPROVED + Database record    │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
└────────────────────────────────────────────────────────┘
```

### Team Roster

| Team | Focus | Status |
|------|-------|--------|
| **Performance Marketing** | PPC, campaigns, ROI | ✅ Implemented |
| **SEO Technical** | Rankings, content, technical SEO | ✅ Implemented |
| **UX Conversion** | Funnel, CRO, usability | ✅ Implemented |
| **GSC Specialist** | Search Console specific | ✅ Implemented |

---

## 🧩 4-Agent Consultancy Pattern

Each team follows the same structure with domain-specific expertise:

### 1. Schema Agent (Data Expert)

**Model**: `gpt-4o-mini` (fast, cost-effective for data processing)  
**Role**: Database analysis and data extraction  
**Tools**: Database query functions (domain-specific)

```python
# Responsibilities
- Query relevant database tables
- Extract historical trends
- Perform statistical analysis
- Validate data quality
- Provide data foundations for team

# Output
Detailed data analysis with metrics, trends, and statistical validation
```

### 2. Research Agent (Market Intelligence)

**Model**: `gpt-4o-mini` (efficient for research tasks)  
**Role**: Competitive and market research  
**Tools**: Web research, competitive analysis (domain-specific)

```python
# Responsibilities
- Competitive landscape analysis
- Market trend identification
- Industry best practices
- External factor assessment
- Context building

# Output
Market intelligence report with competitive insights and opportunities
```

### 3. Strategy Agent (Tactical Expert)

**Model**: `gpt-4.1` (advanced reasoning for strategy)  
**Role**: Domain-specific tactical recommendations  
**Tools**: None (pure strategic thinking)

```python
# Responsibilities
- Synthesize data + research
- Generate tactical recommendations
- Identify growth hacks
- Prioritize action items
- Estimate impact

# Output
Prioritized tactics with implementation steps and impact estimates
```

### 4. Validator Agent (Quality Control)

**Model**: `gpt-4.1` (complex validation logic)  
**Role**: Quality assurance and synthesis  
**Tools**: None (validation logic)

```python
# Responsibilities
- Validate data accuracy
- Assess strategy feasibility
- Check tactical coherence
- Synthesize final recommendation
- Approve for production pipeline

# Output
DOMAIN_APPROVED + Consolidated technical JSON
```

### Workflow Pattern

```python
async def team_workflow(insight_package: InsightPackage):
    """
    Standard 4-agent workflow for all teams.
    """
    # 1. Schema Agent analyzes data
    data_analysis = await schema_agent.analyze(insight_package)
    
    # 2. Research Agent provides context
    market_context = await research_agent.research(insight_package, data_analysis)
    
    # 3. Strategy Agent creates tactics
    tactics = await strategy_agent.strategize(data_analysis, market_context)
    
    # 4. Validator Agent synthesizes and approves
    final_recommendation = await validator_agent.validate(
        data_analysis, market_context, tactics
    )
    
    # Signal approval for production pipeline
    return f"DOMAIN_APPROVED\n{final_recommendation}"
```

---

## 💼 Performance Marketing Team

### Focus
PPC campaigns, Google Ads, Meta Ads, ROI optimization, budget allocation

### Schema Agent

**Tools**:
- `fetch_ads_campaign_performance`: Campaign metrics from database
- `analyze_cost_trends`: Cost analysis over time
- `validate_campaign_data`: Data quality checks

**Expertise**:
- Campaign performance analysis
- Attribution modeling
- Cost optimization
- ROI/ROAS calculation

**Example Output**:
```json
{
  "campaign_analysis": {
    "google_ads": {
      "total_spend": 15420.50,
      "conversions": 342,
      "cpa": 45.09,
      "roas": 3.2
    },
    "meta_ads": {
      "total_spend": 8900.30,
      "conversions": 198,
      "cpa": 44.95,
      "roas": 2.8
    }
  },
  "trends": {
    "cpa_increasing": true,
    "roas_declining": true,
    "conversion_rate_stable": false
  },
  "statistical_validation": {
    "significance": 0.95,
    "confidence": "high"
  }
}
```

### Research Agent

**Tools**:
- `market_research_tool`: Industry benchmarks
- `competitive_ads_analysis`: Competitor campaign intelligence
- `audience_research`: Target audience insights

**Expertise**:
- Market intelligence
- Competitive campaigns
- Audience insights
- Industry trends

**Example Output**:
```json
{
  "competitive_landscape": {
    "average_cpa_in_industry": 38.50,
    "our_position": "above_average_cost",
    "competitor_strategies": [
      "Using video ads heavily",
      "Targeting mobile-first audiences"
    ]
  },
  "market_opportunities": [
    "Untapped audience segment: 25-34 mobile users",
    "Growing interest in product category X"
  ]
}
```

### Strategy Agent

**Expertise**:
- Campaign optimization
- Bidding strategies
- Audience targeting
- A/B testing frameworks
- Creative optimization
- Budget allocation

**Example Output**:
```json
{
  "tactical_recommendations": [
    {
      "tactic": "Implement automated bidding strategy (Target ROAS)",
      "expected_impact": "10-15% CPA reduction",
      "implementation_effort": "low",
      "priority": "high",
      "timeline": "1-2 weeks"
    },
    {
      "tactic": "Create mobile-optimized video ad variants",
      "expected_impact": "8-12% conversion increase",
      "implementation_effort": "medium",
      "priority": "high",
      "timeline": "2-3 weeks"
    }
  ],
  "growth_hacks": [
    "Test lookalike audiences based on high-LTV customers",
    "Implement dayparting to reduce wasted spend"
  ]
}
```

### Validator Agent

**Validation Checks**:
- Data accuracy (cross-reference multiple sources)
- Strategy feasibility (technical constraints)
- Tactical coherence (recommendations align)
- ROI projection accuracy

**Example Output**:
```
PERFORMANCE_APPROVED

Technical Analysis:
{
  "domain": "performance_marketing",
  "validation_score": 0.92,
  "data_quality": 0.95,
  "strategy_feasibility": 0.88,
  "expected_roi": 2.5,
  "confidence": 0.85
}
```

---

## 🔍 SEO Technical Team

### Focus
Organic rankings, content optimization, technical SEO, Core Web Vitals

### Schema Agent

**Tools**:
- `fetch_organic_acquisition`: GA4 organic traffic data
- `fetch_seo_analytics`: SEO metrics from database
- `fetch_product_seo_performance`: Product-level SEO data

**Expertise**:
- GA4 data mastery
- Organic traffic segmentation
- Statistical analysis
- Ranking correlation

**Example Output**:
```json
{
  "organic_performance": {
    "total_sessions": 45230,
    "trend": "declining",
    "change_pct": -12.3,
    "top_landing_pages": [
      {"page": "/category/electronics", "sessions": 8920},
      {"page": "/product/laptop-x", "sessions": 6740}
    ]
  },
  "seo_health": {
    "indexation_rate": 0.87,
    "avg_position": 12.4,
    "ctr": 0.034
  }
}
```

### Research Agent

**Expertise**:
- SERP analysis
- Competitor research
- Content gap identification
- Industry trends

**Example Output**:
```json
{
  "competitive_analysis": {
    "top_competitors": ["competitor-a.com", "competitor-b.com"],
    "their_ranking_keywords": 342,
    "our_ranking_keywords": 218,
    "keyword_gap": 124
  },
  "content_opportunities": [
    "Missing: Comparison guides (high search volume)",
    "Weak: Product review content",
    "Opportunity: FAQ schema markup"
  ]
}
```

### Strategy Agent

**Expertise**:
- Schema markup
- Internal linking
- Core Web Vitals
- E-A-T optimization
- Content strategy

**Example Output**:
```json
{
  "tactical_recommendations": [
    {
      "tactic": "Implement product review schema markup on top 20 products",
      "expected_impact": "15-20% CTR increase in SERPs",
      "implementation_effort": "low",
      "priority": "high"
    },
    {
      "tactic": "Build internal linking hub for electronics category",
      "expected_impact": "10-12% ranking improvement",
      "implementation_effort": "medium",
      "priority": "medium"
    }
  ]
}
```

### Validator Agent

**Output**:
```
SEO_APPROVED

Technical Analysis: {...}
```

---

## 🎨 UX Conversion Team

### Focus
Conversion funnel, CRO, usability, mobile optimization, checkout flow

### Schema Agent

**Tools**:
- `fetch_conversion_funnel_data`: Funnel metrics
- `fetch_ux_analytics`: UX-specific analytics
- `fetch_product_performance`: Product conversion data
- **MCP Access**: GA4 MCP for real-time funnel data

**Expertise**:
- Funnel analysis
- Conversion rate optimization
- User behavior patterns
- Device-specific performance

**Example Output**:
```json
{
  "funnel_analysis": {
    "stages": {
      "product_view": 15420,
      "add_to_cart": 3890,
      "checkout": 890,
      "purchase": 420
    },
    "conversion_rates": {
      "view_to_cart": 0.252,
      "cart_to_checkout": 0.229,
      "checkout_to_purchase": 0.472
    },
    "bottleneck": "cart_to_checkout"
  },
  "device_performance": {
    "desktop": {"conversion_rate": 0.055},
    "mobile": {"conversion_rate": 0.031},
    "mobile_gap": -43.6
  }
}
```

### Research Agent

**Tools**:
- `analyze_website_ux`: MultimodalWebSurfer (live browsing + screenshots)

**Expertise**:
- Live website analysis
- Screenshot capture
- Mobile responsiveness
- Competitive UX research
- Purchase funnel mapping

**Example Output**:
```json
{
  "ux_analysis": {
    "checkout_flow_steps": 4,
    "mobile_issues": [
      "Payment method buttons too small",
      "Form fields not auto-filling properly",
      "Guest checkout not prominent"
    ],
    "visual_evidence": "screenshots/checkout_mobile.png"
  },
  "competitive_ux": {
    "best_practice": "Competitor X has 1-click mobile checkout",
    "our_gap": "3-step process vs their 1-step"
  }
}
```

### Strategy Agent

**Expertise**:
- CRO tactics
- Design psychology
- Conversion optimization
- A/B testing frameworks
- Landing page optimization
- Polish e-commerce standards

**Example Output**:
```json
{
  "tactical_recommendations": [
    {
      "tactic": "Implement guest checkout option (prominent on mobile)",
      "expected_impact": "8-12% conversion increase",
      "implementation_effort": "low",
      "priority": "high",
      "ab_test_recommended": true
    },
    {
      "tactic": "Redesign mobile payment selection (larger touch targets)",
      "expected_impact": "5-8% mobile conversion lift",
      "implementation_effort": "low",
      "priority": "high"
    }
  ]
}
```

### Validator Agent

**Output**:
```
UX_APPROVED

Technical Analysis: {...}
```

---

## 🔎 GSC Specialist Team

### Focus
Google Search Console specific analysis, indexing, crawling, search performance

### Schema Agent

**Tools**:
- **GSC MCP**: Direct access to Search Console data

**Expertise**:
- Search performance analysis
- Indexing status monitoring
- Crawl budget optimization
- Core Web Vitals from GSC perspective

**Example Output**:
```json
{
  "search_performance": {
    "total_clicks": 12340,
    "total_impressions": 456780,
    "avg_ctr": 0.027,
    "avg_position": 14.2
  },
  "indexing_health": {
    "indexed_pages": 1234,
    "submitted_pages": 1456,
    "indexation_rate": 0.847,
    "crawl_errors": 23
  }
}
```

### Research Agent

**Expertise**:
- Query-level analysis
- Page-level performance
- URL inspection insights
- Sitemap analysis

### Strategy Agent

**Expertise**:
- Indexing optimization
- Crawl budget management
- Search query optimization
- Technical SEO fixes

### Validator Agent

**Output**:
```
GSC_APPROVED

Technical Analysis: {...}
```

---

## 🏭 Production Pipeline

After domain teams complete analysis, output goes through production pipeline:

### Recommendation Formatter Agent

**Model**: `gpt-4.1` (advanced language processing)  
**Purpose**: Convert technical analysis to Polish business-ready format  
**Schema**: `ProductionRecommendation`

#### Polish Output Requirements

```python
class ProductionRecommendation(BaseModel):
    h1: str  # Zwięzły nagłówek (max 40 characters)
    impact: str  # Krótki opis efektu (max 25 characters)
              # Must start with: Szacowany/Przewidywany/Możliwy/Oczekiwany/Planowany
    text: str  # Krótka rekomendacja (max 2 sentences, ~100-150 characters)
    desc: str  # BARDZO szczegółowy opis (2-3 paragraphs) z pełnym uzasadnieniem
```

#### Example Transformation

**Input** (Technical):
```json
{
  "domain": "ux_conversion",
  "tactic": "Implement guest checkout option",
  "expected_impact": "8-12% conversion increase",
  "data": "Cart-to-checkout conversion: 22.9%, mobile gap: -43.6%"
}
```

**Output** (Polish Business):
```json
{
  "h1": "Opcja zakupu bez rejestracji",
  "impact": "Szacowany wzrost konwersji o 10%",
  "text": "Dodanie opcji zakupu jako gość zwiększy konwersje mobilne. Obecnie 77% użytkowników rezygnuje przy wymogu rejestracji.",
  "desc": "Analiza ścieżki zakupowej wykazała, że największy problem występuje w momencie przejścia z koszyka do checkout (konwersja tylko 22,9%). Szczególnie dotyczy to użytkowników mobilnych, gdzie konwersja jest o 43,6% niższa niż na desktopie.\n\nWdrożenie opcji 'Kup bez rejestracji' z widocznym przyciskiem na ekranie checkout pozwoli zmniejszyć tarcie w procesie zakupowym. Benchmark rynkowy pokazuje, że sklepy z tą opcją osiągają średnio o 8-12% wyższą konwersję.\n\nProponowane działania: 1) Dodać duży przycisk 'Kontynuuj jako gość' na ekranie logowania/rejestracji, 2) Opcjonalnie zbierać email po zakupie dla zamówienia trackingowego, 3) Przetestować A/B przez 2 tygodnie przed wdrożeniem na produkcji."
}
```

### Final Master Validator

**Model**: `gpt-4.1`  
**Purpose**: Final quality control and database persistence  
**Tools**:
- `save_recommendation`: Save to `ai_recommendations` table
- `display_recommendation`: Terminal output for verification

#### Responsibilities

```python
async def final_validation_workflow(recommendation: ProductionRecommendation):
    """
    Final Master Validator workflow.
    """
    # 1. Validate Polish language quality
    validate_polish_grammar(recommendation.desc)
    
    # 2. Check formatting requirements
    assert len(recommendation.h1) <= 40
    assert len(recommendation.impact) <= 25
    assert recommendation.impact.startswith(ALLOWED_PREFIXES)
    
    # 3. Enrich with metadata
    enriched = enrich_with_metadata(recommendation)
    
    # 4. Save to database
    await save_recommendation(enriched)
    
    # 5. Display for verification
    display_recommendation(enriched)
    
    # 6. Signal completion
    return "FINAL_APPROVED"
```

#### Database Schema

```sql
CREATE TABLE ai_recommendations (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    property_id VARCHAR(64),
    source_type VARCHAR(32),  -- 'anomaly' or 'mcp_report'
    anomaly_id UUID,  -- FK if source_type='anomaly'
    insight_id UUID,  -- FK if source_type='mcp_report'
    domain VARCHAR(32),  -- 'performance_marketing', 'seo', 'ux', 'gsc'
    priority VARCHAR(32),
    recommendation_data JSONB NOT NULL,  -- Polish ProductionRecommendation
    created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 💻 Usage Examples

### Example 1: Single Team Execution

```python
from berryboo_ai.agents.performance_marketing_team import create_performance_team

async def run_performance_analysis(insight_package: InsightPackage):
    # Create team
    team = await create_performance_team(
        shop_id=insight_package.shop_id,
        property_id=insight_package.property_id
    )
    
    # Execute 4-agent workflow
    result = await team.run(
        task=f"Analyze this issue: {insight_package.to_dict()}"
    )
    
    print(result)  # "PERFORMANCE_APPROVED\n{technical_json}"
```

### Example 2: Complete Pipeline (Team + Production)

```python
async def complete_recommendation_pipeline(insight_package: InsightPackage):
    # 1. Specialist team analysis
    team = await create_seo_team(insight_package.shop_id, insight_package.property_id)
    technical_analysis = await team.run(task="...")
    
    # 2. Recommendation Formatter
    formatter = create_recommendation_formatter_agent()
    polish_recommendation = await formatter.format(technical_analysis)
    
    # 3. Final Validator
    validator = create_final_validator_agent()
    final_result = await validator.validate_and_save(polish_recommendation)
    
    return final_result  # "FINAL_APPROVED" + database record
```

### Example 3: Multi-Team Coordination

```python
async def multi_team_analysis(insight_package: InsightPackage):
    """
    Route insight to multiple teams if needed.
    """
    # Create master coordinator
    master = await create_multi_specialist_coordinator(
        shop_id=insight_package.shop_id,
        property_id=insight_package.property_id
    )
    
    # Master routes to appropriate teams automatically
    result = await master.run(
        task=f"Route and analyze: {insight_package.to_dict()}"
    )
    
    # Result includes analysis from all relevant teams
    return result
```

### Example 4: CLI Usage

```bash
# Test individual team
python main.py test-performance-team \
    --shop-id abc-123 \
    --property-id properties/123456

# Test complete pipeline (team + production)
python main.py test-hierarchical-team \
    --shop-id abc-123 \
    --property-id properties/123456 \
    --use-real-data

# Test multi-team coordination
python main.py test-multi-specialist-team \
    --shop-id abc-123 \
    --property-id properties/123456 \
    --use-real-data
```

---

## 📊 Model Configuration

### Model Selection Strategy

| Agent Type | Model | Reason |
|------------|-------|--------|
| **Schema** | gpt-4o-mini | Fast data processing, high rate limits, cost-effective |
| **Research** | gpt-4o-mini | Efficient for research tasks, lower cost |
| **Strategy** | gpt-4.1 | Advanced reasoning for tactics |
| **Validator** | gpt-4.1 | Complex validation logic |
| **Formatter** | gpt-4.1 | Advanced language processing for Polish |
| **Final Validator** | gpt-4.1 | Critical quality control |

### Cost per Recommendation

```
Schema Agent (gpt-4o-mini):    $0.008-0.015
Research Agent (gpt-4o-mini):  $0.010-0.020
Strategy Agent (gpt-4.1):      $0.018-0.036
Validator Agent (gpt-4.1):     $0.012-0.024
Formatter (gpt-4.1):           $0.015-0.030
Final Validator (gpt-4.1):     $0.012-0.024
─────────────────────────────────────────
Total per recommendation:      $0.075-0.149
```

---

## ⚡ Performance Optimizations (Nov 2025)

### Smart Routing

**Purpose**: Skip low-value specialists based on Master Agent confidence scores

**Implementation**: `should_skip_specialist()` function evaluates each specialist:
- **Primary specialist** (highest confidence): Always runs
- **Secondary specialist** (confidence ≥ 0.75): Runs if meets threshold
- **Low confidence** (< 0.75): Skipped
- **Not mentioned**: Skipped

**Example**:
```python
Master Agent Routing:
- Primary: performance_marketing (confidence: 0.88) → ✓ Run
- Secondary: ux_specialist (confidence: 0.70) → ⊘ Skip (< 0.75)
- seo_specialist: not mentioned → ⊘ Skip

Result: Only Performance Marketing team runs (saves 3 minutes)
```

**Time Savings**: 0-3 minutes per anomaly depending on complexity

### Parallel Execution

**Purpose**: Run multiple specialist teams concurrently instead of sequentially

**Implementation**: `create_multi_specialist_team_parallel()` uses `asyncio.gather()`

**Flow**:
```
Sequential (Old):
Performance (2 min) → SEO (1.5 min) → UX (1.5 min) = 5 minutes

Parallel (New):
┌─ Performance (2 min) ─┐
├─ SEO (1.5 min)        ├→ Max(all) = 2 minutes
└─ UX (1.5 min)         ┘
```

**Time Savings**: 2-3 minutes when running multiple specialists

### Relaxed Validation

**Purpose**: Reduce validation loop retries from 20+ to 1-3 attempts

**Changes**:
- **Character limits**: Added ±10 char tolerance (h1), ±5 char (impact), ±30 char (text)
- **Approval threshold**: "80% correct" rule instead of perfection
- **Retry limit**: Reduced from 30 messages to 12 (max 3-4 retries)
- **Learning**: Formatter now explicitly learns from rejection feedback

**Before**:
```
Attempt 1: REJECTED (h1: 62 chars > 60)
Attempt 2: REJECTED (impact: missing word)
Attempt 3: REJECTED (text: 225 chars > 220)
... 20+ retries ...
Total: 25+ minutes
```

**After**:
```
Attempt 1: ✓ APPROVED (h1: 62 chars within 60-70 tolerance)
Total: 30 seconds
```

**Time Savings**: 20-25 minutes per anomaly

### Combined Impact

| Scenario | Before | After | Savings |
|----------|--------|-------|---------|
| **Simple** (1 specialist) | 30 min | 3-4 min | 26-27 min (87%) |
| **Complex** (2+ specialists) | 30 min | 5-6 min | 24-25 min (83%) |

### Usage

**Sequential with Smart Routing** (recommended):
```python
team = await create_multi_specialist_team(
    shop_id=shop_id,
    property_id=property_id,
    anomaly_package=anomaly_package,  # Enables smart routing
)
```

**Parallel Execution** (maximum speed):
```python
team = await create_multi_specialist_team_parallel(
    shop_id=shop_id,
    property_id=property_id,
    anomaly_package=anomaly_package,  # Smart routing + parallel
)
```

**Configuration**:
```python
# Adjust confidence threshold
should_skip_specialist(
    specialist_name="seo_team",
    anomaly_package=pkg,
    confidence_threshold=0.75  # Lower = more specialists run
)

# Adjust retry limits
MaxMessageTermination(max_messages=12)  # 3-4 retries (was 30)
```

**See Also**: [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) and [BEFORE_AFTER_COMPARISON.md](BEFORE_AFTER_COMPARISON.md)

---

## 📚 Related Documentation

- **[AGENTS_MASTER.md](AGENTS_MASTER.md)**: Master agents that route to these teams
- **[AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)**: 48 MCP agents that generate insights
- **[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)**: Complete system architecture
- **[MCP_INTEGRATION.md](MCP_INTEGRATION.md)**: MCP tools used by Schema agents
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)**: Database structure for recommendations
- **[OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)**: Detailed optimization guide
- **[BEFORE_AFTER_COMPARISON.md](BEFORE_AFTER_COMPARISON.md)**: Visual performance comparison

- **Secondary specialist** (confidence ≥ 0.75): Runs if meets threshold
- **Low confidence** (< 0.75): Skipped
- **Not mentioned**: Skipped

**Example**:
```python
Master Agent Routing:
- Primary: performance_marketing (confidence: 0.88) → ✓ Run
- Secondary: ux_specialist (confidence: 0.70) → ⊘ Skip (< 0.75)
- seo_specialist: not mentioned → ⊘ Skip

Result: Only Performance Marketing team runs (saves 3 minutes)
```

**Time Savings**: 0-3 minutes per anomaly depending on complexity

### Parallel Execution

**Purpose**: Run multiple specialist teams concurrently instead of sequentially

**Implementation**: `create_multi_specialist_team_parallel()` uses `asyncio.gather()`

**Flow**:
```
Sequential (Old):
Performance (2 min) → SEO (1.5 min) → UX (1.5 min) = 5 minutes

Parallel (New):
┌─ Performance (2 min) ─┐
├─ SEO (1.5 min)        ├→ Max(all) = 2 minutes
└─ UX (1.5 min)         ┘
```

**Time Savings**: 2-3 minutes when running multiple specialists

### Relaxed Validation

**Purpose**: Reduce validation loop retries from 20+ to 1-3 attempts

**Changes**:
- **Character limits**: Added ±10 char tolerance (h1), ±5 char (impact), ±30 char (text)
- **Approval threshold**: "80% correct" rule instead of perfection
- **Retry limit**: Reduced from 30 messages to 12 (max 3-4 retries)
- **Learning**: Formatter now explicitly learns from rejection feedback

**Before**:
```
Attempt 1: REJECTED (h1: 62 chars > 60)
Attempt 2: REJECTED (impact: missing word)
Attempt 3: REJECTED (text: 225 chars > 220)
... 20+ retries ...
Total: 25+ minutes
```

**After**:
```
Attempt 1: ✓ APPROVED (h1: 62 chars within 60-70 tolerance)
Total: 30 seconds
```

**Time Savings**: 20-25 minutes per anomaly

### Combined Impact

| Scenario | Before | After | Savings |
|----------|--------|-------|---------|
| **Simple** (1 specialist) | 30 min | 3-4 min | 26-27 min (87%) |
| **Complex** (2+ specialists) | 30 min | 5-6 min | 24-25 min (83%) |

### Usage

**Sequential with Smart Routing** (recommended):
```python
team = await create_multi_specialist_team(
    shop_id=shop_id,
    property_id=property_id,
    anomaly_package=anomaly_package,  # Enables smart routing
)
```

**Parallel Execution** (maximum speed):
```python
team = await create_multi_specialist_team_parallel(
    shop_id=shop_id,
    property_id=property_id,
    anomaly_package=anomaly_package,  # Smart routing + parallel
)
```

**Configuration**:
```python
# Adjust confidence threshold
should_skip_specialist(
    specialist_name="seo_team",
    anomaly_package=pkg,
    confidence_threshold=0.75  # Lower = more specialists run
)

# Adjust retry limits
MaxMessageTermination(max_messages=12)  # 3-4 retries (was 30)
```

**See Also**: [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) and [BEFORE_AFTER_COMPARISON.md](BEFORE_AFTER_COMPARISON.md)

---

## 📚 Related Documentation

- **[AGENTS_MASTER.md](AGENTS_MASTER.md)**: Master agents that route to these teams
- **[AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)**: 48 MCP agents that generate insights
- **[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)**: Complete system architecture
- **[MCP_INTEGRATION.md](MCP_INTEGRATION.md)**: MCP tools used by Schema agents
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)**: Database structure for recommendations
- **[OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)**: Detailed optimization guide
- **[BEFORE_AFTER_COMPARISON.md](BEFORE_AFTER_COMPARISON.md)**: Visual performance comparison
