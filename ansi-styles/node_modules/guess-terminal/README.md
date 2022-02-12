> Guess the current terminal emulator program

# guess-terminal

## Installation

```
npm install guess-terminal
```

## Usage 

```js
const {guessTerminal} = require('guess-terminal');

switch (guessTerminal()) {
    case 'iterm2':
    case 'hyper':
        console.log('Supports images');
    case 'terminal':
    default:
        console.log('No image support');
}
```

## License 

Copyright 2017. `guess-terminal` is released under the MIT license.

## Development

```
yarn
yarn test --watch
```

## Release

```
yarn test
yarn build
yarn publish
```