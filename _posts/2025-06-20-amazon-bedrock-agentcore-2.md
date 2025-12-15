---
title: "Azure Resource Group vs Specific Azure Resource Type"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 19, 2025", "1", "2", "https://github.com/aws/bedrock-agentcore-starter-toolkit", "Cybersecurity", "Previous\u00a0post Azure Resource Group vs Specific Azure Resource Type", "Next\u00a0post AWS RDS for Oracle DB Engine"]
tags: []
original_url: https://netjoints.com/amazon-bedrock-agentcore-2/
---

Amazon Bedrock AgentCore announced in July 2025. It is designed to simplify the deployment of AI agents, and its **AgentCore Runtime** is a serverless, secure environment purpose-built for hosting such apps. 

### **Amazon Bedrock Agents (Original Service)**

  * **No container-level isolation** was provided.
  * It’s a **fully managed, serverless service** designed for rapid agent development.
  * You didn’t need to manage infrastructure, but that also meant: 
    * No control over execution environments.
    * No ability to isolate agents using containers or microVMs.
    * Limited session persistence and security boundaries.
  * Isolation was mostly logical (e.g., via tenant context injection) and not at the infrastructure level1



### **Amazon Bedrock AgentCore**

  * **It uses container-like isolation via microVMs**.
  * Each agent session runs in a **dedicated microVM** with isolated compute, memory, and filesystem resources.
  * This ensures: 
    * **Complete execution environment separation**.
    * **Secure session persistence** for up to 8 hours.
    * **No cross-session contamination**.
    * **Privileged tool operations** are sandboxed securely2.
  * You can deploy your own **Docker container** with custom logic, frameworks, and dependencies



Feature| Bedrock Agents| Bedrock AgentCore  
---|---|---  
Custom Container| ❌ No| ✅ Yes (via microVMs or Docker)  
Session Isolation| Logical only| Full infrastructure-level  
Custom Runtime| ❌ Not supported| ✅ Supported  
Use Case| Rapid prototyping| Production-grade deployment  
Security| Basic| IAM, VPC, OAuth  
Too Calling| Bedrock Native| Any API, Lambda, MCP  
Memory| Stateless| Persistent Memory  
Agentic AI Agents| Native Option| LangChain  
LangGraph  
CrewAI  
Strands Agents  
OpenAI Adent SDK  
Google ADK  
Microsoft AutoGen  
LLM Model Option| Bedrock Only| Any provider  
Tool protocols | M| MCP, A2A  
  
## Quick | How to Deploy Agentic AI Agent

You will be running following commands over and over again during your testing and building the Agentic AI App. 
    
    
    # Make sure following works without errors
    $ python agentic-ai-agent-test.py
    # Following command creates docker and bedrock_agentcore.yaml files 
    $ agentcore configure --entrypoint agentic-ai-agent_test.py 
    # Following command will upload the docker and yaml file to AWS ECR (Elastic Container Registry)
    $ agentcore launch

## Detailed | **How to Deploy** Agentic AI Agent

<https://github.com/aws/bedrock-agentcore-starter-toolkit>

$ python3 -m venv venv  
$ source venv/bin/activate  
$ python –version  
$ which python  
/Users/shahzadali/Github/AgentCore_Strands_Support_Desk/venv/bin/python  
$ pip install  
$ pip install –upgrade pip  
$ pip install boto3  
$ pip install unicorn  
$ pip install fastapi  
$ pip install strands-agents  
$ pip install bedrock-agentcore  
$ pip install bedrock-agentcore-starter-toolkit

$ docker –version  
$ docker run hello-world

$ aws configure  
$ aws sts get-caller-identity (this should show ARN and the role)  
$ aws configure set region us-west-2

**IAM Permissions** : Confirm your AWS user has permissions for:

  * Amazon Bedrock (bedrock:*)
  * Amazon ECR (ecr:*)
  * AWS CloudWatch (logs:*) 
  * In the AWS Management Console, attach policies like AmazonBedrockFullAccess and AmazonEC2ContainerRegistryFullAccess to your IAM user or role if you encounter permission errors



## Agentic AI Python Code

