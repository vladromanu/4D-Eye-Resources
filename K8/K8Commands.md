Table of contents
[TOC]

### Common commands
```
k config view 
k get namespace
```

### Switch context
```
k config set-context --current --namespace=purchasing
```

### Setting up secrets 
```
k get secret
k apply -f .\wbid-fake-secrets-dev.yaml
k describe secret/webbedsid-fake-secrets
```

##### Delete secret
```
k delete secret secret/webbedsid-fake-secrets
```

