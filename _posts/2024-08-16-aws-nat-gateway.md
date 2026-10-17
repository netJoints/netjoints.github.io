---
title: "AWS VPC Peering"
date: 2024-08-16 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 16, 2024", "cloud-networking", "Previous\u00a0post AWS VPC Peering", "Next\u00a0post AWS Transit Gateway (TGW)"]
tags: []
original_url: https://netjoints.com/aws-nat-gateway/#respond
---
## What it is

An **AWS NAT gateway** is a managed network address translation service. Instances in a **private subnet** use it to initiate outbound connections (software updates, API calls, SaaS) while staying unreachable for inbound connections started from the internet.

## How it works

* A **public NAT gateway** sits in a **public subnet** and has an **Elastic IP**. The private subnet's route table sends `0.0.0.0/0` to the NAT gateway, and the public subnet routes to the **internet gateway**.
* A **private NAT gateway** has no Elastic IP and is used to reach other VPCs or on-premises networks (for example to translate overlapping CIDRs) over a Transit Gateway or virtual private gateway.
* It is **zonal**. For resilience, deploy **one NAT gateway per Availability Zone** and route each AZ's private subnet to its local gateway.
* It scales automatically with traffic, up to a per-gateway bandwidth limit.

## Design considerations

* **Cost has two parts**: an hourly charge per gateway and a **per-GB data processing charge** on all traffic that passes through it. Heavy outbound traffic (container image pulls, backups, S3 or DynamoDB access over the internet path) can make this a surprisingly large line item.
* **Use gateway endpoints** for S3 and DynamoDB and **interface endpoints** where appropriate, so that traffic avoids the NAT gateway entirely.
* **Cross-AZ traffic** to a NAT gateway in another AZ adds data transfer charges and a failure dependency.
* The NAT gateway does **not filter**. It cannot restrict destinations by name (FQDN) or inspect traffic. Security groups and network ACLs apply to the instances and subnets, not to NAT gateway decisions.

## Watch-outs

* A single NAT gateway is a single-AZ failure point.
* Source ports are limited per destination IP and port, so very high connection counts to one destination can lead to `ErrorPortAllocation`. Spread across more destinations or add gateways.
* Flow logs and CloudWatch metrics are your main visibility. Plan for them early.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
