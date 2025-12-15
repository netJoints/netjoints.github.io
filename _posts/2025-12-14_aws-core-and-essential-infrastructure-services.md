---
title: "AWS Networking Services Deep Dive"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 16, 2024", "NLB", "quotas/limits", "cloud-networking", "Previous\u00a0post AWS Networking Services Deep Dive", "Next\u00a0post AWS Core Networking Services"]
tags: []
original_url: https://netjoints.com/aws-core-and-essential-infrastructure-services/#respond
---

In this section, we discuss the essential AWS Services. We either require these services to operate, or they are one of the core services customers need to integrate with from AWS’s point of view.   
  
## AWS Fabric/Global Infrastructure

AWS Global infrastructure currently (as of September 2023) has 32 AWS regions,102 Availability Zones (AZs), and 550+ Points of Presence. AWS Regions have multiple AZs for high availability, scalability, and fault tolerance. AZs consist of one or more discrete data centers with redundant power, networking, and connectivity housed in separate facilities. AWS recommends building applications using swimlane architecture, where all components in a swimlane reside inside an AZ. The swimlane architecture improves performance and eliminates data transfer costs. For reference, Intra-AZ network connectivity offers sub msec latency compared to Inter-AZ, which measures 1-5 msec (depending on the AWS Region).

## AWS Global, Regional, and Zonal Services

AWS Services are categorized into Global, Regional, and Zonal Services. AWS Route 53 (DNS), IAM ( Identity and Access Management), and AWS Network Manager are some of the AWS Global Services. Most of the services are regional. However, most of these have a regional control plane with a zonal data plane. AWS TGW, AWS CloudWAN, AWS NAT GW, AWS Network Firewall ( ANFW), AWS GWLB, AWS NLB/ALB, AWS Private Link, etc., are examples.

## VPC

Amazon VPC is a logically isolated virtual network. It is a regional service. VPC’s are allocated IPv4 and optionally IPv6 address range (aka CIDR allocation). Customers are allowed to configure VPCs with identical IPv4 CIDRs._AWS does not have any service that provides any-to-any connectivity between VPCs configured with overlapping IPv4 CIDRs. VPC consists of VPC subnets. Each VPC subnet is mapped to an AZ and uses an IP address block within the VPC-allocated_ CIDR. VPC Route tables are used to define subnet routing behavior. Network Access lists (NACLs ) implement stateless firewall functionality and are associated with a Subnet. 

## ENI

All AWS Compute offerings, including EC2 Instances (virtual machines), have one or more vNICs (virtual Network interface cards), also known as ENIs ( Elastic Network Interfaces). ENIs reside in a VPC subnet and consume IP addresses from the defined VPC Subnet address range. 

The number of ENIs per EC2 Instance or IP Addresses per ENI varies with the instance type and is documented here. User-defined and Requester-managed are the two categories of ENIs. 

User-defined ENIs are created with user-defined compute, such as EC2. In contrast, a requester-managed network interface is an ENI (standard or hyperplane ENI) that an AWS service creates in your VPC on your behalf. 

The network interface is associated with a resource for another service, such as a DB instance from Amazon RDS, a NAT gateway, or an interface VPC endpoint from AWS PrivateLink. 

Some of these requester-managed ENIs are hyperplane ENIs. Examples of such ENIs include AWS TGW, Lambda function ( with VPC networking enabled), NAT GW, etc. Standard ENIs consume 1 Network Address (NAU) compared to hyperplane ENIs, which consume 6 NAUs. 

## Security Group

AWS Security Groups (SGs) implement stateful firewall functionality and are associated with an AWS ENI. Not all requested-initiated ENIs ( such as GWLB/NAT GW, etc) support Security Groups. [NLB](https://aws.amazon.com/blogs/containers/network-load-balancers-now-support-security-groups/) has recently started to support Security Groups. 

## IGW/VGW

Internet Gateway (IGW) and VGW ( Virtual Private Gateway) can be optionally attached to a VPC. Internet Gateway (IGW) allows communication between customer VPC and the internet, whereas VGW provides hybrid connectivity using AWS-managed VPN connections and AWS Direct Connect connections. 

## IAM Policies (SCP)

Many AWS enterprise customers implement strict IAM policies (also known as SCP/Service Control Policies) that deny the creation/attachment of IGW/VGW to an application VPC. This is to reduce the blast radius and avoid any direct communication to the assets inside the VPC from the outside world. Typically, customers establish and use pre-defined blueprints to deploy VPCs as part of the Account vending process. 

## VPC Sharing

VPC sharing allows multiple AWS accounts to create their application resources in shared, centrally managed virtual private clouds (VPCs). 

AWS uses Availability Zone Independence (AZI) to achieve static stability (proactive recovery) while building AWS Networking Services. While it helps improve the availability of Aviatrix deployment, AZI also delivers reduced network latency and minimizes AWS data transfer costs for our customers. 

VPC sharing reduces customer data transfer costs and provides an option to provide invisible infrastructure for App Teams.

Aviatrix platform uses Amazon VPC as its building blocks. Aviatrix platform supports the creation of VPCs with subnets/route tables. We give customers a different choice in using the Aviatrix platform to create Aviatrix Transit VPC and its components to fulfill the specific VPC Subnet/Route table/IGW structure required for Aviatrix Transit VPC. 

Like all other AWS services, AWS VPC and its components have well-defined [quotas/limits](https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html). 

## AWS Organization
