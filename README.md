# postxml-import
[![npm version][npm-image]][npm-url]

> [PostXML] to import html files.

## Installation
`npm i postxml-import --save-dev`

## Usage
[Usage]

## Options

### selector
*Query selector.*<br>
Type: `String`<br>
Default: `import[src]`

### attr
*Attribute that contains path.*<br>
Type: `String`<br>
Default: `src`

### path
*Function that get value of attr and returns absolute path to file.*<br>
Type: `Function`<br>
Default:
```js
function (attr) {
    return attr;
}
```

## Example 1 (Base syntas)

### Input
```html
<import src="block.htm"></import>
```

### block.htm `(process.cwd() + block.htm)`
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

## Example 2 (Web components syntax)

### Input
```html
<link rel="import" src="block.htm"></link>
```

### Options
```js
{
    selector: 'link[rel=import][href]',
    attr: 'href'
}
```

## Example 3 (Import block)
```html
<import block="b-block"></import>
```

### Options
```js
{
    selector: 'import[block]',
    attr: 'block',
    path: function (block) {
        return 'blocks/' + block + '/' + block + '.htm'
    }
}
```

## Licence
MIT

[PostXML]: https://github.com/postxml/postxml
[Usage]: https://github.com/postxml/postxml#usage

[npm-url]: https://www.npmjs.org/package/postxml-import
[npm-image]: http://img.shields.io/npm/v/postxml-import.svg?style=flat-square
