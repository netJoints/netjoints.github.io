---
title: "PowerShell Script | Add User to Local Admin Group | JIT"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 1, 2025", "Cybersecurity", "Previous\u00a0post PowerShell Script | Add User to Local Admin Group | JIT", "Next\u00a0post AWS EKS Role Binding and OIDC Configuration"]
tags: []
original_url: https://netjoints.com/gke-kubernetes-k8s-demo/#respond
---

Before we start the demo quick Kubernetes RBAC primer. 

  * K8S define fine-grained access control policies that suit an organization’s security requirements
  * K8S RBAC segregates responsibilities by assigning different roles to different teams or individuals 
  * K8S RBAC enables you to restrict access to specific namespaces. This can be useful when multiple teams or projects share a cluster, and you want to isolate their resources and limit their privileges within their designated namespaces



![](../../media/images/gke-kubernetes-k8s-demo_image-1.png)

## PAM Solution

The PAM solution relies heavily on the rich and granular K8S RBAC configuration. PAM solution can apply access, permissions and roles at both the cluster level as well as an individual namespace level. 

### K8S Role Binding
