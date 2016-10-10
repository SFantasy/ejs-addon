# ejs-addon

Addon for [EJS](https://npmjs.com/package/ejs) 2.x and Express 4.x

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/ejs-addon.svg
[npm-url]: https://npmjs.com/package/ejs-addon
[download-image]: https://img.shields.io/npm/dm/ejs-addon.svg
[download-url]: https://npmjs.com/package/ejs-addon
[david-image]: https://img.shields.io/david/SFantasy/ejs-addon.svg
[david-url]: https://david-dm.org/SFantasy/ejs-addon

## Install

```
npm i ejs-addon -S
```

## Usage

Explains the usages of `ejs-addon`, you can view detail usages in [example](/example).

### `layout`

> `layout` refers to [ejs-mate](https://github.com/JacksonTian/ejs-mate)

- Declare layout

```ejs
<!DOCTYPE html>
<head>
    <title>ejs-addon</title>
</head>
<body>
<%- body %>
</body>
```

- Use layout

```ejs
<% layout('default') %>

<h1>Title</h1>
```

- Working with Express

```js
const app = require('express')();
const engine = require('ejs-addon');

app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

### `loader` 

- Use `loader`

```ejs
<% loader([
  '/path/to/foo.css',
  '/path/to/bar.js'
]) %>
```

- Declare placeholder in layout

`ejs-addon` use `<%- css %>` and `<%- js %>`, put them in the right place.

```ejs
<!DOCTYPE html>
<head>
    <title>ejs-addon</title>
    <%- css %>
</head>
<body>
<%- body %>
<%- js %>
</body>
```

### More about `loader`

`loader` support adding prefix for assets. 

For example, if you are using CDN for your application in production, follow these steps:

1. Ensure `process.env.NODE_ENV === 'productoin'` 
2. Use the following lines of codes in your `app.js`: 

```js
// Pulic folder
app.set('public path', path.join(__dirname, 'public'));
// Declare CDN url pattern
app.set('public pattern', 'http://yourcdn.com/@version/@path');
```

Things about CDN pattern:

- `@version` would be replaced with the file's modified time
- `@path` would be replaced with the files relative file path as you declared in `loader()`

## Example

See [example](example/)

## Contribute

Fire an [issue](https://github.com/SFantasy/ejs-addon/issue)

## License

The [MIT License](LICENSE)
