# assemble-loader [![NPM version](https://img.shields.io/npm/v/assemble-loader.svg?style=flat)](https://www.npmjs.com/package/assemble-loader) [![NPM downloads](https://img.shields.io/npm/dm/assemble-loader.svg?style=flat)](https://npmjs.org/package/assemble-loader) [![Build Status](https://img.shields.io/travis/jonschlinkert/assemble-loader.svg?style=flat)](https://travis-ci.org/jonschlinkert/assemble-loader)

Assemble plugin (^0.6.0) for loading globs of views onto custom view collections. Also works with verb or other Templates.js based applications.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install assemble-loader --save
```

## Usage

```js
var assemble = require('assemble');
var loader = require('assemble-loader');
var app = assemble()
  .use(loader());

// optionally pass glob patterns to the plugin (you can only
// call the plugin once using this pattern)
var app = assemble()
  .use(loader('foo/*.hbs'));

// and/or use the `.loadViews()` method added by the plugin
app.create('pages')
  .use(loader('foo/*.hbs'))
  .loadViews('bar/*.hbs')
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

## Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/assemble-loader/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/assemble-loader/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 07, 2016._