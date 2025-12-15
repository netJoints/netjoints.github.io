---
title: "Why Enterprises Don’t Like a SaaS Based Multi-Cloud Networking and Security Solution?"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "March 17, 2020", "shahzad-public-s3.s3.amazonaws.com", "https://shahzad-public-s3.s3.amazonaws.com/S3_Bucket_Over_Private_VIF.txt", "multi-cloud", "Previous\u00a0post Why Enterprises Don\u2019t Like a SaaS Based Multi-Cloud Networking and Security Solution?", "Next\u00a0post Check Point CloudGuard IaaS in AWS with Quick Failover"]
tags: []
original_url: https://netjoints.com/secure-s3-bucket-access-over-direct-connect-private-vif/
---

## Problem Statement

  * The AWS recommended and native solution to access S3 buckets (via Direct Connect (DX) from on-prem location) is to use Public VIF
  * Accessing S3 bucket over DX Public VIF can pose serious security threats to enterprises
  * AWS advertises the entire S3 Public subnet range (one or all the regions) to on-prem which implies that …
    * All on-prem users can upload to any S3 bucket, including to their personal S3 buckets on their own personal accounts, leading to confidential data leakage
    * Potentially higher utilization of DX circuit (non-compliant data) that could choke the DX and may incur higher charges ($$$)



## Solution

The solution proposed here not only works for the traffic coming from on-prem location but also allows secure connectivity to S3 traffic coming from other AWS VPCs or other public clouds as well (Multi-Cloud scenario)

Following are the high level steps to implement this solution

  * Create a dedicated S3 VPC (as spoke)
  * Create S3 end-point in the S3 VPC
  * Deploy Aviatrix Global Transit and attach the S3 VPC (as spoke) to it
  * Deploy Aviatrix S3 Gateway in dedicated S3 VPC
  * Enable private S3 feature in Aviatrix Controller
    * The Controller automatically configures the AWS NLB and load balances multiple AVX S3 GW for high availability, redundancy and performance
  * Apply the security policy to allow S3 access from specific CIDRS
    * Controller enforce zero-trust S3 security policy
    * The CIDRs specified in the policy are allowed to access S3 (rest are blocked by default)
  * Create on-prem DNS private zone to point the S3 bucket FQDN to private IP



## Production Topology

Following is the enterprise topology to solve the this business challenge

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-8-840x1024.png)

### Traffic Flow

  * Business requirement is that on-prem corporate resources, such as laptop/desktop, can access the S3 Bucket in AWS
    * This access must be encrypted over DX link at line rate
    * The encryption should allow maximum utilization of 10G DX cuircuit
  * There is an optional Aviatrix CloudN hardware appliance in the topology 
    * CloudN HPE (High Performance Encryption appliance) provide end-to-end and line-rate encryption of all the traffic crossing over the AWS DX link
    * The traffic over DX link is not encrypted by default device that is why it is important to use CloudN appliance without compromising the throughput (Cloud Native IPSec encyrption is limited to 1.25 Gbps only)
  * S3 bucket traffic goes from on-prem DX link to Aviatrix Transit GW (AVX-TR-GW)
    * This is possible because the on-prem DNS server is configured to send S3 bucket traffic towards S3 VPC
  * The S3 VPC (AVX-SPK-GW) is attached to AVX-TR-GW as a spoke
  * S3 bucket traffic goes to AVX-S3-GW (AVX-SPK-GW)
  * AVX-S3-GW inspect the traffic and if the policy allows it, then it forwards the traffic to S3 end-point configured inside the S3 VPC



## Deployment Details

In this deployment

  * Aviatrix Transit and Spoke gateways are already deployed in their respective VPCs
  * Aviatrix Transit and Spoke peering is already configured
  * On-Prem to direct connect connectivity is already established



> Tip: You can test this solution even if you do not have a DX circuit. What you can do is to deploy another Aviatrix Transit GW in another Cloud or region. This second Transit could be treated as on-prem location. Now peer both Aviatrix Transit gateways together to establish connectivity. 

### 1 – Create AWS S3 Endpoint

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-7.png)S3 endpoint created in AWS

