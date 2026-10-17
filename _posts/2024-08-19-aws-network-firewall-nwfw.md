---
title: "AWS Gateway Load Balancer (GWLB)"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Gateway Load Balancer (GWLB)", "Next\u00a0post AWS VPC Lattice"]
tags: []
original_url: https://netjoints.com/aws-network-firewall-nwfw/#respond
---
## What it is

**AWS Network Firewall (ANFW)** is a managed service that provides **stateless and stateful traffic filtering**, **domain-based filtering**, and **intrusion prevention** for traffic entering and leaving a VPC. AWS handles scaling and availability.

## How it works

* You deploy **firewall endpoints** into dedicated **firewall subnets**, one per Availability Zone.
* You steer traffic through the endpoints with **route table changes**, for example from workload subnets to the endpoint, and from the internet gateway to the endpoint for ingress.
* A **firewall policy** contains **rule groups** and default actions. Rule groups come in three forms:
  * **Stateless**: evaluated packet by packet (5-tuple), fast, no state.
  * **Stateful, standard rules**: 5-tuple and **domain list** rules (allow or deny by FQDN for HTTP/TLS).
  * **Stateful, Suricata-compatible rules**: rich IPS signatures and custom patterns.
* **Managed rule groups** from AWS and partners provide threat signatures you do not have to maintain.
* **TLS inspection** is available for decrypting and inspecting encrypted traffic with your certificates.

## Common patterns

* **Distributed**: a firewall in each VPC.
* **Centralized**: an **inspection VPC** attached to a **Transit Gateway** for north-south and east-west traffic. Use **appliance mode** on the attachment.
* **Egress control**: allow only specific domains, which a NAT gateway on its own cannot do.

## Design considerations

* Understand **rule evaluation order** (stateless first, then stateful) and the default action.
* **Logging**: enable alert and flow logs to S3, CloudWatch Logs or Firehose.
* **Capacity**: rule groups have a capacity value that cannot be changed after creation, so plan it.
* **Cost**: hourly per endpoint plus per-GB processing. Centralizing reduces endpoint count but adds Transit Gateway data processing.

## Watch-outs

* Routing symmetry matters. Misrouted return traffic breaks stateful inspection.
* Firewall Manager can apply policies across accounts consistently.
* Compare against third-party firewalls behind a **Gateway Load Balancer** when you need advanced features or a consistent multicloud policy.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
