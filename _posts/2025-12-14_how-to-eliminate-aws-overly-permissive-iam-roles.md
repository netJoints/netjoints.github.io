---
title: "Reduce Standing Permission Security Risk | Lock Down GCP Project Access"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 13, 2025", "AWS security incident related to IAM permissions occurred with Capital One", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Reduce Standing Permission Security Risk\u00a0|\u00a0Lock\u00a0Down\u00a0GCP Project Access", "Next\u00a0post Which one is better? Britive or CyberARK"]
tags: ["Shahzad Ali", "January 13, 2025", "AWS security incident related to IAM permissions occurred with Capital One", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Reduce Standing Permission Security Risk\u00a0|\u00a0Lock\u00a0Down\u00a0GCP Project Access", "Next\u00a0post Which one is better? Britive or CyberARK"]
original_url: https://netjoints.com/how-to-eliminate-aws-overly-permissive-iam-roles/
---

## Problem Statement

Over permissions and standing permission in AWS could be a serious issue. Capitol One breach is used here just as an example, but this is an industry wide issue and not limited to a single industry or enterprise. It revealed how privileged access, standing permissions, and long-lived access keys, can create significant security risks when not properly managed.

### Capitol One Incident

A notable [AWS security incident related to IAM permissions occurred with Capital One](https://www.darkreading.com/cloud-security/capital-one-breach-conviction-exposes-scale-of-cloud-entitlement-risk) in 2019, which serves as a compelling case study in cloud security. 

A former AWS employee exploited a misconfigured WAF (Web Application Firewall) and IAM roles to access approximately 100 million customer records. The root cause wasn’t a flaw in AWS itself. It was due to the **overly permissive IAM roles** that allowed the attacker to access the metadata service and obtain credentials.

### AWS Access Key in Public GitHub Repo 

Another instructive example comes from early 2023, when a security researcher discovered thousands of exposed AWS access keys in public GitHub repositories. 

## Solution: Multi-Cloud Privileged Access Management (CPAM)

Just in Time ephemeral access is the solution to these and many cybersecurity related issues. I will share two use-cases here but the restrictions and dynamic authorization are applicable to any service offered by AWS.

### AWS S3 JIT Ephemeral Access

By default a user account has no admin access to EC2 or any AWS services. First step is to login to Britive UI and checkout Profile called “AWS Creative Profile 01”. 

Click on the AWS console access link directly from Britive UI. In the following video you can see that S3 access is enabled and access to other AWS services is restricted or not enabled. 

For example in the following video, access to EC2 is blocked

## Summary

These incidents remind us that cloud security is a journey of continuous improvement. Each security event provides valuable insights that help us build more resilient cloud architectures and develop more effective security strategies.
