---
title: "LAB7 – Placehoslder"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "December 31, 2020", "Important Note", "Brief Deployment Instructions", "Install Dockers", "Detailed Deployment Instructions", "http://0.0.0.0:5000/api/v1.0/get-statestatus", "cloud-networking", "Previous\u00a0post LAB7 \u2013 Placehoslder", "Next\u00a0post GCP FireNet"]
tags: []
original_url: https://netjoints.com/aviatrix-kickstart-spin-up-cloud-networks-in-minutes-ui-mode/#respond
---

Kickstart deploys cloud and multi-cloud networks in minutes without any effort. Once the hub/spoke transit network is built in the cloud, it will act as a core networking layer on which one can add more use-cases as needed later.

The lightweight automation script deploys an Aviatrix controller and an Aviatrix transit architecture in AWS (and optionally in Azure). Everything is self-contained in a docker image. You do not need to install anything besides**docker run time on your laptop/desktop/VM/instance**.

## [Important Note](https://community.aviatrix.com/t/g9hx9jh#important-note)

  * This tool works the best for brand new Aviatrix Controller deployment
  * It is not recommended to launch the controller if one deployed already
  * If you have previously deployed Aviatrix Controller under the AWS account, you will receive the following errors. You need to manually remove those roles and policies before moving forward


    
    
    Error: Error creating IAM Role aviatrix-role-ec2: EntityAlreadyExists: Role with name aviatrix-role-ec2 already exists.
    Error: Error creating IAM Role aviatrix-role-app: EntityAlreadyExists: Role with name aviatrix-role-app already exists.
    Error: Error creating IAM policy aviatrix-assume-role-policy: EntityAlreadyExists: A policy called aviatrix-assume-role-policy already exists. Duplicate names are not allowed.
    Error: Error creating IAM policy aviatrix-app-policy: EntityAlreadyExists: A policy called aviatrix-app-policy already exists. Duplicate names are not allowed.

## [Brief Deployment Instructions](https://community.aviatrix.com/t/g9hx9jh#brief-deployment-instructions)

