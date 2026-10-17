---
title: "AWS Client VPN"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Client VPN", "Next\u00a0post AWS Local Zone"]
tags: []
original_url: https://netjoints.com/aws-verified-access/#respond
---
## What it is

**AWS Verified Access** is a zero trust access service. Users reach internal web (and, more recently, non-HTTP) applications **without a VPN** after Verified Access checks **who the user is** and **the state of their device** against policy for each request.

## How it works

1. A user requests an application through a Verified Access endpoint.
2. Verified Access evaluates the request against **trust providers**:
   * **User identity** provider: AWS IAM Identity Center or an **OIDC** provider.
   * **Device** provider: a device management product such as **Jamf, CrowdStrike or JumpCloud**.
3. A policy written in **Cedar** decides allow or deny. For example: allow if the user belongs to the finance group, **and** the device is managed and compliant.
4. If allowed, traffic is forwarded to the application in your VPC.

## Building blocks

* **Verified Access instance**: the top-level resource that holds trust providers.
* **Group**: a collection of endpoints that share a policy.
* **Endpoint**: represents one application, fronted by a **load balancer** or a **network interface**.
* **Trust providers** and **policies** (Cedar).
* **Access logs** in OCSF format to S3, CloudWatch Logs or Firehose.

## Why use it

* Removes broad network-level access that VPNs give. Users get **application-level, per-request** authorization.
* Central **policy** with **continuous evaluation** rather than a one-time login.
* Applications do not need to be exposed with public IPs.
* Integrates with **AWS WAF** for additional protection.

## Verified Access vs Client VPN

Client VPN gives a user a **network path**. Verified Access gives a user a **single authorized application path**. For most web-based corporate applications Verified Access reduces the blast radius of a compromised user.

## Watch-outs

* Billing is per application hour and per GB of data processed.
* Applications must be reachable behind a supported load balancer or ENI.
* Plan your identity and device trust integrations first. Policies are only as strong as the signals behind them.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
