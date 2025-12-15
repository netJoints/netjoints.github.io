---
title: "Azure Transit Network Design Patterns"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "December 16, 2019", "Aviatrix provides workflow for cloud native TCP based NLB (Network Load Balancer)", "Aviatrix provides workflow for cloud native UDP based LB using the DNS", "AWS recently started supporting UDP protocol for its NLB (Network Load Balancer)", "multi-cloud", "Previous\u00a0post Azure Transit Network Design Patterns", "Next\u00a0post Azure Transit Network Deployment with Native VNet Peering"]
tags: []
original_url: https://netjoints.com/aviatrix-user-vpn-deployment-with-aws-udb-based-nlb/
---

> The steps mentioned here are not supported yet. It should be treated as a workaround only. 

## Introduction

  * Aviatrix supports both TCP and UDP for User-VPN
    * By default the Aviatrix User-VPN GW (AGW) is deployed with UDP
    * AGW listens at UDP:1194 for incoming connection requests
  * Aviatrix also integrates with cloud-native LB otions to support load balancing AGWs for both UDP and TCP protocols
  * [Aviatrix provides workflow for cloud native TCP based NLB (Network Load Balancer)](https://docs.aviatrix.com/HowTos/gateway.html#vpn-access)
    * AGW listens at TCP:943 for incoming connection requests
  * [Aviatrix provides workflow for cloud native UDP based LB using the DNS](https://docs.aviatrix.com/HowTos/DNSVPN.html)
    * AGW listens at UDP:1194 for incoming connection requests



### AWS LBN Supports UDP

[AWS recently started supporting UDP protocol for its NLB (Network Load Balancer)](https://aws.amazon.com/blogs/aws/new-udp-load-balancing-for-network-load-balancer/). Customers are looking to add support for UDP based NLB now. While this support will shortly be available in the product, there is a workaround to deploy such a topology. 

Note: Aviatrix User-VPN GW uses TCP:443 for incoming heath-check probes

## Deployment Overview

  * Create an Aviatrix GW (AGW) with VPN Access option but without enabling cloud-native ELB integration
  * This will create the AGW and by default it listens on UDP 1194 port
  * Manually create AWS NLB in the AWS console with the UDP option and port 1194
  * Manually create the target group with user-VPN AGW(s) in it
  * Make sure to override the health-check port and use TCP 443 for it



## Deployment Details

Following screen shots shows a working deployment 

### Topology

![](http://107.23.205.221/wp-content/uploads/2020/01/image-32.png?w=1024)

### Deploy Aviatrix User-VPN GW

Deploy an Aviatrix User-VPN GW with “VPN Access” checked and without enabling ELB using Aviatrix Controller.

![](http://107.23.205.221/wp-content/uploads/2019/12/image-16.png?w=1024)

Gateway config shows following in the Aviatrix diagnostics section. Notice the port 1194 here. 
    
    
    "VPN Service": {
    "port": {
    "1194": [
    "up",
    "reachable"
    ]
    },

Create a new user and assign this user to the Aviatrix User-VPN GW

![](http://107.23.205.221/wp-content/uploads/2019/12/image-17.png?w=1024)

#### Create NLB in AWS Console

Create a UDP based NLB using the AWS console. Once the NLB is created, you will notice following config in the AWS console. Notice the DNS name for this NLB. This is the name we will use later in the config. 
    
    
    Name: shahzad-udp-nlb
    arn:aws:elasticloadbalancing:ap-southeast-1:481151252831:loadbalancer/net/shahzad-udp-nlb/a2e01e8690702d00
    DNS name: shahzad-udp-nlb-a2e01e8690702d00.elb.ap-southeast-1.amazonaws.com
    (A Record)

#### AWS Network Load Balancer

Following screen also shows the name of the NLB and the DNS name associated with it. 

![](http://107.23.205.221/wp-content/uploads/2019/12/image-18.png?w=1024)

#### NLB Listner

By default the AWS UDP based NLB listen at UDP port 1194 which is the port Aviatrix GW also listen at. You can observe it in the following screen

![](http://107.23.205.221/wp-content/uploads/2019/12/image-19.png?w=1024)

#### NLB Listener Details

Now we nee to create target group that will point to the Aviatrix User-VPN GW.

![](http://107.23.205.221/wp-content/uploads/2019/12/image-20.png?w=1024)

#### Health Check Configuration for Aviatrix GW

Make sure to modify the health-check port to 443 (by default it will be configured with 1194)

![](http://107.23.205.221/wp-content/uploads/2019/12/image-21.png?w=968)

## Modify User-VPN Certificate File

Download the User-VPN certificate file and replace the IP address with the DNS name of the AWS NLB.
    
    
    client  
    comp-lzo  
    nobind  
    persist-key  
    persist-tun  
    auth-nocache  
    tun-mtu 1500  
    remote shahzad-udp-nlb-a2e01e8690702d00.elb.ap-southeast-1.amazonaws.com 1194  
    proto udp  
    mssfix  
    route-method exe  
    verb 3  
    route-delay 2  
    mute 20  
    reneg-sec 0  
    cipher AES-256-CBC  
    auth SHA512  
    key-direction 1  
    explicit-exit-notify  
    dev-type tun  
    dev tun

#### Connect VPN User

Now we connect using this profile. I am using OpenVPN connect client version 2.7.1.100.

![](http://107.23.205.221/wp-content/uploads/2019/12/image-22.png?w=1024)

User will be connected and will show in the Aviatrix Controller UI as well

![](http://107.23.205.221/wp-content/uploads/2019/12/image-23.png?w=1024)

#### Credits

Thank you Liming Xiang and Felipe Vasconcellos for reviewing and making adjustments to this post.
