Table of contents
[TOC]

**CheatSheet** https://kubernetes.io/docs/reference/kubectl/cheatsheet/

### Common commands
```
k config view 
k get namespace
```

### Switch context
```
k config set-context --current --namespace=content-and-mapping
```

### Setting up secrets 
```
k get secret
k get secret webbedsid-fake-secrets --output yaml
k apply -f .\wbid-fake-secrets-dev.yaml
k describe secret/webbedsid-fake-secrets
```

### Services
```
k get services
```

### Pods
```
k get pods 
k describe po nginx
k delete po nginx
```

##### Delete secret
```
k delete secret secret/webbedsid-fake-secrets
```

