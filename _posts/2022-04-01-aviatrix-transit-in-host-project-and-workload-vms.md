---
title: "Aviatrix Spoke GW and Workload VMs in Same GCP Shared VPC Subnets"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 30, 2020", "organization", "Eligible resources", "organization administrators", "Service Project Admins", "check my previous blog", "cloud-networking", "Previous\u00a0post Aviatrix Spoke GW and Workload VMs in Same GCP Shared VPC Subnets", "Next\u00a0post Selective DNS Traffic Forwarding From On-Prem to Cloud"]
tags: []
original_url: https://netjoints.com/aviatrix-transit-in-host-project-and-workload-vms-in-shared-vpc-network/#respond
---

## Introduction

GCP shared VPC allows an [organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) to share or extend its vpc-network (you can also call it subnet) from one project (called host) to another project (called service/tenant).

When you use Shared VPC in a project call “X”, you are automatically designating this project “X” as a _**host project**_. Now you can attach one or more _service projects_ to host project “X”. The VPC networks in the host project are called _Shared VPC networks_. [Eligible resources](https://cloud.google.com/vpc/docs/shared-vpc#resources_that_can_be_attached_to_shared_vpc_networks_from_a_service_project) from service projects can use subnets you create in the Shared VPC network.

### Is Shared VPC a replacement of Transit (Hub-Spoke) Network?

Shared VPC is not a replacement for transit network. Shared VPC is a management and subnet allocation concept. It does not provide enterprise grade routing or traffic engineering capabilities. Shared VPC lets [organization administrators](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) delegate administrative responsibilities, such as creating and managing instances, to [Service Project Admins](https://cloud.google.com/vpc/docs/shared-vpc#iam_in_shared_vpc) while maintaining centralized control over network resources like subnets, routes, and firewalls.

## Aviatrix Transit Network Design Patterns with GCP Shared VPC

Aviatrix supports the GCP Shared VPC model and builds the single-cloud and multi-cloud transit networking architecture to provide enterprise grade routing, service insertion, hybrid connectivity and traffic engineering for the workload VMs. There are number of different deployment model possible but we will focus on one design with GCP Shared VPC network that is very popular among enterprises. Here Aviatrix Spoke GW is deployed in non-shared vpc subnet while the workload VMs are deployed in a shared vpc subnet.

For the other design options please[ check my previous blog](https://netjoints.com/gcp-shared-vpc-network-with-aviatrix-transit-hub-spoke-architecture/). 

### Design Highlights

  * Selected subnets (Prod and Dev) are shared with the service project
  * Local vpcnet-transit is the VPC with only one subnet called transit-gw-subnet (10.21.4.0). 
    * This is the subnet we will use to deploy Aviatrix tranist GW
    * As a best practice, there should not be any workload deployed inside this VPC beside Aviatrix Transit GW
  * Shared VPC Prod contains two subnets in our example 
    * 10.21.5.0/24 is for the Aviatrix Spoke GW. This subnet is not shared
    * 10.21.51.0/24 is the subnet shared with the “Prod Service Project”. This is where the workload/app VMs are deployed
  * Similarly a Shared VPC Dev is created with two subnets
    * 10.21.6.0/24 is for Aviatrix Spoke GW. This subnet is not shared
    * 10.21.61.0/24 is the subnet shared with the “Dev Service Project”. This is where the workload/app VMs are deployed



Following diagram shows what we described above

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_image-7.png)

Now let us take a look at the deployment aspects

### GCP Shared VPC Subnet Settings

In GCP we are only sharing two subnets from the Shared VPC to the service project. This is the best practice as it gives centralized IT more control over what is shared and what is not. Another option is to share the entire VPC and all its subnets to the service project. These shared subnets are the ones where workload VMs will be deployed. 

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-3.03.13-PM.png)

### Transit Gateway

Transit GW is deployed on the 10.21.4.0/24 subnet in the host-project VPC. This subnet is not shared and stays local to the host-project. 

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_image-2.png)

Following diagram shows the GCP VPC route table where this Transit GW is being deployed

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_image-3-1024x364.png)

### Deploy Production Spoke Gateway

Use the Multi-Cloud Transit workflow to deploy spoke gateway in production VPC. This subnet is not shared with the service project. 

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-2.27.18-PM.png)

### Deploy Development Spoke Gateway

