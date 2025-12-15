---
title: "Cloud Native Only vs. ISV Networking Solutions"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "June 26, 2023", "Public Cloud Networking and Security Self-Paced Learning Resources", "here", "ParkMyCloud", "ACE-Prof-Mod10-Firewall-Networks", "Download", "ACE-Prof-Mod11-Site2Cloud", "ACE-Prof-Mod13-Distributed-Firewalling", "https://youtube.com/netJoints", "https://www.youtube.com/c/AviatrixSystems", "cloud-networking", "Previous\u00a0post Cloud Native Only vs. ISV Networking Solutions", "Next\u00a0post Time to Downside (On-Premise) UP (The Cloud) Your Enterprise Network"]
tags: []
original_url: https://netjoints.com/enterprise-solutions-architect-role-for-career-growth/
---

Enterprise enablement and technical pre-sales are challenging job functions in any organization. A typical instructor, engineer, or designer can never be successful in such a role. It needs constant adoption. It requires a solution architecture mindset. 

In a startup company, it is even more critical than any other role. Sometimes, you must wear multiple hats as Product Manager, Coach, Mentor, Quality Assurance Engineer, Test Engineer, Systems Engineer, etc. 

The following document is designed to guide you through preparing for an interview with Aviatrix for the role of Solutions Architect. For those new to the public cloud and public cloud networking, some lab topologies will help you learn this technology at your own pace. 

## Preparing for the Interview

### **Examples of Documents and Videos from Previous Jobs or Roles**

These can be sent directly to the interviewer, or links can be provided to the examples if publicly accessible. Examples could be demo or presentation videos, slide decks used for presentations, solution briefs, white papers, how-to articles, or blogs. 

**General Networking Interview Topics**

The following networking topics are frequently covered during the interview process. Topics not on this list but mentioned in your resume may also be covered. Knowledge of every topic is unnecessary, but an in-depth understanding of at least a few topics will be required. 

  * Core layer 2 and layer 3 networking knowledge 


  * Understanding of BGP. This is the cloud’s predominant routing protocol, so the interview will not cover OSPF and EIGRP. 
  * Understanding of IPsec encryption, including design choices. For example: policy-based versus route-based VPN 
  * On-prem DC to Cloud and On-prem Branch to Cloud connectivity options (Direct Connect, Express Route, etc.), design choices, pros, and cons 
  * Traffic flows and packet walk 
  * NGFW design and packet flow 


  * Understanding of public cloud networking 



### **For those who are new to Public Cloud Networking**

