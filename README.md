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

## Examples

### Example 1 (Base syntas)

#### Input
```html
<import src="block.htm"></import>
```

#### block.htm `(block.htm)`
```html
<div class="b-block">
    <div class="b-block__element"></div>
</div>
```

#### Output
```html
<div class="b-block">
    <div class="b-block__element"></div>
</div>
```

### Example 2 (import width content)

#### Input
```html
<import src="block.htm">
	<p>Content</p>
</import>
```

#### block.htm `(block.htm)`
```html
<div class="b-block">
    <div class="b-block__element"></div>
	<content></content>
</div>
```

#### Output
```html
<div class="b-block">
    <div class="b-block__element"></div>
	<p>Content</p>
</div>
```

### Example 3 (Import component)
```html
<import component="componentName"></import>
```

#### Options
```js
{
    selector: 'import[component]',
    attr: 'component',
    path: function (componentName) {
        return 'blocks/' + componentName + '/' + componentName + '.htm'
    }
}
```

### Example 4 (Inline svg)

#### Input
```html
<img src="image.svg">
```

#### Options
```js
{
    selector: 'img[src$=".svg"]',
    path: function (src) {
        return 'cwd/' + src
    }
}
```

#### Output
```html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

## Licence
MIT

[PostXML]: https://github.com/postxml/postxml
[Usage]: https://github.com/postxml/postxml#usage

[npm-url]: https://www.npmjs.org/package/postxml-import
[npm-image]: http://img.shields.io/npm/v/postxml-import.svg?style=flat-square
