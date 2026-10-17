---
title: "AWS Local Zone"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Local Zone", "Next\u00a0post AWS Global Accelerator"]
tags: []
original_url: https://netjoints.com/aws-guard-duty/
---
## What it is

**Amazon GuardDuty** continuously analyzes data sources in your AWS environment and produces **findings** about potential threats: compromised credentials, crypto mining, command-and-control traffic, unusual API calls, data exfiltration and more. You enable it and it starts working; there are no agents to deploy for the core data sources.

## Data sources

* **CloudTrail management events** (and optionally data events)
* **VPC Flow Logs** and **DNS query logs**
* Optional protection plans such as **S3 Protection, EKS audit log and runtime monitoring, Lambda network activity, Malware Protection for EC2 and S3, and RDS login activity**

GuardDuty reads these streams independently, so you do not need to turn on the logs yourself for it to work.

## How it detects

It combines **threat intelligence feeds**, **anomaly detection**, and **machine learning** to rank findings by **severity**. Each finding names the resource, the actor, and the evidence, such as `UnauthorizedAccess:EC2/SSHBruteForce` or `CryptoCurrency:EC2/BitcoinTool.B`.

## Operating it at scale

* Use **AWS Organizations** to enable GuardDuty across all accounts and Regions with a **delegated administrator** account.
* Send findings to **Amazon EventBridge** to trigger notifications or automated response (Lambda, Systems Manager, ticketing).
* Forward findings to **AWS Security Hub** for aggregation with other security signals.
* Use **suppression rules** and **trusted/threat IP lists** to cut noise.

## Watch-outs

* GuardDuty is **detective, not preventive**. It tells you something looks wrong; it does not block traffic.
* It is **per Region**, so enable it everywhere you could be attacked, not only where you run workloads.
* Costs scale with the volume of events and the optional plans you enable. Use the free trial and cost estimates to size it.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
