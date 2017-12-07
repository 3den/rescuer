# tryer
A high order function who tries way too freakin hard!

`tryer` can be used to wrap any function, the resulting function can return a `default` value if any errors are raised. It also allows you to write a custom `catch` function.

## Installation

yarn:

```
yarn add tryer
```

npm:

```
npm install --save tryer
```

## Usage

```js
import tryer from 'tryer';

function foobar(a, b) {
  // Do something weird that can throw errors
}

// ---
// If no args a give to tryer the resulting function
// returns undefined in case of error
const foobarOrUndefined = tryer()(foobar);

// if foobar(1, 2) raises an error this function will
// just return `undefined` instead.
foobarOrUndefined(1, 2);

// ---
// You can give a custom `default` and `forbidFalsey` values.
const safeFoobar = tryer({default: {}, forbidFalsey: true})(foobar);

// if foobar(2, 3) raises an error or returns a falsey
// value (e.g. '', false, null, undefined, 0), this function
// will return `{}`.
safeFoobar(2,3);


// ---
// You also can give catch callback to do something with the error
const safeFoobar = tryer({catch: (e) => e.message})(foobar);

// if foobar(4, 5) raises an error this function will
// return the error message
safeFoobar(4,3);

// ---
// For debugging you can set allowWarn to true so the errors
// are logged with console.warn on the browser console.
const safeFoobar = tryer({allowWarn: true, default: null})(foobar);

// if foobar(1, 2) raises an error this function will
// return `undefined` instead, and the error message will
// be logged with console.warn.
safeFoobar(1, 2);
```

For more details look at the specs.
