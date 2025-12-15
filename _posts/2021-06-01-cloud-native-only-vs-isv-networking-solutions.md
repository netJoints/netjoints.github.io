---
title: "Save AWS NAT Gateway Cost and Improve Security"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "June 1, 2023", "Aviatrix", "cloud-networking", "Previous\u00a0post Save AWS NAT Gateway Cost and Improve Security", "Next\u00a0post Enterprise Solutions Architect Role for Career Growth"]
tags: []
original_url: https://netjoints.com/cloud-native-only-vs-isv-networking-solutions/#respond
---

You must have heard that CSP native networking and security services provided by CSPs (Cloud Service Providers such as AWS, Azure, GCP, etc.) are enough. No need to purchase ISV (Independent Software Vendor) solution. Just script it out, use Cloud Formation or Terraform scripts, and you are good to go.   
  
It is a good argument for small companies but does not fly with the enterprise. I thought to enlighten readers here 😎 and provide some food for thought before deciding.

## 1- CSP Marketplace for ISVs

CSP created an ISV marketplace for a reason. They know and understand they cannot provide all the advanced features, knobs, and corner cases enterprises demand. ISV (such as [Aviatrix](http://aviatrix.com)) provides secure cloud networking by embracing the cloud native and extending or augmenting it with advanced networking and security features.  
  
Hint: Think about Snowflake vs. AWS Redis.

## 2- Costly Services 

CSP native-only services might be costly for enterprises. NAT service is a good example where CSP charges per hour and then per GB for data processing. Pick an ISV (such as Aviatrix) that does not charge for data processing. Enterprises can save millions. Plus, you get better visibility and security.

## 3- Limited Visibility

The visibility is limited. CSP’s hands are tight. They work on the economy of scale. They cannot provide you with all the visibility an enterprise demands. Underneath is a shared infrastructure they are running, supporting thousands of customers. Pick an ISV (Aviatrix) that provides dedicated networking and security infrastructure, not shared by another organization.

## 4- Orchestration Tools are NOT for Enterprises

Some customers think they would use DIM (Do It Myself) or orchestration-only ISV tools (not Aviatrix) to automate the native networking services and call their product a cloud networking product. This will work for small companies with 5 or 10 VPC/VNETs, but enterprises are a different beast.  
  
Enterprises want value-added services. Enterprises want innovative solutions. Enterprises demand differentiated solutions. They mandate a competitive advantage and a faster time to market. An innovative and nimble ISV (such as Aviatrix) can provide value-added features at a greater velocity and across multiple clouds.  
  
So I am sorry, but if you are orchestrating only ISV, your product is not for enterprises for the reasons I eluded earlier. Every cloud support terraforms or a scripting language. Why would they need you? Organizations have developers, scripters, and programmers. They can script themselves.

## 5- CSP Limitations

CSP native networking has limitations regarding security, routing, encryption, hybrid connectivity, operational capabilities, etc.

For example, there is no centralized control plane in one CSP. It is all regional-based with discrete services. One has to stitch it all together. So it means there is not a centralized operational single pane of glass.

## Conclusion: 

You must pick an ISV (Hint: Aviatrix) that embraces cloud-native. Use it based on the business needs and intent, then extend its capabilities or limitations using innovative technologies such as a centralized policy-based model. A policy-based model takes your intent, and then programs either native networking constructs or ISV technology, or a combination of both to resolve the business pain points.  
  
Don’t box yourself into a cloud native-only world. Think about what your business wants.
