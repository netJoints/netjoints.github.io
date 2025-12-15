---
title: "Insights from RSA Conference 2024"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "May 26, 2024", "cloud-networking", "Previous\u00a0post Insights from RSA Conference 2024", "Next\u00a0post NETFLOW Mode Should I use L7 or IPT?"]
tags: []
original_url: https://netjoints.com/azure-vwan-design-considerations/
---

Azure Virtual WAN is a networking service that combines many networking, security, and routing functionalities to provide a single operational interface. Some of the main features include:

  * Branch connectivity (via connectivity automation from Virtual WAN Partner devices such as SD-WAN or VPN CPE).
  * Site-to-site VPN connectivity.
  * Remote user VPN connectivity (point-to-site).
  * Private connectivity (ExpressRoute).
  * Intra-cloud connectivity (transitive connectivity for virtual networks).
  * VPN ExpressRoute inter-connectivity.
  * Routing, Azure Firewall, and encryption for private connectivity.



![](../../media/images/azure-vwan-design-considerations_image-1024x608.png)

## Design Considerations

Like any other networking service or product, one should understand the scale and design limits of Azure vWAN. Azure keeps enhancing its services so that this information might be different in the future.
