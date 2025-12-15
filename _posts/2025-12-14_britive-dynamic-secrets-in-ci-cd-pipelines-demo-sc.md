---
title: "Securing Agentic AI with Amazon Bedrock | Webinar"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 17, 2025", "Cybersecurity", "Previous\u00a0post Securing Agentic AI with Amazon Bedrock | Webinar", "Next\u00a0post PostgreSQL Just in Time CLI Access | Demo Script"]
tags: []
original_url: https://netjoints.com/britive-dynamic-secrets-in-ci-cd-pipelines-demo-script/
---

# **Introduction (0:00 – 0:30)**

“Hello everyone, and welcome to this demonstration of Britive’s dynamic credential management in CI/CD pipelines. CI/CD pipelines are the non human identities present in your enterprise. 

Today, I’ll be showing you how Britive eliminates the need for static credentials in your deployment workflows by providing just-in-time, ephemeral access to cloud resources. This approach significantly reduces your security risk by ensuring credentials are never hardcoded or stored in your pipeline configurations.

Let’s dive in.”

* * *

## **Chapter 1: Use Case Overview (0:30 – 2:00)**

### **Step 1 – Describe the Use Case**

“First, let me set the context for what we’re solving today.

In traditional CI/CD pipelines, teams often store static credentials—such as AWS access keys, tokens or service account information in their CI/CD tools. These credentials have standing lifespans, and have broad permissions to deploy or access infrastructure.

This creates serious security challenges:

  * **Increased** **Vulnerability** , theft and unauthorized access
  * **Over-privileged access** often persists beyond what’s necessary
  * **Compliance gaps** when credentials aren’t properly managed



With Britive, we replace this static model with dynamic, just-in-time credential provisioning. This is how it works:

When a CI/CD job needs to update a data store, such as AWS S3 bucket, instead of using stored credentials, the GitHub Actions requests short-lived tokens from Britive. Britive checkout a granular profile and give GitHubs Actions the precisely scoped permissions. The GitHub Actions job executes with those ephemeral credentials, and then Britive automatically checks the profile back in when the job completes.

This ensures zero standing privileges, full auditability, and time-bound access for every deployment.”

* * *

## **Chapter 2: Profile Configuration (2:00 – 3:00)**

### **Step 2 – Show the Profiles in the Britive UI**

“Now, let me show you the Britive profiles that enable this workflow.

I’m logged into the Britive console, and I’ll navigate to the Profiles section.

Here you can see the profile we’ve configured for our GitHub Actions CI/CD pipeline deployment: [**S3 Full Access**].

This profile is associated with our AWS environment and includes:

  * The specific IAM role or permissions required for GitHub to access specific S3 bucket.
  * It is time-bound access using Britive policy
  * Approval can also be added if required for production deployments



This profile is designed with the principle of least privilege—it has only the permissions necessary to execute our CI/CD GitHub Actions, nothing more.  
  
Here is the policy attached to this profile. Notice we have many constraints we can add as part of this policy. In the member area you can see that the GitHub Actions is there. Meaning it can checkout this profile to get JIT access to S3 Bucket. 

* * *

## **Chapter 3: Job Initiation (3:00 – 4:00)**

### **Step 3 – Show the Job Initiation**

“Now let’s look at how this job gets triggered.

In our case, this GitHub Actions job, that is part of the CI/CD pipeline, is triggered by changing a file. 

Here in our [**GitHub Actions**], you can see the pipeline configuration. 

Let me highlight the key section where Britive integration occurs.

Instead of referencing a stored credential or secret, you’ll see we make a Federated call to Britive to request a profile checkout. This is where the magic happens—rather than using a static AWS access key stored in our CI/CD system, we’re dynamically requesting temporary credentials from Britive at runtime.

The job passes:

  * The Britive profile identifier
  * A justification or ticket reference
  * The requesting identity



Let’s run this job and watch the process in action.”

* * *

## **Chapter 4: Job Execution (4:00 – 5:00)**

### **Step 4 – Run the Job**

“I’m now going to trigger the deployment job.

[**Screen: Click ‘Run’ or ‘Build Now’**]

The job has started. You can see it’s now in the queue and beginning execution.

