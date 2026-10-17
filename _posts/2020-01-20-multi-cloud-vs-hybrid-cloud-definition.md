---
title: "Importance of Right Network Architecture vs Cost"
date: 2020-01-20 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "January 20, 2020", "multi-cloud", "Previous\u00a0post Importance of Right Network Architecture vs Cost", "Next\u00a0post AWS Direct Connect and Direct Connect Gateway Scale Limits"]
tags: []
original_url: https://netjoints.com/multi-cloud-vs-hybrid-cloud-definition/#respond
---
These terms get mixed up in almost every cloud conversation, so here is a working set of definitions.

## Hybrid cloud

**Hybrid cloud** connects an on-premises or private environment (data center, colo, edge) to **one or more public clouds** so that workloads and data can move or communicate between them. The defining feature is the **private/public boundary**.

## Multicloud

**Multicloud** means using **two or more public cloud providers**, for example AWS and Azure, or AWS, Azure and GCP. The defining feature is **more than one provider**. A company can be multicloud without having a single data center.

## Hybrid multicloud

Most large enterprises are **both**: on-premises plus several public clouds. That is hybrid multicloud, and it is the usual reality.

## What is not multicloud

* Several **regions** or **availability zones** of one provider is multi-region, not multicloud.
* Using a **SaaS** application (Salesforce, Workday) does not make you multicloud in the infrastructure sense.

## Why the difference matters for the network

| | Hybrid | Multicloud |
|---|---|---|
| Main connectivity problem | Data center to cloud (VPN, Direct Connect, ExpressRoute, Interconnect) | Cloud to cloud across different providers |
| Main design problem | Routing, DNS and security policy across the private/public boundary | Different constructs, limits and terminology in every cloud |
| Typical risk | Latency, throughput and egress cost to on-prem | Inconsistent security, visibility and operations per cloud |

Each cloud has its own virtual network model, route tables, firewall construct and quotas. Without a common approach, you end up operating three or four different networks instead of one. That is the reason to treat the network as an architecture of its own (core, access, security and operations) rather than as a collection of per-cloud settings.