Use the same workflow as before to deploy the spoke GW in development VPC. This subnet is not shared with the service project. 

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-2.23.54-PM.png)

### Attach Spoke GWs to Transit GW

Now attach Prod and Dev spoke GWs to Transit GW

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-2.29.44-PM.png) ![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-2.30.25-PM.png)

Now the spokes are attached to the transit gw and can be seen in the following diagram 

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-2.46.03-PM.png)

#### Production VPC Routing Table

Name: Global  
Route Table ID: Global

Name| Route| Target| Gateway| Priority| Tags| Status  
---|---|---|---|---|---|---  
avx-12a554b6a0fc446e9562c03aff9f2ff2| 0.0.0.0/0| default-internet-gateway| | 1000| avx-host-project-shared-vpcnet-prod-gbl| active  
avx-3e231ce7099947bca4f6f68a645731d0| 10.0.0.0/8| Instance gcp-spk-gw-host-project-prod-spk-subnet (zone us-east4-c)| gcp-spk-gw-host-project-prod-spk-subnet| 1000| | active  
avx-95ef9a0df3f24863a6cec71e51f2732b| 172.16.0.0/12| Instance gcp-spk-gw-host-project-prod-spk-subnet (zone us-east4-c)| gcp-spk-gw-host-project-prod-spk-subnet| 1000| | active  
avx-cf9d16a2e4ec4c98908aaabd92ff7208| 192.168.0.0/16| Instance gcp-spk-gw-host-project-prod-spk-subnet (zone us-east4-c)| gcp-spk-gw-host-project-prod-spk-subnet| 1000| | active  
default-route-29758d3f2ac8689f| 10.21.51.0/24| Virtual network host-project-shared-vpcnet-prod| | 0| | active  
default-route-3bfe90157ff7a563| 0.0.0.0/0| default-internet-gateway| | 1000| | active  
default-route-fc0595ff4c43a6dc| 10.21.5.0/24| Virtual network host-project-shared-vpcnet-prod| | 0| | active  
  
#### Production Spoke GW Routing Table

Name: gcp-spk-gw-host-project-prod-spk-subnet

Destination| Via| Dev| Nexthop IP| Nexthop Gateway| Status| Metric| Weight  
---|---|---|---|---|---|---|---  
default| 10.21.5.1| eth0| | | up| 0|   
10.21.4.0/24| | tun-23F57229-0| 35.245.114.41| gcp-transit-gw-host-project-local-vpcnet| up| 100|   
10.21.4.3| | tun-23F57229-0| 35.245.114.41| gcp-transit-gw-host-project-local-vpcnet| up| 100|   
10.21.5.0/24| 10.21.5.1| eth0| | | up| 0|   
10.21.5.1| | eth0| | | up| 0|   
10.21.6.0/24| | tun-23F57229-0| 35.245.114.41| gcp-transit-gw-host-project-local-vpcnet| up| 100|   
10.21.51.0/24| 10.21.5.1| eth0| | | up| 0|   
10.21.61.0/24| | tun-23F57229-0| 35.245.114.41| gcp-transit-gw-host-project-local-vpcnet| up| 100|   
169.254.0.0/16| | eth0| | | up| 0|   
  
#### Transit Gateway Routing Table

Name: gcp-transit-gw-host-project-local-vpcnet

Destination| Via| Dev| Nexthop IP| Nexthop Gateway| Status| Metric| Weight  
---|---|---|---|---|---|---|---  
default| 10.21.4.1| eth0| | | up| 0|   
10.21.4.0/24| 10.21.4.1| eth0| | | up| 0|   
10.21.4.1| | eth0| | | up| 0|   
10.21.5.0/24| | tun-23ECF407-0| 35.236.244.7| gcp-spk-gw-host-project-prod-spk-subnet| up| 100|   
10.21.5.2| | tun-23ECF407-0| 35.236.244.7| gcp-spk-gw-host-project-prod-spk-subnet| up| 100|   
10.21.6.0/24| | tun-2256383A-0| 34.86.56.58| gcp-spk-gw-host-project-dev-spk-subnet| up| 100|   
10.21.6.2| | tun-2256383A-0| 34.86.56.58| gcp-spk-gw-host-project-dev-spk-subnet| up| 100|   
10.21.51.0/24| | tun-23ECF407-0| 35.236.244.7| gcp-spk-gw-host-project-prod-spk-subnet| up| 100|   
10.21.61.0/24| | tun-2256383A-0| 34.86.56.58| gcp-spk-gw-host-project-dev-spk-subnet| up| 100|   
169.254.0.0/16| | eth0| | | up| 0  
  
