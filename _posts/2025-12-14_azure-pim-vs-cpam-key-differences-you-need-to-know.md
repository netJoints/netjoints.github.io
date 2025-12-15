---
title: "Britive API / CLI to Trigger Cloud Data Scan"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "April 26, 2025", "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-roles", "https://www.reddit.com/r/AZURE/comments/17ha400/azure_pim_with_on_premises_server/", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Britive API / CLI to Trigger Cloud Data Scan", "Next\u00a0post Britive Access Broker \u201cField\u201d Option Use-Case"]
tags: ["Shahzad Ali", "April 26, 2025", "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-roles", "https://www.reddit.com/r/AZURE/comments/17ha400/azure_pim_with_on_premises_server/", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Britive API / CLI to Trigger Cloud Data Scan", "Next\u00a0post Britive Access Broker \u201cField\u201d Option Use-Case"]
original_url: https://netjoints.com/azure-pim-vs-cpam-key-differences-you-need-to-know/
---

Azure PIM (Privilege Identity Management) is a valuable tool, but can it truly meet the comprehensive Privileged Access Management (PAM) requirements of modern enterprises? This article explores its capabilities and limitations.

## Key Use Cases Azure PIM Does Not Fully Address:

Here are a few examples:

  * Azure PIM primarily focuses on Azure AD groups and roles. It does not support non-Azure AD groups. For example Azure PIM does not support specific roles within Exchange RBAC or SharePoint RBAC. <https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-roles>
  * Azure PIM cannot generate ephemeral tokens for JIT sessions. This capability is often required by DevOps users who need a temporary, disposable token along with their JIT entitlement for automated tasks and scripting.
  * Azure PIM only allows for adding or removing an existing user ID to a group. Azure PIM cannot make the User ID ephemeral.
  * Azure PIM currently lacks comprehensive management capabilities for non-human identities (like service principals or managed identities) in privileged access scenarios.
  * A command-line interface (CLI) option is not a native feature of Azure PIM.
  * Azure PIM’s does not work for on-prem Servers, Databases, Networking Devices, Firewalls and Kubernetes. <https://www.reddit.com/r/AZURE/comments/17ha400/azure_pim_with_on_premises_server/>



## **In Summary:**

While Azure PIM is excellent for managing privileged identities within a purely Azure environment, its design does not inherently extend to multi-cloud or on-premises use cases. This can present significant challenges for organizations with hybrid or multi-cloud strategies looking for a unified PAM solution as they expand beyond Azure.
