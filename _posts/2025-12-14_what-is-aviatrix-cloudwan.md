---
title: "GCP Transit Networking and Routing with Aviatrix"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 25, 2019", "multi-cloud", "Previous\u00a0post GCP Transit Networking and Routing with Aviatrix", "Next\u00a0post Aviatrix CloudWAN Deployment with AWS Global Accelerator"]
tags: []
original_url: https://netjoints.com/what-is-aviatrix-cloudwan/#respond
---

### Problem Statement

Enterprises are moving their data centers, workload, applications and even branches into the public cloud. They do not want to own and manage the physical infrastructure anymore. 

The ground reality is that Enterprises have also invested millions of $$$ in the Branch, Access routers and entire WAN ecosystem. 

  * These branch routers are deployed in Banks, ATM machines, retail store floor etc. 
  * These branches could be deployed within a country, continent or across the globe.
  * In some cases they are owned by the enterprise and in other by partners or managed services providers. 



The adoption of Cloud might not happen overnight for these enterprises. In the mean-time, these branches do need secure and efficient connectivity to the Cloud.

### So how do we solve this challenge? 

If you talk to device vendors, most likely they will push you to use one of the followings 

1- **SD-WAN** (if they have one) solution or  
2- Just create an IPSec tunnles to public cloud

Both of these have their own issues and problems. Let us examine them

###  SD-WAN 

  * Requires re-architecting your entire WAN
  * In almost all the cases, it requires you to purchase new hardware for all the branches 
  * Usually the new SD-WAN hardware does not integrate or work with the existing branch hardware
  * So effectively you will be running two different WAN architectures in your enterprise for a long period of time
  * You are now talking about new compliance and audit approval for your entire WAN architecture
  * Come up with a new governance model
  * Train pretty much everyone who touches WAN or any WAN device 
    * Although these SD-WAN vendors claim that it is zero-touch, reality is that it is not, when it comes to troubleshooting and debugging issues in the branch
  * Requires new operations model with new tools, associates learning curve and integration challenges
  * You might not want to keep physical presences in the long run. You might want to move majority of the branches in the Cloud, but SD-WAN kind of forces you to use another hardware device on-prem
  * And you know how painful and lengthy process it is 🙂



> SD-WAN is not the answer to this challenge at least

###  IPSec Tunnel to Public Cloud

Another solution they will offer you to create an IPSec Tunnel to Public Cloud. This sounds simple but it is not. Let us examine it

  * Creating a simple IPSec tunnel is painful and require deep CLI and IPSec knowledge
  * If it is managed by partner or MSP, then it is another people, process cost discussion
  * For 5 to 10 branches, may be it ok to create IPSec Tunnels but what about for 100 and thousands of branches 
  * These routers do not have any REST API or Terraform knowledge, so it is extremely hard to even automate the entire process
  * Lets assume that someone wrote the script for that, but then what about life-cycle management of routers and support-ability of scripted solution?
  * Connection to Cloud is beyond just creating a simple IPSec tunnel
    * You need BGP to exchange routes
    * Provide transit connection to other VPCs/vNETs
    * Provide secure connectivity to workload
    * Also maintain QoS and performance because what if a branch in Singapore trying to connect to workload in San Francisco VPC or in Virginia? The IPSec latency will just kill the application and it will be extremely bad use-experience. That could result in customer satisfaction issues and potentially revenue loss



> Creating just an IPSec Tunnel is not the answer to this challenge either

## Aviatrix CloudWAN Solution

In order to solve the challenges I described above, Aviatrix has launched a new solution called CloudWAN for Cisco Routers in Branch, Campus and other Access locations. The solution leverage the Aviatrix centralized management plane, Aviatrix Global Transit or AWS-TGW with native integration with AWS global accelerator. 

Following are the highlights and advantages of Aviatrix CloudWAN solution

  * Manage and control Cisco routers in the branches from a centralized management (Aviatrix Controller) point, deployed in the public cloud of your choice (AWS, Azure, GCP etc.)
  * On-ramp branch routers without any rip and replace (investment $$$ protection)
  * Securely connect Cisco routers to public Cloud without any manual intervention or CLI interaction
    * Aviatrix provides simple, point-and-click UI workflow as well as REST API options
  * Manage life-cycle (config. changes, config diff, audit, etc.) of Cisco routers directly from public Cloud
  * Integrated with AWS Global Accelerator to provide optimal latency and QoS by routing traffic to AWS global backbone instead of hopping across multiple public ISPs
    * Branches get connected to the Cloud from the closest AWS point of presence using Anycast IP and attached to Aviatrix global transit to seamlessly reach any cloud provider in any region. 
    * Branches can also reach enterprise data centers via direct connect or equivalent
  * Supports BGP to dynamically propagate routes from Cloud to branch locations and vice versa
  * Provide service insertion framework
    * For example when branches traffic is entering or leaving the Cloud, it can be inspected by Next Generation Firewall (such as Palo Alto Networks) for deeper packet inspection
  * Provides connectivity to multiple clouds by using Aviatrix Global Transit solution



### Deployment Model Examples

The Aviatrix solution is extremely flexible and there could be many deployment models and design patterns available to enterprises based on their needs. Following shows just few examples of how an enterprise might deploy this CloudWAN solution with and without AWS Global Accelerator

#### Aviatrix CloudWAN without AWS Global Accelerator

This is the deployment model an organization could use if branches are in one region and there is no need for optimal latency path to Cloud.

In the example shown in the following diagram, access from branches will add extra latency because those physical branches will have to traverse multiple ISPs (internet hops with no QoS or SLA).

![](http://107.23.205.221/wp-content/uploads/2019/12/image.png?w=770)

#### Aviatrix CloudWAN with AWS Global Accelerator

This is the best deployment model that allows optimal latency path from branch to Cloud. This is the model that is recommended for enterprises having presence in different AWS regions.

![](http://107.23.205.221/wp-content/uploads/2019/12/image-1.png?w=770)

Here AWS Global Accelerator provides anycast IP (two by default for redundancy reasons). The branch connects to the closed AWS-Edge location (CloudFront POP) and then the traffic rides back onto the AWS expense backbone to reach to the destination.

#### Credit

Hammad Alam for contributing to this post.
