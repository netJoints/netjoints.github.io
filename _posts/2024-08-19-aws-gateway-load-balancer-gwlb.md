---
title: "AWS CloudWAN"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS CloudWAN", "Next\u00a0post AWS Network Firewall (ANFW)"]
tags: []
original_url: https://netjoints.com/aws-gateway-load-balancer-gwlb/
---
## What it is

The **AWS Gateway Load Balancer (GWLB)** is a layer 3 load balancer that sits transparently in the traffic path. It distributes traffic to a fleet of **virtual appliances** (next-generation firewalls, IPS, DPI tools) and scales that fleet up and down.

## How it works

* The GWLB lives in an **appliance VPC** (or security VPC). Appliances register as targets.
* Traffic is delivered to the appliances using **GENEVE encapsulation on UDP port 6081**, which preserves the original packet.
* Application VPCs consume the service through **Gateway Load Balancer endpoints (GWLBe)**, built on **AWS PrivateLink**. You then steer traffic to the GWLBe with **route table entries**.
* **Flow stickiness** keeps both directions of a flow on the same appliance, which stateful inspection needs.

## Common patterns

* **Centralized egress inspection**: private subnets route outbound traffic to a GWLBe, then to the firewall fleet, then to a NAT gateway and out.
* **Ingress inspection**: place a GWLBe between the internet gateway and the load balancer or public subnets using an **edge route table**.
* **East-west inspection** between VPCs, often together with a **Transit Gateway** in **appliance mode**.

## Design considerations

* Use **appliance mode** on Transit Gateway attachments so that return traffic stays in the same Availability Zone.
* Keep **cross-zone load balancing** and AZ placement in mind to avoid asymmetry and extra data transfer charges.
* Plan **health checks** and appliance bootstrap time, and use auto scaling.
* GWLB charges include an hourly rate and **Load Balancer Capacity Units (LCUs)**; the endpoints also have hourly and data processing charges.

## Watch-outs

* Routing mistakes are the most common failure. Draw the packet path in both directions.
* Centralized inspection concentrates risk and cost. Size appliances for peak throughput and review per-GB charges.
* Throughput is bounded by appliance licensing and instance sizes, not by the GWLB itself.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
