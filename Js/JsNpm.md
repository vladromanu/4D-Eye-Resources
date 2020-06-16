Table of contents
[TOC]

### init
```npm init``` -- creates the package.json

Generate it without having it ask any questions:
```npm init -y```

### install
```npm install```

### run dev
```npm run dev``` 
File: `package.json`
```
"scripts": {
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
}
```

### run prod
```npm run prod```
File: `package.json`
```
"scripts": {
    "prod": "npm run production",
    "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_moduleslaravel-mix/setup/webpack.config.js"
}
```

### run watch
```npm run watch```
File: `package.json`
```
"scripts": {
    "watch": "npm run development -- --watch",
    "watch-poll": "npm run watch -- --watch-poll"
}
```