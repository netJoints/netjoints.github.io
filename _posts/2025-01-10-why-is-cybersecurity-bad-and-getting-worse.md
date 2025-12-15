---
title: "AWS Direct Connect (DX)"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 30, 2024", "https://lnkd.in/gCgkg2PJ", "#secure", "#egress", "Sarmed Faraj", "Eric Stein", "Prakash Paul", "Alex Sahadak", "Jacob Matthews", "Shubham Dudani", "Amir Khurshid", "https://lnkd.in/gdGna22A", "cloud-networking", "Previous\u00a0post AWS Direct Connect (DX)", "Next\u00a0post ACE-Security Secure Egress LAB"]
tags: []
original_url: https://netjoints.com/why-is-cybersecurity-bad-and-getting-worse/#respond
---

## Introduction

Zero Trust is a security framework. It is not a product. It is a mindset that must be adopted by enterprises when building networks. It was relatively more straightforward to march towards a proper zero-trust framework in the on-prem world. In the cloud, it has become complex and challenging due to the distributed nature of the cloud. Many legacy hardware and on-prem-centric vendors are trying to retrofit the on-prem Zero-Trust Model in the cloud landscape without understanding cloud networking, security, and visibility requirements.

This document focuses on the Cloud Zero-Trust Framework for workloads deployed in single, multiple, and hybrid cloud scenarios. Hence, the Cloud Zero-Trust term used in this doc is synonymous with the framework needed in single cloud, multiple cloud, and hybrid clouds.

## State of Cybersecurity

Pundits agree that cybersecurity is more than just a technical problem. It is also about the Zero-Trust mindset that an enterprise needs to adopt.  
  
A lot of research has been done, and a lot of papers have been written, but unfortunately, companies are not providing a holistic, practical, and easy-to-implement solution covering ZTNA tenants as discussed in the NIST blueprint.  
  
👉 <https://lnkd.in/gCgkg2PJ>

# Cloud Zero-Trust Requirements

The zero-trust framework operates on the principle of “never trust, always verify.” It assumes that threats can exist inside and outside the network, requiring continuous verification of trust in users, devices, and applications. Zero Trust typically involves the following key components:

  1. Security Next to Applications and Services: Security controls and policies are clearly defined and enforced close to the application and services. This is a must to ensure that applications and services are inspected and allowed as soon as they try to communicate with another application or service. This approach also helps customers build a zero-trust framework with cost controls, cost optimization, and improved resiliency.
  2. Least Privilege Access: Users and devices are granted the minimum level of access required to perform their tasks, reducing the risk of unauthorized access and lateral movement by attackers.
  3. Operational Visibility: Continuous monitoring of network activity and user behavior helps detect and respond to anomalies and potential security threats in real time.
  4. Micro-Segmentation: Networks are segmented into smaller, isolated zones to limit the lateral movement of attackers. This segmentation enforces strict access controls between segments.
  5. Secure Access, Audit, and Reporting: Security controls, like encryption and network segmentation, are implemented to ensure secure communication and data protection.
  6. Identity Verification: Users are not automatically trusted, even within the network perimeter. Identity verification for users with the ID provider using SAML is required for access.



## Creation of Cloud Zero Trsut Cybersecurity Framework

After seeing this gap and realizing the seriousness of the issue I spoke with many customers and partners. I then created a comprehensive Zero Trust Network Access (ZTNA) blueprint for Cloud-centric workloads. After the frameworks was created I then mapped it to Aviatrix product. 

You should also use the same approach and evaluate your product or products against it. If it provides all the tenants for ZTAN, you are good. Otherwise, you need to think or consider other products to support your ZTNA initiatives. 

# Aviatrix Cloud Zero-Trust Approach

Aviatrix has been in the business since 2016, supporting enterprises to build secure cloud networks. Aviatrix has adopted a lot of security controls to fulfill the requirement.

Since there is no one-size-fits-all, it is also essential to note that Aviatrix’s solution complements the other elements, cloud-native services, and 3rd part vendors to march towards a resilient Zero-Trust framework. These services fall under malware detection and antivirus scanning areas mainly.

