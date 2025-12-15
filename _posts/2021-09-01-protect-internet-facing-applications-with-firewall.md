---
title: "Aviatrix GSI Mockup Landing Page"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 3, 2023", "Adam Stipkovits", "cloud-networking", "Previous\u00a0post Aviatrix GSI Mockup Landing Page", "Next\u00a0post GCP Secure Network Routing Designs"]
tags: []
original_url: https://netjoints.com/protect-internet-facing-applications-with-firewalls-in-public-cloud-ingress-traffic-design/
---

Every public Cloud is drastically different. The networking and security are 180 degrees apart from each other. We need a normalizer. That normalizer is #Aviatrix.

## **Google Cloud (GCP)**

The solution described below shows how to implement NLB based ingress in Google Cloud.

For this design, credit goes to [Adam Stipkovits](https://www.linkedin.com/in/adam-stipkovits/) for deploying and verifying in the lab.

Note that in NLB based deployment is GCP the original source address is preserved. The firewall then has to NAT the traffic source to its LAN interface IP, so that’s where the original source IP is lost.

For HTTP/HTTPS load balancing HTTP(S) load balancer with Network, Endpoint groups could be another option although that doesn’t preserve source IP address.

Today you cannot put an HTTP(S) or another form of a load balancer into a Spoke as load balancers in GCP are not tied to a Subnet and would deliver traffic directly to backend services instead of Spoke gateways. A third-party appliance, like F5/Nginx, could be used to do this in a Spoke network if needed.
