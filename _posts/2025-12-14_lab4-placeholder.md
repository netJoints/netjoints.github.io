---
title: "LAB3 – GCP Multi-Cloud Network Segmentation (MCNS)"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 28, 2020", "https://copilot-pod24.mcna.cc/#/login", "cloud-networking", "Previous\u00a0post LAB3 \u2013 GCP Multi-Cloud Network Segmentation (MCNS)", "Next\u00a0post LAB5 \u2013 Bring Your Own IP/Subnet in GCP (Overlapping IP)"]
tags: []
original_url: https://netjoints.com/lab4-placeholder/
---

This lab will demonstrate how to provide Fully Qualified Domain Name (FQDN) based Egress Filtering security using Aviatrix. Only those FQDNs will be allowed which are permitted in the configured policy.

## Egress FQDN Filtering Overview

Aviatrix FQDN Egress is a highly available security service specifically designed for workloads or applications in  
the public clouds.

Aviatrix Egress FQDN Filtering is Centrally managed by the Aviatrix Controller and executed on Aviatrix FQDN gateway  
in the VNET/VPC/VCN in the distributed or centralized architecture. All the internet bound traffic (TCP/UDP  
including HTTP/HTTPS/SFTP) is first discovered and based on the results admin can create egress filters using  
whitelist or blacklist model. 

Egress FQDN filtering allows organizations to achieve PCI compliance by limiting application’s access to  
approved FQDNs. This is a common replacement for SQUID proxy type of manual solutions. There are several  
ways to deploy Egress FQDN filtering depending on requirements. 

This lab will use existing GCP Spoke GWs to provide filtering to protect instances that are on private subnet but require Egress Security. For more scalable solution, enterprises opt for a dedicated Egresss FQDN GW rather than using the existing Spoke GW for this function.

## Topology

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-8.46.45-AM-1024x875.png)

  * The workload in gcp-spoke2-vpc will follow zero trust security model 
    * Workload/VM in gcp-spoke2-vpc will only have access to https://*.ubuntu.com and https://*.google.com FQDN. 
    * Rest of the traffic will be blocked with the base zero trust policy
  * We will configure the gcp-spoke2-gw as Egress FQDN GW as well to enforce this security policy
  * We will use VM in gcp-spoke3-vpc as “Jump Host” for this testing



## Enable Egress FQDN Filtering

Controller –> Security –> Egress Control –> New TAG

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-8.56.05-AM-1024x187.png)

![](../../media/images/lab4-placeholder_image-1024x546.png)

Controller –> Security –> Egress Control –> Egress FQDN Filter –> Edit “Allow-List” TAG –> Add New

![](../../media/images/lab4-placeholder_image-1-1024x416.png)

Now click “SAVE”, then “UPDATE” and CLOSE.

![](../../media/images/lab4-placeholder_image-3-1024x553.png)

Now make sure that the base policy is “White” which stands for “Zero Trust”. This will make sure only the FQDNs in the “Allowed List” are accessible and rest of the FQDNs are blocked. 

![](../../media/images/lab4-placeholder_image-4-1024x208.png)

Now we will attach this filter policy to gcp-spoke-2-gw and then enable it.

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-9.29.10-AM-1024x393.png)

It will look like following

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-9.30.10-AM-1024x536.png)

The status is still disabled and now we need to enable it. 

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-9.32.16-AM-1024x537.png)

## Testing and Verification

We have completed the following topology 