Before you start the deployment process, you need to do/have following

  1. AWS accounts with root access
  2. AWS Access Key ID
  3. AWS Secret Access Key
  4. AWS Keypair name (for the test EC2 instances) in the region (default region in standard mode is us-east-2) where you are planning to deploy the Spoke VPCs 
  5. Subscribe to Aviatrix Controller software in the AWS marketplace
  6. [Install Dockers](https://www.docker.com/products/docker-desktop) and make sure Docker Desktop is running in your Mac / Linux or Windows Laptop, Desktop, VM, or EC2 during the deployment process
  7. Run the following CLI commands on your laptop, desktop, VM, or EC2
     1. **% docker volume create TF**
     2. **% docker run -v TF:/root -p 5000:5000 -d aviatrix/kickstart-gui**



It should show you progress as follows
    
    
    shahzadali@shahzad-ali ~ % docker run -v TF:/root -p 5000:5000 -d aviatrix/kickstart-gui
    Unable to find image 'aviatrix/kickstart-gui:latest' locally
    latest: Pulling from aviatrix/kickstart-gui
    188c0c94c7c5: Pull complete 
    269daf956265: Pull complete 
    932e18d0c55d: Pull complete 
    3eebf109acbf: Pull complete 
    704fc01fe5c0: Pull complete 
    1fff100b1be8: Pull complete 
    b6b3de2ab177: Pull complete 
    d760a63fff4d: Pull complete 
    8eeeebe7f48f: Pull complete 
    f5d70a31f2a8: Pull complete 
    aa15b35f27d5: Pull complete 
    98bf76eb1939: Pull complete 
    51cbf27a70a8: Pull complete 
    f1497051644d: Pull complete 
    9c5a173e5d5c: Pull complete 
    39acd96b15aa: Pull complete 
    e4c46d457a8c: Pull complete 
    Digest: sha256:1b510889995425b3f628a38ac81c056b52be6848d94944ddef94db3f00f3f628
    Status: Downloaded newer image for aviatrix/kickstart-gui:latest
    aeeffe5791f5b588047b0016eed0dfa96fc3a851556acaa734318ad0181ed715
    shahzadali@shahzad-ali ~ % 

In your web browser type **http://0.0.0.0:5000/** and follow the Standard UI workflow

## [Detailed Deployment Instructions](https://community.aviatrix.com/t/g9hx9jh#detailed-deployment-instructions)

![](../../media/images/aviatrix-kickstart-spin-up-cloud-networks-in-minut_image.png)

The workflow is very simple to follow. The Azure step is optional. 

![](../../media/images/aviatrix-kickstart-spin-up-cloud-networks-in-minut_image-1-598x1024.png)

![](../../media/images/aviatrix-kickstart-spin-up-cloud-networks-in-minut_image-2-1024x510-1.png)

![](../../media/images/aviatrix-kickstart-spin-up-cloud-networks-in-minut_Screen-Shot-2020-12-31-at-11.00.11-AM-1024x644.png)

![](../../media/images/aviatrix-kickstart-spin-up-cloud-networks-in-minut_Screen-Shot-2020-12-31-at-11.03.32-AM.png)

![](../../media/images/aviatrix-kickstart-spin-up-cloud-networks-in-minut_Screen-Shot-2020-12-31-at-11.18.46-AM.png)

![](../../media/images/aviatrix-kickstart-spin-up-cloud-networks-in-minut_Screen-Shot-2020-12-31-at-11.26.57-AM.png)

After that you should skip step 6 and 7. This will complete the deployment

## Troubleshooting

  * The debug option in the UI provides the logs
  * You can also use this URL <http://0.0.0.0:5000/api/v1.0/get-statestatus>
  * For checking the logs inside the container itself follow these steps


    
    
    ### Find the container process name using the docker ps commmand ###
    shahzadali@shahzad-ali ~ % docker ps
    CONTAINER ID   IMAGE                    COMMAND                  CREATED        STATUS        PORTS                    NAMES
    e773a53d34ca   aviatrix/kickstart-gui   "/bin/sh -c 'python3…"   17 hours ago   Up 17 hours   0.0.0.0:5000->5000/tcp   awesome_hofstadter
    
    ### To login to container istself use docker exec command ###
    shahzadali@shahzad-ali /Users % docker exec -it awesome_hofstadter bash
    
    ### To check the docker logs without loggin into the container user docker logs command ###
    shahzadali@shahzad-ali ~ % docker logs -f awesome_hofstadter
    
    
    shahzadali@shahzad-ali ~ % docker logs -f awesome_hofstadter | more
    [2021-01-11T22:13:32+0000] INFO __main__:24 Aviatrix kickstart has been started.
     * Serving Flask app "app" (lazy loading)
     * Environment: production
       WARNING: This is a development server. Do not use it in a production deployment.
       Use a production WSGI server instead.
     * Debug mode: on
    [2021-01-11T22:13:32+0000] INFO werkzeug:113  * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
    [2021-01-11T22:13:32+0000] INFO werkzeug:113  * Restarting with stat
    [2021-01-11T22:13:32+0000] INFO __main__:24 Aviatrix kickstart has been started.
    [2021-01-11T22:13:32+0000] WARNING werkzeug:113  * Debugger is active!
    [2021-01-11T22:13:32+0000] INFO werkzeug:113  * Debugger PIN: 320-893-258
    [2021-01-11T22:13:50+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:50] "ESC[37mGET / HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:50+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:50] "ESC[37mGET /static/css/main.16b366d6.chunk.css HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:50+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:50] "ESC[37mGET /static/js/main.c622dd7f.chunk.js HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:50+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:50] "ESC[37mGET /static/js/2.746a07c0.chunk.js HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:50+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:50] "ESC[37mGET /static/media/Roboto-Regular.03523cf5.ttf HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:51+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:51] "ESC[37mGET /static/media/Roboto-Light.0cea3982.ttf HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:51+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:51] "ESC[37mGET /static/media/Roboto-Bold.4f39c579.ttf HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:51+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:51] "ESC[37mGET /api/v1.0/get-statestatus HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:51+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:51] "ESC[37mGET /static/media/Roboto-Medium.13a29228.ttf HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:51+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:51] "ESC[37mGET /favicon.ico HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:51+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:51] "ESC[37mGET /logo192.png HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:54+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:54] "ESC[37mPOST /api/v1.0/mode-selection HTTP/1.1ESC[0m" 200 -
    [2021-01-11T22:13:54+0000] INFO werkzeug:113 172.17.0.1 - - [11/Jan/2021 22:13:54] "ESC[37mGET /api/v1.0/get-statestatus HTTP/1.1ESC[0m" 200 -
      
    
    shahzadali@shahzad-ali ~ % docker logs -f awesome_hofstadter | tail
    /root/kickstart_web.sh: line 743: export: `13.58.100.80': not a valid identifier
    
    ﻿

**To delete the docker volume**
    
    
     To delete docker volume try following
    
    shahzadali@shahzad-ali ~ % docker volume remove TF
    Error response from daemon: remove TF: volume is in use - [4a75b428ff5badf368f1dc9761c51b903652d8cfa4da70b2bdd543be3d352fea, 7f54de5c900d28d23ea61965423394534fe40dd769b20ff78f3a31c1fa98987d]
    shahzadali@shahzad-ali ~ %
    
    If it gives you the error, then try following 
    
    shahzadali@shahzad-ali ~ % docker system prune
    WARNING! This will remove:
      - all stopped containers
      - all networks not used by at least one container
      - all dangling images
      - all dangling build cache
    
    Are you sure you want to continue? [y/N] y
    Deleted Containers:
    7f54de5c900d28d23ea61965423394534fe40dd769b20ff78f3a31c1fa98987d
    4a75b428ff5badf368f1dc9761c51b903652d8cfa4da70b2bdd543be3d352fea
    c6de98c3284e8afdf5cff8f9b45266acf1e4bebf34a2ce0f7a20aa92342a43e5
    6227ecf90cf4100b1a1391038171e8ae5dd0cff4f3a7007e4f675360396913da
