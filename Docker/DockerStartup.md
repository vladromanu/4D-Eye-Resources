## Build the Docker Image:

#### Using default Dockerfile:
```
docker build -t webbeds/laravel-app .
```
#### From a file:
```
docker build -f Dockerfile.dev -t webbeds/laravel-app .
```

## Start the container:
```
docker run -it -d \
    -p 8080:80 \
    --name bookingcenter-web \
    --mount type=bind,source="$(pwd)",target=/app \
    -e APP_KEY=base64:cUPmwHx4LXa4Z25HhzFiWCf7TlQmSqnt98pnuiHmzgY= \
    webbeds/laravel-app
```

### Setting up ENV variables in build 
```
docker run -ti -p 8080:80 -e APP_KEY=base64:cUPmwHx4LXa4Z25HhzFiWCf7TlQmSqnt98pnuiHmzgY= -e APP_DIR= /properties webbeds/laravel-app
```

For windows prefix with `winpty` for terminal output depending on your GIT configuration.



### Laravel Extramile 
Before the first run execute command `composer update` on your machine.

Run to fetch all the app vendor dependencies /vendor
```
composer install
composer update
```

#### Run all Mix tasks CSS & JS
```
npm run dev
```
Run all Mix tasks and minify output
```
npm run production
```
#### Watching Assets For Changes

The npm run watch command will continue running in your terminal and watch all relevant files for changes. Webpack will then automatically recompile your assets when it detects a change:
```
npm run watch
```
This runs actions from webpack.mix.js like
```
mix.js('resources/js/app.js', 'public/js').sass('resources/sass/app.scss', 'public/css');
```
Do not forget to: 
```
cp .env.example .env
php artisan key:generate
```
Do not cache configurations. If already did, delete all files from `bootstrap/cache`

#### Run Laravel tests
```
php artisan test
php artisan test --group=feature
```
#### Run Testcafe tests

From the `/resources` folder
```
testcafe firefox tests/login-tests.js
testcafe firefox tests/search-tests.js
```