[**Screen: Show job console output starting to stream**]

As the job initializes, you’ll see the standard setup steps—checking out code from our repository, initializing the environment, and preparing the Terraform workspace.

Now watch for the Britive integration step…

[**Wait for the relevant log output**]

And there it is. The job is now contacting Britive to request temporary credentials for the profile we configured earlier. This happens in real-time, with no pre-stored secrets involved.

While this executes, let’s switch over to the Britive console to see what’s happening on the backend.”

* * *

## **Chapter 5: Checked Out Profile (5:00 – 6:00)**

### **Step 5 – Show the Checked Out Profile in Britive**

“Let me switch to the Britive UI.

[**Screen: Navigate to Britive > Sessions or Active Checkouts**]

Here in the Britive console, you can see the active session that was just created.

[**Screen: Highlight the active checkout**]

Notice the following details:

  * **User/Service Identity** : This shows which service account or identity checked out the profile
  * **Profile Name** : The specific profile being used
  * **Checkout Time** : When the credentials were issued
  * **Expiration Time** : When these credentials will automatically expire
  * **Justification** : The ticket or reason associated with this access



This gives us complete visibility into who has access to what, when, and why—critical for compliance and security auditing.

The temporary credentials are now being used by our Terraform job. Let’s go back to the pipeline to see the deployment in progress.”

* * *

## **Chapter 6: Credential Usage in Job (6:00 – 7:00)**

### **Step 6 – Show the Stage Where Britive Was Contacted for Credentials**

“Back in our CI/CD pipeline, let me show you the specific stage where Britive credentials were requested and used.

[**Screen: Return to CI/CD tool console output**]

I’ll expand the logs for the Terraform execution stage.

[**Screen: Show relevant log section**]

Here you can see:

  1. The initial API call to Britive
  2. The successful credential retrieval—notice that the actual secrets are never logged, only confirmation of successful authentication
  3. The Terraform initialization using those dynamic credentials
  4. The Terraform plan and apply stages executing with proper AWS authentication



[**Scroll through logs**]

The beauty of this approach is that at no point are static credentials exposed in logs, environment variables, or configuration files. Everything is ephemeral and sourced just-in-time from Britive.

The deployment is now completing… and as it finishes, Britive will automatically revoke the credentials.”

* * *

## **Chapter 7: Profile Check-In (7:00 – 8:00)**

### **Step 7 – Show That the Profile Has Been Checked Back In**

“Now let’s confirm that the credentials have been properly revoked.

[**Screen: Return to Britive UI**]

I’m refreshing the active sessions view in Britive.

[**Screen: Show sessions/audit page**]

Notice that the profile checkout we saw earlier is no longer active. The credentials have been automatically checked back in and revoked.

[**Screen: Navigate to Audit Logs if available**]

If we look at the audit trail, you can see the complete lifecycle:

  * Checkout requested at [**time**]
  * Credentials issued
  * Credentials used for [**duration**]
  * Profile checked back in at [**time**]



This automatic check-in ensures that credentials exist only for the duration of the job. There’s no risk of credential reuse or unauthorized access after the deployment completes.

[**Screen: Return to CI/CD tool**]

And back in our pipeline, we can confirm the job completed successfully with infrastructure deployed as intended.”

* * *

## **Conclusion (8:00 – 9:00)**

“Let’s recap what we’ve demonstrated today.

We showed how Britive enables secure CI/CD pipelines by:

  1. **Eliminating static credentials** – No more long-lived secrets stored in your CI/CD tools
  2. **Providing just-in-time access** – Credentials are dynamically generated only when needed
  3. **Enforcing least privilege** – Profiles are scoped to specific permissions required for each task
  4. **Maintaining complete auditability** – Every access request, usage, and revocation is logged
  5. **Automating credential lifecycle** – Check-in happens automatically, reducing risk of credential sprawl



This approach significantly strengthens your security posture while maintaining the speed and automation that DevOps teams require.

The result? Faster deployments, reduced risk, and simplified compliance—all without slowing down your teams.

Thank you for watching. If you’d like to learn more about implementing Britive in your CI/CD pipelines, please visit our documentation at [**URL**] or contact us at [**contact info**].

See you in the next video.”
