# abcq

Generates character combinations from numbers: `a b c ... aa ab ac ... foo fop foq`

[![npm](https://img.shields.io/npm/v/abcq.svg)](https://www.npmjs.com/package/abcq)

-   Convert numbers to character combinations.
-   Count by character combination
-   Create unique ids
-   Create simple hashes

```shell
npm i abcq
## or
yarn add abcq
```

## Basic usage

```js
import Abcq from "abcq";
const shortid = new Abcq();

shortid.generate();
// -> a
shortid.generate();
// -> b
shortid.encode(1234567890);
// -> clRjXk
shortid.decode("clRjXk");
// -> 1234567890
```

## When unicorns make love

Use an `Array` for `chars` if it contains special characters.
Set the counter to modify the start point

```js
import Abcq from "abcq";

const unicornLove = new Abcq({
	chars: ["🦄", "💖"],
	counter: 42
});

unicornLove.generate();
// -> 🦄💖💖🦄💖
unicornLove.encode(8);
// -> 🦄💖🦄
```

## Options

### `chars`

-   type: { string[] | string }
-   default: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

### `counter`

-   type: { number }
-   default: -1

## Methods

### `generate`

```js
import Abcq from "abcq";
const abc = new AbcQ();
abc.generate();
// -> a
abc.generate();
// -> b
```

### `encode`

```js
import Abcq from "abcq";
const abc = new AbcQ();
abc.encode(1234567890);
// -> clRjXk
```

### `decode`

```js
import Abcq from "abcq";
const abc = new AbcQ();
abc.decode("clRjXk");
// -> 1234567890
```
