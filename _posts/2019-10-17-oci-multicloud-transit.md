---
title: "Aviatrix Oracle Cloud (OCI) On-Boarding and Initial Configuration"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "October 16, 2019", "previous blog post", "previous blog", "Published Image: aviatrix_gateway_0415_1017_20190820", "ShowCopy", "OCI-Transit-VCN-Ashburn", "OCI-Transit-VCN-Ashburn-public-subnet", "aviatrix-security-group", "Subnet\u2019s", "Aviatrix ActiveMesh", "Info", "cloud-networking", "multi-cloud", "Previous\u00a0post Aviatrix Oracle Cloud (OCI) On-Boarding and Initial Configuration", "Next\u00a0post GCP Transit Networking and Routing with Aviatrix"]
tags: []
original_url: https://netjoints.com/oci-multicloud-transit/#respond
---

In the [previous blog post](https://netjoints.wordpress.com/2019/10/16/aviatrix-oracle-cloud-oci-on-boarding-process/), we performed the initial OCI on-boarding and Transit VPC setup. Here we will build Multi-Cloud transit network connecting OCI and GCP together. The GCP multi-cloud transit network is already built using the Aviatrix Controller. This is the common cloud architecture that Aviatrix provide across all major Clouds such as AWS, Azure, GCP and OCI. This common cloud architecture provide consistent operational tools and visibility into different Cloud Networks. 

### Business Requirement to Consume Services from GCP and OCI

A customer has already deployed production workload in GCP to utilize GCP’s ML/AI/Analytics services. A new business requirement emerged to consume database service offered in Oracle (OCI) Cloud.

From the network architecture point of view, this business requirement can easily be fulfilled by building an Aviatrix based transit architecture in OCI; the same transit network architecture that was built in GCP. Eventually these two Cloud architectures will be connected together using Aviatrix encrypted peering. 

![Multi-Cloud Common Architecture in GCP and OCI ](http://107.23.205.221/wp-content/uploads/2019/10/image-28.png?w=815)Multi-Cloud Common Architecture in GCP and OCI 

### Aviatrix Transit Gateway in OCI Transit VCN

As first step, we logged into the controller and launched the workflow to deploy the Aviatrix Transit VCN Gateway (OCI calls VPC as VCN: Virtual Cloud Network). The VCNs were build in the [previous blog](https://netjoints.wordpress.com/2019/10/16/aviatrix-oracle-cloud-oci-on-boarding-process/). 

Notice the ease of deploying it in the region of your choice with the instance size that your business require. Also notice that Public Subnet was automatically created by Aviatrix and one does not need to worry about creating it from scratch. 

![Launch Aviatrix Gateway \(AVX-Transit-GW\) in OCI VCN](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-9.36.19-pm-1.png?w=800)Launch Aviatrix Gateway (AVX-Transit-GW) in OCI VCN

Once you hit create button, the Aviatrix Controller will communicate with the OCI and will deploy the Aviatrix Gateway. Following output shows the process of creating this transit gateway.

#### Aviatrix Controller Deploying Transit Gateway in OCI

[21:42:57] Starting to create OCI GW OCI-Transit-GW-Ashburn.  
[21:42:58] Connected to Oracle OCI.  
[21:42:58] Deploying virtual machine…  
[21:44:32] Deploy virtual machine done.  
[21:44:32] Configure virtual machine.  
[21:44:33] License check is complete.  
[21:44:33] Added GW info to Database.  
[21:44:35] OCI-Transit-GW-Ashburn AVX SQS Queue created.   
[21:44:35] Create message queue done.  
[21:44:35] Initializing GW…..  
[21:45:06] Copy configuration to GW OCI-Transit-GW-Ashburn done.  
[21:45:06] Copy new software to GW OCI-Transit-GW-Ashburn done.  
[21:45:06] Copy /etc/cloudx/cloudx_code_file.json.enc to GW OCI-Transit-GW-Ashburn done.  
[21:45:06] Copy /etc/cloudx/cloudx_code_key_file.txt to GW OCI-Transit-GW-Ashburn done.  
[21:45:06] Copy scripts to GW OCI-Transit-GW-Ashburn done.  
[21:45:06] Copy sdk to GW OCI-Transit-GW-Ashburn done.  
[21:45:06] Copy libraries to GW OCI-Transit-GW-Ashburn done.  
[21:45:06] Installing software ….  
[21:45:06] Issuing certificates….  
[21:45:06] Issue certificates done  
[21:45:15] GW software started.  
[21:45:29] Software Installation done.

You can now login to OCI console and notice the Aviatrix Transit GW instance deployed in the Finance Compartment or Department.

![Aviatrix Transit Gateway Deployed in OCI](http://107.23.205.221/wp-content/uploads/2019/10/screen-shot-2019-10-16-at-9.48.28-pm-1.png?w=942)Aviatrix Transit Gateway Deployed in OCI

Following output shows the instance detail and other information directly gathered from the OCI console. 

Instance Information   
**Availability Domain:** RGRl:US-ASHBURN-AD-2   
**Image:**[Published Image: aviatrix_gateway_0415_1017_20190820](https://console.us-phoenix-1.oraclecloud.com/a/compute/images/ocid1.image.oc1..aaaaaaaavzvczf3r7uljpp7qv7fycifekheg2lvkxdyattcsja2rbeliqilq)   
**Fault Domain:** FAULT-DOMAIN-2   
**OCID:** …dsmska [ShowCopy](void\(0\);)   
**Region:** iad   
**Launched:** Thu, 17 Oct 2019 04:43:00 UTC   
**Shape:** VM.Standard2.2   
**Compartment:** shahzadali (root)/Finance-Compartment   
**Virtual Cloud Network:**[OCI-Transit-VCN-Ashburn](https://console.us-phoenix-1.oraclecloud.com/networking/vcns/ocid1.vcn.oc1.iad.aaaaaaaa22xocg2ng7atz7lxzehr2rxubvghkotxmja4qnyf2wdfuk3yoaca)   
**Launch Mode:** NATIVE   
**Maintenance Reboot:** –   
Primary VNIC Information   
**Private IP Address:** 10.111.0.2   
**Internal FQDN:** av-gw-oci-transit-gw-ashburn…[ShowCopy](void\(0\);)   
**Public IP Address:** 150.136.206.183   
**Subnet:**[OCI-Transit-VCN-Ashburn-public-subnet](https://console.us-phoenix-1.oraclecloud.com/networking/vcns/ocid1.vcn.oc1.iad.aaaaaaaa22xocg2ng7atz7lxzehr2rxubvghkotxmja4qnyf2wdfuk3yoaca/subnets?jt=listing)   
**Network Security Groups:**[aviatrix-security-group](https://console.us-phoenix-1.oraclecloud.com/networking/vcns/ocid1.vcn.oc1.iad.aaaaaaaa22xocg2ng7atz7lxzehr2rxubvghkotxmja4qnyf2wdfuk3yoaca/network-security-groups/ocid1.networksecuritygroup.oc1.iad.aaaaaaaahskxirnrmhzzxvu2f7dy6p2fkj42r6btz6mmbpdqtny4cr3433pa) This instance’s traffic is controlled by its firewall rules in addition to the associated [Subnet’s](https://console.us-phoenix-1.oraclecloud.com/networking/vcns/ocid1.vcn.oc1.iad.aaaaaaaa22xocg2ng7atz7lxzehr2rxubvghkotxmja4qnyf2wdfuk3yoaca/subnets?jt=listing) security lists and the VNIC’s network security groups. Launch Options   
**NIC Attachment Type:** VFIO   
**Firmware:** UEFI_64   
**Remote Data Volume:** PARAVIRTUALIZED   
**Boot Volume Type:** PARAVIRTUALIZED

![Aviatrix Transit Gateway Instance Details in OCI](http://107.23.205.221/wp-content/uploads/2019/10/image-15.png?w=971)Aviatrix Transit Gateway Instance Details in OCI

Important point we would like to highlight that in order to get all that information, one does not really need to login to OCI console. All this information is also available from the Aviatrix Controller UI itself. This is great operational benefit because now operators don’t need to worry about learning different clouds and their constructs. 

### Aviatrix Spoke VCN Deployment in OCI

At this point the OCI Transit GW is deployed. The next step is to create an OCI VCN and then deploy Spoke GW inside the Spoke-VCN. 

Once again Aviatrix Controller is used to deploy these constructs. Following screen shot shows the VCN (shown as VPC) creation in the region of your choice with the CIDR that you planned for this VCN.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-16.png?w=637)  


### Aviatrix Spoke Gateway Deployment in OCI

After the Spoke-VCN was created, simplified controller UI is used to deploy the Aviatrix Spoke GW as shown in the screen shot below.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-17.png?w=786)

Following output from Aviatrix Controller shows the process of deploying the Aviatrix Spoke GW inside the Spoke-VCN

[21:58:12] Starting to create OCI GW OCI-Spoke-GW1-Ashburn.  
[21:58:12] Connected to Oracle OCI.  
[21:58:12] Deploying virtual machine…  
[21:59:46] Deploy virtual machine done.  
[21:59:46] Configure virtual machine.  
[21:59:47] License check is complete.  
[21:59:47] Added GW info to Database.  
[21:59:49] OCI-Spoke-GW1-Ashburn AVX SQS Queue created.   
[21:59:49] Create message queue done.  
[21:59:49] Initializing GW…..  
[22:00:20] Copy configuration to GW OCI-Spoke-GW1-Ashburn done.  
[22:00:20] Copy new software to GW OCI-Spoke-GW1-Ashburn done.  
[22:00:20] Copy /etc/cloudx/cloudx_code_file.json.enc to GW OCI-Spoke-GW1-Ashburn done.  
[22:00:20] Copy /etc/cloudx/cloudx_code_key_file.txt to GW OCI-Spoke-GW1-Ashburn done.  
[22:00:20] Copy scripts to GW OCI-Spoke-GW1-Ashburn done.  
[22:00:20] Copy sdk to GW OCI-Spoke-GW1-Ashburn done.  
[22:00:20] Copy libraries to GW OCI-Spoke-GW1-Ashburn done.  
[22:00:20] Installing software ….  
[22:00:21] Issuing certificates….  
[22:00:21] Issue certificates done  
[22:00:28] GW software started.  
[22:00:42] Software Installation done.

### Enable Aviatrix ActiveMesh For Aviatrix OCI Transit and Spoke Gateways

It is best practice to enable [Aviatrix ActiveMesh](https://docs.aviatrix.com/HowTos/activemesh_faq.html) on the Transit and Spoke Gateway. ActiveMesh greatly enhances the availability and performance of the Network inside the Cloud. 

Go to Gateway section in the Aviatrix Controller (AVX-CTRL) to enable it.

AVX-CTRL –> Gateway –> Enable ActiveMesh Mode [Info](https://docs.aviatrix.com/HowTos/gateway.html#activemesh-mode)

### Attach AVX-Spoke GW to AVX-Transit GW

At this point the Aviatrix Transit and Spoke GWs are deployed in this respective VCNs. Here we will attach the Spoke GW to Transit GW. This step will build an encrypted tunnel between these two gateway. It is extremly simple and one click operations without operators worrying about knowing the source/dest IP, IPSec protocols or IKE details. All of this is automatically done by the Aviatrix Controller with just a single click.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-18.png?w=777)

### OCI Transit VCN and Transit GW Routing Tables

One of the great advantages of using Aviatrix is that one does not need to login to OCI, AWS or GCP Cloud Consoles to gather this information. The Aviatrix Controller will also provide the relevant information that greatly improves the day2 operations.

Following screen shots show the routing tables from VCNs and inside the Aviatrix Transit and Spoke Gateways.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-20.png?w=759)OCI Transit Gatewyay showing state is up and connected to OCI-Spoke GW. Notice the ActiveMesh HA mode which shows that all the Transit and Spoke GWs are running in Active/Active mode with ECMP enabled between them. ![](http://107.23.205.221/wp-content/uploads/2019/10/image-25.png?w=900)The OCI Transit VPC Route Table is Empty because all routing is done by the Transit-GW ![](http://107.23.205.221/wp-content/uploads/2019/10/image-21.png?w=1024)This outout show the Transit Gateway routing table. Notice that the Spoke routes are automatically added and pointing towards the OCI-Spoke-GW tunnel.

### OCI Spoke VCN and Spoke GW Routing Tables

Here we can see the routing table details from the Spoke VCN and Spoke GW point of view.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-19.png?w=951)Spoke Gateway tunnel us up. It also shows the CIDRs it is advertising to Transit/Hub GW for end-to-end routing purposes. ![](http://107.23.205.221/wp-content/uploads/2019/10/image-22.png?w=571)This is the Spoke-VCN private routing table. Aviatrx controller created two routing tables inside the VCN. One is private (wihtout the default route) and second is default route table (shown in the next screen shot with the default route in there). Aviatrix controller also added RFC1918 routes pointing towards the OCI-Spoke-GW1.  ![](http://107.23.205.221/wp-content/uploads/2019/10/image-23.png?w=702)This is the default routing table that has 0.0.0.0/0 route in it to route traffic towards Internet. This route is needed to build the tunnle between Transit and Spoke GWs ![Spoke GW routing table](http://107.23.205.221/wp-content/uploads/2019/10/image-24-1.png?w=900)Spoke GW routing table

At this point the OCI setup is complete. In the next step we will peer OCI and GCP transit networks to establish connectivity between multiple clouds.

### Transit Peering Between OCI and GCP Transit Gateways

Aviatrix provides a common cloud architecture and operaions cabalities that allows operators and architects to build multi-cloud archtecture without worrrying about the underlying constructs. 

In order to achieve the initial business objective, now we will peer OCI and GCO together. This will allow applications in either side of the cloud to have true multi-cloud connectivity. 

Login to Aviatrix controller and under “Transit Peering” select the Transit Gateways in both Clouds respectively and then connect.

![](http://107.23.205.221/wp-content/uploads/2019/10/image-26.png?w=601)  


Following output shows that both Clouds are connected in true multi-cloud fashion within a minute. 

![](http://107.23.205.221/wp-content/uploads/2019/10/image-27.png?w=1024)After about a minutes the transit peering comes UP

### Multi-Cloud Connectivty Testing

We have deployed following topology for the multi-cloud connectivity. We will perform a ping test from source Test-VM in GCP towards Test-VM in OCI behind Spoke-VCN-GW

![](http://107.23.205.221/wp-content/uploads/2019/10/image-28.png?w=815)

  * gcp-vm – 10.76.1.2
  * gcp-spoke
  * gcp-transit-gw
  * oci-transit-gw
  * oci-spoke
  * oci-vm – 10.112.128.2

![](http://107.23.205.221/wp-content/uploads/2019/10/image-29.png?w=674)Traceroute from GCP Test VM to OCI-Test VM ![](http://107.23.205.221/wp-content/uploads/2019/10/image-30.png?w=503)Ping from GCP Test VM to OCI-Test VM

## Conclusion

Aviatrix allows a common network topology across multiple clouds. This makes the enterprise network and security deployments seamless. There are no surprises and IT admins/operators does not need to know the underlying artifacts of various clouds.
