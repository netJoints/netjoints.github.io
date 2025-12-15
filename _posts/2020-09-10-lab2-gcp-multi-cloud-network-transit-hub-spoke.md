---
title: "LAB1 – Google Cloud and Aviatrix Testing/POC LAB Guide"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 28, 2020", "cloud-networking", "Previous\u00a0post LAB1 \u2013 Google Cloud and Aviatrix Testing/POC LAB Guide", "Next\u00a0post LAB3 \u2013 GCP Multi-Cloud Network Segmentation (MCNS)"]
tags: []
original_url: https://netjoints.com/lab2-gcp-multi-cloud-network-transit-hub-spoke/#respond
---

In this lab, we will build the hub and spoke network in GCP. All the GCP VPCs and their respective subnets are already created for you to save time. 

## GCP Spoke-2 GW VPC Network/Subnet Creation

**This step is already done for you so please do not attempt.**

Controller can create those subnets using API/Terraform as well. It makes it easy to make it part of your CI/CD pipleline.

Controller –> Useful Tools –> Create A VPC –> Add New  
Controller –> Useful Tools –> Create A VPC –> Add New Row 

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-1.14.39-PM.png)

You should view the VPCs created for you already. 

Controller –> Useful Tools –> VPC Tracker

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-1.20.14-PM.png)

Now click “VIEW GCLOUD SUBNET” to see further details

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-1.22.24-PM.png)

## Deploy GCP Spoke-2 Gateway

Since we have all the subnets created properly, it is time to deploy the GCP Spoke-2 GW using the Controller. 

Controller –> Multi-Cloud Transit –> Setup

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-1.26.20-PM.png)

### Connect GCP Spokes to GCP Transit

At this stage we have 4 spokes in GCP 

  * gcp-spoke1 –> connected to gcp transit gw
  * gpc-spoke2 –> not connected to gcp transit gw
  * gcp-spoke3 –> connected to gpc transit gw (this will be use for user-vpn later in the lab)
  * gcp-spoke4 –> not connected to gcp transit gw



Login to CoPilot (user: Copilot / pass: Copilot123!) now to see the connectivity in real-time

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-1.48.25-PM.png)

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-1.53.59-PM.png)

In this part of the lab, we will connect the remaining spoke gateway to aviatrix transit-gw

Controller –> Multi-Cloud Transit –> Setup –> Attach Spoke Gateway to Transit Network

#### Spoke#2

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-1.54.46-PM.png)

#### Spoke#3

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-2.11.50-PM.png)

Now notice the topology changed and all GCP spokes are connected now

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-7.24.31-PM.png)

### Veryify GCP Spoke Connectivity 

Now Ping from vm_gcp_private_ip_spoke1 (user: ubuntu / pass: Password123!) to other test machines (as listed below) and check the connectivity

  * vm_gcp_private_ip_spoke2 (10.20.12.130) – **should work**
    * using Aviatrix hub/spoke
  * vm_gcp_private_ip_spoke3 (10.42.0.130) – **should work**
    * using Aviatrix hub/spoke



### Connect AWS Spoke to AWS-Transit

If we look at the AWS side, we have aws-spoke1 connected to aws-transit but the spoke2 is not yet connected as shown in the topology below

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-8.00.17-PM.png)

Now we will use Aviatrix Controller to establishe this connection. The aws-spoke2 gateway is already deployed for you

Controller –> Multi-Cloud Transit –> Setup –> Attach Spoke Gateway to Transit Network

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-8.02.11-PM.png)

After this setup, following is the topology

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_image-3.png)

### Veryify AWS Spoke Connectivity

Now Ping from vm_gcp_private_ip_spoke1 (user: ubuntu / pass: Password123!) to AWS test EC2s (as listed below) and check the connectivity

  * vm_aws_private_ip_spoke1 (10.101.0.84) – **should work**
    * This works because the traffic is routed via the dc-router-1. There is a private link between dc-router-1 and dc-router-2 connecting GCP and AWS using services like Equinix/Megaport/Pureport/Epsilon/etc.
    * Use tracepath or traceroute (**$sudo apt install traceroute**) to confirm
  * vm_aws_private_ip_spoke2 (10.42.0.84) – **should not work**
    * Because this subnet overlaps with the gcp spoke-vpc3 subnet
    * We will fix this issue later in the lab



