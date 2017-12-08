# rescuer
A Higher-order function that can protet any other function from errors, making it return a default value instead of a unwanted exception.

`rescuer` can be used to wrap any function, the resulting function can return a `default` value if any errors are raised. It also allows you to write a custom `catch` function.

## Installation

yarn:

```
yarn add rescuer
```

npm:

```
npm install --save rescuer
```

## Usage

### rescuer

Use cases for `rescuer` function.

```js
import rescuer from 'rescuer';

function foobar(a, b) {
  // Do something weird that can throw errors
}

// ---
// If no args a give to rescuer the resulting function
// returns undefined in case of error
const foobarOrUndefined = rescuer()(foobar);

// if foobar(1, 2) raises an error this function will
// just return `undefined` instead.
foobarOrUndefined(1, 2);

// ---
// You can give a custom `default` and `forbidFalsey` values.
const safeFoobar = rescuer({default: {}, forbidFalsey: true})(foobar);

// if foobar(2, 3) raises an error or returns a falsey
// value (e.g. '', false, null, undefined, 0), this function
// will return `{}`.
safeFoobar(2,3);


// ---
// You also can give catch callback to do something with the error
const safeFoobar = rescuer({catch: (e) => e.message})(foobar);

// if foobar(4, 5) raises an error this function will
// return the error message
safeFoobar(4,3);

// ---
// For debugging you can set allowWarn to true so the errors
// are logged with console.warn on the browser console.
const safeFoobar = rescuer({allowWarn: true, default: null})(foobar);

// if foobar(1, 2) raises an error this function will
// return `undefined` instead, and the error message will
// be logged with console.warn.
safeFoobar(1, 2);
```
### rescueWithObject

Use cases for `rescueWithObject` function.

```js
import {rescueWithObject} from '../src/rescuer';

function foobar(a, b) {
  // should return an objects, but can raise errors or return undefined when something goes wrong.
}

// ---
// you just need to pass the function to wrap.
const safeFoobar = rescueWithObject(foobar);

// if foobar(1, 2) raises an error or returned a falsey value,
// this function will return `{}`
foobar(1,2);
```


For more details look at the specs.
