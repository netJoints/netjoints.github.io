---
title: "AWS Site to Site VPN (S2S)"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Site to Site VPN (S2S)", "Next\u00a0post AWS Verified Access"]
tags: []
original_url: https://netjoints.com/aws-client-vpn/#respond
---
## What it is

**AWS Client VPN** is a managed, client-based **OpenVPN** service. Remote users connect from their laptops to AWS (and, through AWS, to on-premises networks) without you running VPN servers.

## How it works

* You create a **Client VPN endpoint** and **associate** it with one or more **subnets** (one per Availability Zone for resilience).
* Users connect with an **OpenVPN-based client** and receive an IP from the **client CIDR** you define.
* Access is controlled with **authorization rules** (which destination CIDRs a user or group may reach) and **route table entries**.
* Client traffic is **source-NATed** to the endpoint's ENI address inside the VPC, so security groups can reference the endpoint's security group.

## Authentication options

* **Mutual certificate** authentication
* **Active Directory** (AWS Managed Microsoft AD or AD Connector)
* **SAML 2.0 federated** authentication (for example Okta, Entra ID), optionally with MFA through the identity provider

## Design considerations

* **Split tunnel or full tunnel.** Full tunnel sends all user traffic through AWS (more control, more cost and load). Split tunnel sends only the routes you push.
* **Reaching other networks.** To reach other VPCs or on-premises, pair the endpoint's VPC with a Transit Gateway, peering or VPN, and add the routes and authorization rules.
* **Logging.** Enable **connection logging** to CloudWatch Logs for audit.
* **Scale and cost.** Billing has an hourly charge per subnet association and per active client connection. Check the endpoint and per-account quotas.

## Watch-outs

* Overlapping client CIDR and VPC CIDR ranges cause routing problems.
* Authorization rules are **deny by default**, so remember to add them for every destination.
* A VPN gives network-level access. For application-level, per-request access decisions, look at **AWS Verified Access** or a zero trust network access product.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