Transit GW Route Info DB Details
    
    
    {
      "gateway name": "gcp-transit-gw-host-project-local-vpcnet",
      "segmentation": "disabled",
      "main": {
        "Duplicated CIDRs": [],
        "Best Route DB": {
          "10.21.6.0/24": "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '34.86.56.58', 'name': 'gcp-spk-gw-host-project-dev-spk-subnet', 'cidr': '10.21.6.0/24', 'locprf': '0', 'community': ''}",
          "10.21.61.0/24": "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '34.86.56.58', 'name': 'gcp-spk-gw-host-project-dev-spk-subnet', 'cidr': '10.21.61.0/24', 'locprf': '0', 'community': ''}",
          "10.21.5.0/24": "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '35.236.244.7', 'name': 'gcp-spk-gw-host-project-prod-spk-subnet', 'cidr': '10.21.5.0/24', 'locprf': '0', 'community': ''}",
          "10.21.51.0/24": "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '35.236.244.7', 'name': 'gcp-spk-gw-host-project-prod-spk-subnet', 'cidr': '10.21.51.0/24', 'locprf': '0', 'community': ''}"
        },
        "Route Info DB": {
          "10.21.6.0/24": [
            "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '34.86.56.58', 'name': 'gcp-spk-gw-host-project-dev-spk-subnet', 'cidr': '10.21.6.0/24', 'locprf': '0', 'community': ''}"
          ],
          "10.21.61.0/24": [
            "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '34.86.56.58', 'name': 'gcp-spk-gw-host-project-dev-spk-subnet', 'cidr': '10.21.61.0/24', 'locprf': '0', 'community': ''}"
          ],
          "10.21.5.0/24": [
            "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '35.236.244.7', 'name': 'gcp-spk-gw-host-project-prod-spk-subnet', 'cidr': '10.21.5.0/24', 'locprf': '0', 'community': ''}"
          ],
          "10.21.51.0/24": [
            "{'type': 'vpc', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '50', 'nexthop': '35.236.244.7', 'name': 'gcp-spk-gw-host-project-prod-spk-subnet', 'cidr': '10.21.51.0/24', 'locprf': '0', 'community': ''}"
          ]
        },
        "Best Route DB (linklocal)": {
          "10.21.4.0/24": "{'type': 'linklocal', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '0', 'nexthop': '', 'name': 'gcp-transit-gw-host-project-local-vpcnet', 'cidr': '10.21.4.0/24', 'locprf': '0', 'community': ''}",
          "10.21.4.3/32": "{'type': 'linklocal', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '0', 'nexthop': '', 'name': 'gcp-transit-gw-host-project-local-vpcnet', 'cidr': '10.21.4.3/32', 'locprf': '0', 'community': ''}",
          "10.21.6.2/32": "{'type': 'linklocal', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '0', 'nexthop': '', 'name': 'gcp-spk-gw-host-project-dev-spk-subnet', 'cidr': '10.21.6.2/32', 'locprf': '0', 'community': ''}",
          "10.21.5.2/32": "{'type': 'linklocal', 'table_id': 'main', 'as_path': '', 'as_path_len': '0', 'metric': '0', 'nexthop': '', 'name': 'gcp-spk-gw-host-project-prod-spk-subnet', 'cidr': '10.21.5.2/32', 'locprf': '0', 'community': ''}"
        }

Note: Aviatrix UserConnect-6.2.1528 was used to validate this design.

### Validation

Transit and spoke VMs deployed successfully in the host project

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-3.55.13-PM.png)

Workload VMs were deployed in their respective service projects on their respective shared subnets

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-3.57.14-PM.png)

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-3.57.53-PM.png)

For validation ssh was enabled on the dev workload VM and ICMP was also enabled. From Prod VM both ICMP and ssh were successful

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-3.51.40-PM.png)

ssh was also successful as we can see from the following

![](../../media/images/aviatrix-transit-in-host-project-and-workload-vms-_Screen-Shot-2020-10-07-at-3.52.53-PM.png)
