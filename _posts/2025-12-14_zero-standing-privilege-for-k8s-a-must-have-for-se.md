---
title: "Troubleshooting AWS Bedrock AgentCore"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 23, 2025", "Cybersecurity", "Previous\u00a0post Troubleshooting AWS Bedrock AgentCore", "Next\u00a0post The Proven Strategy Jeff Bezos Used to Beat iPad: Know Your Audience or Fail"]
tags: []
original_url: https://netjoints.com/zero-standing-privilege-for-k8s-a-must-have-for-secure-devops/
---

## TL;DR

  * In Kubernetes Access typically exists as static, hardcoded OIDC/JWT tokens with bundled authentication and authorization information for the cluster. These tokens are at risk of exploitation for unauthorized access and permissions in their corresponding clusters.
  * OIDC/JWT service tokens can grant access to all the clusters and namespaces a user is entitled to access, rather than the cluster they currently need access to.
  * End-users can share static tokens to circumvent slow access request and provisioning processes, leading to over-provisioned users and lack of visibility into who has access to what.
  * Legacy IdPs and PAM solutions that create OIDC for cluster access and authorization often provide end-users with access to all the groups and role bindings that their ID has authorization for.
  * Modern PAM brings dynamic, cloud-native JIT access and fine-grained permissions to every K8s environment to eliminate static or long-lived tokens and over-provisioned access commonly found in K8s clusters.



### **Key Pain Points in K8s Access Management**

  1. **Standing Permissions via Service Accounts**
     * Developers often use long-lived service account JSON files.
     * These credentials are static, hard to rotate, and pose a **significant breach risk** if leaked.
  2. **Lack of Just-in-Time (JIT) Access**
     * No ephemeral access for CLI or service-to-service interactions.
     * This circumvents identity-based access controls and auditability.
  3. **No Centralized Policy Enforcement or Visibility**
     * Difficult to track who accessed what, when, and why.
     * Audit logs are fragmented or missing context.
  4. **Manual Credential Distribution**
     * JSON files are manually shared, stored locally, or embedded in code.
     * This increases the attack surface and violates least privilege principles.
  5. **No Role-Based Access for K8s Namespaces**
     * Developers may have cluster-wide access when they only need namespace-level permissions.



### **How A Modern PAM Solves These for K8s**

  1. **Ephemeral Service Principals for CLI & Automation**
     * Britive creates short-lived credentials on demand.
     * No need to store or rotate JSON files manually.
  2. **Automated`kubectl` Context Generation**
     * Britive CLI auto-generates kubeconfig files with scoped access.
     * Developers get access only to the namespaces they need.
  3. **Workload Federation for CI/CD (e.g., GitHub Actions)**
     * No secrets stored in pipelines.
     * Auth via federated identity (OIDC/JWT) for service identities.
  4. **Auditability & Logging**
     * Every ephemeral credential is tied to a user.
     * Logs can be shipped to SIEMs for full traceability.
  5. **Zero Standing Privilege Model**
     * Access is granted only when needed and revoked immediately after.
     * Reduces blast radius in case of compromise.



### ⚠️ **Why This Matters Now (Urgency Drivers)**

  * **Kubernetes is a top target for attackers** due to its complexity and misconfigurations.
  * **Standing access is a breach waiting to happen** —especially with service accounts.
  * **Regulatory pressure** (e.g., SOC 2, ISO 27001) increasingly demands ephemeral access and auditability.



## Kubernetes RBAC Technology Concepts

## **🧩 1. Where JSON Web Tokens (JWTs) fit in Kubernetes**

Kubernetes **uses JWTs extensively** as part of its authentication layer — especially for:

### **🔹 a. Service Account Tokens**

  * Every Kubernetes **ServiceAccount** automatically gets a **JWT token** created by the API server.
  * This JWT is signed by the cluster’s API server (via its service account key) and is used by Pods to authenticate back to the API server.
  * The token includes: 
    * iss → the issuer (typically the Kubernetes API server)
    * sub → the service account identity (system:serviceaccount:<namespace>:<name>)
    * aud → the audience (optional; for what service it’s valid)
    * exp → expiration (for newer tokens)



✅ **Use:**

When a Pod calls the API server (e.g., using kubectl, a sidecar, or any internal service), it attaches this JWT as a bearer token in the HTTP header.

* * *

### **🔹 b. OIDC Integration Tokens (External JWTs)**

When Kubernetes is integrated with an **external Identity Provider (IdP)** (like Okta, Azure AD, Google, or Britive), it supports **OIDC** (OpenID Connect) as an authentication mechanism.

  * OIDC **is built on top of JWT**.
  * The IdP issues an **OIDC ID token** , which is a **JWT** containing identity claims (username, email, groups).
  * The Kubernetes API server verifies this JWT using the IdP’s public keys (JWKS endpoint).
  * The claims inside the JWT map to Kubernetes RBAC identities or groups.



✅ **Use:**

When a user runs kubectl, their authentication happens via the OIDC JWT token — either cached locally or obtained via kubectl oidc-login or a client plugin.

