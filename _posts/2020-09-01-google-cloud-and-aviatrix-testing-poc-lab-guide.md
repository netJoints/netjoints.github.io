---
title: "Aviatrix’s Check Point CloudGuard Related Features"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 28, 2020", "cloud-networking", "Previous\u00a0post Aviatrix\u2019s Check Point CloudGuard Related Features", "Next\u00a0post LAB2 \u2013 GCP Multi-Cloud Network Transit / Hub-Spoke"]
tags: []
original_url: https://netjoints.com/google-cloud-and-aviatrix-testing-poc-lab-guide/
---

## Introduction

This document is the lab guide for GCP Test Flight Project. Anyone with basic GCP knowledge is the audience. It is GCO focused with connection to AWS as optional component of the cloud. 

## Topology

Following is the starting topology. Some components are pre-built to save time.

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_image-3-1024x775.png)

Once you finish all lab steps, following is what it will look like

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_image-4.png)

## Main Use-Cases Covered

  * Cloud and Multi-Cloud Transit (Hub and Spoke) connectivity
  * Multi-Cloud Network Segmentation (MCNS)
  * Egress FQDN
  * User-VPN
  * Multi-Cloud Transit with AWS
  * Policy Based Remote User SAML/SSL VPN
  * Hybrid / On-Premise Connectivity (S2C)
  * Traffic Engineering with SD and BGP advance knobs
  * Day2 Operations, troubleshooting and monitoring (Aviatrix CoPilot)



## Warning / Pre-Requisite / Notes

  * Do not change the password of any device or server in the lab pod
  * Do not change controller password
  * In most of the places:
    * The Aviatrix Controller is referred to as “Controller”
    * The Aviatrix Gateway is referred to as “Gateway”



## LAB1 – Verify Connectivity

Make sure the lab is in good standing. Verify the following tasks by logging into the Aviatrix Controller UI. Make sure you log in to your own pod. Pod name is displayed on top. 

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_Screen-Shot-2020-12-31-at-12.17.17-PM.png)

Make sure you have resources deployed and matches to following

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_Screen-Shot-2020-12-31-at-12.17.57-PM-1024x471.png)  


The GCP Project is already on-boarded to save time in the Aviatrix Controller under Accounts Access Account

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_Screen-Shot-2020-12-31-at-12.18.42-PM-1024x394.png)  


Now change the email address to your corporate email address under Accounts –> Account Users –> admin (do not change the Controller password)

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_Screen-Shot-2020-12-31-at-12.20.16-PM-1024x507.png)

Aviatrix gateway are pre-deployed to save time. Make sure all gateways are up and running.

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_Screen-Shot-2020-12-31-at-12.21.38-PM.png)

Check the transit gateway under Multi-Cloud Transit –> List –> Transit

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_Screen-Shot-2020-12-31-at-12.23.18-PM.png)

Check the spoke gateway under Multi-Cloud Transit –> List –> Spoke

![](../../media/images/google-cloud-and-aviatrix-testing-poc-lab-guide_Screen-Shot-2020-12-31-at-12.25.03-PM.png)

### Verify GCP VM SSH Connectivity

GCP VMs only requires a password. Password is Password123!  
There is no .pem file needed to login to them. Login to vm_gcp_public_ip_spoke1. This IP address is provided in the LAB POD file
    
    
    shahzadali@shahzad-ali Pem Files % ssh ubuntu@35.224.13.215
    ubuntu@35.224.13.215's password:
    Welcome to Ubuntu 16.04.7 LTS (GNU/Linux 4.15.0-1087-gcp x86_64)
     
     * Documentation:  https://help.ubuntu.com
     * Management:     https://landscape.canonical.com
     * Support:        https://ubuntu.com/advantage
     
    11 packages can be updated.
    0 updates are security updates.
     
    New release '18.04.5 LTS' available.
    Run 'do-release-upgrade' to upgrade to it.
     
     
    Last login: Sat Nov 28 16:42:18 2020 from 172.124.233.126
    To run a command as administrator (user "root"), use "sudo <command>".
    See "man sudo_root" for details.
     
    **ubuntu@vm-gcp-test-spoke-1** :**~** $
    
    **ubuntu@vm-gcp-spoke-1:~$ ifconfig**
    
    ens4 
    Link encap:Ethernet HWaddr 42:01:0a:14:0b:82
    inet addr:**10.20.11.130** Bcast:10.20.11.130 Mask:255.255.255.255
    inet6 addr: fe80::4001:aff:fe14:b82/64 Scope:Link
    UP BROADCAST RUNNING MULTICAST MTU:1460 Metric:1
    RX packets:1025064 errors:0 dropped:0 overruns:0 frame:0
    TX packets:663466 errors:0 dropped:0 overruns:0 carrier:0
    collisions:0 txqueuelen:1000
    RX bytes:511233248 (511.2 MB) TX bytes:81897766 (81.8 MB)
    
    lo 
    Link encap:Local Loopback
    inet addr:127.0.0.1 Mask:255.0.0.0
    inet6 addr: ::1/128 Scope:Host
    UP LOOPBACK RUNNING MTU:65536 Metric:1
    RX packets:0 errors:0 dropped:0 overruns:0 frame:0
    TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
    collisions:0 txqueuelen:1000
    RX bytes:0 (0.0 B) TX bytes:0 (0.0 B)
    ubuntu@vm-gcp-spoke-1:~$

