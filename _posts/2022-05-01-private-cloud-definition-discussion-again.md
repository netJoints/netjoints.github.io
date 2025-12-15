---
title: "Cloud Architecture Mistakes: Organizations Need Shorter Mean Time to RecoveryCloud Architecture Mistakes:"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "April 23, 2024", "What is a Private Cloud? | Amazon AWS", "What are private, public, and hybrid clouds? | Microsoft Azure", "NIST Special Publication 800-145", "Joe Amendolarae", "Rizwan Jamal", "cloud-networking", "Previous\u00a0post Cloud Architecture Mistakes: Organizations Need Shorter Mean Time to RecoveryCloud Architecture Mistakes:", "Next\u00a0post Insights from RSA Conference 2024"]
tags: []
original_url: https://netjoints.com/private-cloud-definition-discussion-again/
---

I thought the private cloud definition was well established, but recently, an eLearning course caused some confusion, so I decided to clear the confusion. 

According to this eLearning course, AWS Outpost and Azure Stack can only be treated as Private Cloud. This statement is not entirely correct. Let’s look at the definition of Private Cloud first. 

## **The Private Cloud Definition**

As explained by industry leaders like AWS [[What is a Private Cloud? | Amazon AWS](https://aws.amazon.com/what-is/private-cloud/)] and Microsoft [[What are private, public, and hybrid clouds? | Microsoft Azure](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-are-private-public-hybrid-clouds)], and aligned with the definition provided by the National Institute of Standards and Technology (NIST) [[NIST Special Publication 800-145](https://www.nist.gov/system/files/documents/2017/05/31/evaluation_of_cloud_computing_services_based_on_nist_800-145_20170427clean.pdf)], a private cloud is a computing environment dedicated to a single organization. It offers the benefits of cloud computing – scalability, elasticity, and self-service provisioning – while maintaining isolation and control. This translates to:

  * **Single-tenancy:** Resources like storage and computing power are exclusively used by your organization.
  * **Enhanced Security:** You have complete control over access and security configurations.
  * **Customization:** You can tailor the cloud environment to your specific needs.



In the private cloud, the cloud infrastructure is provided for exclusive use by a single organization comprising multiple consumers (e.g., business units). It may be owned, managed, and operated by the organization, a third party, or some combination, and it may exist on or off premises.

### Cloud Computing Definition

As per the NIST definition of Cloud Computing, it must possess five ingredients or elements.

1- On-demand: As a service model delivered via software  
2- Broad Network Access: Access to multiple regions for high availability  
3- Resource Pooling: Pool of resources (Compute, Storage, Network, etc.) available  
4- Rapid Elasticity: Scale up, scale down, scale in, scale out available based on varying load  
5- Measured Services: SLA driven with monitoring and visibility

All major public cloud providers such as AWS, Azure, and GCP follows the Cloud Computing definition.

An example of Cloud Computing is Equinix Network Edge. Equnix customers have developed Equinix solutions to provide on-demand service for any VNF, and they fulfill all five characteristics of cloud computing / private cloud.

Let’s take a look at the examples of Private Cloud implementation now.

### Private Cloud Practical Implementation – VMware NSX

You can use VMware NSX (and similar SDN products) to design a Private Cloud using VMware NSX. VMware NSX is not the only software you would need to built a private cloud, you would also need other software and tools such as self service IT portal, service catalog and other automation tool to provide end to end orchestration and a look and feel close to a public cloud. It will take time and be difficult, but one can do it.

When I was part of VMware, I worked on building many private clouds for large enterprises. Building private clouds is time-consuming, and they could take 1 to 3 years.

I have covered these learnings in my NSX Design book too.

**1- On-demand:** We created a Self-Service portal for on-demand compute and service access using different software vendors and integrated them with the ServiceNow ticketing system

**2- Broad Network Access:** We used VXLAN and extended networks across regions

**3- Resource pooling:** We have various pools of computing resources using ESXi VMs and storage using vSAN

**4- Rapid elasticity:** VMware vMotion for on-demand mobility (this is still not possible in a public cloud environment) and other techniques were used to increase or decrease VM size, etc. A lot of custom code was written, and a lot of issues. It was not easy.

**5- Measured services:** VMware purchased a company called Arkin (later called vRealized Operations”) to measure the performance and telemetry of the network. The telemetry and service measurement was used to add resources to the pool and spin up and down VMs, Security Services, and VXLAN networks.

### What about AWS Outpost or Azure Stack? Is it not a Private Cloud?

CSPs are selling AWS Outpost-like services, but that Outpost Infra servers and racks enterprise need to buy and install on their DC. Yes, it’s all packaged with a complete rack, etc, but still, it needs to be ordered, delivered, connected with outbound and other circuits, etc., if the customer decides to deploy on their own DC. 

If any customer wants to deploy on their own, like using open stack, VMware, etc., with the expertise they have fulfilling the characteristics of cloud computing, it is still called private cloud; we can not bind the definition of private cloud to CSP-provided services of Google Anthos, Azure stack, AWS Outposts. Customers can use OpenStack or services from others like VMware and Nutanix if they have the expertise. 

## Summary

Stick to the NIST SP 800-145 definition of private cloud, which states that 

> The cloud infrastructure is provisioned for exclusive use by a single organization comprising multiple CSCs (e.g., business units). It may be owned, managed, and operated by the organization, a third party, or some combination of them, and it may exist on or off premises.
> 
> https://www.nist.gov/system/files/documents/2017/05/31/evaluation_of_cloud_computing_services_based_on_nist_800-145_20170427clean.pdf 

##### Credits: Thanks to [Joe Amendolarae](https://www.linkedin.com/in/joe-amendolara/) and [Rizwan Jamal](https://www.linkedin.com/in/rizwan-j-35429723/) for contributing to this post. 
