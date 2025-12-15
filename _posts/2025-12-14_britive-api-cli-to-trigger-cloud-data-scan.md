---
title: "Kubernetes Access Security and IAM"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "April 22, 2025", "https://docs.britive.com/docs/manage-scans", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Kubernetes Access Security and IAM", "Next\u00a0post Azure PIM: Key Differences You Need to Know"]
tags: ["Shahzad Ali", "April 22, 2025", "https://docs.britive.com/docs/manage-scans", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Kubernetes Access Security and IAM", "Next\u00a0post Azure PIM: Key Differences You Need to Know"]
original_url: https://netjoints.com/britive-api-cli-to-trigger-cloud-data-scan/
---

At a high level, there are two way to Scan in Britive

1- On-Demand Scan  
2- Scheduled Scan

Customers typically have Scheduled Scan enabled.

Also, customers typically initiate a on-demand scan in their pipeline, after the application configuration is complete but before creating roles or assignments that depend on users, groups, or entitlements discovered by that scan.

For example, after you add a new permission in Azure or add new user in GCP Workspace or after you create a new account or add account to a Group in Azure EntraID.

## Scan Trigger Steps using CLI

First run the pybritive command to get the list of Applications onboarded in Britive. 
    
    
    # pybritive api applications.list -f json
    [
      {
        "applicationName": "Britive Azure Tenant",
        "type": "Azure",
        "appContainerId": "1okgqzylbrbb6a1t4pt2",
        "description": "Azure Test tenant",
        "status": "active",
        "environmentsCount": 1,
        "profilesCount": 10,
        "usersCount": 582,
        "iconUrl": "/images/app_logos/azure.png"
      },
    
    {
        "applicationName": "B4B",
        "type": "Britive",
        "appContainerId": "1pemxhaq9qv7t6jyr0ld",
        "description": " ",
        "status": "active",
        "environmentsCount": 2,
        "profilesCount": 3,
        "usersCount": 81,
        "iconUrl": "/images/app_logos/britive.png"
    },

This will give you the AppContainerId. You take that Id 1okgqzylbrbb6a1t4pt2 and then run following to start the scan
    
    
    # pybritive api applications.scan --application-id 1okgqzylbrbb6a1t4pt2

Following is what you would see in the Britive UI

![](../../media/images/britive-api-cli-to-trigger-cloud-data-scan_image-scaled.png)

## Summary

This is powerful and as you can see using the API/CLI programatic approach it gives you lot of flexibility.

<https://docs.britive.com/docs/manage-scans>
