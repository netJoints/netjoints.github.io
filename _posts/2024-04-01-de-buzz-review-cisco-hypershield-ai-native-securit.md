---
title: "Kubernetes Security For Multi-Cluster Deployments"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 19, 2024", "cloud-networking", "Previous\u00a0post Kubernetes Security For Multi-Cluster Deployments", "Next\u00a0post Azure Networking Limitations and Constraints"]
tags: []
original_url: https://netjoints.com/de-buzz-review-cisco-hypershield-ai-native-security/#respond
---

Cisco bought Isovalent. Isovalent developed a product called “Cillium”. Cillium uses a technology called eBPF. What eBPF does is make the Linux kernel extensible. You can control the Linux kernel without rebuilding it.

Many companies and vendors use eBPF including Aviatrix for its Distributed Cloud Firewall (DCF)

![](../../media/images/de-buzz-review-cisco-hypershield-ai-native-securit_image-6-1024x411.png)

When you have a container based infrastructure your data flows from container to container and lives in the server world. It doesn’t “hit the wire” very often. But, your firewalls live “on the wire”. How do you firewall traffic for containers? It’s a container so you can’t really run a host based app on it either. Current solutions are things like kludgey sidecar containers. Or Proxies. 

But, if you control the Linux kernel, you have full visibility and control into all of your containers natively. Via eBPF you can see and firewall all of your traffic even in containers.

## What about CNI?

Cisco’s HyperShield solution does not integrate with CNI (Container Network Interface) directly. Instead, it relies on the Tesseract Security Agent, which is installed as an eBPF-based agent inside each workload, such as Kubernetes pods, virtual machines, or bare metal servers. 

This agent monitors and enforces security by intercepting system calls and interactions within the kernel, providing deep visibility and control over workload processes. However, its functionality operates independently of the CNI, meaning that it doesn’t use CNI plugins to manage networking or apply policies directly at the network interface level.

While CNI integration can simplify deployment within containerized environments, HyperShield’s design emphasizes universal compatibility and visibility by focusing on the kernel level rather than networking plugins, allowing it to operate across various environments, including public and private clouds​

## Agent Based Solution | Tesseract Security Agent | Challenge?

Cisco HyperShield is an agent based solution. 

The Cisco Tesseract Security Agent is a key component in the Cisco HyperShield. It utilizes eBPF, a technology that allows for deep, kernel-level monitoring of processes. By embedding itself into each process within the workload (e.g., Kubernetes containers or Linux VMs), the Tesseract Security Agent provides visibility and control over actions like file reads, process launches, and network connections. This agent can create an “application behavior graph” that tracks and analyzes the behavior of applications, flagging or blocking suspicious activities in real-time.

Cisco’s Tesseract agent enables HyperShield to detect and respond to unknown vulnerabilities by comparing behaviors against Common Weakness Enumeration (CWE) classifications, effectively preempting both known and emerging threats. This approach allows HyperShield to automatically recommend security adjustments and enforce granular, behavior-based policies tailored to each application. By applying these policies dynamically, HyperShield helps to secure workloads while minimizing the need for constant manual intervention.

This security model is part of Cisco’s broader vision to offer a distributed, AI-powered framework that can address security needs across the fabric of the network, particularly useful for modern AI-scale data centers and complex multi-cloud environments.

## What about Palo Alto Network Solution?

Palo Alto Networks offers an agent-based solution, similar to Cisco HyperShield, for securing Kubernetes workloads. This solution uses their **CN-Series** Container Firewalls, which integrate directly with Kubernetes clusters through the Container Network Interface (CNI). This approach enables granular security controls on individual workloads by embedding security policies directly into the Kubernetes environment. 

The CN-Series is specifically designed to protect applications running within containers, providing controls to secure network traffic between pods.
