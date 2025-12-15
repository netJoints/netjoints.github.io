---
title: "Understanding IAM Conditions in Google Kubernetes Engine (GKE)"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "September 16, 2025", "remote.mt1-uw2.ea2.aws.britive-app.com", "remote.mt1-ue1.ea2.aws.britive-app.com", "mt1-ue1-ea2-resource-permission-data-bucket.s3.us-east-1.amazonaws.com", "mt1-uw2-ea2-resource-permission-data-bucket.s3.us-west-2.amazonaws.com", "Cybersecurity", "britive", "Previous\u00a0post Understanding IAM Conditions in Google Kubernetes Engine (GKE)", "Next\u00a0post Guacamole Deployment Models"]
tags: ["Shahzad Ali", "September 16, 2025", "remote.mt1-uw2.ea2.aws.britive-app.com", "remote.mt1-ue1.ea2.aws.britive-app.com", "mt1-ue1-ea2-resource-permission-data-bucket.s3.us-east-1.amazonaws.com", "mt1-uw2-ea2-resource-permission-data-bucket.s3.us-west-2.amazonaws.com", "Cybersecurity", "britive", "Previous\u00a0post Understanding IAM Conditions in Google Kubernetes Engine (GKE)", "Next\u00a0post Guacamole Deployment Models"]
original_url: https://netjoints.com/a-pam-session-recording-architecture/#respond
---

## Challenges with the Legacy PAM Recording Options

Legacy session recording solutions are cumbersome and expensive. Organizations accumulate recordings, but few have the time to review them. These recordings are stored on vendor hard drives or storage locations, raising GDPR and data locality concerns. 

Customers lack control over these recordings. Often, customers are not allowed to download or save recordings to their own storage, whether in the cloud or on-premises.

# Modern PAM Session Recording Approach 

Britive’s session recording implementation through Apache Guacamole utilizes a modern stateless architecture. It grants customers full control over their recordings while being cost-effective. The recorded sessions operate without a persistent server state, which facilitates horizontal scaling and minimizes the attack surface. 

Recording policies allow for selective session recording. For instance enabling the recording of admin sessions while excluding developer sessions. This enhances operational flexibility and reduces unnecessary data retention. 

To reduce cost, meet compliance and data sovereignty requirements, Britive allows customers to define their own storage locations. This ensures data remains within chosen jurisdictions and aligns with governance policies.

The modular architecture ensures secure, adaptable, and compliant session recording that meets specific enterprise access control and audit requirements.

# Architectural Details

The Britive session recording architecture and communication flow consists of two parts: 

  1. The control plane and 
  2. The data plane.



### Control Plane (Britive SaaS + Britive Access Broker + Target Machine)

Following is the control plane communication from an RDP example. Same flow is applicable to the SSH session.

  * A user performs a profile checkout to RDP into a Windows host via the Britive UI.
  * The Britive Access Broker runs a PowerShell script on the target Windows host.
  * The Britive Access Broker PowerShell script does not actively communicate with the Guacamole server over the network or via an API. 



The PowerShell script:

  * Creates or resets a local admin account.
  * Generates a secure password.
  * Prepares a Guacamole-compatible JSON with RDP connection details.
  * Signs and encrypts the JSON to produce a secure token.
  * Returns a Guacamole access URL embedded with the token to Britive UI

![](../../media/images/a-pam-session-recording-architecture_image-17.png)

## Data Plane (User + Guacamole + Target Machine)

Following is the data plane communication from an RDP example. Same flow is applicable to the SSH session.

  * The user clicks the URL in Britive UI, which opens a new browser tab.
  * The tab connects to the Guacamole server, which uses the token to: 
    * Decrypt the session details.
    * Establish an RDP session to the target Windows host using the temporary credentials.
  * The user is now inside the RDP session via the browser, with no need for local RDP/SSH clients.
  * Guacamole records the session capturing keystrokes, mouse movements, screen activity, and optionally clipboard.
  * Recordings are stored either locally on the Guacamole server (/home/guacd/recordings), or in a customer-defined storage location (e.g., S3, NAS, etc.) based on compliance needs.

![](../../media/images/a-pam-session-recording-architecture_image-16.png)

So, in essence, the Britive Access Broker script only prepares the encrypted message for Guacamole. Guacamole only reads it when the user clicks the URL in the Britive Access Broker UI.

# Communication Channels

Britive’s recording architecture consists of two components that utilize standard protocols. This approach sharply contrasts with legacy vendors, which require multiple VMs, servers, complex firewall rules, routing requirements, and proprietary protocols.

1- Britive Access Broker

2- Apache Guacamole Server

## **1- Britive Access Broker**

Britive offers a clean, lightweight process. The access broker operates solely from the control plane, facilitating connections without being part of the data plane. Once the system provides an encrypted session to the end user, they connect directly to the destination system.

The Britive Access Broker requires only an outbound connection to the Britive tenant. This method enhances security compared to legacy solutions that necessitate inbound/outbound connections on multiple ports, reliance on vendor-hosted proxies or recording servers. With Britive, organizations maintain full control, simplifying compliance and audits.

To enable communication between the Britive Access Broker and the Britive SaaS platform, you need to allow:

Protocol: HTTPS  
Port: TCP 443  
Direction: Outbound (Egress)  
Destination:****`Following four destinations`

o [remote.mt1-uw2.ea2.aws.britive-app.com](http://remote.mt1-uw2.ea2.aws.britive-app.com/)

o [remote.mt1-ue1.ea2.aws.britive-app.com](https://remote.mt1-ue1.ea2.aws.britive-app.com/)

o [mt1-ue1-ea2-resource-permission-data-bucket.s3.us-east-1.amazonaws.com](https://mt1-ue1-ea2-resource-permission-data-bucket.s3.us-east-1.amazonaws.com/)

o [mt1-uw2-ea2-resource-permission-data-bucket.s3.us-west-2.amazonaws.com](http://mt1-uw2-ea2-resource-permission-data-bucket.s3.us-west-2.amazonaws.com/)

This is the only required port. The broker connects to the Britive platform using HTTPS and MQTT over TLS, but all of it is encapsulated in outbound HTTPS traffic. No inbound ports need to be opened.

## **2- Apache Guacamole**

Apache Guacamole is a clientless remote desktop gateway. The ports you need to open depend on the protocols and services you’re using:

**End User Accessible**

  * TCP 8080 (default): For accessing the Guacamole web interface. 
    * It’s recommended to place Guacamole behind a reverse proxy to handle SSL termination.



**Backend Guacamole Services**

  * TCP 4822 (default): For communication between the Guacamole web application and the guacd proxy daemon.



**Typical Remote Server Protocols**

  * TCP 3389: RDP (Remote Desktop Protocol)
  * TCP 22: SSH (Secure Shell)



# Summary

Britive’s session recording uses Apache Guacamole with a stateless architecture that separates control and data planes for enhanced security and scalability. The system supports selective recording policies and flexible storage options to meet compliance requirements.

The Britive Access Broker creates encrypted tokens containing connection details, which Guacamole decrypts to establish browser-based RDP/SSH sessions. All session activity including keystrokes, mouse movements, and screen activity is recorded without requiring local clients.

The Britive Access Broker only needs outbound HTTPS connectivity. Guacamole requires standard ports and protocols. This modular approach delivers secure, scalable session recording tailored to enterprise access control and audit needs.
