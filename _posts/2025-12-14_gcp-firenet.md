---
title: "Aviatrix Kickstart – Spin up Cloud Networks in Minutes – UI Mode"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 7, 2021", "GCP does not allow multi-NIC V", "ECMP on its routing table", "internal TCP/UDP LB IP as next hops", "GCP service insertion or NGFW insertion best practices", "cloud-networking", "gcp", "Previous\u00a0post Aviatrix Kickstart \u2013 Spin up Cloud Networks in Minutes \u2013 UI Mode", "Next\u00a0post Cloud Networking and Security Predictions For 2021"]
tags: []
original_url: https://netjoints.com/gcp-firenet/
---

## Draft

## Introduction

Aviatrix Firewall Network Services (FireNet) simplify the Next Generation Firewall Insertion and Operations. FireNet is the simplest, highest performance, best scale-out architecture for next generation firewalls in the cloud. 

Following are some of the highlights

  * Simple deployment, autoroute propagation to firewalls
  * Advanced egress, IDS, IPS, and ingress security
  * Maximize performance, scale, and visibility
  * Simplified – no IPSec tunneling or SNAT required
  * Integration with Check Point, Fortinet, and Palo Alto Networks Firewalls



## FireNet for Google Cloud (GCP)

FireNet for GCP follows the same principle and provides the same benefits as in the other Cloud. It is the same architecture that is consistent across multiple clouds. 

Like any other cloud GCP native networking and security services are different than AWS and Azure so there are some unique requirements that engineers should be aware of but from the design, deployment, and operations perspective it is transparent to the enterprise security and networking team.

Before we take a look at FireNet in GCP, we must understand the design requirement imposed by GCP that will lead us into the understanding it better later in the document. 

## GCP Networking Behavior

In this section, we will discuss the unique GCP Networking Behavior that will dictate some of the design choices needed to design a GCP FireNet solution

### GCP Does Not Support Multiple Network Interfaces in the same VPC

[GCP does not allow multi-NIC V](https://cloud.google.com/vpc/docs/create-use-multiple-interfaces​)Ms to be deployed in the same VPC network. This restrictions forces Aviatrix FireNet customer to plan for additional VPCs as we will discuss later in the session

### GCP Support ECMP on Routing Table

GCP has this great feature to allow [ECMP on its routing table](https://cloud.google.com/vpc/docs/routes​). 

### GCP Support Internal TCP/UDP LB IP as Next Hops

GCP networking is also better as compare to other cloud in terms of supporting [internal TCP/UDP LB IP as next hops](https://cloud.google.com/load-balancing/docs/internal/ilb-next-hop-overview)

## GCP FireNet Design Notes

The GCP FireNet design is applicable to GCP Shared VPC or Standard VPC designs.

The GCP FireNet solution requires at least three interfaces to be deployed on the 3rd party security appliance or firewall. Some security vendors do allow Firewalls on stick design where there is only one NIC present to handle ingress, egress, east/west, and management traffic. This type of solution might be good for small deployment but poses scale and segmentation challenges in enterprise-grade security solutions.

Multi-NIC FireNet design is also more flexible and scalable and works really well with the GCP Shared VPC design.

GCP Best Practices for Service Insertion

If you look at the [GCP service insertion or NGFW insertion best practices](https://cloud.google.com/solutions/best-practices-vpc-design#manage_traffic_with_gcp_native_firewall_rules), you will notice they also recommend multiple nic design.

![managing traffic with native firewall rules](https://cloud.google.com/solutions/images/vpc-bps-native-firewall-rules.svg)

##  GCP FireNet Topology

Following shows a logical GCP FireNet topology

![](../../media/images/gcp-firenet_image-45.png)

  * Transit FireNet GW VM
    * This GW is deployed by Aviatrix controller with two interfaces. 
    * NIC0 sits in Transit VPC (or Transit FireNet VPC). This side will be connected to Spoke GWs in their respective VPC
    * NIC1 connects to LAN VPC facing the Firewall
  * Firewall / Security Appliance VM
    * The Firewall is deployed by the Aviatrix Controller with 3 interfaces
    * NIC0 has the public IP address for the egress traffic. If egress traffic is not required, one can ignore it. The Controller will build this interface regardless
    * NIC1 is the management interface. Usually, a public IP address is assigned to this interface. In some cases, customers might want to access management via a private network (over Google Cloud Interconnect etc.) and can assign a private IP as well
    * NIC2 is connected to LAN VPC. This will be used to communicate with the Aviatrix Transit FireNet GW



### Design Recommendations and Best Practices

  * Because VPC resource quotas are set at the project level, make sure to have aggregate VPC resource needs across all VPC
  * Do not deploy any workload in the Transit VPC
  * Do not deploy any workload in the LAN VPC
  * Do not deploy any workload in the Egress VPC



### Aviatrix Transit FireNet Design with Standard GCP VPC

Following design shows Aviatrix Transit FireNet design with standard GCP VPC setup. This shows the Aviatrix Spokes also connected to Aviatrix Transit GW
