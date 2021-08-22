
# Takeaways from Laravel App Tutorial     

Some lessons learned from taking the "Build a PHP (Laravel) and MySQL Flexible Server (Preview) app in Azure App Service"

https://docs.microsoft.com/en-us/azure/mysql/flexible-server/tutorial-php-database-app#deploy-to-azure 


Lessons Learned: 
#### Start by cloning your repo and run your app locally 
```
git clone https://github.com/Azure-Samples/laravel-tasks

cd laravel-tasks
composer install

.env
APP_ENV=local
APP_DEBUG=true
APP_KEY=

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=sampledb
DB_USERNAME=root
DB_PASSWORD=<root_password>

php artisan migrate

php artisan key:generate

php artisan serve
```

#### Create the resouce group
```az group create --name laravel-project --location eastus```

#### Create the mysql flexible server  
```az mysql flexible-server create  --resource-group laravel-project --public-access  X.X.X.X```

#### Add the firewall rule
```
az mysql flexible-server firewall-rule create --name allanyAzureIPs --server <mysql-server-name> --resource-group myResourceGroup --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0
```

#### Log into the new DB and create a user for the app
```
mysql -u <admin-user> -h <mysql-server-name>.mysql.database.azure.com -P 3306 -p

CREATE USER 'phpappuser' IDENTIFIED BY 'MySQLAzure2020';
GRANT ALL PRIVILEGES ON sampledb.* TO 'phpappuser';
```

#### Configure .env
```
APP_ENV=production
APP_DEBUG=true
APP_KEY=

DB_CONNECTION=mysql
DB_HOST=<mysql-server-name>.mysql.database.azure.com
DB_DATABASE=sampledb
DB_USERNAME=phpappuser
DB_PASSWORD=MySQLAzure2017
MYSQL_SSL=true
```

#### Update `config/database.php` to configure TLS/SSL certificate
```
'mysql' => [
    ...
    'sslmode' => env('DB_SSLMODE', 'prefer'),
    'options' => (env('MYSQL_SSL') && extension_loaded('pdo_mysql')) ? [
        PDO::MYSQL_ATTR_SSL_KEY    => '/ssl/DigiCertGlobalRootCA.crt.pem',
    ] : []
],
```

#### Test the app locally with the prod env
```
php artisan migrate --env=production --force

php artisan key:generate --env=production --force

php artisan serve --env=production
```

#### Store the changes
```
git add .
git commit -m "database.php updates"
```

## Create a deployment user
```az webapp deployment user set --user-name MyUserName```

## Create the app service plan 
```az appservice plan create --name myAppServicePlan --resource-group laravel-project --sku F1 --is-linux```

## Create the webapp
```az webapp create --resource-group laravel-project --plan myAppServicePlan --name <app-name> --runtime "PHP|7.3" --deployment-local-git```

## Configure databases anv 
```az webapp config appsettings set --name <app-name> --resource-group laravel-project --settings DB_HOST="<mysql-server-name>.mysql.database.azure.com" DB_DATABASE="sampledb" DB_USERNAME="phpappuser" DB_PASSWORD="MySQLAzure2017" MYSQL_SSL="true"```

#### In `config/database.php`
```
'mysql' => [
    'driver'    => 'mysql',
    'host'      => env('DB_HOST', 'localhost'),
    'database'  => env('DB_DATABASE', 'forge'),
    'username'  => env('DB_USERNAME', 'forge'),
    'password'  => env('DB_PASSWORD', ''),
    ...
],
```

## Set up the env key
```
php artisan key:generate --show

az webapp config appsettings set --name <app-name> --resource-group laravel-project --settings APP_KEY="<output_of_php_artisan_key:generate>" APP_DEBUG="true"
```

## Change Site ROOT 
https://docs.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-windows#change-site-root

! Attention, choose either linux or windows
```
az resource update --name web --resource-group laravel-project --namespace Microsoft.Web --resource-type config --parent sites/<app-name> --set properties.virtualApplications[0].physicalPath="site\wwwroot\public" --api-version 2015-06-01
```

## Push to Azure from git
```
git remote add azure <deploymentLocalGitUrl-from-create-step>

git push azure master
```


Browse to http://<app-name>.azurewebsites.net and add a few tasks to the list.

https://<app-name>.scm.azurewebsites.net 
