---
title: "SAP S4/HANA Popular Integrations"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 3, 2023", "https://catalog.us-east-1.prod.workshops.aws/workshops/c46438cd-aaad-4060-943a-68160bafceff/en-US/lab2/lab2-2", "https://blogs.sap.com/2016/08/05/high-availability-explained/", "https://docs.aws.amazon.com/sap/latest/sap-hana/sap-oip-architecture.html", "https://github.com/ClusterLabs/resource-agents/blob/main/heartbeat/aws-vpc-move-ip", "https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-highavailability/blob/main/sapclustermon.yaml", "https://blogs.sap.com/2019/05/21/stonith-you-maintain-my-integrity-at-all-time.-yours-server/", "http://www.scalingbits.com/aws/ipfailover/overlay", "https://docs.aws.amazon.com/sap/latest/sap-hana/sap-hana-on-aws-ha-configuration.html", "SAP-S4HANA-Overlay-IP-AWSDownload", "cloud-networking", "Previous\u00a0post SAP S4/HANA Popular Integrations", "Next\u00a0post SAP S4/HANA Jargon for Network Engineers"]
tags: []
original_url: https://netjoints.com/sap-s4-hana-aws-high-availability-challenges-with-aws-overlay-ip-limitations/
---

## **Challenges**

  * AWS Overlay IP Address is a manual effort for SAP S4/HANA deployments 
    * <https://catalog.us-east-1.prod.workshops.aws/workshops/c46438cd-aaad-4060-943a-68160bafceff/en-US/lab2/lab2-2>
  * SAP does not respect DNS TTL values 
    * <https://blogs.sap.com/2016/08/05/high-availability-explained/>



<https://docs.aws.amazon.com/sap/latest/sap-hana/sap-oip-architecture.html>

## **SAP AWS Overlay IP Address Concept – Normal State**

## **SAP AWS Overlay IP Address Concept – Failover Scenario**

How this works in a failover scenario, who is going to update the routing table to point to the secondary HANA server

  * Moving of Overlay IP address to the active node is achieved using RHEL/SLES cluster configuration.
  * RHEL and SUSE have different steps to achieve this configuration.
  * When the cluster detects that the primary node is down or a relevant service is down cluster moves the overlay IP address to the secondary node and registers it as primary (basically updating the AWS route table with secondary instance ENI) 
  * Hence the cluster nodes require permission (IAM profile attached to EC2 instance) to change the route tables to make this happen.



### **Script aka SAP Resource Agent “aws-vpc-move-ip”**

This script runs inside the HANA DB and after the failure, it 

  * Provides floating IP (aka Overlay IP) addresses for EC2 instances in a VPCs among different AZs (Availability Zone)
  * Locally adds & removes the “floating IP address.”
  * Changes routing table entry to route traffic to the correct destination instance using EC2 API commands



## **SUSE Pacemaker**

  * SUSE Pacemaker uses “aws-vpc-move-ip” to start the IP movement from one instance to the other. 
    * [_https://github.com/ClusterLabs/resource-agents/blob/main/heartbeat/aws-vpc-move-ip_](https://github.com/ClusterLabs/resource-agents/blob/main/heartbeat/aws-vpc-move-ip)
    * [_https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-highavailability/blob/main/sapclustermon.yaml_](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-highavailability/blob/main/sapclustermon.yaml)
  * AWS EC2 STONITH agents use AWS resource tags to identify the EC2 instances. 
    * _STONITH_ (Shoot the Other Node in The Head)
    * <https://blogs.sap.com/2019/05/21/stonith-you-maintain-my-integrity-at-all-time.-yours-server/>
    * <http://www.scalingbits.com/aws/ipfailover/overlay> <https://docs.aws.amazon.com/sap/latest/sap-hana/sap-hana-on-aws-ha-configuration.html>



## **SAP AWS Overlay IP Address Routing without Aviatrix**

  * Two native methods to solve this 
    * Using AWS Application LB (ALB) à Extremely difficult, manual, and error-prone
    * Using AWS-TGW: Better than AWS-LB method. Recommended by AWS. Still manual and error-prone
  * As the Overlay IP address exists outside the CIDR range of the VPC, it is not routable from network resources outside of the VPC, such as servers in other VPCs or from on-premises environments.


  * As new VPCs are added, one must manually update its route tables. Create a static entry for overlay IP and points it to AWS-TGW
  * Overlay IP address cannot be part of SAP VPC CIDR range



## **SAP AWS Overlay IP Address Routing without Aviatrix – Step by Step**

  * Manually create and configure HANA-TGW.
  * Manually attach HANA-DB-VPC and SAP-App-VPC to HANA-TGW.
  * Manually Create a static route for overlay IP (example:192.168.1.99/32) in HANA-TGW.
  * Manually create static routes in the following VPC subnets so they can communicate with each other through the HANA-TGW.


  * HANA DB instance in HANA-DB-VPC 
    * To allow traffic from the _HANA-DB-VPC_ to the _HANA-App-VPC_ , click **Add route** and enter Destination as **172.16.0.0/20,** then choose the Target as Transit Gateway. Choose HANA-TGW
  * SAP Application instance in SAP-App-VPC 
    * To allow traffic from the _HANA-App-VPC_ to the _HANA-DB-VPC_ , click Add route and enter Destination as 10.0.0.0/16, then choose Target as Transit Gateway. Choose HANA-TGW
    * To allow traffic to route from the _HANA-App-VPC_ to the _Overlay IP_ , click Add route again, enter Destination as **192.168.1.99/32** , then choose Target as Transit Gateway. Choose HANA-TGW
  * Adjust security groups such that only the HANA-App-VPC subnet has access to HANA-DB instances



<https://catalog.us-east-1.prod.workshops.aws/workshops/c46438cd-aaad-4060-943a-68160bafceff/en-US/lab2/lab2-2>

## **SAP AWS Overlay IP Address Routing with Aviatrix**

## **Recap: Overlay IP address within AWS VPC**

### **Challenge**

  * Move IP address (Overlay IP) between two EC2 instances in a VPC among different AZ’s
  * Undesired or Non-Possible Options
  * Standard Pacemaker cluster IP failover mechanism not possible because EC2 instances/cluster nodes are not in the same Layer-2 LAN segment)
  * EC2 standard IP failover (EC2 Elastic IP) not available in VPCs
  * DDNS updates might not work with all SAP frontends (SAP GUI, HANA Studio, etc.)



### **Solution**

  * Aviatrix automatically creates the route table with /32 route to point towards the overlay IP in the HANA-VPC.
  * In case of failure, the SUSE/RHLE uses AWS API to change routing table entries of a virtual router in the HANA-VPC
  * SUSE/RHLE developed a resource agent called aws-vpc-move-ip, that uses that mechanism to fail over IP’s



[SAP-S4HANA-Overlay-IP-AWSDownload](https://netjoints.com/wp-content/uploads/2022/12/SAP-S4HANA-Overlay-IP-AWS.pptx)
