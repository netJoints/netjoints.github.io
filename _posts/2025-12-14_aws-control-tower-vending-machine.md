---
title: "AWS Landing Zone"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "AWS Landing Zone", "Landing zone versions", "AWS Control Tower release notes", "Landing Zone Accelerator on AWS", "list", "Landing Zone Accelerator", "cloud-networking", "Previous\u00a0post AWS Landing Zone", "Next\u00a0post AWS Direct Connect (DX)"]
tags: []
original_url: https://netjoints.com/aws-control-tower-vending-machine/
---

AWS Control Tower automates the setup of a new [AWS Landing Zone](https://netjoints.com/aws-landing-zone/ "AWS Landing Zone") using best-practices blueprints for identity, federated access, and account structure. AWS Control Tower orchestrates the capabilities of several other AWS services, including AWS Organizations, AWS Service Catalog, and AWS IAM Identity Center (successor to AWS Single Sign-On), to build a landing zone in less than an hour. 

Resources are set up and managed on the customer’s behalf. AWS Control Tower helps with green field account vending, however, it also provides a way to enroll existing AWS accounts (brownfield deployments) and apply the same security/connectivity guardrails.

Landing Zone/AWS Control Tower aims to accelerate application onboarding/deployment/migration in AWS by automating the provisioning of AWS accounts, preconfigured to meet the business, connectivity, security, and compliance requirements.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcad7h2c3-EYkiv6WDXwyckpVniO47ZgeLE2rB1LWblS32qCeeMY_s8ulUpSs-30S9wCI_t9tcoNOiwUp9g4Z5Gqt5feXa3ih5K78meyU48unvF2UueDkIZzvzXcWhnR7NvC-TrD1x5H-z5M3j9lXQG0T5X?key=V_hjkoCU8wbistL6B0Y7hg)

The AWS Control Tower Service team constantly launches/removes proactive controls as part of the AWS Control Tower releases. It is one of the very few AWS services where updating and patching the Service is the customer’s responsibility. Updates are required to correct governance drift, or to move to a new version of AWS Control Tower. To perform a complete update of the AWS Control Tower, customers must first update the landing zone and then update the enrolled accounts individually. [Landing zone versions ](https://docs.aws.amazon.com/controltower/latest/userguide/configuration-updates.html)and the features are documented in [AWS Control Tower release notes](https://docs.aws.amazon.com/controltower/latest/userguide/release-notes.html)

**AWS Control Tower Costs**

There is no additional charge to use AWS Control Tower. However, when customers set up AWS Control Tower, they will incur costs for AWS services configured as part of the landing zone and mandatory controls. 

AWS Control Tower/Landing Zone deployment is probably the most consumed AWS Professional Services offering. It customizes AWS Control Tower deployment for a customer. AWS Professional Services primarily uses an AWS-published Solution, [Landing Zone Accelerator on AWS](https://aws.amazon.com/solutions/implementations/landing-zone-accelerator-on-aws/), as a foundation of this offering. 

Landing Zone Accelerator is provided as an open-source project that is built using the AWS Cloud Development Kit (CDK) and continues to integrate the rest of AWS Services as part of AWS Control Tower Service.

**Control Tower ISV Vendors:**

AWS publishes a [list](https://aws.amazon.com/marketplace/solutions/control-tower/) of third-party integrated solutions for AWS Control Tower built by ISV vendors. These solutions help solve infrastructure and operational use cases including security for a multi-account environment, centralized networking, operational intelligence, and Security and Information Event Management (SIEM). 

AWS Control Tower [Landing Zone Accelerator](https://aws.amazon.com/solutions/implementations/landing-zone-accelerator-on-aws/) integrates AWS Networking Services such as AWS NAT GW, AWS TGW, AWS VPC Peering, AWS Network Firewall (ANFW), AWS Firewall Manager, and AWS Direct Connect as part of the solution.
