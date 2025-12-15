---
title: "Britive Access Broker Best Practices and Troubleshooting Tips MySQL Database"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "June 24, 2025", "Cybersecurity", "britive", "Previous\u00a0post Britive Access Broker Best Practices and Troubleshooting Tips MySQL Database", "Next\u00a0post OKTA Identity Provider Integration with Britive | Getting Started Guide"]
tags: ["Shahzad Ali", "June 24, 2025", "Cybersecurity", "britive", "Previous\u00a0post Britive Access Broker Best Practices and Troubleshooting Tips MySQL Database", "Next\u00a0post OKTA Identity Provider Integration with Britive | Getting Started Guide"]
original_url: https://netjoints.com/kubernetes-just-in-time-access/#respond
---

The output of the `kubectl config get-contexts` command shows the available Kubernetes contexts configured in your kubeconfig file.

![](../../media/images/kubernetes-just-in-time-access_image.png)

  * The `CURRENT` column is empty for all rows, which means **no context is currently active**.
  * You have **four contexts** configured, each representing a different role or permission level within the same EKS (Elastic Kubernetes Service) cluster.
  * All contexts use the same `AUTHINFO` (user identity): `demo-shahzad.ali@britive.com`.
  * Here **role-based access control (RBAC)** is being used with **Just-In-Time (JIT)** access provisioning.
  * The names (`cluster-admin`, `eks-ns-manager`, `jit-adm`, `jit-dev`) imply different levels of access: 
    * `cluster-admin`: full cluster admin access.
    * `eks-ns-manager`: AWS EKS namespace-level manager.
    * `jit-adm`: JIT admin access.
    * `jit-dev`: JIT developer access.
  * The `NAMESPACE` column is empty, meaning these contexts will default to the `default` namespace unless overridden.



### **Switch the Active Kubernetes Context**
    
    
    Run this command: _$ kubectl config use-context jit-dev_

  * It sets the **current context** in your kubeconfig to `jit-dev`.
  * This means **all subsequent`kubectl` commands** will now: 
    * Connect to the **cluster** associated with `jit-dev`.
    * Use the **authentication credentials** (`demo-shahzad.ali@britive.com`).
    * Operate in the **default namespace** (unless overridden).



Kubernetes contexts are like profiles. Switching context is like saying: “**From now on, I want to interact with this specific cluster, using this specific identity and namespace.** ”

Now run the command kubectl get pods, but you will get an error

> ![](../../media/images/kubernetes-just-in-time-access_image-1.png)

### Pod is Forbidden Error

The error message you’re seeing:
    
    
    Error from server (Forbidden): pods is forbidden: User "https://demo.britive-app.com/oidc/rtdygaz2jvwe0m00#shahzad.ali@britive.com" cannot list resource "pods" in API group "" in the namespace "default"
    

means that the **current user does not have permission to list pods** in the `default` namespace. 

## Automatic Britive Profile Checkout

Now switch the context using “kubectl config use-context jit-adm” command
    
    
    $ kubectl config use-context jit-adm
    Switched to context "jit-adm".
    $ kubectl get pods -n jit
    
    NAME                              READY STATUS  RESTARTS AGE
    nginx-deployment-86dcfdf4c6-b8v4r 1/1   Running 0        341d 
    nginx-deployment-86dcfdf4c6-ftxck 1/1   Running 0        341d

Following command automatically checkout a Britive profile called “**EKS JIT Admin”** and list the pods
    
    
    $ kubectl get pods -n jit

### 🔐 **Behind the Scenes: Britive + Kubernetes + JIT Access**

  1. **Britive is managing Kubernetes access** : 
     * We are using **OIDC (OpenID Connect)** to authenticate via Britive.
     * kubeconfig is configured to use a **Britive-issued identity token**.
  2. **JIT (Just-In-Time) Access** : 
     * When I run a `kubectl` get get pods -n jit command, my kubeconfig is set up to **dynamically request a token** from Britive.
     * This token is tied to a **specific role or profile** , like `EKS JIT Admin`.
  3. **Namespace Triggers Role Activation** : 
     * Accessing the `jit` namespace is **mapped to a specific Britive profile** (e.g., “EKS JIT Admin”).
     * Britive sees the request and **automatically activates the appropriate JIT role** for that namespace or action.
  4. **Token Injection** : 
     * Britive injects a short-lived token into your kubeconfig or session.
     * This token grants temporary permissions (e.g., to list pods in `jit`).



### 🔍 Where Is the Mapping Between Namespace and Britive Profile?

This mapping is **not stored in local kubeconfig** or in any Kubernetes-native file. Instead, it is dynamically managed by **Britive’s access policies and automation rules**. Here’s how it works:

