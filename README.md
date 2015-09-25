# postxml-import
[![npm version][npm-image]][npm-url]

> [PostXML] plugin enabling configuration maps.

## Installation
`npm i postxml-import --save-dev`

## [Usage]

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

## Example 3 (Import block)
```html
<import block="b-block" mod="color:red"></import>
```

### blocks/b-block/b-block.htm
```html
<div class="b-block" mod="color:red">
    <div class="b-block__element"></div>
</div>
```

### Output
```html
<div class="b-block" mod="color:red">
    <div class="b-block__element"></div>
</div>
```

## Licence
MIT

[PostXML]: https://github.com/postxml/postxml
[Usage]: https://github.com/postxml/postxml#usage

[npm-url]: https://www.npmjs.org/package/postxml-import
[npm-image]: http://img.shields.io/npm/v/postxml-import.svg?style=flat-square
