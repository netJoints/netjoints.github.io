---
title: "AWS VPC Lattice"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS VPC Lattice", "Next\u00a0post AWS Security Hub"]
tags: []
original_url: https://netjoints.com/aws-private-link/
---
## What it is

**AWS PrivateLink** provides **private connectivity** between VPCs and services. A consumer reaches a service through a **private IP address inside its own VPC**, and traffic never goes over the public internet.

## Building blocks

* **Interface VPC endpoint**: an **ENI** with a private IP in your subnet. It is the consumer-side entry point to a service, and it is billed per hour and per GB.
* **Endpoint service**: the provider side, backed by a **Network Load Balancer** (or a **Gateway Load Balancer** for appliances).
* **Gateway endpoint**: a different, free construct for **S3 and DynamoDB** that works through route table entries rather than an ENI.
* **Private DNS**: lets you keep using the service's normal DNS name, which then resolves to the endpoint's private IPs.

## Why it is useful

* **Narrow exposure**: the consumer gets access to **one service**, not the whole provider network, and CIDR ranges **can overlap** because there is no routing between the networks.
* **Security**: endpoint **policies** and **security groups** restrict who can use the endpoint and what they can do.
* **Simpler for SaaS**: many AWS services and third-party SaaS providers offer PrivateLink so customers can consume them privately.
* **Scale**: it avoids building a mesh of peering connections just to share a single service.

## Design considerations

* Create endpoints in **each Availability Zone** you use, and keep traffic zonal where possible to avoid cross-AZ data charges.
* **Connect on-premises** through Direct Connect or VPN to reach the endpoint's private IPs, and take care with DNS resolution (Route 53 Resolver inbound endpoints).
* **Endpoint services** can require **acceptance** of each connection request, and you can allow-list principals.
* Cost: endpoints charge hourly per AZ plus data processing. For heavy S3 traffic, **gateway endpoints** are cheaper.

## Watch-outs

* PrivateLink is **one-way**: consumers start connections to the provider. It is not a general routed network.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
