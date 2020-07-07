# Kubernetes Secrets 
Kubernetes Secrets let you store and manage sensitive information, such as passwords, OAuth tokens, and ssh keys. Storing confidential information in a Secret is safer and more flexible than putting it verbatim in a Pod definition or in a container image.

### How to create a secret
Using --from-literal
```
kubectl create secret generic {secret-name} -n {namespace} --from-literal=username=dev --from-literal=password=secretpass
```

Using --from-file
```
# Create files needed for the rest of the example.
echo -n 'dev' > ./username.txt
echo -n 'secretpass' > ./password.txt
```

```
kubectl create secret generic {secret-name} -n {namespace} --from-file=./username.txt --from-file=./password.txt 
```

### How to edit a secret 

```
kubectl edit secrets {secret-name}
```
Or using a yaml file (YAML values of secret data are encoded as base64 strings)

```
apiVersion: v1
kind: Secret
metadata:
  name: {secret-name}
type: Opaque
data:
  username: ZGV2
  password: c2VjcmV0cGFzcw==
```

```
kubectl apply -f .\secrets-dev.yaml
```

### How to list all existing secrets
```
kubectl get secrets
```

### How to view the description of a secret
```
kubectl describe secrets/{secret-name}
```