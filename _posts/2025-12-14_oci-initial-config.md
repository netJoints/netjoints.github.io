---
title: "Multi-Cloud Transit Design: Interworking with On-Prem and/or Cloud Devices/Services"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 16, 2019", "https://docs.aviatrix.com/HowTos/oracle-aviatrix-cloud-controller-onboard.html", "cloud-networking", "multi-cloud", "aviatrix", "oci", "Previous\u00a0post Multi-Cloud Transit Design: Interworking  with On-Prem and/or Cloud  Devices/Services", "Next\u00a0post Aviatrix Multi-Cloud Oracle Cloud (OCI) Transit Network Setup with GCP"]
tags: ["Shahzad Ali", "October 16, 2019", "https://docs.aviatrix.com/HowTos/oracle-aviatrix-cloud-controller-onboard.html", "cloud-networking", "multi-cloud", "aviatrix", "oci", "Previous\u00a0post Multi-Cloud Transit Design: Interworking  with On-Prem and/or Cloud  Devices/Services", "Next\u00a0post Aviatrix Multi-Cloud Oracle Cloud (OCI) Transit Network Setup with GCP"]
original_url: https://netjoints.com/oci-initial-config/#respond
---

## Introduction

Aviatrix controller makes it extremely simple to on-board Oracle OCI. Take a look at the screen shots here and follow along.

> If you are new to OCI and OCI terminologies, it is strongly recommended to read this article before moving forward.   
> https://docs.aviatrix.com/StartUpGuides/oracle-aviatrix-cloud-controller-startup-guide.html

The Aviatrix Controller is multi cloud, multi subscription, multi account and multi region capable appliance/VM/instance. Launching the Controller in any public cloud will also enable you to deploy and manage networking and security in any other public cloud.

In our setup, Aviatrix Controller is already deployed and running in AWS. Bill for using Aviatrix services will still be billed to AWS billing account. One has to pay for the utilization of OCI resources in the OCI billing system.

On the controller UI

1- Click on-boarding option  
2- Select Oracle Cloud Infrastructure (OCI) option

![](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-10.04.17-am.png?w=683)Oralce Cloud Onboarding Process

After step#2, you are presented with the following screen.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-8.png?w=746)

### OCI Account , Tenancy and Compartment Details

The purpose of on-boarding is to help you setup an account on the Aviatrix Controller (AVX-CTRL) that corresponds to an OCI account with compartment policies, so that the Aviatrix Controller can launch Aviatrix GWs using OCI APIs. For on-boarding the OCI account in the AVX-CTRL, we need following four pieces of information from OCI console.

  * User OCID
  * Tenancy OCID
  * Compartment OCID
  * API Private Key File



### User OCID

User OCID information is collected from Identity section.

![](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-11.26.46-am-1.png)

### Tenancy OCID

Tenancy OCID information is collected by navigating in the OCI Console’s Administration section (OCI Console –> Administration –>Tenancy Details)

![](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-12.31.22-pm-1.png)

### Compartment OCID

Compartment or department OCID can be gathered by navigating in the Identity section of OCI console ( OCI Console –> Identity –>Compartments)

![](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-12.37.22-pm-1.png)

### Generate Public and Private Keys

The commands here are valid for Mac and Linux OS. For Windows, you need to install “Git bash for Windows”

$ openssl genrsa -out oci_api_private_key.pem 2048  
$ chmod go-rwx oci_api_private_key.pem  
$ openssl rsa -pubout -in oci_api_private_key.pem -out oci_api_public_key.pem  
$ cat oci_api_private_key.pem | pbcopy

Refer to following doc for detailed steps

<https://docs.aviatrix.com/HowTos/oracle-aviatrix-cloud-controller-onboard.html>

## OCI Onboarded

At this point OCI is on-boarded. Notice that beside OCI, we have AWS, Azure and GCP on-boarded under the same controller as well.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-9.png)OCI Account Onboarded

### Create Transit VPC

To make sure the connectivity is established between Aviatrix Controller and OCI, we will create a OCI Transit VCN (VCN is equivalent to VPC in AWS) directly from Aviatrix Controller UI. This Transit VCN will also be used in the subsequent testing.

![OCI VCN Created From Aviatrix Controller](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-6.24.25-pm-1.png)OCI VCN Created From Aviatrix Controller

Following screen shot taken from OCI console shows that VCN was successfully created from Aviatrix Controller.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-10.png)VCN Created in Finance Compartment. This is the one we provided during account on-boarding

Also notice that beside creating the simple VCN, Aviatrix Controller also creates following

  * Public and Private subnets inside the VCN
    * These subnets are created and managed for private and public routing tables
  * Private and Public Routing tables
  * Internet Gateway

![](http://107.23.205.221/wp-content/uploads/2019/10/image-11.png)VCN details show that AVX-CTRL created the VCN and Public and Private Subnets as well

Following screen shot shows the routing tables created by Aviatrix Controller. 

![](http://107.23.205.221/wp-content/uploads/2019/10/image-12.png)Route Tables created by AVX-CTRL automation

![](http://107.23.205.221/wp-content/uploads/2019/10/image-13.png)Internet Gateway (IGW) was also created by AVX-CTRL at the time of VCN creation ![AVX-CTRL associates Public subnet to a Public Route Table](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-6.35.18-pm-1.png)AVX-CTRL associates Public subnet to a Public Route Table ![](http://107.23.205.221/wp-content/uploads/2019/10/image-14.png)This public route table has a default route that points to OCI IGW for Internet Traffic

## Conclusion

This initial configuration shows the OCI account on-boarding and deployment of one Transit VPC with associated subnets and route table. The AVX-CTRL makes it easy and seamless to deploy multi-clouds with the same look and feel and without worrying about underneath constructs.
