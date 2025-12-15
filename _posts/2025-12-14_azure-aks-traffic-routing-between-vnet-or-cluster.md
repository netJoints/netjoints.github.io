---
title: "SAP S4/HANA MSP Design with Multicloud Backbone"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "March 13, 2023", "https://learn.microsoft.com/en-us/azure/aks/configure-azure-cni#frequently-asked-questions", "cloud-networking", "Previous\u00a0post SAP S4/HANA MSP Design with Multicloud Backbone", "Next\u00a0post Cloud Architecture Mistakes: Losing Visibility and Control"]
tags: []
original_url: https://netjoints.com/azure-aks-traffic-routing-between-vnet-or-cluster/
---

AKS is Azure Kubernetes Service. It is a K8S service managed by Azure. 

  * Traffic leaves the VNET where the cluster is deployed
  * Traffic is visible for inter-cluster communication as long as there’s no overlay and as long as they are on different VNETs
  * In AKS when pods communicate with services outside the local VNET, everything is SNAT’ed to worker IP, even Azure CNI. This is a common issue with any NAT solution and well understood
  * AKS programs the kube-proxy rule in a way that only excludes local VNET CIDR
  * 


<https://learn.microsoft.com/en-us/azure/aks/configure-azure-cni#frequently-asked-questions>

Q: What source IP do external systems see for traffic that originates in an Azure CNI-enabled pod?

A: Systems in the same virtual network as the AKS cluster see the pod IP as the source address for any traffic from the pod. Systems outside the AKS cluster virtual network see the node IP as the source address for any traffic from the pod.

Aviatrix is one of the solutions that support Azure AKS. It can provide visibility for traffic coming in and out of the cluster and provide value-added with distributed egress for these clusters since they typically tend to run into SNAT port exhaustion.
