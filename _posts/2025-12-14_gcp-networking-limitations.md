---
title: "AWS Networking Limitations and Constraints"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 16, 2024", "https://www.infoworld.com/article/2258014/the-pros-and-cons-of-using-a-virtual-private-cloud.html", "https://cloud.google.com/architecture/best-practices-vpc-design#isolate-data", "Andromeda", "https://cloud.google.com/architecture/best-practices-vpc-design#choose-method", "cloud-networking", "Previous\u00a0post AWS Networking Limitations and Constraints", "Next\u00a0post ACE-Backbone LAB Guide"]
tags: []
original_url: https://netjoints.com/gcp-networking-limitations/
---

Google Cloud Platform (GCP) offers various networking services, each with its own set of limitations and quota limits. These are enforced to ensure fair resource distribution and system stability.

## GCP Global VPC

### **Network Latency and Performance:**

One of the primary challenges with global VPCs is increased network latency due to the geographical distances between different regions. This can impact the performance of latency-sensitive applications.

<https://www.infoworld.com/article/2258014/the-pros-and-cons-of-using-a-virtual-private-cloud.html>

### Reduced Security for Sensitive Data 

GCP recommends against using Global VPC for sensitive data because it could reduce the security of sensitive workloads. 

> “For companies that deal with compliance initiatives, sensitive data, or highly regulated data that is bound by compliance standards such as HIPAA or PCI-DSS, further security measures often make sense. One method that can improve security and make it easier to prove compliance is to isolate each of these environments into its own VPC network.”
> 
> ![](../../media/images/gcp-networking-limitations_image-18.png)

<https://cloud.google.com/architecture/best-practices-vpc-design#isolate-data>

### Large Failure Domain

A Global VPC usually has workloads across the entire globe. This could be a huge security issue if one VM or workload is attached or compromised. It could position or attach other VPCs across the globe. 

### 3rd Part Service Insertion Challenges with Global VPC

Since Global VPC has a global hidden VPC router, the traffic is routed by that hidden GPC VPC router automatically. It will be difficult or in some cases impossible to steer traffic to 3rd party appliances sitting in the same VPC. Appliances like F5 and Palo Alto must be deployed outside of the Global VPC so that traffic can be steered to them for Firewall service insertion for example.

### Data Residency and Compliance Risks

Different regions may have varying compliance and data residency requirements (European Union Mandates for data locality, GDPR, etc.). Ensuring adherence to these compliance standards can complicate the global VPC setup and operation

## Aviatrix Eliminates Global VPC Realted Challenges

Aviatrix hub and spoke VPC default design do not use Global VPC. It improves the performance and latency of workloads. Reduces the large failure domain. Aviatrix FireNet feature, out of the box, deploys 3rd party Firewalls into the traffic flow with policy-based service insertion and dynamic traffic steering.

Avaitrix hub and spoke VPC are by default encrypt all the traffic in transit. There is no option to even disable this. It allows peace of mind security knowing that the traffic is always encrypted. 

## GCP VPC Network Peering Disadvantages

VPC networks are isolated tenant spaces within Google’s [Andromeda](https://cloudplatform.googleblog.com/2017/11/Andromeda-2-1-reduces-GCPs-intra-zone-latency-by-40-percent.html) SDN. One can use the GCP VPC peering to connect VPCs for traffic routing. However, based on GCP documentation I discourage customers from using GCP VPC peering with or without Global VPC. 

The following screenshot is taken from GPC VPC design best practices. 

![](../../media/images/gcp-networking-limitations_image-19.png)

**GPC VPC Network Peering Disadvantages**

  * Non-transitive.
  * Scaling numbers are bound to the _aggregate_ group of peered VPC networks. This includes the number of VMs, routes, and internal forwarding rules.
  * Requires non-overlapping address space.
  * Static and dynamic routes are not propagated.
  * Source tags and source service accounts of the sending VM are not propagated across VPC Network Peering.



Reference: <https://cloud.google.com/architecture/best-practices-vpc-design#choose-method>

## Google Cloud Interconnect Limitations

### Google Cloud Interconnect Private Circuits are NOT Encrypted

Google Cloud Interconnect (Dedicated or Partner) is not IPSec encrypted by default. Refer to the following screenshot taken from Google documentation. 

![](../../media/images/gcp-networking-limitations_image-20-1024x405.png)

Reference: <https://cloud.google.com/architecture/best-practices-vpc-design#choose-method>

### Google Cloud Interconnect Private Circuits 1.25 Gbps IPSec Throughput Limitation

The throughput is limited to 1.25 Gbps. This is industry industry-wide issue not limited to GCP. AWS, Azure, and OCI have similar limitations. Aviatrix has the patented technology to overcome this limitation. Aviatrix HPE DC Edge use-case provides near-line rate IPSec encrypted throughput in hybrid cloud, single cloud, and multicloud situations. 

The following diagram shows AWS and Azure but the beauty is that the design is applicable if you replace Azure or AWS with GCP. 

![](../../media/images/gcp-networking-limitations_image-21-1024x845.png)

## GCP Networking Limitations Summary

Evaluate the need for multicloud connectivity and consistent architecture. Keep in mind that  
GCP Global VPC is a GCP-only feature.

  * Remember that GCP Global VPC features are only available in GCP. In a multicloud  
scenario, the customer would need to make additional efforts to implement a similar or  
compatible option in another cloud, which could delay the project, increase time-to-market,  
increase MTT, and increase cost due to technology and skill gap challenges.



  * Understand that GCP Global VPC and standard VPC Network peering require non-overlapping address space. GCP and other CSPs do not support overlapping IP addresses natively.   
requirements are met.



  * Assess the manual route management efforts required if the use case involves traffic steering  
to a 3rd party VM for service insertion/chaining use case.



  * Evaluate the requirements of using tools such as packet capture, tcpdump, packet drop,  
traceroute, ping, etc. with or without GCP Global VPC.



  * Understand the GCP Global VPC routing quota, BGP feature set, and advanced traffic  
engineering options. This should be reviewed for routes advertised to on-prem and the  
number of routes received from on-prem.



  * Understand that line rate IPSec encryption over GCP Cloud Interconnect could pose  
challenges as it would restrict that throughput to 1.25 Gbps.



  * Assess the manual route management efforts required to create segmentation and isolation  
with a policy-based approach.



  * Analyze costs. If VMs are deployed in the same Global VPC, heavy inter-zone charges may  
be incurred. This would lead to designing a regional VPC.



  * Review the network telemetry, VPC flow logs, firewall rules log, and cloud NAT charges for  
processing and storing the data  




Review the following resources for the latest GCP Global VCP design considerations.

https://cloud.google.com/architecture/best-practices-vpc-design#shared-common-vpc  
https://cloud.google.com/vpc/docs/overview  
https://cloud.google.com/vpc/docs/overview  
https://cloud.google.com/vpc/pricing

A simple Google Gemini search also suggest important points to consider

![](../../media/images/gcp-networking-limitations_image-22.png)
