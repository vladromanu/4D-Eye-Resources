Table of contents
[TOC]

### Seting up K8s alias for Powershell 
https://github.com/shanoor/kubectl-aliases-powershell

You can directly download the kubectl_aliases.ps1 file and save it to PowerShell profile directory: $Home\Documents\WindowsPowerShell\ then run this command to edit your profile.ps1:

```
'. $Home\Documents\WindowsPowerShell\kubectl_aliases.ps1' | Out-File $PROFILE.CurrentUserAllHosts -Encoding ascii -Append
```

### Setting up K8s alias for CMD
https://pascalnaber.wordpress.com/2017/11/09/configure-alias-on-windows-for-kubectl/ 

1. Create a directory in c:\program files\ called k8s
2. Create a cmd file and save it as alias.cmd in c:\program files\k8s\:
```
@echo off
doskey k=kubectl $*
```
3. Add an entry to the registry which calls this alias.cmd file everytime when a command window is opened. This can be done with the following file. Save it as addtoregistry.reg:
```
Windows Registry Editor Version 5.00
 
[HKEY_CURRENT_USER\Software\Microsoft\Command Processor]
"AutoRun"="c:\\\"Program Files\"\\k8s\\alias.cmd"
```