# poxtxml-import
[![npm version][npm-image]][npm-url]

> [PostXML] plugin enabling configuration maps.

## Installation
`npm i poxtxml-import --save-dev`

## Usage
```js
var fs = require('fs'),
   postxml = require('postxml'),
   plugin = require('poxtxml-import');

var html = fs.readFileSync('input.html', 'utf8');

var output = postxml(
      html,
      [
         plugin()
      ]
   );
```

## Example

### Input
```html
<import src="block.htm"></import>
```

### bloks.htm
```html
<div class="b-block">
    <div class="b-block__element"></div>
</div>
```

### Output
```html
<div class="b-block">
    <div class="b-block__element"></div>
</div>
```

## Licence
MIT

[PostXML]: https://github.com/postxml/postxml

[npm-url]: https://www.npmjs.org/package/poxtxml-import
[npm-image]: http://img.shields.io/npm/v/poxtxml-import.svg?style=flat-square
