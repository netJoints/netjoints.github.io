---
title: "Meraki MCP Runbook and Configuration using Codex/ChatGPT"
date: 2026-09-25
author: Shahzad Ali
categories: ["AgenticOps", "AI", "Networking", "MCP"]
tags: ["Meraki", "Codex", "ChatGPT", "Model Context Protocol", "network automation"]
original_url: https://campus.cisco.com/runbooks/meraki-mcp/
---

OpenAI Codex or ChatGPT can use a Meraki-hosted Model Context Protocol (MCP) server to turn network-health questions into a documented, read-only investigation. This runbook focuses on the connection pattern and agent workflow; it intentionally omits live organization names, network identifiers, device names, customer data, and shared-session links.

## Architecture

```text
Operator prompt -> Codex/ChatGPT MCP client -> Meraki-hosted MCP server -> Dashboard API
                                      |
                                      +-> evidence, scope, time window, and interpretation
```

The model does not need pasted Dashboard JSON or direct access to a local credential file. The MCP server mediates tool calls, while the agent explains findings and preserves provenance.

## Secure configuration

Create a read-only Dashboard API key or dedicated automation identity, then keep it external to Git and chat:

```sh
export MERAKI_DASHBOARD_API_KEY="your-dashboard-api-key"
```

Configure the MCP connection using an environment-variable reference:

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

Never hard-code the key, commit a populated `.env` file, or include credentials in a prompt. For a managed deployment, use an approved secret manager and rotate the key according to policy.

## Agent workflow

Start with discovery and then constrain the investigation:

```text
Using the Meraki hosted MCP server, list my organizations and networks.
Which sites had WAN failovers in the last 30 days?
Find switch ports with high errors or flaps in the last 7 days.
Which access points have the worst packet loss this week?
Return only read-only findings with source tools, time windows, and API limits.
```

The agent should use returned identifiers rather than guessing, ask for one intended network or scope, and distinguish “no events returned” from “the endpoint did not provide enough data.” It should also preserve endpoint limitations—for example, a counter endpoint may support a shorter window than an events endpoint.

## AgenticOps value

A supervisor-style workflow can route inventory, WAN, switching, and wireless questions to specialized read-only tools, then combine the evidence into one operator-facing summary. This reduces dashboard switching and improves investigation consistency while leaving remediation, change approval, and escalation with a human operator.

## Guardrails

- Enforce least privilege, read-only tools, and explicit scope.
- Treat MCP output as untrusted input and defend against prompt injection.
- Include source, time range, API limits, and uncertainty in the answer.
- Log prompts and tool calls without secrets or sensitive payloads.
- Require explicit human approval before configuration-changing actions.

## Source

Based on the public [Meraki MCP runbook](https://campus.cisco.com/runbooks/meraki-mcp/), sanitized to remove live operational identifiers and session artifacts.