![](../../media/images/lab4-placeholder_image-5-1024x882.png)

  * ssh into the gcp-spoke3 VM using its public ip address (vm_gcp_public_ip_spoke3)
    * User: ubuntu / pass: Password123!
  * Then from there ssh into the gcp-spoke2 VM using its private ip address (vm_gcp_private_ip_spoke2) 
    * User: ubuntu / pass: Password123!
  * gcp-spoke2 is where we have enforced the Egress FQDN policy
    * Since both spoke2 and spoke3 are in Blue segment, they can communicate to each others. If you would try to ssh into gcp-spoke2-vm from gcp-spoke1-vm, it will not work


    
    
    **shahzadali@shahzad-ali ~ % ssh ubuntu@34.86.180.56**
    
    ubuntu@34.86.180.56's password:
    Welcome to Ubuntu 16.04.7 LTS (GNU/Linux 4.15.0-1087-gcp x86_64)
    Documentation: https://help.ubuntu.com
    Management: https://landscape.canonical.com
    Support: https://ubuntu.com/advantage
    3 packages can be updated.
    0 updates are security updates.
    New release '18.04.5 LTS' available.
    Run 'do-release-upgrade' to upgrade to it.
    *** System restart required ***
    Last login: Sat Jan 2 16:41:56 2021 from 172.124.233.126
    To run a command as administrator (user "root"), use "sudo ".
    See "man sudo_root" for details.
    
    **ubuntu@vm-gcp-spoke-3:~$ ifconfig**
    
    ens4 Link encap:Ethernet HWaddr 42:01:0a:2a:00:82
    inet addr:10.42.0.130 Bcast:10.42.0.130 Mask:255.255.255.255
    inet6 addr: fe80::4001:aff:fe2a:82/64 Scope:Link
    UP BROADCAST RUNNING MULTICAST MTU:1460 Metric:1
    RX packets:1461966 errors:0 dropped:0 overruns:0 frame:0
    TX packets:846760 errors:0 dropped:0 overruns:0 carrier:0
    collisions:0 txqueuelen:1000
    RX bytes:510003616 (510.0 MB) TX bytes:107570824 (107.5 MB)
    lo Link encap:Local Loopback
    inet addr:127.0.0.1 Mask:255.0.0.0
    inet6 addr: ::1/128 Scope:Host
    UP LOOPBACK RUNNING MTU:65536 Metric:1
    RX packets:126 errors:0 dropped:0 overruns:0 frame:0
    TX packets:126 errors:0 dropped:0 overruns:0 carrier:0
    collisions:0 txqueuelen:1000
    RX bytes:14552 (14.5 KB) TX bytes:14552 (14.5 KB)
    ubuntu@vm-gcp-spoke-3:~$
    
    
    **ubuntu@vm-gcp-spoke-3:~$ ssh ubuntu@10.20.12.130**
    
    ubuntu@10.20.12.130's password:
    Welcome to Ubuntu 16.04.7 LTS (GNU/Linux 4.15.0-1087-gcp x86_64)
    Documentation: https://help.ubuntu.com
    Management: https://landscape.canonical.com
    Support: https://ubuntu.com/advantage
    3 packages can be updated.
    0 updates are security updates.
    New release '18.04.5 LTS' available.
    Run 'do-release-upgrade' to upgrade to it.
    *** System restart required ***
    Last login: Sat Jan 2 16:42:30 2021 from 10.20.12.2
    To run a command as administrator (user "root"), use "sudo ".
    See "man sudo_root" for details.
    ubuntu@vm-gcp-spoke-2:~$
    ubuntu@vm-gcp-spoke-2:~$
    
    **ubuntu@vm-gcp-spoke-2:~$ wget https://www.google.com**
    --2021-01-02 17:46:12-- https://www.google.com/
    Resolving www.google.com (www.google.com)… 74.125.197.147, 74.125.197.103, 74.125.197.104, …
    Connecting to www.google.com (www.google.com)|74.125.197.147|:443… connected.
    HTTP request sent, awaiting response… 200 OK
    Length: unspecified [text/html]
    Saving to: ‘index.html.21’
    index.html.21 [ <=> ] 12.54K --.-KB/s in 0s
    2021-01-02 17:46:12 (29.4 MB/s) - ‘index.html.21’ saved [12844]
    
    **ubuntu@vm-gcp-spoke-2:~$ wget https://cloud.google.com**
    --2021-01-02 17:46:59-- https://cloud.google.com/
    Resolving cloud.google.com (cloud.google.com)… 74.125.20.113, 74.125.20.102, 74.125.20.100, …
    Connecting to cloud.google.com (cloud.google.com)|74.125.20.113|:443… connected.
    HTTP request sent, awaiting response… 200 OK
    Length: 706920 (690K) [text/html]
    Saving to: ‘index.html.22’
    index.html.22 100%[==============================================================>] 690.35K 3.44MB/s in 0.2s
    2021-01-02 17:47:00 (3.44 MB/s) - ‘index.html.22’ saved [706920/706920]
    ubuntu@vm-gcp-spoke-2:~$
    
    **ubuntu@vm-gcp-spoke-2:~$ wget https://www.ubuntu.com**
    --2021-01-02 17:48:34-- https://www.ubuntu.com/
    Resolving www.ubuntu.com (www.ubuntu.com)… 91.189.88.180, 91.189.88.181, 91.189.91.45, …
    Connecting to www.ubuntu.com (www.ubuntu.com)|91.189.88.180|:443… connected.
    HTTP request sent, awaiting response… 301 Moved Permanently
    Location: https://ubuntu.com/ [following]
    --2021-01-02 17:48:35-- https://ubuntu.com/
    Resolving ubuntu.com (ubuntu.com)… 91.189.88.180, 91.189.91.44, 91.189.91.45, …
    Connecting to ubuntu.com (ubuntu.com)|91.189.88.180|:443… connected.
    HTTP request sent, awaiting response… 200 OK
    Length: 121017 (118K) [text/html]
    Saving to: ‘index.html.23’
    index.html.23 100%[==============================================================>] 118.18K 319KB/s in 0.4s
    2021-01-02 17:48:36 (319 KB/s) - ‘index.html.23’ saved [121017/121017]
    ubuntu@vm-gcp-spoke-2:~$

