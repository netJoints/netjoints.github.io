---
title: "Aviatrix Multi-Cloud Oracle Cloud (OCI) Transit Network Setup with GCP"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 7, 2019", "OS Login", "Compute Engine IAM\nroles", "adding\nand removing SSH keys in metadata", "Enable the OS Login feature", "Grant the necessary IAM roles", "Set up two-factor authentication", "Add custom SSH keys to user accounts", "Modify user accounts using the Directory API", "Grant instance access to users outside of your organization", "Connect to instances", "expected login behaviors", "ttps://cloud.google.com/solutions/building-high-throughput-vpns", "multi-cloud", "Previous\u00a0post Aviatrix Multi-Cloud Oracle Cloud (OCI) Transit Network Setup with GCP", "Next\u00a0post What is Aviatrix CloudWAN?"]
tags: []
original_url: https://netjoints.com/gcp-transit-networking-and-routing-with-aviatrix/#respond
---

Aviatrix Transit Network in GCP is a powerful use-case for customers looking to design consistent transit architecture in GCP and in other clouds. This is neede to build a unified and consistent network forming the cloud core essentially. 

This design also allows business to have full visibility into the traffic beyond what Cloud primitive options can provide. 

## GCP Transit Network Topology

We will be using a simple hub and spoke transit topology as depicted below. This topology can be extended to hundreds of VPCs and across multiple clouds without any compromises. 

![](http://107.23.205.221/wp-content/uploads/2019/11/image.png?w=1008)

## Create GCP VPCs Directly from Aviatrix Controller UI

This is very powerful deploy directly from the Aviatrix Controller UI. There is no need to learn different Cloud constructs as Aviatrix can speak all the “Cloud” languages.

![](http://107.23.205.221/wp-content/uploads/2019/11/image-1.png?w=1024)

Following example shows the output when all necessary VPCs were created to build the transit topology we showcased earlier. 

![](http://107.23.205.221/wp-content/uploads/2019/11/image-2.png?w=1024)

##  Create GCP Transit Gateway from AVX-Ctrl UI 

NOTE: AVX-Ctrl –> Aviatrix Controller

![](http://107.23.205.221/wp-content/uploads/2019/11/image-3.png?w=1024)

##  Create GCP Spoke Aviatrix Gateway-1 

![](http://107.23.205.221/wp-content/uploads/2019/11/image-4.png?w=1024)  


##  Create GCP Spoke Aviatrix Gateway-2 

![](http://107.23.205.221/wp-content/uploads/2019/11/image-5.png?w=1024)

Following is the output when AVX-GW is created

![](http://107.23.205.221/wp-content/uploads/2019/11/image-6.png?w=1024)

##  GCP Transit (Hub) and Spoke GWs Deployed 

At this point you have your HUB and Spoke GW deployed

![](http://107.23.205.221/wp-content/uploads/2019/11/image-7.png?w=1024)

##  Attach GCP Hub to Spoke-VPC1 and VPC2 

![](http://107.23.205.221/wp-content/uploads/2019/11/image-8.png?w=1024) ![](http://107.23.205.221/wp-content/uploads/2019/11/image-9.png?w=352)

## Attachment Process

AVX-Ctrl creates the IPSec Tunnels / Firewall rules etc. to attach Spoke-VPC to Transit-VPC as shown below

![](http://107.23.205.221/wp-content/uploads/2019/11/image-10.png?w=1024)

##  Aviatrix Encrypted Peering Section 

Encrypted Peering section will also show the following outcome

![](http://107.23.205.221/wp-content/uploads/2019/11/image-11.png?w=984)

##  GCP Transit Networking Is Deployed Now 

![](http://107.23.205.221/wp-content/uploads/2019/11/image-12.png?w=782)

## Testing GCP Transit

We deployed two test VMs in Spoke VPCs as follows

![](http://107.23.205.221/wp-content/uploads/2019/11/image-14.png?w=800)

## Test VM Properties

![](http://107.23.205.221/wp-content/uploads/2019/11/image-15.png)

##  Enable GCP “OS Login” Feature to Login to VMs 

https://cloud.google.com/compute/docs/instances/managing-instance-access

[OS Login](https://cloud.google.com/compute/docs/oslogin) allows you to use [Compute Engine IAM roles](https://cloud.google.com/compute/docs/access/iam) to manage SSH access to Linux instances and is an alternative to manually managing instance access by [adding and removing SSH keys in metadata](https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys).

To configure OS Login and connect to your instances, use the following process: 

  1. [Enable the OS Login feature](https://cloud.google.com/compute/docs/instances/managing-instance-access) on your project or on individual instances. 
  2. [Grant the necessary IAM roles](https://cloud.google.com/compute/docs/instances/managing-instance-access) to yourself, your project members, or your organization members. 
  3. Optionally, complete any of the following steps: 
     1. [Set up two-factor authentication](https://cloud.google.com/compute/docs/oslogin/setup-two-factor-authentication). 
     2. [Add custom SSH keys to user accounts](https://cloud.google.com/compute/docs/instances/managing-instance-access) for yourself, your project member, or organization members. Alternatively, Compute Engine can automatically generate these keys for you when you connect to instances.
     3. [Modify user accounts using the Directory API](https://cloud.google.com/compute/docs/instances/managing-instance-access). 
     4. [Grant instance access to users outside of your organization](https://cloud.google.com/compute/docs/instances/managing-instance-access). 
  4. [Connect to instances](https://cloud.google.com/compute/docs/instances/managing-instance-access). 
  5. Review the [expected login behaviors](https://cloud.google.com/compute/docs/instances/managing-instance-access). 



##  Install important Tools on both GCP VMs 

[ttps://cloud.google.com/solutions/building-high-throughput-vpns](https://cloud.google.com/solutions/building-high-throughput-vpns)

# sudo apt-get -y install traceroute mtr tcpdump iperf whois host dnsutils siege

## Enable Aviatrix Connected Transit Feature

This feature allows VPCs to talk to each other. By default VPCs can only talk to Transit VPC. This is meant for SaaS based apps or for Service Providers for VPC isolation.

![](http://107.23.205.221/wp-content/uploads/2019/11/image-16.png?w=622)

## Testing Successful

At this point it is all good and working.

![](http://107.23.205.221/wp-content/uploads/2019/11/image-17.png?w=1024) ![](http://107.23.205.221/wp-content/uploads/2019/11/image-18.png?w=916)
