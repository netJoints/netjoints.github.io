---
title: "GCP Networking Best Practices"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "March 3, 2020", "multi-cloud", "Previous\u00a0post GCP Networking Best Practices", "Next\u00a0post Secure S3 Bucket Access Over Direct Connect Private VIF"]
tags: []
original_url: https://netjoints.com/saas-based-multi-cloud-solution-not-for-enterprises/#respond
---

I was meeting a very large enterprise customer here in Melbourne, Australia yesterday and he asked me a question that

> “Why don’t you have a managed service offering or SaaS based platform for Multi-Cloud Networking and Security?”

We had a healthy discussion and following points resonated well with the customer

### Owning the Architecture

  * Enterprises should own the architecture end-to-end. Do not fall in the traps of early days of Cloud adoption where shadow IT and DevOp guys took control and started building networking on their own
  * Almost all the Enterprises I talk to, they want to own, control and manager control, data and operations plane. Similar to the way they were owning the on on-prem networking and security
  * How would you get the deep level of monitoring, logs and visibility from the SaaS platform? What I have seen that if enterprise do not own the platform, then they are at the mercy (SLA) of SaaS provider



### Trust Factors

  * How much do you trust a SaaS based Multi-Cloud Networking and Security provider? 
  * You have to trust your CSP (AWS/Azure/GCP/etc) I get that. Buy should you add an extra layer of trust as an enterprise? 
    * It is trust (..cloud hardware) over trust (cloud hperplane) over trust (cloud provider security model) over trust (multi-cloud provider SaaS platform). 



### Competition Factor

  * Are you ok sitting next to multiple tenants on the same SaaS platform? One of them might be your competitors
    * Again, this is something you have to decide as an enterprise. 
    * There is a reason that some retail customers are not hosting their applications on AWS and going to Azure. You could apply the same logic here as well. 
    * If this SaaS goes down, you and your competitor both goes down. Not good because where is your competitive advantage then?



### Pace of Innovation

  * Pace of innovation might be slow
    * If there is a feature an enterprise need, then in the SaaS model, it will be hard for enterprise to ask to add that feature into the product. 
    * Typically SaaS providers need to support and enable a good number of tenants and it is not easy for them to quickly build and release new features



### Compliance/Audit/Governance/GDPR

  * In the SaaS offering, some one else dictates its own terms and conditions. It is hard for you as an enterprise to dicated and create your own policies, governance and operational model.



#### Credits

Following people helped me review and write this blog   
Hammad Alam
