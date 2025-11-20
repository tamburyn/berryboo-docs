# Master Agents - Reactive & Proactive

**Dual-Track Preprocessing Layer**

> **Prerequisites**: Read [START_HERE.md](START_HERE.md) and [SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md) first.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Dual-Track System](#dual-track-system)
3. [Reactive Master Agent](#reactive-master-agent)
4. [Proactive Master Agent](#proactive-master-agent)
5. [InsightPackage Schema](#insightpackage-schema)
6. [Specialist Routing](#specialist-routing)
7. [Usage Examples](#usage-examples)

---

## 🎯 Overview

BerryBoo AI uses **two Master Agents** that preprocess inputs from different sources and route them to specialist teams:

```
┌────────────────────────────────────────────────────────┐
│              MASTER AGENTS (Level 0)                    │
├────────────────────────────────────────────────────────┤
│                                                         │
│  REACTIVE MASTER           │         PROACTIVE MASTER  │
│  (Anomaly-Based)           │         (MCP-Based)       │
│                            │                           │
│  Input: ai_general_        │         Input: ai_        │
│         anomalies          │                insights   │
│  Trigger: Real-time        │         Trigger: Daily    │
│  Focus: Problems           │         Focus: Opportunities│
│  Model: o3-mini            │         Model: o3-mini    │
│                            │                           │
│  Output: InsightPackage    │         Output: InsightPackage│
│          (source_type:     │                (source_type: │
│           'anomaly')       │                 'mcp_report')│
│                            │                           │
└──────────────┬─────────────┴──────────────┬────────────┘
               │                            │
               └──────────────┬─────────────┘
                              │
                              ▼
               ┌──────────────────────────┐
               │  Specialist Team Router  │
               │  (Same routing logic)    │
               └──────────────────────────┘
```

### Key Characteristics

| Aspect | Reactive | Proactive |
|--------|----------|-----------|
| **Purpose** | Respond to problems | Discover opportunities |
| **Input Source** | `ai_general_anomalies` | `ai_insights` |
| **Trigger** | Anomaly detected | Daily batch |
| **Processing** | Real-time | Scheduled |
| **Volume** | Low (5-50/day) | High (50-500/day) |
| **Urgency** | Often HIGH/URGENT | Usually MEDIUM/LOW |
| **Output** | InsightPackage | InsightPackage |

---

## 🔄 Dual-Track System

### Why Two Master Agents?

**Reactive Master Agent** (Anomaly-Based):
- **React** to statistical deviations as they occur
- Fast response to problems (2-5 minutes)
- Focus on fixing issues before they escalate
- Example: "Traffic dropped 30% today"

**Proactive Master Agent** (MCP Insights-Based):
- **Discover** opportunities before they're obvious
- Comprehensive analysis of all data sources
- Focus on growth and optimization
- Example: "Mobile checkout could be 15% faster"

### Complementary Coverage

```
Reactive: "Your conversion rate dropped 15% yesterday"
          ↓
          Find and fix the problem

Proactive: "Based on 30-day funnel analysis, optimizing 
            the payment selection step could increase 
            conversions by 8%"
          ↓
          Identify and capture opportunity
```

---

## 🚨 Reactive Master Agent

### Purpose

Process detected anomalies and route to appropriate specialist teams.

### Input: ai_general_anomalies Table

```sql
CREATE TABLE ai_general_anomalies (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    property_id VARCHAR(64),
    metric VARCHAR(128) NOT NULL,
    z_score NUMERIC(10,4),
    baseline_change_pct NUMERIC(10,4),
    current_value NUMERIC,
    baseline_value NUMERIC,
    business_impact NUMERIC(10,4),
    detected_at TIMESTAMPTZ DEFAULT now(),
    processed BOOLEAN DEFAULT FALSE
);
```

### Processing Flow

```
1. Fetch Unprocessed Anomaly
   ↓
   SELECT * FROM ai_general_anomalies 
   WHERE processed = false 
   ORDER BY business_impact DESC, z_score DESC 
   LIMIT 1

2. Enrich with Context
   ↓
   - Historical trends (last 30/60/90 days)
   - Seasonal patterns
   - Related metrics
   - Shop metadata

3. AI Analysis (o3-mini)
   ↓
   Embedded data approach:
   - All context in single message
   - No tool calls during execution
   - Structured output (InsightPackage)

4. Priority Assessment
   ↓
   - Calculate urgency (URGENT/HIGH/MEDIUM/LOW)
   - Assess business impact (0.0-1.0)
   - Determine confidence (0.0-1.0)

5. Specialist Routing
   ↓
   - Revenue/conversion → Performance Marketing
   - Traffic/organic → SEO
   - Bounce/engagement → UX
   - Multiple specialists if needed

6. Create InsightPackage
   ↓
   {
     "source_type": "anomaly",
     "metric": "conversion_rate",
     "z_score": -3.2,
     "pct_delta": -15.3,
     "priority_level": "URGENT",
     "suggested_specialists": ["performance_marketing", "ux_conversion"]
   }

7. Mark as Processed
   ↓
   UPDATE ai_general_anomalies 
   SET processed = true 
   WHERE id = ...
```

### Code Example

```python
class ReactiveMasterAgent:
    """
    Reactive Master Agent - Anomaly Preprocessor
    """
    
    def __init__(self, shop_id: str, property_id: str):
        self.shop_id = shop_id
        self.property_id = property_id
        self.model_client = OpenAIChatCompletionClient(model="o3-mini")
        self.agent = AssistantAgent(
            name="reactive_master",
            model_client=self.model_client,
            system_message=self._build_system_message(),
            tools=[],  # Embedded data approach
            output_content_type=InsightPackage
        )
    
    async def preprocess_anomaly(self, anomaly_id: str) -> InsightPackage:
        """
        Preprocess anomaly and create InsightPackage.
        """
        # 1. Fetch anomaly
        anomaly = await self._fetch_anomaly(anomaly_id)
        
        # 2. Enrich with context
        context = await self._gather_context(anomaly)
        
        # 3. Build comprehensive message with all data
        message = self._build_comprehensive_message(anomaly, context)
        
        # 4. Execute AI analysis
        result = await self.agent.run(task=message)
        
        # 5. Extract InsightPackage
        insight_package = self._extract_insight_package(result)
        
        # 6. Mark as processed
        await self._mark_processed(anomaly_id)
        
        return insight_package
```

### Priority Assessment Logic

```python
def assess_priority(anomaly: dict) -> str:
    """
    Determine priority level based on multiple factors.
    """
    z_score = abs(anomaly['z_score'])
    pct_change = abs(anomaly['baseline_change_pct'])
    business_impact = anomaly['business_impact']
    
    # URGENT: Large deviation + high impact
    if z_score > 3.0 and business_impact > 0.8:
        return "URGENT"
    
    # HIGH: Significant deviation OR high impact
    if z_score > 2.5 or business_impact > 0.6:
        return "HIGH"
    
    # MEDIUM: Moderate deviation
    if z_score > 2.0 or business_impact > 0.4:
        return "MEDIUM"
    
    # LOW: Minor deviation
    return "LOW"
```

### CLI Usage

```bash
# Process single anomaly
python main.py process-anomaly --anomaly-id UUID

# Process all unprocessed anomalies
python main.py process-all-anomalies --shop-id SHOP_ID

# Reactive pipeline (continuous monitoring)
python main.py run-reactive-pipeline --shop-id SHOP_ID
```

---

## 🔍 Proactive Master Agent

### Purpose

Process MCP agent insights and identify opportunities.

### Input: ai_insights Table

```sql
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL,
    property_id VARCHAR(64),
    mcp_source VARCHAR(32) NOT NULL,  -- 'ga4', 'gsc', 'pagespeed', etc.
    agent_name VARCHAR(128) NOT NULL,
    report_data JSONB NOT NULL,
    analysis_period_start TIMESTAMPTZ,
    analysis_period_end TIMESTAMPTZ,
    processed_by_master BOOLEAN DEFAULT FALSE,
    insight_priority VARCHAR(32),
    confidence_score NUMERIC(5,4),
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### Processing Flow

```
1. Fetch Unprocessed Insights
   ↓
   SELECT * FROM ai_insights 
   WHERE processed_by_master = false 
   AND shop_id = ?
   ORDER BY created_at DESC
   LIMIT 50

2. Batch Analysis (o3-mini)
   ↓
   For each insight:
   - Extract executive_summary
   - Identify key_insights
   - Assess opportunities
   - Calculate priority

3. Priority Filtering
   ↓
   - HIGH/URGENT insights → immediate routing
   - MEDIUM insights → batch routing
   - LOW insights → log for reference

4. Specialist Routing
   ↓
   Based on mcp_source:
   - ga4 + conversion → Performance Marketing
   - gsc → SEO
   - pagespeed → UX
   - google_ads/meta_ads → Performance Marketing

5. Create InsightPackage
   ↓
   {
     "source_type": "mcp_report",
     "mcp_source": "ga4",
     "agent_name": "conversion_funnel_analyst",
     "report_summary": {...},
     "priority_level": "HIGH",
     "suggested_specialists": ["ux_conversion"]
   }

6. Mark as Processed
   ↓
   UPDATE ai_insights 
   SET processed_by_master = true,
       insight_priority = '...',
       confidence_score = ...
   WHERE id = ...
```

### Code Example

```python
class ProactiveMasterAgent:
    """
    Proactive Master Agent - MCP Insights Processor
    """
    
    def __init__(self, shop_id: str, property_id: str):
        self.shop_id = shop_id
        self.property_id = property_id
        self.model_client = OpenAIChatCompletionClient(model="o3-mini")
        self.agent = AssistantAgent(
            name="proactive_master",
            model_client=self.model_client,
            system_message=self._build_system_message(),
            tools=[],
            output_content_type=InsightPackage
        )
    
    async def process_mcp_insights(
        self,
        mcp_source: Optional[str] = None,
        limit: int = 50
    ) -> List[InsightPackage]:
        """
        Process unprocessed MCP insights.
        """
        # 1. Fetch unprocessed insights
        insights = await self._fetch_insights(mcp_source, limit)
        
        # 2. Process each insight
        packages = []
        for insight in insights:
            # Extract report data
            report_data = insight['report_data']
            
            # Create InsightPackage
            package = await self._create_insight_package(insight)
            
            if package.priority_level in ["URGENT", "HIGH"]:
                packages.append(package)
            
            # Mark as processed
            await self._mark_processed(insight['id'], package)
        
        return packages
```

### Report Data Structure

```json
{
  "agent_metadata": {
    "agent_name": "conversion_funnel_analyst",
    "mcp_source": "ga4",
    "analysis_date": "2025-01-16T10:30:00"
  },
  "executive_summary": {
    "key_finding": "Checkout conversion dropped from 55% to 47%",
    "business_impact": "Estimated 15% revenue loss",
    "urgency": "high",
    "confidence": 0.87
  },
  "metrics": [
    {
      "metric_name": "checkout_conversion_rate",
      "current_value": 0.47,
      "baseline_value": 0.55,
      "change_pct": -14.5
    }
  ],
  "insights": [
    {
      "insight": "Mobile checkout UX issues causing drop-off",
      "supporting_data": "890 checkouts → 420 purchases (47%)",
      "severity": "high"
    }
  ],
  "opportunities": [
    {
      "opportunity": "Optimize payment method selection",
      "estimated_impact": "8-12% conversion increase",
      "implementation_effort": "medium",
      "priority": "high"
    }
  ]
}
```

### CLI Usage

```bash
# Process all unprocessed insights
python main.py analyze-insights --shop-id SHOP_ID

# Filter by MCP source
python main.py analyze-insights --source ga4 --shop-id SHOP_ID

# Daily batch processing
python main.py run-daily-insights --shop-id SHOP_ID

# Process all shops
python main.py run-daily-insights-all-shops
```

---

## 📦 InsightPackage Schema

Universal schema shared by both master agents:

```python
class InsightPackage(BaseModel):
    """
    Universal insight format for both reactive and proactive pipelines.
    """
    # Source identification
    source_type: str  # 'anomaly' or 'mcp_report'
    source_id: str    # anomaly_id or insight_id (UUID)
    
    # Core identifiers
    shop_id: str
    property_id: str
    
    # Anomaly-specific (reactive only)
    metric: Optional[str] = None
    z_score: Optional[float] = None
    pct_delta: Optional[float] = None
    current_value: Optional[float] = None
    baseline_value: Optional[float] = None
    
    # MCP-specific (proactive only)
    mcp_source: Optional[str] = None  # 'ga4', 'gsc', 'pagespeed', etc.
    agent_name: Optional[str] = None
    report_summary: Optional[Dict[str, Any]] = None
    key_insights: Optional[List[Dict[str, Any]]] = None
    
    # Shared analysis (both pipelines)
    priority_level: str  # 'URGENT', 'HIGH', 'MEDIUM', 'LOW'
    business_impact_score: float  # 0.0-1.0
    confidence_score: float  # 0.0-1.0
    suggested_specialists: List[str]  # ['performance_marketing', 'seo', etc.]
    
    # Routing hints
    complexity_assessment: Optional[str] = None
    requires_technical_analysis: bool = False
    requires_competitive_research: bool = False
    
    # Metadata
    processing_timestamp: datetime
    trace_id: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "source_type": "anomaly",
                "source_id": "uuid-123",
                "shop_id": "shop-abc",
                "property_id": "properties/123456",
                "metric": "conversion_rate",
                "z_score": -3.2,
                "pct_delta": -15.3,
                "priority_level": "URGENT",
                "business_impact_score": 0.89,
                "confidence_score": 0.92,
                "suggested_specialists": ["performance_marketing", "ux_conversion"],
                "processing_timestamp": "2025-01-16T10:30:00Z",
                "trace_id": "reactive-master-001"
            }
        }
```

---

## 🎯 Specialist Routing

### Routing Logic & Confidence Scores

Both master agents use the same routing logic and provide **confidence scores** that enable intelligent specialist selection:

```python
def route_insight_package(package: InsightPackage) -> List[str]:
    """
    Determine which specialist teams should handle this insight.
    """
    specialists = []
    
    if package.source_type == 'anomaly':
        # Reactive routing based on metric
        if package.metric in ['revenue', 'transactions', 'conversion_rate', 'aov']:
            specialists.append('performance_marketing')
        
        if package.metric in ['organic_sessions', 'organic_users']:
            specialists.append('seo')
        
        if package.metric in ['bounce_rate', 'avg_session_duration', 'pages_per_session']:
            specialists.append('ux_conversion')
        
        if 'search' in package.metric.lower():
            specialists.append('gsc')
    
    else:  # source_type == 'mcp_report'
        # Proactive routing based on MCP source
        if package.mcp_source == 'ga4':
            if any(keyword in package.agent_name for keyword in ['conversion', 'revenue', 'ltv']):
                specialists.append('performance_marketing')
            else:
                specialists.append('ux_conversion')
        
        elif package.mcp_source == 'gsc':
            specialists.append('seo')
            specialists.append('gsc')
        
        elif package.mcp_source == 'pagespeed':
            specialists.append('ux_conversion')
            specialists.append('seo')  # Performance affects SEO
        
        elif package.mcp_source in ['google_ads', 'meta_ads']:
            specialists.append('performance_marketing')
    
    # Default to general if no specific match
    if not specialists:
        specialists.append('performance_marketing')
    
    return specialists
```

### Multi-Specialist Routing

Some insights require multiple specialist teams:

```python
# Example: PageSpeed issue affects both UX and SEO
package = InsightPackage(
    source_type="mcp_report",
    mcp_source="pagespeed",
    agent_name="core_web_vitals_analyst",
    priority_level="HIGH",
    suggested_specialists=["ux_conversion", "seo"]  # Both teams
)

# System routes to both teams in parallel or sequence
```

### Confidence Scores & Smart Routing (Nov 2025)

Master Agent routing now includes **confidence scores** that enable specialist teams to make intelligent decisions about which specialists to run:

**AnomalyPackage Structure**:
```python
{
    "suggested_specialists": {
        "primary_specialist": {
            "specialist_name": "performance_marketing",
            "confidence": 0.88,  # High confidence
            "primary_reasoning": "Paid campaign anomaly detected"
        },
        "secondary_specialist": {
            "specialist_name": "ux_specialist",
            "confidence": 0.65,  # Lower confidence
            "primary_reasoning": "Potential funnel impact"
        }
    }
}
```

**How Specialist Teams Use This**:

1. **Primary Specialist** (highest confidence): **Always runs**
2. **Secondary Specialist** (confidence ≥ 0.75): **Runs if meets threshold**
3. **Low Confidence** (< 0.75): **Skipped** to save time
4. **Not Mentioned**: **Skipped**

**Example Decision**:
```python
Master Agent Output:
- Primary: performance_marketing (confidence: 0.88) ✓
- Secondary: ux_specialist (confidence: 0.70) ⊘

Specialist Team Decision:
✓ Run Performance Marketing team (~2 min)
⊘ Skip UX team (confidence below 0.75 threshold)
⊘ Skip SEO team (not mentioned)

Time Saved: 3 minutes (2 teams skipped)
```

**Benefits**:
- **Faster processing**: Only relevant specialists run
- **Cost savings**: Fewer API calls to OpenAI
- **Better focus**: Specialists work on relevant issues
- **Maintained quality**: Primary specialist always runs

**Configuration**:
```python
# Adjust confidence threshold in specialist_team.py
should_skip_specialist(
    specialist_name="ux_team",
    anomaly_package=pkg,
    confidence_threshold=0.75  # Default: 0.75
)

# Lower threshold (0.6) = more specialists run
# Higher threshold (0.85) = fewer specialists run
```

**See Also**: 
- [AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md#-performance-optimizations-nov-2025) for implementation details
- [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) for complete optimization guide

---

## 💻 Usage Examples

### Example 1: Reactive - Process Single Anomaly

```python
from berryboo_ai.agents.reactive_master_agent import ReactiveMasterAgent

async def process_anomaly_example():
    # Initialize agent
    agent = ReactiveMasterAgent(
        shop_id="abc-123",
        property_id="properties/326784853"
    )
    
    # Process anomaly
    package = await agent.preprocess_anomaly(anomaly_id="anomaly-uuid")
    
    # Route to specialists
    print(f"Priority: {package.priority_level}")
    print(f"Specialists: {package.suggested_specialists}")
    print(f"Business Impact: {package.business_impact_score}")
```

### Example 2: Proactive - Batch Process Insights

```python
from berryboo_ai.agents.proactive_master_agent import ProactiveMasterAgent

async def process_insights_example():
    # Initialize agent
    agent = ProactiveMasterAgent(
        shop_id="abc-123",
        property_id="properties/326784853"
    )
    
    # Process all GA4 insights
    packages = await agent.process_mcp_insights(mcp_source="ga4", limit=50)
    
    # Filter high-priority
    high_priority = [p for p in packages if p.priority_level in ["URGENT", "HIGH"]]
    
    print(f"Total insights: {len(packages)}")
    print(f"High priority: {len(high_priority)}")
    
    # Route each to specialists
    for package in high_priority:
        await specialist_router.route(package)
```

### Example 3: Complete Dual-Track Pipeline

```python
async def run_complete_pipeline(shop_id: str, property_id: str):
    """
    Run both reactive and proactive pipelines.
    """
    # 1. Reactive pipeline (process anomalies)
    reactive_agent = ReactiveMasterAgent(shop_id, property_id)
    anomaly_packages = await reactive_agent.process_all_anomalies()
    
    # 2. Proactive pipeline (process insights)
    proactive_agent = ProactiveMasterAgent(shop_id, property_id)
    insight_packages = await proactive_agent.process_mcp_insights()
    
    # 3. Combine and prioritize
    all_packages = anomaly_packages + insight_packages
    all_packages.sort(key=lambda p: p.business_impact_score, reverse=True)
    
    # 4. Route to specialists
    for package in all_packages:
        await specialist_router.route(package)
    
    print(f"Processed {len(anomaly_packages)} anomalies")
    print(f"Processed {len(insight_packages)} insights")
    print(f"Total routed: {len(all_packages)}")
```

---

## 📚 Related Documentation

- **[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)**: Complete system architecture
- **[AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md)**: Specialist teams that receive routed insights
- **[AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)**: 48 MCP agents that generate insights
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)**: Database tables structure
- **[CLI_REFERENCE.md](CLI_REFERENCE.md)**: CLI commands

```

### Example 2: Proactive - Batch Process Insights

```python
from berryboo_ai.agents.proactive_master_agent import ProactiveMasterAgent

async def process_insights_example():
    # Initialize agent
    agent = ProactiveMasterAgent(
        shop_id="abc-123",
        property_id="properties/326784853"
    )
    
    # Process all GA4 insights
    packages = await agent.process_mcp_insights(mcp_source="ga4", limit=50)
    
    # Filter high-priority
    high_priority = [p for p in packages if p.priority_level in ["URGENT", "HIGH"]]
    
    print(f"Total insights: {len(packages)}")
    print(f"High priority: {len(high_priority)}")
    
    # Route each to specialists
    for package in high_priority:
        await specialist_router.route(package)
```

### Example 3: Complete Dual-Track Pipeline

```python
async def run_complete_pipeline(shop_id: str, property_id: str):
    """
    Run both reactive and proactive pipelines.
    """
    # 1. Reactive pipeline (process anomalies)
    reactive_agent = ReactiveMasterAgent(shop_id, property_id)
    anomaly_packages = await reactive_agent.process_all_anomalies()
    
    # 2. Proactive pipeline (process insights)
    proactive_agent = ProactiveMasterAgent(shop_id, property_id)
    insight_packages = await proactive_agent.process_mcp_insights()
    
    # 3. Combine and prioritize
    all_packages = anomaly_packages + insight_packages
    all_packages.sort(key=lambda p: p.business_impact_score, reverse=True)
    
    # 4. Route to specialists
    for package in all_packages:
        await specialist_router.route(package)
    
    print(f"Processed {len(anomaly_packages)} anomalies")
    print(f"Processed {len(insight_packages)} insights")
    print(f"Total routed: {len(all_packages)}")
```

---

## 📚 Related Documentation

- **[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)**: Complete system architecture
- **[AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md)**: Specialist teams that receive routed insights
- **[AGENTS_SPECIALIZED.md](AGENTS_SPECIALIZED.md)**: 48 MCP agents that generate insights
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)**: Database tables structure
- **[CLI_REFERENCE.md](CLI_REFERENCE.md)**: CLI commands
