---
title: "Aviatrix ACE Professional Bootcamp Prerequisite"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 17, 2020", "multi-cloud", "Previous\u00a0post Aviatrix ACE Professional Bootcamp Prerequisite", "Next\u00a0post Multi-Cloud vs Hybrid-Cloud Definition"]
tags: []
original_url: https://netjoints.com/right-network-architecture-is-more-important-than-saving-cost/
---

An Architect, CTO or any technical decision maker has a huge responsibility to approve and adopt the “right network architecture” that is aligned with the business requirement. 

We have seen enterprises who picked the wrong or compromised network architecture and then paid the price, way more than the initial cost to build and run the network, in the long run. 

Here we are sharing some nuggets for the technical decision makers 

  * A bad architecture can cost you a lot in the long run. A lot more than what you have spent on building and running it
  * Don’t make long term architecture decisions based on short-term problems
  * Right architecture is more important than feature set
  * Simple architecture is the best architecture



Building an architecture and putting a design is one time deal, but you end up running that design for years to come. As an architect if you don’t make smart choices to build the correct architecture, your enterprise will be paying a lot more. 

Also think about support. You need a trusted and seasoned support partner working side by side, when problem arises. 

## Real World Customer Example

Let me give you an example. Here is an architecture a customer wanted to go with. 

![](http://107.23.205.221/wp-content/uploads/2020/01/image-33.png?w=717)

This customer wanted to …

  * Build the Aviatrix transit peering within an AWS region
  * Build the Aviatrix transit peering across multiple AWS regions and clouds (GCP)
  * Deploy AWS-TGW using Aviatrix Controller but just to attach the AWS-TGW with the AVX-Transit-GW



Essentially all the red-lines in the topology above were to be controlled and managed by Aviatrix.   
For VPC1, VPC2 and so on, this customer wanted to do it manually. Thinking that it was just one time job. 

In order to save few $$$, they wanted to make _**just one comprises**_ in the architecture and I will explain how costly that one compromise could be in the long run

> Customer did not want to use Aviatrix’s AWS-TGW Orchestration/Control to attach the Spoke VPCs with AWS-TGW

## Ripple Effect of a Single Compromise

I will break it down into different section and the ripple effect a single compromise can make

  * Aviatrix Controller won’t be able to monitor and propagate existing and new routes
    * Application VPC routes must be updated manually
    * AWS-TGW route tables must be updates manually
    * Transit VPC route table must be updated manually
  * Customer will loose the Aviatrix Controller’s TGW Audit functionality
    * Aviatrix has a feature called “TGW Audit” that monitors all the routing tables and updates in the Spoke, Transit and from On-Prem to make sure the intent matches with realized state (for example if someone by mistake add or remove a route manually from the VPCs or no overlapping IP issues etc.)
    * This could be huge operational burden on the team
  * Customer will not be providing proper alerts about the route updates and warnings about incorrect or duplicate routes
    * No network correctness
  * Customer will not be able to use new route approval feature (Aviatrix has this unique feature where any new route learned from on-prem requires admin approval before it can be propagated into the Cloud Network) 
  * Beside that there are other functionalities that Aviatrix is planning to build for AWS-TGW and Aviatrix-TGW that probably won’t work in such a network design
  * No way to do network segmentation for workloads in different VPCs
    * No Security Domain functionality available
  * Potential of AWS-TGW sprawl 
    * Multiple AWS-TGW might be needed for traffic separation
    * Huge management overhead
  * Some of the Aviatrix Flight-Path functionality might be broken in future
  * In future if Aviatrix releases, capacity planning and monitoring tools, that might not work in this type of architecture
  * Adding the Firewall in the architecture will not be possible. This could be a huge compliance and security risk a customer would be taking for security sensitive data
  * For User-VPN use-case, customer must accommodate VPN subnets manually on TGW and Aviatrix Transit
  * Aviatrix support won’t be able to solve and troubleshoot end-to-end because the VPCs were not attached by Aviatrix Controller
  * Customer is taking the risk of not having end-to-end Encryption
    * AWS-TGW does not provide encryption for Spoke VPCs
    * This could be moot point in this architecture, because customer decided to use AWS-TGW as attachment but it is important to call out for compliance, audit, GDPR and security reasons



### Credits

Wanted to say thanks to the following people for providing input to this post  
  
Tomasz Klimczyk  
Don Leone  
Mark Cunningham  
Hammad Alam  
Nauman Mustafa  
Saad Mirza   

