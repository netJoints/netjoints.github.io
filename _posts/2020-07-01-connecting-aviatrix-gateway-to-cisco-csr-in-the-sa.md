---
title: "Design and Feature Requirement for a User-VPN Solution"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 1, 2019", "multi-cloud", "Previous\u00a0post Design and Feature Requirement for a User-VPN Solution", "Next\u00a0post Aviatrix Oracle Cloud (OCI) On-Boarding and Initial Configuration"]
tags: []
original_url: https://netjoints.com/connecting-aviatrix-gateway-to-cisco-csr-in-the-same-aws-vpc/
---

Aviatrix solution can take care of networking, security and network segmentation for workloads deployed in public clouds by deploying transit networking solution using Aviatrix transit and spoke gateways. It is a standard and stamp-out (copy/paste and repeat) design that is applicable to any public cloud (e.g AWS, GCP, Azure and OCI). 

There are situation when there is a need to connect to 3rd party devices or services to exchange routes or to provide additional connectivity. These services and devices could be in the Public Cloud or On-Premise. In those situation the Aviatrix transit can also connect to those devices and services in secure and encrypted fashion (e.g using L3 IPSec). 

## Customer Scenario

Following topology demonstrate a scenario where a business is using Cisco CSR (could be any service or instance from any vendor that supports IPSec) in the Cloud to terminate LISP. By virtue of using LISP, the business is forced into a sub-optimal design where an additional hop is necessary. 

