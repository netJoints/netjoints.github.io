---
title: "Aviatrix Value for Customers Only in AWS"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "May 8, 2023", "https://aws.amazon.com/transit-gateway/pricing/", "aws", "cloud-networking", "cost", "Previous\u00a0post Aviatrix Value for Customers Only in AWS", "Next\u00a0post Save AWS NAT Gateway Cost and Improve Security"]
tags: ["netJoints", "May 8, 2023", "https://aws.amazon.com/transit-gateway/pricing/", "aws", "cloud-networking", "cost", "Previous\u00a0post Aviatrix Value for Customers Only in AWS", "Next\u00a0post Save AWS NAT Gateway Cost and Improve Security"]
original_url: https://netjoints.com/aws-and-aviatrix-partner-to-reduce-aws-transit-gateway-data-processing-cost/
---

## What is AWS Transit Gateway (AWS-TGW)?

AWS Transit Gateway is a service that allows customers to connect their Amazon Virtual Private Clouds (VPCs) and on-premises networks through a single gateway. 

## AWS-TGW Complex Charging Structure

The real cost of AWS-TGW is a combination of many parameters and associated services. Understanding the “real” cost of AWS-TGW in an enterprise scenario could be complex. Unfortunately, no single parameter in the AWS bill can uncover the real cost of running AWS-TGW in an enterprise. One has to piecemeal it end-to-end.

This article attempts to decipher and give a **true** picture of AWS-TGW cost.

## How does AWS charge for AWS-TGW Service?

AWS Transit Gateway charges customers based on the amount of data the service processes. On the surface, the data processing cost for AWS Transit Gateway is based on the 

  * Amount of data flows through the AWS-TGW. This includes 
    * Data sent between VPCs
    * Data sent from on-premises hybrid networks
    * Data sent to and from other services such as 3rd Party Firewall VM/EC2
  * VPC Attachment



These charges are not consistent across the board and vary based on the region. It is complicated to predict. According to this AWS-TGW pricing <https://aws.amazon.com/transit-gateway/pricing/> following are the prices when writing this article.

Region| Price per AWS-TGW attachment per hour ($)| Price per GB of data processed ($)  
---|---|---  
South America   
(Sao Paulo)| 9 cents| 2 cents  
US-West   
(North California)| 6 cents| 2 cents  
US-West (Oregon)| 5 cents| 2 cents  
US-East   
(Ohio)| 5 cents| 2 cents  
Asia Pacific (Sydney)| 7 cents| 2 cents  
Europe (Frankfurt)| 6 cents| 2 cents  
  
## Real Cost of AWS-TGW Service

The data processing cost for AWS Transit Gateway is just one aspect of the overall cost of using the service. Enterprise customers will also incur costs for other associated service components, such as 

  * CloudWatch storage cost
  * The cost of analyzing the VPC flow logs
  * Data transfer costs for transferring data between VPCs and other services.
  * Troubleshooting and day two operations cost



## Cost Reduction Solution: Aviatrix Transit Gateway

Aviatrix and AWS partner together to reduce the AWS-TGW cost. Aviatrix cost is a simple, single-line item on the bill and includes all the necessary costs to run and operate Transit Gateway. The cost is also agnostic to the region or topology an enterprise would deploy. Some of the benefits include but are not limited to 

  * Multicloud transit
  * Troubleshooting is included
  * 24/7 support is included
  * Log analytics are part of it
  * Aviatrix does not charge for data processing
  * Aviatrix only charges for connection or attachment to Aviatrix Transit Gateway
  * Security is embedded in the pricing
  * Latency is improved as compared to AWS-TGW



The following section presents a real enterprise customer scenario that will help understand 

## Enterprise Customer Scenario

The following topology is of a customer who deployed the solution using AWS-TGW.

A similar toplogy was deployed using the Aviatrix Transit Gateway. 

## Observations and Results

Aviatrix Transit reduced the overall cost while enhancing the deployment with native security, embedded telemetry, built-in troubleshooting, enhanced traffic engineering, multicloud ready design with predictable cost-optimized model

The following table shares the benefits and results an enterprise would achieve by using the Aviatrix and AWS partner solution.

Results| AWS| AWS + Aviatrix  
---|---|---  
| |   
Reduce TGW Data Processing Cost to Zero| Requires 8 hops| Aviatrix does not charge for data processing cost.  
Reduce latency by half| Requires eight hops| Requires four hops  
| CloudWatch Storage Cost| No Storage Cost with Aviatrix CoPilot  
| Extra Cost for Flow Log Analytics| No Extra Cost for Flow Log Analytics – Embedded in the Aviatrix Transit Gateway  
Automation| Terraform for AWS| Single Terraform for AWS and other clouds  
Support| Separate charges| 24/7 premium support included  
Advance Traffic Engineering| Requires lot of manual route table programming| Built-in  
Multicloud ready| Not possible| Built-in  
Troubleshooting| Additional cost with additional services| Aviatrix CoPilot price is built in  
Storage| Extra charges| No extra charges  
Flow log| Extra charges| Requires a lot of manual route table programming  
Security| Bolt-on and requires extra charges for services such as GuardDuty, etc.| Threat Detection, Threat Prevention, anomaly detection, line rate encryption, etc. are part of the pricing model  
Centralized Control and Managemet| Not possible. Requires multiple UI| Centralized Control and Management