### 🔐 **How the Mapping Works (Conceptually)**

  1. **Britive Admin Configuration** : 
     * In the **Britive platform** , administrators define **JIT access profiles** (like “EKS JIT Admin”).
     * These profiles are mapped to specific **Kubernetes roles or ClusterRoles**.
     * Access policies may include conditions like: 
       * Namespace = `jit` → assign `EKS JIT Admin`
       * Namespace = `dev` → assign `EKS JIT Developer`
  2. **Access Request Flow** : 
     * When I run `kubectl get pods -n jit`, my kubeconfig (via OIDC) triggers a token request to Britive.
     * Britive evaluates the request and **dynamically issues a token** tied to the appropriate profile (e.g., “EKS JIT Admin”).
  3. **Token Injection** : 
     * The token is injected into your kubeconfig or session.
     * This token has permissions defined by the role associated with the Britive profile.



### 📁 Files Involved (Locally)

  * **`~/.kube/config`** : 
    * Contains the context, cluster, and user info.
    * May reference an **OIDC provider** (Britive).
    * Does **not** contain the namespace-to-profile mapping.
  * **Britive CLI or Plugin Config (if used)** : 
    * If you’re using a CLI tool or plugin from Britive, it may have a config file (e.g., `.britive/config.json`) that defines how profiles are requested or cached.



### 🔍 Key Observations from Your Kubeconfig

#### ✅ **1\. Britive Integration via`exec` Plugin**

Your user section looks like this:
    
    
    users:
    - name: demo-shahzad.ali@britive.com
      user:
        exec:
          command: /Users/shahzadali/.pyenv/versions/3.13.2/bin/pybritive-kube-exec
          args:
            - -t
            - demo

  * This means `kubectl` uses the **`pybritive-kube-exec`** command to fetch a token **on demand**.
  * The `-t demo` argument refers to a **Britive demo.britive-app.com tenant**.



#### ✅ **2\. Britive Profiles Mapped via Cluster Extensions**

Each cluster entry includes a `britive-profile` extension, like:

extensions:  
– extension:  
britive-profile: jit-dev  
name: client.authentication.k8s.io/exec

This is **how the mapping happens** :

  * When you switch to a context (e.g., `jit-dev`), it uses the cluster `demo-dev cluster a - eks-eks jit developer`.
  * That cluster has a `britive-profile` of `jit-dev`.
  * So, **when you run a command** , `pybritive-kube-exec` uses that profile to request a JIT token from Britive.



### 🧠 Summary: How Namespace Access Triggers Britive Profile

  * The **context** you use (e.g., `jit-dev`) determines the **cluster**.
  * The **cluster** has a `britive-profile` extension (e.g., `jit-dev`, `jit-adm`, etc.).
  * The **`pybritive-kube-exec`** tool uses that profile to request a token from Britive.
  * That token grants access to specific **namespaces and actions** , as defined in **Britive’s access policies**.



## 🔗 **Relationship Between`pybritive.config` and `kubeconfig`**

My setup uses **Britive’s Just-In-Time (JIT) access** model, and the two files play complementary roles:  
  


### 🧩 1. `kubeconfig` File

  * This is the standard Kubernetes configuration file used by `kubectl`.
  * It defines: 
    * **Clusters** (where your Kubernetes API servers live)
    * **Users** (how you authenticate)
    * **Contexts** (which cluster + user + namespace to use)
  * In your case, the `user` section uses an `exec` plugin:



exec:  
command: /Users/shahzadali/.pyenv/versions/3.13.2/bin/pybritive-kube-exec  
args:  
– -t  
– demo

This tells `kubectl` to run the `pybritive-kube-exec` command to get a token **from Britive**.  
  
🧩 2. **`pybritive.config` File**

This is the **configuration file for the`pybritive` CLI tool**.

It defines:

  * **Tenants** (e.g., `demo`, `corp`, `labs`, etc.)
  * **Profile aliases** (short names like `jit-dev`, `cluster-admin`, etc.)
  * **Settings** like auto-refresh and output format.



#### 🔑 Key Section: `[profile-aliases]`

This maps short names (like `jit-dev`) to full Britive profile paths:

jit-dev. =aws – eks demo/dev cluster a – eks/eks jit developer  
jit-adm. =aws – eks demo/dev cluster a – eks/eks jit admin  
cluster-admin =aws – eks demo/dev cluster a – eks/cluster admin

So when your `kubeconfig` references a cluster with:

extensions:  
– extension:  
britive-profile: jit-dev

The `pybritive-kube-exec` tool looks up `jit-dev` in `pybritive.config`, finds the full profile path, and requests a token for that profile from the `demo` tenant.

### 🔄 How It All Works Together

  1. You run a `kubectl` command.
  2. `kubectl` sees that the user is configured to use `exec` with `pybritive-kube-exec`.
  3. `pybritive-kube-exec`: 
     * Reads the `britive-profile` from the cluster extension in `kubeconfig`.
     * Looks up the full profile path in `pybritive.config`.
     * Contacts the Britive tenant (`demo`) to get a JIT token for that profile.
  4. The token is returned to `kubectl`, which uses it to authenticate with the Kubernetes API.



### ✅ Summary

File| Purpose| Key Role  
---|---|---  
`~/.kube/config`| Kubernetes config| Defines clusters, users, and contexts. Uses `pybritive-kube-exec` to get tokens.  
`~/.pybritive.config`| Britive CLI config| Maps profile aliases to full Britive profiles and defines tenant URLs.
