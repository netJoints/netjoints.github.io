---
title: "Azure Aviatrix Controller Deployment"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "December 14, 2019", "Refer to my blog post to deploy Aviatrix Controller from the Azure Market Place.", "In my next blog, I will discusses the Azure Transit Network deployment with native VNet peering in more details.", "multi-cloud", "azure", "Previous\u00a0post Azure Aviatrix Controller Deployment", "Next\u00a0post Aviatrix User-VPN Deployment with AWS UDP Based NLB"]
tags: ["Shahzad Ali", "December 14, 2019", "Refer to my blog post to deploy Aviatrix Controller from the Azure Market Place.", "In my next blog, I will discusses the Azure Transit Network deployment with native VNet peering in more details.", "multi-cloud", "azure", "Previous\u00a0post Azure Aviatrix Controller Deployment", "Next\u00a0post Aviatrix User-VPN Deployment with AWS UDP Based NLB"]
original_url: https://netjoints.com/azure-transit-network-design-patterns/
---

Microsoft Azure is getting lot of Cloud business in the Enterprise market. Understanding the Multi-Cloud Network (MCN) architecture is a must for Network/Cloud architects and Transit Networking is one of the Cloud Core element of MCN architecture.

Aviatrix offer two distinct design patterns to build global transit in Azure and for cross-cloud connectivity. Both of them have their pros and cons that will be discussed later. 

![](http://107.23.205.221/wp-content/uploads/2020/01/image-30.png?w=974)Azure Transit Network Design Patterns

The general recommendation and best practice from Aviatrix is to deploy “Aviatrix Transit with VNet GWs” design pattren.

> [Refer to my blog post to deploy Aviatrix Controller from the Azure Market Place.](https://netjoints.wordpress.com/2019/12/11/aviatrix-controller-deployment-in-azure/)

## Aviatrix Transit with VNet GWs

In this pattern, a transit network in Azure is built with a Transit gateway (aka hub gateway) in the centralized VNet (aka Transit VNet) and spoke gateways in the spoke VNets.

In this model Aviatrix Controller

  * Deploys the Aviatrix Azure Transit GW in the transit VNet
  * Deploys the Aviatrix Azure Spoke GW in the spoke VNets
  * Orchestrates vNET route creation and propagation
  * Connects spoke VNet to Transit/Hub GW and 
  * Controls and steers the traffic accordion to the desired state
  * Provides life-cycle of management of the deployment

![Aviatrix Transit with VNet GWs](http://107.23.205.221/wp-content/uploads/2019/12/image-24.png)

> Aviatrix recommendation is to use “Aviatrix Transit with VNet GW” design pattern

### Aviatrix Transit with VNet GWs – Details

  * This model Provides encrypted connection between Spoke and Transit VNets
    * This is extremely important and in majority of the cases first requirement for enterprises
  * It can leverage Aviatrix ActiveMesh between Transit and Spoke VNets. 
    * ActiveMesh provides huge advantages by building multiple Active/Active encrypted links between Hub and Spoke VNets.
    * It provides higher availability of service in case one or even two links go down.
    * ActiveMesh links actively participate in packer forwarding that results in increased throughput as compare to single encrypted link
  * Enterprises can leverage Advanced troubleshooting and visibility options provided by Aviatrix
    * For example Aviatrix GW allows enterprises to take tcpdump or packet capture of the traffic passing through
  * It allows enterprises to deploy consistent enterprise network architecture across multiple regions and multiple-clouds



## Aviatrix Transit with VNet Peering

Aviatrix also offers building transit networks by natively peering the spoke VNets with the Aviatrix Transit GW. This model does not require any GWs in the spoke VNet. 

In this model Aviatrix controller 

  * Deploys the Aviatrix Azure Transit GW in the transit VNet
  * Orchestrates vNET route creation and propagation
  * Connects spoke VNet to Transit/Hub GW and 
  * Controls and steers the traffic accordion to the desired state
  * Provides life-cycle of management of the deployment

![](http://107.23.205.221/wp-content/uploads/2019/12/image-25.png)

> Aviatrix recommendation is to use “Aviatrix Transit with VNet GW” design pattern

### Aviatrix Transit with VNet Peering – Details

  * This model does not provide encryption between spoke and transit VNets
  * Less visibility into the traffic and overall operations
  * There is no option to take tcpdump or packet capture at the spoke VNet as compare to the other other model
  * Ops team depends on the Azure tools and options to troubleshoot rather than using Aviatrix’s rich set of troubleshooting and visibility tools
  * No gateways in the spoke VNets means no IPSec tunnel charges between spoke and transit VNets
  * The Aviatrix ActiveMesh behavior is different in this model as compare to the previous one. Since we do not have Aviatrix Spoke GW in the spoke VNet, the behavior is more like Primary/Backup links
    * If spoke VNet has multiple route tables, the Aviatrix controller will configure both primary and backup Transit GWs as the default gateway for different route tables. By doing so, we can achieve load balancing for Spoke VNet outbound traffic
    * If Spoke VNet has only one route table, this route table will point to the private IP of the primary Transit GW until that GW fails. In case of primary Transit GW failure, the controller will automatically update the Spoke VNet’s route table to point to the private IP of the backup Transit GW
  * The throughput between Transit and Spoke VNet is what Azure native VNet peering provides (At the time of writing this article, Azure did not publish those numbers)
  * Aviatrix has done performance testing using different Azure VM sizes. Refer to following results as a reference 



![](http://107.23.205.221/wp-content/uploads/2019/12/azure-vnet-throughput.png)Azure Throughput

## Conclusion

Transit Network is an integral part of Multi-Cloud Network (MCN) architecture. It fits right into the Cloud Core pillar of MCN architecture. Aviatrix offer two different Azure Transit Network design patterns to cater various enterprise needs in this space. 

[In my next blog, I will discusses the Azure Transit Network deployment with native VNet peering in more details.](https://netjoints.wordpress.com/2019/12/19/azure-transit-network-with-vnet-peering-deployment/)
