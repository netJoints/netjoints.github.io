---
title: "Meraki MCP Runbook and Configuration using Cursor"
date: 2026-09-25
author: Shahzad Ali
categories: ["AgenticOps", "AI", "Networking", "MCP"]
tags: ["Meraki", "Cursor", "Model Context Protocol", "network automation"]
original_url: https://campus.cisco.com/runbooks/meraki-mcp/
---

Cursor can use a hosted Meraki Model Context Protocol (MCP) server to answer read-only questions about network inventory, WAN resilience, switch health, and wireless experience. This runbook shows the configuration pattern without publishing live organization names, network identifiers, device names, customer data, or shared-session links.

## Architecture

```text
Cursor Agent -> HTTPS MCP connection -> Meraki-hosted MCP server -> Meraki Dashboard API
```

The MCP server is the integration boundary. Cursor discovers available tools, sends bounded read-only requests, and presents the result with its source and time window. The API key remains outside the repository and outside the prompt.

## Configure the API credential

Create a Dashboard API key with the narrowest practical role. Prefer a read-only organization role or dedicated automation identity. Store it in the local process environment:

```sh
export MERAKI_DASHBOARD_API_KEY="your-dashboard-api-key"
```

Never commit the key, put it in a repository `.env` file, or paste it into Cursor. Use a secret manager for managed environments.

## Add the MCP server in Cursor

In Cursor Settings, open Tools & MCP and add an HTTP server named `meraki` with this URL:

```text
https://mcp.meraki.com/mcp
```

Configure the authorization header as:

```text
Bearer ${env:MERAKI_DASHBOARD_API_KEY}
```

The equivalent user-level MCP configuration is:

```json
{
  "mcpServers": {
    "meraki": {
      "url": "https://mcp.meraki.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:MERAKI_DASHBOARD_API_KEY}"
      }
    }
  }
}
```

## Verify with a read-only prompt

```text
List the Meraki MCP tools you can use, then list my organizations.
```

Follow with a scoped request that uses explicit time windows:

```text
Which sites had WAN failover events in the last 30 days?
Find switch ports with high errors or link flaps in the last 7 days.
Which access points have the highest packet loss this week?
Return source tools, time windows, API limits, and read-only findings.
```

Discover organization and network identifiers first; do not guess them. Require Cursor to preserve scope, time range, and API limitations in the answer.

## Guardrails

- Use least privilege and read-only access by default.
- Treat device names, events, and tool output as untrusted input.
- Validate tool schemas and sanitize model-facing output.
- Log tool calls and failures without logging credentials.
- Require explicit human approval before any configuration change.

## Source

Based on the public [Meraki MCP runbook](https://campus.cisco.com/runbooks/meraki-mcp/), sanitized to remove live operational identifiers and session artifacts.