Expectations for those who have limited knowledge of or experience with the Public Cloud 

  * Take the ACE Associate Certification training covering basic Public Cloud Networking and Security concepts. Passing the certification exam is optional. 


  * [Public Cloud Networking and Security Self-Paced Learning Resources](https://community.aviatrix.com/ace-certification-forum-2/ace-associate-self-paced-learning-resources-30)


  * Complete the following two labs in order. 



**Lab1 – Multi-Cloud Networking 101**

This lab focuses on simplifying your cloud and multi-cloud networking using Aviatrix. Follow the Lab detailed [here](https://selfservice.aviatrix.com/) using the Aviatrix Self-Service Launch (SSLT) tool. 

## **Warning**

  * A cost is associated with running and deploying these labs, which is your responsibility. 
  * The instances should be shut down, or all the resources should be deleted if cost is a concern.
  * There is a destroy option provided in the SSLT to destroy the entire topology.
  * You need to unsubscribe to the Aviatrix software though manually 
  * A service like [ParkMyCloud](https://www.parkmycloud.com/) can be used to schedule the automatic shutdown of your lab



## **Lab2 – AWS Networking 101**

It is not required to focus on AWS if you have previous familiarity with another cloud. Knowing one cloud is enough for the interview. AWS is recommended because it is currently the leader in Public Cloud and hosts the most deployments. During the interview process, the focus is on Networking and Security aspects. Storage and other application layer services are not covered. 

This is a complex lab and can take a lot of time. It is not expected that you will finish the entire lab, but this should provide a lot of information about what topics are relevant and are likely to be brought up in the interview process. This may give you some ideas for what to research in preparation for your interviews. 

### **Lab2 Objectives**

  * Create 5 VPCs in an AWS Region (the diagram shows the us-west2/Oregon Region, but the VPCs can be created in any Region) 


  * Create an instance of one of the smallest types (t2.micro for example) in the Prod, Shared, and Dev VPCs 


  * Use native VPC peering to connect those VPCs 


  * Verify that these VMs can ping each other’s private IPs 


  * Deploy a Palo Alto firewall or any other firewall VM in the Transit VPC 


  * Verify access from your desktop/laptop to the Palo Alto VM using the public IP assigned to the VM 


  * Verify that the three instances deployed in step 2 can ping the Palo Alto VM’s private IP 


  * Verify that the three instances deployed in step 2 can ping any internet site using the Palo Alto Firewall 


  * Deploy an instance of one of the smallest types in the Management VPC and verify that this instance can ping any internet site using the AWS Internet Gateway (IGW) deployed inside the Management VPC



**Example Cloud Networking and Security-related Interview Questions**

The following questions assume that your preferred cloud is AWS, and the expectation is that, provided you have worked through the labs, you could answer these questions. 

  * What is the difference between a public and private subnet? 


  * How do you associate a subnet to a route table? 
  * What is an IGW? 
  * How can an EC2 instance in AWS have an elastic IP (EIP) and a private IP? How does this work? 
  * Explain the Ingress packet walk. 
  * What is the AWS Transit Gateway (TGW)? Does it belong to a VPC or is it a global resource? 


  * How could you connect 10 VPCs without using an AWS TGW? 
  * How can you add a 3rd party Firewall EC2/VM in the data path between two EC2 instances for inspection? 
  * How would you secure the Apps in a VPC? What are the options? 
  * Is encryption needed in the public cloud? If yes, how could end-to-end encryption be achieved in the cloud? What about on-prem resources? 
  * How can overlapping IPs be handled in the public cloud? What NAT options are available? 


  * And more… 



For the purposes of the interview, the expectation is that you will answer based on native cloud options, not what is possible using the Aviatrix solution. 

## **Misc. Hints about the Interview Process**

  * Most of the interviews will be based on the submitted resume. 


  * Candidates can quickly look (take a minute or so) things up during the interview to find the answer. Cramming for the interview is not expected; there is a reason why we write things down.
  * Sometimes the interviewer may confuse you. Do not feel that you cannot ask for clarification. Sometimes the best reply is to ask questions in response. 
  * The interviewer will try to simulate a real-world scenario to check your communication and confidence. 
  * It is acceptable for you to prepare a few Cloud Networking and Security topics for the interview. If you mention that you want to stay within these areas, the interviewer will try to stay mostly within that area. For example: 


  * AWS Direct Connect concepts and deployment details 


  * GCP Shared VPC concepts and routing details 
  * Azure transit concepts and deployment using a Firewall Network Virtual Appliance (NVA) 


  * The interview focuses on architectural aspects and the communication/presentation of these concepts. 
  * Routing and Security in the Cloud is an important topics. 
  * On-prem connectivity from the Cloud is another important topic. 


  * You can pick a Cloud Service Provider (CSP) to explain the networking and security features in detail. 



## Submit a YouTube Video

Submit a 30 min YouTube video explaining a technical concept as if you are teaching a new audience. Use one of the sessions to record a video. This will increase your hiring chances at Aviatrix.

[ACE-Prof-Mod10-Firewall-Networks](https://netjoints.com/wp-content/uploads/2023/06/ACE-Prof-Mod10-Firewall-Networks.pdf)[Download](https://netjoints.com/wp-content/uploads/2023/06/ACE-Prof-Mod10-Firewall-Networks.pdf)

[ACE-Prof-Mod11-Site2Cloud](https://netjoints.com/wp-content/uploads/2023/06/ACE-Prof-Mod11-Site2Cloud.pdf)[Download](https://netjoints.com/wp-content/uploads/2023/06/ACE-Prof-Mod11-Site2Cloud.pdf)

[ACE-Prof-Mod13-Distributed-Firewalling](https://netjoints.com/wp-content/uploads/2023/06/ACE-Prof-Mod13-Distributed-Firewalling.pdf)[Download](https://netjoints.com/wp-content/uploads/2023/06/ACE-Prof-Mod13-Distributed-Firewalling.pdf)

To research these topics, you can use [https://youtube.com/netJoints](https://www.youtube.com/netjoints) or [https://www.youtube.com/c/AviatrixSystems ](https://www.youtube.com/c/AviatrixSystems)
