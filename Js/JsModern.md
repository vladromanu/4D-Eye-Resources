[TOC]

## Arrow functions
```
const X - function() {
    // 'this' here is the caller of X
}

const Y = () => {
    // 'this' here is NOT the caller of x
    // it is the same thi found in Y's scope
}
```

## Object Literals 
```
const mystery = 'answer';

const obj = {
   p1: 10,
   f1() {},
   f2: () => {}.
   [mystery]: 42 // value of mystery const 
};

obj.answer // not mystery
```

## Destructuring objects 
```
const { PI, E, SQRT2} = Math;
```

```
const { Component, Fragment, useState } = require('react');
useState();
```

### Cool
```
const circle = {
    label: 'circlex',
    radius: 2
}

const circleArea = ({radius}, {precision = 2} = {}) => 
( PI * radius * radius).toFixed(precision);

console.log(
    circleArea(circle, {precision: 5});
);
```

### Arrays 
```
const [first, second,,forth] = [1,2,3,4];
const [first, ...restOfItems] = [12,20,30,40];
```

```
const data = {
    temp1: "001",
    temp2: "002",
    firstName: "John",
    lastName: "Doe",
}

const { temp1, temp2, ...person } = data;
```

Copy to new array
```
const newArray = [...restOfItems];
```

Shallow copy to object
```
const newObject = {
    ...person
}
```


## Template strings

```
const greeting = "Hello World";
const greeting = "Gorty Two";
const html = `
    <div>
        ${Math.random()}
    </div>
`;
```

## Classes

```
class Person{
    constructor(name)
    {
        this.name = name
    }
    greet()
    {
        console.log(`Hello ${this.name}`);
    }
}

class Student extends Person
{
    constructor(name, level)
    {
        super(name);
        this.level = level;
    }
    greet() {
        console.log(`Hello ${this.name} from ${this.level}`);
    }
}

const o1 = new Person("Max");
const o2 = new Student("Tina", "1st Grade");

o1.greet();
```

## Promises

##### Old
```
const fetchData = () => {
    fetch('https://api.github.com').then(rsp => { 
        rsp.json().then(data => {
            console.log(data);
        });
    });
};

fetchData();
```

##### New
```
const fetchData = async () => {
    const resp = await fetch('https://api.github.com');

    const data = await resp.json();

    console.log(data);

}
```