---
title: "Direct Connect Gateway"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 16, 2019", "Built on OpenVPN\u00ae and is compatible with all OpenVPN\u00ae client software", "Supports external PKI for OpenVPN Certificates", "Profile Based Access Control", "https://www.aviatrix.com/customers/case-study-clara.php", "multi-cloud", "Previous\u00a0post Direct Connect Gateway", "Next\u00a0post Multi-Cloud Transit Design: Interworking  with On-Prem and/or Cloud  Devices/Services"]
tags: []
original_url: https://netjoints.com/design-and-feature-requirement-for-a-user-vpn-solution/#respond
---

If you are building a new or re-architecting a User-VPN (aka SSL VPN or Client to Site VPN) based solution, then you should consider at least following design ingredients in your solution

  * [Built on OpenVPN® and is compatible with all OpenVPN® client software](https://docs.aviatrix.com/HowTos/uservpn.html)
  * Provide certificate based SSL VPN user authentication
  * LDAP/AD Integration
  * Support multi factor authentication (MFA) methods such as Google, DUO, Okta, SAML and LDAP
  * You should also be able to combine various authentication and authorization components to add extra level of security for the interaction. For instance the solution first authenticate from a corporate LDAP entity and then consult with DUO for MFA
  * Authenticate a VPN user directly from the VPN client to any IDP via SAML protocol. The SAML protocol and a client with SAML support must be the key requirement
  * [Supports external PKI for OpenVPN Certificates](https://docs.aviatrix.com/HowTos/External_PKI_for_OpenVPN_Certificates.html)
  * The solution must provide a [Profile Based Access Control](https://docs.aviatrix.com/HowTos/openvpn_features.html) so that beyond the authentication and autharization that was discussed above, one should also control the access right at the IP Address, CIDR or Subnet level (aka Profile Based Network Segmentation)



The Aviatrix solution has all the above mentioned design ingredients. On top of that it has features such as Geo-Location based connectivity to the closest VPN GW (or Concentrator) with support for both TCP and UDP based load-balancing

Look at this Clara customer case-study (Clara is part of SoFI now) for reference

<https://www.aviatrix.com/customers/case-study-clara.php>
