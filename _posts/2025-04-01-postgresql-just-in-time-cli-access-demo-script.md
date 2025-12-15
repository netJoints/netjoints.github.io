---
title: "Britive Dynamic Secrets in CI/CD Pipelines – Demo Script"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "November 18, 2025", "john.smith@company.com", "Cybersecurity", "Previous\u00a0post Britive Dynamic Secrets in CI/CD Pipelines \u2013 Demo Script", "Next\u00a0post Britive Self Service Access and Permission Builder"]
tags: []
original_url: https://netjoints.com/postgresql-just-in-time-cli-access-demo-script/
---

# Setup

**Total Duration:** ~5 minutes  
**Number of Scenes:** 7  
**Target Scene Length:** 60-80 seconds each

* * *

## Scene 1: Introduction to Britive Access Broker (70 seconds)

**Visual Focus:** Britive UI – Access Broker Configuration Screen

### Script:

“Welcome to this demonstration of Britive Access Broker for secure on-premise database access.

The Britive Access Broker extends the Cloud JIT ZSP model to your on-premise resources such as data bases, windows servers and linux machines. It executes the Britive ephemeral authorization checkout and checkin routines and eliminates the need to expose your internal systems directly to the internet.

The Britive Access Broker only provide the control plane. It is not a proxy or agent, so it is not in the data path. 

Let’s navigate to the Access Broker configuration page. Here you can see our broker pools – multiple brokers can be grouped together for high availability and load balancing.

Notice the health status indicators showing all brokers are operational. The Access Broker architecture is designed for horizontal scalability – you can add more brokers to handle increased load or to support different network segments.

Each broker establishes an outbound-only connection to Britive, meaning no inbound firewall rules are required in your network.”

### Key Talking Points:

  * Access Broker acts as a secure gateway
  * No inbound connections required
  * Pooling for high availability
  * Horizontal scalability
  * Health monitoring



* * *

## Scene 2: Access Broker Architecture Overview (75 seconds)

**Visual Focus:** Architecture Diagram (slide or whiteboard)

### Script:

“Let’s examine the Access Broker architecture to understand how secure access flows work.

At the top, we have the Britive cloud platform where users request access through self-service portals or CLI tools.

In the middle layer, the Access Broker pool runs in your DMZ or management network. These brokers establish outbound HTTPS connections to Britive – no inbound firewall rules needed.

The brokers communicate with your on-premise PostgreSQL databases using standard database protocols within your secure network perimeter.

Here’s the flow: When a DB Admin checks out Britive authorization profile using the CLI or UI, Britive authorizes the request. The Britive Access Broker then executes its configuration to provide short lived credentials for the target system. Britive securely delivers them to the user through an encrypted channel.

All access is logged and audited, providing complete visibility without compromising security.”

### Key Components to Highlight:

  * User/CLI layer
  * Britive Cloud Platform
  * Access Broker Pool (DMZ/Management Network)
  * Target PostgreSQL Database
  * Outbound-only connection flow
  * Audit logging



* * *

## Scene 3: Viewing the PostgreSQL Profile (65 seconds)

**Visual Focus:** Britive UI – Profile Configuration Page

### Script:

“Now let’s look at a configured profile for PostgreSQL access.

Profiles in Britive define what access users can request and for how long. This profile is called ‘PostgreSQL-Production-ReadOnly’ and provides temporary read-only access to our production database.

Notice the key configurations: The environment is set to ‘Production-OnPrem’, which tells Britive this resource is behind our Access Broker.

The access duration is set to 4 hours maximum – after checkout, credentials automatically expire, enforcing just-in-time access principles.

We can see the associated Access Broker pool name here – this ensures requests are routed through the correct broker infrastructure.

The permissions tab shows we’re granting SELECT privileges on specific schemas. Users can discover and request this access through self-service, with approvals flowing automatically based on policy.”

### Key Configurations to Show:

  * Profile name and description
  * Environment (on-premise designation)
  * Access Broker pool assignment
  * Duration settings
  * Permission details
  * Approval workflow



