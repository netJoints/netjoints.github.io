---
title: "AWS Network Firewall (ANFW)"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Network Firewall (ANFW)", "Next\u00a0post AWS Private Link"]
tags: []
original_url: https://netjoints.com/aws-vpc-lattice/#respond
---
## What it is

**Amazon VPC Lattice** operates at the **application layer** (layer 7, with TCP and gRPC support too). It lets you publish services and consume them from other VPCs and accounts using **service names**, with consistent **authentication, authorization and observability**, regardless of the underlying network layout.

## Building blocks

* **Service**: an application you publish, with **listeners** and **rules** (path or header routing).
* **Target groups**: where traffic ends up (EC2 instances, IP addresses, **Lambda**, **ALB**, **Kubernetes pods** through the AWS Gateway API Controller).
* **Service network**: a logical boundary you associate **VPCs** and **services** with. Anything in an associated VPC can reach services in the service network, subject to policy.
* **Auth policies**: IAM-style resource policies on a service or service network, using **SigV4** authentication to control who can call what.

## What problems it solves

* **No overlapping CIDR worries**: services are reached by name through Lattice, not by routing between VPCs.
* **Less plumbing**: no need for peering, Transit Gateway or PrivateLink just to let services talk.
* **Consistent security**: per-service identity-based access control and TLS, rather than network-level trust.
* **Built-in observability**: access logs and metrics for each service.
* **Traffic management**: weighted routing for blue/green and canary releases.

## Compared with neighboring services

| Service | Connects | Layer |
|---|---|---|
| VPC peering / Transit Gateway | Whole networks | 3 |
| PrivateLink | One service to consumer VPCs | 4 |
| VPC Lattice | Many services to many clients, with policy | 7 |

## Watch-outs

* Lattice covers **AWS-hosted service-to-service traffic**. It does not by itself reach on-premises or other clouds.
* Costs include hourly charges per service and per service network association, plus per-GB and per-request charges. Check current pricing.
* It complements, rather than replaces, network-layer connectivity for non-application traffic.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