![](http://107.23.205.221/wp-content/uploads/2019/10/image-7.png?w=821)

## Aviatrix Setup

> For this setup we are assuming that you have already deployed Cisco CSR from AWS marketplace

  * Created Transit VPC and Spoke VPC directly from Aviatrix Controller UI (no need to login to AWS console)
  * Deployed AVX Transit GW and AVX Spoke GW in their respective VPCs using the Aviatrix Controller UI
  * Follow the Aviatrix Transit Networking workflow to connect to external 3rd party device (e.g Cisco CSR)
    * For external connectivity eBGP is the preferred option and this is what we are using here
    * If you want to connect via static route to external device, it is also possible but then you have to enable “ActiveMesh” on Aviatrix Transit and Spoke Gateways first
  * Attached Spoke-VPC to Transit-VPC



## Build the IPSec Tunnel From Aviatrix Transit Gateway to Cisco CSR

Configure Aviatrix Controller as shown below

![](http://107.23.205.221/wp-content/uploads/2019/10/image-3.png?w=905)

Notice we are using the default IPSec Algorithms. My recommendation is to start with the default and change after if needed

After you have done the setup as above, you will notice an entry in the Site2Cloud (S2C) section of AVX-Controller automatically (The screenshot shows tunnel UP which is not correct. The tunnel will be in the down state at this time)

![](http://107.23.205.221/wp-content/uploads/2019/10/image-5.png?w=1024)

Click on the Name above and download the IPSec config. 

![](http://107.23.205.221/wp-content/uploads/2019/10/image-6.png?w=1024)Use Generic as vendor.   

    
    
    Aviatrix Site2Cloud configuration. 
     This connection has a single IPsec tunnel between customer  gateway and Aviatrix gateway in the cloud.
     Tunnel #1
     
    1: Internet Key Exchange Configuration
     Configure the IKE SA as follows
     Version                  : 1
     Authentication Method    : Pre-Shared Key 
     Pre-Shared Key           : Aviatrix1!
     Encryption Algorithm     : AES-256-CBC
     Authentication Algorithm : SHA-1
     Lifetime                 : 28800 seconds
     Phase 1 Negotiation Mode : main
     Perfect Forward Secrecy  : Diffie-Hellman Group 2
     DPD threshold            : 10 seconds
     DPD retry interval       : 3 seconds
     DPD retry count          : 3 
     
    2: IPSec Configuration
     Configure the IPSec SA as follows:
     Protocol                 : esp
     Authentication Algorithm : hmac-sha1
     Encryption Algorithm     : AES-256-CBC
     Authentication Algorithm : HMAC-SHA-1
     Lifetime                 : 28800 seconds
     Mode                     : tunnel
     Perfect Forward Secrecy  : Diffie-Hellman Group 2 
     
    IPSec ESP (Encapsulating Security Payload) inserts additional
     headers to transmit packets. These headers require additional space, which reduces the amount of space available to transmit application data.To limit the impact of this behavior, we recommend the following configuration on your Customer Gateway:
    
     TCP MSS Adjustment       : 1387 bytes
     Clear Don't Fragment Bit : enabled
     Fragmentation            : Before encryption 
     
    3: Tunnel Interface Configuration
     Your Customer Gateway must be configured with a tunnel interface that is associated with the IPSec tunnel. Traffic that should go through the tunnel should be specified by following your gateway's configuration guide, using the information below.
     
    Gateway IP addresses:
     Customer Gateway                : 34.236.49.52
     Aviatrix Gateway Public IP      : 50.16.167.124
     Aviatrix Gateway Private IP     : 10.60.0.92 
     
    Subnets:
     Customer Network(s)             : N/A for transit network
     Cloud Networks(s)               : N/A for transit network 
     
    Tunnel Inside IP addresses:
     Customer Gateway                : 169.254.48.97/30
     Aviatrix Gateway                : 169.254.48.98/30 
     
    Configure your tunnel to fragment at the optimal size:
     Tunnel interface MTU     : 1436 bytes 
     
    4. Border Gateway Protocol (BGP) Configuration:
     The Border Gateway Protocol (BGPv4) is used to exchange routes from the VPC to on-prem network. Each BGP router has an Autonomous System Number (ASN).
     
    BGP Configuration:
     BGP Mode                        : true
     Customer Gateway ASN            : 65002
     Aviatrix Gateway ASN            : 65003 
     
    Configure BGP to receive routes from on-prem network. Aviatrix Transit gateway will announce prefixes to your on-prem  gateway based upon the spokes you have attached. For vendor specific instructions, please go to the following URL:
     http://docs.aviatrix.com/#site2cloud
    

## Cisco CSR Configuration
    
    
    This is how the above template translates into a Cisco CSR Config.
    
    ip-10-60-0-89#sh run 
    Building configuration...
    
    Current configuration : 7936 bytes
    !
    ! Last configuration change at 16:30:21 UTC Fri Oct 4 2019 by ec2-user
    !
    version 16.12
    service timestamps debug datetime msec
    service timestamps log datetime msec
    service password-encryption
    !
    platform qfp utilization monitor load 80
    no platform punt-keepalive disable-kernel-core
    platform console virtual
    !
    hostname ip-10-60-0-89
    !
    boot-start-marker
    boot-end-marker
    !
    !
    vrf definition GS
     rd 100:100
     !
     address-family ipv4
     exit-address-family
    !
    logging persistent size 1000000 filesize 8192 immediate
    !
    no aaa new-model
    !
    login on-success log
    subscriber templating
    multilink bundle-name authenticated
    !
    license udi pid CSR1000V sn 91V3AHTVAJ1
    diagnostic bootup level minimal
    memory free low-watermark processor 72406
    !
    !         
    spanning-tree extend system-id
    username ec2-user privilege 15
    redundancy
    ! 
    crypto keyring mykey
      local-address 10.60.0.89 
    ! local-address is the private IP address of this CSR
      pre-shared-key address 50.16.167.124 key Aviatrix1!
    ! 50.16.167.124 is the public IP address of Avaitrix 
    !
    crypto isakmp policy 10
     encryption aes 256
     authentication pre-share
     group 2
     lifetime 28800
    crypto isakmp keepalive 10 3 periodic
    crypto isakmp profile myprofile
       keyring mykey
       self-identity address
       match identity address 50.16.167.124 255.255.255.255 
    !
    crypto ipsec transform-set myset esp-aes 256 esp-sha-hmac 
     mode tunnel
    crypto ipsec df-bit clear
    !
    crypto ipsec profile ipsec_profile
     set security-association lifetime seconds 28800
     set transform-set myset 
     set pfs group2
    !
    interface Loopback0
     ip address 10.61.0.1 255.255.255.0
    !
    interface Tunnel0
     ip address 169.254.48.97 255.255.255.252
     ip tcp adjust-mss 1387
     tunnel source 10.60.0.89
     tunnel mode ipsec ipv4
     tunnel destination 50.16.167.124
     tunnel protection ipsec profile ipsec_profile
    !
    interface VirtualPortGroup0
     vrf forwarding GS
     ip address 192.168.35.101 255.255.255.0
     ip nat inside
     no mop enabled
     no mop sysid
    !
    interface GigabitEthernet1
     ip address dhcp
     ip nat outside
     negotiation auto
     no mop enabled
     no mop sysid
    !
    router bgp 65002
     bgp log-neighbor-changes
     network 10.61.0.0 mask 255.255.255.0
     neighbor 169.254.48.98 remote-as 65003
     neighbor 169.254.48.98 timers 10 30 30
     !
     address-family vpnv4
      neighbor 169.254.48.98 activate
      neighbor 169.254.48.98 send-community extended
     exit-address-family
    !
    iox
    ip forward-protocol nd
    ip tcp mss 1387
    ip tcp window-size 8192
    ip http server
    ip http authentication local
    ip http secure-server
    !
    ip nat inside source list GS_NAT_ACL interface GigabitEthernet1 vrf GS overload
    ip route vrf GS 0.0.0.0 0.0.0.0 GigabitEthernet1 10.60.0.81 global
    ip ssh rsa keypair-name ssh-key
    ip ssh version 2
    ip ssh pubkey-chain
      username ec2-user
       key-hash ssh-rsa BF29B2896E9286C9B44DD472EF3397DA ec2-user
    ip scp server enable
    !
    ip access-list standard GS_NAT_ACL
     10 permit 192.168.35.0 0.0.0.255
     20 permit 10.61.0.0 0.0.0.255
    !
    control-plane
    !
    line con 0
     stopbits 1
    line vty 0 4
     login local
     transport input ssh
    line vty 5 20
     login local
     transport input ssh
    !
    app-hosting appid guestshell
     app-vnic gateway1 virtualportgroup 0 guest-interface 0
      guest-ipaddress 192.168.35.102 netmask 255.255.255.0
     app-default-gateway 192.168.35.101 guest-interface 0
     name-server0 8.8.8.8
    end
    
    ip-10-60-0-89# 
    

## BGP Working Config. with address-family ipv4

The configuration above uses the vpn4 as address family. You can also make it work with ipv4 address family
    
    
    router bgp 65002
     bgp log-neighbor-changes
     neighbor 169.254.48.98 remote-as 65003
     neighbor 169.254.48.98 timers 10 30 30
     neighbor 169.254.238.118 remote-as 65001
     neighbor 169.254.238.118 timers 10 30 30
     !
     address-family ipv4
      network 10.61.0.0
      ! 10.61.0.0 is being advertised by Cisco CSR
      redistribute connected
      neighbor 169.254.48.98 activate
      neighbor 169.254.238.118 activate
     exit-address-family
     !
    

![](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-2.10.52-am.png?w=1024)Aviatrix Transit GW receives 10.61.0.0/24 advertised by Cisco CSR  


## Conclusion

Aviatrix Transit Gateway workflow allows direct connectivity from Transit Gateway to 3rd party devices. The standard IPSec protocols allows Aviatrix Transit Gateway to connect to any devices supporting IPSec. These devices could be in the same Public Cloud, a different Public Cloud or to the On-Prem devices.

The workflow based implementation allows ease of use and reduces time to market. 
