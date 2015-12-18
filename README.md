# assemble-loader [![NPM version](https://img.shields.io/npm/v/assemble-loader.svg)](https://www.npmjs.com/package/assemble-loader) [![Build Status](https://img.shields.io/travis/jonschlinkert/assemble-loader.svg)](https://travis-ci.org/jonschlinkert/assemble-loader)

> Assemble plugin (0.6+) for loading globs of views onto custom view collections. Also works with verb or other Templates.js based applications.

Use this as a plugin for [assemble](http://assemble.io), [verb](https://github.com/verbose/verb), or [templates](https://github.com/jonschlinkert/templates), or as an example for how to create your own assemble plugin!

- [Install](#install)
- [Usage](#usage)
- [Collections](#collections)
- [Directly load templates](#directly-load-templates)
- [Related projects](#related-projects)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb))_

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i assemble-loader --save
```

## Usage

```js
var assemble = require('assemble');
var loader = require('assemble-loader');
var app = assemble()
  .use(loader());

// optionally pass glob patterns to the plugin
var app = assemble()
  .use(loader('foo/*.hbs'));

// and/or use the `.loadViews()` method added by the plugin
app.create('pages')
  .use(loader('foo/*.hbs'))
  .use(loader('bar/*.hbs'))
  .loadViews('baz/*.hbs')
  .loadViews('qux/*.hbs');
```

## Collections

**All collections**

When the plugin is added to the `app` instance (as in the previous example), a `.load` method will also be added to every collection created.

```js
var app = assemble()
  .use(loader());

// cache views on `app.views.posts`
app.create('posts')
  .load('content/*.md');

// cache views on `app.views.docs`
app.create('docs')
  .load('docs/*.md');
```

**Specific collections**

If you only want to add the loader to a specific collection, you can pass the plugin to the `.use` method on the collection.

```js
var app = assemble();

// `create` returns the collection instance
app.create('posts')
  .use(loader())
  .load('content/*.md');

// this works too, since `create` adds methods to `app` 
// for the collection
app.posts
  .load('*.hbs')
  .load('*.txt');
```

***

## Directly load templates

You can also skip the `load` method and just pass glob patterns directly to the plugin.

```js
var app = assemble();

app.create('pages')
  .use(loader('*.hbs'))
  .use(loader('*.txt'))
  .use(loader('*.md'));
```

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](https://www.npmjs.com/package/assemble) | [homepage](http://assemble.io)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/assemble-loader/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb) on December 18, 2015._