---
title: "Which one is better? Britive or CyberARK"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 16, 2025", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Which one is better? Britive or CyberARK", "Next\u00a0post Britive New Tenant Onboarding"]
tags: ["Shahzad Ali", "January 16, 2025", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Which one is better? Britive or CyberARK", "Next\u00a0post Britive New Tenant Onboarding"]
original_url: https://netjoints.com/the-challenge-of-standing-privileges-in-snowflake-for-admin-account/
---

Snowflake is a powerful data warehousing platform that offers a variety of features to help organizations manage and analyze their data. However, one of the challenges of using Snowflake is that it requires admins to have standing privileges (persistent rights or static permissions). 

Roles like ACCOUNTADMIN are often shared across teams, increasing the risk of misuse or accidental exposure.

Britive’s Privileged Access Management (PAM) solution can help to mitigate these risks by providing a number of features that help to control and manage access to Snowflake. These features include:

  * **Just-in-Time (JIT) access:** Britive can be used to grant users temporary access to Snowflake, only when they need it. 
  * **Least privilege:** Britive can be used to enforce the principle of least privilege, which means that users are only granted the access they need to do their jobs. 
  * **Activity Monitoring:** Britive can be used to monitor all activity on Snowflake.
  * **Audit Trails:** Britive can be used to create audit trails of all activity on Snowflake. 



## Snowflake JIT Demo

Following demo showcases the power of Britive’s Privileged Access Management (PAM) solution in enhancing security with zero-trust access control within a Snowflake environment.

**Initial State:** An admin user, “SHAHZADALI,” has access to the Snowflake UI. However, due to the principle of least privilege, this user does not inherently possess administrative rights or have any admin roles assigned. This aligns with best security practices, minimizing the risk of accidental or malicious misuse of elevated privileges.  
  
**Britive Integration:** Utilizing Britive’s PAM capabilities, “SHAHZADALI” requests temporary access to the “ACCOUNTADMIN” role within Snowflake. This request is subject to appropriate approval workflows within the Britive platform, ensuring proper authorization before granting elevated privileges.

**Just in Time Role Assignment:** Upon approval, Britive (integrated with Snowflake) dynamically grants “SHAHZADALI” the requested “ACCOUNTADMIN” role. This time bound administrative privilege could also be extended or “checkedin” sooner depending on the task. 

**Elevated Access:** In the demo, after the successful role assignment, “SHAHZADALI” refreshes the Snowflake UI. The user interface now reflects the newly granted permissions, displaying the “ACCOUNTADMIN” role alongside other available roles such as “ORGADMIN” and “USERADMIN.” This dynamic access provisioning allows “SHAHZADALI” to efficiently switch between different administrative roles based on the specific tasks at hand.

## Summary

If you are an ACCOUNTADMIN for Snowflake, I recommend that you consider using Britive’s PAM solution to help you manage and secure your Snowflake environment. By using Britive’s PAM solution, organizations can help to ensure that their Snowflake environment is secure and compliant.
