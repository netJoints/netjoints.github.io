---
title: "Install BlockChain Quorum Node on AWS EC2 Instance"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "October 26, 2020", "cloud-networking", "Previous\u00a0post Install BlockChain Quorum Node on AWS EC2 Instance", "Next\u00a0post Cloud to On Premise Data Center Active/Standby Firewall Design and Deployment"]
tags: []
original_url: https://netjoints.com/gcp-high-performance-encryption/
---

## 

Aviatrix **Gateway VM Type**| **Throughput**  
---|---  
n1-highcpu-4| 3.12Gbps  
n1-highcpu-8| 6.54Gbps  
n1-highcpu-16| 11.58Gbps  
n1-highcpu-32| 19.97Gbps  
  
## How does Aviatrix GCP HPE work?

Aviatrix HPE utilizes native peering and multiple tunnels to provide higher throughput

GCP HPE can also work with /24 subnet scheme. 

Controller builds native peering

![](../../media/images/gcp-high-performance-encryption_image-14-1024x265.png)

### GCP Transit Gateway Details

Following is the output from the Aviatrix Transit GW. Notice the number of tunnels interfaces (14 in this case due to the size of the VM we have selected) created inside the GW.
    
    
    Name: gcp-transit-gw-uscentral1
    
    eth0: flags=4163 mtu 1460
    inet 10.20.1.3 netmask 255.255.255.255 broadcast 10.20.1.3
    inet6 fe80::4001:aff:fe14:103 prefixlen 64 scopeid 0x20
    
    ether 42:01:0a:14:01:03 txqueuelen 1000 (Ethernet)
    RX packets 185466 bytes 265891040 (265.8 MB)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 28034 bytes 5148269 (5.1 MB)
    TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0
    
    lo: flags=73 mtu 65536
    inet 127.0.0.1 netmask 255.0.0.0
    inet6 ::1 prefixlen 128 scopeid 0x10
    loop txqueuelen 1000 (Local Loopback)
    RX packets 385 bytes 37184 (37.1 KB)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 385 bytes 37184 (37.1 KB)
    TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0
    
    tun-0A140B03-0: flags=209 mtu 8936
    inet 1.1.1.19 netmask 255.255.255.255 destination 1.1.1.19
    inet6 fe80::5efe:a14:103 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 9 dropped 0 overruns 0 carrier 9 collisions 0
    
    tun-0A140B41-0: flags=209 mtu 8936
    inet 1.1.1.205 netmask 255.255.255.255 destination 1.1.1.205
    inet6 fe80::5efe:a14:141 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 16 bytes 1344 (1.3 KB)
    TX errors 10 dropped 0 overruns 0 carrier 10 collisions 0
    
    tun-0A140B42-0: flags=209 mtu 8936
    inet 1.1.1.92 netmask 255.255.255.255 destination 1.1.1.92
    inet6 fe80::5efe:a14:142 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 10 dropped 0 overruns 0 carrier 10 collisions 0
    
    tun-0A140B43-0: flags=209 mtu 8936
    inet 1.1.1.236 netmask 255.255.255.255 destination 1.1.1.236
    inet6 fe80::5efe:a14:143 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 9 dropped 0 overruns 0 carrier 9 collisions 0
    
    tun-0A140B44-0: flags=209 mtu 8936
    inet 1.1.1.144 netmask 255.255.255.255 destination 1.1.1.144
    inet6 fe80::5efe:a14:144 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 16 bytes 1344 (1.3 KB)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 10 dropped 0 overruns 0 carrier 10 collisions 0
    
    tun-0A140B45-0: flags=209 mtu 8936
    inet 1.1.1.4 netmask 255.255.255.255 destination 1.1.1.4
    inet6 fe80::5efe:a14:145 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 9 dropped 0 overruns 0 carrier 9 collisions 0
    
    tun-0A140B46-0: flags=209 mtu 8936
    inet 1.1.1.8 netmask 255.255.255.255 destination 1.1.1.8
    inet6 fe80::5efe:a14:146 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 10 dropped 0 overruns 0 carrier 10 collisions 0
    
    tun-0A140B47-0: flags=209 mtu 8936
    inet 1.1.1.32 netmask 255.255.255.255 destination 1.1.1.32
    inet6 fe80::5efe:a14:147 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 9 dropped 0 overruns 0 carrier 9 collisions 0
    
    tun-0A140B48-0: flags=209 mtu 8936
    inet 1.1.1.71 netmask 255.255.255.255 destination 1.1.1.71
    inet6 fe80::5efe:a14:148 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 9 dropped 0 overruns 0 carrier 9 collisions 0
    
    tun-0A140B49-0: flags=209 mtu 8936
    inet 1.1.1.212 netmask 255.255.255.255 destination 1.1.1.212
    inet6 fe80::5efe:a14:149 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 10 dropped 0 overruns 0 carrier 10 collisions 0
    
    tun-0A140B4A-0: flags=209 mtu 8936
    inet 1.1.1.37 netmask 255.255.255.255 destination 1.1.1.37
    inet6 fe80::5efe:a14:14a prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 10 dropped 0 overruns 0 carrier 10 collisions 0
    
    tun-0A140B4B-0: flags=209 mtu 8936
    inet 1.1.1.108 netmask 255.255.255.255 destination 1.1.1.108
    inet6 fe80::5efe:a14:14b prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 10 dropped 0 overruns 0 carrier 10 collisions 0
    
    tun-0A140B4C-0: flags=209 mtu 8936
    inet 1.1.1.194 netmask 255.255.255.255 destination 1.1.1.194
    inet6 fe80::5efe:a14:14c prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 9 dropped 0 overruns 0 carrier 9 collisions 0
    
    tun-0A140B4D-0: flags=209 mtu 8936
    inet 1.1.1.56 netmask 255.255.255.255 destination 1.1.1.56
    inet6 fe80::5efe:a14:14d prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 9 dropped 0 overruns 0 carrier 9 collisions 0

