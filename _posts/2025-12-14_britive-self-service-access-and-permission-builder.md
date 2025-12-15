---
title: "PostgreSQL Just in Time CLI Access | Demo Script"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 24, 2025", "Cybersecurity", "Previous\u00a0post PostgreSQL Just in Time CLI Access | Demo Script", "Next\u00a0post Securing MCP Servers for Agentic AI: A Practical Guide to MCP Security, Authorization, and Runtime Controls"]
tags: []
original_url: https://netjoints.com/britive-self-service-access-and-permission-builder/#respond
---

# Executive Summary

Britive Access Builder is a powerful self-service capability that transforms how organizations manage cloud access requests. It empowers developers, DevOps teams, and business users to request and configure their own access profiles while maintaining robust security controls and compliance requirements.

Traditional access management processes weren’t designed for the speed and agility of the cloud. Slow, manual approvals and fragmented provisioning workflows create frustrating bottlenecks, delaying innovation. Access Builder eliminates these bottlenecks by putting secure, self-service access in the hands of users who need it—without sacrificing security oversight.

## Key Benefits at a Glance

**Benefit**| **Description**  
---|---  
**Self-Service Access**|  Users can request access to existing profiles or create custom profiles with specific permissions  
**Just-In-Time (JIT) Access**|  Roles are created dynamically at time of use and automatically revoked after a configurable period  
**Zero Standing Privileges**|  Eliminates persistent access and overprivileged accounts, granting permissions only when needed  
**Reduced Admin Overhead**|  Automates access creation, approval, and provisioning to free security teams for higher-priority tasks  
**CLI** /Terraform/API Support| For developer all toolsets are available.  
  
# Understanding Access Builder

Access Builder provides two distinct methods for requesting access, giving users flexibility based on their needs:

## Method 1: Request Access to Existing Profiles

Users can request access to profiles that have already been created and configured by administrators. This is the fastest path to gaining access when the required permissions already exist.

  * Profiles and policies are pre-configured by administrators
  * Users simply select the profile and submit a request
  * Approval workflow is triggered automatically
  * Once approved, access is available for checkout



## Method 2: Create Custom Profiles with Specific Permissions

When existing profiles don’t meet specific requirements, users can create their own profiles using available roles and permissions in the target environment. This is particularly powerful for:

  1. Accessing specific AWS services like Bedrock, Secrets Manager, or S3
  2. Creating least-privilege access tailored to a specific task
  3. Combining multiple AWS-managed policies into a single role
  4. Defining custom inline JSON policies for granular control



# Real-World Example: AWS Bedrock Access

This section walks through a practical example of using Access Builder to request access to AWS Bedrock—Amazon’s generative AI service. The same workflow applies to any AWS service such as Secrets Manager, S3, Lambda, and more.

## Use Case: Developer Needs Bedrock Access

A developer on your AI/ML team needs to interact with Amazon Bedrock foundation models for a new project. They need permissions to invoke models, list available models, and apply guardrails. Instead of waiting for an administrator to create a custom role, they can use Access Builder to request exactly what they need.

## Step-by-Step Workflow

### Step 1: Navigate to Access Builder

When I first login as developer I don’t have any access to the any profile. 

![](../../media/images/britive-self-service-access-and-permission-builder_image.png)

Log in to Britive and click on **Access Builder** from the navigation menu. Select your AWS application from the list of available applications.

![](../../media/images/britive-self-service-access-and-permission-builder_image-1.png)

## Step 2: Request a New Profile 

Here you can see I can either select and existing profile I need to access to or request my own custom app request. 

![](../../media/images/britive-self-service-access-and-permission-builder_image-2.png)

So the existing profiles are like a catalog. And based on my manager or approver or manager I can send them request and once they approve my request then I can get access to the profile or permissions. 

For this demo, I will create a brand new request. So I will click on create profile. To get access to AWS BedRock.

![](../../media/images/britive-self-service-access-and-permission-builder_image-3.png)

In the next step I will select the AWS Accounts I want it to connect to or applied to or associated with. I can select one or more or enable it at the org. level. I will select sigma labs

![](../../media/images/britive-self-service-access-and-permission-builder_image-4.png)

Next I will select the security policy and assign members who would get access. And I will add my name (corp developer as member for it)

![](../../media/images/britive-self-service-access-and-permission-builder_image-5.png)

![](../../media/images/britive-self-service-access-and-permission-builder_image-6.png)

Now select AWS permission to be assigned to this profile. We can create a permissions or select exisiting permission

![](../../media/images/britive-self-service-access-and-permission-builder_image-7.png)

Here is how select existing permission screen looks like 

![](../../media/images/britive-self-service-access-and-permission-builder_image-8.png)

For this demo, I will create a new permission role. 

![](../../media/images/britive-self-service-access-and-permission-builder_image-9.png)

Now in the above scene see we have two options. Either select the existing AWS policy or create a new JASON inline policy. 

Following is the inline policy screen. 

![](blob:https://netjoints.com/0322ec8c-f474-4cd8-9a47-102a9bd37fe3)

For this demo We will select the existing policy.

![](../../media/images/britive-self-service-access-and-permission-builder_image-11.png)

Now screen shows like following 

![](../../media/images/britive-self-service-access-and-permission-builder_image-13.png)

![](../../media/images/britive-self-service-access-and-permission-builder_image-14.png)

Now the request is submitted and approver will see it as follows

Here you can see that your request is not in pending state

![](../../media/images/britive-self-service-access-and-permission-builder_image-15.png)

Admin will see it as following on their side

![](../../media/images/britive-self-service-access-and-permission-builder_image-16.png)

Admin will approve

![](../../media/images/britive-self-service-access-and-permission-builder_image-17.png)

Now as developer I have access to it 

![](../../media/images/britive-self-service-access-and-permission-builder_image-18.png)

I can checkout that profile and have access to it now. 

![](../../media/images/britive-self-service-access-and-permission-builder_image-19.png)

![](../../media/images/britive-self-service-access-and-permission-builder_image-20.png)
