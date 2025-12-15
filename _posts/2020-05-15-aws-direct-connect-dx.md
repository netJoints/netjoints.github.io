---
title: "AWS Control Tower (Account Vending Machine)"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "AWS DX limits", "cloud-networking", "Previous\u00a0post AWS Control Tower (Account Vending Machine)", "Next\u00a0post Zero-Trust Framework for Cloud Workloads"]
tags: []
original_url: https://netjoints.com/aws-direct-connect-dx/#respond
---

AWS Direct Connect (DX) is a networking service that provides private network connections between customer facilities and AWS. It can reduce costs, increase bandwidth, and consistent performance, and provide an SLA for network connectivity that is not available over the Internet. 

Customers have a choice to procure dedicated or hosted DX connections. A dedicated connection is made through a 1 Gbps, 10 Gbps, or 100 Gbps Ethernet port dedicated to a single customer. Hosted connections are sourced from an AWS Direct Connect Partner that has a network link between themselves and AWS from which they carve bandwidth for their customers.

AWS has a concept of VIFs (Virtual Interfaces) that help customers use Direct Connect to connect to AWS public (S3) or private services (VPC, Transit Gateway). 

A virtual interface (VIF) is deployed on dedicated/hosted connections to access AWS services and is either public, private, or transit. 

  * A public VIF enables access to public services, such as Amazon S3. 
  * A private VIF enables access to customer VPC. 
  * A transit VIF enables connectivity to the AWS Transit Gateway. 



AWS also supports the SiteLink feature on AWS Private/Transit VIF, this feature aims to replace Global MPLS providers and compete with equivalent Azure/GCP services, by providing customer’s access to AWS Global backbone.

### DX Design Limitations

  * Customers struggle with [AWS DX limits](https://docs.aws.amazon.com/directconnect/latest/UserGuide/limits.html), with 100 inbound route limits and 50 Private VIF limits being the significant drivers for customers to make a change. 
    * Aviatrix overcomes these limits by deploying Aviatrix Transit and building an overlay to customer on-premises devices or Aviatrix Edge/CloudN. 
    * AWS positions AWS TGW to overcome these limitations. 
      * Customers build an overlay using BGPoGRE to on-premises routers to overcome route limits. 
      * Customers use transit VIF to overcome 50 private VIF limits, as a single Transit VIF allows connectivity to 1000’s of VPCs behind the AWS TGW. 
  * Customers like Aviatrix Transit and Aviatrix Edge/CloudN to achieve line-rate (up to 10G) end-to-end encryption to meet compliance/cyber requirements. 



AWS DX limits have been a primary customer concern, AWS TGW helps with overcoming some of these limits but it limits customer choice and also adds cost to AWS DX bound traffic.

AWS is being pushed by customers to provide more visibility into partial failures, such as failures between AWS DX and AWS Region.
