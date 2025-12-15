---
title: "GCP Least Privileged Service Account for Aviatrix"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 28, 2020", "https://cloud.google.com/iam/docs/service-accounts", "adding a constraint to your organization policy", "https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_service_account_default_grants", "default service accounts", "cloud-networking", "Previous\u00a0post GCP Least Privileged Service Account for Aviatrix", "Next\u00a0post Aviatrix Spoke GW and Workload VMs in Same GCP Shared VPC Subnets"]
tags: []
original_url: https://netjoints.com/onboarding-gcp-project-in-aviatrix-controller-with-restricted-access/
---

## Problem Statement

By default GCP Compute Service Account permissions are wide open with the Editor role. Here is how you can see the problem yourself.

### **Create a new GCP Project**

Notice the “Service Accounts” area and notice that there is no account there yet. 

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-42.png)

### Enable Compute API for PCI Service Project

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-43.png)

### Default GCP Service Account

A default Compute Engine GCP service account (845482233226-compute@developer.gserviceaccount.com) is created as you can see from the following diagram

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-44-1024x407.png)

More details about this default compute engine service account can be seen in the following diagram

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-45.png)

### IAM Permissions For Default Compute Account

If you go back to IAM area, notice the the default compute account is there. By default it comes with “Editor” permission. Editor is a wide open permission and should not be used in production for a service account

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-47.png)

## How to Fix this Problem?

The fix is not difficult. There is an automated way and a manual way. I will explain the manual method and have provided URL for the automated way as well.

### Change the permission on GCP Default Compute Service Account

When a VM (such as Aviatrix Egress FDQN, User-VPN, Transit, Spoke GW etc.) is deployed in the GCP Project, the GCP project automatically associates a **Default Service Account** with it. It is the default GCP behavior and cannot be changed. **Notice that this account is different than the account we created to on-board the GCP project into Aviatrix Controller**

There are two methods to restrict the permission for the default service account

1- Automated Method: Global IAM setting to disable automatic role grant for Default Service Account

2- Manual Method: Change the permission for Default Service Account

#### 1- Automated Method: Global IAM Setting to disable automatic role grant

GCP recommends production customers to disable automatic role grant to default service accounts

<https://cloud.google.com/iam/docs/service-accounts>

_“When a default service account is created, it is automatically granted the Editor role (roles/editor) on your project. This role includes a very large number of permissions. To follow the principle of least privilege, we strongly recommend that you disable the automatic role grant by[adding a constraint to your organization policy](https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_service_account_default_grants), or by revoking the Editor role manually.”_

<https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_service_account_default_grants>

Some Google Cloud services automatically create [default service accounts](https://cloud.google.com/iam/docs/service-accounts#default). When a default service account is created, it is automatically granted the Editor role (`roles/editor`) on your project.

To improve security, we strongly recommend that you disable the automatic role grant. Use the `iam.automaticIamGrantsForDefaultServiceAccounts` boolean constraint to disable the automatic role grant.

### 2- Manual Method: Change the permission for Default Service Account

In my setup I used the manual method to change the permission for default service account. I assigned the least possible access role to this new member PCI. Aviatrix at minimum would need 

  * Compute Admin
  * Service Account User
  * Organization Admin and 
  * Project IAM Admin role. 



> Note: Organization Admin and Project IAM Admin roles are only needed for “Shared VPC”. Skip those roles if you are not planning to use “Shared VPC”

Following screen shows the example of editing the permission for a memeber

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-59.png)

After you save, it should look like following

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-33-1024x343.png)

**Now select/click this “Service Account” area under “IAM & Admin”**

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-34-1024x338.png)

Now “Create new key” key for this service account. 

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-35.png)

The type must be Json

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-36.png)

The new key is created and downloaded on your machine now 

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-37.png)

This Jason key is what we will use to on-board the GCP account in the Aviatrix Controller

Following is the sample of how it looks like
    
    
    {
      "type": "service_account",
      "project_id": "service-project-pci",
      "private_key_id": "----ID HERE----",
      "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n",   
      "client_email": "pciserviceaccount@service-project-pci.iam.gserviceaccount.com",
      "client_id": "----ID HERE -----",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/pciserviceaccount%40service-project-pci.iam.gserviceaccount.com"
    }
    

Now under Aviatrix Controller –> Access Account, onboard the GCP Project as shown in the following diagram. Leave the Project ID filed blank. Controller will automatically pick the name

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-39.png)

Following diagram shows that on-boarding GCP project was a success

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-41.png)

## Deploy Aviatrix Gateway For GCP Project

Now when I deploy the Aviatrix GW, it will be using the restricted permission to connect to GCP and then when the GW is deployed. 

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-4-946x1024.png)

### GW Deployment Progress on GCP 

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-50-1024x762.png)

Controller shows the following output

[12:39:07] Starting to create GW gcp-spk-gw1-pci.  
[12:39:08] Connected to GCE.  
[12:39:13] Project check complete.  
[12:39:14] License check is complete.  
[12:39:23] Updating IGW for new gateway…  
[12:39:31] Launching compute instance in GCE….  
[12:40:34] GCE compute instance created successfully.  
[12:40:34] Updating DB.  
[12:40:34] Added GW info to Database.  
[12:40:36] AVX SQS Queue created.  
[12:40:36] Creating Keys.  
[12:41:03] Initializing GW…..  
[12:41:03] Copy configuration to GW gcp-spk-gw1-pci done.  
[12:41:04] Copy new software to GW gcp-spk-gw1-pci done.  
[12:41:05] Copy misc new software to GW gcp-spk-gw1-pci done.  
[12:41:05] Copy scripts to GW gcp-spk-gw1-pci done.  
[12:41:05] Copy sdk to GW gcp-spk-gw1-pci done.  
[12:41:10] Copy libraries to GW gcp-spk-gw1-pci done.  
[12:41:10] Installing software ….  
[12:41:11] Issuing certificates …  
[12:41:27] Issue certificates done

Instance creation can now show you following

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-52.png)

On the GCP VM Instance notice that Aviatrix does not assign any service account or allow access to any GCP Cloud API for additional security. 

![](../../media/images/onboarding-gcp-project-in-aviatrix-controller-with_image-5.png)
