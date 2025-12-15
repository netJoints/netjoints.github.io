---
title: "Aviatrix CloudWAN Deployment with AWS Global Accelerator"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "December 11, 2019", "https://portal.azure.com", "Click here for Aviatrix product documentation", "azure", "multi-cloud", "Previous\u00a0post Aviatrix CloudWAN Deployment with AWS Global Accelerator", "Next\u00a0post Azure Transit Network Design Patterns"]
tags: []
original_url: https://netjoints.com/aviatrix-controller-deployment-in-azure/
---

Aviatrix Controller (AVX-CTRL) can be deployed in AWS, Azure, GCP or OCI. Only one single AVX-Controller needed for an enterprise multi-cloud deployment. A single AVX-Controller can control, manage and operate resources in an all the public clouds. 

Recently I noticed that more and more enterprises are asking to deploy Aviatrix Controller in Azure. Hence I decided to write this short blog with screen shots. 

## Azure Cloud Portal

This blog assumes that you are somewhat familiar with the Azure Cloud Portal. 

1- Login to Azure Portal @ <https://portal.azure.com>  
2- Click on the Marketplace link (this could be in a different place depending on your customization) as shown in the screen-shot here

![](http://107.23.205.221/wp-content/uploads/2019/12/screen-shot-2019-12-11-at-5.04.04-pm.png?w=1024)Azure Marketplace

3- Search Aviatrix in Azure Marketplace (as shown in the screen-shot below) 

![](http://107.23.205.221/wp-content/uploads/2019/12/screen-shot-2019-12-11-at-5.09.38-pm.png?w=1024)Search Aviatrix and select Aviatrix Platform Bundle – PAYG  


Here you need to select the Aviatrix Bundle – PAYG. 

After that, you will see multiple Aviatrix plans listed on Azure Marketplace page. These plans listed based on your enterprise needs and use-cases. In this deployment I have picked pick “Aviatrix Networking Platform Bundle”

![](http://107.23.205.221/wp-content/uploads/2019/12/screen-shot-2019-12-11-at-5.16.09-pm.png?w=1024) Aviatrix Software plan| Description  
---|---  
Multi-service units and SSL VPN users per BYOL| Each FQDN deployment, site to cloud tunnel, or multi-cloud tunnel is a service unit. You can configure as many as SSL VPN users to access your private cloud with MFA and SMAL on Aviatrix Secure Networking Platform.  
The description of the plan selected for this customer deployment

## Deploy Aviatrix Controller VM in Azure

At this stage, Azure will created the Aviatrix Controller VM. All the steps onward are related to Azure’s Aviatrix VM creation.

![](http://107.23.205.221/wp-content/uploads/2019/12/image-10.png?w=817)Enter basic VM information. Select the default size for now.

![](http://107.23.205.221/wp-content/uploads/2019/12/image-11.png?w=992)Select default disk selection option

* * *

![](http://107.23.205.221/wp-content/uploads/2019/12/image-12.png?w=944)Select the Resource Group (RG) for Aviatrix Controller VM deployment. Aviatrix will create the NSG with proper security automatically

* * *

![](http://107.23.205.221/wp-content/uploads/2019/12/image-13.png?w=990)You can leave the default setting here

* * *

![](http://107.23.205.221/wp-content/uploads/2019/12/image-14.png?w=900)Leave this section with default config.

* * *

![](http://107.23.205.221/wp-content/uploads/2019/12/screen-shot-2019-12-11-at-5.30.14-pm.png?w=990)Tags are important – apply at least name tag to this VM

* * *

![](http://107.23.205.221/wp-content/uploads/2019/12/image-15.png?w=1024)At this state the Aviatrix Controller VM deployment is underway. It will take about 3 to 5 min for this process to compelete.

* * *

## Conclusion

Now that your Aviatrix Controller VM is ready, you can login to the UI by browsing the Public IP address of your controller. The default user name is admin and default password is the “Private IP Address” of Aviatrix Controller VM. 

[Click here for Aviatrix product documentation](https://docs.aviatrix.com/StartUpGuides/azure-aviatrix-cloud-controller-startup-guide.html)
