---
title: "Agentic AI Security Framework and Deployment Guide"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 17, 2025", "Cybersecurity", "Previous\u00a0post Agentic AI Security Framework and Deployment Guide", "Next\u00a0post Zero Standing Privilege for K8s: A Must-Have for Secure DevOps"]
tags: []
original_url: https://netjoints.com/troubleshooting-aws-bedrock-agentcore/
---


    
    🚀 Launching Bedrock AgentCore (codebuild mode - RECOMMENDED)...
       • Build ARM64 containers in the cloud with CodeBuild
       • No local Docker required (DEFAULT behavior)
       • Production-ready deployment
    
    💡 Deployment options:
       • agentcore launch                → CodeBuild (current)
       • agentcore launch --local        → Local development
       • agentcore launch --local-build  → Local build + cloud deploy
    
    Starting CodeBuild ARM64 deployment for agent 'finops-supervisor-ai-agent' to account 513826297540 (us-west-2)
    Starting CodeBuild ARM64 deployment for agent 'finops-supervisor-ai-agent' to account 513826297540 (us-west-2)
    Setting up AWS resources (ECR repository, execution roles)...
    Using ECR repository from config: finops-supervisor-ai-agent
    Using execution role from config: arn:aws:iam::513826297540:role/service-role/AmazonBedrockAgentCoreRuntimeServiceRole-shahzad
    ⠸ Launching Bedrock AgentCore...✅ Execution role validation passed: arn:aws:iam::513826297540:role/service-role/AmazonBedrockAgentCoreRuntimeServiceRole-shahzad
    Preparing CodeBuild project and uploading source...
    ⠼ Launching Bedrock AgentCore...Getting or creating CodeBuild execution role for agent: finops-supervisor-ai-agent
    Role name: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-005a5ff7d6
    ⠏ Launching Bedrock AgentCore...CodeBuild role doesn't exist, creating new role: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-005a5ff7d6
    Creating IAM role: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-005a5ff7d6
    ⠸ Launching Bedrock AgentCore...✓ Role created: arn:aws:iam::513826297540:role/AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-005a5ff7d6
    Attaching inline policy: CodeBuildExecutionPolicy to role: AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-005a5ff7d6
    ⠴ Launching Bedrock AgentCore...✓ Policy attached: CodeBuildExecutionPolicy
    Waiting for IAM role propagation...
    ⠼ Launching Bedrock AgentCore...CodeBuild execution role creation complete: arn:aws:iam::513826297540:role/AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-005a5ff7d6
    ⠇ Launching Bedrock AgentCore...No .dockerignore found, using default exclude patterns
    ⠋ Launching Bedrock AgentCore...Uploaded source to S3: finops-supervisor-ai-agent/20251017-193210.zip
    ⠼ Launching Bedrock AgentCore...Created CodeBuild project: bedrock-agentcore-finops-supervisor-ai-agent-builder
    Starting CodeBuild build (this may take several minutes)...
    ⠇ Launching Bedrock AgentCore...Starting CodeBuild monitoring...
    ⠏ Launching Bedrock AgentCore...🔄 QUEUED started (total: 0s)
    ⠋ Launching Bedrock AgentCore...✅ QUEUED completed in 60.9s
    🔄 PROVISIONING started (total: 61s)
    ⠋ Launching Bedrock AgentCore...✅ PROVISIONING completed in 15.2s
    🔄 PRE_BUILD started (total: 76s)
    ⠧ Launching Bedrock AgentCore...✅ PRE_BUILD completed in 10.2s
    🔄 COMPLETED started (total: 86s)
    ❌ Build failed during COMPLETED phase
    ❌ CodeBuild failed with status: FAILED

* * *

If you get above error, you must view the CloudWatch logs to know exactly the issue. 

Or you can use following CLI command to see it on terminal 

aws logs tail /aws/codebuild/bedrock-agentcore-finops_supervisor_ai_agent-builder –follow  
–format short –profile=agentic-ai

In my case I was getting this error 
    
    
    2025-10-18T06:08:04 The push refers to repository [513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-finops_supervisor_ai_agent]
    2025-10-18T06:08:04 136c310d0a77: Preparing
    2025-10-18T06:08:04 40fe41b4a47c: Preparing
    2025-10-18T06:08:04 4ad7ee5bc643: Preparing
    2025-10-18T06:08:04 c12eec818033: Preparing
    2025-10-18T06:08:04 5b5131e57dda: Preparing
    2025-10-18T06:08:04 1e836a41dad6: Preparing
    2025-10-18T06:08:04 6f8e62651a1f: Preparing
    2025-10-18T06:08:04 1cc1e7304163: Preparing
    2025-10-18T06:08:04 f0306340f8b1: Preparing
    2025-10-18T06:08:04 090e9c58f474: Preparing
    2025-10-18T06:08:04 1e836a41dad6: Waiting
    2025-10-18T06:08:04 6f8e62651a1f: Waiting
    2025-10-18T06:08:04 1cc1e7304163: Waiting
    2025-10-18T06:08:04 f0306340f8b1: Waiting
    2025-10-18T06:08:04 090e9c58f474: Waiting
    2025-10-18T06:08:04 denied: User: arn:aws:sts::513826297540:assumed-role/AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-4e93752fa7/AWSCodeBuild-ca05ab28-a5c3-4a1c-86e7-01c4ec684710 is not authorized to perform: ecr:InitiateLayerUpload on resource: arn:aws:ecr:us-west-2:513826297540:repository/bedrock-agentcore-finops_supervisor_ai_agent because no identity-based policy allows the ecr:InitiateLayerUpload action
    2025-10-18T06:08:04
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.121336 Command did not exit successfully docker push 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-finops_supervisor_ai_agent:latest exit status 1
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.126997 Phase complete: POST_BUILD State: FAILED
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.127015 Phase context status code: COMMAND_EXECUTION_ERROR Message: Error while executing command: docker push 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-finops_supervisor_ai_agent:latest. Reason: exit status 1
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.171211 Set report auto-discover timeout to 5 seconds
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.171263 Expanding base directory path:  .
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.174009 Assembling file list
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.174024 Expanding .
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.176861 Expanding file paths for base directory .
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.176874 Assembling file list
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.176877 Expanding **/*
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.179732 No matching auto-discover report paths found
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.179749 Report auto-discover file discovery took 0.008538 seconds
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.179758 Phase complete: UPLOAD_ARTIFACTS State: SUCCEEDED
    2025-10-18T06:08:04 [Container] 2025/10/18 06:08:04.179765 Phase context status code:  Message:

The resolution was to run the following command 
    
    
    # Attach AWS managed ECR policy
    aws iam attach-role-policy \
      --role-name AmazonBedrockAgentCoreSDKCodeBuild-us-west-2-4e93752fa7 \
      --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser

## Get the Agent Status Command
    
    
    # List all agent runtimes
    aws bedrock-agentcore-control list-agent-runtimes --profile agentic-ai
    
    # Get details for a specific agent runtime
    aws bedrock-agentcore-control get-agent-runtime \
      --agent-runtime-id finops_supervisor_ai_agent \
      --profile agentic-ai
    
    