Now if we try to access any other FQDN, that should fail
    
    
    **ubuntu@vm-gcp-spoke-2:~$ wget https://www.espn.com**
    --2021-01-02 17:49:27-- https://www.espn.com/
    Resolving www.espn.com (www.espn.com)… 13.224.10.82, 13.224.10.114, 13.224.10.88, …
    Connecting to www.espn.com (www.espn.com)|13.224.10.82|:443… connected.
    
    
    **ubuntu@vm-gcp-spoke-2:~$ wget https://www.cnn.com**
    --2021-01-02 17:51:00-- https://www.cnn.com/
    Resolving www.cnn.com (www.cnn.com)… 151.101.1.67, 151.101.65.67, 151.101.129.67, …
    Connecting to www.cnn.com (www.cnn.com)|151.101.1.67|:443… connected.

## Egress FQDN Stats on Controller

Controller –> Security –> FQDN Stats

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-9.53.27-AM-1024x729.png)

### Per Gateway Stats

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-9.54.24-AM-1024x553.png)

### Egress FQDN Search

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-9.58.13-AM-1024x716.png)
    
    
    ==============================
    Search results on Gateway gcp-spoke-2
    ==============================
    2021-01-02T16:42:54.990606+00:00 GW-gcp-spoke-2-34.83.204.207 avx-nfq: AviatrixFQDNRule3[CRIT]nfq_ssl_handle_client_hello() L#291  Gateway=gcp-spoke-2 S_IP=10.20.12.130 D_IP=13.224.10.88 hostname=www.espn.com state=MATCHED drop_reason=BLACKLISTED Rule=*.espn.com,SourceIP:IGNORE;0;0;443
    2021-01-02T16:43:12.620897+00:00 GW-gcp-spoke-2-34.83.204.207 avx-nfq: AviatrixFQDNRule0[CRIT]nfq_ssl_handle_client_hello() L#291  Gateway=gcp-spoke-2 S_IP=10.20.12.130 D_IP=13.224.10.82 hostname=www.espn.com state=MATCHED drop_reason=BLACKLISTED Rule=*.espn.com,SourceIP:IGNORE;0;0;443
    2021-01-02T17:49:27.437085+00:00 GW-gcp-spoke-2-34.83.204.207 avx-nfq: AviatrixFQDNRule0[CRIT]nfq_ssl_handle_client_hello() L#291  Gateway=gcp-spoke-2 S_IP=10.20.12.130 D_IP=13.224.10.82 hostname=www.espn.com state=NO_MATCH drop_reason=NOT_WHITELISTED
    
    2021-01-02T17:49:41.679243+00:00 GW-gcp-spoke-2-34.83.204.207 avx-nfq: message repeated 7 times: [ AviatrixFQDNRule0[CRIT]nfq_ssl_handle_client_hello() L#291  Gateway=gcp-spoke-2 S_IP=10.20.12.130 D_IP=13.224.10.82 hostname=www.espn.com state=NO_MATCH drop_reason=NOT_WHITELISTED]
    2021-01-02T17:49:55.759092+00:00 GW-gcp-spoke-2-34.83.204.207 avx-nfq: AviatrixFQDNRule0[CRIT]nfq_ssl_handle_client_hello() L#291  Gateway=gcp-spoke-2 S_IP=10.20.12.130 D_IP=13.224.10.82 hostname=www.espn.com state=NO_MATCH drop_reason=NOT_WHITELISTED
    2021-01-02T17:50:02.669462+00:00 GW-gcp-spoke-2-34.83.204.207 avx-nfq: message repeated 6 times: [ AviatrixFQDNRule0[CRIT]nfq_ssl_handle_client_hello() L#291  Gateway=gcp-spoke-2 S_IP=10.20.12.130 D_IP=13.224.10.82 hostname=www.espn.com state=NO_MATCH drop_reason=NOT_WHITELISTED]
    2021-01-02T17:50:05.926066+00:00 GW-gcp-spoke-2-34.83.204.207 avx-nfq: AviatrixFQDNRule0[CRIT]nfq_ssl_handle_client_hello() L#291  Gateway=gcp-spoke-2 S_IP=10.20.12.130 D_IP=13.224.10.82 hostname=www.espn.com state=NO_MATCH drop_reason=NOT_WHITELISTED

## CoPilot Egress FQDN Stats

<https://copilot-pod24.mcna.cc/#/login> user: copilot / pass: Copilot123! (Read-Only on Controller)

CoPilot –> Security –> Egress

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-10.03.28-AM-1024x635.png)

### CoPilot Live Status

![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-10.05.04-AM-1024x410.png)

### CoPilot Search

![](../../media/images/lab4-placeholder_image-6-1024x301.png) ![](../../media/images/lab4-placeholder_Screen-Shot-2021-01-02-at-10.08.37-AM-1024x504.png)
