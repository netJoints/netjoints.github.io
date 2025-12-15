---
title: "AWS RDS for Oracle DB Engine"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 25, 2025", "Cybersecurity", "Previous\u00a0post AWS RDS for Oracle DB Engine", "Next\u00a0post Sumo Logic\u00a0Inbound HTTPS Webhook Configuration"]
tags: []
original_url: https://netjoints.com/guacamole-url-explained/#respond
---

An Apache Guacamole RDP connection looks like following. This is also called **Guacamole remote desktop session launch payload**. It is used in a web-based remote access system. 
    
    
    {"url":"first-recording-alb-143338494.us-west-2.elb.amazonaws.com:8443/guacamole","token":"bqIjbPhOic%2bq6UQTH7BHwro0pgg6jO8x7ProNMl1ooBZInow1RfzeFJivwqn5ujwlEkF7zSh2FcDLX3o%2fXHs9aHpBF1Zl2iKXfiwVu44zeTGjMnnoOJxMyeq6YLoJ7JynrPFJwIN0O6uUBjdu176GIW8NO1RLA8LIv508nkrjPXk%2f3eU4q5S5MPypCDT26saWCJFFx3TuZeIzJxg6%2bvUVNe5QsVgJ6YmkFWl3WK%2ftG%2bW0LvbQqS4rR66bKYjWl9sNh5xWbLg8WX9j49V%2fbEMDTnJ3tZtcZnu%2fqwhQ52p2RytU2MH8nk%2fEUWseqD0CKUAXejAz9Yo6VV1L2MNqCfv3h7aDwGSZI%2bttnQRi1KoQiP8Nq4mw39zuDqZBxfXKl2Ip7OdCTb95YZPV4k1RIdzxKHq94DdsCNUcHD97hPHSG8nkZtwuj8x6%2fD%2fkOUy7sULlcrZRbkdqUfvQggp8KjmuTC87xRoa70CcyM0nKPMCtHSwLHfOdBksW%2fOM1GWVUpfa8FE0bOd22YKKxfwcmWjP544D5wABCvt8HpqzYN5KanaC1mIRONLfP4Yqb3WIsso%2fE08mhKw16wO5PNAQkFbyJTTivTdNhvyf34G%2bfKYqiAgerz0XkxPFFXFIl%2bbBv2a","json":"{\"username\":\"shahzad.ali-rec-1756137704000\",\"connections\":{\"ExampleWindowsRdpRecording\":{\"protocol\":\"rdp\",\"parameters\":{\"security\":\"nla\",\"username\":\"shahzad.ali-rec\",\"recording-name\":\"${GUAC_DATE}-${GUAC_TIME}-shahzad.ali@mailinator.com-shahzad.ali-rec-ExampleWindowsRdpRecording\",\"ignore-cert\":\"true\",\"port\":\"3389\",\"recording-path\":\"/home/guacd/recordings\",\"hostname\":\"10.0.1.190\",\"password\":\"<password>"}}},\"expires\":1756137704000}"}

Here’s a breakdown of its components:

1\. **URL**

“url”: “first-recording-alb-143338494.us-west-2.elb.amazonaws.com:8443/guacamole”

2\. **Token**

“token”: “bqIjbPhOic%2bq6UQTH7BHwro0pgg6jO8x7ProNMl1ooBZInow1RfzeFJivwqn5ujwl…”

  * A long, URL-encoded token used for authentication or session validation.
  * It likely contains encrypted or signed data to validate the user and session.



3\. **JSON Configuration**
    
    
    {
      "username": "shahzad.ali-rec-1756137704000",
      "connections": {
        "ExampleWindowsRdpRecording": {
          "protocol": "rdp",
          "parameters": {
            "security": "nla",
            "username": "shahzad.ali-rec",
            "recording-name": "${GUAC_DATE}-${GUAC_TIME}-shahzad.ali@mailinator.com-shahzad.ali-rec-ExampleWindowsRdpRecording",
            "ignore-cert": "true",
            "port": "3389",
            "recording-path": "/home/guacd/recordings",
            "hostname": "10.0.1.190",
            "password": "password"
          }
        }
      },
      "expires": 1756137704000
    }
    
    

  * **username** : A unique session identifier with a timestamp.
  * **connections** : Defines an RDP connection named `ExampleWindowsRdpRecording`.
  * **recording-name** : Uses dynamic variables to name the session recording.
  * **hostname** : Internal IP of the Windows machine being accessed.
  * **recording-path** : Where session recordings are stored.
  * **expires** : Epoch timestamp indicating when the token/session expires.



## Summary

This payload is used to:

  * Launch a remote desktop session to a Windows machine (`10.0.1.190`) via RDP.
  * Authenticate the user (`shahzad.ali-rec`) using a token.
  * Record the session for auditing or playback.
  * Automatically expire the session after a certain time.


