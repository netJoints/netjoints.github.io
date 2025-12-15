---
title: "Secure S3 Bucket Access Over Direct Connect Private VIF"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "July 17, 2020", "Aviatrix release 6.0", "Firewall Instances Health Check Enhancement", "Cloud Formation template in AWS \u2013 version R8040", "cloud-networking", "Previous\u00a0post Secure S3 Bucket Access Over Direct Connect Private VIF", "Next\u00a0post Next Post"]
tags: []
original_url: https://netjoints.com/check-point-cloudguard-iaas-in-aws-with-quick-failover/
---

## Introduction

[Aviatrix release 6.0](https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#firewall-network-firenet) introduced **[Firewall Instances Health Check Enhancement](https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#firewall-network-firenet)**. This enhancement checks a firewall instance’s health by pinging its LAN interface from the connecting Aviatrix FireNet gateway. An alternative option to check health through firewall’s management interface. ICMP health check to the Firewall LAN interface improves firewall failure detection time and detection accuracy.

This enhancement is available for Aviatrix FireNet deployment with Aviatrix Multi-Cloud Global Transit both in AWS and Azure. This enhancement is also available for AWS-TGW based designs as well.

In this article we will take a look at this enhancement in details with Check Point CloudGuard Firewall.

## Aviatrix Transit FireNet Design Pattern and Toplogy

Following is the Aviatrix Transit FireNet design pattern used to demonstrate the functionality.

  * Aviatrix Controller – version 6.0
  * Check Point CloudGuard Security Manager deployed using [Cloud Formation template in AWS – version R8040](https://supportcenter.checkpoint.com/supportcenter/portal?eventSubmit_doGoviewsolutiondetails=&solutionid=sk111013)
  * Check Point Smart Console – version R80.40
  * Check Point CloudGuard IaaS Firewall with Threat Prevention – R80.40-294.595
    * Check Point Cloud Guard IaaS Security Gateways (Firewalls) were deployed directly from the Aviatrix Controller

![](../../media/images/check-point-cloudguard-iaas-in-aws-with-quick-fail_547.png)

## Aviatrix Controller Controls and Manages the Life Cycle of Firewall Instances

Aviatrix controller manages the complete life cycle of Check Point firewall from infrastructure perspective. Aviatrix controller

  * Deploy/Delete firewall instances
  * Inspect and sync routes with the Firewall instances
  * Propagates and install the routes in Check Point CloudGuard IaaS firewalls. 
  * Enable/Disable Fail Open or Fail Close policy
  * Enable/Disable inspection
  * Enable/Disable Egress traffic via Firewall instances
  * Here you can see option to enable or disable the Health Check option for firewalls
  * Excludes certain subnets/CIDS from firewall inspection
  * Enable/Disable LAN side ICMP Health Check



### Enable LAN Side ICMP Health Check in Aviatrix Controller

Following screen shots shows how to enable the LAN side ICMP health Check.

Firewall Network –> Advance –> Click the 3 vertical dots

![](../../media/images/check-point-cloudguard-iaas-in-aws-with-quick-fail_547.png)

The expanded view shows the firewall deployed by the Aviatrix controller and towards the end of screen shot, one can enable/disable LAN side Health Check.

![](../../media/images/check-point-cloudguard-iaas-in-aws-with-quick-fail_547.png)

## Verify LAN Side ICMP Health Check via Smart Console

From Check Point logs and Monitoring section, notice that the ICMP health check is initiated every 5 second from the Aviatrix Transit FireNet gateways. The 5 second setting is the default and cannot be changed.

![](../../media/images/check-point-cloudguard-iaas-in-aws-with-quick-fail_547.png)
