# Multi-Tenant Architecture - Complete Guide

**Secure Multi-Shop Data Isolation & Management**

> **Prerequisites**: Read [START_HERE.md](START_HERE.md), [SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md), and [OAUTH_INTEGRATION.md](OAUTH_INTEGRATION.md) first.

---

This document explains how the BerryBoo AI system handles multiple client shops with complete data isolation, secure credential management, and seamless multi-tenant operations.

## Key Concepts

- **Shop**: A client's e-commerce store (unit of multi-tenancy)
- **Isolation**: Complete separation of data and credentials per shop
- **OAuth per Shop**: Each shop has independent OAuth tokens
- **Sandbox Isolation**: Code execution scoped to specific shop_id

---

# Multi-Tenant Usage Guide

## Overview

The Beryboo AI system supports multi-tenant access, allowing you to analyze data from multiple client accounts using their respective OAuth credentials. This guide explains how to connect client accounts, test with different shops, and handle production scenarios.

## Client Onboarding

### Step 1: Client Connects Account via Dashboard

Clients authorize your application through the existing BI dashboard:

#### Google Analytics
1. Client logs into Beryboo dashboard
2. Navigates to Integrations → Google Analytics
3. Clicks "Connect Google Analytics"
4. Redirected to Google OAuth consent screen
5. Grants permission for `analytics.readonly` scope
6. Redirected back to dashboard
7. OAuth tokens stored in `Integration` model

#### Google Ads
1. Client logs into dashboard
2. Navigates to Integrations → Google Ads
3. Clicks "Connect Google Ads"
4. Grants permission for `adwords` scope
5. Tokens stored with `customer_id`

#### Meta Ads
1. Client logs into dashboard
2. Navigates to Integrations → Meta Ads
3. Clicks "Connect Meta Ads"
4. Grants `ads_read` permission
5. Tokens stored with `ad_account_id`

#### Google Search Console
1. Client logs into dashboard
2. Navigates to Integrations → Search Console
3. Clicks "Connect Search Console"
4. Grants permission for `webmasters.readonly` scope
5. Tokens stored with `property_url`

### Step 2: Verify Integration

Check that integration was saved correctly:

```python
from importers.models import Integration

# Check if shop has GA4 integration
integration = Integration.objects.filter(
    shop_id="shop-uuid",
    integration_type=Integration.GOOGLE_ANALYTICS_API,
    active=True,
    deleted=False
).first()

print(integration.data)
# Should show: token, refresh_token, property_id, etc.
```

### Step 3: Test AI Access

Test that AI system can access the integration:

```bash
cd backend/src/ai
python main.py chat-ga4 --shop-id shop-uuid
```

Expected output:
```
✓ Connected to GA4 property: 326784853
Shop: shop-uuid
✓ Using dynamic OAuth credentials from Integration database
Available tools: get_account_summaries, run_report, ...
```

## CLI Usage Examples

### Using Default Shop (Testing)

```bash
# Uses DEFAULT_SHOP_ID from settings.py
python main.py chat-ga4
python main.py chat-gsc
python main.py chat-meta-ads
python main.py chat-google-ads
```

### Using Specific Client Shop

```bash
# Specify shop-id for any client
python main.py chat-ga4 --shop-id cac9d883-015f-478e-a93f-32ef401582a3
python main.py chat-gsc --shop-id abc-123-uuid
python main.py chat-meta-ads --shop-id def-456-uuid
```

### Using Static Credentials (Bypass Integration)

```bash
# For testing without database access
python main.py chat-ga4 --credentials-path ~/.config/gcloud/creds.json
python main.py chat-meta-ads --credentials-path ~/.config/meta-ads/creds.json
```

## Production Pipeline Behavior

### Anomaly Processing with Multi-Tenant Credentials

The production pipeline processes anomalies for all shops:

```python
# backend/src/ai/src/berryboo_ai/cli/commands/preprocess_and_route.py

async def preprocess_and_route_anomalies(limit: int = 10):
    anomalies = await fetch_anomalies_from_db(limit=limit)
    credential_manager = McpCredentialManager()
    
    for anomaly in anomalies:
        shop_id = anomaly.shop_id
        
        # Initialize with shop-specific credentials
        master_agent = MasterAgent(shop_id=shop_id)
        
        # Route to specialist teams
        recommendations = await route_to_specialist_teams(anomaly, shop_id)
        
        # Cleanup temp credentials
        await credential_manager.cleanup_temp_credentials(shop_id)
```

### Per-Shop Processing

Each shop's anomalies are processed with their own credentials:

```
Shop A anomaly → Resolve Shop A credentials → Process with Shop A data → Cleanup
Shop B anomaly → Resolve Shop B credentials → Process with Shop B data → Cleanup
Shop C anomaly → Resolve Shop C credentials → Process with Shop C data → Cleanup
```

### Graceful Degradation

If a shop doesn't have a specific integration:

```python
# Agent initialization returns None for missing integrations
ga4_workbench = await credential_manager.create_ga4_workbench(shop_id)
if not ga4_workbench:
    # Skip GA4 analysis for this shop
    logger.warning(f"Shop {shop_id} has no GA4 integration, skipping")
```

## Graceful Degradation Strategies

### Scenario 1: Shop Has Some Integrations

Shop has GA4 but not Meta Ads:

```python
# GA4 analysis works normally
ga4_insights = await ga4_team.analyze(anomaly)

# Meta Ads analysis is skipped gracefully
meta_workbench = await manager.create_meta_ads_workbench(shop_id)
if not meta_workbench:
    logger.info("No Meta Ads integration, skipping Meta analysis")
    meta_insights = []
```

### Scenario 2: Shop Has No Integrations

AI system skips MCP-based analysis and uses alternative methods:

```python
has_any_integration = (
    await resolver.check_has_integration(shop_id, Integration.GOOGLE_ANALYTICS_API) or
    await resolver.check_has_integration(shop_id, Integration.META_ADS_API) or
    await resolver.check_has_integration(shop_id, Integration.GOOGLE_SEARCH_API)
)

if not has_any_integration:
    logger.info(f"Shop {shop_id} has no MCP integrations, using database analysis only")
    insights = await analyze_from_database_only(anomaly)
```

### Scenario 3: Integration Exists But Credentials Invalid

MCP workbench creation fails:

```python
try:
    workbench = await manager.create_ga4_workbench(shop_id)
    await workbench.start()
except Exception as e:
    logger.error(f"Failed to start GA4 workbench: {e}")
    # Notify client to reconnect integration
    await send_integration_error_notification(shop_id, "Google Analytics")
    # Continue with other integrations
```

## Finding Shop IDs

### Via Django Shell

```python
from sources.models import Shop
from importers.models import Integration

# List all shops with GA4 integration
shops = Shop.objects.filter(
    integration__integration_type=Integration.GOOGLE_ANALYTICS_API,
    integration__active=True,
    integration__deleted=False
).distinct()

for shop in shops:
    print(f"Shop: {shop.name} (ID: {shop.id})")
```

### Via Database Query

```sql
SELECT s.id, s.name, i.integration_type, i.data->>'property_id' as property_id
FROM sources_shop s
JOIN importers_integration i ON i.shop_id = s.id
WHERE i.active = true 
  AND i.deleted = false
  AND i.integration_type = 201  -- GOOGLE_ANALYTICS_API
ORDER BY s.name;
```

## Testing Workflow

### 1. Test with Your Own Shop

```bash
# Use your testing shop
export TEST_SHOP_ID="cac9d883-015f-478e-a93f-32ef401582a3"
python main.py chat-ga4 --shop-id $TEST_SHOP_ID
```

Ask a test question:
```
> How many users yesterday?
```

Expected: Real data from your testing account.

### 2. Test with Client Shop

```bash
# Use a client's shop (with permission)
export CLIENT_SHOP_ID="abc-123-client-uuid"
python main.py chat-ga4 --shop-id $CLIENT_SHOP_ID
```

Ask the same question:
```
> How many users yesterday?
```

Expected: Real data from client's account.

### 3. Test with Non-Existent Shop

```bash
python main.py chat-ga4 --shop-id non-existent-uuid
```

Expected error:
```
No Google Analytics integration found for shop non-existent-uuid.
Please connect your Google Analytics account in the dashboard.
```

### 4. Test Graceful Degradation

```bash
# Shop with GA4 but no Meta Ads
python main.py chat-meta-ads --shop-id ga4-only-shop-uuid
```

Expected error:
```
No Meta Ads integration found for shop ga4-only-shop-uuid.
Please connect your Meta Ads account in the dashboard.
```

## Monitoring Integration Health

### Check Integration Status

```python
from importers.models import Integration
from django.utils import timezone
from datetime import timedelta

# Find integrations with old tokens (may need refresh)
old_integrations = Integration.objects.filter(
    integration_type__in=[
        Integration.GOOGLE_ANALYTICS_API,
        Integration.GOOGLE_ADS_API,
        Integration.META_ADS_API,
        Integration.GOOGLE_SEARCH_API
    ],
    active=True,
    deleted=False,
    updated__lt=timezone.now() - timedelta(days=30)
)

for integration in old_integrations:
    print(f"Shop {integration.shop_id}: Last updated {integration.updated}")
```

### Verify Token Refresh

```python
# Check that token refresh task is running
from importers.tasks.integrations import integrations_refresh_tokens

# Manually trigger refresh
integrations_refresh_tokens.delay()
```

### Monitor Failed API Calls

```python
# Check logs for authentication errors
import logging

logger = logging.getLogger('berryboo_ai.services.mcp_credential_manager')

# Look for:
# - "Failed to resolve ... credentials"
# - "Failed to start ... workbench"
# - "Error starting ... MCP server"
```

## Client Communication

### When Client Needs to Connect Integration

