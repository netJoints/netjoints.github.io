---
title: "LAB5 – Bring Your Own IP/Subnet in GCP (Overlapping IP)"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 28, 2020", "https://docs.aviatrix.com/Downloads/samlclient.html", "https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_mac.pkg", "https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_win_x64.exe", "Check the Download link here", "cloud-networking", "Previous\u00a0post LAB5 \u2013 Bring Your Own IP/Subnet in GCP (Overlapping IP)", "Next\u00a0post LAB7 \u2013 Placehoslder"]
tags: []
original_url: https://netjoints.com/lab6-placehoslder/
---

## Business Objective

An important security requirement for GCP VPCs is to effectively control remote user access in a policy based manner. The cloud and the COVID-19 pandemic makes most users “remote.” Not only for employees who are out of the office, the “remote” label can be applied to developers, contractors, and partners whether they’re in the office or around the globe. 

> Note: User VPN, Client VPN or OpenVPN are interchangeable terms.

## Remote User VPN / Client VPN Overview

While a bastion host using an SSH tunnel is an easy way to encrypt network traffic and provide direct access, most companies looking for more robust networking will want to invest in a SMAL based VPN solution. Because …

  * Single instance VPN servers in each VPC results in tedious certificate management
    * No centralized enforcement give rise to questions like “who can access what VPC?” 
    * With more than dozen users and more than a few VPCs, management and auditing of the user access can become a major challenge



What’s needed is an easily managed, secure, cost-effective solution. Aviatrix provides a cloud-native and feature-rich client VPN solution.

  * The solution is based on OpenVPN® and is compatible with all OpenVPN® clients
  * In addition, Aviatrix provides its own client that supports **SAML authentication** directly from the client
  * Each VPN user can be assigned to a profile with access privileges – down to hosts, protocols and ports
  * Any Identity provider auth for LDAP/AD, Duo, Okta, Centrify, MFA, Client SAML and other integrations
  * Centralized visibility of all users, connection history and all certificates across your network.



## LAB Topology and Objective

  * This LAB is not dependent on any previous labs. 
    * This LAB will build on the topology we have deployed already in the previous LABs. Following is what we have deployed already.
  * A GCP Spoke gateway (gcp-spoke-vpn) is already deployed in the gcp-spoke-vpn-vpc. 
    * This is needed to make sure remote users, employees, developers or partners have a clear demarcation point (called Cloud Access layer in MCNA architecture) before they access the enterprise or corporate resources/workloads/VMs/etc. 

![](../../media/images/lab6-placehoslder_image-24.png)

### Objective

  * Students will use their laptops to connect to this lap topology using an Aviatrix SAML client VPN and will become part of this topology. This will allow them to access any resources using the private IP address



## Deploy Smart SAML Remote User VPN Solution

### Deploy User VPN 

Controller –> Gateway –> Create New (with the following information)

> While creating this gateway, you must select “VPN Access” checkbox. This will make this gateway as OPENVPN Gateway for Aviatrix User VPN Solution
> 
> Common Mistake  
> 

* * *

![](../../media/images/lab6-placehoslder_image-38.png) ![](../../media/images/lab6-placehoslder_image-39.png)
    
    
    The process could take upto ~10 minute to complete. It is hard to predict the deployment time even when you are deploying it in the same region and same cloud all the time. 

Once the gateway is deployed, you can see the status and the GCP LB address that was created as part of the automation.

![](../../media/images/lab6-placehoslder_image-26.png)

After the gateway deployment, the topology looks like following

![](../../media/images/lab6-placehoslder_image-42.png)

#### GCP TCP LB Configuration (Reference Only)

Following screen shots show the TCP LB details in GCP that was created by Aviatrix automation. LB helps in scaling out the solution without any disruption to the user profile or certificates. 

> Notice: Students do not have access to this details. It is shared here fro reference purposes only.

![](../../media/images/lab6-placehoslder_image-27.png) ![](../../media/images/lab6-placehoslder_image-28.png) ![](../../media/images/lab6-placehoslder_image-29.png) ![](../../media/images/lab6-placehoslder_image-30.png)

### Profile Based Zero-Trust Access Control

Each VPN user can be assigned to a profile that is defined by access privileges to network, host, protocol and ports. The access control is dynamically enforced when a VPN user connects to the public cloud via an Aviatrix VPN gateway.

Create a new profile: Controller –> OpenVPN –> Profile

![](../../media/images/lab6-placehoslder_image-36.png)

Create a policy to allow users access to only VMs in gcp-spoke-vpc1. 