This Python code is key. You need to keep it simple in the beginning and then add to it later. The modelId is important because this is what the AI agent will use under the hood. So you need permissions to access it too. 
    
    
    from bedrock_agentcore.runtime import BedrockAgentCoreApp
    from fastapi import FastAPI
    import boto3
    import json
    
    # Initialize FastAPI and AgentCore
    fastapi_app = FastAPI()
    agentcore_app = BedrockAgentCoreApp()
    bedrock_client = boto3.client('bedrock', region_name='us-east-1')
    
    @agentcore_app.entrypoint
    def invoke(payload):
        user_message = payload.get("prompt", "Hello")
        try:
            response = bedrock_client.invoke_model(
                modelId="anthropic.claude-3-sonnet-20240229-v1:0",
                body=json.dumps({
                    "prompt": user_message,
                    "max_tokens_to_sample": 300
                })
            )
            bedrock_result = json.loads(response['body'].read())['completion']
        except Exception as e:
            bedrock_result = f"Bedrock error: {str(e)}"
        return f"Bedrock: {bedrock_result}"
    
    @fastapi_app.post("/invoke")
    async def invoke_agent(payload: dict):
        return {"result": invoke(payload)}
    
    if __name__ == "__main__":
        import uvicorn
        uvicorn.run(fastapi_app, host="0.0.0.0", port=8000)

## Output

![](../../media/images/amazon-bedrock-agentcore-2_image.png)

![](../../media/images/amazon-bedrock-agentcore-2_image-1.png)

## Generate AgentCore Yaml File

$ agentcore configure –entrypoint agentic_ai_agent_hello_world.py
    
    
    aws sts get-caller-identity
    ❯ agentcore configure --entrypoint agentic_ai_agent_hello_world.py
    Configuring Bedrock AgentCore...
    Entrypoint parsed: file=/Users/shahzadali/Library/CloudStorage/AgentCore_Strands_Support_Desk/agentic_ai_agent_hello_world.py, bedrock_agentcore_name=agentic_ai_agent_hello_world
    Agent name: agentic_ai_agent_hello_world
    
    🔐 Execution Role
    Press Enter to auto-create execution role, or provide execution role ARN/name to use existing
    Execution role ARN/name (or press Enter to auto-create):
    ✓ Will auto-create execution role
    
    🏗️  ECR Repository
    Press Enter to auto-create ECR repository, or provide ECR Repository URI to use existing
    ECR Repository URI (or press Enter to auto-create):
    ✓ Will auto-create ECR repository
    
    🔍 Detected dependency file: requirements.txt
    Press Enter to use this file, or type a different path (use Tab for autocomplete):
    Path or Press Enter to use detected dependency file:
    ✓ Using detected file: requirements.txt
    
    🔐 Authorization Configuration
    By default, Bedrock AgentCore uses IAM authorization.
    Configure OAuth authorizer instead? (yes/no) [no]: yes
    
    📋 OAuth Configuration
    Enter OAuth discovery URL: https://trial-3508361.okta.com/oauth2/default/.well-known/openid-configuration
    Enter allowed OAuth client IDs (comma-separated): <Clinet-ID>
    Enter allowed OAuth audience (comma-separated): <Same as Client-ID>
    ✓ OAuth authorizer configuration created
    Configuring BedrockAgentCore agent: agentic_ai_agent_hello_world
    Generated .dockerignore
    Generated Dockerfile: /Users/shahzadali/Library/CloudStorage/AgentCore_Strands_Support_Desk/Dockerfile
    Generated .dockerignore: /Users/shahzadali/Library/CloudStorage/AgentCore_Strands_Support_Desk/.dockerignore
    Setting 'agentic_ai_agent_hello_world' as default agent
    ╭─────────────────────────────────────────────────────── Bedrock AgentCore Configured 
    │ Configuration Summary                                                                                                                       │
    │                                                                                                                           | Name: agentic_ai_agent_hello_world                                                                                                          │ Runtime: Docker                                                                                                                             │ Region: us-west-2                                                                                                                           │ Account: 513826297540                                                                                                                       │ Execution Role: None                                                                                                                        │ ECR: Auto-create                                                                                                                            │ Authorization: OAuth (customJWTAuthorizer)                                                                                                  
    │                                                                                                                                             
    │ Configuration saved to:                                                                                                                     │
    │ /Users/shahzadali/Library/CloudStorage/AgentCore_Strands_Support_Desk/.bedrock_agentcore.yaml
    ╰────────────────────────────────────────────────────────────────────────────────────────────
    