**Email Template:**
```
Subject: Connect [Service] to Enable AI Insights

Hi [Client Name],

To enable AI-powered insights for [Service], please connect your account:

1. Log into your Beryboo dashboard
2. Go to Integrations → [Service]
3. Click "Connect [Service]"
4. Authorize access

This will allow our AI system to:
- Analyze your [Service] data
- Generate personalized recommendations
- Detect anomalies and opportunities

The connection is secure and uses read-only access.

Best regards,
Beryboo Team
```

### When Credentials Need Refresh

**Email Template:**
```
Subject: Reconnect [Service] Integration

Hi [Client Name],

Your [Service] integration needs to be reconnected to continue receiving AI insights.

This happens occasionally for security reasons (token expiration).

Please visit: https://beryboo.pl/dashboard/integrations
And reconnect your [Service] account.

Best regards,
Beryboo Team
```

## Troubleshooting

### Problem: "No integration found"

**Cause:** Shop hasn't connected this service in dashboard.

**Solution:**
1. Verify shop_id is correct
2. Check if integration exists in database:
   ```python
   Integration.objects.filter(shop_id=shop_id, integration_type=X)
   ```
3. If not, ask client to connect integration
4. If exists but inactive, check `active` and `deleted` fields

### Problem: "Failed to start MCP server"

**Cause:** Credentials invalid or expired.

**Solution:**
1. Check token expiration in `Integration.data`
2. Run token refresh task manually:
   ```python
   from importers.tasks.integrations import integrations_refresh_tokens
   integrations_refresh_tokens.delay()
   ```
3. If still fails, ask client to reconnect integration

### Problem: "Permission denied" on API calls

**Cause:** Insufficient OAuth scopes granted.

**Solution:**
1. Check `granted_scopes` in `Integration.data`
2. Required scopes:
   - GA4: `analytics.readonly`
   - Google Ads: `adwords`
   - GSC: `webmasters.readonly`
   - Meta Ads: `ads_read`
3. If missing, client needs to reconnect with correct scopes

### Problem: Temporary credentials not cleaned up

**Cause:** Agent crashed before cleanup or cleanup failed.

**Solution:**
1. Manually remove orphaned files:
   ```bash
   rm /tmp/beryboo_ai_credentials/*
   ```
2. Or use cleanup script (if created):
   ```bash
   bash backend/src/ai/scripts/cleanup_temp_credentials.sh
   ```

### Problem: Wrong data returned (client A sees client B's data)

**Cause:** CRITICAL SECURITY ISSUE - credential cross-contamination.

**Solution:**
1. IMMEDIATELY stop all AI processing
2. Check temp file naming:
   ```
   /tmp/beryboo_ai_credentials/{shop_id}_ga4.json
   ```
3. Verify agent initialization:
   ```python
   agent = GA4Agent(shop_id="specific-shop-id")
   ```
4. Review logs for credential resolution errors

## Best Practices

### Development
- Use `DEFAULT_SHOP_ID` for quick testing
- Test with at least 2 different shops to verify isolation
- Always provide `--shop-id` when testing specific clients

### Staging
- Test with production-like data (anonymized if needed)
- Verify token refresh works automatically
- Test graceful degradation scenarios

### Production
- Monitor integration health daily
- Set up alerts for failed credential resolutions
- Implement automatic client notifications for expired tokens
- Regularly clean up orphaned temp credential files

### Security
- Never log full OAuth tokens (log only first/last 4 chars)
- Always clean up temp credential files
- Verify file permissions on temp files (600)
- Regularly audit Integration model access logs

## Advanced: Programmatic Integration Management

### Check Which Shops Need Integration Setup

```python
from sources.models import Shop
from importers.models import Integration

# Shops without GA4 integration
shops_without_ga4 = Shop.objects.exclude(
    integration__integration_type=Integration.GOOGLE_ANALYTICS_API,
    integration__active=True,
    integration__deleted=False
)

print(f"{shops_without_ga4.count()} shops need GA4 integration")
```

### Bulk Token Refresh

```python
from importers.tasks.integrations import integrations_refresh_tokens

# Refresh all integrations
result = integrations_refresh_tokens.delay()
print(f"Task ID: {result.task_id}")
```

### Generate Integration Status Report

```python
from importers.models import Integration
from django.db.models import Count

# Count integrations by type
report = Integration.objects.filter(
    active=True, 
    deleted=False
).values('integration_type').annotate(
    count=Count('id')
).order_by('-count')

for item in report:
    type_name = Integration.INTEGRATION_TYPES[item['integration_type']]
    print(f"{type_name}: {item['count']} shops")
```

## Next Steps

1. **Read**: [oauth_integration_guide.md](./oauth_integration_guide.md) for technical details
2. **Read**: [oauth_security.md](./oauth_security.md) for security best practices
3. **Test**: Run `python main.py chat-ga4 --shop-id <your-test-shop-id>`
4. **Deploy**: Update production environment with OAuth configuration
5. **Monitor**: Set up alerts for integration failures




