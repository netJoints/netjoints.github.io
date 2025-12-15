---
title: "Cloud to On Premise Data Center Active/Standby Firewall Design and Deployment"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "November 1, 2020", "roles and their permission details", "Shielded VMBETA", "shared VPC", "Following table shows the options", "https://cloud.google.com/compute/docs/autoscaler", "https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-unmanaged-instances", "cloud-networking", "Previous\u00a0post Cloud to On Premise Data Center Active/Standby Firewall Design and Deployment", "Next\u00a0post Aviatrix\u2019s Check Point CloudGuard Related Features"]
tags: []
original_url: https://netjoints.com/gcp-native-networking-concepts-cheat-sheet/#respond
---

  * Cloud Armor – A service that sits before a native Load Balancer to protect against DDoS attacks. In GKE, the target for Cloud Armor service is GKE Ingress LB


  * Load Balancer Options
    * There are different load balancer options in GCP based on specific requirement

Load Balancer| Traffic Type| Global/Regional| External/  
Internal| External Ports  
---|---|---|---|---  
HTTP(s)| HTTP or HTTPS| Global IPv4/v6| External| HTTP on 80 or 8080  
HTTPS on 443  
SSL Proxy| TCP with SSL offload| Global IPv4/v6| External| 25, 43, 110, 143, 195, 443, 465,  
587, 700, 993, 995, 1883, 5333  
TCP Proxy| TCP without SSL offload  
Client IP not preserved| Global IPv4/v6| External| 25, 43, 110, 143, 195, 443, 465,  
587, 700, 993, 995, 1883, 5333  
NLB (Network)| TCP/UDP without SSL offload  
Client IP preserved| Regional  
IPv4| External| Any  
HTTP(s)| HTTP or HTTPS| Regional  
IPv4| Internal| HTTP on 80 or 8080  
HTTPS on 443  
TCP/UDP| TCP or UDP| Regional  
IPv4| Internal| Any  
  
  * As a network and security admin, it is important to know about at least following [roles and their permission details](https://cloud.google.com/compute/docs/access/iam)
  * `roles/compute.admin`
  * `roles/compute.loadBalancerAdmin`
  * `roles/compute.networkAdmin`
    * Permissions to create, modify, and delete networking resources, except for firewall rules and SSL certificates. 
    * The network admin role allows read-only access to firewall rules, SSL certificates, and instances (to view their ephemeral IP addresses). 
    * The network admin role does not allow a user to create, start, stop, or delete instances.
    * For example, if your company has a security team that manages firewalls and SSL certificates and a networking team that manages the rest of the networking resources, then grant this role to the networking team’s group.
  * `roles/compute.securityAdmin`
    * Permissions to create, modify, and delete firewall rules and SSL certificates, and also to configure [Shielded VMBETA](https://cloud.google.com/security/shielded-cloud/shielded-vm) settings.
    * For example, if your company has a security team that manages firewalls and SSL certificates and a networking team that manages the rest of the networking resources, then grant this role to the security team’s group.
  * `roles/compute.xpnAdmin`
    * Permissions to administer [shared VPC](https://cloud.google.com/vpc/docs/shared-vpc) host projects, specifically enabling the host projects and associating shared VPC service projects to the host project’s network.
    * At the organization level, this role can only be granted by an organization admin.
    * Google Cloud recommends that the Shared VPC Admin be the owner of the shared VPC host project. The Shared VPC Admin is responsible for granting the Compute Network User role (`roles/compute.networkUser`) to service owners, and the shared VPC host project owner controls the project itself. Managing the project is easier if a single principal (individual or group) can fulfill both roles.


  * GCP does not log the deny request for the firewall log, unless a rule is hit. Best practice is to create a deny all firewall rule with priority 65500 to deny all traffic and then enable logs 


  * Shared VPC is the place where one terminate the Cloud Interconnect private connection and enable the VLAN
  * Best practice is to disable the auto subnet creation
    * Auto subnet creation can cause overlapping IP between VPCs
  * The best practice is to create multiple VPCs in GCP. Having just one or few global VPCs will not allow you to segment the traffic and workload in future
  * It is also a good idea to stay away from GCP Shared VPC concept. Shared VPC concept is not to create network boundary of hub-spoke architecture. Shared VPC is just an administrative concept so that Network and Sec. admin can assing subnet and firewall rules to Service or Client VPCs 



## On-Premise to GCP Connectivity (Hybrid) Options

[Following table shows the options](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/partner-overview#connectivity-type)

| **Dedicated**| **Shared**  
---|---|---  
**Layer3**|  Direct Peering| Career Peering  
**Layer2**|  Dedicated Interconnect| Partner Interconnect  
  
  * For layer 2 connections, traffic just passes through the service provider’s network. 
    * Service Provider Network acts as L2 only. 
    * It means for layer 2 connections, you must configure and establish a BGP session between your Cloud Routers and on-premises routers.
  *   * For layer 3 connections, your service provider establishes a BGP session between GCP Cloud Routers and their edge routers. 
    * You don’t need to configure BGP on your on-premises router. 
    * Google and your service provider automatically set the correct configurations.



## GKE Cluster IP Address Scheme

3 different types of IP ranges are required

  * Node
    * Primary CIDR is assigned to the node
  * Pod
    * Secondary or Alias IP is assgined to the Pods
    * default network size is /24. This cannot be smaller than this.
    * Pod IPs are assigned on per Node basis
    * Pod IPs are always the dobule the requirement because these PODs are created and destryoed all the time. Or when you update or do antyhing then first the new POD is deployed and then old is deleted
  * Services: 
    * Secondary or Alias IP is used by the Services as well



### Example: 

If a GKE cluster is of 2 nodes then it means at minimum you would need two /24 networks for Pod IP assignment. 

## Auto-scaling and VPC Dependencies

Unmanaged Instance Group only resides in a single zone, VPC network and subnet. It is not a good idea to use the unmanaged Instance Group (UIG). UIG cannot do autoscaling as well.

Autoscaling only works with zonal and regional managed instance groups (MIGs). It means autoscaling cannot cross region boundaries. So it means if you use a single VPC with autoscaling, you are limited to only one region. So in essence your VPC is not really global from application perspective. So why should you restrict your design to single VPC? Using single VPC is not a good idea for many reasons, and this is just one of them.

<https://cloud.google.com/compute/docs/autoscaler>

<https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-unmanaged-instances>