Following output shows the transit gw route table for HPE config. 

Destination| Via| Dev| Nexthop IP| Nexthop Gateway| Status| Metric| Weight  
---|---|---|---|---|---|---|---  
default| 10.20.1.1| eth0| | | up| 0|   
10.20.1.0/24| 10.20.1.1| eth0| | | up| 0|   
10.20.1.1| | eth0| | | up| 0|   
10.20.11.0/24| | tun-0A140B03-0| 10.20.11.3| gcp-spoke1-gw-uscentral1| up| 100| 1  
| | tun-0A140B41-0| 10.20.11.65| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B42-0| 10.20.11.66| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B43-0| 10.20.11.67| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B44-0| 10.20.11.68| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B45-0| 10.20.11.69| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B46-0| 10.20.11.70| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B47-0| 10.20.11.71| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B48-0| 10.20.11.72| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B49-0| 10.20.11.73| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4A-0| 10.20.11.74| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4B-0| 10.20.11.75| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4C-0| 10.20.11.76| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4D-0| 10.20.11.77| gcp-spoke1-gw-uscentral1| up| | 1  
10.20.11.78| | tun-0A140B03-0| 10.20.11.3| gcp-spoke1-gw-uscentral1| up| 0| 1  
| | tun-0A140B41-0| 10.20.11.65| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B42-0| 10.20.11.66| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B43-0| 10.20.11.67| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B44-0| 10.20.11.68| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B45-0| 10.20.11.69| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B46-0| 10.20.11.70| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B47-0| 10.20.11.71| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B48-0| 10.20.11.72| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B49-0| 10.20.11.73| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4A-0| 10.20.11.74| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4B-0| 10.20.11.75| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4C-0| 10.20.11.76| gcp-spoke1-gw-uscentral1| up| | 1  
| | tun-0A140B4D-0| 10.20.11.77| gcp-spoke1-gw-uscentral1| up| | 1  
169.254.0.0/16| | eth0| | | up| 0|   
  
