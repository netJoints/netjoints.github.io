---
title: "ACE-Security Secure Egress LAB"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 15, 2024", "AWS Direct Connect Quotas", "https://docs.aws.amazon.com/directconnect/latest/UserGuide/limits.html", "Juniper Networks", "MACSec vs IPSec Side By Side", "IEEE 802.1AE \u2013 Media Access Control Security", "RFC 4301 \u2013 Security Architecture for the Internet Protocol", "Cisco \u2013 IPsec Fundamentals", "cloud-networking", "Previous\u00a0post ACE-Security Secure Egress LAB", "Next\u00a0post GCP Networking Limitations"]
tags: []
original_url: https://netjoints.com/aws-networking-limitations/#respond
---

As network architects, we know that there are pros and cons in designing any network in the world. Nothing is perfect. As trusted advisors, it is our responsibility to provide merit-based options and solutions to our clients and the enterprises we represent.

This document provides some networking limitations shared by our customers. Credit goes to CSP to well document these design and quota limitations. 

Aviatrix is one of the networking and security competency holder ISV and AWS partners. Aviatrix provides the solution to some of these limitations. Customers should consider them and make informed decisions based on merit, pain points, and requirements. In the end the technical solution should meet business objectives and provide value to customers and shareholders. 

## (1) 100 Route Limitation

Public cloud providers, such as AWS, often come with inherent routing and connectivity limitations that can be a pain point for many organizations. A notable limitation is found in AWS Transit Gateway (TGW) and AWS Direct Connect configurations.

**According to AWS documentation:**

“If you advertise more than 100 routes each for IPv4 and IPv6 over the BGP session, the BGP session will go into an idle state with the BGP session DOWN.”

Source: [AWS Direct Connect Quotas](https://docs.aws.amazon.com/directconnect/latest/UserGuide/limits.html)

This means that any organization needing to advertise more than 100 routes will inadvertently experience network disruptions, rendering the BGP session inactive.

### Aviatrix Advantages

Aviatrix addresses this challenge. Unlike AWS TGW, Aviatrix supports a significantly higher number of routes per BGP session. This solves the route limitation problem, ensuring uninterrupted network connectivity.

<https://docs.aws.amazon.com/directconnect/latest/UserGuide/limits.html>

## (2) AWS Direct Connect MACsec Limitation

### MACsec Limitations

**Layer 2 Encryption:** MACsec operates at the data link layer (Layer 2), offering protection only for traffic on a single Ethernet link. This restricts its application across broader network architectures, particularly those involving multi-hop WAN or cloud environments.  
  
Reference: [Juniper Networks](https://www.juniper.net/documentation/us/en/software/junos/security-services/topics/topic-map/understanding_media_access_control_security_qfx_ex.html) and [MACSec vs IPSec Side By Side](https://aviatrix.com/blog/secure-your-connection-to-the-cloud-macsec-vs-ipsec/)  
  
**Scalability Issues:** MACsec does not scale well for larger networks due to the necessity of configuring and managing keys for every direct Ethernet connection. This makes it cumbersome for expansive, dynamic networking situations typical of cloud deployments.  
  
Reference: [IEEE 802.1AE – Media Access Control Security](https://standards.ieee.org/standard/802_1AE-2018.html)  
  
**Lack of Flexibility:** MACsec does not offer inherent support for logical segmentation, such as Virtual Private Clouds (VPCs) or VPN tunnels. In contrast, VPN technologies like IPSec can segment network traffic efficiently, providing greater control and flexibility.  
  
**Physical Link Restrictions:** Since MACsec only secures physical links, its use is limited to single-hop connections. This poses significant drawbacks for cloud connectivity, where data often traverses multiple hops over various network paths.

## Why IPSec is the Better Choice

**Comprehensive Layer 3 Encryption:** IPSec operates at the network layer (Layer 3), ensuring that IP packets are encrypted end-to-end across multiple network hops. This feature makes it indispensable for cloud environments, which require consistent data protection over extended paths.  
  
Reference: [RFC 4301 – Security Architecture for the Internet Protocol](https://datatracker.ietf.org/doc/html/rfc4301)  
  
**Advanced Key Management:** IPSec includes advanced mechanisms for key management such as Internet Key Exchange (IKE). This allows for dynamic, automated, and scalable key management, reducing the burden on network administrators.  
  
Reference: [Cisco – IPsec Fundamentals](https://www.cisco.com/c/en/us/products/security/vpn-endpoint-security-clients/what-is-vpn.html)  
  
**Support for Multi-Cloud and Site-to-Site VPNs:** IPSec is designed to work seamlessly across multiple cloud environments and site-to-site connections. This flexibility is essential for modern enterprises with complex networking needs.  
  
**Policy-Based Security:** With IPSec, organizations can enforce security policies natively, allowing for precise control over data routing and encryption. This ensures compliance with internal and external regulations.  


### (3) IPSec 1.25 Gbps Encryption Limitation
