---
title: "Multicloud Network Architecture (MCNA) and Designs"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 3, 2023", "https://cal.sap.com/catalog#/applianceTemplates", "https://blogs.sap.com/?p=727457", "https://blogs.sap.com/2019/04/23/sap-s4hana-fully-activated-appliance-demo-guides/", "https://blogs.sap.com/2018/12/12/sap-s4hana-fully-activated-appliance-create-your-sap-s4hana-1809-system-in-a-fraction-of-the-usual-setup-time/", "cloud-networking", "Previous\u00a0post Multicloud Network Architecture (MCNA) and Designs", "Next\u00a0post Cloud Network SD-Edge Design Patterns"]
tags: []
original_url: https://netjoints.com/sap-s4-hana-installation-for-lab-and-development-work/#respond
---

Log in to the following SAP website

<https://cal.sap.com/catalog#/applianceTemplates>

Logon using SAP Universal-ID

After you login, you will see additional options in the left hand navigation bar

**TIP:** Sometimes the login does not work, so what you should do is to log in to SAP PartnerEdge or Universal ID website and then click the Login button on the SAP Appliance website

Click on the create appliance option

After this, you will see a screen to deploy the SAP S4/HANA. I will deploy it in GCP, but the process is same and simple for AWS and Azure as well.

For GCP, you need to create a GCP Project, and GCP VPC. Then download the GCP Project jason file so that SAP portal can connect to GCP and create the necessary SAP S4/HANA VMs. 

After you click create, the deployment will begin. It will take at least 90 min to build it all.

Following is created as part of the SAP automation

So basically following VMs are required for S4/HANA setup

  * HANA DB layer – SAP S4/HANA
  * HANA Application layer – SAP Netweaver
  * SAP BusinessObjects Platform
  * Jumpbox – Windows RDP



## **First time login into RDP**

Following is what you see

## **What’s in your appliance?**

This trial edition is provided as virtual appliance by the SAP Cloud Appliance Library and consists of four instances, which can be deployed on a cloud-computing platform

  * The frontend instance on Microsoft Windows Server 2016, as described above, including the following pre-installed components: 
    * Google Chrome as the pre-installed default browser
    * SAP Logon / SAP GUI / SAP Business Client with preconfigured connections to the SAP S/4HANA system
    * An automated script to install Eclipse and the respective add-ons for the SAP HANA Studio & ABAP development tools with preconfigured connections to the SAP HANA database
    * SAP Lumira Discovery
    * SAP Lumira Designer
  * A backend instance on Linux with 
    * SAP S/4HANA 2021 FPS02
    * SAP HANA 2.0
  * A backend instance on Linux with 
    * SAP NetWeaver 7.50 application server JAVA with Adobe Document Services installed (for output management in SAP S/4HANA)
  * A backend instance on Linux with 
    * SAP BusinessObjects BI Platform 4.3 installed (optional)



## **SAP Cloud Connector**

First login you will see following screen

## **Web Dispatcher UI Login**

First time login will show following

## **Eval System Login Users**

This system has many users created as part of the automation

## **More Information, Sample Scenarios and Support**

Please check out these sources for further information

General documentation and FAQs for the SAP Cloud Appliance Library

The Getting Started Guide that is linked from your personal system instance in the SAP CAL console (https://cal.sap.com -> Workloads -> Appliances)

<https://blogs.sap.com/?p=727457>

<https://blogs.sap.com/2019/04/23/sap-s4hana-fully-activated-appliance-demo-guides/>

<https://blogs.sap.com/2018/12/12/sap-s4hana-fully-activated-appliance-create-your-sap-s4hana-1809-system-in-a-fraction-of-the-usual-setup-time/>