* * *

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-8.png)AWS S3 Endpoint details

### 2- Deploy Aviatrix S3 Gateway

Deploy two Aviatrix generic or standard gateway from the “Gateway” left navigation tab in the S3-Spoke-VPC.

![S3 Gateways](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-12-1024x393.png)Aviatrix GWs designated for s3 traffic

### 3- Configure S3 Bucket Access Parameter

Under Security –> Private S3 configure the S3 bucket access parameters. 

  * Select the gateway name first
  * The select the source CIDR
    * This creates access policy such that only CIDRs mentioned here are allowed to access certain S3 buckets
  * Now specify the bucket name. In my case I am using “shahzad-public-s3.s3.amazonaws.com as my bucket name
    * You can find this name by loggin into your AWS console

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-3.png)Aviatrix S3 private access parameters

You have to repeat the same steps for second S3 gateway (this second gateway is optional and for high availability). You can specify more than two gateway as well, depending on your load requirement

* * *

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-13-966x1024.png)aws console to find out s3 bucket name
    
    
    Tip: The S3 object URL is only visible after upload a file to S3 bucket

### 4- AWS ELB Created

In the background, an AWS ELB –> NLB is created and two S3 gateways are being load balanced. Following screens show the NLB configuration in AWS console done by Aviatrix Controller

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-15-1024x915.png)NLB Created by aviatrix controller

* * *

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-16-1024x594.png)The listener is listening on https:443 for s3 bucket

* * *

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-17-1024x716.png)NLB is load balancing between two s3 gateway

* * *

### Testing and Validation

Following screen is taken from the on-prem laptop. Notice that a ping to my S3 bucket is returning the private IP address of AWS NLB IP address. Which basically takes the request to one of the Aviatrix S3 gateways.

`C:\>ping shahzad-public-s3.s3.amazonaws.com  
Pinging shahzad-public-s3.s3.amazonaws.com [10.11.144.163] with 32 bytes of data:  
Request timed out.  
Request timed out.  
Request timed out.`

* * *
    
    
    Ping to show public s3 fqdn returns the private nlb ip address
    
    The "S3 Bucket FQDN Name Resolution IP: 10.11.144.163" is actually the IP address of the private interface of AWS NLB. This is the IP address that should be resolved to in your on-prem DNS for S3 bucket FQDN (i.e [shahzad-public-s3.s3.amazonaws.com](https://shahzad-public-s3.s3.amazonaws.com/S3_Bucket_Over_Private_VIF.txt)")

Now type the S3 Bucket FQDN in the browser on your on-prem laptop/desktop/server

<https://shahzad-public-s3.s3.amazonaws.com/S3_Bucket_Over_Private_VIF.txt>

Following screen shows that we can successfully access the S3 public FQDN using the private VIF

* * *

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-20.png)

### S3 Bucket FQDN Access Visibility

You can also check the stats of the FQDN access because in the background the S3 private access feature is using the Egress FQDN URL.

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-18-1024x457.png)s3 fqdn stats for entire deployment

* * *

![](../../media/images/secure-s3-bucket-access-over-direct-connect-privat_image-19-1024x552.png)s3 fqdn stats for one specific gateway

## Design Notes

  * Aviatrix Controller will automatically deploy the AWS-NLB per region
  * There is no limit to the number of Aviatrix-S3-GW you can deploy. These gateways are Active/Active and being load balanced by the AWS-NLB
  * Even if you deploy one S3-GW, you will notice an AWS-NLB deployed. This is default behavior and cannot be changed. Because for production, our recommendation is to deploy at least two S3-GWs in two different AZs within the same region
  * It is customer’s responsibility to pick the right size of S3-GW depending on the traffic needs
    * Aviatrix Controller does not create or manage auto-scaling group
    * Adding new gateway of different size is just a matter of one click in the Controller
  * Using the source CIDR security policy model, the rest of the access is zero-trust for S3 FQDN. 
    * Different on-prem teams could segment the traffic based on VLAN or Account they own in the AWS
  * Aviatrix strongly recommends to use additional S3 security provided by AWS
    * Remember it is a shared security model 


