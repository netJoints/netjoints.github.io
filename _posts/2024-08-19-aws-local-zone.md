---
title: "AWS Verified Access"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Verified Access", "Next\u00a0post AWS Guard Duty"]
tags: []
original_url: https://netjoints.com/aws-local-zone/
---
## What it is

An **AWS Local Zone** is an extension of an AWS Region that places a limited set of AWS services **close to end users or on-site systems** in a metropolitan area. It is managed as part of its parent Region.

## Why use one

* **Latency-sensitive workloads**: real-time gaming, live video, media rendering, AR/VR, financial trading tools.
* **Data residency** needs where data must stay inside a specific geography.
* **Hybrid and migration scenarios** where applications must remain near on-premises systems.

## How it works

* You **opt in** to a Local Zone, then create a **subnet** in it inside your existing VPC.
* Resources launched in that subnet (EC2, EBS, ECS/EKS nodes, some RDS and load balancing options) run in the Local Zone. The VPC and its routing remain the parent Region's constructs.
* Connectivity back to the Region travels over a **private, high-bandwidth AWS connection**. Local Zones can also use **Direct Connect** for on-premises access.

## Design considerations

* **Service availability is limited and differs by zone.** Check which instance types and services each Local Zone supports before designing.
* **Internet egress and NAT**: some Local Zones support their own internet gateway and Elastic IPs, but others need traffic hairpinned back to the Region. Verify the options for your zone.
* **Data transfer** between the Local Zone and the Region is charged.
* **Resilience**: a Local Zone is a single location. For high availability, pair it with resources in the parent Region or another zone.

## Local Zones vs Wavelength vs Outposts

* **Local Zone**: AWS-managed infrastructure in a metro area.
* **Wavelength**: AWS infrastructure embedded in telecom provider 5G networks.
* **Outposts**: AWS infrastructure installed at **your** site.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