* * *

## 

## Scene 4: Installing and Configuring the Britive CLI (70 seconds)

**Visual Focus:** Terminal/Command Line

### Script:

“Let’s switch to the command line interface. For this demo, I’m using the Britive CLI tool which developers and operators prefer for programmatic access.

First, let me verify the CLI is installed:

britive –version

Good, we’re running the latest version. Now I’ll configure my credentials using an API token I’ve generated from the Britive console:
    
    
    britive configure
    

The CLI prompts for my Britive tenant URL and API token. These credentials are securely stored locally. Let me verify I’m authenticated:

britive whoami

Perfect – I’m logged in as [john.smith@company.com](mailto:john.smith@company.com) with appropriate roles assigned.

Now I can see what profiles are available to me:

britive list profiles

Here’s our PostgreSQL-Production-ReadOnly profile we reviewed earlier. Time to check out access.”
    
    
    britive --version
    britive configure
    britive whoami
    britive list profiles

## Scene 5: Checking Out Database Credentials (75 seconds)

**Visual Focus:** Terminal/Command Line

### Script:

“Now I’ll request temporary access to the PostgreSQL database using the CLI.

Let me check out credentials from our profile:

britive checkout –profile-id postgresql-prod-readonly –duration 2h

The CLI sends my request to Britive, which validates my identity and checks my authorization against policies. The Access Broker then securely retrieves credentials from the target PostgreSQL system.

Notice the response – I’ve been granted a session with temporary credentials. Here are the key details:

The hostname and port of our PostgreSQL server, a dynamically generated username specific to this session, a secure temporary password, and the database name I’ll connect to.

The session expires in 2 hours as requested. This is just-in-time access in action – credentials are created when needed and automatically revoked when expired.

Let me save these credentials to environment variables for easy connection:

## Scene 6: Connecting to PostgreSQL and Running Commands (80 seconds)

**Visual Focus:** Terminal/Command Line – Database Session

### Script:

“Now let’s use our temporary credentials to connect to the PostgreSQL database.

I’ll use the standard psql client:

psql

And we’re connected! Notice the prompt shows I’m connected as the temporary user to the production database.

Let me verify my connection details:

\conninfo  
\dn

I can see the schemas I have access to. Let’s query some data from the sales schema:
    
    
    SELECT COUNT(*) FROM sales.orders WHERE order_date >= CURRENT_DATE - INTERVAL '30 days';

Great – I can see we’ve had over 5,000 orders in the last 30 days.

Let me try to view a specific table structure:

\d sales.customers

This shows the customer table definition. Remember, these are read-only credentials, so any attempt to modify data would be denied.

Let me exit the database:

\q

My work is complete.”
    
    
    psql
    \conninfo
    \dn
    SELECT COUNT(*) FROM sales.orders WHERE order_date >= CURRENT_DATE - INTERVAL '30 days';
    \d sales.customers
    SELECT customer_name, account_status FROM sales.customers LIMIT 5;
    \q

## Scene 7: Cleanup and Session Management (60 seconds)

**Visual Focus:** Terminal and Britive UI – Session Dashboard

### Script:

“Before we wrap up, let’s look at session management and cleanup.

Back in the terminal, I can view my active sessions:

Here’s my PostgreSQL session showing time remaining until automatic expiration.

If I’m finished early, I can explicitly return the credentials:

The session is immediately terminated, and the temporary credentials are revoked in the target system.

Now let’s view this from the Britive console. Switching to the Sessions dashboard, we can see all active and historical sessions across the organization.

Security teams have complete visibility – who accessed what, when, for how long, and through which Access Broker. Every database command is logged for compliance auditing.

This is the power of Britive Access Broker: secure, auditable, just-in-time access to on-premise resources without compromising your network security perimeter.

Thank you for watching this demonstration.”

### Final UI View:

  * Sessions dashboard with audit trail
  * Access logs showing database activities


