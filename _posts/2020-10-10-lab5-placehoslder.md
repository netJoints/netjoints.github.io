---
title: "LAB4 – GCP FQDN Based Egress Security"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 28, 2020", "cloud-networking", "Previous\u00a0post LAB4 \u2013 GCP FQDN Based Egress Security", "Next\u00a0post LAB6 \u2013 GCP Remote User VPN / Client VPN"]
tags: []
original_url: https://netjoints.com/lab5-placehoslder/#respond
---

## Objective

ACE Enterprise in GCP wants to connect to different partners to consume SaaS services. These partners could be present in physical DC or Branches; or in VPC/VNET in cloud such as GCP/AWS/Azure/etc. ACE cannot dictate or control the IPs/Subnets/CIDR those partners have configured and must support “Bring Your own IP” which might overlap with what is already configured in GCP. 

In our topology GCP Spoke3 VPC subnet is overlapping with AWS Spoke2 VPC subnet (10.42.0.0). We need to make sure that VM in GCP Spoke3 VPC is able to communicate with EC2 in AWS Spoke2 VPC.

### Topology Modifications

In order for this lab to work, we are simulating AWS Spoke2 VPC as a remote site/branch

  * Step#1: Detach the aws-spoke2 gateway from transit
  * Step#2: Delete the aws-spoke2-gw
  * Step#3: Deploy a standard Aviatrix Gateway (s2c-gw) in aws-spoke2-vpc



#### Step#1

Controller –> Multi-Cloud Transit –> Setup –> Detach AWS VPC2

#### Step#2

Controller –> Gateway –> Highlight AWS VPC2 Spoke GW –> Delete

#### Step#3

Controller –> Gateway –> Add New (use the following screen)

![](../../media/images/lab5-placehoslder_image-13.png)

> This getaway could be any router or firewall or vpn device in the on-prem or cloud location.

## Topology

  * Following diagram shows the topology after the modifications are done

![](../../media/images/lab5-placehoslder_Screen-Shot-2021-01-02-at-3.45.50-PM.png)

  * In the topology notice that there is no path between gcp-spoke3-vpc and s2c-gw in aws-spoke2-vpc
  * Also notice the local and remote virtual IPs allocated for the VPCs/Sites that are overlapping. This is needed so that these overlapping VPCs/Sites can communicate with each other using those virtual IPs
    * This is possible using Aviatrix patented technology where as a an enterprise you do not need to worry about programming advanced NAT rather Aviatrix intent based “Mapped NAT” policy will automatically take care of all the background VPC/VNET route programming, Gateway Routing, Secure Tunnel Creation, Certificate Exchange, SNAT, DNAT, etc.



## Configuration

Bi-directional setup is neede for this to work. We will create two connections in coming configuration steps. 

### Connection From GCP to Partner Site (AWS) – Leg1

Controller –> SITE2CLOUD –> Add a new connection (with following details)

VPC ID / VNet Name: vpc-gcp-spoke-3  
Connection Type: Mapped  
Connection Name: partner1-s2c-leg1  
Remote Gateway Type: Aviatrix  
Tunnel Type: Policy-based  
Primary Cloud Gateway: gcp-spoke-3  
Remote Gateway IP Address: Check Controller’s Gateway section to find the public ip address  
Remote Subnet (Real): 10.42.0.0/24  
Remote Subnet (Virtual): 192.168.10.0/24  
Local Subnet (Real): 10.42.0.0/24  
Local Subnet (Virtual): 192.168.20.0/24

![](../../media/images/lab5-placehoslder_image-14.png)

![](../../media/images/lab5-placehoslder_image-15.png)

This will create the first leg of the connection from Cloud to Site. This will stay down until the other end is configured.

#### Download the Configuration

Aviatrix Controller provides a template that can be used to configure the remote router/firewall. Click on the Site-to-Cloud connection that you have just created. Click “EDIT” and then download the configuration for Aviatrix.

