---
title: "Aviatrix User-VPN Deployment with AWS UDP Based NLB"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "December 19, 2019", "Refer to my previous blog for different Azure Transit Network design options and pros/cons", "Now attach Azure ARM Spoke through Native Peering", "For more details, refer to Aviatrix documentation here.", "multi-cloud", "Previous\u00a0post Aviatrix User-VPN Deployment with AWS UDP Based NLB", "Next\u00a0post Aviatrix ACE Professional Bootcamp Prerequisite"]
tags: []
original_url: https://netjoints.com/azure-transit-network-with-vnet-peering-deployment/
---

Unless you were living under a rock :-), everyone knows that Microsoft Azure is picking really fast in the Enterprise market. Understanding the Multi-Cloud Network (MCN) architecture is a must for Network/Cloud architects and Transit Networking is one of the Cloud Core element of MCN architecture.

This blog will discuss the deployment of an Azure Transit Network design pattern called **“Aviatrix Transit with VNet Peering”.**

> [Refer to my previous blog for different Azure Transit Network design options and pros/cons](https://netjoints.wordpress.com/2019/12/14/azure-transit-network-design-patterns/)

#### Topology

We will be using following topology to deploy the Azure Transit Networking with native VNet peering with Aviatrix Transit GW in the Transit/Hub VNet.

![](http://107.23.205.221/wp-content/uploads/2019/12/image-25.png?w=930)

#### Simple and Quick Deployment

The process of deploying the Azure Transit Network is extremely simple by using the Aviatrix Controller UI. You need to perform 3 simple steps and the entire setup can be up and running in about 30 min. 

#### IP Addressing

I will be using following IP addressing scheme for this deployment (also shown in the topology diagram above)

  * Aviatrix-Transit-VNet-Central 10.160.0.0/16
    * Aviatrix-Transit-GW-Central 10.160.0.4/22
  * Aviatrix-Spoke-VNet-Central-1 10.161.0.0/16 
  * Aviatrix-Spoke-VNet-Central-2 10.162.0.0/16



#### Region Selection

I am using US-Central region for this deployment but it is not really mandatory to deploy all the hub and spokes in the same region. They all can be spread across multiple regions as well.

* * *

### Step#1: Aviatrix Controller Creates Azure VNets and Resource Group (RG) 

Use Aviatrix Controller UI to creates the Azure VNets. The process allows to pick the VNet region and CIDR range. A corresponding and unique Azure Resource Group (RG) is also created at this step.

![](http://107.23.205.221/wp-content/uploads/2020/01/image-1.png)

#### Behind the Scene

Here is what happens in the background in Azure (you can verify it from the Azure portal itself)

  * Aviatrix first creates a new Azure Resource Group
  * Then Aviatrix Controller creates VNet in that RG
  * Aviatrix Controller also creates four /20 subnets from /16 CIDR range
    * Controller makes it easy and select the subnet range automatically. For example for /24 CIDR, controller will create /28 subnets
  * Controller then creates a User Route-Table and associates subnets in the newly created User Route-Table



Les us take a look at the screen-shots from Azure portal for the above mentioned bullet points

![](http://107.23.205.221/wp-content/uploads/2020/01/image-2.png?w=1024)Aviatrix first creates a new Azure Resource Group

![](http://107.23.205.221/wp-content/uploads/2020/01/image-3.png?w=1024)Aviatrix Controller creates VNet in the newly created RG

![](http://107.23.205.221/wp-content/uploads/2020/01/image-4.png?w=1024)Azure Virtual Network (VNet) Properties

![](http://107.23.205.221/wp-content/uploads/2020/01/image-6.png?w=762)Aviatrix Creates four /20 subnets. 2 public and 2 private ![](http://107.23.205.221/wp-content/uploads/2020/01/image-8.png?w=932) User Route Table created without any routes. Only “user” subnets associated with the user-route table. Public subnets are not associated with any route table at this stage 

* * *

### Step#2: Aviatrix Controller Deploys Transit GW VM in Transit VNet:RG

Now deploy Aviatrix Transit GW VM in Azure using the Aviatrix Controller UI. Make sure to deploy this VM in the Azure Public subnet that was created in Step#1.

![](http://107.23.205.221/wp-content/uploads/2020/01/image-9.png)Aviatrix Controller deploys the AVX-Transit GW in the Hub/Transit VNet

The controller UI shows the progress of this deployment as shown below
    
    
    [03:47:10] Starting to create ARM GW Aviatrix-Transit-GW-Central.
    [03:47:11] Connected to Azure ARM.
    [03:47:22] Deploying virtual machine...
    **[03:50:32] Deploy virtual machine done.**
    [03:50:33] License check is complete.
    [03:50:33] Added GW info to Database.
    [03:50:34] Aviatrix-Transit-GW-Central AVX SQS Queue created. 
    [03:50:34] Create message queue done.
    [03:50:34] Initializing GW.....
    [03:50:34] Copy configuration to GW Aviatrix-Transit-GW-Central done.
    [03:50:35] Copy new software to GW Aviatrix-Transit-GW-Central done.
    **[03:50:35] Copy /etc/cloudx/cloudx_code_file.json.enc to GW Aviatrix-Transit-GW-Central done.**
    [03:50:35] Copy /etc/cloudx/cloudx_code_key_file.txt to GW Aviatrix-Transit-GW-Central done.
    [03:50:35] Copy scripts to GW Aviatrix-Transit-GW-Central done.
    [03:50:35] Copy sdk to GW Aviatrix-Transit-GW-Central done.
    [03:50:39] Copy libraries to GW Aviatrix-Transit-GW-Central done.
    **[03:50:39] Installing software ....**
    **[03:50:41] Issuing certificates....**
    [03:50:41] Issue certificates done
    [03:51:14] GW software started.
    [03:51:38] Software Installation done.
    [03:51:40] Run self diagnostics done. 

#### Behind the Scene

At this stage the Aviatrix Transit VM is deployed. Let me show you what happens behind the scene by logging into the Azure Portal

![](http://107.23.205.221/wp-content/uploads/2020/01/image-11.png?w=692) Aviatrix Transit Resource Group now has the AVX-Transit VM/GW 

Pay attention to the above screen shot. Following are the resources that Aviatrix Controller orchestrate behind the scene

  * Creates new VNet
  * Creates VM in the newly created VNet (see screen-shot below)
  * Creates network interface for the VM
  * Allocated Public IP address to the VM
  * Creates Availability set and assign it to VM
  * Creates NSG (Azure Network Security Group) and assign it to the VM
  * Creates storage account
  * Assign the user-route-table to VM subnet



Following screen shows the Aviatrix Transit GW VM details

![](http://107.23.205.221/wp-content/uploads/2020/01/image-12.png?w=1024)Aviatrix Transit GW VM details

![](http://107.23.205.221/wp-content/uploads/2020/01/image-13.png?w=1024) Inbound Rules Added by Aviatrix Controller for Transit-GW at the NIC Level ![](http://107.23.205.221/wp-content/uploads/2020/01/image-14.png?w=1024) Outbound Rule Added by Aviatrix Controller for Transit-GW  ![](http://107.23.205.221/wp-content/uploads/2020/01/image-15.png?w=1024) NSG Created by Aviatrix (all rules on one screen) 

* * *

### Step#3: Aviatrix Controller Orchestrate Azure Native Transitive Peering

[Now attach Azure ARM Spoke through Native Peering](https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#b-attach-azure-arm-spoke-vnet-via-native-peering) using Aviatrix Controller

![](http://107.23.205.221/wp-content/uploads/2020/01/image-16.png?w=1024) Native Peering between Spoke and Transit VNets 

Repeat the above step for the second Spoke VNet as well.

#### Behind the Scene

  * Aviatrix Controller creates native peering
  * Creates Route Table I
  * nstall RFC1918 routes in the spoke VNets and points it to Transit VNet

![](http://107.23.205.221/wp-content/uploads/2020/01/image-17.png?w=1024) Native Peering Created by Aviatrix Controller 

Following two screen shot show that Aviatrix controller automatically creates a bi-directional peering relationship between Transit GW and Spoke VNet

![](http://107.23.205.221/wp-content/uploads/2020/01/image-18.png?w=754)Peering Details from Aviatrix Transit to Spoke-1 VNet

![](http://107.23.205.221/wp-content/uploads/2020/01/image-19.png?w=788)Peering Details from Spoke-1 VNet to Aviatrix Transit GW VM

![](http://107.23.205.221/wp-content/uploads/2020/01/image-20.png?w=1024) Aviatrix Manages Route Table Creation and Life-Cycle

![](http://107.23.205.221/wp-content/uploads/2020/01/image-21.png?w=1024)“Aviatrix-Spoke-VNet-Central-1 public” Route Table points to Aviatrix Transit GW IP as the Next Hope  


![](http://107.23.205.221/wp-content/uploads/2020/01/image-22.png?w=838) Similarly, Aviatrix-Spoke-VNet-Central-2 public” Route Table points to Aviatrix Transit GW IP as next hops

![](http://107.23.205.221/wp-content/uploads/2020/01/image-23.png?w=958) No need for route(s) is needed in transit VNet routing table because the routing in the Transit VNet is handled by the Aviatrix GW itself

![](http://107.23.205.221/wp-content/uploads/2020/01/image-24.png?w=1024)Aviatrix Controller UI shows Azure peering information 

![](http://107.23.205.221/wp-content/uploads/2020/01/image-25.png?w=1024) Aviatrix Transit GW Routing Table 

![](http://107.23.205.221/wp-content/uploads/2020/01/image-26.png?w=1024) You can also verify Azure Spoke VNet Routing Table from the Aviatrix Controller UI

* * *

## Transit Network Validation/Testing

Now we will deploy two test VMs to validate the deployment. The VMs will be deployed using CentOS OS and will get a public IP address so that we can ssh into them for testing purposes.

  * Azure-Test-VM-Spoke1 (Public: 13.67.225.200, Private: 10.161.0.4)
  * Azure-TestVM-Spoke2 (Public: 40.78.147.153, Private: 10.162.0.4)



![](http://107.23.205.221/wp-content/uploads/2020/01/image-28.png?w=841)Azure-Test-VM-Spoke1

Similarly a second Azure Test VM was created as shown in the screen-shot below

![](http://107.23.205.221/wp-content/uploads/2020/01/image-29.png?w=1024)
    
    
    [shahzad@Azure-Test-VM-Spoke1 ~]$ ifconfig
    eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
            inet 10.161.0.4  netmask 255.255.240.0  broadcast 10.161.15.255
            inet6 fe80::20d:3aff:fe9f:8c29  prefixlen 64  scopeid 0x20<link>
            ether 00:0d:3a:9f:8c:29  txqueuelen 1000  (Ethernet)
            RX packets 69315  bytes 39635034 (37.7 MiB)
            RX errors 0  dropped 0  overruns 0  frame 0
            TX packets 70959  bytes 14573682 (13.8 MiB)
            TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
            inet 127.0.0.1  netmask 255.0.0.0
            inet6 ::1  prefixlen 128  scopeid 0x10<host>
            loop  txqueuelen 1000  (Local Loopback)
            RX packets 186  bytes 15872 (15.5 KiB)
            RX errors 0  dropped 0  overruns 0  frame 0
            TX packets 186  bytes 15872 (15.5 KiB)
            TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    [shahzad@Azure-Test-VM-Spoke1 ~]$ ping 10.162.0.4
    PING 10.162.0.4 (10.162.0.4) 56(84) bytes of data.
    64 bytes from 10.162.0.4: icmp_seq=1 ttl=63 time=1.95 ms
    64 bytes from 10.162.0.4: icmp_seq=2 ttl=63 time=1.95 ms
    64 bytes from 10.162.0.4: icmp_seq=3 ttl=63 time=2.24 ms
    64 bytes from 10.162.0.4: icmp_seq=4 ttl=63 time=1.67 ms
    64 bytes from 10.162.0.4: icmp_seq=5 ttl=63 time=2.19 ms
    64 bytes from 10.162.0.4: icmp_seq=6 ttl=63 time=2.30 ms
    

## Conclusion

Aviatrix makes it extremely simple and easy to deploy Azure Transit Network with native VNet peering option. The strength of the solution is that enterprises can build a common and unified transit solution in other cloud such as AWS and GCP and create a true multi-cloud network architecture with consistent operations and management options.

[For more details, refer to Aviatrix documentation here.](https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#b-attach-azure-arm-spoke-vnet-via-native-peering)
