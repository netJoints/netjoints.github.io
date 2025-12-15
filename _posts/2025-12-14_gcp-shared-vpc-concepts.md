---
title: "AWS Direct Connect and Direct Connect Gateway Scale Limits"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "February 14, 2020", "multi-cloud", "Previous\u00a0post AWS Direct Connect and Direct Connect Gateway Scale Limits", "Next\u00a0post GCP Networking Best Practices"]
tags: []
original_url: https://netjoints.com/gcp-shared-vpc-concepts/#respond
---

> Warning: Setting up GCP Shared VPC is not easy. It requires various API rights and roles before you are allowed to create it from the UI. I had to do lots of hit and trials. The GCP documentation is not clear and not straightforward. I am the super admin for my GCP organization called netjoints.com and still I had to enable many roles in different places to create a shared service VPC

There are two types (host and service) of projects in GCP

  * Host Project(s)
    * Host project are created using Shared VPC option
    * Simply put, host project shares subnets with the service projects
    * In majority of the cases, one host project is enough
  * Service Projects
    * This is where actual VMs are being deployed
    * The VM is being deployed in a subnet that is shared by “Shared VPC Host Project”



Following diagram illustrate the concept and relation between Shared VPC host project and Service Prpject

![Service project to multiple VPCs](https://cloud.google.com/solutions/images/vpc-bps-service-project-multiple-vpcs.svg)

## Setting up Shared VPC Host Project

First step to create a standard GCP Project that will be treated as Host Project. It is good practice to name it Host Project.

Then enable GCP Shared VPC

![](../../media/images/gcp-shared-vpc-concepts_image-6-1024x695.png)

Select “Setup Shared VPC”

![](../../media/images/gcp-shared-vpc-concepts_image-1-1024x606.png)

![](../../media/images/gcp-shared-vpc-concepts_image-7-1024x638.png)

Save & Continue will take you to following screen. 

![](../../media/images/gcp-shared-vpc-concepts_image-9-953x1024.png)

In the above screen shot, I am sharing all my subnets. Depending on your org. policy, you might want to share few but not all.

![](../../media/images/gcp-shared-vpc-concepts_image-10-955x1024.png)

![](../../media/images/gcp-shared-vpc-concepts_image-11-955x1024.png)

Following are some requirements where a shared service VPC (aka Host Project) is needed

  * Use Shared VPC for administration of multiple working groups
  * Use multiple host projects if resource requirements exceed the quota of a single project
  * Use multiple host projects if you need separate administration policies for each VPC network
  * Create a shared services VPC if multiple VPC networks need access to common resources but not each other



Now create VPC in shared services

![](../../media/images/gcp-shared-vpc-concepts_image-12-1024x1016.png)

![](../../media/images/gcp-shared-vpc-concepts_image-13-1024x1016.png)

Now that the Host Project owner has created the subnets, he/she can share them with the Service Project as necessary. Following screen shows members being added to the Shared VPC and their roles assigned according to your org. policy. 

> Service Projects need to have Compute Engine API enabled to be configured as service projects.

![](../../media/images/gcp-shared-vpc-concepts_image-17-300x249.png)

> ![](../../media/images/gcp-shared-vpc-concepts_image-14-1024x723.png)

Now in the next step, we will attach the service project called “Service Project A” to the shared VPC. 

![](../../media/images/gcp-shared-vpc-concepts_image-15-1024x548.png)

Select the name of the service project from the shared VPC UI as shown below

![](../../media/images/gcp-shared-vpc-concepts_image-16-827x1024.png)

Finally you can see in the following screen that Service Project is successfully attached with the Shared VPC and all subnets are being shared

![](../../media/images/gcp-shared-vpc-concepts_image-18-1024x559.png)

Following screen shot shows the view from the Service Project-A side of the house. You can see the networks shared to this service project. Now the compute resources can consume these subnets. 

![](../../media/images/gcp-shared-vpc-concepts_image-20-1024x567.png)
