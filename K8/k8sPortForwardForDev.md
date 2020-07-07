#Kubernetes - Development access to private services in DEV 
For the cases when developers need access on their local machine to other services which are private to the cluster (No Ingress access is defined, the service is used internally by other services in the same cluster based on the service name), we have defined a process to allow access on the local machine to the remote service in DEV environment by using Port Forwarding functionality of Kubernetes.

***NOTE**: The recommended way to setup the port forward rule is to do it at service level (and not pod level) in order not to face issues due to the pod being destroyed ( due to a deployment or any other automatic action from K8S).

**QA Access:**

Since QA teams most likely doesn’t have access to Kubernetes clusters and usually they need access to Swagger UI, we will provide access to it using rules in OAuth Proxy.

**PROs:**

The service will remain private to the cluster.

There is no need for additional VPN / Proxy access.

No need to start locally containers/pods with the services needed (which might have external dependencies: databases, caches, IP white listing etc.)

**CONs:**

The developer needs to setup on a need basis manually the fort forward rules (Platform engineering suggested this could be automated with a script to be executed locally by the developer).

If the port forward rule is at POD level, the POD might be destroyed by a deployment or an automatic action from the K8S cluster. This will result in an additional action from the developer to get the new pods and to setup again the rule. 

**How to**

Go to the Kubernetes cluster in DEV where the needed service is deployed to retrieve the Service names or POD names.

```
PS C:\Users\Costel> kubectl get service
NAME                                              TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
webbeds-roomtype-content                          ClusterIP   10.0.110.169   <none>        80/TCP           8d
webbedsid-hotels                                  ClusterIP   10.0.243.58    <none>        80/TCP           37d

PS C:\Users\Costel> kubectl get pods
NAME                                                              READY   STATUS             RESTARTS   AGE
webbeds-roomtype-content-7f87dcf577-sf6fm                         1/1     Running            0          26m
webbedsid-hotels-696cf4895c-qttx5                                 1/1     Running            0          45h
```

Choose the SERVICE name (or POD name) needed on your development machine and run the port forward command

```
kubectl port-forward service/SERVICE_NAME LOCAL_MACHINE_PORT:SERVICE_PORT

kubectl port-forward POD_NAME LOCAL_MACHINE_PORT:POD_PORT
```

```
PS C:\Users\Costel> kubectl port-forward service/webbeds-roomtype-content 7000:80
Forwarding from [::1]:7000 -> 80
Forwarding from 127.0.0.1:7000 -> 80
Handling connection for 7000

PS C:\Users\Costel> kubectl port-forward webbeds-roomtype-content-7f87dcf577-sf6fm 7000:80
Forwarding from 127.0.0.1:7000 -> 80
Forwarding from [::1]:7000 -> 80
Handling connection for 7000
```