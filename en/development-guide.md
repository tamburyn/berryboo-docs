# Development Guide - Extending BerryBoo AI

**How to Add New Features & Extend the System**

> **Prerequisites**: Read all documentation in order from [Start Here](/start-here) first.

---

## 📋 Table of Contents

1. [Development Setup](#development-setup)
2. [Adding a New MCP Server](#adding-a-new-mcp-server)
3. [Adding a New Specialist Team](#adding-a-new-specialist-team)
4. [Adding a New Specialized Agent](#adding-a-new-specialized-agent)
5. [Adding Database Tools](#adding-database-tools)
6. [Testing Strategies](#testing-strategies)
7. [Deployment Guide](#deployment-guide)
8. [Best Practices](#best-practices)

---

## 🛠️ Development Setup

### Prerequisites

```bash
# System requirements
- Python 3.10+
- PostgreSQL 14+
- Node.js 18+ (for PageSpeed MCP server)
- OpenAI API key
- Google Cloud Console project
- Meta Developer account
```

### Initial Setup

```bash
# 1. Clone repository
cd backend/src/ai

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
pip install RestrictedPython  # For code execution sandbox

# 4. Install MCP servers
cd mcp_server_ga4 && pip install -r requirements.txt && cd ..
cd mcp_server_gsc && pip install -r requirements.txt && cd ..
cd mcp_server_meta_ads && pip install -r requirements.txt && cd ..
cd mcp_server_google_ads && pip install -r requirements.txt && cd ..
cd mcp_server_pagespeed && npm install && cd ..

# 5. Setup environment
cp env_example .env
# Edit .env with your credentials

# 6. Test database connection
python test_db_connection.py
```

### Development Environment Variables

```bash
# .env file
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://user:pass@localhost:5432/beryboo
DEFAULT_SHOP_ID=your-test-shop-uuid

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Meta OAuth
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...

# Development settings
DEBUG=True
LOG_LEVEL=DEBUG
```

---

## 🔌 Adding a New MCP Server

### Example: Adding Shopify MCP Server

#### Step 1: Create Server Directory

```bash
mkdir mcp_server_shopify
cd mcp_server_shopify
```

#### Step 2: Create Server Implementation

```python
# mcp_server_shopify/server.py

from mcp import Server, Tool
import shopify

server = Server("shopify")

@server.tool()
async def get_products(shop_domain: str, limit: int = 50):
    """
    Get products from Shopify store.
    
    Args:
        shop_domain: Shopify store domain
        limit: Number of products to return
    
    Returns:
        List of products
    """
    # Initialize Shopify API
    shopify.ShopifyResource.set_site(f"https://{shop_domain}")
    
    # Fetch products
    products = shopify.Product.find(limit=limit)
    
    return [
        {
            "id": p.id,
            "title": p.title,
            "price": str(p.variants[0].price) if p.variants else None,
            "inventory": p.variants[0].inventory_quantity if p.variants else None
        }
        for p in products
    ]

@server.tool()
async def get_orders(shop_domain: str, status: str = "any", limit: int = 50):
    """Get orders from Shopify store."""
    shopify.ShopifyResource.set_site(f"https://{shop_domain}")
    orders = shopify.Order.find(status=status, limit=limit)
    
    return [
        {
            "id": o.id,
            "order_number": o.order_number,
            "total_price": str(o.total_price),
            "created_at": o.created_at
        }
        for o in orders
    ]

if __name__ == "__main__":
    server.run()
```

#### Step 3: Create Requirements

```
# mcp_server_shopify/requirements.txt
ShopifyAPI==12.0.0
mcp-server-python==0.1.0
```

#### Step 4: Create mcp_tools Wrapper

```bash
mkdir -p mcp_tools/shopify
```

```python
# mcp_tools/shopify/get_products.py

from ..__init__ import call_mcp_tool

async def get_products(shop_domain: str, limit: int = 50):
    """
    Get products from Shopify store.
    
    Args:
        shop_domain: Shopify store domain
        limit: Number of products to return
    
    Returns:
        List of products
    """
    return await call_mcp_tool('shopify', 'get_products', {
        'shop_domain': shop_domain,
        'limit': limit
    })
```

```python
# mcp_tools/shopify/get_orders.py

from ..__init__ import call_mcp_tool

async def get_orders(shop_domain: str, status: str = "any", limit: int = 50):
    """Get orders from Shopify store."""
    return await call_mcp_tool('shopify', 'get_orders', {
        'shop_domain': shop_domain,
        'status': status,
        'limit': limit
    })
```

```python
# mcp_tools/shopify/__init__.py

from .get_products import get_products
from .get_orders import get_orders

__all__ = ['get_products', 'get_orders']
```

#### Step 5: Register in MCP Manager

```python
# src/berryboo_ai/services/mcp_manager.py

MCP_SERVERS = {
    # ... existing servers ...
    'shopify': {
        'command': 'python',
        'args': ['mcp_server_shopify/server.py'],
        'env': {
            'SHOPIFY_API_KEY': os.getenv('SHOPIFY_API_KEY'),
            'SHOPIFY_API_SECRET': os.getenv('SHOPIFY_API_SECRET')
        }
    }
}
```

#### Step 6: Add Integration Model Support

```python
# In Django Integration model
SHOPIFY_API = 205  # New integration type

# data JSONB structure for Shopify:
{
  "shop_domain": "mystore.myshopify.com",
  "access_token": "shpat_...",
  "api_key": "...",
  "api_secret": "..."
}
```

#### Step 7: Test

```bash
# Test MCP server standalone
python mcp_server_shopify/server.py

# Test with agent
python main.py chat-shopify --shop-id YOUR_SHOP_ID
```

---

## 👥 Adding a New Specialist Team

### Example: Adding Pricing Specialist Team

#### Step 1: Create Team File

```python
# src/berryboo_ai/agents/pricing_specialist_team.py

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import SelectorGroupChat
from autogen_ext.models.openai import OpenAIChatCompletionClient

async def create_pricing_schema_agent(shop_id: str, property_id: str):
    """
    Pricing Schema Agent - Revenue and financial data expert.
    """
    tools = [
        fetch_orders_analytics,
        fetch_revenue_trends,
        fetch_pricing_data
    ]
    
    agent = await create_agent_with_code_execution_mcp(
        name="pricing_schema_agent",
        description="Revenue optimization and pricing analysis expert",
        system_message="""
        You are a pricing analysis expert. Analyze revenue data,
        pricing trends, and competitive positioning.
        
        Focus on:
        - Revenue optimization opportunities
        - Pricing elasticity analysis
        - Competitive pricing gaps
        - Discount strategy effectiveness
        """,
        model_name="gpt-4o-mini",  # Fast for data processing
        database_tools=tools,
        shop_id=shop_id,
        agent_role="schema",
        max_tool_iterations=6
    )
    
    return agent

async def create_pricing_research_agent():
    """
    Pricing Research Agent - Competitive pricing intelligence.
    """
    system_message = """
    You are a competitive pricing researcher.
    
    Analyze:
    - Competitor pricing strategies
    - Market price positioning
    - Psychological pricing tactics
    - Industry pricing benchmarks
    """
    
    agent = AssistantAgent(
        name="pricing_research_agent",
        model_client=OpenAIChatCompletionClient(model="gpt-4o-mini"),
        system_message=system_message
    )
    
    return agent

async def create_pricing_strategist_agent():
    """
    Pricing Strategist Agent - Pricing psychology and tactics.
    """
    system_message = """
    You are a pricing strategy expert with deep knowledge of:
    
    - Dynamic pricing strategies
    - Psychological pricing (charm pricing, prestige pricing)
    - Bundle and promotion strategies
    - Value-based pricing models
    - Pricing optimization frameworks
    """
    
    agent = AssistantAgent(
        name="pricing_strategist_agent",
        model_client=OpenAIChatCompletionClient(model="gpt-4.1"),  # Advanced reasoning
        system_message=system_message
    )
    
    return agent

async def create_pricing_validator_agent():
    """
    Pricing Validator Agent - Financial impact validation.
    """
    system_message = """
    You are the pricing validator. Review and validate:
    
    1. Data accuracy (revenue calculations, margins)
    2. Strategy feasibility (can pricing changes be implemented?)
    3. Risk assessment (potential negative impacts)
    4. Expected ROI (revenue impact projections)
    
    Output format: "PRICING_APPROVED\n{technical_json}"
    """
    
    agent = AssistantAgent(
        name="pricing_validator_agent",
        model_client=OpenAIChatCompletionClient(model="gpt-4.1"),  # Advanced validation
        system_message=system_message
    )
    
    return agent

async def create_pricing_specialist_team(shop_id: str, property_id: str):
    """
    Create complete 4-agent pricing specialist team.
    """
    # Create all 4 agents
    schema_agent = await create_pricing_schema_agent(shop_id, property_id)
    research_agent = await create_pricing_research_agent()
    strategist_agent = await create_pricing_strategist_agent()
    validator_agent = await create_pricing_validator_agent()
    
    # Create team with workflow: Schema → Research → Strategy → Validator
    team = SelectorGroupChat(
        participants=[schema_agent, research_agent, strategist_agent, validator_agent],
        model_client=OpenAIChatCompletionClient(model="gpt-4.1"),
        termination_condition=TextMentionTermination("PRICING_APPROVED"),
        max_turns=12
    )
    
    return team
```

#### Step 2: Add Database Tools

```python
# src/berryboo_ai/database/tools.py

async def fetch_orders_analytics(shop_id: str, days: int = 30):
    """Fetch order analytics for pricing analysis."""
    query = """
        SELECT 
            date,
            transactions,
            revenue,
            avg_order_value,
            discount_amount,
            discount_rate
        FROM analytics_statsordersanalytics
        WHERE shop_id = %s
        AND date >= CURRENT_DATE - INTERVAL '%s days'
        ORDER BY date DESC
    """
    return await execute_query(query, (shop_id, days))

async def fetch_revenue_trends(shop_id: str, days: int = 90):
    """Fetch revenue trends for pricing analysis."""
    query = """
        SELECT 
            date_trunc('week', date) as week,
            SUM(revenue) as weekly_revenue,
            AVG(avg_order_value) as avg_aov,
            AVG(discount_rate) as avg_discount
        FROM analytics_statsordersanalytics
        WHERE shop_id = %s
        AND date >= CURRENT_DATE - INTERVAL '%s days'
        GROUP BY week
        ORDER BY week DESC
    """
    return await execute_query(query, (shop_id, days))

async def fetch_pricing_data(shop_id: str):
    """Fetch product pricing data."""
    query = """
        SELECT 
            item_id,
            item_name,
            AVG(item_revenue / NULLIF(purchases, 0)) as avg_price,
            SUM(purchases) as total_purchases,
            SUM(item_revenue) as total_revenue
        FROM analytics_statsgaproductperformance
        WHERE shop_id = %s
        AND date >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY item_id, item_name
        ORDER BY total_revenue DESC
        LIMIT 50
    """
    return await execute_query(query, (shop_id,))
```

#### Step 3: Add to Master Coordinator

```python
# src/berryboo_ai/agents/master_agent.py

# Add pricing team to specialist routing
if package.metric in ['revenue', 'avg_order_value', 'discount_rate']:
    specialists.append('pricing')
```

#### Step 4: Test

```bash
# Test pricing team
python main.py test-pricing-team --shop-id YOUR_SHOP_ID --property-id PROP_ID

# Test with complete pipeline
python main.py test-hierarchical-team --shop-id YOUR_SHOP_ID
```

---

## 🤖 Adding a New Specialized Agent

### Example: Adding Email Marketing Analyzer (GA4)

#### Step 1: Create Agent Class

```python
# src/berryboo_ai/agents/ga4_specialized_agents.py

class EmailMarketingAnalyzer:
    """
    Analyzes email marketing performance from GA4 data.
    """
    
    def __init__(self, shop_id: str, property_id: str):
        self.shop_id = shop_id
        self.property_id = property_id
        self.agent_name = "email_marketing_analyzer"
        self.mcp_source = "ga4"
    
    async def analyze(self) -> Dict[str, Any]:
        """
        Analyze email marketing performance.
        """
        # 1. Get GA4 data for email traffic
        ga4_data = await self._fetch_email_traffic_data()
        
        # 2. Analyze metrics
        analysis = self._analyze_email_performance(ga4_data)
        
        # 3. Identify opportunities
        opportunities = self._identify_opportunities(analysis)
        
        # 4. Create structured report
        report = {
            "agent_metadata": {
                "agent_name": self.agent_name,
                "mcp_source": self.mcp_source,
                "analysis_date": datetime.now().isoformat()
            },
            "executive_summary": {
                "key_finding": analysis["key_finding"],
                "business_impact": analysis["business_impact"],
                "urgency": analysis["urgency"],
                "confidence": analysis["confidence"]
            },
            "metrics": analysis["metrics"],
            "insights": analysis["insights"],
            "opportunities": opportunities,
            "risks": analysis.get("risks", [])
        }
        
        # 5. Save to ai_insights table
        await self._save_insight(report)
        
        return report
    
    async def _fetch_email_traffic_data(self):
        """Fetch email traffic from GA4."""
        # Use MCP to get data
        from mcp_tools import ga4
        
        report = await ga4.run_report(
            property_id=f"properties/{self.property_id}",
            metrics=["sessions", "conversions", "totalRevenue"],
            dimensions=["sessionSource", "sessionMedium", "sessionCampaign"],
            date_ranges=[{"startDate": "30daysAgo", "endDate": "today"}],
            dimension_filter={
                "filter": {
                    "fieldName": "sessionMedium",
                    "stringFilter": {"value": "email"}
                }
            }
        )
        
        return report
    
    def _analyze_email_performance(self, data):
        """Analyze email traffic performance."""
        # Calculate metrics
        total_sessions = sum(row["sessions"] for row in data)
        total_conversions = sum(row["conversions"] for row in data)
        total_revenue = sum(row["totalRevenue"] for row in data)
        
        conversion_rate = total_conversions / total_sessions if total_sessions > 0 else 0
        revenue_per_session = total_revenue / total_sessions if total_sessions > 0 else 0
        
        # Compare to benchmarks
        benchmark_conversion = 0.02  # 2% industry benchmark
        performance = "above" if conversion_rate > benchmark_conversion else "below"
        
        return {
            "key_finding": f"Email marketing conversion rate {performance} industry benchmark",
            "business_impact": f"Email traffic generating ${total_revenue:.2f} revenue",
            "urgency": "medium" if performance == "below" else "low",
            "confidence": 0.85,
            "metrics": [
                {"metric": "email_sessions", "value": total_sessions},
                {"metric": "email_conversions", "value": total_conversions},
                {"metric": "email_conversion_rate", "value": conversion_rate},
                {"metric": "email_revenue", "value": total_revenue}
            ],
            "insights": [
                {
                    "insight": f"Email conversion rate: {conversion_rate*100:.2f}%",
                    "supporting_data": f"{total_conversions} conversions from {total_sessions} sessions",
                    "trend": performance
                }
            ]
        }
    
    def _identify_opportunities(self, analysis):
        """Identify optimization opportunities."""
        opportunities = []
        
        if analysis["urgency"] == "medium":
            opportunities.append({
                "opportunity": "Optimize email campaign targeting",
                "estimated_impact": "15-20% conversion increase",
                "implementation_effort": "medium",
                "priority": "high"
            })
        
        return opportunities
    
    async def _save_insight(self, report):
        """Save insight to database."""
        query = """
            INSERT INTO ai_insights (
                shop_id, property_id, mcp_source, agent_name,
                report_data, analysis_period_start, analysis_period_end,
                status, processed_by_master
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        await execute_query(query, (
            self.shop_id,
            self.property_id,
            self.mcp_source,
            self.agent_name,
            json.dumps(report),
            datetime.now() - timedelta(days=30),
            datetime.now(),
            'generated',
            False
        ))
```

#### Step 2: Register in Scheduler

```python
# src/berryboo_ai/services/specialized_agent_scheduler.py

GA4_AGENTS = [
    # ... existing agents ...
    EmailMarketingAnalyzer,  # Add new agent
]

async def run_all_ga4_agents(shop_id: str, property_id: str):
    """Run all GA4 specialized agents."""
    tasks = []
    
    for agent_class in GA4_AGENTS:
        agent = agent_class(shop_id, property_id)
        task = agent.analyze()
        tasks.append(task)
    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return results
```

#### Step 3: Test

```bash
# Test single agent
python main.py test-specialized-agent \
    --agent email_marketing_analyzer \
    --shop-id YOUR_SHOP_ID

# Run all GA4 agents including new one
python main.py generate-mcp-reports --sources ga4 --shop-id YOUR_SHOP_ID
```

---

## 🗄️ Adding Database Tools

### Creating New Database Functions

```python
# src/berryboo_ai/database/tools.py

async def fetch_custom_metric(
    shop_id: str,
    table_name: str,
    metric_columns: List[str],
    filters: Optional[Dict[str, Any]] = None,
    date_range_days: int = 30
):
    """
    Generic database query function for custom metrics.
    
    Args:
        shop_id: Shop UUID
        table_name: Name of analytics table
        metric_columns: List of column names to fetch
        filters: Additional WHERE conditions
        date_range_days: Number of days to look back
    
    Returns:
        Query results as list of dictionaries
    """
    # Build SELECT clause
    select_columns = ", ".join(metric_columns)
    
    # Build WHERE clause
    where_conditions = [
        f"shop_id = '{shop_id}'",
        f"date >= CURRENT_DATE - INTERVAL '{date_range_days} days'"
    ]
    
    if filters:
        for key, value in filters.items():
            if isinstance(value, str):
                where_conditions.append(f"{key} = '{value}'")
            else:
                where_conditions.append(f"{key} = {value}")
    
    where_clause = " AND ".join(where_conditions)
    
    # Build full query
    query = f"""
        SELECT {select_columns}
        FROM {table_name}
        WHERE {where_clause}
        ORDER BY date DESC
    """
    
    return await execute_query(query)
```

### Best Practices for Database Tools

1. **Always filter by shop_id** (multi-tenant security)
2. **Use parameterized queries** (prevent SQL injection)
3. **Add date range limits** (prevent slow queries)
4. **Return structured data** (list of dicts, not raw rows)
5. **Add docstrings** (agents need to understand the tool)
6. **Handle errors gracefully** (return empty list, not crash)

---

## 🧪 Testing Strategies

### Unit Tests

```python
# tests/test_pricing_team.py

import pytest
from berryboo_ai.agents.pricing_specialist_team import create_pricing_specialist_team

@pytest.mark.asyncio
async def test_pricing_team_creation():
    """Test that pricing team can be created."""
    team = await create_pricing_specialist_team(
        shop_id="test-shop-uuid",
        property_id="properties/123456"
    )
    
    assert team is not None
    assert len(team.participants) == 4  # Schema, Research, Strategy, Validator

@pytest.mark.asyncio
async def test_pricing_schema_agent():
    """Test pricing schema agent data fetching."""
    agent = await create_pricing_schema_agent(
        shop_id="test-shop-uuid",
        property_id="properties/123456"
    )
    
    # Test with mock data
    result = await agent.fetch_revenue_trends(days=30)
    
    assert result is not None
    assert len(result) > 0
```

### Integration Tests

```python
# tests/test_complete_pipeline.py

@pytest.mark.asyncio
async def test_complete_recommendation_pipeline():
    """Test complete pipeline from anomaly to recommendation."""
    # 1. Create test anomaly
    anomaly = await create_test_anomaly(
        shop_id="test-shop-uuid",
        metric="revenue",
        z_score=-3.2
    )
    
    # 2. Process with Reactive Master Agent
    reactive_agent = ReactiveMasterAgent("test-shop-uuid", "properties/123456")
    package = await reactive_agent.preprocess_anomaly(anomaly["id"])
    
    # 3. Route to specialist team
    team = await create_pricing_specialist_team("test-shop-uuid", "properties/123456")
    result = await team.run(task=f"Analyze: {package.to_dict()}")
    
    # 4. Format recommendation
    formatter = create_recommendation_formatter_agent()
    polish_rec = await formatter.format(result)
    
    # 5. Validate and save
    validator = create_final_validator_agent()
    final = await validator.validate_and_save(polish_rec)
    
    assert final == "FINAL_APPROVED"
    
    # 6. Check database
    recommendations = await fetch_recommendations(shop_id="test-shop-uuid", limit=1)
    assert len(recommendations) == 1
    assert recommendations[0]["domain"] == "pricing"
```

### CLI Testing

```bash
# Test individual components
pytest tests/test_pricing_team.py -v

# Test security
pytest tests/test_code_execution_security.py -v

# Test complete pipeline
pytest tests/test_complete_pipeline.py -v

# Test with real data (requires shop setup)
python main.py test-hierarchical-team \
    --shop-id YOUR_SHOP_ID \
    --property-id PROP_ID \
    --use-real-data
```

---

## 🚀 Deployment Guide

### Pre-Deployment Checklist

```bash
# 1. Run all tests
pytest tests/ -v

# 2. Check code quality
ruff check src/
ruff format src/ --check

# 3. Verify environment variables
python -c "from berryboo_ai.config import get_settings; print(get_settings())"

# 4. Test database migrations
python manage.py migrate --check

# 5. Test MCP servers
python main.py test-oauth --shop-id TEST_SHOP_ID
```

### Docker Deployment

```dockerfile
# Dockerfile (example)
FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Run application
CMD ["python", "main.py", "run-daily-insights-all-shops"]
```

### Cron Schedule (Production)

```bash
# crontab -e

# Daily MCP report generation (all shops)
0 23 * * * cd /app && python main.py generate-mcp-reports-all-shops >> /var/log/mcp_reports.log 2>&1

# Daily proactive insights processing
30 0 * * * cd /app && python main.py run-daily-insights-all-shops >> /var/log/proactive_insights.log 2>&1

# Hourly reactive anomaly processing
0 * * * * cd /app && python main.py process-all-anomalies-all-shops >> /var/log/reactive_anomalies.log 2>&1
```

---

## ✅ Best Practices

### Code Style

```python
# Use type hints
async def create_agent(shop_id: str, property_id: str) -> AssistantAgent:
    pass

# Use descriptive names
fetch_revenue_trends()  # Good
get_data()  # Bad

# Add docstrings
async def analyze_pricing(shop_id: str) -> Dict[str, Any]:
    """
    Analyze pricing strategy for shop.
    
    Args:
        shop_id: Shop UUID
    
    Returns:
        Analysis results with opportunities
    """
    pass

# Use constants
MAX_RETRIES = 3
TIMEOUT_SECONDS = 30

# Handle errors gracefully
try:
    result = await agent.run(task)
except Exception as e:
    logger.error(f"Agent failed: {e}")
    return default_response()
```

### Security

```python
# Always validate shop_id
def validate_shop_access(shop_id: str, user_id: str) -> bool:
    """Verify user has access to shop."""
    pass

# Never log sensitive data
logger.info(f"Processing shop {shop_id}")  # Good
logger.info(f"Token: {oauth_token}")  # Bad

# Use parameterized queries
query = "SELECT * FROM table WHERE shop_id = %s"
result = await execute_query(query, (shop_id,))  # Good

query = f"SELECT * FROM table WHERE shop_id = '{shop_id}'"  # Bad (SQL injection risk)
```

### Performance

```python
# Use async/await for I/O operations
async def fetch_data():
    result = await async_query()  # Good
    return result

def fetch_data_sync():
    result = sync_query()  # Bad (blocks event loop)
    return result

# Batch operations
tasks = [process_shop(shop_id) for shop_id in shop_ids]
results = await asyncio.gather(*tasks)  # Good (parallel)

for shop_id in shop_ids:
    result = await process_shop(shop_id)  # Bad (sequential)

# Use connection pooling
async with database_pool.acquire() as connection:
    result = await connection.fetch(query)
```

---

## 📚 Related Documentation

- **[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)**: Complete system architecture
- **[MCP_INTEGRATION.md](MCP_INTEGRATION.md)**: MCP server development
- **[AGENTS_SPECIALIST_TEAMS.md](AGENTS_SPECIALIST_TEAMS.md)**: Team architecture
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)**: Database structure
- **[CLI_REFERENCE.md](CLI_REFERENCE.md)**: CLI commands