## Spoke GW Routing and Tunnel Details
    
    
    Spoke GW Interface Details. 14 tunnels interfaces in total
    
    eth0: flags=4163 mtu 1460
    inet 10.20.11.3 netmask 255.255.255.255 broadcast 10.20.11.3
    inet6 fe80::4001:aff:fe14:b03 prefixlen 64 scopeid 0x20
    ether 42:01:0a:14:0b:03 txqueuelen 1000 (Ethernet)
    RX packets 232462 bytes 278505311 (278.5 MB)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 73455 bytes 19303335 (19.3 MB)
    TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0
    
    lo: flags=73 mtu 65536
    inet 127.0.0.1 netmask 255.0.0.0
    inet6 ::1 prefixlen 128 scopeid 0x10
    loop txqueuelen 1000 (Local Loopback)
    RX packets 691 bytes 59476 (59.4 KB)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 691 bytes 59476 (59.4 KB)
    TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0
    
    tun-0A140103-0: flags=209 mtu 8936
    inet 1.1.1.171 netmask 255.255.255.255 destination 1.1.1.171
    inet6 fe80::5efe:a14:b03 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140141-0: flags=209 mtu 8936
    inet 1.1.1.33 netmask 255.255.255.255 destination 1.1.1.33
    inet6 fe80::5efe:a14:b41 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 1168 bytes 98112 (98.1 KB)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140142-0: flags=209 mtu 8936
    inet 1.1.1.14 netmask 255.255.255.255 destination 1.1.1.14
    inet6 fe80::5efe:a14:b42 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140143-0: flags=209 mtu 8936
    inet 1.1.1.191 netmask 255.255.255.255 destination 1.1.1.191
    inet6 fe80::5efe:a14:b43 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140144-0: flags=209 mtu 8936
    inet 1.1.1.132 netmask 255.255.255.255 destination 1.1.1.132
    inet6 fe80::5efe:a14:b44 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 56 bytes 4704 (4.7 KB)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 1168 bytes 98112 (98.1 KB)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140145-0: flags=209 mtu 8936
    inet 1.1.1.224 netmask 255.255.255.255 destination 1.1.1.224
    inet6 fe80::5efe:a14:b45 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140146-0: flags=209 mtu 8936
    inet 1.1.1.241 netmask 255.255.255.255 destination 1.1.1.241
    inet6 fe80::5efe:a14:b46 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 13 dropped 0 overruns 0 carrier 13 collisions 0
    
    tun-0A140147-0: flags=209 mtu 8936
    inet 1.1.1.77 netmask 255.255.255.255 destination 1.1.1.77
    inet6 fe80::5efe:a14:b47 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140148-0: flags=209 mtu 8936
    inet 1.1.1.222 netmask 255.255.255.255 destination 1.1.1.222
    inet6 fe80::5efe:a14:b48 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A140149-0: flags=209 mtu 8936
    inet 1.1.1.157 netmask 255.255.255.255 destination 1.1.1.157
    inet6 fe80::5efe:a14:b49 prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A14014A-0: flags=209 mtu 8936
    inet 1.1.1.5 netmask 255.255.255.255 destination 1.1.1.5
    inet6 fe80::5efe:a14:b4a prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A14014B-0: flags=209 mtu 8936
    inet 1.1.1.189 netmask 255.255.255.255 destination 1.1.1.189
    inet6 fe80::5efe:a14:b4b prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A14014C-0: flags=209 mtu 8936
    inet 1.1.1.251 netmask 255.255.255.255 destination 1.1.1.251
    inet6 fe80::5efe:a14:b4c prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 0 bytes 0 (0.0 B)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0
    
    tun-0A14014D-0: flags=209 mtu 8936
    inet 1.1.1.75 netmask 255.255.255.255 destination 1.1.1.75
    inet6 fe80::5efe:a14:b4d prefixlen 64 scopeid 0x20
    tunnel txqueuelen 1000 (IPIP Tunnel)
    RX packets 0 bytes 0 (0.0 B)
    RX errors 0 dropped 0 overruns 0 frame 0
    TX packets 56 bytes 4704 (4.7 KB)
    TX errors 15 dropped 0 overruns 0 carrier 15 collisions 0

