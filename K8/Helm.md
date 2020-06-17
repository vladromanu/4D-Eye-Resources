Table of contents
[TOC]

## Installation
https://helm.sh/docs/intro/install/

1. download desired version https://github.com/helm/helm/releases (linux)
    ```
    wget https://get.helm.sh/helm-v2.16.9-linux-amd64.tar.gz
    ```

2. Unpack it 
    ```
    tar -zxvf helm-v3.0.0-linux-amd64.tar.gz
    ```
3. Find the helm binary in the unpacked directory, and move it to its desired destination 
    ```
    sudo mv linux-amd64/helm /usr/local/bin/helm
    rm helm-v3.0.0-linux-amd64.tar.gz
    rm -rf ./helm-v3.0.0-linux-amd64/
    ```

4. Run
    ```
    helm
    helm version
    ```

5. Install a package 
    https://github.com/helm/charts/tree/master/stable

    Run first:
    ```
    helm repo update
    ```

    Fix priviledges: https://youtu.be/NEMLH4sy5nA?t=718 


    Example: https://github.com/helm/charts/tree/master/stable/mysql 

    ```
    helm install --name my-release stable/mysql
        --set mysqlPassword=123
    ```

    To uninstall/delete the my-release deployment:
    ```
    helm delete --purge my-release
    ```

    Check at:
    ```
    kubectl get po
    kubectl get svc
    ```

**BEST FOR PROMETHEUS AND GRAFANA INSTALL IN K8s CLUSTER**

### Prometheus
https://github.com/helm/charts/tree/master/stable/prometheus

### Prometheus + Grafana + Alertmanager
https://github.com/helm/charts/tree/master/stable/prometheus-operator

```
helm install --name monitoring --namespace monitoring stable/prometheus-operator
kubectl get all -n monitoring
```
Use the `service/monitoring-prometheus-oper-prometheus ClusterIP`

Convert it in a load balancer
`kubectl edit - monitoring service/monitoring-prometheus-oper-prometheus`
[editor] + save
https://youtu.be/QGwryT0sAuQ?t=627 

```
kubectl get all -n monitoring
```
get the service `EXTERNNAL-IP port 9090`
/graph


### Grafana
https://github.com/helm/charts/tree/master/stable/grafana

