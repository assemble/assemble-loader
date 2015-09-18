'use strict';

var fs = require('fs');
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
      return views;
    };
  };
}

function load(views) {
  return function (globs, opts) {
    opts = utils.merge({}, opts, views.options);
    if (views.isApp) {
      views = views.collection(opts);
    }

    function loadViews(view) {
      if (!view.contents) {
        view.contents = fs.readFileSync(view.path);
      }
      views.addView(view.key, view);
    }

    var fn = utils.loader(loadViews);
    fn(globs, opts);
    return views;
  };
}

/**
 * Expose `loader`
 */

module.exports = loader;
