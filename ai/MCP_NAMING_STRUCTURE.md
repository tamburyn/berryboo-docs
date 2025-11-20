# MCP Naming Structure - Clear Separation

## 📁 Directory Structure

```
backend/src/ai/
├── mcp_server_ga4/          # Actual GA4 MCP server
├── mcp_server_gsc/          # Actual GSC MCP server
├── mcp_server_meta_ads/     # Actual Meta Ads MCP server
├── mcp_server_google_ads/   # Actual Google Ads MCP server
├── mcp_server_pagespeed/    # Actual PageSpeed MCP server
└── mcp_tools/               # Python client tools (NEW - wrapper module)
    ├── __init__.py          # Central router
    ├── ga4/                 # GA4 tool wrappers
    ├── gsc/                 # GSC tool wrappers
    ├── meta_ads/            # Meta Ads tool wrappers
    ├── google_ads/          # Google Ads tool wrappers
    └── pagespeed/           # PageSpeed tool wrappers
```

---

## 🔍 Clear Distinction

### `mcp_server_*` folders = **THE SERVERS**
**What**: Actual MCP server implementations  
**Type**: Standalone programs  
**Purpose**: Connect to external APIs (Google Analytics, Search Console, etc.)  
**Contains**: Server logic, authentication, API clients  
**Example**: `mcp_server_ga4/ga4_server.py`

### `mcp_tools` folder = **THE CLIENT**
**What**: Python wrapper/client library  
**Type**: Importable Python module  
**Purpose**: Provide clean API for agents to call MCP servers  
**Contains**: Static wrapper functions, routing logic  
**Example**: `mcp_tools/ga4/run_report.py`

---

## 💡 Usage in Code

### Agents import and use `mcp_tools`:

```python
# Agent writes code in sandbox
from mcp_tools import ga4, gsc

# Call GA4
report = await ga4.run_report(
    property_id="properties/123456",
    metrics=["activeUsers", "sessions"]
)

# Call GSC
search_data = await gsc.get_search_analytics(
    site_url="https://example.com",
    start_date="2024-01-01",
    end_date="2024-01-31"
)
```

### Behind the scenes:

1. `mcp_tools.ga4.run_report()` is called
2. Routes to `mcp_tools/__init__.py:call_mcp_tool()`
3. Finds the correct `McpWorkbench` for shop
4. `McpWorkbench` connects to `mcp_server_ga4/` (the actual server)
5. Server calls Google Analytics API
6. Data flows back

---

## 📊 Comparison Table

| Aspect | `mcp_server_*` | `mcp_tools` |
|--------|----------------|-------------|
| **What it is** | MCP server | Python client |
| **Purpose** | API connection | Agent interface |
| **Language** | Python/Node.js | Python only |
| **Runs as** | Separate process | Part of agent code |
| **Import in code?** | ❌ No | ✅ Yes |
| **Has credentials?** | ✅ Yes | ❌ No (routes to server) |
| **Connects to APIs?** | ✅ Yes | ❌ No (calls server) |
| **Used by** | `McpWorkbench` | Agents (in sandbox) |

---

## 🎯 Why This Naming?

### Before (Confusing):
- `mcp_server_ga4/` - Actual server
- `mcp_servers/` - Client tools ❌ **Too similar!**

### After (Clear):
- `mcp_server_ga4/` - Actual server ✅
- `mcp_tools/` - Client tools ✅ **Clearly different!**

---

## 🔄 Data Flow

```
Agent Code
    ↓
from mcp_tools import ga4
    ↓
mcp_tools/ga4/run_report.py
    ↓
mcp_tools/__init__.py (router)
    ↓
McpWorkbench (AutoGen)
    ↓
mcp_server_ga4/ (actual server)
    ↓
Google Analytics API
```

---

## 📝 Key Points

1. **Both are required** - They work together
2. **Servers** (`mcp_server_*`) = Do the actual work
3. **Tools** (`mcp_tools`) = Provide agent interface
4. **Naming is clear** - `server` vs `tools`
5. **No confusion** - Different purposes, different names

---

## 🚀 For Developers

### Adding a new MCP tool:

1. **Add to server** (`mcp_server_ga4/tools.py`):
   ```python
   @tool
   async def new_tool(...):
       # Implementation
   ```

2. **Add wrapper** (`mcp_tools/ga4/new_tool.py`):
   ```python
   from .. import call_mcp_tool
   
   async def new_tool(...):
       return await call_mcp_tool('ga4', 'mcp_ga4_new_tool', {...})
   ```

3. **Export** (`mcp_tools/ga4/__init__.py`):
   ```python
   from .new_tool import new_tool
   ```

4. **Done!** Agents can now use `mcp_tools.ga4.new_tool()`

---

**Last Updated**: 2025-01-16  
**Structure Version**: 2.0 (Code Execution Migration)

