---
title: "Britive Access Broker Getting Started Guide"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "March 20, 2025", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Britive Access Broker Getting Started Guide", "Next\u00a0post Kubernetes Access Security and IAM"]
tags: ["Shahzad Ali", "March 20, 2025", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Britive Access Broker Getting Started Guide", "Next\u00a0post Kubernetes Access Security and IAM"]
original_url: https://netjoints.com/britive-datadog-siem-integration-steps/
---

To get Britive to deliver audit logs to DataDog via a webhook, we must use the Custom Log Intake Endpoint on DataDog. Once configured, Britive will stream Audit logs to the DataDog webhook endpoint. Britive also allows filters to be created when forwarding such audit events, allowing customers to send different events to different end-point if required.

Once a DataDog intake endpoint is provisioned, an URL can be configured in Britive. An example CURL command to test this is below:
    
    
    curl -X POST -H 'Content-Type: application/json' -d '{"test":"test"}' https://http-intake.logs.us5.datadoghq.com/api/v2/logs?dd-api-key=<apikey>&ddsource=demo&service=britive  
    

> Note: You may need to change the `us5` part based on your DataDog deployment, as well as provide an API Key for your environment. The ddsource and service parameters are fully configurable. Enter whatever values apply in your environment. Once CURL is working you can take the URL and create a notification medium in Britive.
