/*!
 * view-loader <https://github.com/jonschlinkert/view-loader>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var lazy = require('lazy-cache')(require);
lazy('extend-shallow', 'extend');
lazy('globby', 'glob');

function loader(app, plural, options) {
  options = options || {};
  options.plural = plural;
  var collection = app[plural] || app.create(plural, options);

  return function (pattern, opts) {
    opts = lazy.extend({}, options, opts);
    var files = globFiles(pattern, opts);
    var len = files.length, i = -1;

    while (++i < len) {
      var fp = files[i];
      var buffer = fs.readFileSync(fp);
      collection.addView(fp, {
        path: fp,
        contents: buffer
      });
    }
    return collection;
  };
}

function globFiles(patterns, options) {
  var opts = lazy.extend({cwd: process.cwd()}, options);
  return lazy.glob.sync(patterns, opts).map(function (fp) {
    return path.resolve(opts.cwd, fp);
  });
}

/**
 * Expose `loader`
 */

module.exports = loader;
