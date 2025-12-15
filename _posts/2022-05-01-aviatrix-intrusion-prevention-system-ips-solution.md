---
title: "GCP Networking Pricing and Quota Limits"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "January 3, 2023", "Aviatrix Intrusion Prevention System (IPS) Solution for AWS", "Aviatrix Ingress Filtering Deployment with AWS ALB (Application Load Balancer)", "AWS GuardDuty findings", "cloud-networking", "aviatrix", "Previous\u00a0post GCP Networking Pricing and Quota Limits", "Next\u00a0post Aviatrix Security Features"]
tags: ["netJoints", "January 3, 2023", "Aviatrix Intrusion Prevention System (IPS) Solution for AWS", "Aviatrix Ingress Filtering Deployment with AWS ALB (Application Load Balancer)", "AWS GuardDuty findings", "cloud-networking", "aviatrix", "Previous\u00a0post GCP Networking Pricing and Quota Limits", "Next\u00a0post Aviatrix Security Features"]
original_url: https://netjoints.com/aviatrix-intrusion-prevention-system-ips-solution-for-aws-faqs/
---

Aviatrix delivers advanced cloud networking, network security, and operational visibility required by enterprises with cloud-native simplicity and automation. More than 550 customers worldwide leverage Aviatrix and its proven multi-cloud network reference architecture to design, deploy and operate a repeatable network and security architecture that is consistent across any public cloud. Combined with the industry’s first and only multi-cloud networking certification (ACE), Aviatrix is empowering IT to lead and accelerate the transformation to the cloud.

## **Quick Introduction**

Aviatrix providers a solution to protect public-facing applications and services with its IPS capabilities. Aviatrix IPS solution is also known as the “Public Subnet Filtering” solution. 

Please listen to this ~2 min long video as a refresher on this topic. 

[Aviatrix Intrusion Prevention System (IPS) Solution for AWS](https://www.youtube.com/watch?v=qYUmT9MseMA)

I also created a lab showcasing the configuration, routing and forwarding details for a real enterprise use-case.

[Aviatrix Ingress Filtering Deployment with AWS ALB (Application Load Balancer)](https://netjoints.com/aviatrix-ingress-filtering-deployment-with-aws-alb/)

## **Frequently Asked Questions**

### **Where do I go to see the GuardDuty findings in Aviatrix Controller?**

**Controller – > Security –> AWS GuardDuty –> Highlight the Region Name –> Actions –> Show Findings**

In the screenshot above, you can see that GuardDuty is informing Aviatrix Controller about the malicious IP addresses. 

### **Q: What is the criteria for the Controller to block IP address on PSF-GW?**

It is based on the [AWS GuardDuty findings](https://aws.amazon.com/blogs/security/new-third-party-test-compares-amazon-guardduty-to-network-intrusion-detection-systems/). 

### **Q: Where can I see those IPs being blocked in Aviatrix Controller?**

Aviatrix has a L4 stateful firewall that is enabled on the PSF-GW when the IPS feature is enabled. This L4 stateful firewall blocks the malicious IP addresses. This feature does not depend on the EC2 “Security Group” which allows limited number of rules to be programmed. 

Controller –> Security –> Stateful Firewall –> Select the PSF GW

Now click Edit Policy to see IPs being blocked by Aviatrix as shown in the screen shot below

### **Q: Can I see what sessions are established through the PSF-GW**

Controller –> Security –> Stateful Firewall –> Session View

Note that 10.19.0.43 is the IP address of the PSF-GW itself.

### **Q: Some IP addresses are well-known and not malicious. Why AWS GuardDuty is marking them as malicious and how do I fix this?**

This is a well-known observation with AWS GuardDuty that rarely, it could mark some good IPs as malicious IPs. The fix is very simple. You can exclude those from the Aviatrix GuardDuty database. With this method, Aviatrix will not block those IPs.

For example, we excluded 80.82.77.33 from the finding list. 

Now after the exclusion list was created, Aviatrix removed the block rule from its PSF-GW for this IP address. You can observe this change from the following screenshot as well.
