---
title: "AWS Private Link"
date: 2024-08-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "August 19, 2024", "cloud-networking", "Previous\u00a0post AWS Private Link", "Next\u00a0post AWS Site to Site VPN (S2S)"]
tags: []
original_url: https://netjoints.com/aws-security-hub/#respond
---
## What it is

**AWS Security Hub** is a **cloud security posture management and findings aggregation** service. It gives one place to see security alerts and compliance status across accounts and Regions.

## What it does

* **Aggregates findings** from AWS services such as GuardDuty, Inspector, Macie, IAM Access Analyzer and Firewall Manager, and from many third-party products.
* **Normalizes** them into the **AWS Security Finding Format (ASFF)**, so tools and automations can process them consistently.
* **Runs automated security checks** against standards such as **AWS Foundational Security Best Practices**, **CIS AWS Foundations Benchmark**, **PCI DSS** and **NIST SP 800-53**.
* **Scores and prioritizes** with security scores and severity so you can focus on what matters.

## Multi-account operations

* Use **AWS Organizations** with a **delegated administrator** to enable Security Hub across the organization.
* Use **cross-Region aggregation** to pull findings into a single aggregation Region.
* Security Hub relies on **AWS Config**, so Config recording must be enabled for controls to evaluate.

## Automation

* Findings flow to **Amazon EventBridge**, which can trigger Lambda functions, Step Functions, notifications or ticket creation.
* **Custom actions** let analysts send a finding to a response workflow with one click.
* **Automation rules** can update, suppress or escalate findings as they arrive.

## Security Hub vs GuardDuty

GuardDuty **detects threats** and produces findings. Security Hub **collects and organizes** findings from GuardDuty and many other sources and adds **compliance checks**. They complement each other.

## Watch-outs

* Turning on every standard produces a lot of findings. Start with one baseline, fix the high severity items, and expand.
* Costs come from **security checks** and **finding ingestion**. Estimate before enabling in many accounts and Regions.
* Security Hub shows problems; it does not fix them. Plan the remediation process alongside it.


*Quotas, limits and pricing change often. Confirm current values in the AWS documentation before designing around them.*
