/*!
 * view-loader <https://github.com/jonschlinkert/view-loader>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

function loader(patterns, options) {
  var isGlob = utils.isValidGlob(patterns);

  if (!isGlob && !isView(patterns)) {
    options = patterns;
    patterns = null;
  }

  return function (collection) {
    if (!isObject(collection)) {
      throw new TypeError('expected an object');
    }

    if (isApp(collection)) {
      // if this is an instance of `app`, we can add
      // a custom `load` method to all collections
      var app = collection;

      // get a reference to the `extendViews` method
      var fn = app.extendViews;

      app.extendViews = function () {
        // call the native `extendViews` method
        var views = fn.apply(app, arguments);

        // add a `load` method to the result of `extendViews`
        views.load = function () {
          // here, `this` is an instance of the collection
          load(this).apply(this, arguments);
          return this;
        };
        return views;
      };
      return app;
    }

    collection.load = load(collection);
    if (isGlob || isView(patterns)) {
      return collection.load(patterns, options);
    }
    return collection;
  };
}

function load(collection) {
  return function(globs, opts) {
    opts = utils.extend({}, collection.options, opts);
    var loader = utils.loader(function (view) {
      if (!hasContents(view)) {
        if (typeof view.read === 'function') {
          view.read(opts);
        } else {
          view.contents = fs.readFileSync(view.path);
        }
      }
      collection.addView(view.key, view);
    });
    loader.apply(loader, arguments);
    return collection;
  };
}

function isObject(val) {
  return val && typeof val === 'object'
    && !Array.isArray(val);
}

function isApp(val) {
  return ('extendView' in val)
    && ('extendViews' in val)
    && ('viewTypes' in val);
}

function isView(val) {
  return isObject(val) && (val.hasOwnProperty('path') || hasContents(val));
}

function hasContents(val) {
  return val.hasOwnProperty('contents') || val.hasOwnProperty('content');
}

/**
 * Expose `loader`
 */

module.exports = loader;
