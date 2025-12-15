---
title: "Enterprise Solutions Architect Role for Career Growth"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "July 10, 2023", "Enterprises are experiencing the challenge of designing, deploying, and operating a", "Cloud networks", "cloud-networking", "Previous\u00a0post Enterprise Solutions Architect Role for Career Growth", "Next\u00a0post Cisco Intenet to Acquire Splunk for $28 Billion in Cash"]
tags: []
original_url: https://netjoints.com/time-to-downside-on-premise-up-the-cloud-your-enterprise-network/#respond
---

It is time for network admins, engineers, architects, and technology leaders to adopt a clear path and approach to gradually improve the old, MPLS-centric, SD-WAN type on-premise network data center and branch designs design and use the CSP (Cloud Service Provider) underlay network to build the Enterprise Cloud Network. A modern programmable Enterprise Cloud Network with a cloud backbone and cloud-delivered hybrid connectivity to build a comprehensive enterprise network delivered as a service.

# What is an Enterprise Cloud Network

An enterprise cloud network offers the necessary feature, functions, and operational framework to operate essential business applications in a public cloud environment. It is a cloud-defined private network infrastructure built on the shared public cloud footprint. This private network infrastructure is agile and programmable. It follows the cloud operating model principles and can be consumed as-a-service.

![](../../media/images/time-to-downside-on-premise-up-the-cloud-your-ente_image.png)Cloud Network Reference Design

Unlike SaaS-type networking solutions, the enterprise cloud network allows organizations to own their networks’ governance, control, management, and data plane. It provides a more elegant and agile operating model to control an enterprise’s cloud, multicloud, and hybrid-cloud network (on-prem DCs, branches, partners, etc.).

# What is Cloud Network Backbone

A Cloud Network Backbone provides a resilient, secure, and high-performant connectivity model which allows enterprises to seamlessly connect multiple cloud regions to critical resources across native cloud networks (VPC/VNET/VCN), on-prem resources, partners, B2B, and users. The cloud network backbone is the core layer of your cloud network, providing visibility, telemetry, and policy enforcement for consolidated, consistent networking and security.

# Challenges in Building Cloud Network Backbone

Enterprises are experiencing the challenge of designing, deploying, and operating a modern, scalable, agile cloud network infrastructure. This is evident amongst the early cloud adopters and enterprises embarking on the network modernization journey today. The following section discusses some main challenges enterprises observe that contribute to inefficiencies and gaps that adversely impact enterprise business.

## Organizational Challenges

In many large organizations, technical teams remain isolated in separate units. Cloud teams often own all aspects of cloud infrastructure, including applications and associated in-cloud networking. The network team is considered an advisor for in-cloud networking and only owns the cloud on-ramp (aka connectivity from on-prem to cloud). This results in native CSP connectivity construct (such as AWS Transit Gateway, Azure Firewall or vWAN, GCP NCC, etc.) becoming a shared entity where the networking team connects the on-prem network. Still, it is owned by the cloud team.

This scenario poses several challenges:

  * No one has a complete view of the networking landscape. The cloud team knows about their side and VPC/VNET/VCN. In contrast, the network team only knows about the on-prem side with limited visibility to native cloud connectivity constructs.
  * CSP connectivity constructs offer minimal traffic engineering and route scale, making it difficult for networking teams to offer redundant and high-performance secure connectivity.
  * The network team must rely on on-prem telemetry and diagnostics, significantly increasing MTTR.
  * Many cross-functional team resources must be involved during change windows and incident calls. This unnecessary cross-functional team dependency increases the cost and complexity.
  * 


## Technical Challenges

Let’s talk about technical challenges you would encounter with legacy or old approaches of building cloud networks. 

**Increased Cost and Latency:** Cloud networks built using only native constructs are sub-optimal designs. These designs increase cost and complexity, resulting in disjointed security, increased latency, and poor visibility.

**Single-Pane Network View:** Cloud-native network services are built and offered extremely molecularly. Each sub-component needs to be individually configured and managed. Each component has its console and troubleshooting dashboard, only accessible to account owners. It means there could be more than a dozen consoles open, in most cases, to deploy, manage and operate the cloud network. This also results in any individual lacking a comprehensive network view.

**Route Scale and Control Limitations:** CSP native routing constructs provide limited scale and control. Also, each CSP offers different limits and features, making a consistent network impossible. Enterprises must carefully architect their routing designs, often resulting in an over-engineered solution. 

**Firewall Service Insertion Complexities:** Insertion of Firewall services is complex in the cloud. It requires carefully carved networks with extensive route manipulation to steer traffic to Firewall. Many organizations have Firewall services in the cloud and on-prem that increase cost, latency, and on-prem dependency. It hurts the enterprise’s vision to adopt cloud-based network modernization efforts.

**Siloed SDWAN/SASE Connectivity:** Connecting SDWAN/SASE to the cloud is also done in a manner that creates more siloes. The problem aggravates when disparate on-prem devices with varying technologies connect to cloud resources. The inconsistent behavior of these on-prem devices creates operational challenges and unnecessary FTE resources.

**Slow Onboarding:** Overlapping IP and segmentation (VRF) support is a common requirement during M&A, partner onboarding, and B2B connection to the backbone. Cloud-native features and tools do not simplify or support these features as expected by the enterprises, hence often time projects are delayed due to the increased complexity of implementing such solutions. 

**Inefficient Internet Breakout:** Internet breakouts using on-prem DMZ, Firewalls, or MPLS breakout solutions are rigid, expensive, and add additional latency. This is challenging when the cloud applications need internet connectivity or connectivity to SaaS services.

**Inconsistent Automation:** In the absence of common management and control plane, enterprises are forced to use different automation frameworks and languages to provide a network as a service in a programmable fashion.

**Broken Segmentation and Limited Encryption:** Due to limited native encryption performance, these sub-optimal networks are built without end-to-end encryption, which increases the security risk and makes them prone to man-in-the-middle type attacks. 

## What is the Solution, then?

The solution is to think Downside-IN. Meaning extends the Cloud Operating model to On-prem locations and hybrid connectivity and not the other way around.

With Aviatrix Cloud Network Backbone Solution, network teams own the entire cloud backbone and both ends of on-ramp connection to the cloud.

![](../../media/images/time-to-downside-on-premise-up-the-cloud-your-ente_image-2-1024x510.png)

On the technical side, it gives them the features and functionality they need to support the infrastructure. On the organizational side, it reduces the multi-team dependency on change controls and incident response. Organizations can act efficiently and optimize their resources with clear lines of demarcation in roles and ownership.

## I Need More

Aviatrix has created a unique training part of their ACE Program to investigate this topic and its solutions. It talks about a typical existing design opted for by many enterprises to provide region-to-region or cloud-to-cloud connectivity. The training then discusses a journey or phased approach enterprises could take to enhance the existing design without disrupting the applications and their connectivity to the existing cloud-native services such as AWS TGW/CloudWAN, Azure vWAN, or GCP NCC.

Signup here to learn more from the pros (Saad and Shahzad) who have done it for many enterprises. 
