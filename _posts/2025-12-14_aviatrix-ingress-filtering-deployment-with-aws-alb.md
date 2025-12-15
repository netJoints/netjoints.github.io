---
title: "Aviatrix Kickstart – Spin up Cloud Networks in Minutes – CLI Mode"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 21, 2020", "Click here", "http://internal-aws-alb-internal-spk2-uswest2-1069035580.us-west-2.elb.amazonaws.com", "cloud-networking", "Previous\u00a0post Aviatrix Kickstart \u2013 Spin up Cloud Networks in Minutes \u2013 CLI Mode", "Next\u00a0post GCP Least Privileged Service Account for Aviatrix"]
tags: []
original_url: https://netjoints.com/aviatrix-ingress-filtering-deployment-with-aws-alb/#respond
---

  * The requires only single VPC for testing purposes
  * Aviatrix ingress filtering gateway (aka public subnet filter PSF) is deployed in the public subnet
  * External ALB deployed in the same public subnet as AVX-PSF-GW
  * WordPress App was launched in the non-routable private subnet (vpc2-subnet1)
  * Bonus testing with Internal ALB 
    * Test Windows EC2 was launched in a private subnet (vpc2-subnet2). 
    * A pubic IP address was assigned so I can RDP into it and test the internal ALB functionality
    * The 0/0 route table pointed to eni of PSF-GW which acts as a NAT-GW for not only to bring the traffic in but also to send out towards the public Internet



Following is the final topology

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-32.png)

## Deployment Screen Shots with External ALB

### Aviatrix PSF GW Deployment 

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-11.png)
    
    
    General Info
    Gateway name: aws-psfgw1-vpc2-uswest2
    Cloud type: 1
    Account name: shahzad-aws
    Region: us-west-2
    Gateway subnet AZ: us-west-2a
    Ingress IGW route table ID: rtb-0cc03b16fef17a6d8
    Gateway subnet CIDR: 10.102.0.0/26
    Gateway route table ID: rtb-0fa7cfd751d1f0381
    Guard duty enforced: yes

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-12.png)

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-13.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-14.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-15.png)

PSF GW Raw Config
    
    
    General Information:
      Account Name: shahzad-aws
      Gateway Name: aws-psfgw1-vpc2-uswest2
      Gateway Original Name: aws-psfgw1-vpc2-uswest2
      VPC ID: vpc-0a6933729014dc26e
      Region: us-west-2
      Primary CIDR: 10.102.0.0/16
      CIDRs: 10.102.0.0/16
      Subnet CIDR: 10.102.0.0/26, ID: subnet-026eabb64d25a6bce
      Type: vpc_legacy
      GW Instance Public IP: 44.241.30.250
      GW EBS encryption: True
      GW Instance Private IP: 10.102.0.32
      GW Instance Size: t3.micro
      Direct Internet: yes
      Designated gateway: No
      Extended public CIDRs: None
      Single AZ gateway HA: yes
      monitor subnets: disable
      ActiveMesh mode: no
      Stateful Firewall: Disabled
      Private S3: Disabled
      Egress Control: Disabled
      summarized_cidrs: None
      public_dns_server: 8.8.8.8
      SNAT Enabled: no
      VPN Access: disabled
    Subnet Information:
      subnet-01c282c7b4931a641  us-west-2a 10.102.12.0/24
      subnet-08acde6fb33c7dc0b  us-west-2b 10.102.20.0/24
      subnet-026eabb64d25a6bce  us-west-2a 10.102.0.0/26
      subnet-0073a332e7bf9e6a4  us-west-2a 10.102.11.0/24
      subnet-090552a3e46312188  us-west-2a 10.102.19.0/24

### AWS Configuration Details

AWS VPC2 was used for this configuration. 

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-16.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-17.png)

**VPC2 Route Table is shown as follows**

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-18.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-19.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-20.png)

**Following screen shows VPC2 Route Table. It has an “Ingress Routing” table that was programmed by Aviatrix Controller. Aviatrix uses AWS Ingress Routing feature to deliver this functionality**

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-21-1024x712.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-22-1024x676.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_Screen-Shot-2020-09-21-at-12.59.59-PM-1024x452.png)

## External ALB Config

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-23.png)

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-24-1024x560.png)

[Click here](http://aws-alb-spk2-uswest2-646300588.us-west-2.elb.amazonaws.com) to access the WordPress App using the External ALB. This link will not work after my test lab is destroyed.

## Internal ALB Configuration

This step is optional and only required if some internal team wants to access the same farm of web-server behind the ALB. 

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-25.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-26.png) ![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-27-1024x514.png)

### Testing for Internal ALB

Following WordPress EC2 was deployed for testing
    
    
    AMI ID  ami-02ddad6f7544a1442
    Platform details  Linux/UNIX
    AMI name  bitnami-wordpress-5.5.1-0-linux-debian-10-x86_64-hvm-ebs-7d426cb7-9522-4dd7-a56b-55dd8cc1c8d0-ami-06dd595c4559434b3.4
    Termination protection Disabled
    Launch time  Mon Sep 21 2020 01:03:16 GMT-0700 (Pacific Daylight Time) (about 12 hours)
    AMI location  aws-marketplace/bitnami-wordpress-5.5.1-0-linux-debian-10-x86_64-hvm-ebs-7d426cb7-9522-4dd7-a56b-55dd8cc1c8d0-ami-06dd595c4559434b3.4
     

I did RDP into the Windows jumb machine and did a traceroute. It shows that I am routed internally and not going towards the Internet

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-29.png)

From the same jumb box machine I used browser to access wordpress using the internal ALB

<http://internal-aws-alb-internal-spk2-uswest2-1069035580.us-west-2.elb.amazonaws.com>

![](../../media/images/aviatrix-ingress-filtering-deployment-with-aws-alb_image-30.png)
