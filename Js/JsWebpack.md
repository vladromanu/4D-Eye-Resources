Table of contents 
[TOC]

### Babel loader 
Install: `npm install --save-dev babel-loader @babel/core`
https://babeljs.io/en/setup#installation

File: `webpack.config.js`
```
var path = require('path');
 module.exports = {
     entry: path.join(__dirname, 'src', 'main.js'),
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: path.join(__dirname, 'src'),
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
```


### Uglify plugin
Install: `npm install uglify-js` // -g for global
https://www.npmjs.com/package/uglify-js

File: `webpack.config.js`
```
const path = require('path');
const webpack = require('webpack');
 
const uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    dead_code: true,
})
 
module.exports = {
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [uglifyJSPlugin]
}
```
`beautify`: false so that the code of our generated bundle is not formatted, which makes it harder to read for malicious users. We also specified 
`dead_code`: true which will remove all the dead code from the bundle which can be useful when setting up dynamic code branching and can also help reduce the size of the bundle.

Example: 
`uglifyjs --compress --mangle -- input.js`


### SASS Loader
`npm install sass-loader sass webpack --save-dev`
https://webpack.js.org/loaders/sass-loader/ 

File: `app.js`
```
import './style.scss';
```

File: `style.scss`
```
$body-color: red;

body {
  color: $body-color;
}
```

File: `webpack.config.js`
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
```