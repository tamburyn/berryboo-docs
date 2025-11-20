# MCP Integration Guide

## Overview

This guide documents the **Model Context Protocol (MCP)** integration in the BerryBoo AI system using **Anthropic's code execution approach**. All MCP servers use secure sandboxed Python code execution for optimal token efficiency and performance.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Code Execution Approach](#code-execution-approach)
3. [MCP Servers](#mcp-servers)
4. [Agent Integration](#agent-integration)
5. [Multi-Tenant Security](#multi-tenant-security)
6. [Development Guide](#development-guide)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Core Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        BerryBoo AI System                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────┐      ┌─────────────────────────────────┐  │
│  │  Master Agent  │──────│    Specialist Teams             │  │
│  └────────────────┘      │  ┌──────────┐  ┌──────────┐    │  │
│                          │  │ Performance│ │   SEO    │    │  │
│                          │  │ Marketing  │ │ Specialist│   │  │
│                          │  └──────────┘  └──────────┘    │  │
│                          │  ┌──────────┐  ┌──────────┐    │  │
│                          │  │   UX     │  │   GSC    │    │  │
│                          │  │ Specialist│ │ Specialist│   │  │
│                          │  └──────────┘  └──────────┘    │  │
│                          └──────────┬──────────────────────┘  │
│                                     │                          │
│                          ┌──────────▼──────────────────┐      │
│                          │  Code Execution Sandbox     │      │
│                          │  (SecurePythonSandbox)      │      │
│                          │  - RestrictedPython         │      │
│                          │  - Shop-level isolation     │      │
│                          │  - Timeout protection       │      │
│                          └──────────┬──────────────────┘      │
│                                     │                          │
│                          ┌──────────▼──────────────────┐      │
│                          │    mcp_servers/ Module      │      │
│                          │  - ga4/                     │      │
│                          │  - gsc/                     │      │
│                          │  - meta_ads/                │      │
│                          │  - google_ads/              │      │
│                          │  - pagespeed/               │      │
│                          └──────────┬──────────────────┘      │
│                                     │                          │
│          ┌──────────────────────────┼─────────────────────┐   │
│          │                          │                     │   │
│    ┌─────▼────┐  ┌────▼────┐  ┌───▼───┐  ┌────▼─────┐  │   │
│    │   GA4    │  │  GSC    │  │ Meta  │  │  Google  │  │   │
│    │  Server  │  │ Server  │  │  Ads  │  │   Ads    │  │   │
│    │          │  │         │  │Server │  │  Server  │  │   │
│    └──────────┘  └─────────┘  └───────┘  └──────────┘  │   │
│                                                           │   │
└───────────────────────────────────────────────────────────┘   │
```

### Key Principles

1. **Code Execution First**: Agents write Python code to interact with MCP servers instead of direct tool calls
2. **Secure Sandboxing**: All code runs in restricted Python environment with shop-level isolation
3. **Token Efficiency**: Code execution reduces token consumption by ~60-80% compared to direct tool calling
4. **Multi-Tenant Security**: Shop credentials and data are isolated per execution context

---

## Code Execution Approach

### Traditional vs Code Execution

#### ❌ Traditional (Old Approach)
```python
# Agent receives 100+ tool definitions (10,000+ tokens)
tools = [
    "ga4_run_report", 
    "ga4_get_metadata",
    "ga4_run_realtime_report",
    # ... 97 more tools
]

# Agent directly calls tools
result = await agent.call_tool("ga4_run_report", {...})
```

#### ✅ Code Execution (New Approach)
```python
# Agent receives 1 execute_code tool (~200 tokens)
tools = ["execute_code"]

# Agent writes code
code = """
from mcp_servers import ga4

report = await ga4.run_report(
    property_id="properties/123456",
    metrics=["activeUsers", "sessions"],
    date_ranges=[{"startDate": "7daysAgo", "endDate": "today"}]
)
print(report)
"""

# Code runs in secure sandbox
result = await sandbox.execute(code)
```

### Benefits

| Aspect | Traditional | Code Execution | Improvement |
|--------|------------|----------------|-------------|
| **Token Usage** | 10,000+ tokens | 200-500 tokens | **95% reduction** |
| **Flexibility** | Fixed tool calls | Dynamic code | **Unlimited** |
| **Speed** | Multiple roundtrips | Single execution | **3-5x faster** |
| **Cost** | High | Low | **60-80% cheaper** |

---

## MCP Servers

### 1. Google Analytics 4 (GA4)

**Server**: `mcp_server_ga4`  
**Module**: `mcp_servers.ga4`  
**Python**: `analytics-mcp` package

#### Available Tools

```python
from mcp_servers import ga4

# Account Management
accounts = await ga4.get_account_summaries()

# Reports
report = await ga4.run_report(
    property_id="properties/123456",
    metrics=["activeUsers", "sessions"],
    dimensions=["date", "deviceCategory"],
    date_ranges=[{"startDate": "30daysAgo", "endDate": "today"}]
)

# Real-time Data
realtime = await ga4.run_realtime_report(
    property_id="properties/123456",
    metrics=["activeUsers"]
)

# Metadata
metadata = await ga4.get_metadata(property_id="properties/123456")
dimensions = await ga4.list_dimensions(property_id="properties/123456")
metrics = await ga4.list_metrics(property_id="properties/123456")
```

#### Use Cases
- Traffic analysis
- Conversion tracking
- User behavior analysis
- Real-time monitoring
- Custom reports

---

### 2. Google Search Console (GSC)

**Server**: `mcp_server_gsc`  
**Module**: `mcp_servers.gsc`  
**Python**: `gsc-mcp` package

#### Available Tools

```python
from mcp_servers import gsc

# Properties
properties = await gsc.list_properties()

# Search Analytics
analytics = await gsc.get_search_analytics(
    site_url="https://example.com",
    start_date="2024-01-01",
    end_date="2024-01-31",
    dimensions=["query", "page"],
    row_limit=100
)

# Sitemaps
sitemaps = await gsc.list_sitemaps(site_url="https://example.com")
sitemap = await gsc.get_sitemap(
    site_url="https://example.com",
    sitemap_url="https://example.com/sitemap.xml"
)

# URL Inspection
inspection = await gsc.inspect_url(
    site_url="https://example.com",
    inspection_url="https://example.com/products/item-1"
)
```

#### Use Cases
- SEO performance tracking
- Keyword analysis
- Page-level search metrics
- Indexing monitoring
- Core Web Vitals tracking

---

### 3. Meta Ads (Facebook/Instagram)

**Server**: `mcp_server_meta_ads`  
**Module**: `mcp_servers.meta_ads`  
**Python**: `meta-ads-mcp` package

#### Available Tools

```python
from mcp_servers import meta_ads

# Account Info
account = await meta_ads.get_account_info()

# Campaigns
campaigns = await meta_ads.get_campaigns(
    fields=["name", "status", "objective", "daily_budget"]
)
campaign = await meta_ads.get_campaign(campaign_id="123456")

# Ad Sets
adsets = await meta_ads.get_adsets(
    campaign_id="123456",
    fields=["name", "status", "targeting", "budget_remaining"]
)

# Ads
ads = await meta_ads.get_ads(
    adset_id="789012",
    fields=["name", "status", "creative"]
)

# Insights (Performance)
insights = await meta_ads.get_insights(
    account_id="act_123456",
    date_preset="last_30d",
    level="campaign",
    fields=["spend", "impressions", "clicks", "conversions"]
)

# Ad Creative
creative = await meta_ads.get_ad_creative(creative_id="345678")
creatives = await meta_ads.list_ad_creatives(account_id="act_123456")

# Audiences
audiences = await meta_ads.get_custom_audiences()
audience = await meta_ads.get_audience_insights(audience_id="456789")

# Ad Account Details
details = await meta_ads.get_ad_account_details()
```

#### Use Cases
- Campaign performance analysis
- Ad creative testing
- Audience insights
- Budget optimization
- ROAS tracking

---

### 4. Google Ads

**Server**: `mcp_server_google_ads`  
**Module**: `mcp_servers.google_ads`  
**Python**: `google-ads-mcp` package

#### Available Tools

```python
from mcp_servers import google_ads

# Accounts
accounts = await google_ads.list_accounts()

# Campaigns
campaigns = await google_ads.get_campaigns(customer_id="1234567890")
performance = await google_ads.get_campaign_performance(
    customer_id="1234567890",
    start_date="2024-01-01",
    end_date="2024-01-31"
)

# Keywords
keywords = await google_ads.get_keywords(
    customer_id="1234567890",
    campaign_id="987654321"
)

# Search Terms
search_terms = await google_ads.get_search_terms(
    customer_id="1234567890",
    start_date="2024-01-01",
    end_date="2024-01-31"
)

# Ad Groups
ad_groups = await google_ads.get_ad_groups(
    customer_id="1234567890",
    campaign_id="987654321"
)
```

#### Use Cases
- PPC campaign monitoring
- Keyword performance tracking
- Search term analysis
- Budget management
- Quality Score optimization

---

### 5. PageSpeed Insights

**Server**: `mcp_server_pagespeed`  
**Module**: `mcp_servers.pagespeed`  
**Python**: `pagespeed-mcp` package

#### Available Tools

```python
from mcp_servers import pagespeed

# Analyze Page
result = await pagespeed.analyze_page(
    url="https://example.com",
    strategy="mobile"  # or "desktop"
)

# Extract Core Web Vitals
lcp = result["lighthouseResult"]["audits"]["largest-contentful-paint"]["numericValue"]
fid = result["lighthouseResult"]["audits"]["max-potential-fid"]["numericValue"]
cls = result["lighthouseResult"]["audits"]["cumulative-layout-shift"]["numericValue"]

# Performance Score
performance_score = result["lighthouseResult"]["categories"]["performance"]["score"] * 100
```

#### Use Cases
- Core Web Vitals monitoring
- Page speed optimization
- Mobile vs desktop comparison
- Performance budget tracking
- UX improvement analysis

---

## Agent Integration

### Creating Code Execution Agents

```python
from berryboo_ai.agents.tools.mcp_tools import create_agent_with_code_execution_mcp
from berryboo_ai.services.mcp_manager import MCPManager

# Initialize MCP workbenches
mcp_manager = MCPManager()
ga4_workbench = await mcp_manager.create_ga4_workbench(shop_id, property_id)
gsc_workbench = await mcp_manager.create_gsc_workbench(shop_id, site_url)

# Create agent with code execution
agent = await create_agent_with_code_execution_mcp(
    name="analytics_agent",
    description="GA4 & GSC data analyst with code execution",
    system_message="You are a data analyst...",
    model_name="gpt-4o-mini",
    mcp_workbenches=[ga4_workbench, gsc_workbench],
    database_tools=[fetch_data_func],
    shop_id=shop_id,
    agent_role="schema",  # or "research"
    max_tool_iterations=8
)
```

### Agent Roles

| Role | MCP Access | Code Execution | Use Case |
|------|-----------|----------------|----------|
| **schema** | ✅ Yes | ✅ Yes | Data analysis, fetching live metrics |
| **research** | ✅ Yes | ✅ Yes | Competitive research, trend analysis |
| **strategy** | ❌ No | ❌ No | Strategic recommendations |
| **validator** | ❌ No | ❌ No | Quality assurance |

### System Message Enhancement

Agents automatically receive enhanced system messages with MCP tool discovery:

```python
# Auto-generated system message addition
"""
🔧 CODE EXECUTION ENVIRONMENT

You have access to a secure Python sandbox for executing MCP tool calls.
Write Python code to interact with these MCP servers:

Available MCP Servers:
- mcp_servers.ga4 (Google Analytics 4)
- mcp_servers.gsc (Google Search Console)
- mcp_servers.meta_ads (Meta Advertising)
- mcp_servers.google_ads (Google Ads)
- mcp_servers.pagespeed (PageSpeed Insights)

Example Usage:
```python
from mcp_servers import ga4, gsc

# Fetch GA4 data
report = await ga4.run_report(
    property_id="properties/123456",
    metrics=["activeUsers", "sessions"],
    date_ranges=[{"startDate": "7daysAgo", "endDate": "today"}]
)

# Fetch GSC data
search_data = await gsc.get_search_analytics(
    site_url="https://example.com",
    start_date="2024-01-01",
    end_date="2024-01-31"
)

print(f"Active Users: {report['rows'][0]['metricValues'][0]['value']}")
```

IMPORTANT:
- All code runs in a shop-isolated sandbox
- Credentials are automatically managed
- Maximum execution time: 30 seconds
- Use print() to output results
"""
```

---

## Multi-Tenant Security

### Shop-Level Isolation

Every code execution is isolated by `shop_id`:

```python
# Sandbox initialization
sandbox = SecurePythonSandbox(
    shop_id="shop_abc123",
    mcp_workbenches={
        "ga4": ga4_workbench_for_shop,
        "gsc": gsc_workbench_for_shop
    },
    trace_id="agent-execution-uuid"
)

# Shop credentials are locked to sandbox
# Cannot access other shops' data
```

### Security Features

1. **RestrictedPython**: Blocks dangerous imports (`os`, `sys`, `subprocess`, etc.)
2. **Timeout Protection**: 30-second execution limit
3. **Credential Isolation**: OAuth tokens fetched per shop from database
4. **Module Whitelisting**: Only `mcp_servers.*` and safe built-ins available
5. **Shop-Locked MCP Access**: `McpWorkbench` instances are pre-configured per shop

### Blocked Operations

```python
# ❌ These will fail in sandbox
import os
import sys
import subprocess
import socket
open("/etc/passwd")
eval("malicious_code")
exec("dangerous_code")
```

### Allowed Operations

```python
# ✅ These work in sandbox
from mcp_servers import ga4, gsc, meta_ads, google_ads, pagespeed
import json
import datetime
from typing import List, Dict

# Safe built-ins
print(), len(), str(), int(), list(), dict()
```

---

## Development Guide

### Adding a New MCP Tool

#### 1. Add to MCP Server

Update the relevant MCP server (e.g., `mcp_server_ga4/tools.py`):

```python
# New tool definition
@tool
async def get_user_retention(
    property_id: str,
    start_date: str,
    end_date: str
) -> Dict[str, Any]:
    """Fetch user retention cohort data from GA4."""
    # Implementation
    pass
```

#### 2. Create Python Wrapper

Create `mcp_servers/ga4/get_user_retention.py`:

```python
"""GA4 get_user_retention tool wrapper."""

from typing import Dict, Any
from .. import call_mcp_tool


async def get_user_retention(
    property_id: str,
    start_date: str,
    end_date: str
) -> Dict[str, Any]:
    """Fetch user retention cohort data from GA4."""
    return await call_mcp_tool(
        'ga4',
        'mcp_ga4_get_user_retention',
        {
            'property_id': property_id,
            'start_date': start_date,
            'end_date': end_date
        }
    )
```

#### 3. Export in Module

Update `mcp_servers/ga4/__init__.py`:

```python
from .get_user_retention import get_user_retention

__all__ = [
    # ... existing exports
    'get_user_retention',
]
```

#### 4. Update System Prompts

Add tool documentation to `code_execution_prompts.py`:

```python
GA4_EXAMPLES = """
...
7. User Retention Analysis:
   ```python
   retention = await ga4.get_user_retention(
       property_id="properties/123456",
       start_date="30daysAgo",
       end_date="today"
   )
   print(f"Retention rate: {retention['cohorts'][0]['rate']}")
   ```
"""
```

### Testing MCP Tools

```python
# backend/src/ai/tests/test_mcp_code_execution.py
import pytest
from berryboo_ai.services.code_execution_sandbox import SecurePythonSandbox


@pytest.mark.asyncio
async def test_ga4_tool_execution():
    sandbox = SecurePythonSandbox(
        shop_id="test_shop",
        mcp_workbenches={"ga4": mock_ga4_workbench},
        trace_id="test"
    )
    
    code = """
from mcp_servers import ga4

result = await ga4.get_account_summaries()
print(result)
"""
    
    result = await sandbox.execute(code, timeout=10.0)
    assert result.success
    assert "accountSummaries" in result.output
```

---

## Troubleshooting

### Common Issues

#### 1. Import Errors in Sandbox

**Error**: `ImportError: No module named 'os'`

**Solution**: This is expected security behavior. Use allowed modules only:

```python
# ❌ Wrong
import os
os.environ["VAR"] = "value"

# ✅ Correct
from mcp_servers import ga4
```

#### 2. Timeout Errors

**Error**: `ExecutionError: Code execution timed out after 30.0s`

**Solution**: Optimize your code or break into smaller chunks:

```python
# ❌ Too slow
for i in range(10000):
    await ga4.run_report(...)  # 10,000 API calls

# ✅ Optimized
report = await ga4.run_report(
    metrics=["activeUsers"],
    dimensions=["date"],
    date_ranges=[{"startDate": "90daysAgo", "endDate": "today"}]
)
```

#### 3. Shop Credential Issues

**Error**: `ValueError: No Google Analytics integration found for shop`

**Solution**: Ensure shop has connected OAuth integration:

```bash
# Check integrations
SELECT * FROM integration WHERE shop_id = 'shop_abc123';

# Verify tokens are fresh
SELECT * FROM oauth_token WHERE shop_id = 'shop_abc123' AND expires_at > NOW();
```

#### 4. MCP Server Connection Failed

**Error**: `McpError: Failed to connect to mcp_server_ga4`

**Solution**: Check MCP server installation:

```bash
# Verify server is installed
which analytics-mcp
which gsc-mcp
which meta-ads-mcp

# Test server directly
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | analytics-mcp
```

### Debug Mode

Enable detailed logging:

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("berryboo_ai")

# Sandbox execution will log all steps
result = await sandbox.execute(code, timeout=30.0)
```

### Performance Monitoring

```python
import time

start = time.time()
result = await sandbox.execute(code)
duration = time.time() - start

logger.info(f"Execution took {duration:.2f}s")
logger.info(f"Output length: {len(result.output)} chars")
```

---

## Migration Notes

### From Direct Tool Calling

If migrating from old direct tool calling approach:

#### Before (Old)
```python
agent = await create_agent_with_mcp(
    name="agent",
    mcp_workbenches=[ga4_workbench],
    agent_role="schema"
)
```

#### After (New)
```python
agent = await create_agent_with_code_execution_mcp(
    name="agent",
    mcp_workbenches=[ga4_workbench],
    shop_id=shop_id,  # ⚠️ Required!
    agent_role="schema"
)
```

### Backward Compatibility

The old `create_agent_with_mcp` function still works but is deprecated. It automatically redirects to the new function:

```python
# This still works (with deprecation warning)
agent = await create_agent_with_mcp(
    name="agent",
    mcp_workbenches=[ga4_workbench],
    shop_id=shop_id,
    agent_role="schema"
)
```

---

## Additional Resources

- **Anthropic Code Execution Article**: https://www.anthropic.com/engineering/code-execution-with-mcp
- **MCP Specification**: https://modelcontextprotocol.io/
- **RestrictedPython Docs**: https://restrictedpython.readthedocs.io/
- **AutoGen AgentChat**: https://microsoft.github.io/autogen/

---

## Support

For questions or issues:

1. Check this guide first
2. Review agent logs: `backend/src/ai/logs/`
3. Test in isolation with security test suite: `pytest tests/test_code_execution_security.py`
4. Check MCP server status: `docker-compose ps` (if using Docker)


