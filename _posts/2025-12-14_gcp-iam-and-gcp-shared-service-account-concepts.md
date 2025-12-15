---
title: "Amazon Bedrock AgentCore"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 7, 2025", "Cybersecurity", "Previous\u00a0post Amazon Bedrock AgentCore", "Next\u00a0post What is GCP Pub/Sub?"]
tags: []
original_url: https://netjoints.com/gcp-iam-and-gcp-shared-service-account-concepts/#respond
---

## GCP Shared Service Account Pain Point

**Circumvention of Security Protocols** : One of the pain points in GCP is the standing access for GCP Service Account. This could be very challenging and it could necessitate the need for a tool to control standing access in GCP. Because if you think about it, that the individual account have more granular controls, auditing and MFA that are lost when a developer uses a GCP shared service account. 

**Principle of Least Privilege** : A single service account often has broad permissions, creating a security risk if compromised.

**Access Management Challenges** : Managing and revoking access for numerous service accounts across different projects and developers is administratively complex and prone to error.

## Main Pain Point

  * Developers use shared service accounts and those accounts have a excessive permissions and more importantly standing permissions. 
  * Developer use those service accounts using CLI. Developers use the JASON file that is long standing. Or they. grant the impersonation rights. JASON is more common. 
  * When a GCP developers uses a JSON file, they are directly using a **service account key**. This key is a static, long-lived credential.
  * **GCP Service account impersonation** is a more secure method where a user’s personal identity is used to temporarily “act as” a service account. This avoids the security risks of static key files.



### GCP How Impersonation Works

  * **Principal and Target** : Impersonation involves two identities: the authenticated principal (a developer’s user account) and the target service account.
  * **Permission Check** : The developer’s user account must have the roles/iam.serviceAccountTokenCreatorpermission on the target service account. This permission allows them to create short-lived credentials for that service account.
  * **Requesting Credentials** : The developer’s tool (like the gcloud CLI) uses their personal credentials to request a temporary access token from GCP for the target service account.
  * **Using the Token** : The tool then uses this short-lived token to access GCP services, inheriting the permissions of the service account. The developer never touches a static key file.



### Impersonation vs. JSON Key Files

Feature| Service Account Impersonation| JSON Key Files  
---|---|---  
**Credential Type**|  Short-lived, temporary tokens.| Long-lived, static key files.  
**Security**|  More secure. If a token is stolen, it expires quickly.| Less secure. A stolen key file can be used indefinitely until it is revoked.  
**Authentication**|  The developer’s user account is the authenticated principal.| The JSON key file is the sole form of authentication.  
**Audit Trail**|  Actions are logged with the developer’s user account as the initial actor, along with the service account.| Actions are only logged with the service account’s identity.  
**Best Practice**|  Recommended for most use cases, especially for developers and CI/CD systems.| Discouraged. Only use when there is no alternative, such as with legacy systems outside of GCP.  
  
Impersonation method is the modern, more secure way to provide developers with the necessary access to services like Pub/Sub or Cloud Storage without exposing long-lived, high-risk credentials.
