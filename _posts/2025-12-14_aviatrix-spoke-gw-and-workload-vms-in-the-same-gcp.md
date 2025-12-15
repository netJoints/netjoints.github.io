---
title: "Onboarding GCP Project in Aviatrix Controller with Restricted Access"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 30, 2020", "cloud-networking", "Previous\u00a0post Onboarding GCP Project in Aviatrix Controller with Restricted Access", "Next\u00a0post GCP Shared VPC Transit Design and Deploy For Enterprises"]
tags: []
original_url: https://netjoints.com/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp-shared-vpc-network/#respond
---

### 

This pattern is more suited for small deployments, PoC or lab setup where the networking is kept very simple. The Aviatrix transit GW is deployed inside the host-project. The Aviatrix spokes are also deployed inside the host-project but the VPC network (or subnet) is shared with the service/tenant VPC. This same shared VPC network (subnet) is then used by the workload VMs as well. Using same subnet for Aviatrix spoke GW and workload VMs might not be desirable for some organizations.

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-58.png)
    
    
    This article discusses the deployment aspects of first design pattern. 
    Second design pattern will be discussed in a different blog.

### Deployment Details

#### Create VPC networks under Host Project

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-1-1024x264.png)

Attach service project with Host Project under Shared VPC option

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-2.png)

While attaching the project, you need to select the respective subnet as well. Following screen shows the subnets shared with the service project

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-3.png)

You can also list all the “Shared VPC networks” and their attached “Service Projects” as shown in the following screen

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-4.png)

#### Deploy Aviatrix Transit Gateway

Now deploy Aviatrix transit gateway in the host project’s “transit vpc network”

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-5.png)

Enable connected transit as shown in the following screen. This make all spoke vpc-networks to communicate with each other. By default it is disabled.
    
    
    Also assign BGP AS Number to newly deployed Aviatrix Gateway. This step is the best practice and not mandatory. This becomes critical for traffic engineering or if one wants to connect to on-prem router/firewall for eBGP.

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-9.png)

#### Deploy Aviatrix Spoke Gateways

Deploy Aviatrix spoke gateways in the prod and dev shared vpc network. These networks were created inside the central IT host project but were shared to prod and dev service projects. For instance “gcp-spk-gw-host-project-vpcnet-prod” will be deployed as Aviatrix gateway inside the host project. It will consume the compute resources from the central IT host project. This way central IT will have complete control over the transit and spoke gateways and their networking aspects. The service/tenant projects will be deploying their VMs inside their own compute and will be responsible for paying for it but will not have any control over the networking aspects.

Following screen shot shows the spoke gateway deployment. Notice that the Account Name / Project name selected in the drop down menu is “netjoints-host-project”

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-6.png)

Similarly the spoke gateway for dev service project was deployed. The following list shows the outcome of transit and spoke gateways

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-7.png) ![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_spoke-gw-list-1.png)

#### Attach Spoke Gateways to Transit Gateway

Now attach both spokes to the transit gateway to build the complete hub-spoke topology

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_image-10.png)

After the attachment, the spoke list will show the connected transit as follows

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_Screen-Shot-2020-09-15-at-9.55.48-AM.png)

#### Testing and Verification

### CoPilot View

If you have Aviatrix CoPilot, then you can visualize the topology that was build on the run-time.

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_GCP_shared_AVTX_Design1.png)

#### GCP View

GCP host project shows the Aviatrix transit and spoke gateways

![](../../media/images/aviatrix-spoke-gw-and-workload-vms-in-the-same-gcp_Screen-Shot-2020-09-15-at-10.32.36-AM.png)

GCP Prod and Dev projects would show the Prod and Dev VMs that will be used for testing
    
    
    shahzad_netjoints_com@service-project-prod-vm1:~$ ping 10.21.12.3
    PING 10.21.12.3 (10.21.12.3) 56(84) bytes of data.
    64 bytes from 10.21.12.3: icmp_seq=1 ttl=61 time=4.65 ms
    64 bytes from 10.21.12.3: icmp_seq=2 ttl=61 time=2.66 ms
    64 bytes from 10.21.12.3: icmp_seq=3 ttl=61 time=2.99 ms
    64 bytes from 10.21.12.3: icmp_seq=4 ttl=61 time=2.79 ms
    ^C
    --- 10.21.12.3 ping statistics ---
    4 packets transmitted, 4 received, 0% packet loss, time 8ms
    rtt min/avg/max/mdev = 2.658/3.270/4.647/0.805 ms
    shahzad_netjoints_com@service-project-prod-vm1:~$
    
    
    shahzad_netjoints_com@service-project-prod-vm1:~$ traceroute 10.21.12.3  
    traceroute to 10.21.12.3 (10.21.12.3), 30 hops max, 60 byte packets  
    1 gcp-spk-gw-host-project-vpcnet-prod.us-east4-a.c.shahzad-host-project-11.internal (10.21.11.2) 1.648 ms 1.632 ms 1.612  
    ms  
    2 * * *  
    3 * * *  
    4 * * *  
    5 10.21.12.3 (10.21.12.3) 5.521 ms 5.499 ms 5.751 ms  
    shahzad_netjoints_com@service-project-prod-vm1:~$
