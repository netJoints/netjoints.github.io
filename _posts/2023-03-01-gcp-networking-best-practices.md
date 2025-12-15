---
title: "GCP Shared VPC Concepts"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "February 18, 2020", "multi-cloud", "Previous\u00a0post GCP Shared VPC Concepts", "Next\u00a0post Why Enterprises Don\u2019t Like a SaaS Based Multi-Cloud Networking and Security Solution?"]
tags: []
original_url: https://netjoints.com/gcp-networking-best-practices/
---

## Delete Default VPC and Subnets

You should delete the deafult VPC and Subnets created by GCP automatically. Once you have the defult subnet and VPC deleted, following is how it looks like. In the screen shot below notice that all the default subnets are gone and you can only see the ones I created manually with “Mode = Custom”

![](../../media/images/gcp-networking-best-practices_image-22-1024x386.png)

The reason to delete the default is that most likely they could overlap either with on-prem deployment or other Clouds (such as AWS/Azure). As an architect you should maintain your own good IP address assignment hygiene. 

For example if you look at my Multi-Cloud Networking IP scheme you will notice there is a theme there. Pretty much same as we used to do in On-prem networking world. This help us troubleshoot and manage easily. 

![](../../media/images/gcp-networking-best-practices_image-21-1024x436.png)

The lab I have built is at a very small scale. You might want to adjust these ranges based on your future growth plans and strategy.

## Private Google Access

When you create a VPC, you should enable your subnets to access Google Services using the Private IP addressing as well. To access services like storage bucket or big-query services. 

![](../../media/images/gcp-networking-best-practices_Screen-Shot-2020-02-18-at-11.32.37-AM.png)
