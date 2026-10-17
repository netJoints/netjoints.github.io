---
title: "AWS NAT Gateway"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS NAT Gateway", "Next\u00a0post AWS CloudWAN"]
tags: []
original_url: https://netjoints.com/aws-transit-gateway-tgw/
---
## What it is

**AWS Transit Gateway (TGW)** is a **regional virtual router** that connects many VPCs and on-premises networks through a hub-and-spoke model. It supports **transitive routing**, which VPC peering does not.

## Attachment types

* **VPC attachment** (uses a subnet in each AZ you want to use)
* **VPN attachment** (Site-to-Site VPN)
* **Direct Connect gateway attachment**
* **Peering attachment** to another Transit Gateway in a different Region or account
* **Connect attachment** (GRE and BGP) for SD-WAN and appliance integration

## Routing

* Each attachment is **associated** with one **TGW route table** (which decides where its traffic goes) and **propagates** its routes into one or more route tables.
* Multiple route tables enable **segmentation**, for example separate prod, dev and shared-services domains, or a dedicated inspection path.
* **Static routes** and **blackhole routes** give you explicit control.

## Common designs

* **Flat**: all attachments in one route table. Simple, no isolation.
* **Segmented**: separate route tables per environment, with a shared-services route table visible to all.
* **Centralized inspection or egress**: an **inspection VPC** with firewalls or a **Gateway Load Balancer**, using **appliance mode** to keep flows symmetric across AZs.
* **Inter-Region**: TGW peering with **static routes**. Peering does not propagate routes dynamically.

## Design considerations

* **Cost**: an hourly charge per attachment plus a **per-GB data processing charge**. Large east-west volumes become expensive, so measure before centralizing everything.
* **Bandwidth**: each VPC attachment supports burst traffic per AZ, and VPN tunnels have their own limits. **ECMP** across VPN tunnels increases aggregate VPN throughput.
* **Quotas**: attachments, route tables and routes have limits. Plan growth.
* **Resource sharing**: use **AWS Resource Access Manager** to share a TGW across accounts.

## Watch-outs

* No overlapping CIDRs across attached networks without NAT.
* Security groups can reference only same-VPC peers in many cases; plan network ACL and firewall rules accordingly.
* TGW is regional. Multi-Region designs need peering and careful route planning, and multicloud designs need another layer on top.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
