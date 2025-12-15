---
title: "De-BuZz Review | Cisco HyperShield | AI Native Security"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 27, 2024", "https://learn.microsoft.com/en-us/azure/route-server/route-server-faq#limitations", "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-faqs", "cloud-networking", "azure", "Previous\u00a0post De-BuZz Review | Cisco HyperShield | AI Native Security", "Next\u00a0post Microsoft Azure Just-In-Time (JIT) Ephemeral Access for Administrators"]
tags: ["Shahzad Ali", "November 27, 2024", "https://learn.microsoft.com/en-us/azure/route-server/route-server-faq#limitations", "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-faqs", "cloud-networking", "azure", "Previous\u00a0post De-BuZz Review | Cisco HyperShield | AI Native Security", "Next\u00a0post Microsoft Azure Just-In-Time (JIT) Ephemeral Access for Administrators"]
original_url: https://netjoints.com/azure-networking-limitations-and-constraints/
---

Azure Cloud native Azure Route Server is designed to simplify dynamic routing between network virtual appliances (NVAs) and ExpressRoute or VPN Gateways. However, it has several limitations:

## Azure Route Server Limitations

Reference: <https://learn.microsoft.com/en-us/azure/route-server/route-server-faq#limitations>

Azure Route Server, while providing significant capabilities for route management within a virtual network, exhibits several limitations that can impact network efficiency and functionality. Contrastingly, the Aviatrix solution offers enhanced features and capabilities that eliminate these limitations and deliver additional benefits.

### Control Plane Only:

Azure Route Server does not forward data traffic. It operates strictly in the control plane, dealing solely with route exchanges.

Aviatrix has both control and data-plane.

### 

### BGP Protocol Support:

Route Server supports only the Border Gateway Protocol (BGP). Your NVA must support multi-hop external BGP as the Route Server is deployed in a dedicated subnet within your virtual network.

ARS and NVA cannot be on same subnet but Aviatrix does not have such a restriction. We have multiple interfaces and we can connect to multiple NVAs. .

### ASN Handling:

When ExpressRoute advertises routes to on-premises, it strips the private BGP ASN information. The on-premises network receives the prefix with AS 12076.

Aviatrix is not stripping any BGP ASN. Aviatrix advertise the whole path.

### Route Limit from BGP Peer:

Route Server can accept a maximum of 1,000 routes from a single BGP peer. This limit considers the current routes learned plus new routes in a BGP update. Exceeding this number results in the session being terminated.

Aviatrix has not route limitation.

### 16-bit ASN Support:

Only 16-bit (2 bytes) ASNs are supported by Azure Route Server.

Aviatrix support both 4 byte and 2 byte.

### No Data Traffic Routing:

Azure Route Server does not route any data traffic directly between NVAs and VMs.

Aviatrix is also in data plane and can provide both control and data plane functionality.

### Condition for Route Advertisement and High Availability

To ensure routes are successfully advertised to the Route Server and to configure high availability, each Network Virtual Appliance (NVA) instance must be peered with both instances of the Route Server.

Aviatrix don’t have such limitations. Our design options are flexible.

### 

### Additional Route Server Limitations

Azure Route Server has the following limits (per deployment).

Resource| Azure ARS Limit| Aviatrix  
---|---|---  
Control Plane Only| Does not forward data traffic; operates strictly in the control plane.| Has both control and data plane.  
BGP Protocol Support| Supports only the Border Gateway Protocol (BGP). NVA must support multi-hop external BGP as it is deployed in a dedicated subnet.| Supports both BGP and static routes. No subnet restrictions; has multiple interfaces and connections to NVAs.  
ASN Handling| Private BGP ASN information is stripped when ExpressRoute advertises routes to on-premises. The on-premises network receives the prefix with AS 12076.| Does not strip BGP ASN information; advertises the whole path.  
No Data Traffic Routing| Does not route any data traffic directly between NVAs and VMs.| Provides both control and data plane functionality.  
16/32 Bit ASN Support| Only supports 16-bit (2 bytes) ASNs.| Supports both 16-bit (2 bytes) and 32-bit (4 bytes) ASNs.  
Condition for Route Advertisement & HA| Requires each NVA instance to be peered with both instances of the Route Server for route advertisement and high availability.| No such limitations; offers flexible design options.  
Number of BGP peers| 8| No limitation  
Number of routes each BGP peer can advertise to Azure Route Server. Exceeding this number results in the session being terminated.| 1,000| No limitation  
Number of VMs in the virtual network (including peered virtual networks) that Azure Route Server can support| 4,000| No limitation  
Number of virtual networks that Azure Route Server can support| 500| No limitation  
Number of total on-premises and Azure Virtual Network prefixes that Azure Route Server can support| 10,000| No limitation  
  
In summary, while Azure Route Server provides essential functionalities for route management, its limitations in control plane-only operations, strict BGP protocol support, ASN handling, route limits, and absence of data traffic routing present significant challenges. Aviatrix offers a superior solution that not only addresses these limitations but also provides enhanced routing capabilities, improved network flexibility, and superior performance.