![](../../media/images/lab5-placehoslder_image-16.png)
    
    
    Downloaded file (vpc-vpc-gcp-spoke-3~-~cne-pod24-partner1-s2c-leg1.txt) contents just for reference purposes. We will import this file in next step.
    
    {
      "ike_ver": "1",
      "name": "partner1-s2c-leg1",
      "type": "mapped",
      "tunnel_type": "policy",
      "peer_type": "avx",
      "ha_status": "disabled",
      "null_enc": "no",
      "private_route_enc": "no",
      "PSK": "Password123!",
      "ph1_enc": "AES-256-CBC",
      "ph2_enc": "AES-256-CBC",
      "ph1_auth": "SHA-256",
      "ph2_auth": "HMAC-SHA-256",
      "ph1_dh_group": "14",
      "ph2_dh_group": "14",
      "ph2_lifetime": "3600",
      "remote_peer": "34.86.77.74",
      "remote_peer_private_ip": "10.42.0.2",
      "local_peer": "54.71.151.196",
      "remote_subnet_real": "10.42.0.0/24",
      "local_subnet_real": "10.42.0.0/24",
      "remote_subnet": "192.168.20.0/24",
      "local_subnet": "192.168.10.0/24",
    
      "tun_name": "",
      "highperf": "false",
      "ovpn": "",
      "enable_bgp": "false",
      "bgp_local_ip" : "",
      "bgp_remote_ip" : "",
      "bgp_local_asn_number": "0",
      "bgp_remote_as_num": "0",
      "bgp_neighbor_ip_addr": "",
      "bgp_neighbor_as_num": "0",
      "tunnel_addr_local": "",
      "tunnel_addr_remote": "",
      "activemesh": "yes"
    }
    

Close the dialogue box now.

### Connection Partner Site (AWS) to GCP AWS – Leg2

Now we need to create a new connection and import the file we just downloaded

Controller –> SITE2CLOUD –> Add a new connection –> Select “aws-west-2-spoke-2” VPC –> Import

VPC ID / VNet Name: **aws-west-2-spoke-2**  
Connection Type: auto-populated (Mapped)  
Connection Name: **partner1-s2c-leg2**  
Remote Gateway Type: Aviatrix  
Tunnel Type: auto-populated (Policy-based)  
Algorithms: auto-populated (do not change these settings)  
Primary Cloud Gateway: auto-populated (aws-spoke2-vpc-s2c-gw)  
Remote Gateway IP Address: auto-populated  
Remote Subnet (Real): auto-populated (10.42.0.0/24)  
Remote Subnet (Virtual): auto-populated (192.168.20.0/24)  
Local Subnet (Real): auto-populated (10.42.0.0/24)  
Local Subnet (Virtual): auto-populated (192.168.10.0/24)

![](../../media/images/lab5-placehoslder_image-17.png) ![](../../media/images/lab5-placehoslder_image-18.png)

Now it will take about a minute for both tunnels to come up

![](../../media/images/lab5-placehoslder_image-19-1024x233.png)

This makes is look like following

![](../../media/images/lab5-placehoslder_image-21.png)

## Verification

Now you can ping the overlapping subnet VM on the AWS side from GCP. Make sure to use the virtual subnet for AWS with the last octecet of the VM being same. 
    
    
    ubuntu@vm-gcp-spoke-3:~$ ifconfig
    ens4 Link encap:Ethernet HWaddr 42:01:0a:2a:00:82
    inet addr:10.42.0.130 Bcast:10.42.0.130 Mask:255.255.255.255
    inet6 addr: fe80::4001:aff:fe2a:82/64 Scope:Link
    UP BROADCAST RUNNING MULTICAST MTU:1460 Metric:1
    RX packets:1492666 errors:0 dropped:0 overruns:0 frame:0
    TX packets:871540 errors:0 dropped:0 overruns:0 carrier:0
    collisions:0 txqueuelen:1000
    RX bytes:518583431 (518.5 MB) TX bytes:111566034 (111.5 MB)
    
    ubuntu@vm-gcp-spoke-3:~$ **ping 192.168.10.84**
    PING 192.168.10.84 (192.168.10.84) 56(84) bytes of data.
    64 bytes from 192.168.10.84: icmp_seq=1 ttl=62 time=83.8 ms
    64 bytes from 192.168.10.84: icmp_seq=2 ttl=62 time=83.5 ms
    64 bytes from 192.168.10.84: icmp_seq=3 ttl=62 time=83.6 ms
    64 bytes from 192.168.10.84: icmp_seq=4 ttl=62 time=83.6 ms
    64 bytes from 192.168.10.84: icmp_seq=5 ttl=62 time=84.2 ms
    ^C
    --- 192.168.10.84 ping statistics ---
    5 packets transmitted, 5 received, 0% packet loss, time 4006ms
    rtt min/avg/max/mdev = 83.554/83.784/84.203/0.391 ms
    ubuntu@vm-gcp-spoke-3:~$

This concludes the lab. Final topology looks like following

![](../../media/images/lab5-placehoslder_image-22.png)

Note: This lab is not depend on previous labs. 
