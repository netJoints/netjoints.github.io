---
title: "Cloud Network Well-Architected Framework Design Pillars"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 3, 2023", "This article from Infoworld.com", "Steven Ward", "articulated it well in this podcast", "cloud-networking", "Previous\u00a0post Cloud Network Well-Architected Framework Design Pillars", "Next\u00a0post Aviatrix ThreatGuard Design Patterns for Internet Ingress Traffic"]
tags: []
original_url: https://netjoints.com/diy-automation-increases-complexity-and-cost-of-running-cloud-network/#respond
---

Some customers start their Cloud implementation or adoption with a single CSP (Cloud Service Providers such as GCP, Azure, AWS, etc.). Soon they realize that the world is already Multi-Cloud, and there is no going back. 

The majority of the enterprises know for a fact that they must adopt a multi-cloud strategy, but due to skill gaps, fear of the unknown, etc., they opt for a single CSP to begin with. They rely heavily on native CSP networking services. They also rely heavily on writing automation and scripting code that is too tied to a specific cloud provider. This reliance creates CSP vendor-lock-in problems. 

What is needed is an enterprise-scale, self-managed cloud networking platform that could eliminate CSP reliance with cost savings, simple architecture with world-class visibility, control, and day2 operations. 

[This article from Infoworld.com](https://www-infoworld-com.cdn.ampproject.org/c/s/www.infoworld.com/article/3670728/complex-cloud-architecture-is-finally-causing-budgetary-pain.amp.html) backs my arguments by explaining how a complex (or no) cloud architecture is causing budgetary pain for many enterprises. 

## **Is your focus productivity or a science project?**

Many cloud teams mistake turning into a software house instead of focusing on driving business. Maybe that’s what they have, a software house with an army of people doing their coding with native constructs. Their pain also seems to be just visibility. Have they seen all other advanced capabilities Aviatrix can provide with networking and security?

[Steven Ward](https://www.linkedin.com/in/steven-ward-bb8a634/), Corporate Infra leader at Siemens MAS, [articulated it well in this podcast](https://podcasts.apple.com/de/podcast/ep31-utility-industry-is-critical-national-infrastructure/id1557680186?i=1000553922679)

Enterprises are NOT a “software house,” and DIY scripting at scale across different environments is like a “square peg in a round hole.”

## **Learn from Leading Cloud Enterprises**

A large retailed reason to go with Aviatrix is as follows (BTW, they were also DIY in the beginning)

  * Speed of deployment 
    * Developing advanced capabilities using DIY will likely take years, even if initial capabilities will be rolled out in months.
  * Support and Day2 Operations 
    * A company like Aviatrix maintains a dedicated team to support the software. An enterprise cannot afford this model. 
  * Upgrades and Modernization 
    * Aviatrix can maintain a continuous development pace for networking and security. Aviatrix can provide development of new features as CSP evolve. Enterprise static script/code will quickly become stale.
  * Open Architecture 
    * Aviatrix comes with full API support. Single API/Terraform for building all cloud networking infrastructure (Azure/GCP/AWS/etc.)



## **Aviatrix Gateways Brings Simplicity, Openness, Visibility, and Automation**

Aviatrix virtual Gateway EC2/VMs are similar to an underlying fleet of EC2 instances or VMs used in VGW, IGW, NAT GW, etc. Aviatrix is built natively for the cloud, understands the native constructs, and is all managed by the controller with no manual intervention. 

Instead of hiding these gateways behind some SaaS or NaaS black walls, Aviatrix decided to expose these Gateways to enterprises. This allows enterprises to chart their journey without any strings attached. Aviatrix puts the power in the hands of enterprise IT instead of running on a shared SaaS or NaaS infrastructure that is potentially shared across thousands of customers.

## **Conclusion**

There are still enterprises that would try to adopt DIY networking infra. DIY quickly turns into a science project. Do not make the costly mistake of DIY. Give Aviatrix a try in a sandbox; if it does not solve the requirement, pivot to DIY later, not the other way around.
