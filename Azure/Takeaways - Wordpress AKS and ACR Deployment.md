
# Takeaways from Wordpress Tutorial     

Some lessons learned from taking the "Deploy WordPress app on AKS with Azure Database for MySQL - Flexible Server"

https://docs.microsoft.com/en-us/azure/mysql/flexible-server/tutorial-deploy-wordpress-on-aks#code-try-12


Lessons Learned: 
#### You need to create a resource group first for all 
```az group create --name wordpress-project --location eastus```

#### You need to add a cluster in the resource group 
```az aks create --resource-group wordpress-project --name myAKSCluster --node-count 1 --generate-ssh-keys```

#### to connect to the cluter locally ( .kube/config.yaml )
```az aks get-credentials --resource-group wordpress-project --name myAKSCluster```

#### Create an azure MySql database 
```az mysql flexible-server create --public-access X.X.X.X --resource-group wordpress-project --admin-user LeAdmin --admin-password LePassword```

#### Create a folder structure like /project  with /project/public and /project/Dockerfile
```
FROM php:7.2-apache
COPY public/ /var/www/html/
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli
```

#### Build the docker image
```docker build --tag myblog:latest .```

## To use the Azure Container Registry ( ACR )
- create the acr for the project ```az acr create --resource-group wordpress-project --name wordpressvldacr --sku Basic```

- login with that acr ```az acr login --name wordpressvldacr```

- link the cluster with the acr ```az aks update -n myAKSCluster -g wordpress-project --attach-acr wordpressvldacr```

- tag the local image ```docker tag myblog wordpressvldacr.azurecr.io/myblog:latest```

- push the image to the ACR  ```docker push wordpressvldacr.azurecr.io/myblog```

- show the list of loaded images in the ACR  ```az acr repository list --name wordpressvldacr --output table```

#### You need a Kubernetes manifest file and you apply it with 
```kubectl apply -f mywordpress.yaml``` 



