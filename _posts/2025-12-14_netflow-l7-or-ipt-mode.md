---
title: "Azure vWAN Design Considerations"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "June 4, 2024", "cloud-networking", "Previous\u00a0post Azure vWAN Design Considerations", "Next\u00a0post Important AI Terms to Remember"]
tags: []
original_url: https://netjoints.com/netflow-l7-or-ipt-mode/
---

NETFLOW V9 gives you both options to use. Either IPT (IP Network Traffic) or L7 (Layer7 Traffic) 

NetFlow version 9 has more flexibility in flow export configuration and customization on key fields (how packets are aggregated to flows) and what information is being exported. Flexible NetFlow extends monitoring to L7 through NBAR2 (Network Based Application Recognition) technology, which identifies applications based on payload.

![](../../media/images/netflow-l7-or-ipt-mode_image.png)

![](../../media/images/netflow-l7-or-ipt-mode_image-1.png)

When L7 mode is enabled, Internet traffic that traverses spoke gateways is analyzed for flows that generate L7 data. When these flows are detected, the L7 fields are forwarded to the designated NetFlow service point.

Use Aviatrix CoPilot as your NetFlow service point. You can view L7 data by going to the CoPilot > Monitor > FlowIQ page, clicking on the Application view, and then opening the Records page.

L7 flow usually includes applications such as NBAR2, HTTP, DNS, DHCP, VOIP (SIP), Email, SQL and SSL.

The output will look like when Netflow is used with L7 mode.

![](../../media/images/netflow-l7-or-ipt-mode_image-2-1024x617.png)
