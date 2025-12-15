---
title: "Difference Between RDS, AWS Aurora and MySQL"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "June 23, 2025", "Cybersecurity", "britive", "Previous\u00a0post Difference Between RDS, AWS Aurora and MySQL", "Next\u00a0post Kubernetes Just in Time Access"]
tags: ["Shahzad Ali", "June 23, 2025", "Cybersecurity", "britive", "Previous\u00a0post Difference Between RDS, AWS Aurora and MySQL", "Next\u00a0post Kubernetes Just in Time Access"]
original_url: https://netjoints.com/britive-access-broker-troubleshooting-tips-and-best-practices-for-mysql-database/
---

# 

## Best Practices

To ensure secure, reliable, and efficient use of Britive Access Broker, please follow the best practices outlined below. These guidelines are designed to support both development environments and help maintain system integrity. 

#### 1\. **Script Management and Collaboration**

  * **Engage the Britive Team** : For any modifications to existing scripts or the creation of new ones, consult with the Britive Support or Customer Success teams. Their expertise ensures alignment with platform capabilities and security standards.



* * *

#### **2\. Database Credentials Handling**

  * **Testing Environments** : While hardcoding the database service account root password may be acceptable for testing, this approach is **not recommended** for production or pre-production environments.
  * **Production Environments** : Use secure methods such as: 
    * Secrets Manager or Vault for dynamic credential retrieval.
    * Environment variables for local development or staging.



* * *

#### **3\. Access Broker Availability**

  * **Pre-Execution Check** : Always verify that the Access Broker service is active and running before executing any scripts.



* * *

#### **4\. Configuration Management**

  * **YAML File Updates** : If changes are made to the Access Broker YAML configuration file: 
    * Ensure all profiles are checked in before restarting the Access Broker.
    * Failure to do so may result in the broker entering an inconsistent state and losing track of checked-out profiles.



* * *

#### **5\. Database User Management**

  * **Preferred Method – DROP vs DELETE** : 
    * Avoid using `DELETE` for MySQL DB users, as it can lead to inconsistent states and require manual cleanup.
    * Use the `DROP USER` command instead, which ensures proper removal and avoids residual issues that prevent re-creation of the user.



* * *

#### **6\. Documentation and Knowledge Sharing**

  * **Internal Wiki/Confluence** : 
    * Document final scripts with clear instructions and screenshots.
    * Include the locations of: 
      * Log directories
      * Configuration files
      * Script files
    * This helps team members perform basic troubleshooting and understand the system layout.



* * *

#### **7\. High Availability Consideration**

  * **Demo Environments** : Consider deploying an additional Access Broker instance even in demo environments. This provides redundancy—if one broker fails, the second can take over seamlessly.



  
  


## Basic Troubleshooting Tips

#### In case user is deleted from the DB use following commands to flush or cleanup the user 
    
    
    SELECT * FROM mysql.db WHERE user = 'shahzadali';
    SELECT * FROM mysql.tables_priv WHERE user = 'shahzadlai';
    SELECT * FROM mysql.columns_priv WHERE user = 'shahzadali';
    SELECT * FROM mysql.procs_priv WHERE user = 'shahzadali';
    7:01
    DELETE FROM mysql.db WHERE user = 'shahzadali';
    7:02
    

#### Restart Broker Service
    
    
    /opt/britive-broker/config$ sudo journalctl -u britive-broker
    -- Logs begin at Tue 2025-04-29 11:07:54 UTC, end at Tue 2025-04-29 19:02:45 UTC. --
    Apr 29 18:16:25 ip-10-100-12-167 systemd[1]: Started Britive Agent service.
    Apr 29 18:28:28 ip-10-100-12-167 systemd[1]: Stopping Britive Agent service...
    Apr 29 18:28:30 ip-10-100-12-167 systemd[1]: britive-broker.service: Succeeded.
    Apr 29 18:28:30 ip-10-100-12-167 systemd[1]: Stopped Britive Agent service.
    Apr 29 18:28:30 ip-10-100-12-167 systemd[1]: Started Britive Agent service.

#### Log location 
    
    
    /var/log/britive-broker.log

#### SQL Commands
    
    
    mysql > create user 'shahzadali'@'%' identified by 'Abc234!' ;
    DROP USER 'shahzadali'@'%';

Britive-Readonly-MySQL-Checkout.sh
    
    
    #!/bin/bash
    
    MYSQL_USER=${user}
    MYSQL_USER="${MYSQL_USER%%@*}"
    MYSQL_USER="${MYSQL_USER//[^a-zA-Z0-9]/}"
    MYSQL_HOST=${host}
    MYSQL_URL=${dburl}
    SECRET=${secret}
    
    finish () {
      exit "$1"
    }
    
    password=$(tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 16)
    
    db_user="root"
    db_password="P@ssw0rd123!"
    
    tmp_conf=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 13)
    
    cat <<EOF > "$tmp_conf".cnf
    [client]
    user = "$db_user"
    password = "$db_password"
    host = "access-broker-poc.shahzadalirds.us-east-1.rds.amazonaws.com"
    EOF
    
    mysql \
      --defaults-extra-file="$tmp_conf".cnf \
      -e "DROP USER IF EXISTS '${MYSQL_USER}'@'${MYSQL_HOST}';" || finish 1
    
    mysql \
      --defaults-extra-file="$tmp_conf".cnf \
      -e "CREATE USER '${MYSQL_USER}'@'${MYSQL_HOST}' IDENTIFIED BY '${password}';" || finish 1
    
    mysql \
      --defaults-extra-file="$tmp_conf".cnf \
      -e "GRANT SELECT, EXECUTE, SHOW VIEW ON systemdb.* TO '${MYSQL_USER}'@'${MYSQL_HOST}';" || finish 1
    
    rm -f "$tmp_conf".cnf
    
    echo "$MYSQL_USER"
    echo "$password"
    echo "mysql -h$MYSQL_URL -u$MYSQL_USER -p\"$password\""
    
    finish 0

Britive-Readonly-MySQL-Checkin.sh
    
    
    #!/bin/bash
    
    MYSQL_USER=${user}
    MYSQL_USER="${MYSQL_USER%%@*}"
    MYSQL_USER="${MYSQL_USER//[^a-zA-Z0-9]/}"
    MYSQL_HOST=${host}
    MYSQL_URL=${dburl}
    SECRET=${secret}
    
    finish () {
      exit "$1"
    }
    
    db_user="root"
    db_password="P@ssw0rd123!"
    
    tmp_conf=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 13)
    
    cat <<EOF > "$tmp_conf".cnf
    [client]
    user = "$db_user"
    password = "$db_password"
    host = "access-broker-poc.shahzadalirds.us-east-1.rds.amazonaws.com"
    EOF
    
    mysql \
      --defaults-extra-file="$tmp_conf".cnf \
      -e "DROP USER IF EXISTS '${MYSQL_USER}'@'${MYSQL_HOST}';" || finish 1
    
    rm -f "$tmp_conf".cnf
    
    finish 0
