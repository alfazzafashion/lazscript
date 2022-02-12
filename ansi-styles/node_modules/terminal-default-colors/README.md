> Default terminal colors for a variety of terminal emulators as [defined here](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)

# terminal-default-colors

```
npm install terminal-default-colors
```

## Usage

```js
const {terminal} = require('terminal-default-colors');

/* 
{
    displayName: 'Terminal.app',
    name: 'terminal', 
    colors: [
        {
            id: 0, 
            name: 'brightBlack', 
            displayName: 'Bright Black', 
            rgb: [85, 85, 85]
        }
    ]
} 
*/
```

## Scraping

```
yarn install
yarn scrape
```

## License

`terminal-default-colors` is released under the MIT license.