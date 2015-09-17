/*!
 * view-loader <https://github.com/jonschlinkert/view-loader>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var isValid = require('is-valid-glob');
var utils = require('./utils');

function loader(patterns, opts) {
  var isGlob = isValid(patterns);
  if (!isGlob) {
    opts = patterns;
    patterns = null;
  }

  return function (app) {
    app.load = load(app);
    if (isGlob) {
      app.load(patterns, opts);
    }

    return function (views) {
      views.load = load(views);
    };
  };
}

function load(views) {
  return function (globs, opts) {
    opts = utils.merge({}, views.options, opts);

    var fn = utils.loader(function (view) {
      var res = utils.mapDest(view.path, opts)[0];
      view.path = res.src;
      view.dest = res.dest;

      if (!view.content) {
        view.contents = fs.readFileSync(view.path);
      }
      views.addView(view.key, view);
    });

    fn.apply(fn, arguments);
    return views;
  };
}

/**
 * Expose `loader`
 */

module.exports = loader;
