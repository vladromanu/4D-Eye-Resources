[TOC]

# Simple Example
App.js
```
import React, { useState } from 'react';
import './App.css';
import Display from "./Display";
import Button from "./Button";

const App = () =>
{
  const [counter, setCounter] = useState(5); // Hook 
  const incrementCounter = (value) => setCounter(counter * value);

  return (
    <>
      <Button onClickFunction={incrementCounter} increment={2} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Button onClickFunction={incrementCounter} increment={50} />
      <Button onClickFunction={incrementCounter} increment={100} />
      <Display message={counter} />
    </>
  );
}

export default App;
```

Button.js
```
import React from 'react';

const Button = props =>
{
  return (
    <>
      <button onClick={() => props.onClickFunction(props.increment)}>
         x {props.increment}
      </button>
    </>
  );
}

export default Button;
```

Display.js
```
import React from 'react';

const Display = props =>
{
  return (
    <div>{props.message}</div>
  );
}

export default Display;
```