Now Ping from vm_gcp_private_ip_spoke1 to other test machines (as listed below) and check the connectivity

  * vm_gcp_private_ip_spoke2 (10.20.12.130) – should not work
  * vm_gcp_private_ip_spoke3 (10.42.0.130) – should not work
  * vm_aws_private_ip_spoke1 (10.101.0.84) – **should work**
  * vm_aws_private_ip_spoke2 (10.42.0.84) – should not work



Can you guess why it worked or did not work?

### Verify AWS EC2 SSH Connectivity

ssh into AWS VM in Spoke1using its public ip address and .pem file (the address is provided in the lab pod file you received). If you get the following error, then please fix your .pem file permission first. 
    
    
    shahzadali@shahzad-ali Pem Files % ssh ubuntu@35.163.104.122 - instance_priv_key.pem
    ubuntu@35.163.104.122: Permission denied (publickey).
     
    shahzadali@shahzad-ali Pem Files % chmod 400 instance_priv_key.pem

ssh using the user-name and .pem file again and ping the second AWS instance
    
    
    shahzadali@shahzad-ali Desktop % **ssh ubuntu@34.217.68.104 -i instance_priv_key_gcp_pod24.pem**
    Welcome to Ubuntu 16.04.5 LTS (GNU/Linux 4.4.0-1072-aws x86_64)
    Documentation: https://help.ubuntu.com
    Management: https://landscape.canonical.com
    Support: https://ubuntu.com/advantage
    Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud
    79 packages can be updated.
    0 updates are security updates.
    New release '18.04.5 LTS' available.
    Run 'do-release-upgrade' to upgrade to it.
    *** System restart required ***
    Last login: Thu Dec 31 20:36:52 2020 from 172.124.233.126
    To run a command as administrator (user "root"), use "sudo ".
    See "man sudo_root" for details.
    ubuntu@ip-10-101-0-84:~$

Ping from vm_aws_private_ip_spoke1 to …

  * vm_gcp_private_ip_spoke1 (10.20.11.130) – **should work**
  * vm_gcp_private_ip_spoke2 (10.20.12.130) – should not work
  * vm_gcp_private_ip_spoke3 (10.42.0.130) – should not work
  * vm_aws_private_ip_spoke2 (10.42.0.84) – should not work



### Verify On-Prem Router SSH Connectivity

ssh into the on-prem dc-router-1 (we are using Cisco CSR to simulate it). User is admin and Password is “Password123”
    
    
    shahzadali@shahzad-ali Desktop % ssh admin@54.219.225.218
    Password: 
    
    
    dc-router-1#show ip int brief
    Interface              IP-Address      OK? Method Status                Protocol
    GigabitEthernet1       192.168.20.162  YES DHCP   up                    up      
    Loopback0              10.20.11.254    YES TFTP   up                    up      
    Tunnel1                169.254.100.2   YES TFTP   up                    up      
    Tunnel42               172.16.0.1      YES TFTP   up                    up      
    VirtualPortGroup0      192.168.35.101  YES TFTP   up                    up      
    dc-router-1#
    

From dc-router-1 ping gcp and aws instances private ip addresses

  * vm_gcp_private_ip_spoke1 (10.20.11.130) – should no work
  * vm_gcp_private_ip_spoke2 (10.20.12.130) – should not work
  * vm_gcp_private_ip_spoke3 (10.42.0.130) – should not work
  * vm_aws_private_ip_spoke1 (10.101.0.84) – should not work
  * vm_aws_private_ip_spoke2 (10.42.0.84) – should not work



ssh into the on-prem dc-router-1 (we are using Cisco CSR to simulate it). User is admin and Password is “Password123”
    
    
    shahzadali@shahzad-ali Desktop % ssh admin@54.193.196.247
    The authenticity of host '54.193.196.247 (54.193.196.247)' can't be established.
    RSA key fingerprint is SHA256:fi8bbpJc8LCE32dn9RL1EIDzznl+mgQ5V5u5vR/hxFo.
    Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
    Warning: Permanently added '54.193.196.247' (RSA) to the list of known hosts.
    Password: 
    dc-router-2#
    
    
    dc-router-2#show ip int brief 
    Interface              IP-Address      OK? Method Status                Protocol
    GigabitEthernet1       192.168.10.120  YES DHCP   up                    up      
    Tunnel1                169.254.101.2   YES TFTP   up                    up      
    Tunnel42               172.16.0.2      YES TFTP   up                    up      
    VirtualPortGroup0      192.168.35.101  YES TFTP   up                    up      
    dc-router-2#

From dc-router-2 ping gcp and aws instances private ip addresses

  * vm_gcp_private_ip_spoke1 (10.20.11.130) – should no work
  * vm_gcp_private_ip_spoke2 (10.20.12.130) – should not work
  * vm_gcp_private_ip_spoke3 (10.42.0.130) – should not work
  * vm_aws_private_ip_spoke1 (10.101.0.84) – should not work
  * vm_aws_private_ip_spoke2 (10.42.0.84) – should not work



This completes the verification lab1. We will now move to other use-cases. 
