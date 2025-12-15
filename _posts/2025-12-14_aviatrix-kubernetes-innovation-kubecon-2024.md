---
title: "ACE-Backbone LAB Guide"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 12, 2024", "https://learn.microsoft.com/en-us/azure/architecture/aws-professional/eks-to-aks/governance", "https://www.redhat.com/en/blog/most-common-kubernetes-security-issues-and-concerns-to-address", "https://www.redhat.com/en/resources/considerations-governance-risk-compliance-overview", "ACE", "cloud-networking", "Previous\u00a0post ACE-Backbone LAB Guide", "Next\u00a0post De-BuZz Review | Cisco HyperShield | AI Native Security"]
tags: []
original_url: https://netjoints.com/aviatrix-kubernetes-innovation-kubecon-2024/
---

I attended Kubecon 2024 last week in Salt Lake City. It was a great show, with a lot of Platform Engineers and developers in attendance. 

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5205-Large-edited.jpeg)

Reflecting on my initial encounter with Containers and Kubernetes when I was part of VMware in 2017, when Containerization and Kubernetes was just beginning to gain traction. The challenge of container orchestration alongside security was the main talk with my customer interaction back then.

Fast forward today, November 2024, the discussions I had customers, during the session I attended, the Kubernetes orchestration complexity and security is still top of the mind for many enterprises.   
  
The keynote I attended also highlighted an ironic yet recurring theme – you guessed it right, the security and Kubernetes complexity remain significant challenges. 

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5209-Large-1024x768.jpeg)

Notice “Traditional security approaches no longer work in a complex (meaning multi-cluster Kubernetes or multicloud) environment. This is exactly where I want you to focus on. 

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5210-Large-1024x768.jpeg)

So despite rapid adoption, security and complexity are still major concerns. I had the opportunity to engage with many customers at our booth, and it became clear that the understanding of security requirements is still lacking.

## Kubernetes Burning Security Concerns

Kubernetes was originally designed for a flat topology, excelling in pod-to-pod communication within the same flat structure. Kubernetes allows efficient communication between pods in this flat network structure, reducing the overhead compared to more complex network setups.  
<https://learn.microsoft.com/en-us/azure/architecture/aws-professional/eks-to-aks/governance>

Kubernetes clusters scaling up is directly proportional to the rise in security risks. As Kubernetes environments grow, the complexity and potential attack surfaces also increase, necessitating more robust security measures.  
<https://www.redhat.com/en/blog/most-common-kubernetes-security-issues-and-concerns-to-address>

However, Kubernetes doesn’t inherently provide governance from the infrastructure perspective. While Kubernetes includes several security features, it lacks comprehensive governance tools at the infrastructure level, often requiring additional solutions and frameworks to achieve a secure and compliant deployment.  
<https://www.redhat.com/en/resources/considerations-governance-risk-compliance-overview>

From an infrastructure or platform admin’s viewpoint, securing nodes, pods, and services requires a dual focus: security and governance. 

There are numerous projects under the CNCF umbrella, but #Aviatrix approaches securing Kubernetes from a unique infrastructure and network security perspective.

## Aviatrix Approach: Securing Kubernetes Egress Traffic 

One standout Aviatrix feature is securing Kubernetes workloads when they connect to the Internet, also known as Egress Security.

A natural question is that why should I use Aviatrix for secure egress? I have service mesh, it can protect my applications. Well the answer is that it is not the best practice and good approach. 

The best practice is to follow a layered security approach. My recommendation isn’t to replace service meshes but to enhance them. Aviatrix offers the initial layer of security and governance from the platform side, while the application owner can integrate service meshes within their specific application or service domains.

By adopting this approach, you can ensure robust security and effective governance across your Kubernetes environment.  


Aviatrix CoPilot can now show the existing Kubernetes EKS and AKS clusters. It also shows the associated Namespaces, Services and Kubernetes Pods within those clusters. 

## **Key Observations**

The gathering was primarily attended by Platform Engineers and Developers, with a few key individuals from networking, security, and infrastructure roles. Notably, those present were the decision-makers deeply invested in Kubernetes security.

#### 1\. Misconceptions about Service Mesh Security:

Several attendees were under the impression that “Service Mesh” provides comprehensive security. I clarified that Service Mesh predominantly handles application-level security (like HTTPS or TLS) and emphasized the necessity of a “layered security” approach.

#### 2\. Lack of Awareness Around Egress Security:

It’s apparent there’s a significant knowledge gap regarding Egress Security among DevOps, Developers, and Platform Engineers. Many were unaware of their implementations or falsely assumed that utilizing a NAT Gateway was enough. This highlights a pressing need for education in this area

#### 3\. Challenges with Last Generation Firewall:

A recurrent theme was the frustration around the dependency on firewall teams for implementing minor changes. Several attendees expressed a desire for greater autonomy, like applying security policies at the cluster or namespace level.

## **Product Reception and Feedback:**

The live demonstration of Aviatrix solutions was exceptionally well-received.   
**  
**The audience appreciated our agentless approach, avoiding the traditional sidecar or proxy models, which are often cumbersome. Attendees acknowledged the limitations of CNI-based solutions and valued our API integration approach with EKS and AKS clusters, which doesn’t require installing additional components on pods or clusters.

_Mentioning that our DCF leverages eBPF captured attention. eBPF is increasingly popular in the Kubernetes ecosystem, as evidenced by its prominence at several booths, such as Cisco Isovalent._

Three core topics deeply resonated with our audience:

1\. Egress Security  
2\. Addressing IP Exhaustion and Designing Island VPCs for Multicluster Deployments  
3\. Dynamic Policy Implementation and SmartGroup Concepts aligned with Kubernetes principles like namespaces, clusters, and pods

## My Final Take 

”  _KubeCon was a great opportunity to connect with customers, demo the latest Aviatrix innovations, and learn how key decision-makers are approaching security in this space. Demos of Aviatrix capabilities such as_ _Kubernetes Egress Security, IP address exhaustion, dynamic security policy enforcement for multicluster Kubernetes deployments, and Aviatrix Kubernetes SmartGroups were well-received._

_Many attendees I talked to expressed frustrations around the fractured security model with last-generation firewalls. Customers showed great interest in Aviatrix’s unified policy model, which caters to the needs of monolithic and micro-services-based application requirements with one security framework. They like the fact that the Aviatrix model apply security policies at the cluster, pods, or namespace level, without using any Sidecar, Agent, or Proxies. As the head of the Aviatrix Certified Engineer (ACE) Program, I also noticed a lack of awareness and skill gap in understanding the limitations of “Kubernetes Service Mesh” as a security option._ “

## Want to learn more?

Checkout my AI generated Podcast on the topic of Kubernetes Security.   


Also checkout Anirban’s Recording and analyst interviews for in depth analysis and where we are heading in future.

Also checkout my demo where I covered Aviatrix Secure Egress, Network Segmentation and Visibility feature for containarized workloads orchestrated by Kubernetes. 

## Scree Shots: 

Following are some screen shots of this intgration.

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_image-1024x405.png)

Following screen shows the namespaces

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_image-1-1024x456.png)

Following shows the services inside the cluster

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_image-2-1024x428.png)

Following shows the POD inside the dev-us-east1-eks cluster.

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_image-3-1024x405.png)

One can also onboard a cluster manually using the config file. 

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_image-4-787x1024.png)

The Aviatrix SmartGroup can also gorup K8S resources and then use them to create firewall rules. 

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_image-5-1024x1005.png)

## Call to Action

Take the Aviatrix ACE Security training to learn more about Cloud Perimeter Security and securing the egress traffic with hands on labs where you can deploy it yourself. 

> [ACE](https://aviatrix.com/ace/)

### Event Pictures

![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5200-Large-1024x769.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5196-Large-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5200-Large-1-1024x769.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_9199-Large-1024x851.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5205-Large-1-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5206-Large-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5207-Large-768x1024.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5209-Large-1-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5210-Large-1-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5215-Large-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5217-Large-768x1024.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5218-Large-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5219-Large-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5221-Large-1024x768.jpeg) ![](../../media/images/aviatrix-kubernetes-innovation-kubecon-2024_IMG_5224-Large-1024x768.jpeg)
