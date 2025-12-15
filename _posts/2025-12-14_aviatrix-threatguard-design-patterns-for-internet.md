---
title: "DIY Automation Increases Complexity and Cost of Running Cloud Network"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 3, 2023", "cloud-networking", "Previous\u00a0post DIY Automation Increases Complexity and Cost of Running Cloud Network", "Next\u00a0post Cloud Application Migration is Slowing Down the Digital Transformation"]
tags: []
original_url: https://netjoints.com/aviatrix-threatguard-design-patterns-for-internet-ingress-traffic/
---

Aviatrix ThreatIQ/ThreatGuard is enabled by default on all Aviatrix gateways. These gateways can front-end the Load Balancers to protect AWS/Azure/GCP/etc. infrastructure. They provide visibility and control as well as a repeatable ingress design.

## **Azure Design #1**

### **Design Notes**

  * There is no need to deploy AWS GuardDuty which is costly and not available in other clouds. Aviatrix has the only multi-cloud native solution.
  * We need to NAT to keep flow affinity because the Azure PLB/ILB don’t support NAT only AppGWY does and this customer uses SFTP as part of their app in addition to 80/443 which is not supported on AppGWY.
  * We need to NAT because Azure LB is not a reverse proxy (unlike AWS), it is a traffic multiplexer, it receives traffic on a certain public IP address (An Azure LB supports up to 600 public IP addresses) and port, and sends it to the specified backend and port, it does nothing with the TCP stream, hence client IP is preserved. If we don’t NAT then return traffic would skip Aviatrix NATGWs if we don’t apply UDRs.
  * We are using customized SNAT/DNAT with unique rules per gateway to maintain the symmetry hence, the sync HA option was unchecked.


