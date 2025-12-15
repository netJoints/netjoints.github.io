---
title: "The Challenge of Standing Privileges in Snowflake for Admin Account"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 16, 2025", "https://catapult.dev2.aws.britive-app.com/my-access", "Amazon Web Services (AWS) Onboarding Guide", "AWS Identity Center Onboarding Guide", "Britive Connector Onboarding Guide", "Google Cloud Platform (GCP) Onboarding Guide", "Google Workspace Onboarding Guide", "Kubernetes Onboarding Guide", "Microsoft Azure Onboarding Guide", "Okta Onboarding Guide", "Oracle Cloud Infrastructure (OCI) Onboarding Guide", "Oracle Cloud Infrastructure (OCI) v2.0 Onboarding Guide", "Salesforce Onboarding Guide", "ServiceNow Onboarding Guide", "Snowflake Onboarding Guide", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post The Challenge of Standing Privileges in Snowflake for Admin Account", "Next\u00a0post World of Complex Security Compliance Requirement | What Can Britive do?"]
tags: ["Shahzad Ali", "January 16, 2025", "https://catapult.dev2.aws.britive-app.com/my-access", "Amazon Web Services (AWS) Onboarding Guide", "AWS Identity Center Onboarding Guide", "Britive Connector Onboarding Guide", "Google Cloud Platform (GCP) Onboarding Guide", "Google Workspace Onboarding Guide", "Kubernetes Onboarding Guide", "Microsoft Azure Onboarding Guide", "Okta Onboarding Guide", "Oracle Cloud Infrastructure (OCI) Onboarding Guide", "Oracle Cloud Infrastructure (OCI) v2.0 Onboarding Guide", "Salesforce Onboarding Guide", "ServiceNow Onboarding Guide", "Snowflake Onboarding Guide", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post The Challenge of Standing Privileges in Snowflake for Admin Account", "Next\u00a0post World of Complex Security Compliance Requirement | What Can Britive do?"]
original_url: https://netjoints.com/britive-new-tenant-onboarding/
---

  * You will get the Britive tenant URL and temp credentials from Britive sales or customer success team. For example: https://catapult.dev2.aws.britive-app.com
  * 
![](../../media/images/britive-new-tenant-onboarding_image-12-1024x512.png)

  * Login using the temp credentials and change the password
  * Setup MFA (this is a required step and cannot be skipped)
  * Upon login you will see the following blank screen



<https://catapult.dev2.aws.britive-app.com/my-access>

![](../../media/images/britive-new-tenant-onboarding_image-13-1024x562.png)

## UI Overview for a Brand New Tenant 

## Identity Provider Onboarding 

Britive supports many applications out of the box (OOB) for onboarding. Britive then manages the user profiles associated with these applications.

  * [Amazon Web Services (AWS) Onboarding Guide](https://docs.britive.com/v1/docs/britive-aws-integration-guide-introduction)
  * [AWS Identity Center Onboarding Guide](https://docs.britive.com/v1/docs/introduction-awsidentitycenter)
  * [Britive Connector Onboarding Guide](https://docs.britive.com/v1/docs/introduction-britiveconnector)
  * [Google Cloud Platform (GCP) Onboarding Guide](https://docs.britive.com/v1/docs/introduction-gcp)
  * [Google Workspace Onboarding Guide](https://docs.britive.com/v1/docs/introduction-gw)
  * [Kubernetes Onboarding Guide](https://docs.britive.com/v1/docs/introduction-kubernetes)
  * [Microsoft Azure Onboarding Guide](https://docs.britive.com/v1/docs/introduction-azure-integration)
  * [Okta Onboarding Guide](https://docs.britive.com/v1/docs/britive-okta-introduction)
  * [Oracle Cloud Infrastructure (OCI) Onboarding Guide](https://docs.britive.com/v1/docs/introduction-oracle-cloud-integration)
  * [Oracle Cloud Infrastructure (OCI) v2.0 Onboarding Guide](https://docs.britive.com/v1/docs/introduction-oci2)
  * [Salesforce Onboarding Guide](https://docs.britive.com/v1/docs/introduction-salesforce)
  * [ServiceNow Onboarding Guide](https://docs.britive.com/v1/docs/britive-servicenow-introduction)
  * [Snowflake Onboarding Guide](https://docs.britive.com/v1/docs/introduction-snowflake)



First step to integrate Britive with Identify Provider. ID provider provides user/pass and MFA for a user. Basically the “authentication” portion of a human or non-human identity or user. I will use Britive’s OOB OKTA connector but it could be any ID provider.

Britive needs an API token with super administrator privileges that provides access to connect to Okta to read roles, users, and role assignments. After creating the token, the following items are required:

  * Tenant Id
  * API Token


