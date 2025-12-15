---
title: "Cloud Networking and Security Predictions For 2021"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "December 28, 2022", "Before You Begin", "security group management feature", "https://github.com/AviatrixSystems/sandbox-starter", "https://github.com/terraform-aviatrix-modules/terraform-aviatrix-aws-sandbox-starter", "container code is available here", "cloud-networking", "Previous\u00a0post Cloud Networking and Security Predictions For 2021", "Next\u00a0post Google Private Service Connect (PSC) Configuration for Google APIs"]
tags: []
original_url: https://netjoints.com/cloud-sandbox-starter-advance-mode/
---

​Advance mode is for users who want to change the region, naming convention, and subnet scheme.

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)![](blob:https://netjoints.com/282d0152-966e-40f0-8c94-17cab41f2ba5)​ 

### Provide AWS Credentials

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/a63556dd-9765-45e0-aca5-add37ce412b8)

Before launching the controller, you can change the region and subnet details as shown in the following screenshot.

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/b9e33350-f873-43d5-a059-57eb2f55a196)

#### Notes

  * Be sure to subscribe to the AWS marketplace offerings mentioned in the [Before You Begin](/t/g9hx9jh/aviatrix-sandbox-starter-tool-spin-up-cloud-networks-in-minutes#before-you-begin) section above and set up your account to generate the Controller License required as input.
  * In the future, we might add the option to launch Controller in other Clouds 



### Launch Global Transit (Hub) and two Spokes in AWS

Launch Aviatrix Global Transit (Hub) and two Spokes in the AWS region as per your requirement.

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/9be19d57-0be1-4c88-a623-6101b0f6fc70)

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/dec448e3-0e16-4c59-a297-e564a43a1738)

### Launch Test EC2 instances

Test EC2 (Amazon Linux VMs) will be launched in their respective Spoke VPCs

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/46c0983f-fecb-42d2-b9ee-4cc74ad4c566)

**Provide an Existing Key Pair Name**

This must be configured in your AWS account in **us-east-2** (Ohio) region as per-requisite. You will need this Key Pair to login to test EC2 instances to verify the end-to-end connectivity. 

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/20739449-3c34-4b30-9e9a-0bdb244f9977)

This concludes the deployment in AWS. Optionally you can also deploy Aviatrix Transit network in Azure and provide connectivity between AWS and Azure clouds.

### Launch Aviatrix Transit in Azure

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/90dcb763-b1b5-4d4c-b94b-933c1130c1ad)

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/7dd6993d-bf4e-46c8-8e19-888d92760391)

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/358c0af2-93f6-43de-aa7a-d3ee49aba8d6)

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/67893d3e-66e4-4aea-98e9-585ede108712)

### Connect AWS and Azure with a Single Click

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/7dc2255c-aeef-43c4-8e8e-dff0b9e7dbb8)

### Success Screen

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/4f0cb620-6e4b-40fe-a5df-0d615e89e4bb)

## Lock Inbound Access to Controller

After the Controller is deployed, you must do the following to lock the inbound access so that no one has access to it.

1- Enable the [security group management feature](https://docs.aviatrix.com/HowTos/FAQ.html#enable-controller-security-group-management) so all of the gateways’ IP addresses are allowed to reach the controller on HTTPS/port 443

2- Lock all inbound access to Controller except your IP address ​

​

##  Destroy / Delete the entire Sanbox LAB

Once you are done testing and validating Cloud Networks, you may destroy or delete the entire lab. First, turn off AWS access security on the controller by logging into the controller and clicking on “Settings” in the left-hand nav. Click on “Controller,” then “Access Security” in the top tabs. Under “Controller Security Group Management,” click “Disable”.

![](../../media/images/cloud-sandbox-starter-advance-mode_547.png)​ ![](blob:https://netjoints.com/b2484db3-9a35-40bc-b52f-1134155b60cd)

Back in the sandbox starter, use the “Destroy” option on the top right of the browser UI.

If you destroyed SST before getting a chance to destroy your environment, you will need to manually delete these resources in order (always check you are in the appropriate region first):

  1. Terminate the Spoke and Transit gateways in AWS (if applicable)
  2. Remove the Resource Groups in Azure (if applicable)
  3. Disable Termination Protection on the EC2 instance for the Controller
  4. Terminate the Controller EC2 instance
  5. Remove the SSH keypair
  6. Delete the Security Groups
  7. Delete the VPC where the Gateways and Controller was deployed
  8. Delete the IAM Roles and Policies starting with ‘aviatrix’



Note that if you deployed CoPilot, it must be deleted manually by logging into AWS/Azure Console.

## Support Model

This community-based and open-source tool is **NOT** supported by the Aviatrix Enterprise support team. For any questions or issues related to this tool, please use the Aviatrix Community platform.

### Open Source

  1. Code for this open-source tool is available at <https://github.com/AviatrixSystems/sandbox-starter>
  2. Terraform module for Sandbox Starter launch is available here at <https://github.com/terraform-aviatrix-modules/terraform-aviatrix-aws-sandbox-starter>
  3. The [container code is available here](https://github.com/AviatrixSystems/sandbox-starter/blob/main/Dockerfile)



​