## Azure ExpressRoute Limitations

Reference: <https://learn.microsoft.com/en-us/azure/expressroute/expressroute-faqs>

Azure ExpressRoute, a crucial service for extending on-premises networks into Microsoft’s cloud via private circuits, comes with specific limitations that might impact network management and operational efficiency. Aviatrix offers advanced functionalities that mitigate these limitations while delivering additional benefits.

### IPv4 Prefix Limit:

There is a maximum of 1,000 IPv4 prefixes advertised on a single ExpressRoute connection.

Aviatrix has no limit. Aviatrix overlay has no such limits.

### Prefix Limit Exceeding Consequences:

Exceeding the maximum prefix limit on an ExpressRoute connection will disconnect the circuit and gateway connection, including peered VNets using gateway transit. Connectivity is re-established once the prefix limit is corrected.

Aviatrix does not run into such issues.

### Route Capacity:

ExpressRoute supports up to 11,000 routes across virtual networks.

Aviatrix has no max limits.

### Issue with On Premise Route filtering

In the context of Azure ExpressRoute, filtering or including routes must be performed exclusively on the on-premises edge router. While user-defined routes (UDRs) can be implemented within the Virtual Network (VNet) to influence specific routing behaviors, it is crucial to note that these routes are static. They do not participate in the Border Gateway Protocol (BGP) advertisement and, therefore, do not dynamically adjust based on BGP announcements. This limitation necessitates careful consideration and strategic planning on the part of network administrators to ensure robust and resilient routing configurations.

Aviatrix has route filtering option to stop unwanted route. In Azure, you have to program UDR in each and every VNET to stop the propagation. At scale it is not possible to do in Azure.

### Traffic Collection and Handling  
ExpressRoute Traffic Collector Sampling Rate and Capacity

Azure ExpressRoute Traffic Collector operates with a sampling rate of 1:4096, signifying that merely one out of every 4,096 packets is captured. Additionally, it is designed to handle a maximum of 300,000 flows per minute. Once this limit is reached, any additional flows are dropped. This constraint can significantly affect network performance analysis and troubleshooting, particularly in high-traffic environments.  
The limitations in Azure ExpressRoute’s Traffic Collector—both in terms of sampling rate and flow capacity—pose significant challenges for network professionals tasked with maintaining high-performance and resilient networks.

Aviatrix sampling rate is 1:1.

Limitation| Azure ExpressRoute Details| Aviatrix Advanatage  
---|---|---  
IPv4 Prefix Limit| Maximum of 1,000 IPv4 prefixes advertised on a single connection.| No prefix limit. Aviatrix overlay has no such limitations.  
Prefix Limit Exceeding Consequences| Exceeding the prefix limit disconnects the circuit and gateway connection, including peered VNets using gateway transit. Connectivity is restored once the prefix limit is corrected.| No such issues with Aviatrix.  
Route Capacity| Supports up to 11,000 routes across virtual networks.| No maximum route limit.  
On-Premise Route Filtering| Filtering or including routes must be performed on the on-premises edge router. User-defined routes in Azure VNets are static and do not adjust dynamically with BGP announcements, requiring careful planning require programming UDRs in each VNet.| Provides route filtering option to stop unwanted routes. Dynamic and does not  
Traffic Collection and Handling| Traffic Collector samples at a rate of 1:4096 and handles a maximum of 300,000 flows per minute. Additional flows beyond this limit are dropped.| Sampling rate is 1:1, offering more comprehensive traffic analysis.  
  
# Azure vWAN Limitations

Azure Virtual WAN is a powerful networking solution that addresses the challenges of managing and connecting on-premises and cloud environments. It offers a range of use cases to simplify network management and enhance connectivity:

  1. **Branch Connectivity** : Streamline connectivity for branch locations by automating setup and configuration.
  2. **Remote User VPN Connectivity** : Securely connect remote users to Azure resources with point-to-site VPN connectivity.
  3. **Private Connectivity** : Establish high-performance and secure connections with Azure using ExpressRoute.
  4. **Intra-Cloud Connectivity** : Enable seamless communication between different Azure resources with transitive connectivity for virtual networks.
  5. **Routing and Security** : Leverage Virtual WAN’s routing capabilities, Azure Firewall or any of the major firewall vendors (Palo Alto, Fortinet and Checkpoint) to enhance network security and control.



## Limitations of Azure vWAN:

### Network Address Translation (NAT) Support:

**Limitation:** Azure vWAN does not offer native Network Address Translation (NAT) capabilities. This restricts its ability to modify network address information in packet headers, which is essential for certain network configurations and security policies.  
**Aviatrix Advantage:** Aviatrix provides robust NAT functionality, allowing fine-grained control over address translation for both inbound and outbound traffic, thereby enhancing security and network management flexibility.

### Multi-Cloud Connectivity:

**Limitation:** Azure vWAN is primarily designed to operate within the Azure ecosystem. It lacks inherent capabilities to manage and connect resources across different cloud providers.  
**Aviatrix Advantage:** Aviatrix excels in multi-cloud networking, enabling seamless integration and consistent network policies across various public cloud platforms. This functionality is critical for enterprises adopting a multi-cloud strategy to avoid vendor lock-in and leverage the best services from different providers.

### Operational Visibility and Troubleshooting:

**Limitation:** While Azure vWAN offers basic monitoring and management tools, its operational visibility and troubleshooting capabilities are limited compared to more advanced solutions.  
**Aviatrix Advantage:** Aviatrix provides comprehensive operational visibility, with robust monitoring, analytics, and troubleshooting tools. These features facilitate proactive network management and rapid resolution of network issues, ensuring high availability and performance.

### Centralized Policy Management:

**Limitation:** Azure vWAN’s policy management is primarily scoped within the Azure environment. It may not provide the level of centralized and granular control needed for complex, hybrid, or multi-cloud architectures.  
**Aviatrix Advantage:** Aviatrix delivers centralized policy management across multi-cloud environments, ensuring consistent security and network policies while simplifying administrative overhead.

### Azure vWAN Firewall Sharing Limitations:

**Limitation:** Inability to Share Firewalls Across Virtual Hubs.  
Azure vWAN does not permit the sharing of firewalls between protected hubs. Each Azure Virtual Hub is required to have its own dedicated firewall instance. Attempts to deploy custom routes that direct traffic to the firewall of another secured hub will result in unsuccessful deployment. Consequently, this necessitates that all hubs be individually secured with their own firewalls, thereby increasing complexity and administrative overhead.  
**Aviatrix Advantage:** Aviatrix FireNet allow for a centralized and streamlined approach to firewall deployment and management. Unlike Azure vWAN, Aviatrix solutions enable the sharing of firewall resources across multiple regions within same cloud or across multi cloud. This capability not only reduces the need for redundant firewall instances but also simplifies network architecture, enhances resource efficiency, and reduces overall management complexity. Aviatrix provides a highly scalable and flexible network security framework that is ideally suited for modern, dynamic multi-cloud environments

### Advanced Security Features:

**Limitation:** Azure vWAN’s security capabilities, although integrated with Azure Firewall, may not be sufficient for complex security requirements in multi-cloud or hybrid environments.  
**Aviatrix Advantage:** Aviatrix offers advanced security features, including end-to-end encryption, secure segmentation, and advanced threat detection, which are essential for maintaining robust security postures across diverse cloud infrastructures.

Limitation| Azure vWAN Details| Aviatrix Advantage  
---|---|---  
Network Address Translation (NAT) Support| Does not offer native NAT capabilities, limiting modifications to network address information in packet headers, crucial for certain configurations and security policies.| Aviatrix provides robust NAT functionality, allowing fine-grained control over address translation for both inbound and outbound traffic, thereby enhancing security and network management flexibility.  
Multi-Cloud Connectivity| Primarily designed to operate within the Azure ecosystem, lacking capabilities to manage and connect resources across different cloud providers.| Aviatrix excels in multi-cloud networking, enabling seamless integration and consistent network policies across various public cloud platforms. This is critical for enterprises adopting a multi-cloud strategy to avoid vendor lock-in and leverage the best services from different providers.  
Operational Visibility and Troubleshooting| Offers basic monitoring and management tools, but limited operational visibility and troubleshooting capabilities.| Aviatrix provides comprehensive operational visibility, with robust monitoring, analytics, and troubleshooting tools. These features facilitate proactive network management and rapid issue resolution, ensuring high availability and performance.  
Centralized Policy Management| Policy management is primarily scoped within the Azure environment, potentially lacking the level of centralized and granular control needed for complex, hybrid, or multi-cloud architectures.| Aviatrix delivers centralized policy management across multi-cloud environments, ensuring consistent security and network policies while simplifying administrative overhead.  
Firewall Sharing Limitations| Azure vWAN does not permit sharing of firewalls between protected hubs, requiring each Virtual Hub to have its own dedicated firewall instance. This increases complexity and administrative overhead.| Aviatrix FireNet enables centralized and streamlined firewall deployment and management, permitting the sharing of firewall resources across multiple regions within the same cloud or across multi-cloud environments. This reduces the need for redundant firewall instances, simplifies network architecture, and enhances resource efficiency.  
Advanced Security Features| Integrated with Azure Firewall, but may not suffice for complex security requirements in multi-cloud or hybrid environments.| Aviatrix offers advanced security features, including end-to-end encryption, secure segmentation, and advanced threat detection. These are essential for maintaining a robust security posture across diverse cloud infrastructures.  
  
### Conclusion:

Azure Virtual WAN (vWAN) provides competent networking capabilities within the Azure ecosystem, facilitating global connectivity, security integration, and site-to-site VPNs. However, limitations such as lack of NAT support, absence of multi-cloud connectivity, restricted operational visibility, and centralized policy management underscore the need for more advanced solutions in complex network environments.
