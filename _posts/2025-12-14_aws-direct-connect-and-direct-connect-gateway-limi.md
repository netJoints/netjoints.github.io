---
title: "Multi-Cloud vs Hybrid-Cloud Definition"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "January 21, 2020", "A single DXGW cannot attach with both Private and Transit VIF", "multi-cloud", "Previous\u00a0post Multi-Cloud vs Hybrid-Cloud Definition", "Next\u00a0post GCP Shared VPC Concepts"]
tags: []
original_url: https://netjoints.com/aws-direct-connect-and-direct-connect-gateway-limitations/#respond
---

## Direct Connect (DX)

  * DX is region specific offering 
    * It allows On-Prem physical locations to connect to a specific AWS region/location
  * DX supports max of 50 VIFs (including Private and Public) per physical connection
  * DX does not support Transit VIF for AWS-TGW connectivity



## Direct Connect Gateway (DXGW)

  * Only supports Private and Transit VIFs
    * DXGW mainly used to access private resources in VPCs 
  * Does not support public VIF
    * DXGW does not provide any benefit of Public Internet Connectivity 
  * VGW associated with a DXGW must be “attached” to a VPC
  * Does not support transitive routing or transit connectivity
    * VPC in Region-1 cannot directly communicate with VPC in Region-2
    * DX Location-1 cannot directly communicate with DX Location-2
  * Up to 30 DX physical connections can connect to one single DXGW for physical link redundancy purposes
    * In another words 30 DX locations/regions
  * DX supports max of 50 VIFs (for DXGW only Private and Transit VIFs are applicable)
    * It means one can have Max of 50 DXGW per physical DX link
    * But one DXGW can connect to max of 10 VPCs
    * It means Max of 500 VPCs (50 x 10 VPC) per physical DX link across accounts and regions



![](http://107.23.205.221/wp-content/uploads/2020/01/image-35.png?w=1024)

![](http://107.23.205.221/wp-content/uploads/2020/01/image-34.png?w=1024)

## DXGW with AWS-TGW Limitations

  * Transit VIF can only be attached to a DXGW
  * Only one Transit VIF for any AWS Direct Connect 1/2/5/10 Gbps connection
    * Less than 1G connections does not support Transit VIF
    * Max of 3 AWS-TGW can connect to one DXGW behind one Transit VIF
  * [ A single DXGW cannot attach with both Private and Transit VIF](https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html)
    * This could be a serious limitation for some customers
    * I think the underline assumption is that if a customer is alreadt using AWS-TGW then why would he want to use a private VIF attached to the same DXGW?



![](http://107.23.205.221/wp-content/uploads/2020/01/image-36.png?w=1024)

## DXGW without and with AWS-TGW Comparision

**DXGW without AWS-TGW**| **DXGW with AWS-TGW**  
---|---  
10 VPCs per DXGW| 3 TGWs per DXGW  
50 DXGW max (b/c of 50 Private VIF)| With Transit VIF only one DXGW is possible  
500 VPCs total| 5,000 VPCs per TGW  
15,000 VPC per DX physical link  
Private VIF supported on all Direct Connect connection types| Transit VIF supported only on dedicated or hosted connections of speed 1Gbps and above  
No additional charges| Additional charge for TGW data processing  
  
## References

https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-limits.html  
https://docs.aws.amazon.com/directconnect/latest/UserGuide/limits.html

## Credits

Abdul Rahim  
Kamran Habib  
Saad Mirza  
Hammad Alam
