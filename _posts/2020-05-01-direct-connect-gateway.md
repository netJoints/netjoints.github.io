---
title: "SAML Based User-VPN / Open-VPN in Public Cloud"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 13, 2019", "multi-cloud", "Previous\u00a0post SAML Based User-VPN / Open-VPN in Public Cloud", "Next\u00a0post Design and Feature Requirement for a User-VPN Solution"]
tags: []
original_url: https://netjoints.com/direct-connect-gateway/
---

Direct Connect Gateway is getting popularity. With large networks and deployment across regions, it is evident that customers are picking Direct Connect Gateway to provide high-availability across regions. One should remember that even with the Direct Connect GW in picture, data path still goes through the physical connection. It means that for regions that are far apart, one might notice some latency/delays. 

Managing and automating Direct Connect (DX) Gateway could be challenging. Aviatrix is the platform that can orchestrate a DX Gateway that is serving as a bridge between two Transit Gateways across regions provided there is no VGW in the datapath and the DX Gateway is attached to the TGWs via the default security domain (Security Domain is Aviatrix construct to provide network segmentation between VPCs/vNETs)

Aviatrix will orchestrating the Multi-Region architecture with DX Gateway and will handle all the route propagation. In addition, it will deliver the following additional capabilities to the network:  


  * Full HA Capabilities with no single point of failure in the network with High Performance Encryption between Regions @ 5Gbps
    * IPSec VPN could also be used as a Backup to the DX Gateway
  * Centralized Firewall Management 
  * Multi-Cloud Connectivity


