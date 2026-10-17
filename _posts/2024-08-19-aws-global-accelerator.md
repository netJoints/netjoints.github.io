---
title: "AWS Guard Duty"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Guard Duty", "Next\u00a0post AWS Landing Zone"]
tags: []
original_url: https://netjoints.com/aws-global-accelerator/#respond
---
## What it is

**AWS Global Accelerator** is a networking service that improves the availability and performance of internet-facing applications. It provides two **static anycast IP addresses** that act as a fixed entry point to your application, regardless of where the endpoints are.

## How it works

1. Users connect to the nearest **AWS edge location** through the anycast IPs.
2. From there, traffic travels over the **AWS global backbone** instead of the public internet for most of the path.
3. Global Accelerator sends the traffic to the **best healthy endpoint** using health checks and routing policy.

## Building blocks

* **Accelerator**: the resource with the two static IPs and a DNS name.
* **Listener**: TCP or UDP ports (or port ranges) it accepts.
* **Endpoint group**: one per Region, with a **traffic dial** to shift traffic between Regions.
* **Endpoints**: Application Load Balancers, Network Load Balancers, EC2 instances or Elastic IPs.
* A **custom routing** variation maps users to specific EC2 instances and ports, useful for gaming or VoIP sessions.

## Typical uses

* **Multi-Region failover** without waiting for DNS TTLs to expire, because the IPs never change.
* **Static IPs** that customers can allow-list in their firewalls.
* **Lower latency and jitter** for global users, and for non-HTTP traffic (TCP and UDP).
* **Blue/green and canary shifts** using traffic dials.

## Global Accelerator vs CloudFront

CloudFront **caches content** and is best for HTTP(S) delivery. Global Accelerator **does not cache**; it accelerates and fails over arbitrary TCP and UDP traffic and gives static IPs. They are often used together.

## Watch-outs

* Billing has a fixed hourly charge per accelerator plus a data transfer premium (**DT-Premium**) by direction and Region pair.
* Client IP preservation depends on the endpoint type and configuration.
* It is an **entry-point** service. It does not connect your VPCs to each other.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
