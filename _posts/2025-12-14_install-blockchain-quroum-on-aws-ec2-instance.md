---
title: "Selective DNS Traffic Forwarding From On-Prem to Cloud"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "October 23, 2020", "Install node-js", "Install BlockChain Quorum using this URL", "Instructions are mentioned here in the official Getting Started guide", "cloud-networking", "Previous\u00a0post Selective DNS Traffic Forwarding From On-Prem to Cloud", "Next\u00a0post Install BlockChain Quorum Node on AWS EC2 Instance"]
tags: []
original_url: https://netjoints.com/install-blockchain-quroum-on-aws-ec2-instance/
---

## Introduction

Quorum is an enterprise blockchain platform. Quorum is a privacy-centric fork of Ethereum client “geth” with several protocol level enhancements to support enterprise business needs. Quorum is an open-source project. The very nature of blockchain or distrubuted ledger provides a secure, shardd platform for decentralized applications (DAPPs) and data. It is cryptographically secure, auditable and immutable. 

### Quorum Architecture

Quorum provides several enterprise features such as 

  * Transaction Privatcy
  * Multiple pluggable consensus mechanism suitable for enterprise use-cases
  * Enterprise grade permission management (access control) for network nodes and participants
  * Enterprise grade performance

![Quorum - A blockchain Platform for the Enterprise](https://static.blockgeeks.com/wp-content/uploads/2020/05/image14.jpg)

Quorum node is a lightweight fork of geth. For more details check the resources provided by JPMorgan Blockchain Center of Excellence and ConSensys. Notice that JPMorgan’s BlockChain platform Quorum is now acquired by ConsenSys. 

This article assume that readers would have basic understanding of how BlockChain works. The main purpose of this article to teach how to deploy the Quorum on AWS EC2 instance for testing purposes.

## Technical Pre-Requisite

  * The Quroum needs Java version 11
  * Requires Amazon Linux VM 2 (at least t3.xarge – blockchain requires this much)



### Java Version Mapping

49 = Java 5  
50 = Java 6  
51 = Java 7  
52 = Java 8  
53 = Java 9  
54 = Java 10  
55 = Java 11  
56 = Java 12  
57 = Java 13  
58 = Java 14

## Block Chain Installation Steps on AWS EC2 Instance

  1. Deploy AWS EC2 instance 
     1. Must use at least Linux VM 2 (to get amazon-linux-extras)
     2. Size must be at least t3.xlarge for BlockChain proper operations
  2. [Install node-js ](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)on the EC2 instance
     1. $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
     2. $ . ~/.nvm/nvm.sh
     3. $ nvm install node
     4. $ node -e “console.log(‘Running Node.js ‘ + process.version)”
  3. $ sudo yum update
  4. $ sudo amazon-linux-extras install java-openjdk11
  5. $ curl -o- -L https://yarnpkg.com/install.sh | bash **(optional)**
  6. [Install BlockChain Quorum using this URL](https://docs.goquorum.consensys.net/en/latest/HowTo/GetStarted/Wizard/GettingStarted/)
     1. $ npm install -g quorum-wizard
     2. $ quorum-wizard -q -v



## BlockChain Quorum Installation Output

The Quorum wizard automatically created 3-node raft network with tessera and cakeshop on a single EC2 instance. Following is the output
    
    
    [ec2-user@ip-10-101-76-122 ~]$ quorum-wizard -v
    debug: Showing debug logs
    ?
    Welcome to Quorum Wizard!
    This tool allows you to easily create bash, docker, and kubernetes files to start up a quorum network.
    You can control consensus, privacy, network details and more for a customized setup.
    Additionally you can choose to deploy our chain explorer, Cakeshop, to easily view and monitor your network.
    We have 3 options to help you start exploring Quorum:
    Quickstart - our 1 click option to create a 3 node raft network with tessera and cakeshop
    Simple Network - using pregenerated keys from quorum 7nodes example,
    this option allows you to choose the number of nodes (7 max), consensus mechanism, transaction manager, and the option to deploy cakeshop
    Custom Network - In addition to the options available in #2, this selection allows for further customization of your network.
    Choose to generate keys, customize ports for both bash and docker, or change the network id
    Quorum Wizard will generate your startup files and everything required to bring up your network.
    All you need to do is go to the specified location and run start.sh
    ❯ Quickstart (3-node raft network with tessera and cakeshop)
    Simple Network
    Custom Network
    Exit

I used the command with -q parameter which created the Quickstart setup in one go.
    
    
    [ec2-user@ip-10-101-76-122 ~]$ quorum-wizard -q -v
    debug: Showing debug logs
    Downloading dependencies…
    Downloading quorum 2.7.0 from https://bintray.com/quorumengineering/quorum/download_file?file_path=v2.7.0/geth_v2.7.0_linux_amd64.tar.gz…
    Downloading tessera 0.10.5 from https://oss.sonatype.org/service/local/repositories/releases/content/com/jpmorgan/quorum/tessera-app/0.10.5/tessera-app-0.10.5-app.jar…
    Downloading cakeshop 0.11.0 from https://github.com/jpmorganchase/cakeshop/releases/download/v0.11.0/cakeshop-0.11.0.war…
    Unpacking to /home/ec2-user/.quorum-wizard/bin/quorum/2.7.0/geth
    Unpacking to /home/ec2-user/.quorum-wizard/bin/tessera/0.10.5/tessera-app.jar
    Unpacking to /home/ec2-user/.quorum-wizard/bin/cakeshop/0.11.0/cakeshop.war
    Saved to /home/ec2-user/.quorum-wizard/bin/quorum/2.7.0/geth
    Saved to /home/ec2-user/.quorum-wizard/bin/tessera/0.10.5/tessera-app.jar
    Saved to /home/ec2-user/.quorum-wizard/bin/cakeshop/0.11.0/cakeshop.war
    Building network directory…
    Generating network resources locally…
    Building qdata directory…
    Initializing quorum…
    Done
    Tessera Node 1 public key:
    BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=
    Tessera Node 2 public key:
    QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=
    Tessera Node 3 public key:
    1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=
    
    Quorum network created
    Run the following commands to start your network:
    cd network/3-nodes-quickstart
    ./start.sh
    A sample simpleStorage contract is provided to deploy to your network
    To use run ./runscript.sh public_contract.js from the network folder
    A private simpleStorage contract was created with privateFor set to use Node 2's public key: QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=
    To use run ./runscript.sh private_contract.js from the network folder
    After starting, Cakeshop will be accessible here: http://localhost:8999
    [ec2-user@ip-10-101-76-122 ~]$

## Start Quorum Now
    
    
    [ec2-user@ip-10-101-76-122 ~]$ cd network/3-nodes-quickstart/
    [ec2-user@ip-10-101-76-122 3-nodes-quickstart]$
    [ec2-user@ip-10-101-76-122 3-nodes-quickstart]$ pwd
    /home/ec2-user/network/3-nodes-quickstart
    
    [ec2-user@ip-10-101-76-122 3-nodes-quickstart]$ ./start.sh
    Starting Quorum network…
    Waiting until all Tessera nodes are running…
    Node 1 is not yet listening on tm.ipc
    Node 2 is not yet listening on tm.ipc
    Node 3 is not yet listening on tm.ipc
    Node 1 is not yet listening on http
    Node 2 is not yet listening on http
    Node 3 is not yet listening on http
    Waiting until all Tessera nodes are running…
    Node 1 is not yet listening on tm.ipc
    Node 2 is not yet listening on tm.ipc
    Node 3 is not yet listening on tm.ipc
    Node 1 is not yet listening on http
    Node 2 is not yet listening on http
    Node 3 is not yet listening on http
    Waiting until all Tessera nodes are running…
    Waiting until all Tessera nodes are running…
    All Tessera nodes started
    Starting Quorum nodes
    Starting Cakeshop
    Waiting until Cakeshop is running…
    Cakeshop is not yet listening on http
    Waiting until Cakeshop is running…
    Cakeshop is not yet listening on http
    Waiting until Cakeshop is running…
    Cakeshop is not yet listening on http
    
    Cakeshop started at http://localhost:8999
    Successfully started Quorum network.
    Tessera Node 1 public key:
    BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=
    Tessera Node 2 public key:
    QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=
    Tessera Node 3 public key:
    1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=
    
    [ec2-user@ip-10-101-76-122 3-nodes-quickstart]$

## Cakeshop Validation

I installed the CLI brower called Lynx with the following command on the same EC2 instance for quick validation
    
    
    [ec2-user@ip-10-101-76-122 ~]$ sudo yum install lynx
    Loaded plugins: extras_suggestions, langpacks, priorities, update-motd
    amzn2-core | 3.7 kB 00:00:00
    amzn2extra-docker | 3.0 kB 00:00:00
    amzn2extra-java-openjdk11 | 3.0 kB 00:00:00
    Resolving Dependencies
    --> Running transaction check
    ---> Package lynx.x86_64 0:2.8.8-0.3.dev15.amzn2.0.2 will be installed
    --> Processing Dependency: redhat-indexhtml for package: lynx-2.8.8-0.3.dev15.amzn2.0.2.x86_64
    --> Running transaction check
    ---> Package amazonlinux-indexhtml.noarch 0:1-1.amzn2 will be installed
    --> Finished Dependency Resolution
    Dependencies Resolved
    ======================================================================================================================================================================================================================
    Package Arch Version Repository Size
    Installing:
    lynx x86_64 2.8.8-0.3.dev15.amzn2.0.2 amzn2-core 1.4 M
    Installing for dependencies:
    amazonlinux-indexhtml noarch 1-1.amzn2 amzn2-core 4.1 k
    Transaction Summary
    Install 1 Package (+1 Dependent package)
    Total download size: 1.5 M
    Installed size: 5.4 M
    Is this ok [y/d/N]: y
    Downloading packages:
    (1/2): amazonlinux-indexhtml-1-1.amzn2.noarch.rpm | 4.1 kB 00:00:00
    (2/2): lynx-2.8.8-0.3.dev15.amzn2.0.2.x86_64.rpm | 1.4 MB 00:00:00
    Total 10 MB/s | 1.5 MB 00:00:00
    Running transaction check
    Running transaction test
    Transaction test succeeded
    Running transaction
    Installing : amazonlinux-indexhtml-1-1.amzn2.noarch 1/2
    Installing : lynx-2.8.8-0.3.dev15.amzn2.0.2.x86_64 2/2
    Verifying : amazonlinux-indexhtml-1-1.amzn2.noarch 1/2
    Verifying : lynx-2.8.8-0.3.dev15.amzn2.0.2.x86_64 2/2
    Installed:
    lynx.x86_64 0:2.8.8-0.3.dev15.amzn2.0.2
    Dependency Installed:
    amazonlinux-indexhtml.noarch 0:1-1.amzn2
    Complete!
    [ec2-user@ip-10-101-76-122 ~]$
    [ec2-user@ip-10-101-76-122 ~]$
    [ec2-user@ip-10-101-76-122 ~]$
    [ec2-user@ip-10-101-76-122 ~]$ lynx http://localhost:8999

Following is the output from the successful cakeshop installation

![](../../media/images/install-blockchain-quroum-on-aws-ec2-instance_image-9.png)

## Quorum Screen Shots

![](../../media/images/install-blockchain-quroum-on-aws-ec2-instance_Screen-Shot-2020-10-25-at-4.30.44-PM-1024x456.png)

## Interacting with BlockChain Quorum Netowrk

After following the instructions here, you should have a fully generated local Quorum network. Here are some ways you can interact with the network to try out the features of Quorum.

[Instructions are mentioned here in the official Getting Started guide](https://docs.goquorum.consensys.net/en/latest/HowTo/GetStarted/Wizard/GettingStarted/)

## Troubleshooting

## JNI Error

During this process I encountered various errors some were very obvious. Following is the message that was not very clear. If you are getting this error then it means tha JRE or Java version is not correct and you need to upgrade it to latest version. In my case the the error was gone once I upgraded it to Java version 11.
    
    
    Error: A JNI error has occurred, please check your installation and try again
    Exception in thread "main" java.lang.UnsupportedClassVersionError: com/quorum/tessera/launcher/Main has been compiled by a more recent version of the Java Runtime (class file version 55.0), this version of the Java Runtime only recognizes class file versions up to 52.0

## strat.sh Killed Error

If you are receiving following error then most likely it is because the instance size is too small. Increase the instance size
    
    
    Cakeshop is not yet listening on http
    ./start.sh: line 84: 14715 Killed java -Xms128M -Xmx128M -jar $BIN_TESSERA -configfile qdata/c2/tessera-config-09-2.json >> qdata/logs/tessera2.log 2>&1
    ./start.sh: line 84: 14898 Killed PRIVATE_CONFIG=qdata/c1/tm.ipc nohup $BIN_GETH --datadir qdata/dd1 --nodiscover --rpc --rpccorsdomain=* --rpcvhosts=* --rpcaddr 0.0.0.0 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,raft,quorumPermission --ws --wsaddr 0.0.0.0 --wsorigins=* --emitcheckpoints --unlock 0 --password qdata/dd1/keystore/password.txt --allow-insecure-unlock --graphql --graphql.port 24000 --graphql.corsdomain=* --graphql.addr 0.0.0.0 --raft --raftport 50401 --permissioned --verbosity 5 --networkid 10 --rpcport 22000 --wsport 23000 --port 21000 2>> qdata/logs/1.log
    Waiting until Cakeshop is running…
    
    Cakeshop is taking a long time to start. Look at logs
    Waiting until Cakeshop is running…
    Cakeshop is not yet listening on http
    Cakeshop is taking a long time to start. Look at logs
    Waiting until Cakeshop is running…
    Cakeshop is not yet listening on http
    Cakeshop is taking a long time to start. Look at logs
    Waiting until Cakeshop is running…
    Cakeshop is not yet listening on http
    Cakeshop is taking a long time to start. Look at logs
    Waiting until Cakeshop is running…
