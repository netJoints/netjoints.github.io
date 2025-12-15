---
title: "Kubernetes Just in Time Access"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "July 8, 2025", "1", "Britive Terraform provider", "Cybersecurity", "britive", "Previous\u00a0post Kubernetes Just in Time Access", "Next\u00a0post Amazon Bedrock AgentCore"]
tags: ["Shahzad Ali", "July 8, 2025", "1", "Britive Terraform provider", "Cybersecurity", "britive", "Previous\u00a0post Kubernetes Just in Time Access", "Next\u00a0post Amazon Bedrock AgentCore"]
original_url: https://netjoints.com/okta-identity-provider-integration-with-britive-getting-started-guide/
---

You can use **Britive Terraform** to manage **Okta as an identity provider** and to **provision SCIM users** , but with some important clarifications:

### ✅ Okta Integration with Britive

Britive supports integration with Okta for both:

  * **SSO via SAML** (Okta as an identity provider)
  * **User provisioning via SCIM** (Okta to Britive)



To set this up:

  1. **Create an Identity Provider in Britive** : 
     * Go to **Admin → Identity Management → Identity Providers**.
     * Add a new provider with type **SAML** for Okta.
  2. **Enable SCIM Provisioning** : 
     * In Britive, go to the **SCIM tab** and configure a **Generic SCIM provider**.
     * Generate a **SCIM URL** and **Bearer Token**.
     * Use these in Okta to configure SCIM provisioning.
  3. **Map User Attributes** : 
     * Britive requires attributes like `Email`, `First Name`, `Last Name`, `Username`, and `Status`.
     * You can also map additional attributes 1.



–> Add Identity Provider 

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image.png) ![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-1.png) ![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-2.png)

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-3.png)

Now click on “CREATE TOKEN” with 90 days rotation option. Now it will look like following 

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-4.png)

## OKTA Side Setting for SCIM

## Step 1: Create a SAML Application in Okta

  1. **Log in to Okta Admin Console**.
  2. Navigate to **Applications → Applications**.
  3. Click **Create App Integration**.
  4. Choose **SAML 2.0** and click **Next**.
  5. Fill in the **General Settings** : 
     * App name: `Britive`
     * App logo (optional)

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-5.png) ![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-6.png) ![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-7.png)

## Step 2: Configure OKTA SAML Settings

In the **SAML Settings** section:

  * **Single sign-on URL** :  
Get this from Britive (e.g., `https://<your-tenant>.britive-app.com/sso/saml/acs`)
  * **Audience URI (SP Entity ID)** :  
Also from Britive (e.g., `https://<your-tenant>.britive-app.com/sso/saml/metadata`)
  * **Name ID format** : `EmailAddress`
  * **Application username** : `Email`



![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-8.png) ![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-9.png) ![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-10.png)

## Step 3: Assign OKTA Users to the App

  * Go to the **Assignments** tab.
  * Assign users or groups who should have access to Britive.

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-11.png)

We will use group assignment option. 

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-12.png)

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-13.png)

## Step 4: Download Metadata

  * In the app settings, click **Sign On** tab.
  * Click **View SAML setup instructions**.
  * Copy the **Metadata URL** or download the **XML file**.
  * Use this in your Terraform config or Britive UI.

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-14.png)

## Step 5: Configure SCIM

  1. In Okta, go to the **Britive app** → **Provisioning** tab.
  2. Click **Configure API Integration**.
  3. Enable SCIM and enter: 
     * **SCIM Base URL** : From Britive SCIM settings
     * **Bearer Token** : From Britive SCIM settings
  4. Test the connection.
  5. Enable provisioning features: 
     * Create Users
     * Update User Attributes
     * Deactivate Users

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-15.png)

![](../../media/images/okta-identity-provider-integration-with-britive-ge_image-16.png)

### Terraform Support

The [Britive Terraform provider](https://github.com/britive/terraform-provider-britive) allows you to manage many Britive resources, including:

  * Identity providers
  * Permission sets
  * Groups
  * Roles



However, **SCIM provisioning and user management via Okta** is typically configured **outside of Terraform** , directly in the Okta and Britive admin consoles. The Terraform provider is more focused on managing Britive-native configurations and policies

### Summary

  * **Yes** , you can integrate Okta as an identity provider and use SCIM for user provisioning in Britive.
  * **Terraform** can manage Britive configurations, but **SCIM setup is manual** via the Britive and Okta UIs.


