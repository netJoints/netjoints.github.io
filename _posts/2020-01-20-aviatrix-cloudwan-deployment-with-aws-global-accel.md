---
title: "What is Aviatrix CloudWAN?"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "December 5, 2019", "multi-cloud", "Previous\u00a0post What is Aviatrix CloudWAN?", "Next\u00a0post Azure Aviatrix Controller Deployment"]
tags: []
original_url: https://netjoints.com/aviatrix-cloudwan-deployment-with-aws-global-accelerator/
---

In this blog post I explained what Aviatrix CloudWAN solution is. Here let us actually deploy it and appreciate the simplicity of implementation.

Recently I worked with an enterprise (lets call is netJoints Inc., as I cannot share the actual name of my customer) and connected their branches (Cisco Routers) in various regions to Aviatrix Global Transit Network. 

I will show how to connect a branch in Singapore.

### Step1 – Register Cisco Router to Aviatrix Controller

![](http://107.23.205.221/wp-content/uploads/2019/12/image-2.png?w=315)

![](http://107.23.205.221/wp-content/uploads/2019/12/image-6.png?w=846)

![](http://107.23.205.221/wp-content/uploads/2019/12/image-7.png?w=1024)

### Step2 – Attach Cisco Router to Public Cloud Transit

In this step Aviatrix Controller will automatically builds IPSec tunnel to connect branch router in Singapore to Public Cloud Transit Network. This Transit network could be

1- Aviatrix Transit GW (AVX-TGW)  
2- AWS Transit GW (AWS-TGW)

> AVX-TGW is preferred option as it allows to build a true Global Transit across multiple-regions and multiple-clouds. AWS-TGW is limited to only single region and obviously is only available in AWS, hence is not recommended for enterprise multi-cloud customers. 

Prepare to attach:

![](http://107.23.205.221/wp-content/uploads/2019/12/image-8.png?w=706)

Attach to cloud now:

![](http://107.23.205.221/wp-content/uploads/2019/12/image-9.png?w=615)

Following diagram shows Singapore-Br1 attached to AVX-TGW

![](http://107.23.205.221/wp-content/uploads/2019/12/image-3.png?w=1024)

You can also get IPSec VPN tunnel details under Site2Cloud menu

![](http://107.23.205.221/wp-content/uploads/2019/12/image-4.png?w=1024)

Click on the tunnel to see the routes it learned via BGP

![](http://107.23.205.221/wp-content/uploads/2019/12/image-5.png?w=566)

## Cisco Router Configuration 

Following is what Aviatrix Controller has configured in the background 

IPSec Config

BGP Config

## AWS Global Accelerator Configuration

Following is what Aviatrix Controller configured in the AWS
