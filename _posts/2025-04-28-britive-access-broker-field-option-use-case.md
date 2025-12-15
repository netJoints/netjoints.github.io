---
title: "Azure PIM: Key Differences You Need to Know"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "April 28, 2025", "https://github.com/britive/access-broker-examples/blob/main/Aurora%20MySQL/permissions/temp-user/checkout.sh", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Azure PIM: Key Differences You Need to Know", "Next\u00a0post Difference Between RDS, AWS Aurora and MySQL"]
tags: ["Shahzad Ali", "April 28, 2025", "https://github.com/britive/access-broker-examples/blob/main/Aurora%20MySQL/permissions/temp-user/checkout.sh", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Azure PIM: Key Differences You Need to Know", "Next\u00a0post Difference Between RDS, AWS Aurora and MySQL"]
original_url: https://netjoints.com/britive-access-broker-field-option-use-case/
---

Britive Access Broker is powerful and extendable. In the Resource Type area there is an option to add “Fields”. 

![](../../media/images/britive-access-broker-field-option-use-case_image-1.png)

“fields” can be referenced in the checkout/checkin scripts. It is an optional field. This is how one resource of the same type can identified differently from the other. 

“ServerUlr” for example can be a field on resource type and every resource of that type will have different value. its like a schema attribute for that resource-type. you can send them to a checkout/checkin script via a profile, reference-able as resource.

## Example

Following example shows that we have a resource called “Dev Database”. The type for this resource is “Aurora MySQL”. It has the server URL and Secretname at the end too. 

![](../../media/images/britive-access-broker-field-option-use-case_image-3.png)

This is referenced in the “Access Profile” as shown below

![](../../media/images/britive-access-broker-field-option-use-case_image-4-scaled.png)

If you look at the script example, you can see it is being referenced there. 

<https://github.com/britive/access-broker-examples/blob/main/Aurora%20MySQL/permissions/temp-user/checkout.sh>

![](../../media/images/britive-access-broker-field-option-use-case_image-5.png)
