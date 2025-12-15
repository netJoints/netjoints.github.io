---
title: "GCP Shared VPC Transit Design and Deploy For Enterprises"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 8, 2020", "https://docs.aviatrix.com/HowTos/privateS3_workflow.html#additional-configuration-create-on-prem-dns-private-zone", "*", "cloud-networking", "Previous\u00a0post GCP Shared VPC Transit Design and Deploy For Enterprises", "Next\u00a0post Deploying BlockChain Quorum on AWS EC2 Instance"]
tags: []
original_url: https://netjoints.com/dns-conditional-forwarding-from-on-prem-to-cloud/#respond
---

In some situation it might be desired to send a subset of DNS traffic from on-prem to cloud. One example is sending the S3 bucket traffic from on-prem to Cloud if one has deployed Direct Connect circuit without needing to use public VIF. The most important aspect is that your orginization should not become the autorative DNS else you could draw the INTERNET traffic towards your DNS server.

Following are some techniques

## Create on-prem DNS Private Zone

Create a private zone on your on-prem DNS server so that all S3 bucket names resolve to the PrivateS3 private IP address. Note this IP address must be reachable from on-prem either by Direct Connect or VPN over Internet.

Note depending on how application invokes S3 function, for example, by using “wget”, “curl”, “aws s3”, or “aws2 s3”, the generated FQDN name for the S3 object access may be different. There are 3 formats.

  1. bucket-name.s3.region.amazonaws.com
  2. bucket-name.s3-region.amazonaws.com
  3. bucket-name.s3.amazonaws.com (apply to us-east-1 region)



You may need to create a private zone for each region and domain name format. For example, create a zone with domain name s3.us-west-2.amazonaws.com, another zone with domain name s3-us-west-2.amazonaws.com.

<https://docs.aviatrix.com/HowTos/privateS3_workflow.html#additional-configuration-create-on-prem-dns-private-zone>

CON: Concern is that now you will be creating a private zone for anything other than your company DNS name.

## DNS Conditional Forwarder

Use DNS wildcard for record. For example, use [*](https://docs.aviatrix.com/HowTos/privateS3_workflow.html#id1).s3.us-west-2.amazonaws.com that resolves to an A record that is the private IP address of the PrivateS3 internal NLB.

CON: This is a very broad “catcher”. With * as wildcard you forward [*](https://docs.aviatrix.com/HowTos/privateS3_workflow.html#id1).s3.us-west-2.amazonaws.com to NLB, then ALL of s3 buckets for us-west2 will come to NLB. Yeah, you wont be AUTHORITATIVE, but it is lot of unnecessary traffic. 