## Launch Bedrock AgentCore
    
    
    $ agentcore launch
    🚀 Launching Bedrock AgentCore (codebuild mode - RECOMMENDED)...
       • Build ARM64 containers in the cloud with CodeBuild
       • No local Docker required (DEFAULT behavior)
       • Production-ready deployment
    
    💡 Deployment options:
       • agentcore launch                → CodeBuild (current)
       • agentcore launch --local        → Local development
       • agentcore launch --local-build  → Local build + cloud deploy
    
    Starting CodeBuild ARM64 deployment for agent 'agentic_ai_agent_hello_world' to account 513826297540 (us-west-2)
    Starting CodeBuild ARM64 deployment for agent 'agentic_ai_agent_hello_world' to account 513826297540 (us-west-2)
    Setting up AWS resources (ECR repository, execution roles)...
    Getting or creating ECR repository for agent: agentic_ai_agent_hello_world
    Repository doesn't exist, creating new ECR repository: bedrock-agentcore-agentic_ai_agent_hello_world
    ⠦ Launching Bedrock AgentCore...✅ ECR repository available: 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-agentic_ai_agent_hello_world
    ⠧ Launching Bedrock AgentCore...Getting or creating execution role for agent: agentic_ai_agent_hello_world
    Using AWS region: us-west-2, account ID: 513826297540
    Role name: AmazonBedrockAgentCoreSDKRuntime-us-west-2-24d0081865
    ⠹ Launching Bedrock AgentCore...Role doesn't exist, creating new execution role: AmazonBedrockAgentCoreSDKRuntime-us-west-2-24d0081865
    Starting execution role creation process for agent: agentic_ai_agent_hello_world
    ✓ Role creating: AmazonBedrockAgentCoreSDKRuntime-us-west-2-24d0081865
    Creating IAM role: AmazonBedrockAgentCoreSDKRuntime-us-west-2-24d0081865
    ⠼ Launching Bedrock AgentCore...✓ Role created: arn:aws:iam::513826297540:role/AmazonBedrockAgentCoreSDKRuntime-us-west-2-24d0081865
    ⠧ Launching Bedrock AgentCore...✓ Execution policy attached: BedrockAgentCoreRuntimeExecutionPolicy-agentic_ai_agent_hello_world
    Role creation complete and ready for use with Bedrock AgentCore
    ✅ Execution role available: arn:aws:iam::513826297540:role/AmazonBedrockAgentCoreSDKRuntime-us-west-2-24d0081865
    Preparing CodeBuild project and uploading source...
    ⠏ Launching Bedrock AgentCore...Getting or creating CodeBuild execution role for agent: agentic_ai_agent_hello_world
    Role name: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-24d0081865
    ⠸ Launching Bedrock AgentCore...CodeBuild role doesn't exist, creating new role: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-24d0081865
    Creating IAM role: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-24d0081865
    ⠧ Launching Bedrock AgentCore...✓ Role created: arn:aws:iam::513826297540:role/AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-24d0081865
    Attaching inline policy: CodeBuildExecutionPolicy to role: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-24d0081865
    ⠏ Launching Bedrock AgentCore...✓ Policy attached: CodeBuildExecutionPolicy
    Waiting for IAM role propagation...
    ⠧ Launching Bedrock AgentCore...CodeBuild execution role creation complete: arn:aws:iam::513826297540:role/AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-24d0081865
    ⠙ Launching Bedrock AgentCore...Using .dockerignore with 44 patterns
    ⠸ Launching Bedrock AgentCore...Uploaded source to S3: agentic_ai_agent_hello_world/20250820-051241.zip
    ⠧ Launching Bedrock AgentCore...Created CodeBuild project: bedrock-agentcore-agentic_ai_agent_hello_world-builder
    Starting CodeBuild build (this may take several minutes)...
    ⠙ Launching Bedrock AgentCore...Starting CodeBuild monitoring...
    ⠹ Launching Bedrock AgentCore...🔄 QUEUED started (total: 0s)
    ⠴ Launching Bedrock AgentCore...✅ QUEUED completed in 5.1s
    🔄 PROVISIONING started (total: 5s)
    ⠹ Launching Bedrock AgentCore...✅ PROVISIONING completed in 10.1s
    🔄 PRE_BUILD started (total: 15s)
    ⠏ Launching Bedrock AgentCore...✅ PRE_BUILD completed in 10.1s
    🔄 BUILD started (total: 25s)
    ⠹ Launching Bedrock AgentCore...✅ BUILD completed in 35.5s
    🔄 POST_BUILD started (total: 61s)
    ⠏ Launching Bedrock AgentCore...✅ POST_BUILD completed in 10.1s
    🔄 COMPLETED started (total: 71s)
    ✅ COMPLETED completed in 0.0s
    🎉 CodeBuild completed successfully in 1m 11s
    CodeBuild completed successfully
    ✅ CodeBuild project configuration saved
    Deploying to Bedrock AgentCore...
    ⠼ Launching Bedrock AgentCore...⚠️ Session ID will be reset to connect to the updated agent. The previous agent remains accessible via the original session ID: c168addd-d20f-4c2e-9c37-71485ef4b2e3
    ✅ Agent created/updated: arn:aws:bedrock-agentcore:us-west-2:513826297540:runtime/agentic_ai_agent_hello_world-7V9ZDUDxXY
    Polling for endpoint to be ready...
    ⠋ Launching Bedrock AgentCore...Agent endpoint: arn:aws:bedrock-agentcore:us-west-2:513826297540:runtime/agentic_ai_agent_hello_world-7V9ZDUDxXY/runtime-endpoint/DEFAULT
    Deployment completed successfully - Agent: arn:aws:bedrock-agentcore:us-west-2:513826297540:runtime/agentic_ai_agent_hello_world-7V9ZDUDxXY
    ✓ CodeBuild completed: bedrock-agentcore-agentic_ai_agent_hello_world-builder:38965aa6-f260-4208-88c4-435db1260d92
    ✓ ARM64 image pushed to ECR: 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-agentic_ai_agent_hello_world:latest
    ╭─────────────────────────────────────── CodeBuild ARM64 Deployment Successful ────────────────
    │                                                                                                                                             │ Agent Name: agentic_ai_agent_hello_world                                                                                                    │ CodeBuild ID: bedrock-agentcore-agentic_ai_agent_hello_world-builder:38965aa6-f260-4208-88c4-435db1260d92                                   │ Agent ARN: arn:aws:bedrock-agentcore:us-west-2:513826297540:runtime/agentic_ai_agent_hello_world-7V9ZDUDxXY                                 │
    │ ECR URI: 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-agentic_ai_agent_hello_world:latest                                 │
    │                                                                                                                                             │ARM64 container deployed to Bedrock AgentCore.                                                                                              │
    │                                                                                                                             
    │ You can now check the status of your Bedrock AgentCore endpoint with:                                                                       │
    │ agentcore status                                                                                                                            │                                                                                                                                         
    │ You can now invoke your Bedrock AgentCore endpoint with:                                                                                    │
    │ agentcore invoke '{"prompt": "Hello"}'                                                                                                      │
    │                                                                                                                                            
    │ 📋 Agent logs available at:                                                                                                                 │
    │    /aws/bedrock-agentcore/runtimes/agentic_ai_agent_hello_world-7V9ZDUDxXY-DEFAULT                                                          
    │    /aws/bedrock-agentcore/runtimes/agentic_ai_agent_hello_world-7V9ZDUDxXY-DEFAULT/runtime-logs                                             │                                                                                                                                     
    │ 💡 Tail logs with:                                                                                                                          │
    │    aws logs tail /aws/bedrock-agentcore/runtimes/agentic_ai_agent_hello_world-7V9ZDUDxXY-DEFAULT --follow                                   
    │    aws logs tail /aws/bedrock-agentcore/runtimes/agentic_ai_agent_hello_world-7V9ZDUDxXY-DEFAULT --since 1h
    
    

## Get the OAuth Bearer Token

Following is only needed if you are NOT using IAM for inbound auth and using Okta or other IDP. 

curl –request POST \  
–url https://trial-3508361.okta.com/oauth2/default/v1/token \  
–header “Accept: application/json” \  
–header “Content-Type: application/x-www-form-urlencoded” \  
–user “Okta ClientID:Okta Client Secret Value”  
–data “grant_type=client_credentials&scope=agent.invoke”

You will get a bearer token from Okta. 
