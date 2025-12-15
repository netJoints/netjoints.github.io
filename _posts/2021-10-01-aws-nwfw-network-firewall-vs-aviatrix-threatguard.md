---
title: "GCP Secure Network Routing Designs"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 3, 2023", "cloud-networking", "Previous\u00a0post GCP Secure Network Routing Designs", "Next\u00a0post Cloud Leaders and Executive"]
tags: []
original_url: https://netjoints.com/aws-nwfw-network-firewall-vs-aviatrix-threatguard-solution/
---

AWS recently launched a new service called AWS Network Firewall (NWFW). The AWS NWFW will be positioned as L7 NGFW (Next-Generation Firewall) to compete with Palo Alto Network, Check Point, Fortinet, and other firewall vendor’s solutions. 

It is a new service and it will take some time to steal market share from other established Firewall vendors. It is attractive to some organizations because the underlying EC2 instance availability and scale are all managed by AWS. 

The customer should make informed decisions based on the business challenges you mentioned in this email. 

AWS NFW …

  * Is going to be another manual effort. 
    * So, they will move their pain point from NATGW to AWS NFW. 
    * The business pain will still be there. We know human errors are the leading cause of attacks and data exfiltration
  * is another black box 
    * they will not be able to get deep visibility, anomaly detection and pattern analysis 
  * is “AWS” only solution it is not Multi-Cloud 
  * GuardDuty is just Thread-Detection, no remediation
  * is not a cost optimized solution – it is expensive
  * is a point solution, no centralized control plane and governance model
  * Etc. 



On the flip side, our ThreatIQ/ThreatGuard is out of the box, always-on, part of the network fabric solution. It is not something bolted on. It is pervasive. It eliminates the business challenges faced by the majority of enterprises today in this space.
