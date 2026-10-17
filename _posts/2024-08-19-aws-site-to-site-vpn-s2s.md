---
title: "AWS Security Hub"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Security Hub", "Next\u00a0post AWS Client VPN"]
tags: []
original_url: https://netjoints.com/aws-site-to-site-vpn-s2s/#respond
---
## What it is

**AWS Site-to-Site VPN** connects an on-premises network, branch office or another cloud to AWS over **IPsec tunnels** across the internet (or over a Direct Connect connection).

## Components

* **Customer gateway**: the resource that represents your on-premises VPN device.
* **Target gateway**: a **virtual private gateway (VGW)** attached to one VPC, a **Transit Gateway**, or an **AWS Cloud WAN** core network.
* **VPN connection**: always provides **two tunnels** (to two AWS endpoints in different Availability Zones) for redundancy.

## Routing options

* **Dynamic routing with BGP** (recommended): routes are exchanged automatically and failover is quicker.
* **Static routing**: you maintain routes manually. Fine for small, simple sites.

## Key design choices

* **Transit Gateway** as the target allows **ECMP** across multiple VPN connections to scale aggregate bandwidth beyond a single tunnel's limit, and lets many VPCs share one VPN.
* **Accelerated Site-to-Site VPN** routes tunnel traffic through **AWS Global Accelerator** edge locations for a more stable path.
* **VPN over Direct Connect** uses a private IP VPN on top of a Direct Connect transit VIF, adding encryption to a private link.
* **Redundancy**: use **two customer devices and two VPN connections** for high availability, and watch for tunnel maintenance windows.

## Limits to remember

* A single tunnel has a **throughput limit** (on the order of 1.25 Gbps per tunnel). Scale with ECMP on a Transit Gateway, not on a virtual private gateway, which does not support ECMP.
* Latency and bandwidth vary with the **public internet** unless you use acceleration or Direct Connect.
* Make sure on-premises device settings match supported IKE, encryption and DH options.

## Watch-outs

* Overlapping CIDRs between sites and VPCs need NAT or redesign.
* Monitor tunnel state with **CloudWatch metrics** and alarms.
* For high, predictable throughput or low latency, evaluate **Direct Connect** instead of, or alongside, VPN.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