gcp-spoke1-gw-uscentral1 Route Table

Destination| Via| Dev| Nexthop IP| Nexthop Gateway| Status| Metric| Weight  
---|---|---|---|---|---|---|---  
default| 10.20.11.1| eth0| | | up| 0|   
10.20.1.0/24| | tun-0A140103-0| 10.20.1.3| gcp-transit-gw-uscentral1| up| 100| 1  
| | tun-0A140141-0| 10.20.1.65| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140142-0| 10.20.1.66| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140143-0| 10.20.1.67| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140144-0| 10.20.1.68| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140145-0| 10.20.1.69| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140146-0| 10.20.1.70| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140147-0| 10.20.1.71| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140148-0| 10.20.1.72| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140149-0| 10.20.1.73| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014A-0| 10.20.1.74| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014B-0| 10.20.1.75| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014C-0| 10.20.1.76| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014D-0| 10.20.1.77| gcp-transit-gw-uscentral1| up| | 1  
10.20.1.78| | tun-0A140103-0| 10.20.1.3| gcp-transit-gw-uscentral1| up| 0| 1  
| | tun-0A140141-0| 10.20.1.65| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140142-0| 10.20.1.66| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140143-0| 10.20.1.67| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140144-0| 10.20.1.68| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140145-0| 10.20.1.69| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140146-0| 10.20.1.70| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140147-0| 10.20.1.71| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140148-0| 10.20.1.72| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A140149-0| 10.20.1.73| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014A-0| 10.20.1.74| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014B-0| 10.20.1.75| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014C-0| 10.20.1.76| gcp-transit-gw-uscentral1| up| | 1  
| | tun-0A14014D-0| 10.20.1.77| gcp-transit-gw-uscentral1| up| | 1  
10.20.11.0/24| 10.20.11.1| eth0| | | up| 0|   
10.20.11.1| | eth0| | | up| 0|   
169.254.0.0/16| | eth0| | | up| 0|   
Name| Route| Target| Gateway| Priority| Tags| Status  
---|---|---|---|---|---|---  
avx-1456e7d7d4354e2a894d403929d25074| 10.0.0.0/8| Instance gcp-spoke1-gw-uscentral1 (zone us-central1-c)| gcp-spoke1-gw-uscentral1| 1000| | active  
avx-1d793218436145f482e42b25a7090174| 172.16.0.0/12| Instance gcp-spoke1-gw-uscentral1 (zone us-central1-c)| gcp-spoke1-gw-uscentral1| 1000| | active  
avx-99394b1d0aae456997324de23596881b| 192.168.0.0/16| Instance gcp-spoke1-gw-uscentral1 (zone us-central1-c)| gcp-spoke1-gw-uscentral1| 1000| | active  
avx-9aeb27276c524a3a97ca59cf26fab8a9| 0.0.0.0/0| default-internet-gateway| | 1000| avx-gcp-spoke1-vpc-uscentral1-gbl| active  
default-route-1e4799e08daf4d0b| 10.20.11.0/24| Virtual network gcp-spoke1-vpc-uscentral1| | 0| | active  
default-route-7430e4c4273b0d5d| 0.0.0.0/0| default-internet-gateway| | 1000| | active  
peering-route-becf46cc6fbeaf76| 10.20.1.0/24| | | 0| | active  
GCP Spoke VPC Route Table