Following output shows a traffic route from gcp-spoke-1 test VM to AWS test EC2 in aws-spoke1
    
    
    ubuntu@vm-gcp-spoke-1:~$ tracepath 10.101.0.84
     1?: [LOCALHOST]                                         pmtu 1460
     1:  gcp-spoke-1.c.cne-pod24.internal                      1.563ms 
     1:  gcp-spoke-1.c.cne-pod24.internal                      0.260ms 
     2:  gcp-spoke-1.c.cne-pod24.internal                      0.256ms pmtu 1396
     2:  10.20.3.2                                             1.846ms 
     3:  10.20.3.2                                             0.775ms pmtu 1390
     3:  169.254.100.2                                        51.410ms 
     4:  172.16.0.2                                           55.184ms 
     5:  10.10.0.93                                           75.906ms 
     6:  10.101.0.70                                          77.206ms 
    

## Multi-Cloud Transit Peering (Connection GCP and AWS)

Now we have setup all the gateway and build the hub-spoke (transit) in GCP, it is time to connect GCP with AWS now. This peering is secure and encrypted and takes care of number of configuration options and best practices that are needed for such a complex connectivity. You will appreciate the simplicity of doing that.

Select Multi-Cloud Transit –> Transit Peering –> ADD NEW

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-7.50.22-PM-1.png)

> Note that the order of cloud selection does not matter here. After few seconds, the status will be green as shown in the screen shot below.

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-7.52.46-PM.png)

## Verify Transit Connectivity

Ping from vm_gcp_private_ip_spoke1 (user: ubuntu / pass: Password123!) to GCP and AWS VMs (as listed below) and make sure connectivity works

  * vm_gcp_private_ip_spoke2 (10.20.12.130) – **should work**
    * using Aviatrix hub/spoke
  * vm_gcp_private_ip_spoke3 (10.42.0.130) – **should work**
    * using Aviatrix hub/spoke
  * vm_aws_private_ip_spoke2 (10.42.0.84) – **should not work**
    * Because this subnet overlaps with the gcp spoke-vpc3 subnet
    * We will fix this issue later in the lab
  * vm_aws_private_ip_spoke1 (10.101.0.84) – **should work**
    * This time the packet will use gcp to aws aviatrix transit gateway route for connectivity
    * Use tracepath or traceroute (**$sudo apt install traceroute**) to confirm
    * In case this link goes down, the connectivity will be provided using the DC router DCI link as backup. This setup is important for Business Continuity and Disaster Recover 


    
    
    ubuntu@vm-gcp-spoke-1:~$ traceroute 10.101.0.84
    traceroute to 10.101.0.84 (10.101.0.84), 30 hops max, 60 byte packets
    1 gcp-spoke-1.c.cne-pod24.internal (10.20.11.2) 1.322 ms 1.354 ms 1.413 ms
    2 10.20.3.2 (10.20.3.2) 2.684 ms 2.708 ms 2.710 ms
    3 10.10.0.93 (10.10.0.93) 62.072 ms 62.032 ms 62.032 ms
    4 10.101.0.70 (10.101.0.70) 61.975 ms 61.981 ms 61.895 ms

Controller –> Multi-Cloud Transit –> List –> Transit Gateway –> gcp-transit –> Show Details

Following screen shows the best path available to reach 10.101.0.84

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-11.03.59-PM-1024x779.png)

Controller –> Multi-Cloud Transit –> List –> Transit Gateway –> gcp-transit –> Show Details –> Route Info DB Details

Following screen shows that 10.101.0.0/24 was received from two paths and transit peering was selected as the best path

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-11.06.37-PM-1024x535.png)

This completes the transit topology and testing. You can verify it in CoPilot as well. 

![](../../media/images/lab2-gcp-multi-cloud-network-transit-hub-spoke_Screen-Shot-2020-12-31-at-11.11.48-PM.png)
