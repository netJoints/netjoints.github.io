---
title: "Sumo Logic Inbound HTTPS Webhook Configuration"
date: 2025-12-14
author: Unknown
categories: ["Shahzad Ali", "August 28, 2025", "Cybersecurity", "Previous\u00a0post Sumo Logic\u00a0Inbound HTTPS Webhook Configuration", "Next\u00a0post GKE Kubernetes K8S Demo"]
tags: []
original_url: https://netjoints.com/britive-access-broker-add-user-to-local-admin-group-jit/#respond
---

For this configuration, we will save the Windows PowerShell script in the UI itself. The other option is to save it on the Windows jumbox machine and calling it from the UI. 

![](../../media/images/britive-access-broker-add-user-to-local-admin-grou_image-10.png)

There is one resource assigned to this Resource Type

![](../../media/images/britive-access-broker-add-user-to-local-admin-grou_image-11.png)

Under Resource Type, add following fields

![](../../media/images/britive-access-broker-add-user-to-local-admin-grou_image-14.png)

## Checkout PowerShell Script

Under Permissions is where PowerShell Script should be added. This will be executed upon profile checkout and checkin.

![](../../media/images/britive-access-broker-add-user-to-local-admin-grou_image-16.png)

### Complete PowerShell Checkout Routing
    
    
    # -------------------------------
    # Local Admin Provisioning/Checkout Example
    # -------------------------------
    
    $adminUser     = $env:admin_user
    $adminPassword = $env:admin_password
    $userEmail     = $env:user_email
    $resourceName  = $env:ResourceName
    
    $username = $userEmail.Split("@")[0]
    $username = $username.Substring(0, [Math]::Min($username.Length, 20))
    
    # Optional: Customize these
    $fullName    = $userEmail
    $description = "Local admin account created"
    
    # Log file setup
    $logFile = "logs\${resourceName}.log"
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    # Password generator (no System.Web, safe characters only)
    function Generate-RandomPassword {
        $length = 12
        $validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&+=_'
        $passwordChars = @()
        $rand = New-Object System.Random
    
        for ($i = 0; $i -lt $length; $i++) {
            $index = $rand.Next(0, $validChars.Length)
            $passwordChars += $validChars[$index]
        }
    
        return -join $passwordChars
    }
    
    try {
        # Generate secure password
        $userPassword = Generate-RandomPassword
        $securePassword = ConvertTo-SecureString $userPassword -AsPlainText -Force
    
        # Check if user already exists
        $existingUser = Get-LocalUser -Name $username -ErrorAction SilentlyContinue
    
        if ($existingUser) {
            Write-Host "User '$username' already exists. Rotating password and ensuring admin rights..."
    
            # Update password
            $existingUser | Set-LocalUser -Password $securePassword
    
            # Ensure user is in Administrators group
            $isAdmin = Get-LocalGroupMember -Group "Administrators" -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq $username }
            if (-not $isAdmin) {
                Add-LocalGroupMember -Group "Administrators" -Member $username
            }
    
            # Log and output
            Add-Content -Path $logFile -Value "$timestamp INFO: User '$username' existed. Password rotated and ensured admin rights."
            Write-Host ""
            Write-Host "==============================================="
            Write-Host "  Local Admin User Updated"
            Write-Host "==============================================="
            Write-Host ("{0,-14}: {1}" -f "Username", $username)
            Write-Host ("{0,-14}: {1}" -f "Password", $userPassword)
            Write-Host ("{0,-14}: {1}" -f "Resource", $resourceName)
            Write-Host "==============================================="
            Write-Host ""
        }
        else {
            Write-Host "Creating new local admin user '$username'..."
    
            # Create user
            New-LocalUser -Name $username -Password $securePassword -FullName $fullName -Description $description
    
            # Add to Administrators group
            Add-LocalGroupMember -Group "Administrators" -Member $username
    
            # Log and output
            Add-Content -Path $logFile -Value "$timestamp SUCCESS: Created local admin user '$username' with resource '$resourceName'."
            Write-Host ""
            Write-Host "==============================================="
            Write-Host "  Local Admin User Provisioned"
            Write-Host "==============================================="
            Write-Host ("{0,-14}: {1}" -f "Username", $username)
            Write-Host ("{0,-14}: {1}" -f "Password", $userPassword)
            Write-Host ("{0,-14}: {1}" -f "Resource", $resourceName)
            Write-Host "==============================================="
            Write-Host ""
            Write-Host "User '$username' created and added to Administrators group on this machine."
        }
    }
    catch {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Add-Content -Path $logFile -Value "$timestamp ERROR: $_"
        Write-Host "ERROR: $_"
    }

## Checkin PowerShell Script

![](../../media/images/britive-access-broker-add-user-to-local-admin-grou_image-17.png)

### Complete PowerShell Checkin Script
    
    
    # -------------------------------
    # Local Admin Checkin 
    # -------------------------------
    
    $userEmail    = $env:user_email
    $resourceName = $env:ResourceName
    
    # Replicate username logic from provisioning
    $username = $userEmail.Split("@")[0]
    $username = $username.Substring(0, [Math]::Min($username.Length, 20))
    
    try {
        # ---------------------------------------
        # Step1: Log off active session for this user
        # ---------------------------------------
        
        Write-Host ""
        Write-Host "Checking for active RDP sessions for user '$username'..."
    
        $sessions = query session 2>&1
    
        foreach ($line in $sessions) {
            # Skip empty or header lines
            if ($line -match "^( SESSIONNAME|>?)\s+USERNAME\s+ID") {
                continue
            }
    
            # Match username and extract session ID
            if ($line -match "^\s*>?\s*(\S+)?\s+($username)\s+(\d+)\s+") {
                $sessionId = $matches[3]
                Write-Host "Logging off session ID $sessionId for user $username..."
                logoff $sessionId
                Start-Sleep -Seconds 3
            }
        }
    
       
    
        # Step 2: Remove user from Administrators group if present
        Remove-LocalGroupMember -Group "Administrators" -Member $username -ErrorAction SilentlyContinue
    
        # Remove the local user account
        # Remove-LocalUser -Name $username -ErrorAction SilentlyContinue
    
        # Output summary
        Write-Host ""
        Write-Host "==============================================="
        Write-Host "  Local Admin User Deprovisioned"
        Write-Host "==============================================="
        Write-Host ("{0,-14}: {1}" -f "Username", $username)
        Write-Host ("{0,-14}: {1}" -f "Resource", $resourceName)
        Write-Host "==============================================="
        Write-Host ""
        Write-Host "User '$username' removed from Administrators group and deleted from this machine."
    }
    catch {
        Write-Host "An error occurred during check-in: $_"
    }

## Resource Definition

This resource is defined in the Resource Section 

![](../../media/images/britive-access-broker-add-user-to-local-admin-grou_image-12.png)

Leave the resource policy empty

![](../../media/images/britive-access-broker-add-user-to-local-admin-grou_image-13.png)

## Summary
