# Docker Integration for MCP

**Infrastructure Strategy for Model Context Protocol**

> **Note**: This document details the specific Docker configuration required to run the "Super Container" architecture for BerryBoo AI's MCP agents.

---

## 🏗️ Architecture: The "Super Container"

To support the **Model Context Protocol (MCP)** with stdio-based communication, the Backend Docker container acts as a "Super Container". It provides the runtime environment for both the main Django application and all specialized MCP sub-processes.

### Why this approach?
The AI agents communicate with MCP servers (tools) via standard input/output (`stdio`). This requires the tool processes (like the PageSpeed Node.js server) to be spawnable **inside the same container** as the Python application.

### Container Capabilities
The `backend` service in `docker-compose` is configured to run:
1.  **Python 3.10+**: For Django, Celery, and Python-based MCP servers (GA4, Google Ads, Meta Ads, GSC).
2.  **Node.js 20+**: Explicitly installed to support the `mcp-server-pagespeed`.

---

## 🛠️ Setup & Configuration

### 1. Git Structure Fix
**Issue**: MCP servers were originally cloned as nested Git repositories, causing them to be empty/untracked in the main repo.
**Fix**: `.git` folders were removed from `mcp_server_*` directories, converting them into standard tracked folders.

### 2. Dockerfile Modifications
The `backend/Development.dockerfile` was upgraded to include Node.js:

```dockerfile
# From backend/Development.dockerfile
# ... python setup ...

# Install Node.js (required for PageSpeed MCP)
RUN apt-get update && apt-get install -y ca-certificates curl gnupg && \
    # ... setup node source ...
    apt-get install -y nodejs
```

### 3. Python Dependencies
Added to `backend/requirements.in`:
- `mcp[cli]`: Core protocol support
- `httpx` & `python-dotenv`: Required by specific MCP server implementations

---

## 🚀 How to Run

### Step 1: Build the Container
Since system-level dependencies (Node.js) and Python packages changed, a full rebuild is required.

```bash
docker-compose build backend
```

### Step 2: Install PageSpeed Dependencies
The PageSpeed server is a Node.js application. Its dependencies (`node_modules`) must be installed.

**Option A: Run Locally (if you have npm)**
```bash
cd backend/src/ai/mcp_server_pagespeed
npm install
npm run build
```

**Option B: Run Inside Docker (if you don't have npm)**
```bash
# Start the stack first
docker-compose up -d

# Run install inside the running container
docker-compose exec backend bash -c "cd /src/ai/mcp_server_pagespeed && npm install && npm run build"
```

### Step 3: Start the Application
```bash
docker-compose up -d
```

---

## 🔍 Troubleshooting

**"Command not found: node"**
- Ensure you rebuilt the image with `docker-compose build backend`.
- Check version: `docker-compose exec backend node -v`.

**"Module not found: mcp"**
- Ensure `mcp[cli]` is in `requirements.txt` and the image was rebuilt.

**MCP Server connection failed**
- Check logs in `backend/logs/`.
- Ensure the specific MCP server folder contains files (not empty) - check Git status.