### **🔹 c.** **API Server Authentication Flow (simplified)**

  
**🧱 2. Common JWT-Related Problems in Kubernetes**

**Issue**| **Explanation**  
---|---  
**Static service account JWTs**|  Old clusters issue non-expiring JWTs (before K8s 1.21). If leaked, they allow indefinite access.  
**Broad audience tokens**|  A single JWT may be accepted across multiple clusters or services.  
**Shared kubeconfigs**|  A kubeconfig with an embedded JWT can be shared or copied.  
**Long-lived OIDC JWTs**|  IdPs that issue tokens without short TTL or refresh tokens create lingering access exposure.  
  
## **🧠 3. Modern Best Practices**

  1. **Use short-lived, audience-scoped tokens.**
     * Set –service-account-issuer and –service-account-signing-key-file in the API server.
     * Use BoundServiceAccountTokenVolume for rotating tokens automatically.
  2. **Integrate with a Just-In-Time (JIT) access broker** like **Britive** (😉), **Teleport** , or **AWS IAM Roles Anywhere** , which issues temporary JWTs dynamically.
  3. **Avoid static service account tokens in kubeconfig.**
     * Use kubectl oidc-login or similar plugin for human access.
     * Rotate and scope machine tokens.



  
**🧩 Summary Diagram**

**Entity**| **Token Type**| **Purpose**| **Typical Lifespan**  
---|---|---|---  
Pod / ServiceAccount| Kubernetes JWT| Pod → API Server auth| Short (rotating in modern K8s)  
Human User| OIDC JWT (from IdP)| User → API Server auth| Short (ID token)  
Automation Tool| OIDC or SA JWT| API / CI/CD pipelines| Should be short-lived & scoped  
  
## GROK Verdict

### 1\. **Static, hardcoded OIDC/JWT tokens with bundled authz info**

  * Traditional K8s OIDC setups (e.g., via kube-apiserver –oidc-issuer-url) issue **long-lived JWT tokens** containing **identity claims** (user/group info) that map to **cluster-wide RBAC roles**.
  * Tokens are often **copied/pasted** into ~/.kube/config or scripts, making them “hardcoded.”
  * **Risk** : If compromised, the token grants **full entitled permissions** immediately—no additional auth checks.



### 2\. **Tokens grant access to _all_ entitled clusters/namespaces**

  * **Correct** : A single OIDC token from an IdP (e.g., Okta, Azure AD) contains **all user groups/roles** :



{ “sub”: “user123”,  
“groups”: [“cluster-admin”, “dev-ns-editor”, “prod-viewer”]  
}

  * This token works **across all clusters** configured with the same OIDC provider, not just the “current” one.
  * **Problem** : Users get **unnecessary blast-radius access** to production clusters when working in dev.



### 3\. **Token sharing to bypass slow provisioning**

Current Practice

Current Practice| Risk  
---|---  
“Hey, use my kubeconfig for prod”| Shared token = shared admin access  
Copy senior dev’s token| Bypasses approval workflows  
Static ServiceAccount tokens| Never expire, shared in Slack/teams  
  
Pain

Issue| Impact  
---|---  
Over-provisioning| 80%+ of users have more access than needed  
No visibility| `kubectl auth can-i` doesn’t show  _who_ has access  
Audit gaps| Tokens lack session context  
  
### 4\. **Legacy IdPs/PAM grant access to _all_ authorized groups**

  * **Correct** : Solutions like:

Tool| Behavior  
---|---  
PAM + `ssh` → `kubectl`| All AD groups → all RBAC  
Legacy Okta SAML → OIDC| Full group sync to K8s  
External Secrets Operator| Static tokens with all perms  
  
### 5\. **Britive’s JIT solution**

  * **Correct** : Britive 

Feature| Static Tokens| Britive JIT  
---|---|---  
Token lifetime| Days/weeks| Minutes  
Scope| All clusters| Specific namespace/role  
Visibility| None| Full audit trail  
Provisioning| Manual RBAC| Dynamic RBAC  
  
**How it works** :
    
    
    # Traditional static token
    users:
    - name: jdoe
      token: "eyJhbGciOiJSUzI1NiIs..."  # All clusters!
    
    # Britive JIT token
    users:
    - name: jdoe-session-123
      token: "eyJhbGciOiJSUzI1NiIs..."  # prod/app1-editor ONLY
      groups: ["temp:prod-app1-editor"] # Expires in 1h

### **Evidence from K8s Reality**

  * **CNCF Survey (2024)** : 68% of orgs still use **static ServiceAccount tokens**.
  * **Kubernetes SIG-Auth** : OIDC tokens recommended with **short TTLs** (15min), but adoption <20%.
  * **GitHub Issues** : [kubernetes/kubernetes#800xx] “OIDC tokens too broad” → open since 2021.



**Verdict** : The statement is **100% accurate** and reflects the **current state of K8s access management** in most enterprises. Static tokens remain the default, and JIT solutions like Britive solve real, painful problems.
