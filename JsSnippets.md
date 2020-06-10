Table of contents  
[TOC]

> **JAVASCRIPT Cheatsheet**
http://overapi.com/javascript

###ES 6 Class
```
class Bike{
  constructor(color, model) 
  {
    this.color= color;
    this.model= model;
  }
}
```

###IIFE (Immediately Invoked Function Expression)
A JavaScript function that runs as soon as it is defined.

```
(function () 
{// logic here })
();
```

###Closure
```
function User(name){  var displayName = function(greeting){
   console.log(greeting+' '+name);
  }
return displayName;
}var myFunc = User('Raj');myFunc('Welcome '); //Output: Welcome Raj
myFunc('Hello '); //output: Hello Raj
```
<a name="desc"></a>
###The Module Pattern
  Small unit of independent, reusable code. 1
```
ar myModule = (function() {
    'use strict';
 
    var _privateProperty = 'Hello World';
     
    function _privateMethod() {
        console.log(_privateProperty);
    }
     
    return {
        publicMethod: function() {
            _privateMethod();
        }
    };
}());
  
myModule.publicMethod();                    // outputs 'Hello World'   
console.log(myModule._privateProperty);     // is undefined      
protected by the module closure
myModule._privateMethod();                  // is TypeError protected by the module closure
```

these modules can have exported to the other JS files using the export keyword,
```
//myMOdule.js file
export default myModule;
```
modules can import to another JS file
```
//second.js file 
import myModule from ‘./myModule’;
```

###Hoisting
Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.
JavaScript only hoists declarations, not initialization.

Inevitably, this means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.
```
var Hoist;
console.log(Hoist);
Hoist = ’The variable Has been hoisted’;
```
```
console.log(Hoist);
var Hoist = ’The variable Has been hoisted’;
//output : undefined//
```

###Memoization ( Caching results )
Memoization is a programming technique that attempts to increase a function’s performance by caching its previously computed results. Because JavaScript objects behave like associative arrays, they are ideal candidates to act as caches.
```
const memoizedAdd = () => {
        let cache = {};
        return (value) => {
            if (value in cache) {
                console.log('Fetching from cache');
                return cache[value];
            } else {
                console.log('Calculating result');
                let result = value + 10;
                cache[value] = result;
                return result;
            }
        }
    }// returned function from memoizedAdd
const newAdd = memoizedAdd();
console.log(newAdd(9)); //output: 19 calculated
console.log(newAdd(9)); //output: 19 cached
```

###Asynchronous Js
In JavaScript Code Execution done By two separate ways:
  1. Browser JS Engine (popular V8 JS Engine)
  2. NodeJs V8 Engine
```
index.html
<script src='index.js'>           //default Synchronous
<script async src='index.js'>      //parse as Asynchronously 
<script defer src='index.js'>      //parse as deferred 
```
1. If synchronous `<script>` tag occurs, JS engine will download the code and execute that code and after that only parsing the below HTML code, generally Synchronous is a blocking script execution.
2. If Asynchronous `<script async>` tag occurs, while downloading the code JS engine will parse the HTML and once If JS code gets downloaded pause the parsing and back into the JS Code Execution, generally Asynchronous is a Non-blocking script execution.
3. If Asynchronous `<script defer>` tag occurs, JS Engine will parse the all HTML code and after that only executes the JS Code, 

###Callback
```
function greeting(name) {
  console.log('Hello ' + name);
}
function processUserInput(callback) {
    //var name = prompt('Please enter your name.');
    name = 'raja';
    callback(name);
}
processUserInput(greeting); //output Hello Raja
```

###Promises
The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. A promise represents the result of the asynchronous function. Promises can be used to avoid chaining callbacks. In JavaScript,

A Promise is in one of these states:
* pending: initial state, neither fulfilled nor rejected.
* fulfilled: meaning that the operation completed successfully.
* rejected: meaning that the operation failed.

```
var promise1 = new Promise(function(resolve, reject) {
    isDbOperationCompleted = false;
    if (isDbOperationCompleted) {
        resolve('Completed');
    } else {
        reject('Not completed');
    }
});

promise1.then(function(result) {
    console.log(result); //Output : Completed
}).catch(function(error) {
    console.log(error); //if isDbOperationCompleted=FALSE                                                  
    //Output : Not Completed
})
```

###Async & Await
Babel now supporting async/await out of the box, and ES2016 (or ES7) just around the corner, async & await basically just syntactic sugar on top of Promises

    ES5 -> Callback

    ES6 -> Promise

    ES7 -> async & await

```
async function getUserDetail() {
    try {
        let users = await getUsers();
        return users[0].name;
    } catch (err) {
        return {
            name: 'default user'
        };
    }
}
```