![](../../media/images/lab6-placehoslder_image-37-1024x393.png)

Now add a remote uswr and assign profile to it. Make sure to provide correct email address here.

### Add a New VPN User

Controller –> OPENVPN –> Add a New VPN User

![](../../media/images/lab6-placehoslder_image-32.png)

* * *

Download the .ovpn profile file from the Aviatrix Controller

![](../../media/images/lab6-placehoslder_image-40.png) ![](../../media/images/lab6-placehoslder_image-41.png)

Now download the Aviatrix OpenVPN Client: <https://docs.aviatrix.com/Downloads/samlclient.html>

MAC: <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_mac.pkg>  
Windows: <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_win_x64.exe>  
Linux: [Check the Download link here](https://docs.aviatrix.com/Downloads/samlclient.html)

![](../../media/images/lab6-placehoslder_image-33.png)

![](../../media/images/lab6-placehoslder_image-34.png)

Now Open VPN client is connected to your network.

### Testing and Verification

  * Ping VM in the gcp-spoke-vpc-2
    * This should not ping because as per the zero-trust profile, the remote users are not allowed to access any resources expect in gcp-spoke-vpc-1
  * Ping the VM in the gcp-spoke-vpc-1
    * Most likely it will not ping because the**“gcp-spoke-vpn” VPC** is not assigned to any MCNS Domain yet


    
    
    shahzadali@shahzad-ali ~ % ping 10.20.11.130
    PING 10.20.11.130 (10.20.11.130): 56 data bytes
    92 bytes from gcp-spoke-vpn.c.cne-pod24.internal (10.20.19.2): Time to live exceeded
    Vr HL TOS  Len   ID Flg  off TTL Pro  cks      Src      Dst
     4  5  00 5400 7c18   0 0000  01  01 544d 192.168.19.6  10.20.11.130 
    
    Request timeout for icmp_seq 0
    92 bytes from gcp-spoke-vpn.c.cne-pod24.internal (10.20.19.2): Time to live exceeded
    Vr HL TOS  Len   ID Flg  off TTL Pro  cks      Src      Dst
     4  5  00 5400 b6da   0 0000  01  01 198b 192.168.19.6  10.20.11.130 
    
    Request timeout for icmp_seq 1
    92 bytes from gcp-spoke-vpn.c.cne-pod24.internal (10.20.19.2): Time to live exceeded
    Vr HL TOS  Len   ID Flg  off TTL Pro  cks      Src      Dst
     4  5  00 5400 fcc1   0 0000  01  01 d3a3 192.168.19.6  10.20.11.130 
    
    ^C
    --- 10.20.11.130 ping statistics ---
    3 packets transmitted, 0 packets received, 100.0% packet loss
    shahzadali@shahzad-ali ~ % 
    

Now change MCNS setting and assign gcp-spoke-vpn to Green domain.

![](../../media/images/lab6-placehoslder_image-35.png)

Now the new topology will look like following

![](../../media/images/lab6-placehoslder_image-43.png)

Now connectivity is established and ping will start working as you can see in the following output as well.
    
    
    Request timeout for icmp_seq 7
    92 bytes from gcp-spoke-vpn.c.cne-pod24.internal (10.20.19.2): Time to live exceeded
    Vr HL TOS  Len   ID Flg  off TTL Pro  cks      Src      Dst
     4  5  00 5400 2b8e   0 0000  01  01 a4d7 192.168.19.6  10.20.11.130 
    
    Request timeout for icmp_seq 8
    Request timeout for icmp_seq 9
    Request timeout for icmp_seq 10
    64 bytes from 10.20.11.130: icmp_seq=11 ttl=60 time=70.931 ms
    64 bytes from 10.20.11.130: icmp_seq=12 ttl=60 time=63.498 ms
    64 bytes from 10.20.11.130: icmp_seq=13 ttl=60 time=62.943 ms
    64 bytes from 10.20.11.130: icmp_seq=14 ttl=60 time=69.129 ms
    64 bytes from 10.20.11.130: icmp_seq=15 ttl=60 time=62.002 ms
    64 bytes from 10.20.11.130: icmp_seq=16 ttl=60 time=68.655 ms
    ^C
    --- 10.20.11.130 ping statistics ---
    17 packets transmitted, 6 packets received, 64.7% packet loss
    round-trip min/avg/max/stddev = 62.002/66.193/70.931/3.477 ms
    shahzadali@shahzad-ali ~ % 
    

## Conclusion

  * Aviatrix User VPN is a powerful solution
  * MCNS provides additional security beyond the profile based user-vpn 


