---
title: "LAB2 – GCP Multi-Cloud Network Transit / Hub-Spoke"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 28, 2020", "cloud-networking", "Previous\u00a0post LAB2 \u2013 GCP Multi-Cloud Network Transit / Hub-Spoke", "Next\u00a0post LAB4 \u2013 GCP FQDN Based Egress Security"]
tags: []
original_url: https://netjoints.com/lab3-gcp-multi-cloud-network-segmentation-mcns/
---

It is important to provide security compliance and fulfill audit requirements by using various methods and network segmentation is one of them. Providing Network Security segmentation is a critical business requirement. Aviatrix MCNS is helping many customers who achieved this requirement.

So far we have built following topology

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.25.23-PM.png)

Our objective in this lab to segment VPCs in GCP based on the workload. Here are the business requirements

  * There are two types of workload present in GCP called Green and Blue
  * The workload in Blue and Green must not be allowed to communicate to each other
  * Workloads within Blue and Green segments must be allowed to communicate with each other
  * These segments must also extend to AWS as well. 
  * These segments should also extend to the on-prem data centers to provide segmentation for hybrid connectivity and their respective workload deployed in the on-premise DC locations. 



Following is how the final topology will look like after all the business objectives are met

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.32.00-PM.png)

## Enable MCNS on Transit gateways

Controller –> Multi-Cloud Transit –> Segmentation –> Plan –> Enable for **“gcp-transit”**

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_image-18.png)

Controller –> Multi-Cloud Transit –> Segmentation –> Plan –> Enable for **“aws-transit-gw-us-west-2”**

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.34.36-PM-1024x256.png)

## Create Multi-Cloud Security Domains (MCSD)

Create two MCSD Green and Blue. These two domains are not connected to each other by default. 

Controller –> Multi-Cloud Transit –> Segmentation –> Plan –> Create MCSD

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.36.45-PM.png)

Repeat it again for Blue

Controller –> Multi-Cloud Transit –> Segmentation –> Plan –> Create MCSD

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.37.12-PM.png)

## MCNS Connection Policy

The following screen shows that Green and Blue are not connected as per their Security or “Connection Policy”. 

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_image-19.png)

## Assign GCP and AWS VPC to MCSD

In order to enforce the intent/policy we just created, we need to assign VPCs to their respective Security Domain based on the business policy.

  * gcp-spoke-1 :: Green
  * gcp-spoke-2 :: Blue
  * gcp-spoke-3 :: Blue
  * gcp-to-dc-route-1 :: Green
  * aws-spoke-1 :: Green
  * aws-spoke-2 :: Blue
  * aws-to-dc-router-2 :: Green  




Controller –> Multi-Cloud Transit –> Segmentation –> Build –> Associate Aviatrix Spoke to MCSD 

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.47.55-PM.png)

Repeat this step as per the business requirement

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.50.23-PM.png)

Controller –> Multi-Cloud Transit –> Segmentation –> List –> Domains to verify the configuration

![](../../media/images/lab3-gcp-multi-cloud-network-segmentation-mcns_Screen-Shot-2020-12-31-at-11.52.03-PM-1024x275.png)

Verify the Connectivity

Now Ping from vm_gcp_private_ip_spoke1 (**Green Segment**) to other test machines (as listed below) and check the connectivity

  * vm_gcp_private_ip_spoke2 Blue Segment (10.20.12.130) – should not work
  * vm_gcp_private_ip_spoke3 Blue Segment (10.42.0.130) – should not work
  * vm_aws_private_ip_spoke1 Green Segment (10.101.0.84) – **should work**


    
    
    ubuntu@vm-gcp-spoke-1:~$ ping 10.20.12.130
    PING 10.20.12.130 (10.20.12.130) 56(84) bytes of data.
    From 10.20.11.2 icmp_seq=1 Time to live exceeded
    From 10.20.11.2 icmp_seq=2 Time to live exceeded
    From 10.20.11.2 icmp_seq=3 Time to live exceeded
    ^C
    --- 10.20.12.130 ping statistics ---
    3 packets transmitted, 0 received, +3 errors, 100% packet loss, time 2003ms
    
    ubuntu@vm-gcp-spoke-1:~$ ping 10.42.0.130
    PING 10.42.0.130 (10.42.0.130) 56(84) bytes of data.
    From 10.20.11.2 icmp_seq=1 Time to live exceeded
    From 10.20.11.2 icmp_seq=2 Time to live exceeded
    From 10.20.11.2 icmp_seq=3 Time to live exceeded
    From 10.20.11.2 icmp_seq=4 Time to live exceeded
    ^C
    --- 10.42.0.130 ping statistics ---
    4 packets transmitted, 0 received, +4 errors, 100% packet loss, time 3003ms
    
    ubuntu@vm-gcp-spoke-1:~$ ping 10.101.0.84
    PING 10.101.0.84 (10.101.0.84) 56(84) bytes of data.
    64 bytes from 10.101.0.84: icmp_seq=1 ttl=60 time=63.3 ms
    64 bytes from 10.101.0.84: icmp_seq=2 ttl=60 time=61.3 ms
    64 bytes from 10.101.0.84: icmp_seq=3 ttl=60 time=61.5 ms
    64 bytes from 10.101.0.84: icmp_seq=4 ttl=60 time=61.3 ms
    ^C
    --- 10.101.0.84 ping statistics ---
    4 packets transmitted, 4 received, 0% packet loss, time 3004ms
    rtt min/avg/max/mdev = 61.376/61.914/63.303/0.806 ms
    ubuntu@vm-gcp-spoke-1:~$ 
    

Now keep the ping running from gcp-spoke-1 VM to 10.20.12.130 and change the policy to connect Green and Blue. Notice that ping starts working. 

Now change the policy as it was before so that Blue is not allowed to Green
