---
title: "Britive Aurora MySql Demo"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 27, 2025", "https://docs.britive.com/docs/okta-sso", "https://dev-31162391.okta.com/app/exkmz7z8nxz0pAtSl5d7/sso/saml/metadata", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Britive Aurora MySql Demo", "Next\u00a0post Britive AWS Application Onboarding Experience"]
tags: ["Shahzad Ali", "January 27, 2025", "https://docs.britive.com/docs/okta-sso", "https://dev-31162391.okta.com/app/exkmz7z8nxz0pAtSl5d7/sso/saml/metadata", "Cybersecurity", "IAM", "Privileged Access Management", "britive", "Previous\u00a0post Britive Aurora MySql Demo", "Next\u00a0post Britive AWS Application Onboarding Experience"]
original_url: https://netjoints.com/britive-okta-application-onboarding-experience/#respond
---

My Okta application is now onboarded in Britive. Following shows a screen shot of it

![](../../media/images/britive-okta-application-onboarding-experience_image-16.png)

Britive –> OKTA App –> Britive Okta Profile

There are many privilege account setup in Okta. These accounts are automatically scanned by Britive and made available as profile. Following is the list of default Okta privilege accounts. 

Following is the Britive screen shows the result after the scanning was done by Britive to fetch Okta default privilege accounts. 

![](../../media/images/britive-okta-application-onboarding-experience_image-15.png)

Simply click the plus (+) sign in front of of permission or role and map it to Britive Profile. 

### Policy Under Britive Profile

Click add policy. 

![](../../media/images/britive-okta-application-onboarding-experience_image-17-1024x396.png)

Following shows different policies that one can define

![](../../media/images/britive-okta-application-onboarding-experience_image-18.png) ![](../../media/images/britive-okta-application-onboarding-experience_image-19.png)

![](../../media/images/britive-okta-application-onboarding-experience_image-20.png)

![](../../media/images/britive-okta-application-onboarding-experience_image-21.png) ![](../../media/images/britive-okta-application-onboarding-experience_image-22.png) ![](../../media/images/britive-okta-application-onboarding-experience_image-23-1024x842.png)

#### JASON is also supported to define the policy
    
    
    {  
     "id": "997cf50e-db0f-4a03-957f-82587e09278d",  
     "name": "Okta Super Admin",  
     "description": "No Approval Required for Shahzad",  
     "isActive": true,  
     "isDraft": false,  
     "isReadOnly": false,  
     "condition": "",  
     "members": {  
       "users": [  
       {  
        "id": "qjjliwwlbkg7p3x7v8f7",  
        "name": "shahzad.ali@britive.com"  
       }  
      ]  
     },  
    "consumer": "papservice",  
    "accessType": "Allow",  
    "isConditionTypeJSON": false  
    }  
    

![](../../media/images/britive-okta-application-onboarding-experience_image-24-1024x509.png)

This completes the profile setup

![](../../media/images/britive-okta-application-onboarding-experience_image-25.png)

## Integrating Okta for SSO

<https://docs.britive.com/docs/okta-sso>

![](../../media/images/britive-okta-application-onboarding-experience_image-26.png) ![](../../media/images/britive-okta-application-onboarding-experience_image-27.png)

![](../../media/images/britive-okta-application-onboarding-experience_image-28.png)

Login to Okta ad administrator. You should use the Okta app in Britive to get access to Okta. We want Okat to become the SSO Identity Provider basically. 

On Okta click on application –> Browser App Catalog and then search for Britive. 

![](../../media/images/britive-okta-application-onboarding-experience_image-29.png)

Click done and then go back to Britive app in Okta again. The screen will be different now. Follow the directions here to configure OKTA side SSO configuration by providing Britive details. 

### Okta Setting 

Click “Create App Integration” 

![](../../media/images/britive-okta-application-onboarding-experience_image-29.png)

Use the following setting to setup this app

![](../../media/images/britive-okta-application-onboarding-experience_image-33.png)

![](blob:https://netjoints.com/6773ff25-fb7b-4265-924c-39c400b0be53)

Now copy the metal data URL and download the Okta side XML configuration. <https://dev-31162391.okta.com/app/exkmz7z8nxz0pAtSl5d7/sso/saml/metadata>

Now upload it in the Britive UI as follows

![](../../media/images/britive-okta-application-onboarding-experience_image-34.png)
