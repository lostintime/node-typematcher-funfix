TypeMatcher Funfix Binding
==========================

This library is a binding of [typematcher](https://github.com/lostintime/node-typematcher) and [funfix](https://github.com/funfix/funfix).
It provides `match()` and `matchWith()` functions implementations returning [funfix IO](https://funfix.org/api/effect/classes/io.html).

## Installation

```
npm install --save typematcher-funfix
```

## Usage examples

```typescript
import {caseId, caseThrow, hasFields, isString, isOptional, isNumber} from 'typematcher';
import {match, matchWith} from 'typematcher-funfix';
import {IO} from "funfix-effect";

/**
 * Our data structure 
 */
type User = {
  name: string,
  age?: number,
};

/**
 * Prepared matcher for our type 
 */
const matchUser = matchWith(
  caseId(hasFields({
    name: isString,
    age: isOptional(isNumber)
  })),
  caseThrow(new Error('Invalid user profile'))
);

const input = {name: "John", role: 20};

/**
 * Ensure input is a valid User 
 */
const user: IO<User> = matchUser(input);

/**
 * IO then can be composed in any way you need 
 */
const userName: IO<string> = user.map(u => u.name);

```

## Typematcher

Type matching library for [TypeScript](https://www.typescriptlang.org/).

  * Source: [https://github.com/lostintime/node-typematcher](https://github.com/lostintime/node-typematcher);
  * NPM: [https://www.npmjs.com/package/typematcher](https://www.npmjs.com/package/typematcher).

## Funfix

Funfix is a library of type classes and data types for Functional Programming 
in JavaScript, [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/).

  * Source: [https://github.com/funfix/funfix](https://github.com/funfix/funfix);
  * NPM: [https://www.npmjs.com/package/funfix](https://www.npmjs.com/package/funfix).


## Contribute

> Perfection is Achieved Not When There Is Nothing More to Add, 
> But When There Is Nothing Left to Take Away

Fork, Contribute, Push, Create pull request, Thanks. 

## Documentation

  * Typematcher intro post: [https://lostintimedev.com/2017/09/06/typematcher-pattern-matching-library-for-typescript.html](https://lostintimedev.com/2017/09/06/typematcher-pattern-matching-library-for-typescript.html);
  * Funfix IO monad api: [https://funfix.org/api/effect/classes/io.html](https://funfix.org/api/effect/classes/io.html).
