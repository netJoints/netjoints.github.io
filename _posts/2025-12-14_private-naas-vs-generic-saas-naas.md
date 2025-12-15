---
title: "Cloud Leaders and Executive"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "February 2, 2023", "Blackbox NaaS vs. Aviatrix Enterprise NaaS (Shahzad)", "Use-Cases / Business Critical Application (Shahzad)", "Greenfield Scenario", "Enterprise NaaS using Aviatrix MCNS (Multicloud Network Software) Platform", "highly available", "Aviatrix", "NGFW", "cloud-networking", "Previous\u00a0post Cloud Leaders and Executive", "Next\u00a0post What is Network ML?"]
tags: []
original_url: https://netjoints.com/private-naas-vs-generic-saas-naas/
---

## Blackbox NaaS vs. Aviatrix Enterprise NaaS (Shahzad)

Some vendors provide a NaaS service that forces enterprise business-critical traffic and data to be transported to their servers, devices, or instances first. Such a foreign NaaS could pose serious security, governance, and audit challenges for enterprises. Due it its limited visibility and control, this type of NaaS could be termed Blackbox NaaS.

The following table will help readers understand the difference between Aviatrix enterprise NaaS vs. Blackbox NaaS offering.

****| **Aviatrix Private Naa** S for Enterprises| **Generic BlackBox NaaS**  
---|---|---  
**Ownership**|  Enterprise owns the networking infrastructure| 3rd party owns the networking infrastructure  
**Visibilit** y| Full visibility| Limited visibility  
**Control**|  Full control| Limited control  
**Data Sovereignt** y| Dedicated infra| Shared infra  
**Data Compliance**|  All data stays within the enterprise network| All data must be shipped to 3rd party vendor servers/services  
**Security**|  Controller and governed by enterprise| Depends upon the 3rd party vendor  
**Competitive Edge**|  Unlimited catering enterprise requirement| On-size-fit-all model for tenants  
**Traffic Patterns**|  Stays within the enterprise private network| All data must be shipped to public NaaS for E/W, N/S, Ingress and Egress  
**Cost Control**|  Various design options for traffic engineering and cost control| Rigid design dictated by the vendor causes no room for cost-controlled design  
**Flexible Design options**|  Various design options based on enterprise applications and business needs| No design flexibility. Take it or leave it to approach  
  
With the rise of the public cloud, SaaS (Software as a Service) became a popular approach for software to be consumed by organizations over the public Internet. Some examples are Microsoft Teams, Google Meet, Gmail, and Microsoft Outlook applications delivered over the public internet and managed by the respective vendors.

# Use-Cases / Business Critical Application (Shahzad)

<IMO let’s remove this section since we will be covering all this in the private NaaS design section>

Use cases from a Business-critical application point of view.

  * Latency factors
  * High Throughput
  * Security / Compliance / Governance
  * Visibility / Troubleshooting
  * Edge / Retail Branches
  * Cost optimization/cost factor
  * Manageability



The ownership of the network is critical for business-critical apps. This is possible only when you have your own NaaS.

## Greenfield Scenario

Enterprises building NaaS should consider the following best practice design that not only provides the enterprise network backbone and connects applications VPC/VNET/Private-Endpoints/etc. but also extends the cloud operating model to on-prem branches/sites and data centers.

This best practice design should also enhance the design we discussed in the previous section. This previous design should gradually evolve to the design discussed in this scenario to take the full benefit of cost, visibility, performance, and control.

# Enterprise NaaS using Aviatrix MCNS (Multicloud Network Software) Platform

Gartner defines the MCNS category to guide enterprises building public cloud networks and connecting cloud networks to private and hybrid connections/sites. Aviatrix MCNS platform builds enterprise NaaS without compromising security, control, operational visibility, and ownership. Aviatrix MCNS follows the Multicloud network architecture (MCNA) design principles pioneered by Aviatrix. Readers will notice that the following MCNA architectural layers are common in all three designs we will discuss here.

  * **Network Backbone / Core Layer**  
The cloud backbone is the critical architecture component in any cloud network design. The network backbone becomes the core of the architecture. It is the foundation that must be designed carefully so that the rest of the architecture is highly available, high-performance, and resilient, providing visibility and control.



The network backbone is the first to be thought through for any cloud network design. Aviatrix builds enterprise cloud network backbone in both brownfields as well as green field scenarios.

  * **Application Layer**  
This layer mainly connects the applications deployed in VPC/VNET back to the network backbone. This connectivity is agnostic to the type of application being deployed in the VPC/VNET. Applications can be deployed using EC2/VMs/K8S/PaaS/SaaS/Private-Endpoint or even as SaaS.  
  

  * **Edge / Access Layer  
** This layer connects hybrid connections (DC, Branches, SD-WAN, etc.) to the backbone. Internet, MPLS, or other private circuits are commonly used to provide transport to this layer.  
  

  * **Operations Layer  
** This layer provides consistent control, operational visibility, observability, and day2 operations to the entire network design, including the backbone, application, and access/edge layer. Consistent management and automation are also part of this layer.  
  

  * **Security Layer**  
This layer covers overall security, governance, and audibility to the entire network design, including the backbone, application, and access/edge layer. It applies to traffic patterns such as E/W, N/S, Internet Ingress, Internet Egress, etc. It provides end-to-end encryption, service chaining, service insertion (for example, for NGFW), network segmentation, micro-segmentation, distributed firewalling, ML-based anomaly detection, threat prevention, etc. These security controls are directly embedded into the data-plane fabric.



The following diagram shows these architectural layers, as we discussed above.

![](../../media/images/private-naas-vs-generic-saas-naas_image-1024x531.png)
