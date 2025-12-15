---
title: "GCP Networking Concepts and Best Practices"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "November 21, 2020", "cloud-networking", "Previous\u00a0post GCP Networking Concepts and Best Practices", "Next\u00a0post LAB1 \u2013 Google Cloud and Aviatrix Testing/POC LAB Guide"]
tags: []
original_url: https://netjoints.com/aviatrixs-check-point-cloudguard-related-features/
---

There are many features Aviatrix has developed for our Firewall partners to help achieve compliance, lower TCO, and enhanced application security needs. 

The following table is a list of some of the important features for Check Point CloudGuard deployment. There are some very specific ones for Check Point, and then there are some features applicable to other firewall vendors as well.

Feature| Business Outcome / Use-Case| Applicable Cloud/Transit  
---|---|---  
Support existing or private offer security gateway (BYOL). Some customer comes with the private offer and deploys the security gateway themselves or their own automation process. For such customers, Aviatrix allows ingesting the existing security gateways.| Cost optimization, compliance, and audit| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
CloudGuard Metered Option| Time-to-market, CI/CD integration| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Policy-Based Service Insertion, Threat Prevention, and Deep Packet Inspection| Single click and intent based automatic policy creation to provide compliance| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Active/Active Centralized Deployment| Increased availability, cost-optimization, simplified operations and enhanced visibility| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Scale-out and scale-up Security Gateway deployment support | Cost optimization, enhanced security posture, reduces risk| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Egress Traffic inspection support| Cost optimization and enhanced application security posture| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Ingress Traffic inspection support. Various deployment models to protect ingress traffic while also preserving the source IP| Enhanced visibility and security| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Fail-open or Fail-close operations| Business continuity and quick problem resolution| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Diagnostic capabilities. Help find the common causes quickly. Shows Sec.GW/firewall status, spoke attachments, management access etc.| Enhanced visibility and reduced MTTR. | AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
ICMP Health Check on LAN interface. Detect failure in less than 5 seconds and rebalance/rehash the traffic towards active firewall/sec.gw| Improved security posture and DDoS prevention| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
TCP Health Check  
Using the Azure native LB to load balance for CloudGuard and also for health check via TCP probes| Increase availability and security compliance needs| AVX-TR-AZU  
Native-AZU  
Check Point CloudGuard Geo Cluster support for East-West traffic| Increased application availability in case of failure| AVX-TR-AWS  
AVX-TR-AZU  
AWS-TGW  
Azure-Native  
Support for newer Check Point versions| Enhances security and business agility| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
Support security domains and connection policies with encrypted tunnels and connectivity| Enhanced application security posture and protection| AVX-TR-AWS  
AVX-TR-AZU  
Azure-Native  
CheckPoint Vendor Integration with AWS and Azure to propagate and install RFC1918 and BGP routes| Reduces risk and increase time to market with always-on automation| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
Exclude list of CIDR/IP from being inspected by FireNet. Customer can create a policy to exclude Check Point Security Manager, Controller, and GW IP addresses| Reduces unnecessary burden on security infrastructure that in turn could help with cost-optimization| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
Egress and E-W Filtering by different firewall clusters (Dual FireNet). Take the guesswork out from the design. Traffic segregation across different sets of CloudGuard security gateway| Meets compliance and audit requirements to segregate traffic. Reduces the attack surface. Enhanced visibiliy.| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
Intra Security Domain Firewall Inspection. Inspection within the VPC.| Enhanced application security| AWS-TGW  
API and Terraform support for CloudGuards. Consistent automation and a single entry point for IaC.| Time-to-market, agility, and automated compliance| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
Azure Transit FireNet support Insane Mode. Increase the throughput in Azure| Cost optimization| AVX-TR-AZU  
CheckPoint Bootstrap for automated deployment| Increased compliance and reduced risk| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
2-tuple and 5-tuple hashing choices.   
The 2-tuple use case is to support an application where multiple TCP sessions are used for an egress Internet service therefore requiring all sessions to go through one firewall with the same source NAT IP address. | Compliance and audit| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
Single Click ClougGuard Enable/Disable inspection. | Reduces MTTR, enhances operations, and support| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Azure-Native  
Route Synchronization  
New route received from on-prem via BGP will be programmed automatically in the VPC/VNET and also in the Security Gateway / Firewall| Business continuity and improved application protection| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Native-AZU  
Private Communication from On-Prem for Sec.GW management access| Improves compliance. Reduces the attack surface. Improves TCO| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Native-AZU  
Check Point CloudGuard SIC Key  
Secure Internal Communication Activation Key provides easy of deployment| Improves security and automation capabilities| AVX-TR-AWS  
AVX-TR-AZU  
TGW-AWS  
Native-AZU  
  
### Legends

  * AVX-TR-AWS: All encrypted Aviatrix Transit FireNet deployment in 
  * AVX-TR-AZU: All encrypted Aviatrix Transit FireNet deployment in Azure
  * TGW-AWS: non-encrypted AWS Transit Gateway FireNet deployment 
  * Native-AZU: non-encrypted Azure Native Peering FireNet deployment


