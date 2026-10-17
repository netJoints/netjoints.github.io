---
title: "Britive Datadog (SIEM) Integration Steps"
date: 2025-04-19 12:00:00 +0000
author: Unknown
categories: ["Shahzad Ali", "April 19, 2025", "Cybersecurity", "IAM", "britive", "Previous\u00a0post Britive Datadog (SIEM) Integration Steps", "Next\u00a0post Britive API / CLI to Trigger Cloud Data Scan"]
tags: ["Shahzad Ali", "April 19, 2025", "Cybersecurity", "IAM", "britive", "Previous\u00a0post Britive Datadog (SIEM) Integration Steps", "Next\u00a0post Britive API / CLI to Trigger Cloud Data Scan"]
original_url: https://netjoints.com/kubernetes-access-security-and-iam/
---
## The three layers

1. **Authentication**: how a person or workload proves who it is to the cluster.
2. **Authorization**: what that identity may do inside Kubernetes.
3. **Workload to cloud IAM**: what pods may do to cloud resources (S3 buckets, databases, queues).

## 1. Authentication

* Kubernetes itself has **no user database**. It trusts **client certificates, bearer tokens, OIDC, or webhook** authenticators.
* Managed clusters connect to the cloud identity system: **AWS EKS** uses IAM (access entries, or the older `aws-auth` ConfigMap), **GKE** uses Google identities, and **AKS** uses **Microsoft Entra ID**.
* Prefer **OIDC with your central identity provider and MFA** over long-lived certificates or shared kubeconfigs.

## 2. Authorization (RBAC)

* **Roles** and **ClusterRoles** define verbs on resources. **RoleBindings** and **ClusterRoleBindings** attach them to users, groups or service accounts.
* Apply **least privilege**. Avoid `cluster-admin` for daily work and avoid wildcards.
* Map **IdP groups** to RBAC groups so that access follows team membership.
* Add **admission controls** (Pod Security Admission, OPA Gatekeeper or Kyverno) for guardrails beyond RBAC.

## 3. Workload identity (pods to cloud)

Avoid storing cloud keys in Secrets. Use a federated workload identity instead:

* **EKS**: **IAM Roles for Service Accounts (IRSA)** or **EKS Pod Identity**
* **GKE**: **Workload Identity Federation for GKE**
* **AKS**: **Microsoft Entra Workload ID**

Each ties a **Kubernetes service account** to a cloud role with short-lived credentials.

## Moving toward zero standing privilege

* Grant cluster admin and production access **just in time**, with approval, a time limit and automatic revocation.
* Use **session recording and audit logs** (Kubernetes audit logs plus cloud audit trails) so every privileged action is attributable.
* Rotate or remove static credentials, and review who still holds permanent bindings.

## Quick checklist

* OIDC login with MFA, no shared kubeconfigs
* IdP group to RBAC group mapping
* No wildcard roles; limited `cluster-admin`
* Workload identity instead of static cloud keys
* Audit logging on and shipped to a central place
* Time-bound elevated access
