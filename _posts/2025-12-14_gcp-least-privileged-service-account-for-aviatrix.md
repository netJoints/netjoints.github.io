---
title: "Aviatrix Ingress Filtering Deployment with AWS ALB (Application Load Balancer)"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 28, 2020", "https://docs.aviatrix.com/HowTos/CreateGCloudAccount.html", "cloud-networking", "Previous\u00a0post Aviatrix Ingress Filtering Deployment with AWS ALB (Application Load Balancer)", "Next\u00a0post Onboarding GCP Project in Aviatrix Controller with Restricted Access"]
tags: []
original_url: https://netjoints.com/gcp-least-privileged-service-account-for-aviatrix/#respond
---

Aviatrix controller provides unified control and management plane for Google Cloud. Aviatrix allows enterprises to on-board hundreds of GCP projects/accounts into the controller. Once these projects are on-boarded, Aviatrix controller is intelligent to control and manage networking and security across those projects. 

On the Aviatrix document page one of the options is to use the “Editor” service account to on-board the project. 

<https://docs.aviatrix.com/HowTos/CreateGCloudAccount.html>

This might not be desirable for many enterprises as they would want to use least privileged service account credentials. In such a situation Aviatrix recommendation is to have at least following roles assigned to service account so that Aviatrix can perform its functions properly. For instance managing the compute resources, route tables, firewall rules, shared service vpc network etc. 

  * Compute Admin
  * Service Account User
  * Organization Administrator (optional and required for Shared VPC)
  * Project IAM Admin (optional and required for Shared VPC)

![](../../media/images/gcp-least-privileged-service-account-for-aviatrix_Screen-Shot-2020-09-28-at-2.28.46-PM.png)
