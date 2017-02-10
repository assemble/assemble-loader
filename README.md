# assemble-loader [![NPM version](https://img.shields.io/npm/v/assemble-loader.svg?style=flat)](https://www.npmjs.com/package/assemble-loader) [![NPM monthly downloads](https://img.shields.io/npm/dm/assemble-loader.svg?style=flat)](https://npmjs.org/package/assemble-loader)  [![NPM total downloads](https://img.shields.io/npm/dt/assemble-loader.svg?style=flat)](https://npmjs.org/package/assemble-loader) [![Linux Build Status](https://img.shields.io/travis/assemble/assemble-loader.svg?style=flat&label=Travis)](https://travis-ci.org/assemble/assemble-loader)

> Assemble plugin (^0.6.0) for loading globs of views onto custom view collections. Also works with verb or other Templates.js based applications.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save assemble-loader
```

## Usage

```js
var assemble = require('assemble');
var loader = require('assemble-loader');
var app = assemble()
app.use(loader());

app.create('pages', {cwd: 'src/pages'});
app.create('partials', {cwd: 'src/partials'});

// you can now load globs of templates onto any collection
app.pages('*.hbs');
app.partials('*.hbs');
```

## API

```js
var assemble = require('assemble');
var loader = require('assemble-loader');
var app = assemble()

// use the plugin
app.use(loader());
```

Optionally pass glob patterns to the plugin:

```js
var app = assemble();
// this can only be done once when the plugin is registered
app.use(loader('foo/*.hbs'));

// you can use the `.loadViews()` method any number of times
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

## About

### Related projects

* [load-templates](https://www.npmjs.com/package/load-templates): Load templates/views using globs, file paths, objects, arrays, or key-value pairs. | [homepage](https://github.com/jonschlinkert/load-templates "Load templates/views using globs, file paths, objects, arrays, or key-value pairs.")
* [matched](https://www.npmjs.com/package/matched): Adds array support to node-glob, sync and async. Also supports tilde expansion (user home) and… [more](https://github.com/jonschlinkert/matched) | [homepage](https://github.com/jonschlinkert/matched "Adds array support to node-glob, sync and async. Also supports tilde expansion (user home) and resolving to global npm modules.")
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. | [homepage](https://github.com/jonschlinkert/micromatch "Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
MIT

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.2, on February 10, 2017._