# MCP Integration - Complete Guide

**Model Context Protocol Integration with Code Execution**

> **Prerequisites**: Read [START_HERE.md](START_HERE.md) and [SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md) first.

---

## 📋 Table of Contents

1. [What is MCP?](#what-is-mcp)
2. [Why Code Execution Approach?](#why-code-execution-approach)
3. [Architecture](#architecture)
4. [MCP Servers Overview](#mcp-servers-overview)
5. [Code Execution Sandbox](#code-execution-sandbox)
6. [mcp_tools Module](#mcp_tools-module)
7. [Multi-Tenant Security](#multi-tenant-security)
8. [Setup & Installation](#setup--installation)
9. [Usage Examples](#usage-examples)
10. [Adding New MCP Tools](#adding-new-mcp-tools)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 What is MCP?

**Model Context Protocol (MCP)** is an open standard developed by Anthropic that enables AI agents to securely connect to external data sources and tools.

### Key Concepts

```
┌─────────────────────────────────────────────────────┐
│                  MCP ECOSYSTEM                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  AI Agent (Client)                                  │
│       ↕ [Model Context Protocol]                    │
│  MCP Server (Provider)                              │
│       ↕ [API/SDK]                                   │
│  External Service (Google Analytics, etc.)          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### MCP Components

1. **MCP Client**: The AI agent that needs data (AutoGen's `McpWorkbench`)
2. **MCP Server**: Middleware that connects to external APIs
3. **Transport**: Communication layer (stdio, HTTP, SSE)
4. **Tools**: Exposed functions that agents can call

---

## 💡 Why Code Execution Approach?

### Traditional Tool Calling vs Code Execution

#### ❌ Traditional Approach (Old)

```python
# Problem 1: ALL tool definitions loaded upfront
tools = [
    Tool("ga4_run_report", "Run GA4 report", {...}),      # 500 tokens
    Tool("ga4_get_metadata", "Get GA4 metadata", {...}),  # 400 tokens
    Tool("ga4_realtime", "GA4 realtime data", {...}),     # 450 tokens
    # ... 97 more tools ...                               # 45,000 tokens total!
]

# Problem 2: Intermediate results pass through LLM
result1 = agent.call_tool("ga4_run_report", {...})       # Returns 10KB of data
agent.analyze(result1)  # All 10KB in context               # Expensive!
result2 = agent.call_tool("ga4_filter", result1)          # Another tool call
agent.finalize(result2)  # More context                     # More tokens!

# Problem 3: Multiple roundtrips
# Each tool call = separate API round trip to LLM
```

**Issues**:
- ❌ 45,000+ tokens just for tool definitions
- ❌ All intermediate data flows through LLM context
- ❌ Multiple expensive API calls
- ❌ Slow execution (sequential tool calls)

#### ✅ Code Execution Approach (New - Anthropic Pattern)

```python
# Solution 1: Single execute_code tool
tools = [
    Tool("execute_code", "Execute Python code with MCP access", {...})  # 200 tokens
]

# Solution 2: Data processing happens in sandbox
code = """
from mcp_tools import ga4

# Get data
raw_data = await ga4.run_report(property_id="...", metrics=["sessions"])

# Filter in sandbox (not in LLM context!)
filtered = [row for row in raw_data if row['sessions'] > 1000]

# Aggregate in sandbox
summary = {
    'total_sessions': sum(row['sessions'] for row in filtered),
    'avg_sessions': sum(row['sessions'] for row in filtered) / len(filtered)
}

# Only summary goes back to LLM
print(f"Summary: {summary}")
"""

result = agent.execute_code(code)  # Single API call, only summary returned
```

**Benefits**:
- ✅ 200 tokens instead of 45,000 (99.5% reduction)
- ✅ Data filtering in sandbox (not in LLM context)
- ✅ Single API call to LLM
- ✅ Fast parallel execution possible

### Token & Cost Comparison

| Metric | Traditional | Code Execution | Savings |
|--------|------------|----------------|---------|
| **Tool Definition Tokens** | 45,000 | 200 | **99.5%** |
| **Data Transfer** | Full datasets | Summaries only | **90-95%** |
| **LLM API Calls** | 5-10 per task | 1-2 per task | **60-80%** |
| **Total Tokens per Task** | 60,000-100,000 | 5,000-15,000 | **85%** |
| **Cost per Task (GPT-4)** | $0.36-$0.60 | $0.03-$0.09 | **85%** |

### Anthropic's Guidance

Based on [Anthropic's engineering blog](https://www.anthropic.com/engineering/code-execution-with-mcp):

> "By executing code in a secure sandbox environment, agents can:
> 1. Discover tools on-demand via filesystem exploration
> 2. Filter and process data locally before returning results
> 3. Reduce token consumption by 60-80%
> 4. Execute complex multi-step workflows efficiently"

---

## 🏗️ Architecture

### Complete MCP Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                    BERRYBOO AI MCP ARCHITECTURE                    │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              AGENT LAYER                                  │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │    │
│  │  │ Schema     │  │ Research   │  │ Strategy   │         │    │
│  │  │ Agent      │  │ Agent      │  │ Agent      │         │    │
│  │  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘         │    │
│  │        │                │                │                │    │
│  │        │  execute_code tool              │                │    │
│  │        └────────────────┼────────────────┘                │    │
│  └─────────────────────────┼─────────────────────────────────┘    │
│                            │                                      │
│  ┌─────────────────────────▼─────────────────────────────────┐    │
│  │         CODE EXECUTION SANDBOX LAYER                      │    │
│  │                                                            │    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │  SecurePythonSandbox                             │    │    │
│  │  │  - RestrictedPython (security)                   │    │    │
│  │  │  - shop_id isolation                             │    │    │
│  │  │  - Timeout protection (30s)                      │    │    │
│  │  │  - Blocked: os, subprocess, __import__           │    │    │
│  │  └──────────────┬───────────────────────────────────┘    │    │
│  │                 │                                         │    │
│  │  ┌──────────────▼───────────────────────────────────┐    │    │
│  │  │  Sandbox Namespace                               │    │    │
│  │  │  - Built-in: print, True, False, None            │    │    │
│  │  │  - Allowed: json, datetime, math, asyncio        │    │    │
│  │  │  - mcp_tools module (injected)                   │    │    │
│  │  └──────────────┬───────────────────────────────────┘    │    │
│  └─────────────────┼─────────────────────────────────────────┘    │
│                    │                                              │
│  ┌─────────────────▼─────────────────────────────────────────┐    │
│  │         mcp_tools MODULE LAYER (Python Client)            │    │
│  │                                                            │    │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐              │    │
│  │  │ mcp_tools│  │ mcp_tools│  │ mcp_tools │              │    │
│  │  │   .ga4   │  │   .gsc   │  │ .meta_ads │   etc.       │    │
│  │  └────┬─────┘  └────┬─────┘  └─────┬─────┘              │    │
│  │       │             │               │                     │    │
│  │       │  ShopLockedMCPModule (per shop_id)               │    │
│  │       │             │               │                     │    │
│  └───────┼─────────────┼───────────────┼─────────────────────┘    │
│          │             │               │                          │
│  ┌───────▼─────────────▼───────────────▼─────────────────────┐    │
│  │         MCP WORKBENCH LAYER (AutoGen)                     │    │
│  │                                                            │    │
│  │  McpWorkbench instances (one per server, per shop)        │    │
│  │  - Manages server connections                             │    │
│  │  - OAuth credential injection                             │    │
│  │  - stdio transport                                        │    │
│  └───────┬─────────────┬───────────────┬─────────────────────┘    │
│          │             │               │                          │
│  ┌───────▼─────────────▼───────────────▼─────────────────────┐    │
│  │         MCP SERVER LAYER (Actual Servers)                 │    │
│  │                                                            │    │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐│    │
│  │  │mcp_server│  │mcp_server│  │mcp_server │  │mcp_server││    │
│  │  │  _ga4    │  │  _gsc    │  │_meta_ads  │  │_google   ││    │
│  │  │          │  │          │  │           │  │  _ads    ││    │
│  │  └────┬─────┘  └────┬─────┘  └─────┬─────┘  └────┬─────┘│    │
│  └───────┼─────────────┼───────────────┼─────────────┼──────┘    │
│          │             │               │             │            │
│  ┌───────▼─────────────▼───────────────▼─────────────▼──────┐    │
│  │         EXTERNAL API LAYER                               │    │
│  │                                                            │    │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐│    │
│  │  │ Google   │  │ Google   │  │   Meta    │  │ Google   ││    │
│  │  │Analytics │  │  Search  │  │   Ads     │  │   Ads    ││    │
│  │  │   API    │  │ Console  │  │   API     │  │   API    ││    │
│  │  └──────────┘  └──────────┘  └───────────┘  └──────────┘│    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Filesystem-Based Tool Discovery**: Agents explore `mcp_tools/` like a Python module
2. **Secure Sandboxing**: All code runs in `RestrictedPython` environment
3. **Shop-Level Isolation**: Each sandbox scoped to specific `shop_id`
4. **OAuth Per Shop**: Credentials automatically resolved from database
5. **Single Tool Interface**: Agents only see `execute_code` tool

---

## 🖥️ MCP Servers Overview

We have **5 MCP servers** that connect to external marketing/analytics platforms:

### 1. GA4 Server (`mcp_server_ga4`)

**Purpose**: Google Analytics 4 data access  
**Language**: Python  
**Package**: Uses official Google Analytics Data API  
**Location**: `backend/src/ai/mcp_server_ga4/`

#### Available Tools
- `get_account_summaries`: List GA4 accounts and properties
- `get_property_details`: Property configuration
- `run_report`: Core reporting API
- `run_realtime_report`: Real-time data
- `get_custom_dimensions_and_metrics`: Metadata
- `list_google_ads_links`: Connected ad accounts

#### Example
```python
from mcp_tools import ga4

report = await ga4.run_report(
    property_id="properties/326784853",
    metrics=["activeUsers", "sessions", "conversions"],
    dimensions=["date", "deviceCategory"],
    date_ranges=[{"startDate": "30daysAgo", "endDate": "today"}],
    limit=100
)
```

### 2. GSC Server (`mcp_server_gsc`)

**Purpose**: Google Search Console data  
**Language**: Python  
**Package**: Google Search Console API  
**Location**: `backend/src/ai/mcp_server_gsc/`

#### Available Tools
- `list_properties`: List verified properties
- `get_site_details`: Property details
- `get_search_analytics`: Search performance data
- `get_url_inspection`: Page inspection results
- `list_sitemaps`: Sitemap status

#### Example
```python
from mcp_tools import gsc

data = await gsc.get_search_analytics(
    site_url="https://example.com",
    start_date="2024-01-01",
    end_date="2024-01-31",
    dimensions=["query", "page"],
    row_limit=1000
)
```

### 3. Meta Ads Server (`mcp_server_meta_ads`)

**Purpose**: Facebook & Instagram Ads  
**Language**: Python  
**Package**: Facebook Business SDK  
**Location**: `backend/src/ai/mcp_server_meta_ads/`

#### Available Tools (15 tools)
- `get_account_info`: Ad account details
- `get_campaigns`: List campaigns
- `get_campaign_info`: Campaign details
- `get_insights`: Performance metrics
- `get_adsets`: List ad sets
- `get_adset_info`: Ad set details
- `get_ads`: List ads
- `get_ad_info`: Ad details
- `search_interests`: Targeting interests
- `search_demographics`: Demographic options
- `search_geo_locations`: Geographic targeting
- `search_behaviors`: Behavior targeting
- `search`: General search
- `validate_interests`: Validate targeting
- `get_interest_suggestions`: Interest recommendations

#### Example
```python
from mcp_tools import meta_ads

insights = await meta_ads.get_insights(
    object_id="act_123456789",
    object_type="adaccount",
    date_preset="last_30d",
    fields=["spend", "impressions", "clicks", "conversions"]
)
```

### 4. Google Ads Server (`mcp_server_google_ads`)

**Purpose**: Google Ads campaign data  
**Language**: Python  
**Package**: Google Ads API  
**Location**: `backend/src/ai/mcp_server_google_ads/`

#### Available Tools
- `list_accounts`: List ad accounts
- `get_campaign_performance`: Campaign metrics
- `get_ad_group_performance`: Ad group data
- `get_ad_performance`: Individual ad performance
- `get_keyword_performance`: Keyword metrics
- `search_campaigns`: Find campaigns

#### Example
```python
from mcp_tools import google_ads

performance = await google_ads.get_campaign_performance(
    customer_id="1234567890",
    date_range="LAST_30_DAYS",
    metrics=["clicks", "impressions", "cost", "conversions"]
)
```

### 5. PageSpeed Server (`mcp_server_pagespeed`)

**Purpose**: Page performance analysis  
**Language**: Node.js  
**Package**: Google PageSpeed Insights API  
**Location**: `backend/src/ai/mcp_server_pagespeed/`

#### Available Tools
- `analyze_page`: Complete PageSpeed analysis

#### Example
```python
from mcp_tools import pagespeed

analysis = await pagespeed.analyze_page(
    url="https://example.com",
    strategy="mobile",  # or "desktop"
    categories=["performance", "accessibility", "seo"]
)
```

---

## 🔒 Code Execution Sandbox

### SecurePythonSandbox

The sandbox ensures secure, isolated code execution for each shop.

#### Security Features

```python
class SecurePythonSandbox:
    """
    Secure Python execution environment with shop-level isolation.
    """
    
    # Security: Blocked patterns
    BLOCKED_PATTERNS = [
        'os.',              # File system access
        'subprocess',       # Process execution
        'socket',           # Network access
        '__import__',       # Dynamic imports
        'eval',             # Code evaluation
        'exec',             # Code execution
        'open(',            # File operations
        'file(',            # File operations
    ]
    
    # Security: Allowed modules only
    ALLOWED_MODULES = [
        'json',
        'datetime',
        'math',
        'typing',
        'collections',
        'asyncio'
    ]
```

#### How It Works

```python
# 1. Agent requests code execution
code = """
from mcp_tools import ga4
report = await ga4.run_report(property_id="...", metrics=["sessions"])
print(f"Total sessions: {sum(row['sessions'] for row in report)}")
"""

# 2. Sandbox validates security
sandbox = SecurePythonSandbox(
    shop_id="shop-uuid-123",
    mcp_workbenches={"ga4": ga4_workbench},
    trace_id="agent-trace-001"
)

# 3. Code is compiled with RestrictedPython
compiled = compile_restricted(code, '<string>', 'exec')

# 4. Safe namespace is built
namespace = {
    '__builtins__': limited_builtins,  # Restricted builtins
    'print': custom_print,              # Captured output
    'mcp_tools': mcp_tools_module,     # Shop-scoped MCP access
    'asyncio': asyncio,                 # For await
    # os, subprocess, socket NOT included!
}

# 5. Code executes in namespace with timeout
result = await asyncio.wait_for(
    exec(compiled, namespace),
    timeout=30.0
)

# 6. Only printed output returns to agent
return result.output  # "Total sessions: 45,231"
```

#### Shop Isolation

```python
class ShopLockedMCPModule:
    """
    MCP module that automatically injects shop_id into all tool calls.
    """
    
    def __init__(self, server_name: str, workbench: McpWorkbench, shop_id: str):
        self.shop_id = shop_id  # Locked to this shop!
        self.workbench = workbench
    
    def __getattr__(self, tool_name: str):
        async def tool_call(**kwargs):
            # shop_id is automatically included
            # Agent code cannot access other shops' data
            result = await self.workbench.call_tool(
                f"{self.server_name}__{tool_name}",
                arguments=kwargs
            )
            return result
        return tool_call
```

---

## 📦 mcp_tools Module

### Structure

```
mcp_tools/
├── __init__.py              # Central router & call_mcp_tool()
├── ga4/
│   ├── __init__.py          # Export all GA4 tools
│   ├── run_report.py
│   ├── get_account_summaries.py
│   ├── run_realtime_report.py
│   ├── get_property_details.py
│   ├── get_custom_dimensions_and_metrics.py
│   └── list_google_ads_links.py
├── gsc/
│   ├── __init__.py
│   ├── list_properties.py
│   ├── get_search_analytics.py
│   ├── get_site_details.py
│   ├── get_url_inspection.py
│   └── list_sitemaps.py
├── meta_ads/
│   ├── __init__.py
│   └── [15 tool files]
├── google_ads/
│   ├── __init__.py
│   └── [6 tool files]
└── pagespeed/
    ├── __init__.py
    └── analyze_page.py
```

### How Agents Use It

```python
# Agent code (executed in sandbox)
from mcp_tools import ga4, gsc

# Call GA4
report = await ga4.run_report(
    property_id="properties/123456",
    metrics=["sessions"],
    date_ranges=[{"startDate": "7daysAgo", "endDate": "today"}]
)

# Call GSC
search_data = await gsc.get_search_analytics(
    site_url="https://example.com",
    start_date="2024-01-01",
    end_date="2024-01-31"
)

# Process data in sandbox
total_sessions = sum(row['sessions'] for row in report)
total_clicks = sum(row['clicks'] for row in search_data)

# Return summary only
print(f"Sessions: {total_sessions}, Clicks: {total_clicks}")
```

### Tool Wrapper Example

```python
# mcp_tools/ga4/run_report.py
from ..__init__ import call_mcp_tool

async def run_report(
    property_id: str,
    date_ranges: list,
    metrics: list,
    dimensions: list = None,
    limit: int = None,
    dimension_filter: dict = None,
    metric_filter: dict = None
):
    """
    Run a Google Analytics 4 report.
    
    Args:
        property_id: GA4 property ID (e.g., "properties/123456")
        date_ranges: List of date range dicts
        metrics: List of metric names
        dimensions: Optional list of dimension names
        limit: Optional row limit
        dimension_filter: Optional dimension filter
        metric_filter: Optional metric filter
    
    Returns:
        Report data
    """
    return await call_mcp_tool('ga4', 'run_report', {
        'property_id': property_id,
        'date_ranges': date_ranges,
        'metrics': metrics,
        'dimensions': dimensions,
        'limit': limit,
        'dimension_filter': dimension_filter,
        'metric_filter': metric_filter
    })
```

---

## 🔐 Multi-Tenant Security

### Isolation Mechanisms

```
┌──────────────────────────────────────────────────────┐
│         MULTI-TENANT ISOLATION LAYERS                 │
├──────────────────────────────────────────────────────┤
│                                                       │
│  1. DATABASE LEVEL                                   │
│     - shop_id in all queries                         │
│     - FK constraints                                 │
│     - OAuth tokens per shop (Integration table)      │
│                                                       │
│  2. SANDBOX LEVEL                                    │
│     - SecurePythonSandbox(shop_id="...")            │
│     - ShopLockedMCPModule per shop                  │
│     - No cross-shop imports possible                │
│                                                       │
│  3. MCP WORKBENCH LEVEL                              │
│     - Credentials resolved per shop                  │
│     - Temporary credential files                     │
│     - Workbench instance per shop per server        │
│                                                       │
│  4. CREDENTIAL LEVEL                                 │
│     - OAuth tokens stored encrypted                  │
│     - Temp files deleted after use                   │
│     - No credential sharing between shops            │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### Credential Resolution Flow

```python
# 1. Agent initialization for shop
agent = create_agent_with_code_execution_mcp(
    name="schema_agent",
    shop_id="shop-uuid-abc",  # Shop isolation starts here
    mcp_workbenches=[ga4_wb, gsc_wb]
)

# 2. OAuth credentials resolved from database
credentials = oauth_resolver.resolve_credentials(
    shop_id="shop-uuid-abc",
    integration_type="GA4"
)
# Returns shop-specific OAuth tokens

# 3. Temporary credential file created
temp_file = create_temp_credentials(credentials)
# /tmp/mcp_creds_shop-uuid-abc_ga4_timestamp.json

# 4. MCP server started with shop credentials
server = StdioServerParams(
    command="python",
    args=["mcp_server_ga4/server.py"],
    env={"GOOGLE_APPLICATION_CREDENTIALS": temp_file}
)

# 5. Workbench connects to server
workbench = McpWorkbench(server)

# 6. Sandbox created with shop-scoped workbench
sandbox = SecurePythonSandbox(
    shop_id="shop-uuid-abc",
    mcp_workbenches={"ga4": workbench}
)

# 7. Agent code executes with shop isolation
# Cannot access data from shop-uuid-xyz!

# 8. Cleanup
temp_file.delete()  # Credentials removed
```

**Details**: See [MULTI_TENANT.md](MULTI_TENANT.md)

---

## 🛠️ Setup & Installation

### Prerequisites

```bash
# Python packages
pip install RestrictedPython
pip install google-analytics-data
pip install google-api-python-client
pip install facebook-business
pip install google-ads

# Node.js (for PageSpeed server)
npm install -g @modelcontextprotocol/server-pagespeed
```

### Environment Variables

```bash
# backend/src/ai/.env

# OpenAI
OPENAI_API_KEY=sk-...

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/beryboo

# Default shop for testing
DEFAULT_SHOP_ID=your-shop-uuid

# Google OAuth (for MCP servers)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Meta OAuth
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
```

### MCP Server Installation

Each server needs initial setup:

```bash
cd backend/src/ai

# GA4 Server
cd mcp_server_ga4
pip install -r requirements.txt
python scripts/authorize-ga4.py  # One-time OAuth

# GSC Server
cd mcp_server_gsc
pip install -r requirements.txt
python scripts/authorize-gsc.py  # One-time OAuth

# Meta Ads Server
cd mcp_server_meta_ads
pip install -r requirements.txt
bash meta_ads_auth.sh  # One-time OAuth

# Google Ads Server
cd mcp_server_google_ads
pip install -r requirements.txt
python scripts/authorize-google-ads.py

# PageSpeed Server (Node.js)
cd mcp_server_pagespeed
npm install
```

### Verify Installation

```bash
cd backend/src/ai

# Test GA4
python main.py chat-ga4 --shop-id YOUR_SHOP_ID

# Test GSC
python main.py chat-gsc --shop-id YOUR_SHOP_ID

# Test Meta Ads
python main.py chat-meta-ads --shop-id YOUR_SHOP_ID

# Test code execution sandbox
python -m pytest tests/test_code_execution_security.py
```

---

## 💻 Usage Examples

### Example 1: GA4 Report in Sandbox

```python
# Agent receives task: "Get last 30 days sessions by device"

# Agent writes code:
code = """
from mcp_tools import ga4

report = await ga4.run_report(
    property_id="properties/326784853",
    metrics=["sessions"],
    dimensions=["deviceCategory"],
    date_ranges=[{"startDate": "30daysAgo", "endDate": "today"}]
)

# Process in sandbox
by_device = {}
for row in report:
    device = row['deviceCategory']
    sessions = row['sessions']
    by_device[device] = sessions

# Return summary
print(f"Desktop: {by_device.get('desktop', 0)} sessions")
print(f"Mobile: {by_device.get('mobile', 0)} sessions")
print(f"Tablet: {by_device.get('tablet', 0)} sessions")
"""

# Sandbox executes
result = await sandbox.execute(code)

# Output returned to agent:
# "Desktop: 15,432 sessions\nMobile: 28,901 sessions\nTablet: 1,234 sessions"
```

### Example 2: Multi-Source Analysis

```python
# Agent task: "Compare GA4 sessions with GSC clicks"

code = """
from mcp_tools import ga4, gsc
import json

# Get GA4 data
ga4_report = await ga4.run_report(
    property_id="properties/326784853",
    metrics=["sessions"],
    dimensions=["date"],
    date_ranges=[{"startDate": "30daysAgo", "endDate": "today"}]
)

# Get GSC data
gsc_data = await gsc.get_search_analytics(
    site_url="https://example.com",
    start_date="2024-01-01",
    end_date="2024-01-31",
    dimensions=["date"]
)

# Aggregate in sandbox
ga4_total = sum(row['sessions'] for row in ga4_report)
gsc_total = sum(row['clicks'] for row in gsc_data)

# Calculate ratio
ratio = ga4_total / gsc_total if gsc_total > 0 else 0

print(f"GA4 Sessions: {ga4_total}")
print(f"GSC Clicks: {gsc_total}")
print(f"Sessions per Click: {ratio:.2f}")
"""
```

### Example 3: Filtering Large Datasets

```python
# Agent task: "Find pages with >1000 impressions but <2% CTR"

code = """
from mcp_tools import gsc

# Get all pages data
data = await gsc.get_search_analytics(
    site_url="https://example.com",
    start_date="2024-01-01",
    end_date="2024-01-31",
    dimensions=["page"],
    row_limit=10000  # Large dataset
)

# Filter in sandbox (not in LLM context!)
low_ctr_pages = []
for row in data:
    if row['impressions'] > 1000 and row['ctr'] < 0.02:
        low_ctr_pages.append({
            'page': row['page'],
            'impressions': row['impressions'],
            'clicks': row['clicks'],
            'ctr': row['ctr']
        })

# Sort by opportunity (high impressions, low CTR)
low_ctr_pages.sort(key=lambda x: x['impressions'], reverse=True)

# Return top 10 only
print(f"Found {len(low_ctr_pages)} pages with optimization opportunity")
print("\\nTop 10 pages:")
for page in low_ctr_pages[:10]:
    print(f"- {page['page']}: {page['impressions']} impr, {page['ctr']*100:.2f}% CTR")
"""

# Only 10 pages + summary returned to LLM (not 10,000!)
```

---

## ➕ Adding New MCP Tools

### Step-by-Step Guide

#### 1. Add Tool to MCP Server

```python
# mcp_server_ga4/tools.py

from mcp import Tool

@Tool
async def get_new_metric(property_id: str, metric_name: str):
    """
    Get a specific custom metric.
    """
    # Implementation
    result = analytics_client.get_custom_metric(property_id, metric_name)
    return result
```

#### 2. Create Tool Wrapper

```python
# mcp_tools/ga4/get_new_metric.py

from ..__init__ import call_mcp_tool

async def get_new_metric(property_id: str, metric_name: str):
    """
    Get a specific custom metric from GA4.
    
    Args:
        property_id: GA4 property ID
        metric_name: Custom metric name
    
    Returns:
        Metric data
    """
    return await call_mcp_tool('ga4', 'get_new_metric', {
        'property_id': property_id,
        'metric_name': metric_name
    })
```

#### 3. Export in __init__.py

```python
# mcp_tools/ga4/__init__.py

from .run_report import run_report
from .get_account_summaries import get_account_summaries
from .get_new_metric import get_new_metric  # Add this

__all__ = [
    'run_report',
    'get_account_summaries',
    'get_new_metric',  # Add this
]
```

#### 4. Test

```python
# Test in sandbox
code = """
from mcp_tools import ga4

metric_data = await ga4.get_new_metric(
    property_id="properties/123456",
    metric_name="customMetric1"
)
print(metric_data)
"""

result = await sandbox.execute(code)
```

### Adding a New MCP Server

#### 1. Create Server Directory

```bash
mkdir mcp_server_new_api
cd mcp_server_new_api
```

#### 2. Implement Server

```python
# mcp_server_new_api/server.py

from mcp import Server, Tool

server = Server("new_api")

@server.tool()
async def fetch_data(param1: str, param2: int):
    """Fetch data from new API."""
    # Implementation
    return {"data": "..."}

if __name__ == "__main__":
    server.run()
```

#### 3. Create mcp_tools Wrapper

```bash
mkdir mcp_tools/new_api
```

```python
# mcp_tools/new_api/fetch_data.py

from ..__init__ import call_mcp_tool

async def fetch_data(param1: str, param2: int):
    """Fetch data from new API."""
    return await call_mcp_tool('new_api', 'fetch_data', {
        'param1': param1,
        'param2': param2
    })
```

#### 4. Register in MCP Manager

```python
# src/berryboo_ai/services/mcp_manager.py

# Add new server configuration
MCP_SERVERS = {
    # ... existing servers ...
    'new_api': {
        'command': 'python',
        'args': ['mcp_server_new_api/server.py'],
        'env': {}
    }
}
```

---

## 🔧 Troubleshooting

### Common Issues

#### Issue 1: MCP Server Won't Start

**Symptoms**:
```
Error: MCP server connection failed
```

**Solutions**:
```bash
# Check server can run standalone
cd mcp_server_ga4
python server.py

# Check credentials
echo $GOOGLE_APPLICATION_CREDENTIALS

# Verify OAuth tokens
python test_ga4_creds.py
```

#### Issue 2: Sandbox Security Error

**Symptoms**:
```
SecurityError: Blocked pattern detected: os.
```

**Solution**:
```python
# DON'T use blocked operations
import os  # ❌ Blocked

# DO use allowed operations
import json  # ✅ Allowed
```

#### Issue 3: Shop Credentials Not Found

**Symptoms**:
```
Error: No OAuth credentials found for shop_id=...
```

**Solutions**:
```python
# Check Integration table
from importers.models import Integration

integration = Integration.objects.filter(
    shop_id="shop-uuid",
    integration_type=Integration.GOOGLE_ANALYTICS_API,
    active=True
).first()

print(integration.data)  # Should show tokens
```

#### Issue 4: Timeout in Sandbox

**Symptoms**:
```
ExecutionTimeoutError: Execution timed out after 30s
```

**Solutions**:
```python
# Optimize code to run faster
# Bad: Fetching too much data
report = await ga4.run_report(..., limit=100000)  # ❌ Too much

# Good: Limit data
report = await ga4.run_report(..., limit=1000)  # ✅ Reasonable

# Increase timeout if needed
result = await sandbox.execute(code, timeout=60.0)
```

#### Issue 5: Cross-Shop Data Leakage

**Symptoms**:
```
Agent is seeing data from wrong shop
```

**Solution**:
```python
# Verify shop_id is passed correctly
agent = create_agent_with_code_execution_mcp(
    name="agent",
    shop_id="correct-shop-uuid",  # ← Check this!
    mcp_workbenches=[workbench]
)

# Check sandbox isolation
sandbox = SecurePythonSandbox(
    shop_id="correct-shop-uuid",  # ← Must match agent
    mcp_workbenches=workbenches
)
```

### Debug Mode

```python
import logging

logging.basicConfig(level=logging.DEBUG)

# Detailed logs will show:
# - MCP server connections
# - Tool calls
# - Sandbox executions
# - OAuth credential resolution
```

### Testing MCP Integration

```bash
# Run security tests
pytest tests/test_code_execution_security.py -v

# Run MCP integration tests
pytest tests/test_mcp_integration.py -v

# Test specific server
python main.py chat-ga4 --shop-id TEST_SHOP_ID
```

---

## 📚 Related Documentation

- **[OAUTH_INTEGRATION.md](OAUTH_INTEGRATION.md)**: OAuth setup and credential management
- **[MULTI_TENANT.md](MULTI_TENANT.md)**: Multi-tenant architecture details
- **[AGENTS_MASTER.md](AGENTS_MASTER.md)**: How agents use MCP tools
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)**: Extending the system
- **[Anthropic MCP Blog](https://www.anthropic.com/engineering/code-execution-with-mcp)**: Original approach



