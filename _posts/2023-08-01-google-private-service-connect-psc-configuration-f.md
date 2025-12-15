---
title: "Cloud Sandbox Starter – Advance Mode"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 3, 2023", "Creating DNS records using default DNS names", "Private Google Access enabled", "https://storage.googleapis.com/shahzad-psc-bucket/gcp-psc-test-shahzad.html", "https://pscapi-storage.p.googleapis.com/shahzad-psc-bucket/gcp-psc-test-shahzad.html", "https://cloud.google.com/vpc/docs/configure-private-service-connect-apis", "cloud-networking", "gcp", "Previous\u00a0post Cloud Sandbox Starter \u2013 Advance Mode", "Next\u00a0post GCP Networking Pricing and Quota Limits"]
tags: ["Shahzad Ali", "January 3, 2023", "Creating DNS records using default DNS names", "Private Google Access enabled", "https://storage.googleapis.com/shahzad-psc-bucket/gcp-psc-test-shahzad.html", "https://pscapi-storage.p.googleapis.com/shahzad-psc-bucket/gcp-psc-test-shahzad.html", "https://cloud.google.com/vpc/docs/configure-private-service-connect-apis", "cloud-networking", "gcp", "Previous\u00a0post Cloud Sandbox Starter \u2013 Advance Mode", "Next\u00a0post GCP Networking Pricing and Quota Limits"]
original_url: https://netjoints.com/google-private-service-connect-psc-configuration-for-google-apis/#respond
---

## **Introduction**

Enterprises are demanding to connect to various public cloud services without using the public IP address. They are asking to provide connectivity using the private IP for the following services

  * Services published by CSP on public URL 
    * GCP calls it Target: All Google APIs
  * Services/Apps published by enterprises themselves 
    * GCP calls it Target: Published Service



Every CSP has its offering to cater to this need. Azure Private Link is an example. Google PSC is similar to Azure Private link conceptually speaking. 

### **Provider and Consumer**

**Provider:** Google Storage APIs

**Consumer:** Spoke1 VPC

### **DNS Private Zone**

  * When you create a Private Service Connect (PSC) endpoint, DNS records are automatically created for commonly used APIs (for Storage, Compute etc.) and services that are available using Private Service Connect.
  * If you want to use a service, but a DNS record for that service isn’t present in the p.googleapis.com zone, follow the instructions in [Creating DNS records using default DNS names](https://cloud.google.com/vpc/docs/configure-private-service-connect-apis#configure-dns-default) to add DNS records for those services.



In our example, we will be using Storage API to connect to the Google Cloud Storage bucket using the private RFC1918 IP address (192.168.3.1)

  * The automatically-created DNS records point to your PSC endpoint IP address (192.168.3.1), and are in this format: SERVICE_NAME-ENDPOINT.p.googleapis.com. 
  * For example, if your endpoint name is xyz, DNS records are created for 
    * Storage API: storage-xyz.p.googleapis.com
    * Compute API: compute-xyz.p.googleapis.com, and other supported APIs.



You do not see those DNS records created in your DNS Private Zone, but they are there in the background for you to consume.

## **PSC Limitations**

  * Private Service Connect endpoints are not accessible from peered VPC networks.



# **Deployment Details**

Now let’s take a look at the step by step deployment details

## **Step1: Create a dedicated subnet for PSC**

Virtual machine (VM) instances without an external IP address assigned must use a subnet with [Private Google Access enabled](https://cloud.google.com/vpc/docs/configure-private-service-connect-apis#enable-private-google-access) to access Google APIs and services using a Private Service Connect endpoint. 

If the VM has more than one interface, connect the interface that is configured with a default route (usually nic0). In our example, we will use a test VM with only one interface. 

We did not specify this subnet anywhere else during our configuration but it seems like this is used behind the scene to connect Consumer (10.20.111.0/24) to Provider (192.168.3.1)

## **Step2: Create PSC Endpoint**

You should create a static PSC IP address. In our example, it is 192.168.3.1. It was populated in the above screen after creation. 

It will show up as the following screen

Also notice that the above step will automatically create a DNS record to connect to the PSC as shown below.

The Service Directory is also created automatically using the namespace defined at the time of creation. The following screenshot shows the “Service Directory” details.

## **Testing PSC Configuration**

We will be using a VM without public IP address for this testing. The public URL to access the storage is bucket is following

<https://storage.googleapis.com/shahzad-psc-bucket/gcp-psc-test-shahzad.html>

For this test, we will modify the URL so that we can hit the private IP address to access the storage service 

<https://pscapi-storage.p.googleapis.com/shahzad-psc-bucket/gcp-psc-test-shahzad.html>

Notice pscapi is the end-point name I assigned to this service

**shahzad_aviatrix_com@shahzad-spoke1-uscentral1-psc-test-vm** :**~** $ curl https://storage-pscapi.p.googleapis.com/shahzad-psc-bucket/gcp-psc-test-shahzad.html

<html>

<head>

</head>

<body>

<p>This is Shahzad Private Service Connect Service Test</p>

<p>I am using GCP Cloud Storage to test this functionality</p>

</body>

</html>

**shahzad_aviatrix_com@shahzad-spoke1-uscentral1-psc-test-vm** :**~** $

nslookup also returns the private IP address of the service.

shahzad_aviatrix_com@shahzad-spoke1-uscentral1-test-vm1:~$ nslookup storage-pscapi.p.googleapis.com

Server: 169.254.169.254

Address: 169.254.169.254#53

Non-authoritative answer:

Name: storage-pscapi.p.googleapis.com

Address: 192.168.3.1

shahzad_aviatrix_com@shahzad-spoke1-uscentral1-test-vm1:~$

## **Reference**

<https://cloud.google.com/vpc/docs/configure-private-service-connect-apis>
