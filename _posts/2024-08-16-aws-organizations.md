---
title: "AWS Core Networking Services"
date: 2024-08-16 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 16, 2024", "cloud-networking", "Previous\u00a0post AWS Core Networking Services", "Next\u00a0post AWS NAT Gateway"]
tags: []
original_url: https://netjoints.com/aws-organizations/#respond
---
## What it is

**VPC peering** is a one-to-one private network connection between two VPCs. Traffic uses private IP addresses and stays on the AWS network. The VPCs can be in the **same account or different accounts**, and in the **same Region or different Regions**.

## How it works

1. One VPC owner sends a **peering request**, and the other accepts it.
2. Each side adds **routes** to the other VPC's CIDR in the relevant **route tables**.
3. Security groups and network ACLs must allow the traffic.

There is no gateway, no extra hop, and no bandwidth bottleneck of its own, so latency is low and throughput is limited only by the instances.

## Key properties

* **Non-transitive.** If A peers with B and B peers with C, A cannot reach C through B. You need a direct A-to-C peering.
* **No overlapping CIDRs.** Peered VPCs must have non-overlapping IPv4 (and IPv6) ranges.
* **No edge-to-edge routing.** A peer cannot use the other VPC's internet gateway, NAT gateway, VPN or Direct Connect connection.
* **No extra charge for the connection itself.** Data transfer between Availability Zones or Regions is billed.

## When to use it

Peering fits a small number of VPCs with simple, high-throughput connectivity, for example a shared-services VPC and a few workload VPCs.

## When not to

The number of connections grows as **n(n-1)/2** for a full mesh, and every connection needs routes on both sides. Past a handful of VPCs this becomes hard to manage and audit. A **Transit Gateway** or an **AWS Cloud WAN** core network, or a multicloud transit design if other clouds are involved, scales much better, adds central route control, and supports transitive routing and inspection points.

Also note the per-VPC limits on peering connections and route table entries.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