The following diagram summarizes various capabilities Aviatrix has added over several years of innovation that help customers build a Zero-Trust framework for workload, applications, services, and users. 

Cloud Zero Trust aims to enhance security in an increasingly interconnected and cloud-centric environment by moving away from traditional network perimeters and centralized models. It also focuses on continuous verification and the dynamic nature of applications, especially in the Cloud.

![](../../media/images/why-is-cybersecurity-bad-and-getting-worse_ZTNA_Shahzad.gif)

Security Next to Applications and Services

Aviatrix Distributed Cloud Firewall (DCF) is implemented next to applications and services in a distributed fashion. The policies are governed by a centralized controller.

Egress and Ingress controls are also put in place as soon as the traffic enters the enterprise network boundary.

**Complementary Services**

Cloud Native WAF, API Gateways, DNS inspection services such as CloudFlare, Akamai, etc.

## Least Privilege Access

Aviatrix builds the network using the least privilege access model. Aviatrix gateways are locked-down hardened devices without SSH or HTTP/HTTPS access. The control and data plane communication follows the same model. Aviatrix also integrates with Cloud IAM providers to follow the least privileged policies defined by those services and entities.

Aviatrix Threat detection and automated remediation is an example of least privilege access where traffic is inspected for known malicious bad actors by default.

## Operational Visibility

Regarding zero-trust cybersecurity, visibility is fundamental for protecting network assets and information. Security teams must be able to see what’s on the network to defend it and meet increasingly stringent compliance standards. Regardless of whether you are hacked, it’s critical to maintain compliance to be audit ready. Failing an audit can lead to revenue loss, damaged brand reputation, or even business closure.

In the cloud, security teams are running into new challenges with visibility. Cloud-native services are seen as black boxes—not providing them with the visibility, governance, and audit control needed to meet enterprise requirements. Moreover, enterprises cannot send their business-critical data and traffic flows to 3rd party SaaS locations for inspection, audit, and visibility. The following Aviatrix webinar provides more details on this topic.

## Micro-Segmentation

With Aviatrix, customers have built networks that are segmented into smaller, isolated zones to limit the lateral movement of attackers. This segmentation enforces strict access controls between applications and services. The Aviatrix Micro-Segmentation is identification and context-aware. It protects the application as soon as they are born or spun up without any human intervention.

## Enablement to Bridge Cybersecurity Skill Gap

It is easy to talk about all the challenges associated with Cybersecurity, but here I am providing a concrete solution as well. 

In reached out to industry experts and partners and shared the idea. We reached consensus and based on their feedback I designed and implemented a Cloud Security Enablement Training program, the ACE Security track, from scratch. It provides a practical approach to designing and implementing a zero-trust cybersecurity solution with simplicity, visibility, and contr  
  
Since Internet connectivity is the main culprit in achieving ZTNA, you will notice that we cover practical tips and tricks to internet [#secure](https://www.linkedin.com/feed/hashtag/?keywords=secure&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7246404560984911872) [#egress](https://www.linkedin.com/feed/hashtag/?keywords=egress&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7246404560984911872) in great detail in this course.  
  
Thanks to Rizwan Jamal, Joe Almendora, John Smoker, [Sarmed Faraj](https://www.linkedin.com/in/sarmed-faraj-1a246010/) [Eric Stein](https://www.linkedin.com/in/eric-stein-7a426b192/) [Prakash Paul](https://www.linkedin.com/in/prakash-paul-63a9666/), [Alex Sahadak](https://www.linkedin.com/in/alex-sahadak-47522788/), Marek Wolanczyk [Jacob Matthews](https://www.linkedin.com/in/jacob-matthews-b6603725b/) Marek Ryneš [Shubham Dudani](https://www.linkedin.com/in/shubham-dudani-38b197179/) [Amir Khurshid](https://www.linkedin.com/in/amir-khurshid-b8754265/), and many who attended the initial workshop and provided valuable feedback. Their feedback is helping shape the program to new heights. 

![](../../media/images/why-is-cybersecurity-bad-and-getting-worse_ACE-Security-Hall-of-Fame-1024x578.png)

Signup for upcoming classes here 👉 <https://lnkd.in/gdGna22A>
