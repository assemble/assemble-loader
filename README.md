# assemble-loader [![NPM version](https://img.shields.io/npm/v/assemble-loader.svg?style=flat)](https://www.npmjs.com/package/assemble-loader) [![NPM downloads](https://img.shields.io/npm/dm/assemble-loader.svg?style=flat)](https://npmjs.org/package/assemble-loader) [![Build Status](https://img.shields.io/travis/assemble/assemble-loader.svg?style=flat)](https://travis-ci.org/assemble/assemble-loader)

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

## Related projects

You might also be interested in these projects:

* [load-templates](https://www.npmjs.com/package/load-templates): Load templates/views using globs, file paths, objects, arrays, or key-value pairs. | [homepage](https://github.com/jonschlinkert/load-templates)
* [matched](https://www.npmjs.com/package/matched): Adds array support to node-glob, sync and async. Also supports tilde expansion (user home) and… [more](https://www.npmjs.com/package/matched) | [homepage](https://github.com/jonschlinkert/matched)
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. | [homepage](https://github.com/jonschlinkert/micromatch)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/assemble/assemble-loader/issues/new).

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
Released under the [MIT license](https://github.com/assemble/assemble-loader/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 21, 2016._