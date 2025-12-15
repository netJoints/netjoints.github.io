---
title: "Previous Post"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 14, 2020", "organization", "Eligible resources", "organization administrators", "Service Project Admins", "Deployment details for this design pattern are discussed here", "Deployment details for this design pattern is discussed here", "cloud-networking", "Previous\u00a0post Previous Post", "Next\u00a0post Aviatrix Kickstart \u2013 Spin up Cloud Networks in Minutes \u2013 CLI Mode"]
tags: []
original_url: https://netjoints.com/gcp-shared-vpc-network-with-aviatrix-transit-hub-spoke-architecture/
---

## What is GCP Shared VPC?

GCP shared VPC allows an [organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) to share or extend its vpc-network (you can also call it subnet) from one projects (called host) to another project (called service/tenant). 

When you use Shared VPC, you designate a project as a _host project_ and attach one or more other _service projects_ to it. The VPC networks in the host project are called _Shared VPC networks_. [Eligible resources](https://cloud.google.com/vpc/docs/shared-vpc#resources_that_can_be_attached_to_shared_vpc_networks_from_a_service_project) from service projects can use subnets in the Shared VPC network.

## Is Shared VPC a replacement of Transit (Hub-Spoke) Network?

Shared VPC is not for transit networking. It does not provide any enterprise grade routing or traffic engineering capabilities. Shared VPC lets [organization administrators](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) delegate administrative responsibilities, such as creating and managing instances, to [Service Project Admins](https://cloud.google.com/vpc/docs/shared-vpc#iam_in_shared_vpc) while maintaining centralized control over network resources like subnets, routes, and firewalls. 

## Aviatrix Transit Network Design Patterns with GCP Shared VPC

Aviatrix supports the GCP Shared VPC model and build the cloud and multi-cloud transit networking architecture to provide enterprise grade routing, service insertion, hybrid connectivity and traffic engineering for the workload VMs. There are number of different deployment model possible but we will focus on two designs with GCP Shared VPC network.

#### Design Pattern#1 – Aviatrix Spoke and Workload VMs in the Shared VPC Network

This is suited for small, PoC or lab deployments where the networking is kept very simple

![](../../media/images/gcp-shared-vpc-network-with-aviatrix-transit-hub-s_image-58.png)
    
    
    [Deployment details for this design pattern are discussed here](https://netjoints.com/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp-shared-vpc-network/ "Design #1")

#### Design Pattern #2 – Aviatrix Transit in Host Project and Workload VMs in Shared VPC Network

  * This is the recommended model for the enterprises
  * The Aviatrix Transit and Spoke GWs are deployed inside the host-project in their respective vpc network
  * These vpc networks are not shared but stay local to the host project
  * The workloads vpc networks are created inside the host project and shared with the service/tenant VPCs using the GCP shared VPC network



![](../../media/images/gcp-shared-vpc-network-with-aviatrix-transit-hub-s_image-55.png)
    
    
    [Deployment details for this design pattern is discussed here](https://netjoints.com/aviatrix-transit-in-host-project-and-workload-vms-in-shared-vpc-network/)
